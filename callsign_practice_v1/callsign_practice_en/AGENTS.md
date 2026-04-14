# Callsign Practice Implementation Notes

## Project Purpose

`callsign_practice_v1` is a local-first aviation callsign dictation trainer.

The current implementation is a full practice app rather than a single-sample MVP. It includes:

- multiple callsign practice modes
- typed and multiple-choice answer modes
- adjustable TTS speed
- selectable English accent presets
- optional browser-side radio-tone post-processing
- a 10-question session loop with progress and summary UI
- a help page at `/help`

This document describes the current implementation, not a future roadmap.

## Stack

- Frontend: Astro
- Main page: `src/pages/index.astro`
- Help page: `src/pages/help.astro`
- Help content: `src/content/help/getting-started.md`
- Frontend logic: small ES modules in `src/lib/`
- Styles: split CSS files in `src/styles/`
- Backend: Netlify Functions
- TTS provider: Google Cloud Text-to-Speech
- Audio post-processing: browser Web Audio API
- UI feedback audio and vibration: browser Web Audio API plus `navigator.vibrate`

## Routes And Dev Commands

Routes:

- `/` -> practice page
- `/help` -> help page
- `/api/tts` -> Netlify Function TTS endpoint

Commands:

```bash
npm install
npm run dev
npm run dev:astro
npm run build
```

Current local behavior:

- `npm run dev` starts `netlify dev`
- Netlify dev serves the app on `http://127.0.0.1:8888`
- Astro dev runs behind it on port `4321`
- `npm run dev:astro` does not provide `/api/tts`

## Important Files

```text
/
  AGENTS.md
  astro.config.mjs
  netlify.toml
  package.json
  callsign_practice.html          # legacy reference only
  src/
    content/
      help/
        getting-started.md
    lib/
      answer-flow.js
      callsign.js
      practice-session.js
      tts-client.js
      ui-animations.js
      ui-audio.js
      ui-feedback.js
    pages/
      help.astro
      index.astro
    styles/
      practice-feedback.css
      practice-motion.css
      practice-session.css
      practice-shell.css
  netlify/
    functions/
      tts.js
```

Usually ignore these unless you are debugging tooling:

- `node_modules/`
- `.astro/`
- `dist/`
- `.netlify/`

## Main Page Structure

`src/pages/index.astro` is the core of the app. It:

- renders the page shell and modal UI
- imports the practice, answer, feedback, animation, and audio helpers
- owns the runtime state machine
- generates rounds
- requests and plays TTS audio
- resolves answers
- updates the session model
- re-renders the UI after every important state change

The main DOM sections are:

- `#roundCard`
  - top practice card
  - shows the round indicator, mode summary, voice summary, and state copy
- `#answerPanel`
  - typed or multiple-choice answer area
- `#sessionSummaryPanel`
  - post-session summary after 10 resolved answers
- `#settingsModal`
  - mode, voice, feedback, and custom-letter settings
- `#toastHost`
  - milestone toasts
- `#audioPlayer`
  - hidden audio element used for playback

`src/pages/help.astro` is intentionally thin. It imports shared styles and renders `src/content/help/getting-started.md`.

## Frontend State Flow

Question states are defined in `src/lib/answer-flow.js`:

- `idle`
- `preparing`
- `listening`
- `answering`
- `checking`
- `resolved`
- `sessionComplete`

The current round flow is:

1. User starts in `idle`
2. Primary action moves to `preparing`
3. A callsign sample is generated
4. TTS audio is fetched
5. Playback begins and the page enters `listening`
6. When playback ends, the page enters `answering`
7. User submits an answer and the page enters `checking`
8. The round resolves to `resolved` or `sessionComplete`

## Current Answer Behavior

### Typed Mode

- User types the answer
- `Check` becomes available when the normalized answer is non-empty
- pressing `Enter` while answering also submits

### Multiple Choice Mode

Current behavior checks immediately:

- clicking an option selects it
- clicking an option immediately grades the round
- no extra confirm click is required

Typed mode still uses an explicit `Check` step.

## Hidden Inputs And Visible Controls

The page currently uses:

