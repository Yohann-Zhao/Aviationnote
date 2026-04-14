const DEFAULT_SAMPLE_RATE = 22050;

const ACCENT_VOICE_PRESETS = {
  australian: [
    { languageCode: "en-AU", name: "en-AU-Standard-A" },
    { languageCode: "en-AU", name: "en-AU-Standard-B" },
    { languageCode: "en-AU", name: "en-AU-Standard-C" },
    { languageCode: "en-AU", name: "en-AU-Standard-D" }
  ],
  american: [
    { languageCode: "en-US", name: "en-US-Standard-A" },
    { languageCode: "en-US", name: "en-US-Standard-B" },
    { languageCode: "en-US", name: "en-US-Standard-C" },
    { languageCode: "en-US", name: "en-US-Standard-D" },
    { languageCode: "en-US", name: "en-US-Standard-E" },
    { languageCode: "en-US", name: "en-US-Standard-F" },
    { languageCode: "en-US", name: "en-US-Standard-G" },
    { languageCode: "en-US", name: "en-US-Standard-H" },
    { languageCode: "en-US", name: "en-US-Standard-I" },
    { languageCode: "en-US", name: "en-US-Standard-J" }
  ],
  british: [
    { languageCode: "en-GB", name: "en-GB-Standard-A" },
    { languageCode: "en-GB", name: "en-GB-Standard-B" },
    { languageCode: "en-GB", name: "en-GB-Standard-C" },
    { languageCode: "en-GB", name: "en-GB-Standard-D" },
    { languageCode: "en-GB", name: "en-GB-Standard-F" },
    { languageCode: "en-GB", name: "en-GB-Standard-N" },
    { languageCode: "en-GB", name: "en-GB-Standard-O" }
  ],
  indian: [
    { languageCode: "en-IN", name: "en-IN-Standard-A" },
    { languageCode: "en-IN", name: "en-IN-Standard-B" },
    { languageCode: "en-IN", name: "en-IN-Standard-C" },
    { languageCode: "en-IN", name: "en-IN-Standard-D" },
    { languageCode: "en-IN", name: "en-IN-Standard-E" },
    { languageCode: "en-IN", name: "en-IN-Standard-F" }
  ]
};

ACCENT_VOICE_PRESETS.mixed = Object.values(ACCENT_VOICE_PRESETS).flat();

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  let payload;
  try {
    payload = parseJsonBody(event.body, event.isBase64Encoded);
  } catch {
    return jsonResponse(400, { error: "Invalid JSON body" });
  }

  const text = String(payload.text || "").trim();
  const accent = normalizeAccent(payload.accent);
  const speakingRate = resolveSpeakingRate(payload.speakingRate);

  if (!text) {
    return jsonResponse(400, { error: "Missing `text`" });
  }

  if (process.env.TTS_API_KEY) {
    try {
      const remoteAudio = await synthesizeWithGoogleTts(text, accent, speakingRate);
      return audioResponse(remoteAudio.buffer, remoteAudio.contentType);
    } catch (error) {
      console.warn("Google TTS failed:", error.message);
      return jsonResponse(502, { error: `Google Cloud TTS failed: ${error.message}` });
    }
  }

  const fallbackAudio = synthesizeFallbackWav(text, speakingRate);
  return audioResponse(fallbackAudio, "audio/wav");
};

function parseJsonBody(body, isBase64Encoded) {
  if (!body) return {};
  const raw = isBase64Encoded ? Buffer.from(body, "base64").toString("utf8") : body;
  return JSON.parse(raw);
}

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

function normalizeAccent(value) {
  const accent = String(value || "mixed").trim().toLowerCase();

  if (accent === "southeast_asia") {
    return "indian";
  }

  return ACCENT_VOICE_PRESETS[accent] ? accent : "mixed";
}

function pick(values) {
  return values[Math.floor(Math.random() * values.length)];
}

function parseSpeakingRate(value, fallback = 1) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return clamp(fallback, 0.25, 2);
  }

  return clamp(parsed, 0.25, 2);
}

