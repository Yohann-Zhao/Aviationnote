# Callsign_Practice Agent Notes

## Project Purpose

This project is a local-first aviation callsign dictation trainer.

It is no longer just a bare MVP that plays one synthetic callsign. The current app supports multiple practice modes, two answer modes, adjustable TTS speed, selectable English accents, and optional browser-side aviation radio post-processing.

## Current User-Facing Features

The current page lets the user:

1. Choose one practice mode:
   - `Transport airline`
   - `General aviation`
   - `Numeric only`
   - `Custom letters`
2. Choose one answer mode:
   - `Type the answer`
   - `Choose from 4 similar options`
3. Choose one Google English accent preset:
   - `mixed`
   - `american`
   - `british`
   - `australian`
   - `indian`
4. Adjust speaking rate with a range slider:
   - default UI value: `1.2`
   - current supported range: `0.25` to `2.0`
5. Toggle `Simulate aviation radio tone after synthesis`
   - this is a browser-side post-process
   - it does **not** ask Google for a different voice model
6. Generate a new sample and play it
7. Replay the current sample
8. Reveal or hide the answer
9. Answer by typing or by selecting one of four similar-looking distractors

## Current Stack

- Frontend: Astro, single page, inline script in `src/pages/index.astro`
- Backend: Netlify Functions
- Full local dev entrypoint: `npm run dev`
- Astro-only dev entrypoint: `npm run dev:astro`
- TTS provider: Google Cloud Text-to-Speech via server-side API key
- Audio post-processing: browser Web Audio API in `src/lib/tts-client.js`

## Important Files

- `src/pages/index.astro`
  - Main UI
  - Holds all current page state and event handlers
  - Wires practice mode -> generation -> TTS -> playback -> answer checking
  - Contains speaking-rate slider and radio-tone checkbox

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
      callsign.js
      tts-client.js
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
- `normalizeAnswerInput()` and `normalizeCustomLetterSet()` from `src/lib/callsign.js`
- `fetchTtsAudioUrl()` and `clearTtsAudioCache()` from `src/lib/tts-client.js`

Current runtime flow:

1. User chooses mode / accent / speed / radio-tone / answer mode
2. `generateAndPlay()` builds a sample object from `buildCallsignSample()`
3. The page builds 4-choice distractors when multiple-choice mode is active
4. `playCurrentSample()` calls `fetchTtsAudioUrl()` with:
   - `text`
   - `accent`
   - `speakingRate`
   - `radioTone`
5. `fetchTtsAudioUrl()` POSTs to `/api/tts` with:

```json
{
  "text": "...",
  "accent": "american",
  "speakingRate": 1.2
}
```

6. The backend returns audio bytes
7. If `radioTone` is enabled, the browser re-renders the returned audio using Web Audio filters and exports a WAV Blob
8. The resulting Blob URL is assigned to the `<audio>` element
9. The user answers either by typing or picking one of four options

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
- no scoring, streaks, or session stats
- no retry/backoff logic for Google API calls
- no backend audio caching of Google responses yet

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

3. Improve answer UX:
   - explicit success/failure counters
   - next-question flow
   - keyboard shortcuts
   - optional auto-reveal on wrong answer only

4. Improve audio:
   - more tunable radio effect controls
   - optional radio-tone presets
   - optional server-side post-processing if ever needed

5. Improve backend performance:
   - response caching for repeated phrases
   - provider error classification
   - better structured logging

## For The Next Agent

Before changing anything:

1. Read this file
2. Read `src/lib/callsign.js`
3. Read `src/lib/tts-client.js`
4. Read `netlify/functions/tts.js`
5. Read `src/pages/index.astro`
6. Run `npm run dev`
7. Verify `POST /api/tts`

If behavior looks wrong, first check:

- `.env` exists
- `TTS_API_KEY` is loaded
- `netlify.toml` is BOM-free
- `package.json` is BOM-free
- `/api/tts` is returning the expected content type
- the requested Google voice names still exist in the current official docs