- hidden native `<select>` elements as the real state source
- visible button groups and settings cards as the custom UI

The implementation keeps those in sync by:

- updating the underlying select value from custom buttons
- dispatching a `change` event on the select
- letting the shared render path refresh the UI

If you redesign the settings UI, keep the "single source of truth" pattern intact.

## Core Frontend Modules

### `src/lib/callsign.js`

This module owns callsign generation and answer normalization.

Main exports include:

- `PRACTICE_MODES`
- `DEFAULT_CUSTOM_LETTERS`
- `normalizeAnswerInput()`
- `normalizeCustomLetterSet()`
- `buildCallsignSample()`
- `buildAnswerChoices()`

Current practice modes:

- `mixed`
  - randomly chooses between `transport` and `generalAviation`
- `transport`
  - examples: `CA123`, `MU2486`
  - accepted answers include the number only or the full callsign
- `generalAviation`
  - examples: `Cessna DXF`, `Piper A7K`
  - expected answer is the suffix after the aircraft type
- `numeric`
  - standalone number groups
- `letters`
  - custom letter pool plus configurable length

Current number pronunciation rules:

- single digits use ICAO-style digit words
  - `3 -> tree`
  - `5 -> fife`
  - `9 -> niner`
- 3 digits group as `1 + 2`
- 4 digits group as `2 + 2`
- 5 digits group as `1 + 2 + 2`

Answer normalization:

- uppercases input
- removes all non-alphanumeric characters

Distractor generation:

- starts from the correct normalized answer
- mutates 1 to 2 characters
- uses digit confusion sets and letter confusion groups
- may swap adjacent digits in transport mode

### `src/lib/practice-session.js`

This module owns session statistics.

Current session shape:

- `targetCount`
- `completedCount`
- `correctCount`
- `incorrectCount`
- `currentStreak`
- `bestStreak`
- `accuracy`

Current default target count is `10`.

### `src/lib/answer-flow.js`

This module provides pure answer-flow helpers:

- question state constants
- typed vs multiple-choice helpers
- readiness checks for submit
- round resolution logic
- visual state helpers for multiple-choice buttons

### `src/lib/ui-feedback.js`

This module provides:

- feedback state constants
- milestone copy builders
- session-complete copy builders

The current page mainly relies on its milestone message helpers.

### `src/lib/ui-audio.js`

This module provides lightweight UI sound and vibration feedback for:

- `submit`
- `correct`
- `incorrect`
- `milestone`

Implementation notes:

- reuses a shared `AudioContext`
- supports user-gesture unlock
- clamps volume to a safe range
- allows sound and vibration to be toggled independently

### `src/lib/ui-animations.js`

This module provides one-shot WAAPI helpers such as:

- `pulse`
- `shake`
- `pop`
- `fadeIn`
- `fadeOut`
- `slideIn`
- `slideOut`

Reduced-motion fallback behavior is built in.

### `src/lib/tts-client.js`

This module owns frontend TTS fetching and caching.

Current behavior:

- sends same-origin `POST /api/tts`
- request body includes `text`, `accent`, and `speakingRate`
- cache key includes
  - `text`
  - `accent`
  - `speakingRate`
  - `radioTone`
- cache stores `Blob URL` values

Important constraint:

- do not revoke per-phrase Blob URLs from page code
- the cache is URL-based
- cleanup is centralized in `clearTtsAudioCache()`

When `radioTone` is enabled, the browser:

1. decodes the returned audio
2. re-renders it in an `OfflineAudioContext`
3. applies filtering, compression, light wobble, and carrier tones
4. exports a new WAV blob for playback

If radio post-processing fails, the page falls back to the raw TTS audio.

## Backend TTS

`netlify/functions/tts.js` is the only backend endpoint in the project.

Request shape:

```json
{
  "text": "Air China one two tree",
  "accent": "mixed",
  "speakingRate": 1.2
}
```

Current accent groups:

- `mixed`
- `american`
- `british`
- `australian`
- `indian`

Compatibility mapping:

- `southeast_asia` maps to `indian`

Current backend behavior:

