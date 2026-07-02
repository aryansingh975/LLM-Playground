# Spec S7.3 — Response Cards

## Overview
Replace the plain reply text in each `/compare` column (wired up in S7.2) with a response card
that shows the provider's display name plus, once a reply has arrived successfully, its token
count and latency — per the Phase 7 goal and the roadmap row "Show each response in a card with
provider name, token count, and latency". Token counting reuses `countTokens` from
`src/tokenizer.js` (built in S5.1); latency is measured client-side per column, from the moment
that column's `callProvider` call is dispatched to the moment it settles. Each column keeps this
metadata fully independent, matching S7.2's independent loading/reply/error state — one column
finishing first must not affect the other's card.

## Dependencies
- S7.2 — Parallel Calls (`done`). Provides `ComparePage.jsx`'s `handleCompare`/`fetchColumnReply`
  dispatch, and the independent `leftLoading`/`leftReply`/`leftError` /
  `rightLoading`/`rightReply`/`rightError` state this spec adds latency/token-count state
  alongside.
- S5.1 — Tokeniser Logic (`done`). Provides `countTokens(text)` in `src/tokenizer.js`, reused here
  unmodified to compute each successful reply's token count.

## Target Location
`src/ResponseCard.jsx` (new — the card component), `src/ComparePage.jsx` (modified — track
per-column latency/token-count state and render `<ResponseCard>` instead of the plain
`columnResponseText` div), `src/__tests__/ResponseCard.test.jsx` (new),
`src/__tests__/ComparePage.test.jsx` (modified — add new tests, update one pre-existing assertion
per FR-4's edge case)

---

## Functional Requirements

### FR-1: `ResponseCard` component renders provider label, body text, and success metadata
- **What**: A new `ResponseCard` component renders the provider's display name (`Groq` / `Gemini`
  / `OpenRouter`), a body area showing one of the same four states `ComparePage` already computes
  ("Loading…", `"Error: <message>"`, the reply text, or the placeholder "Response will appear
  here"), and — only when a successful reply is present — a metadata line
  `"{tokenCount} tokens · {latencyMs}ms"`.
- **Inputs**: `provider` (`'groq' | 'gemini' | 'openrouter'`), `loading` (bool), `reply` (string),
  `error` (string), `tokenCount` (number|null), `latencyMs` (number|null), `testId` (string,
  applied as `data-testid` on the card root).
- **Outputs**: Card JSX; provider label always visible; metadata line rendered only when `reply`
  is non-empty and neither `loading` nor `error` is set.
- **Edge cases**: `tokenCount`/`latencyMs` are `null` (nothing sent yet, or the column errored) →
  metadata line is omitted entirely (never renders "null tokens"); an unrecognised `provider`
  value falls back to rendering the raw string rather than throwing.

### FR-2: `ComparePage` measures per-column latency independently
- **What**: `handleCompare` records a start time (`performance.now()`) immediately before
  dispatching each column's `fetchColumnReply` call, and computes elapsed milliseconds
  (rounded to an integer) when that column's own promise settles — success or error — storing it
  in `leftLatencyMs`/`rightLatencyMs`.
- **Inputs**: None additional — derived from the existing per-column dispatch in `handleCompare`.
- **Outputs**: `leftLatencyMs`/`rightLatencyMs` reset to `null` at the start of every
  `handleCompare` call, then set to a non-negative integer once that specific column settles.
- **Edge cases**: One column settling before the other — each latency is computed from that
  column's own start/end timestamps, never from the other column's timing or a shared clock.

### FR-3: `ComparePage` computes token count for successful replies only
- **What**: When a column's `callProvider` call resolves successfully, `countTokens(reply)` (from
  `src/tokenizer.js`) is run on the reply text and stored in `leftTokenCount`/`rightTokenCount`.
- **Inputs**: The resolved reply string for that column.
- **Outputs**: Integer token count state, reset to `null` at the start of every `handleCompare`
  call and left `null` if that column errors (never computed from an error message).
- **Edge cases**: A provider resolving with an empty string (`""`) still yields `countTokens('')`
  = `0`, which is displayed as "0 tokens" rather than being treated as absent/omitted.

### FR-4: `ComparePage` renders a `ResponseCard` per column in place of the plain text div
- **What**: The `compare-response-left`/`compare-response-right` slots render
  `<ResponseCard provider={...} loading={...} reply={...} error={...} tokenCount={...}
  latencyMs={...} testId="compare-response-left" />` (and the right-column equivalent), with the
  existing test id kept on the card root so it remains locatable via `getByTestId`.
- **Inputs/Outputs**: Existing per-column state (FR from S7.2) plus the new latency/token-count
  state from FR-2/FR-3.
- **Edge cases**: The pre-existing S7.2 test
  `test_compare_page_one_provider_failure_does_not_block_other_success` asserts
  `textContent` matches `/^Error:/` on the response slot. Once the provider label renders before
  the body text inside the card, `textContent` no longer *starts with* `"Error:"` — this
  assertion must be updated to `toContain('Error:')` as part of this spec's implementation (see
  checklist Phase 2).

