const DEFAULT_SETTINGS = {
  soundEnabled: true,
  vibrationEnabled: true,
  volume: 0.08
};

const UI_TONE_PRESETS = {
  submit: {
    notes: [{ frequency: 680, duration: 55, type: "sine", gain: 0.055 }]
  },
  correct: {
    notes: [
      { frequency: 660, duration: 70, type: "sine", gain: 0.05 },
      { frequency: 880, duration: 90, type: "triangle", gain: 0.045, delay: 72 }
    ]
  },
  incorrect: {
    notes: [
      { frequency: 240, duration: 85, type: "triangle", gain: 0.05 },
      { frequency: 180, duration: 100, type: "sine", gain: 0.045, delay: 72 }
    ]
  },
  milestone: {
    notes: [
      { frequency: 622, duration: 58, type: "sine", gain: 0.045 },
      { frequency: 784, duration: 58, type: "sine", gain: 0.045, delay: 64 },
      { frequency: 988, duration: 82, type: "triangle", gain: 0.05, delay: 126 }
    ]
  }
};

const UI_VIBRATION_PATTERNS = {
  submit: [12],
  correct: [18],
  incorrect: [28, 22, 28],
  milestone: [16, 16, 16]
};

let sharedContext = null;

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

function hasWindow() {
  return typeof window !== "undefined";
}

function getAudioContextConstructor() {
  if (!hasWindow()) {
    return null;
  }

  return window.AudioContext || window.webkitAudioContext || null;
}

export function normalizeUiAudioSettings(settings = {}) {
  const volumeValue = Number(settings.volume ?? DEFAULT_SETTINGS.volume);

  return {
    soundEnabled: settings.soundEnabled !== false,
    vibrationEnabled: settings.vibrationEnabled !== false,
    volume: clamp(Number.isFinite(volumeValue) ? volumeValue : DEFAULT_SETTINGS.volume, 0, 0.2)
  };
}

export function supportsUiAudio() {
  return Boolean(getAudioContextConstructor());
}

export function supportsUiVibration() {
  return Boolean(typeof navigator !== "undefined" && typeof navigator.vibrate === "function");
}

export function getUiAudioContext() {
  const AudioContextCtor = getAudioContextConstructor();

  if (!AudioContextCtor) {
    return null;
  }

  if (!sharedContext || sharedContext.state === "closed") {
    sharedContext = new AudioContextCtor({ latencyHint: "interactive" });
  }

  return sharedContext;
}

export async function unlockUiAudioContext() {
  const context = getUiAudioContext();

  if (!context) {
    return false;
  }

  if (context.state === "running") {
    return true;
  }

  try {
    await context.resume();
    return context.state === "running";
  } catch {
    return false;
  }
}

function createGainEnvelope(context, gainNode, startTime, duration, volume) {
  const safeVolume = clamp(volume, 0, 1);
  const attack = Math.min(0.01, duration * 0.18);
  const release = Math.min(0.06, duration * 0.42);
  const peak = Math.max(0.0001, safeVolume);

  gainNode.gain.setValueAtTime(0.0001, startTime);
  gainNode.gain.exponentialRampToValueAtTime(peak, startTime + attack);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, Math.max(startTime + attack + 0.001, startTime + duration - release));
  gainNode.gain.setValueAtTime(0.0001, startTime + duration);
}

function scheduleTone(context, note, baseTime, volume) {
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();
  const outputGain = context.createGain();

  oscillator.type = note.type || "sine";
  oscillator.frequency.setValueAtTime(note.frequency, baseTime);
  if (typeof note.detune === "number") {
    oscillator.detune.setValueAtTime(note.detune, baseTime);
  }

  const noteDuration = Math.max(0.025, (Number(note.duration) || 60) / 1000);
  const noteGain = typeof note.gain === "number" ? note.gain : volume;
  const delay = Math.max(0, (Number(note.delay) || 0) / 1000);
  const startTime = baseTime + delay;

  createGainEnvelope(context, gainNode, startTime, noteDuration, noteGain);
  outputGain.gain.value = 1;

  oscillator.connect(gainNode);
  gainNode.connect(outputGain);
  outputGain.connect(context.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + noteDuration + 0.02);
}

export async function playUiTone(kind, options = {}) {
  const preset = UI_TONE_PRESETS[kind];
  if (!preset) {
    return false;
  }

  const settings = normalizeUiAudioSettings(options.settings);
  if (!settings.soundEnabled) {
    return false;
  }

  const context = getUiAudioContext();
  if (!context) {
    return false;
  }

  try {
    if (context.state !== "running") {
      await context.resume();
    }

    const baseTime = Math.max(context.currentTime + 0.01, context.currentTime);
    const volume = typeof options.volume === "number" ? options.volume : settings.volume;

    for (const note of preset.notes) {
      scheduleTone(context, note, baseTime, volume);
    }

    return true;
  } catch {
    return false;
  }
}

export function vibrateUiPattern(patternName, options = {}) {
  const settings = normalizeUiAudioSettings(options.settings);

  if (!settings.vibrationEnabled || !supportsUiVibration()) {
    return false;
  }

  const pattern = UI_VIBRATION_PATTERNS[patternName];
  if (!pattern) {
    return false;
  }

  try {
    return navigator.vibrate(pattern);
  } catch {
    return false;
  }
}

export function createUiAudioController(initialSettings = {}) {
  let settings = normalizeUiAudioSettings(initialSettings);

  return {
    get settings() {
      return settings;
    },
    update(nextSettings = {}) {
      settings = normalizeUiAudioSettings({ ...settings, ...nextSettings });
      return settings;
    },
    setSoundEnabled(value) {
      settings = normalizeUiAudioSettings({ ...settings, soundEnabled: Boolean(value) });
      return settings;
    },
    setVibrationEnabled(value) {
      settings = normalizeUiAudioSettings({ ...settings, vibrationEnabled: Boolean(value) });
      return settings;
    },
    async unlock() {
      return unlockUiAudioContext();
    },
    async play(kind, options = {}) {
      return playUiTone(kind, { ...options, settings });
    },
    vibrate(kind, options = {}) {
      return vibrateUiPattern(kind, { ...options, settings });
    },
    async playFeedback(kind, options = {}) {
      const soundPlayed = await playUiTone(kind, { ...options, settings });
      const vibrationPlayed = vibrateUiPattern(kind, { ...options, settings });
      return soundPlayed || vibrationPlayed;
    }
  };
}

export function resetUiAudioContext() {
  if (sharedContext && sharedContext.state !== "closed") {
    sharedContext.close().catch(() => {});
  }

  sharedContext = null;
}