function resolveSpeakingRate(value) {
  const envFallback = parseSpeakingRate(process.env.GOOGLE_TTS_SPEAKING_RATE || 1, 1);
  return parseSpeakingRate(value, envFallback);
}

function resolveVoiceConfig(accent) {
  if (accent && ACCENT_VOICE_PRESETS[accent]) {
    return pick(ACCENT_VOICE_PRESETS[accent]);
  }

  return {
    languageCode: process.env.GOOGLE_TTS_LANGUAGE_CODE || "en-US",
    name: process.env.GOOGLE_TTS_VOICE_NAME || "en-US-Standard-C"
  };
}

async function synthesizeWithGoogleTts(text, accent, speakingRate) {
  const apiKey = process.env.TTS_API_KEY;
  const requestUrl = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${encodeURIComponent(apiKey)}`;
  const voice = resolveVoiceConfig(accent);

  const response = await fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      input: {
        text
      },
      voice,
      audioConfig: {
        audioEncoding: "MP3",
        speakingRate
      }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`status ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  if (typeof data.audioContent !== "string" || data.audioContent.length === 0) {
    throw new Error("response did not include audioContent");
  }

  return {
    buffer: Buffer.from(data.audioContent, "base64"),
    contentType: "audio/mpeg"
  };
}

function synthesizeFallbackWav(text, speakingRate) {
  const frames = [];
  const rate = parseSpeakingRate(speakingRate, 1);
  const toneDurationMs = 110 / rate;
  const gapDurationMs = 18 / rate;
  const wordGapDurationMs = 90 / rate;

  for (const char of Array.from(text)) {
    if (char === " ") {
      frames.push(createSilenceSamples(wordGapDurationMs, DEFAULT_SAMPLE_RATE));
      continue;
    }

    frames.push(createToneSamples(charToFrequency(char), toneDurationMs, DEFAULT_SAMPLE_RATE, 0.24));
    frames.push(createSilenceSamples(gapDurationMs, DEFAULT_SAMPLE_RATE));
  }

  if (frames.length === 0) {
    frames.push(createSilenceSamples(200 / rate, DEFAULT_SAMPLE_RATE));
  }

  return encodeWav(mergeSamples(frames), DEFAULT_SAMPLE_RATE);
}

function charToFrequency(char) {
  const code = char.toUpperCase().charCodeAt(0);
  return 380 + ((Number.isNaN(code) ? 0 : code) % 36) * 18;
}

function createToneSamples(frequency, durationMs, sampleRate, amplitude) {
  const sampleCount = Math.max(1, Math.floor((sampleRate * durationMs) / 1000));
  const samples = new Int16Array(sampleCount);
  const edge = Math.max(1, Math.floor(sampleCount * 0.08));

  for (let i = 0; i < sampleCount; i += 1) {
    const phase = (2 * Math.PI * frequency * i) / sampleRate;
    const attack = Math.min(1, i / edge);
    const release = Math.min(1, (sampleCount - 1 - i) / edge);
    const envelope = Math.min(attack, release, 1);
    samples[i] = Math.round(Math.sin(phase) * 32767 * amplitude * envelope);
  }

  return samples;
}

function createSilenceSamples(durationMs, sampleRate) {
  const sampleCount = Math.max(1, Math.floor((sampleRate * durationMs) / 1000));
  return new Int16Array(sampleCount);
}

function mergeSamples(chunks) {
  const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const merged = new Int16Array(totalLength);
  let offset = 0;

  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.length;
  }

  return merged;
}

function encodeWav(samples, sampleRate) {
  const bytesPerSample = 2;
  const blockAlign = bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = samples.length * bytesPerSample;
  const buffer = Buffer.alloc(44 + dataSize);

  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  for (let i = 0; i < samples.length; i += 1) {
    buffer.writeInt16LE(samples[i], 44 + i * 2);
  }

  return buffer;
}

function audioResponse(buffer, contentType) {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*"
    },
    isBase64Encoded: true,
    body: buffer.toString("base64")
  };
}

function jsonResponse(statusCode, payload) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(payload)
  };
}