---

## Tangible Outcomes

- [ ] **Outcome 1**: `ResponseCard` renders the provider's display name, and — once a successful
  reply exists — a `"{n} tokens · {m}ms"` metadata line.
- [ ] **Outcome 2**: `ResponseCard` omits the metadata line while `loading`, on `error`, and before
  anything has been sent (all-null/empty initial props).
- [ ] **Outcome 3**: `ComparePage` records independent latency per column, each measured from that
  column's own dispatch to its own settlement — verified via two independently-controlled
  promises resolving at different times.
- [ ] **Outcome 4**: `ComparePage` computes token count via `countTokens` only for successful
  replies; token count stays `null` (and is not shown) for a column that errors.
- [ ] **Outcome 5**: `compare-response-left`/`compare-response-right` test ids remain present and
  locatable, now rendering inside `ResponseCard`.
- [ ] **Outcome 6**: All pre-existing S7.1/S7.2 `ComparePage.test.jsx` tests continue to pass,
  with the one documented `toMatch(/^Error:/)` → `toContain('Error:')` update from FR-4.

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)
1. **test_response_card_shows_provider_label** (`ResponseCard.test.jsx`): render with
   `provider="groq"`; assert "Groq" is visible.
2. **test_response_card_shows_token_count_and_latency_on_success** (`ResponseCard.test.jsx`):
   render with `reply="hi"`, `tokenCount={5}`, `latencyMs={120}`; assert text containing "5
   tokens" and "120ms" is visible.
3. **test_response_card_hides_metadata_while_loading** (`ResponseCard.test.jsx`): render with
   `loading={true}`; assert no "tokens" text is present.
4. **test_response_card_hides_metadata_on_error** (`ResponseCard.test.jsx`): render with
   `error="boom"`; assert body shows `"Error: boom"` and no "tokens" text is present.
5. **test_response_card_hides_metadata_before_send** (`ResponseCard.test.jsx`): render with all
   props `null`/`false`/`''`; assert placeholder text "Response will appear here" and no "tokens"
   text.
6. **test_response_card_falls_back_to_raw_provider_string_for_unknown_provider**
   (`ResponseCard.test.jsx`): render with `provider="mystery"`; assert it renders "mystery"
   without throwing.
7. **test_compare_page_shows_token_count_and_latency_after_reply** (`ComparePage.test.jsx`, mocks
   `../api`): mock `callProvider` to resolve `'hello world'` for both columns; send a prompt;
   `waitFor` and assert `compare-response-left` eventually contains a "tokens" substring and a
   `/\d+ms/` pattern.
8. **test_compare_page_latencies_are_independent_per_column** (`ComparePage.test.jsx`): mock
   `callProvider` so the left call resolves immediately and the right call resolves only after an
   explicit `resolveRight(...)` is invoked; assert the left card shows its metadata line while the
   right card is still `loading` (no metadata yet); then resolve the right call and assert its
   metadata appears too.
9. **test_compare_page_no_token_count_on_error** (`ComparePage.test.jsx`): mock `callProvider` to
   reject for the left provider and resolve for the right; send a prompt; assert
   `compare-response-left` shows `"Error:"` and does **not** contain a "tokens" substring.

### Mocking Strategy
- `ComparePage.test.jsx` continues to use `vi.mock('../api', () => ({ callProvider: vi.fn() }))`
  (unchanged from S7.2) — no real HTTP is hit.
- Latency assertions never check an exact millisecond value (non-deterministic) — only that a
  `/\d+ms/`-shaped string is present, and that one column's metadata can appear before the other's.
- `ResponseCard.test.jsx` needs no mocking — pure rendering/props component, same pattern as
  `ProviderPicker.test.jsx`.

### Coverage Expectation
- All 4 FRs covered by at least one test; all 9 tests above are green; all pre-existing tests
  (`ChatInput.test.jsx`, `ComparePage.test.jsx`'s S7.1/S7.2 tests — with the one documented
  assertion update, `App.test.jsx`, `NavBar.test.jsx`, `ProviderPicker.test.jsx`, and every other
  `src/__tests__/*` file) continue to pass with zero unintended modifications.

---

## References
- `roadmap.md` row S7.3 — "Show each response in a card with provider name, token count, and
  latency"
- `specs/spec-S7.2-parallel-calls/spec.md`, `src/ComparePage.jsx` — the independent per-column
  loading/reply/error state this spec adds latency/token-count state alongside
- `specs/spec-S5.1-tokeniser-logic/spec.md`, `src/tokenizer.js` — `countTokens` reused unmodified
- `src/ProviderPicker.jsx` — the `groq`/`gemini`/`openrouter` provider value set and their display
  names ("Groq"/"Gemini"/"OpenRouter")
