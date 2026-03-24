const DEFAULT_SAMPLE_RATE = 22050;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  let payload;
  try {
    payload = parseJsonBody(event.body, event.isBase64Encoded);
  } catch (error) {
    return jsonResponse(400, { error: "Invalid JSON body" });
  }

  const text = String(payload.text || "").trim();
  if (!text) {
    return jsonResponse(400, { error: "Missing `text`" });
  }

  // Flow:
  // 1. Use Google Cloud TTS when a server-side API key is configured.
  // 2. Fall back to a local WAV generator only when no key is present.
  if (process.env.TTS_API_KEY) {
    try {
      const remoteAudio = await synthesizeWithGoogleTts(text);
      return audioResponse(remoteAudio.buffer, remoteAudio.contentType);
    } catch (error) {
      console.warn("Google TTS failed:", error.message);
      return jsonResponse(502, { error: `Google Cloud TTS failed: ${error.message}` });
    }
  }

  const fallbackAudio = synthesizeFallbackWav(text);
  return audioResponse(fallbackAudio, "audio/wav");
};

function parseJsonBody(body, isBase64Encoded) {
  if (!body) return {};
  const raw = isBase64Encoded ? Buffer.from(body, "base64").toString("utf8") : body;
  return JSON.parse(raw);
}

async function synthesizeWithGoogleTts(text) {
  const apiKey = process.env.TTS_API_KEY;
  const requestUrl = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${encodeURIComponent(apiKey)}`;

  const response = await fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: {
        text,
      },
      voice: {
        languageCode: process.env.GOOGLE_TTS_LANGUAGE_CODE || "en-US",
        name: process.env.GOOGLE_TTS_VOICE_NAME || "en-US-Standard-C",
      },
      audioConfig: {
        audioEncoding: "MP3",
        speakingRate: Number(process.env.GOOGLE_TTS_SPEAKING_RATE || 1),
      },
    }),
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
    contentType: "audio/mpeg",
  };
}

function synthesizeFallbackWav(text) {
  const frames = [];

  for (const char of Array.from(text)) {
    if (char === " ") {
      frames.push(createSilenceSamples(90, DEFAULT_SAMPLE_RATE));
      continue;
    }

    frames.push(createToneSamples(charToFrequency(char), 110, DEFAULT_SAMPLE_RATE, 0.24));
    frames.push(createSilenceSamples(18, DEFAULT_SAMPLE_RATE));
  }

  if (frames.length === 0) {
    frames.push(createSilenceSamples(200, DEFAULT_SAMPLE_RATE));
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
      "Access-Control-Allow-Origin": "*",
    },
    isBase64Encoded: true,
    body: buffer.toString("base64"),
  };
}

function jsonResponse(statusCode, payload) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(payload),
  };
}