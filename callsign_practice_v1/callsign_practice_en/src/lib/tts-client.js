const audioCache = new Map();

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

function normalizeSpeakingRate(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return 1.2;
  }

  return clamp(parsed, 0.25, 2);
}

function buildCacheKey(text, accent, speakingRate, radioTone) {
  return JSON.stringify({
    text,
    accent: accent || "default",
    speakingRate,
    radioTone: Boolean(radioTone)
  });
}

export async function fetchTtsAudioUrl(text, options = {}) {
  const accent = String(options.accent || "mixed");
  const speakingRate = normalizeSpeakingRate(options.speakingRate);
  const radioTone = Boolean(options.radioTone);
  const cacheKey = buildCacheKey(text, accent, speakingRate, radioTone);

  if (audioCache.has(cacheKey)) {
    return audioCache.get(cacheKey);
  }

  const response = await fetch("/api/tts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text, accent, speakingRate })
  });

  if (!response.ok) {
    let message = `TTS request failed with status ${response.status}.`;

    if (response.status === 404) {
      message = "TTS endpoint not found. Start local testing with `npm run dev` or `netlify dev` so /api/tts is available.";
    }

    try {
      const payload = await response.json();

      if (payload?.error) {
        message = payload.error;
      }
    } catch {
      // Keep the status-based message if the backend returned non-JSON output.
    }

    throw new Error(message);
  }

  let audioBlob = await response.blob();

  if (radioTone) {
    try {
      audioBlob = await renderBlobWithRadioEffect(audioBlob);
    } catch (error) {
      console.warn("Radio tone post-processing failed; falling back to raw TTS audio.", error);
    }
  }

  const audioUrl = URL.createObjectURL(audioBlob);
  audioCache.set(cacheKey, audioUrl);
  return audioUrl;
}

function getAudioContextConstructor() {
  return window.AudioContext || window.webkitAudioContext;
}

function getOfflineAudioContextConstructor() {
  return window.OfflineAudioContext || window.webkitOfflineAudioContext;
}

function getDecodeContext() {
  const AudioContextCtor = getAudioContextConstructor();

  if (!AudioContextCtor) {
    throw new Error("Web Audio API is not available in this browser.");
  }

  return new AudioContextCtor();
}

function makeDistortionCurve(amount = 8) {
  const sampleCount = 44100;
  const curve = new Float32Array(sampleCount);
  const degrees = Math.PI / 180;

  for (let index = 0; index < sampleCount; index += 1) {
    const x = (index * 2) / sampleCount - 1;
    curve[index] = ((3 + amount) * x * 20 * degrees) / (Math.PI + amount * Math.abs(x));
  }

  return curve;
}

function createAudioBufferClone(audioBuffer) {
  return new AudioBuffer({
    length: audioBuffer.length,
    numberOfChannels: audioBuffer.numberOfChannels,
    sampleRate: audioBuffer.sampleRate
  });
}

function normalizeRenderedBuffer(audioBuffer, peakTarget = 0.9) {
  let peak = 0;

  for (let channel = 0; channel < audioBuffer.numberOfChannels; channel += 1) {
    const data = audioBuffer.getChannelData(channel);

    for (let index = 0; index < data.length; index += 1) {
      peak = Math.max(peak, Math.abs(data[index]));
    }
  }

  if (peak === 0) {
    return audioBuffer;
  }

  const gain = Math.min(1.35, peakTarget / peak);
  if (Math.abs(gain - 1) < 0.001) {
    return audioBuffer;
  }

  const normalized = createAudioBufferClone(audioBuffer);

  for (let channel = 0; channel < audioBuffer.numberOfChannels; channel += 1) {
    const source = audioBuffer.getChannelData(channel);
    const target = normalized.getChannelData(channel);

    for (let index = 0; index < source.length; index += 1) {
      target[index] = clamp(source[index] * gain, -1, 1);
    }
  }

  return normalized;
}

