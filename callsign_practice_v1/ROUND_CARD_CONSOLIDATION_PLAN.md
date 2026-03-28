# Round Card Consolidation Plan

## Goal

Turn the top round card into the single source of truth for:

- playback state
- answer reveal
- correct / incorrect feedback
- answer review details
- state color / theme shifts

The lower feedback panel should be removed once the round card fully covers those jobs.

## UX Direction

Use one primary card with three layers:

1. Header chips
   - mode
   - round
   - voice

2. Main stage
   - signal visual
   - status eyebrow
   - primary headline
   - one short supporting line

3. Unified detail card
   - hidden by default
   - shown for manual `Show Answer`
   - shown automatically after answer resolution
   - reused for both preview and review

## Card States

- `neutral`
  - idle
  - answering

- `listening`
  - playback in progress

- `warning`
  - checking
  - transient prompts like "Answer first"

- `success`
  - correct answer

- `error`
  - incorrect answer
  - transient operational errors

- `complete`
  - session complete

## Unified Detail Card

Shared fields:

- label
- full callsign
- expected answer or instruction
- pronunciation
- optional submitted answer

Modes:

- Preview mode
  - label: `Answer`
  - triggered by `Show Answer`

- Review mode, correct
  - label: `Confirmed`

- Review mode, incorrect
  - label: `Correct answer`
  - includes `Your answer: ...`

## Implementation Notes

- Keep the current answer panel separate for input.
- Remove the lower feedback panel entirely.
- Keep the existing session summary panel for now.
- Replace feedback rendering with round-card rendering.
- Add round-card tone styling in CSS instead of separate feedback-panel styling.

## Initial Landing Scope

- [x] Write plan doc
- [x] Remove lower feedback panel
- [x] Move answer review into top card
- [x] Add top-card tone states
- [x] Rebuild and verify
