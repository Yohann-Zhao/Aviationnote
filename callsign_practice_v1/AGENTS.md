# Callsign_Practice Agent Notes

## Project Purpose

This project is a local-first aviation callsign dictation trainer.

It is no longer just a bare MVP that plays one synthetic callsign. The current app supports multiple practice modes, two answer modes, adjustable TTS speed, selectable English accents, and optional browser-side aviation radio post-processing.

## Current User-Facing Features

The current page lets the user:

1. See a session bar with:
   - current mode
   - round progress
   - current streak
   - accuracy
2. Choose one practice mode:
   - `Transport airline`
   - `General aviation`
   - `Numeric only`
   - `Custom letters`
3. Choose one answer mode:
   - `Type the answer`
   - `Choose from 4 similar options`
4. Choose one Google English accent preset:
   - `mixed`
   - `american`
   - `british`
   - `australian`
   - `indian`
5. Adjust speaking rate with a range slider:
   - default UI value: `1.2`
   - current supported range: `0.25` to `2.0`
6. Toggle `Simulate aviation radio tone after synthesis`
   - this is a browser-side post-process
   - it does **not** ask Google for a different voice model
7. Start a round with the primary CTA:
   - `Play Callsign`
   - `Check`
   - `Next Callsign`
8. Replay the current sample with a secondary `Play Again` action
9. Reveal or hide the answer
10. Answer by typing or by selecting one of four similar-looking distractors
    - multiple-choice now uses `select -> Check`
    - it no longer resolves immediately on click
11. See strong feedback states:
    - `Ready`
    - `Listening`
    - `Checking`
    - `Correct`
    - `Not quite`
    - `Session complete`
12. Complete a soft `10 callsigns` session and review a summary panel
13. Get lightweight streak / progress toasts and optional UI sound / vibration feedback
14. Keep advanced controls folded away in an `Advanced settings` section

## Current Stack

- Frontend: Astro, single page in `src/pages/index.astro`
- Frontend state helpers: small ES modules in `src/lib/`
- Frontend styles: split CSS files in `src/styles/`
- Backend: Netlify Functions
- Full local dev entrypoint: `npm run dev`
- Astro-only dev entrypoint: `npm run dev:astro`
- TTS provider: Google Cloud Text-to-Speech via server-side API key
- Audio post-processing: browser Web Audio API in `src/lib/tts-client.js`
- UI feedback audio: browser Web Audio API in `src/lib/ui-audio.js`

## Important Files

- `src/pages/index.astro`
  - Main page shell and DOM structure
  - Wires practice mode -> generation -> TTS -> playback -> answer resolution
  - Connects session state, feedback state, motion, and UI audio helpers
  - Contains the primary round CTA and advanced settings UI

- `src/lib/practice-session.js`
  - Session stats model
  - Progress / streak / accuracy updates
  - Session summary helpers

- `src/lib/answer-flow.js`
  - Question state enum
  - Answer submit readiness
  - Typed / multiple-choice resolution helpers

- `src/lib/ui-feedback.js`
  - Feedback state names
  - Feedback copy builders
  - Streak and progress milestone messages

- `src/lib/ui-audio.js`
  - UI sound synthesis helpers
  - Optional vibration helpers
  - Toggleable audio/vibration controller

- `src/lib/ui-animations.js`
  - Small one-shot WAAPI helpers
  - Reduced-motion friendly animation fallbacks

- `src/lib/callsign.js`
  - Callsign sample generation
  - Answer normalization
  - Accepted-answer handling
  - Distractor generation for 4-choice mode
  - Numeric and alphanumeric pronunciation helpers

- `src/lib/tts-client.js`
  - Frontend client for `/api/tts`
  - Cache key includes `text`, `accent`, `speakingRate`, and `radioTone`
  - Creates Blob URLs
  - Applies optional browser-side radio post-processing
  - Cleans up Blob URLs on unload

