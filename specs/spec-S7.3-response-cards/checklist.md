# Checklist — Spec S7.3: Response Cards

## Phase 1: Setup & Dependencies
- [x] Verify S7.2 (parallel calls) and S5.1 (tokeniser logic) are `done`
- [x] Locate `src/ComparePage.jsx` for modification; confirm `countTokens` export in
  `src/tokenizer.js`
- [x] No new npm dependencies needed (reuses `countTokens`, native `performance.now()`)

## Phase 2: Tests First (TDD)
- [x] Create `src/__tests__/ResponseCard.test.jsx`
- [x] test_response_card_shows_provider_label
- [x] test_response_card_shows_token_count_and_latency_on_success
- [x] test_response_card_hides_metadata_while_loading
- [x] test_response_card_hides_metadata_on_error
- [x] test_response_card_hides_metadata_before_send
- [x] test_response_card_falls_back_to_raw_provider_string_for_unknown_provider
- [x] Update `src/__tests__/ComparePage.test.jsx`
- [x] test_compare_page_shows_token_count_and_latency_after_reply
- [x] test_compare_page_latencies_are_independent_per_column
- [x] test_compare_page_no_token_count_on_error
- [x] Update pre-existing `test_compare_page_one_provider_failure_does_not_block_other_success`:
  change `toMatch(/^Error:/)` to `toContain('Error:')` (FR-4 edge case)
- [x] Run tests — expect failures (Red) — ResponseCard.test.jsx failed (module missing), 2/3 new
  ComparePage tests failed as expected

## Phase 3: Implementation
- [x] Implement FR-1 — new `src/ResponseCard.jsx`: provider label, body text (loading/error/reply
  /placeholder), metadata line shown only on successful reply
- [x] Implement FR-2 — `ComparePage.jsx`: `leftLatencyMs`/`rightLatencyMs` state, measured via
  `performance.now()` at dispatch and at each column's own settlement
- [x] Implement FR-3 — `ComparePage.jsx`: `leftTokenCount`/`rightTokenCount` state via
  `countTokens(reply)`, computed only on success
- [x] Implement FR-4 — `ComparePage.jsx`: render `<ResponseCard>` per column with
  `testId="compare-response-left"`/`"compare-response-right"` in place of `columnResponseText`
- [x] Run tests — expect pass (Green) — 19/19 (6 ResponseCard + 13 ComparePage) green
- [x] Refactor if needed — none needed

## Phase 4: Integration
- [x] Confirm `compare-response-left`/`compare-response-right` remain locatable via
  `getByTestId` for all pre-existing S7.1/S7.2 tests
- [x] Run lint: `npx oxlint src/` — clean, no output
- [x] Run full test suite: `npm run test` — 190/190 passed (21 test files)

## Phase 5: Verification
- [x] All 6 tangible outcomes verified
- [x] No hardcoded secrets/tokens
- [x] Confirm one column settling does not leak its latency/token-count into the other column's
  state — read `handleCompare`: each column's `.then()` closes over its own `leftStart`/
  `rightStart` and calls only its own setters, and `test_compare_page_latencies_are_independent_per_column`
  proves the right column shows no `ms` metadata while the left has already settled
- [x] Update `roadmap.md` status for S7.3: `spec-written` → `done` (after implementation)
