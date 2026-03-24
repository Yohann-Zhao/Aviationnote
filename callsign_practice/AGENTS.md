# Callsign_Practice Agent Notes

## Project Purpose

This project is a minimal MVP for aviation callsign dictation practice.

Current user flow:

1. User clicks `Generate and Play`
2. Frontend generates a random aviation-style callsign such as `Cessna7023`
3. Frontend converts it to a simplified ICAO-style spoken phrase such as `Cessna seventy twenty tree`
4. Frontend posts `{ text }` to `/api/tts`
5. Netlify Function synthesizes audio
6. Browser plays the returned audio

The project intentionally prioritizes functionality over styling.

## Current Stack

- Frontend: Astro, single page
- Backend: Netlify Functions
- Local dev: `netlify dev`
- TTS provider: Google Cloud Text-to-Speech via server-side API key

## Important Files

- `src/pages/index.astro`
  - Main page
  - Minimal UI
  - Wires generate -> convert -> fetch audio -> play

- `src/lib/callsign.js`
  - Callsign generation
  - Callsign parsing
  - Numeric grouping and ICAO-style pronunciation

- `src/lib/tts-client.js`
  - Frontend client for `/api/tts`
  - Blob URL creation
  - In-memory cache for repeated phrases
  - Cache cleanup on unload

- `netlify/functions/tts.js`
  - Backend TTS endpoint
  - Uses Google Cloud TTS when `TTS_API_KEY` exists
  - Falls back to local WAV tone synthesis only when no key exists

- `netlify.toml`
  - Netlify dev proxy config
  - Redirects `/api/tts` to the function

- `.env`
  - Local secrets and TTS config
  - Must stay out of version control

- `callsign_practice.html`
  - Legacy draft file
  - Not part of the Astro app runtime
  - Keep only as historical reference unless the user asks to remove it

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

Ignore `node_modules/`, `.astro/`, `dist/`, and `.netlify/` unless debugging tooling.

## Runtime Architecture

### Frontend Flow

`src/pages/index.astro` imports:

- `buildCallsignSample()` from `src/lib/callsign.js`
- `fetchTtsAudioUrl()` and `clearTtsAudioCache()` from `src/lib/tts-client.js`

Runtime flow:

1. `generateAndPlay()` creates a sample:
   - `callsign`
   - `spokenPhrase`
2. UI updates with both values
3. `playPhrase()` calls `/api/tts`
4. Response bytes are converted to a Blob URL
5. Blob URL is assigned to `<audio>`
6. Browser plays the audio

### Backend Flow

`netlify/functions/tts.js` handles `POST /api/tts`.

Expected request body:

```json
{ "text": "Cessna seventy twenty tree" }
```

Backend behavior:

1. Parse JSON body
2. Validate `text`
3. If `process.env.TTS_API_KEY` exists:
   - Call Google Cloud `text:synthesize`
   - Return MP3 audio
4. If `TTS_API_KEY` does not exist:
   - Return locally generated WAV fallback audio

Important detail:

- If Google is configured but fails, the function returns `502`
- It does **not** silently fall back in that case
- This is intentional so provider failures are visible

## Callsign Logic

Implemented in `src/lib/callsign.js`.

### Generation

Current generator format:

- `[Manufacturer][Number]`

Examples:

- `Cessna7023`
- `Boeing123`
- `Diamond481`

Manufacturers are currently chosen from a fixed list:

- `Cessna`
- `Piper`
- `Beechcraft`
- `Diamond`
- `Cirrus`
- `Boeing`
- `Airbus`
- `Embraer`

Numeric suffix length is currently random from:

- 3 digits
- 4 digits

### Parsing

`splitCallsign()` uses a trailing-digit regex:

```js
/^(.*?)(\d+)$/
```

So the logic assumes the prefix is everything before the trailing number block.

### Pronunciation Rules

Single digits use simplified ICAO words:

- `0 -> zero`
- `1 -> one`
- `2 -> two`
- `3 -> tree`
- `4 -> fower`
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

This grouping is deliberately simple and extendable.

## TTS Client Notes

Implemented in `src/lib/tts-client.js`.

Behavior:

- Same-origin `fetch("/api/tts")`
- Converts returned bytes to a Blob URL
- Caches `text -> Blob URL` in memory
- Cleans up all Blob URLs on `beforeunload`

Important implementation note:

- Do not revoke per-phrase URLs in page code while also caching them
- That previously caused the cache to hold revoked Blob URLs
- Cleanup responsibility is intentionally centralized in `clearTtsAudioCache()`

## Google Cloud TTS Notes