1. accept `POST` only
2. parse JSON
3. validate `text`
4. normalize `accent`
5. clamp or resolve `speakingRate`
6. if `TTS_API_KEY` exists
   - call Google Cloud TTS
   - return `audio/mpeg`
7. if `TTS_API_KEY` does not exist
   - generate a local fallback WAV
   - return `audio/wav`

Important design choice:

- if Google TTS is configured but fails, the function returns `502`
- it does not silently fall back to local synthesis
- this keeps provider failures visible

## Style File Responsibilities

- `src/styles/practice-shell.css`
  - design tokens
  - app shell
  - modal layout
  - shared buttons
  - help page styles
- `src/styles/practice-session.css`
  - round card
  - answer panel
  - summary panel
  - main page layout
- `src/styles/practice-feedback.css`
  - success, error, warning, listening, and complete-state visuals
- `src/styles/practice-motion.css`
  - listening-state pulse, sweep, and bar animations

## Environment Variables

Current backend env vars:

- `TTS_API_KEY`
- `GOOGLE_TTS_LANGUAGE_CODE`
- `GOOGLE_TTS_VOICE_NAME`
- `GOOGLE_TTS_SPEAKING_RATE`

Current defaults:

- `GOOGLE_TTS_LANGUAGE_CODE=en-US`
- `GOOGLE_TTS_VOICE_NAME=en-US-Standard-C`
- `GOOGLE_TTS_SPEAKING_RATE=1`

Important nuance:

- the frontend default speaking rate is still `1.2`
- normal page usage explicitly sends `1.2` unless the user changes it
- env defaults mostly matter for callers that omit `speakingRate`

Security constraints:

- keep `TTS_API_KEY` server-side only
- do not expose secrets in Astro pages
- keep `.env` out of version control

## Verified State

Verified in this environment on `2026-04-05`:

- `cmd /c npm run build` passed
- `npm run dev` started successfully
- `GET http://127.0.0.1:8888/` returned `200`
- `GET http://127.0.0.1:8888/help/` returned `200`
- `POST http://127.0.0.1:8888/api/tts` returned `200`
- `/api/tts` returned `audio/mpeg`

That last point means the local environment was using the Google TTS path rather than the fallback WAV path during verification.

## Important Constraints For Future Changes

If you change answer flow:

- preserve the current question-state progression
- keep typed and multiple-choice paths aligned with `resolveRoundAnswer()`
- remember that multiple choice is currently `select -> immediate check`

If you change callsign generation:

- keep `buildCallsignSample()` output shape stable unless you update the page too
- verify both typed and multiple-choice paths
- re-check accepted answers for transport and general aviation

If you change TTS:

- preserve `POST /api/tts`
- preserve the `text`, `accent`, and `speakingRate` contract unless you update the frontend
- re-verify Google voice names before changing presets

If you change audio caching:

- do not break the current Blob URL cache model
- do not leave revoked URLs inside the cache

If you change dev tooling or config:

- re-test `npm run dev`
- re-test `/api/tts`
- ensure `netlify.toml` and `package.json` stay BOM-free

## Known Gaps

- no formal automated test suite yet
- callsign generation is still synthetic rather than operationally realistic
- pronunciation rules are simplified for training
- radio tone depends on browser Web Audio support
- no persistent settings, history, or long-term streak tracking
- no backend caching for repeated Google TTS phrases
- no broad subjective QA across browsers and devices

## Good Next Steps

- add unit tests for `callsign.js`
- add request-validation and accent-mapping tests for `/api/tts`
- persist user settings locally
- add radio-tone presets
- improve realism of transport and GA callsign generation
- add backend caching for repeated phrases

## Suggested Reading Order

To understand the project quickly, read in this order:

1. `AGENTS.md`
2. `src/lib/callsign.js`
3. `src/lib/practice-session.js`
4. `src/lib/answer-flow.js`
5. `src/lib/tts-client.js`
6. `netlify/functions/tts.js`
7. `src/pages/index.astro`
8. `src/styles/practice-shell.css`
9. `src/styles/practice-session.css`
10. `src/pages/help.astro`
11. `src/content/help/getting-started.md`
