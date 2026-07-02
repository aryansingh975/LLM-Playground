# Spec S8.2 — Star Rating

## Overview
Add a reusable 5-star rating widget for AI responses, and wire it into the "Rate Responses"
section of `EvaluatePage` (built as a placeholder in S8.1). Ratings are stored in the browser
(`localStorage`), keyed by a response id, so a rating survives page reloads and remounts. This is
the first spec in the project to touch browser storage.

## Dependencies
- S8.1 — Evaluate Route (`done`). Provides `EvaluatePage` and the `eval-rate-section` placeholder
  ("No responses to rate yet") this spec replaces with real widgets.
- S3.2 — Message Thread (`done`). Provides the `{ role, text }` message shape this spec's sample
  AI responses mirror (`role: 'assistant'` entries only — user prompts are not rated).

## Target Location
`src/StarRating.jsx` (new file — the reusable widget), `src/EvaluatePage.jsx` (modified — replace
the static "Rate Responses" placeholder with a list of sample AI responses, each paired with a
`StarRating`)

---

## Functional Requirements

### FR-1: `StarRating` renders 5 clickable stars and reports the selected value
- **What**: Renders 5 star buttons. Clicking star *N* (1-5) visually fills stars 1..N (and leaves
  N+1..5 unfilled), and calls the optional `onRate(N)` callback.
- **Inputs**: props `responseId` (string, required — storage key), `initialRating` (number,
  optional, default `0`), `onRate` (function, optional).
- **Outputs**: DOM with 5 accessible buttons (`aria-label="Rate 1 star"` … `"Rate 5 stars"`); the
  currently selected count is reflected via `aria-checked`/a `filled` class (implementation's
  choice, but must be queryable in tests); `onRate` invoked with the clicked value.
- **Edge cases**: clicking the already-selected star re-confirms the same value (no toggle-off);
  clicking a lower star than the current rating reduces it to that value.

### FR-2: Ratings persist to `localStorage`, keyed by `responseId`
- **What**: On click, the widget writes the new rating into a single JSON object stored under the
  key `llm-playground:ratings` in `localStorage`, keyed by `responseId` (e.g.
  `{ "r1": 4, "r2": 2 }`). On mount, the widget reads that key and hydrates its displayed rating
  from it, falling back to `initialRating` (then `0`) if the key is absent for that `responseId`.
- **Inputs**: `localStorage` state (read on mount, written on click).
- **Outputs**: after a click, `JSON.parse(localStorage.getItem('llm-playground:ratings'))` has the
  clicked value under `responseId`; a fresh mount of a `StarRating` with the same `responseId`
  displays the persisted rating.
- **Edge cases**: `localStorage` empty or holding malformed JSON for the `ratings` key is treated
  as "no ratings yet" (falls back to `initialRating`/`0`, does not throw); two widgets with
  different `responseId`s read/write independent entries and never clobber each other's rating.

### FR-3: `EvaluatePage`'s "Rate Responses" section renders one `StarRating` per sample AI response
- **What**: `EvaluatePage` accepts an optional `sampleResponses` prop — an array of
  `{ id: string, text: string }` (default: a small built-in list of 2-3 sample assistant-role
  entries, matching S3.2's message shape). Inside `eval-rate-section`, it renders one row per
  entry: the response `text` plus a `<StarRating responseId={id} />`. When `sampleResponses` is
  empty, it renders the original "No responses to rate yet" placeholder text instead (the section
  itself, its `data-testid`, and its "Rate Responses" heading are unchanged from S8.1).
- **Inputs**: `sampleResponses` prop (optional array; `App.jsx` renders `<EvaluatePage />` with no
  props, so production use is the default sample list — live chat history is not wired in by this
  spec).
- **Outputs**: `eval-rate-section` contains N response rows with N `StarRating` widgets, or the
  placeholder text when N is `0`.
- **Edge cases**: empty `sampleResponses` array falls back to the placeholder text (existing S8.1
  behavior preserved); each row's `StarRating` uses the entry's `id` as `responseId` so ratings for
  different sample responses don't collide in `localStorage`.

---

## Tangible Outcomes

- [ ] **Outcome 1**: `StarRating` renders 5 stars; clicking star *N* fills stars 1..N, leaves the
  rest unfilled, and calls `onRate(N)`.
- [ ] **Outcome 2**: A rating written via click is readable from
  `localStorage['llm-playground:ratings']` keyed by `responseId`, and is restored when a
  `StarRating` with the same `responseId` is remounted.
- [ ] **Outcome 3**: `EvaluatePage`'s `eval-rate-section` renders a `StarRating` per entry in
  `sampleResponses` (default or overridden), and falls back to "No responses to rate yet" when
  that list is empty.

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)
1. **test_star_rating_renders_five_stars** (`StarRating.test.jsx`): render
   `<StarRating responseId="r1" />`; assert 5 star buttons are present.