Implemented in `netlify/functions/tts.js`.

Current Google request shape:

```json
{
  "input": { "text": "..." },
  "voice": {
    "languageCode": "en-US",
    "name": "en-US-Standard-C"
  },
  "audioConfig": {
    "audioEncoding": "MP3",
    "speakingRate": 1
  }
}
```

Current endpoint:

```text
https://texttospeech.googleapis.com/v1/text:synthesize?key=...
```

Important caution:

- This project currently uses an API key on the server side
- That works in the current local setup
- Google Cloud documentation often emphasizes OAuth/ADC for server-to-server use
- If this integration later fails in a new environment, the likely migration path is service-account auth, not frontend changes

## Environment Variables

Current local `.env` fields:

- `TTS_API_KEY`
- `GOOGLE_TTS_LANGUAGE_CODE`
- `GOOGLE_TTS_VOICE_NAME`
- `GOOGLE_TTS_SPEAKING_RATE`

Expected defaults if optional voice settings are absent:

- `GOOGLE_TTS_LANGUAGE_CODE=en-US`
- `GOOGLE_TTS_VOICE_NAME=en-US-Standard-C`
- `GOOGLE_TTS_SPEAKING_RATE=1`

Secrets policy:

- Never expose `TTS_API_KEY` to the frontend
- Never hardcode secrets into Astro pages
- `.env` is ignored by `.gitignore`
- The temporary `api_key.md` file was intentionally deleted after the secret was migrated

## Netlify Dev Notes

`netlify.toml` currently defines:

- publish dir: `dist`
- functions dir: `netlify/functions`
- dev command: `npm run dev`
- dev proxy port: `8888`
- Astro target port: `4321`
- redirect: `/api/tts -> /.netlify/functions/tts`

Important gotcha:

- `netlify.toml` must be saved **without BOM**
- Netlify CLI failed to parse the file when it contained a UTF-8 BOM

If `netlify dev` suddenly fails with a TOML parse error mentioning `Unknown character "65279"`, check file encoding first.

## Commands

Install dependencies:

```bash
npm install
```

Run Astro only:

```bash
npm run dev
```

Run full local app with function routing:

```bash
netlify dev
```

Build:

```bash
npm run build
```

## Verified State

This project has already been verified in the current environment:

- `npm run build` passes
- `netlify dev` starts correctly
- `GET /` returns `200`
- `POST /api/tts` returns audio successfully
- Google path was verified to return `audio/mpeg`

Operational shortcut:

- If `/api/tts` returns `audio/wav`, the app is using the local fallback path
- If `/api/tts` returns `audio/mpeg`, the app is using Google Cloud TTS

## Known Limitations

- UI is intentionally minimal
- No formal test suite yet
- Callsign generator is synthetic, not a full real-world callsign model
- Spoken-number grouping is simplified
- There is no persistence or history
- No loading indicator beyond status text
- No retry/backoff logic for Google API calls

## Safe Change Strategy For Future Agents

If you modify generation logic:

- Keep `buildCallsignSample()` returning the same shape unless you also update the page

If you modify the TTS endpoint:

- Preserve `POST /api/tts`
- Preserve `{ text }` request contract unless you also update `src/lib/tts-client.js`

If you modify frontend audio behavior:

- Re-check Blob URL lifecycle
- Re-check replay behavior
- Re-check browser autoplay restrictions

If you modify Netlify config:

- Re-test `netlify dev`
- Re-test `/api/tts`
- Re-check file encoding on `netlify.toml`

If you swap providers:

- Keep the provider code server-side
- Keep secrets in env vars
- Prefer maintaining the existing frontend contract

## Suggested Next Improvements

Good next steps if requested:

1. Add a richer callsign model:
   - airline callsigns
   - letter suffixes
   - mixed alphanumeric forms

2. Improve pronunciation logic:
   - more ICAO-accurate grouping
   - per-digit vs grouped reading modes

3. Add tests:
   - callsign parsing
   - grouping rules
   - `/api/tts` request validation

4. Add frontend state improvements:
   - loading state
   - error panel
   - replay current sample without regenerating

5. Add backend caching:
   - hash `text`
   - memoize repeated Google responses locally

## For The Next Agent

Before changing anything:

1. Read this file
2. Read `src/lib/callsign.js`
3. Read `src/lib/tts-client.js`
4. Read `netlify/functions/tts.js`
5. Run `netlify dev` and verify `/api/tts`

If behavior looks wrong, first check:

- `.env` exists
- `TTS_API_KEY` is loaded
- `netlify.toml` encoding is BOM-free
- `/api/tts` is returning the expected content type