function audioBufferToWavBlob(audioBuffer) {
  const numberOfChannels = audioBuffer.numberOfChannels;
  const length = audioBuffer.length * numberOfChannels * 2 + 44;
  const arrayBuffer = new ArrayBuffer(length);
  const view = new DataView(arrayBuffer);

  function writeString(offset, value) {
    for (let index = 0; index < value.length; index += 1) {
      view.setUint8(offset + index, value.charCodeAt(index));
    }
  }

  let offset = 0;
  writeString(offset, "RIFF");
  offset += 4;
  view.setUint32(offset, 36 + audioBuffer.length * numberOfChannels * 2, true);
  offset += 4;
  writeString(offset, "WAVE");
  offset += 4;
  writeString(offset, "fmt ");
  offset += 4;
  view.setUint32(offset, 16, true);
  offset += 4;
  view.setUint16(offset, 1, true);
  offset += 2;
  view.setUint16(offset, numberOfChannels, true);
  offset += 2;
  view.setUint32(offset, audioBuffer.sampleRate, true);
  offset += 4;
  view.setUint32(offset, audioBuffer.sampleRate * numberOfChannels * 2, true);
  offset += 4;
  view.setUint16(offset, numberOfChannels * 2, true);
  offset += 2;
  view.setUint16(offset, 16, true);
  offset += 2;
  writeString(offset, "data");
  offset += 4;
  view.setUint32(offset, audioBuffer.length * numberOfChannels * 2, true);
  offset += 4;

  for (let index = 0; index < audioBuffer.length; index += 1) {
    for (let channel = 0; channel < numberOfChannels; channel += 1) {
      const sample = audioBuffer.getChannelData(channel)[index];
      const clipped = Math.max(-1, Math.min(1, sample));
      view.setInt16(offset, clipped < 0 ? clipped * 0x8000 : clipped * 0x7fff, true);
      offset += 2;
    }
  }

  return new Blob([view], { type: "audio/wav" });
}

async function renderBlobWithRadioEffect(audioBlob) {
  const OfflineAudioContextCtor = getOfflineAudioContextConstructor();

  if (!OfflineAudioContextCtor) {
    throw new Error("OfflineAudioContext is not available in this browser.");
  }

  const decodeContext = getDecodeContext();

  try {
    const arrayBuffer = await audioBlob.arrayBuffer();
    const decoded = await decodeContext.decodeAudioData(arrayBuffer.slice(0));

    const offlineContext = new OfflineAudioContextCtor(
      decoded.numberOfChannels,
      decoded.length,
      decoded.sampleRate
    );

    const source = offlineContext.createBufferSource();
    source.buffer = decoded;

    const highpass = offlineContext.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.value = 320;
    highpass.Q.value = 0.7;

    const bandpass = offlineContext.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = 1350;
    bandpass.Q.value = 0.9;

    const lowpass = offlineContext.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 3050;
    lowpass.Q.value = 0.8;

    const waveShaper = offlineContext.createWaveShaper();
    waveShaper.curve = makeDistortionCurve(6);
    waveShaper.oversample = "2x";

    const compressor = offlineContext.createDynamicsCompressor();
    compressor.threshold.value = -28;
    compressor.knee.value = 18;
    compressor.ratio.value = 3.8;
    compressor.attack.value = 0.004;
    compressor.release.value = 0.16;

    const masterGain = offlineContext.createGain();
    masterGain.gain.value = 0.88;

    const amplitudeLfo = offlineContext.createOscillator();
    amplitudeLfo.type = "sine";
    amplitudeLfo.frequency.value = 4.8;
    const amplitudeDepth = offlineContext.createGain();
    amplitudeDepth.gain.value = 0.05;
    amplitudeLfo.connect(amplitudeDepth);
    amplitudeDepth.connect(masterGain.gain);

    const pitchLfo = offlineContext.createOscillator();
    pitchLfo.type = "triangle";
    pitchLfo.frequency.value = 6.2;
    const pitchDepth = offlineContext.createGain();
    pitchDepth.gain.value = 0.008;
    pitchLfo.connect(pitchDepth);
    pitchDepth.connect(source.playbackRate);

    const carrierLow = offlineContext.createOscillator();
    carrierLow.type = "sine";
    carrierLow.frequency.value = 210;
    const carrierLowGain = offlineContext.createGain();
    carrierLowGain.gain.value = 0.009;

    const carrierHigh = offlineContext.createOscillator();
    carrierHigh.type = "triangle";
    carrierHigh.frequency.value = 1820;
    const carrierHighGain = offlineContext.createGain();
    carrierHighGain.gain.value = 0.0025;

    source.connect(waveShaper);
    waveShaper.connect(highpass);
    highpass.connect(bandpass);
    bandpass.connect(lowpass);
    lowpass.connect(compressor);
    compressor.connect(masterGain);
    masterGain.connect(offlineContext.destination);

    carrierLow.connect(carrierLowGain);
    carrierLowGain.connect(compressor);
    carrierHigh.connect(carrierHighGain);
    carrierHighGain.connect(compressor);

    source.start(0);
    amplitudeLfo.start(0);
    pitchLfo.start(0);
    carrierLow.start(0);
    carrierHigh.start(0);

    const rendered = await offlineContext.startRendering();
    return audioBufferToWavBlob(normalizeRenderedBuffer(rendered));
  } finally {
    await decodeContext.close();
  }
}

export function clearTtsAudioCache() {
  for (const audioUrl of audioCache.values()) {
    URL.revokeObjectURL(audioUrl);
  }

  audioCache.clear();
}
