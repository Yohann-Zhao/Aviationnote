const audioCache = new Map();

export async function fetchTtsAudioUrl(text) {
  if (audioCache.has(text)) {
    return audioCache.get(text);
  }

  // API flow: send text to the same-origin Netlify Function and turn the audio bytes into a Blob URL.
  const response = await fetch("/api/tts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text })
  });

  if (!response.ok) {
    let message = `TTS request failed with status ${response.status}.`;

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

  const audioBlob = await response.blob();
  const audioUrl = URL.createObjectURL(audioBlob);
  audioCache.set(text, audioUrl);
  return audioUrl;
}

export function clearTtsAudioCache() {
  for (const audioUrl of audioCache.values()) {
    URL.revokeObjectURL(audioUrl);
  }

  audioCache.clear();
}