- `src/styles/practice-shell.css`
  - App shell, layout, controls, and shared tokens

- `src/styles/practice-session.css`
  - Session bar, round card, answer area, and summary layout

- `src/styles/practice-feedback.css`
  - Feedback tone styling and answer-state styling

- `src/styles/practice-motion.css`
  - Listening-state pulse / sweep / signal animations
  - Reduced-motion overrides

- `netlify/functions/tts.js`
  - Backend TTS endpoint
  - Accepts `text`, `accent`, and `speakingRate`
  - Chooses a Google voice preset from the current official English voice list in use by the project
  - Falls back to local WAV tone synthesis only when no API key exists

- `netlify.toml`
  - Netlify dev routing
  - Dev proxy port `8888`
  - Astro target port `4321`
  - Redirects `/api/tts` to the function

- `package.json`
  - `npm run dev` starts full `netlify dev`
  - `npm run dev:astro` starts Astro only

- `.env`
  - Local secrets and optional TTS defaults
  - Must stay out of version control

- `callsign_practice.html`
  - Legacy reference file only
  - Not used by the Astro runtime
  - Still useful when comparing old feature intent, especially radio-tone ideas

## File Tree To Care About

```text
/
  AGENTS.md
  .env
  .gitignore
  package.json
  astro.config.mjs
  netlify.toml
  src/
    pages/
      index.astro
    lib/
      answer-flow.js
      callsign.js
      practice-session.js
      tts-client.js
      ui-animations.js
      ui-audio.js
      ui-feedback.js
    styles/
      practice-feedback.css
      practice-motion.css
      practice-session.css
      practice-shell.css
  netlify/
    functions/
      tts.js
```

Ignore `node_modules/`, `.astro/`, `dist/`, and `.netlify/` unless debugging tooling or build output.

## Runtime Architecture

### Frontend Flow

`src/pages/index.astro` imports:

- `buildCallsignSample()` from `src/lib/callsign.js`
- `buildAnswerChoices()` from `src/lib/callsign.js`
- `normalizeCustomLetterSet()` from `src/lib/callsign.js`
- `fetchTtsAudioUrl()` and `clearTtsAudioCache()` from `src/lib/tts-client.js`
- session helpers from `src/lib/practice-session.js`
- question-state helpers from `src/lib/answer-flow.js`
- feedback helpers from `src/lib/ui-feedback.js`
- animation helpers from `src/lib/ui-animations.js`
- UI sound / vibration helpers from `src/lib/ui-audio.js`

Current runtime flow:

1. User chooses mode / answer mode, then optionally opens advanced settings for accent / speed / radio-tone / custom letters / UI sound / vibration
2. The primary CTA starts or advances a round
3. `startRound()` builds a sample object from `buildCallsignSample()`
4. The page builds 4-choice distractors when multiple-choice mode is active
5. `playCurrentSample()` calls `fetchTtsAudioUrl()` with:
   - `text`
   - `accent`
   - `speakingRate`
   - `radioTone`
6. `fetchTtsAudioUrl()` POSTs to `/api/tts` with:

```json
{
  "text": "...",
  "accent": "american",
  "speakingRate": 1.2
}
```

7. The backend returns audio bytes
8. If `radioTone` is enabled, the browser re-renders the returned audio using Web Audio filters and exports a WAV Blob
9. The resulting Blob URL is assigned to the hidden `<audio>` element
10. When playback ends, focus moves to the answer area
11. The user answers either by typing or by choosing one option, then pressing `Check`
12. `resolveRoundAnswer()` validates the submitted answer
13. `applyAnswerResult()` updates progress / streak / accuracy
14. The page shows feedback, optional milestone toast, optional UI sound / vibration, and either `Next Callsign` or the session summary after 10 resolved questions

### Backend Flow

`netlify/functions/tts.js` handles `POST /api/tts`.

Current expected request body:

```json
{
  "text": "Air China one two tree",
  "accent": "british",
  "speakingRate": 1.2
}
```

Backend behavior:

1. Parse JSON body
2. Validate `text`
3. Normalize `accent`
4. Clamp/resolve `speakingRate`
5. If `process.env.TTS_API_KEY` exists:
   - choose a Google voice preset for the accent
   - call Google Cloud `text:synthesize`
   - return `audio/mpeg`
6. If no API key exists:
   - synthesize a local WAV fallback
   - approximate speed by shortening tone/silence durations

Important detail:

- If Google is configured but fails, the function returns `502`
- It does **not** silently fall back in that case
- This is intentional so provider failures stay visible

## Callsign Logic

Implemented in `src/lib/callsign.js`.

### Practice Modes

Current supported modes:

1. `transport`
   - Example displayed callsign: `CA1234`
   - Spoken phrase example: `Air China twelve thirty four` or digit-by-digit for 3-digit flights
   - Expected answer: flight number only, for example `1234`
   - Accepted answers also include the full callsign, for example `CA1234`

2. `generalAviation`
   - Example displayed callsign: `Cessna DXF`
   - Spoken phrase example: `Cessna Delta X-ray Foxtrot`
   - Expected answer: suffix only, for example `DXF`
   - Accepted answers also include the full displayed callsign
   - Current implementation can generate all-letter suffixes or mixed alphanumeric suffixes

3. `numeric`
   - Example displayed callsign: `7023`
   - Spoken phrase example: `seventy twenty tree`
   - Expected answer: full numeric string

4. `letters`
   - Example displayed callsign: `DXFQ`
   - Spoken phrase example: `Delta X-ray Foxtrot Quebec`
   - Expected answer: full letter string
   - Uses the custom letter pool and configured letter length

### Current Pronunciation Rules

Single digits use the current project mapping:

- `0 -> zero`
- `1 -> one`
- `2 -> two`
- `3 -> tree`
- `4 -> four`
- `5 -> fife`
- `6 -> six`
- `7 -> seven`
- `8 -> eight`
- `9 -> niner`

Two-digit groups:

- Leading zero group: `05 -> zero fife`
- Teens: `10 -> ten`, `17 -> seventeen`
- Tens: `70 -> seventy`, `23 -> twenty tree`

Grouping strategy:

- 1-2 digits: one group
- 3 digits: `1 + 2`
- 4 digits: `2 + 2`
- 5 digits: `1 + 2 + 2`

Examples:

- `7023 -> seventy twenty tree`
- `123 -> one twenty tree`
- `9081 -> ninety zero one`

### Answer Normalization

`normalizeAnswerInput()` currently:

- uppercases input
- removes all non-alphanumeric characters

That means inputs like `ca-123`, `CA 123`, and `ca123` normalize to the same value.

### Multiple-Choice Distractors

`buildAnswerChoices()` currently:

- starts from the correct normalized answer
- mutates 1-2 characters
- uses digit confusion sets and letter confusion groups
- sometimes swaps adjacent transport digits to create realistic distractors

## Frontend Audio Notes

Implemented in `src/lib/tts-client.js`.

### Request + Cache Behavior

Behavior:

- same-origin `fetch("/api/tts")`
- in-memory cache maps a composite key to a Blob URL
- cache key currently includes:
  - `text`
  - `accent`
  - `speakingRate`
  - `radioTone`
- cleanup is centralized in `clearTtsAudioCache()`

Important implementation note:

- do not revoke per-phrase URLs from page code while also caching them
- that can leave the cache holding revoked Blob URLs

### 404 Developer Hint

If `/api/tts` returns `404`, the frontend currently throws a more useful message telling the developer to start the app with `npm run dev` or `netlify dev`.

### Radio Tone Post-Processing

If `radioTone` is enabled:

- the frontend decodes the returned audio using Web Audio
- re-renders through an `OfflineAudioContext`
- applies:
  - high-pass filtering
  - band-pass narrowing
  - low-pass filtering
  - mild waveshaping
  - compression
  - light amplitude wobble
  - light pitch wobble
  - a continuous low carrier tone
  - a faint higher carrier tone
- exports a WAV Blob for playback

Important constraints:

- this effect is browser-side only
- it intentionally does **not** add random hiss/noise bursts right now
- it should sound more like constrained radio bandwidth plus carrier tone, not static
- if Web Audio processing fails, the app falls back to the raw TTS audio

## Google Cloud TTS Notes

Implemented in `netlify/functions/tts.js`.

### Current Accent Presets In Use

The current UI only exposes these accent groups:

- `mixed`
- `american`
- `british`
- `australian`
- `indian`

The backend currently still accepts legacy `southeast_asia`, but maps it to `indian` for compatibility.

### Voice Source

The current project voice presets were updated against the official Google Cloud Text-to-Speech supported voices page.

Important current behavior:

- `en-SG-Standard-A` is **not** used anymore
- the project previously failed with `400 INVALID_ARGUMENT` because that voice name does not exist in the current supported list
- if you update accent presets again later, verify them against the current Google documentation first

### Current Google Request Shape

```json
{
  "input": { "text": "..." },
  "voice": {
    "languageCode": "en-US",
    "name": "en-US-Standard-C"
  },
  "audioConfig": {
    "audioEncoding": "MP3",
    "speakingRate": 1.2
  }
}
```

Current endpoint:

```text
https://texttospeech.googleapis.com/v1/text:synthesize?key=...
```

### Speaking Rate Notes

Current supported range in code:

- minimum: `0.25`
- maximum: `2.0`

Frontend default:

- `1.2`

Backend fallback behavior:

- if request `speakingRate` is missing, backend falls back to `GOOGLE_TTS_SPEAKING_RATE`
- if env var is also absent, backend falls back to `1`

## Environment Variables

Current local `.env` fields:

- `TTS_API_KEY`
- `GOOGLE_TTS_LANGUAGE_CODE`
- `GOOGLE_TTS_VOICE_NAME`
- `GOOGLE_TTS_SPEAKING_RATE`

Expected backend defaults if optional fields are absent:

- `GOOGLE_TTS_LANGUAGE_CODE=en-US`
- `GOOGLE_TTS_VOICE_NAME=en-US-Standard-C`
- `GOOGLE_TTS_SPEAKING_RATE=1`

Important nuance:

- the page default is still `1.2`
- so if the user does not touch the slider, the frontend explicitly requests `1.2`
- the env var default mainly matters for callers that omit `speakingRate`

Secrets policy:

- never expose `TTS_API_KEY` to the frontend
- never hardcode secrets into Astro pages
- `.env` is ignored by `.gitignore`

## Netlify / Local Dev Notes

### Current Commands

Install dependencies:

```bash
npm install
```

Run the full app locally with function routing:

```bash
npm run dev
```

Run Astro only:

```bash
npm run dev:astro
```

Build:

```bash
npm run build
```

### Important Dev Behavior

- `npm run dev` is the correct default local command now
- it starts `netlify dev`
- `netlify dev` then starts Astro through `npm run dev:astro`
- function routing is available on `http://localhost:8888`
- Astro itself runs on `http://localhost:4321`

Important gotcha:

- `npm run dev:astro` alone does **not** provide `/api/tts`
- if you open the Astro-only server and try to synthesize audio, `/api/tts` will 404

### Encoding Gotchas

These files must stay BOM-free:

- `netlify.toml`
- `package.json`

Reasons:

- Netlify CLI can fail to parse BOM-tainted `netlify.toml`
- Astro / Vite tooling can fail to parse BOM-tainted `package.json`

If dev startup suddenly fails with strange parse errors, check file encoding first.

## Verified State

The current project has been verified in this environment with the current feature set.

Verified results:

- `cmd /c npm run build` passes
- `npm run dev` starts correctly
- `GET /` returns `200`
- `POST /api/tts` returns audio successfully
- Google path returns `audio/mpeg`
- round-based UX refactor build passes
- session bar, summary panel, feedback panel, replay, and advanced-settings layout all load through the current Astro page
- accent smoke test passed for:
  - `american`
  - `british`
  - `australian`
  - `indian`
  - `mixed`

Operational shortcut:

- if `/api/tts` returns `audio/wav`, the app is using the local fallback path
- if `/api/tts` returns `audio/mpeg`, the app is using Google Cloud TTS

What has **not** been machine-verified here:

- subjective listening quality of the radio-tone effect
- browser-by-browser behavior of OfflineAudioContext on every platform

## Known Limitations

- no formal automated test suite yet
- callsign generation is still synthetic rather than a real operational callsign model
- pronunciation rules are simplified and not fully ICAO-accurate in all cases
- radio-tone rendering is browser-side and depends on Web Audio availability
- no persistence or history
- no local save for completed sessions, streak history, or user settings
- no retry/backoff logic for Google API calls
- no backend audio caching of Google responses yet
- no browser-by-browser subjective QA yet for motion, vibration, or UI sound balance

## Safe Change Strategy For Future Agents

If you modify generation logic:

- keep `buildCallsignSample()` returning the same general shape unless you also update the page
- re-check both typed-answer and multiple-choice flows
- re-check accepted answer variants for transport and general aviation

If you modify the TTS endpoint:

- preserve `POST /api/tts`
- preserve `text`, `accent`, and `speakingRate` unless you also update the frontend client
- re-verify every accent preset against the current Google docs if you change voice names

If you modify frontend audio behavior:

- re-check Blob URL lifecycle
- re-check replay behavior
- re-check autoplay restrictions
- re-check radio-tone processing fallback to raw audio

If you modify Netlify config or package scripts:

- re-test `npm run dev`
- re-test `/api/tts`
- re-check file encoding on `netlify.toml` and `package.json`

If you swap providers:

- keep provider code server-side
- keep secrets in env vars
- prefer maintaining the current frontend request contract

## Suggested Next Improvements

Good next steps if requested:

1. Add tests:
   - callsign parsing and pronunciation
   - distractor generation
   - `/api/tts` validation and accent mapping

2. Improve the callsign model:
   - richer airline data
   - more realistic GA registration patterns
   - more intentional mixed alphanumeric suffix rules

3. Deepen the session UX:
   - keyboard shortcuts
   - optional auto-reveal on wrong answer only
   - local persistence for settings / recent sessions
   - post-session challenge recommendations

4. Improve audio:
   - more tunable radio effect controls
   - optional radio-tone presets
   - balance / mix tuning for UI audio feedback
   - optional server-side post-processing if ever needed

5. Improve backend performance:
   - response caching for repeated phrases
   - provider error classification
   - better structured logging

## For The Next Agent

Before changing anything:

1. Read this file
2. Read `src/lib/callsign.js`
3. Read `src/lib/practice-session.js`
4. Read `src/lib/answer-flow.js`
5. Read `src/lib/ui-feedback.js`
6. Read `src/lib/ui-audio.js`
7. Read `src/lib/tts-client.js`
8. Read `netlify/functions/tts.js`
9. Read `src/pages/index.astro`
10. Read `src/styles/practice-shell.css`
11. Run `npm run dev`
12. Verify `POST /api/tts`

If behavior looks wrong, first check:

- `.env` exists
- `TTS_API_KEY` is loaded
- `netlify.toml` is BOM-free
- `package.json` is BOM-free
- `/api/tts` is returning the expected content type
- the page is reaching `questionState` transitions correctly:
  - `idle -> preparing -> listening -> answering -> checking -> resolved/sessionComplete`
- the requested Google voice names still exist in the current official docs