2. **test_clicking_star_fills_up_to_that_star_and_calls_onRate** (`StarRating.test.jsx`): render
   with an `onRate` spy; click the 3rd star; assert stars 1-3 are marked filled, 4-5 are not, and
   `onRate` was called with `3`.
3. **test_rating_persists_to_localStorage** (`StarRating.test.jsx`): clear `localStorage`; render
   `<StarRating responseId="r1" />`; click a star; assert
   `JSON.parse(localStorage.getItem('llm-playground:ratings')).r1` equals the clicked value.
4. **test_rating_hydrates_from_localStorage_on_mount** (`StarRating.test.jsx`): pre-seed
   `localStorage` with `{ r1: 4 }` under the ratings key; render
   `<StarRating responseId="r1" />`; assert 4 stars are pre-filled without any click.
5. **test_independent_ratings_for_different_response_ids** (`StarRating.test.jsx`): render two
   `StarRating`s with `responseId="r1"` and `responseId="r2"`; rate only `r1`; assert `r2`'s stored
   rating (and displayed stars) is unaffected.
6. **test_malformed_localStorage_does_not_throw** (`StarRating.test.jsx`): set the ratings key to
   `"not-json"`; render `<StarRating responseId="r1" />`; assert it renders with 0 filled stars and
   no error is thrown.
7. **test_evaluate_page_rate_section_renders_star_rating_per_response**
   (`EvaluatePage.test.jsx`): render `<EvaluatePage sampleResponses={[{ id: 'a', text: 'Hi' }, { id:
   'b', text: 'Hello' }]} />`; assert `eval-rate-section` contains two `StarRating` widgets (10 star
   buttons total) and both response texts are visible.
8. **test_evaluate_page_empty_responses_shows_placeholder** (`EvaluatePage.test.jsx`, replaces the
   S8.1 placeholder-text assertion): render `<EvaluatePage sampleResponses={[]} />`; assert
   "No responses to rate yet" is shown inside `eval-rate-section`.

### Mocking Strategy
- No network mocking needed — this spec touches only `localStorage` and component state.
- `localStorage` is jsdom's native implementation (available by default in this repo's Vitest/jsdom
  setup); tests must call `localStorage.clear()` in `beforeEach` so ratings don't leak between
  tests.
- Use `@testing-library/react` (`render`, `screen`, `fireEvent`) with jsdom, matching every other
  component test in this repo.

### Coverage Expectation
- All 3 FRs covered by at least one test; all 8 tests above are green; pre-existing
  `EvaluatePage.test.jsx` tests from S8.1 (heading + `eval-benchmark-section` presence) continue to
  pass, updated only where the "Rate Responses" content assertion needs to reflect the new default
  sample data or the `sampleResponses={[]}` override.

---

## References
- `roadmap.md` row S8.2 — "Star rating widget for each AI response. Stores ratings in browser
  memory"; Phase 8 goal — "users can star-rate AI answers"
- `specs/spec-S8.1-eval-route/spec.md` — `EvaluatePage` layout and `eval-rate-section` placeholder
  this spec replaces
- `specs/spec-S3.2-message-thread/spec.md`, `src/MessageThread.jsx` — `{ role, text }` message shape
  the sample AI responses mirror
- `src/ResponseCard.jsx` — precedent for a small, self-contained, prop-driven display widget in
  this codebase
