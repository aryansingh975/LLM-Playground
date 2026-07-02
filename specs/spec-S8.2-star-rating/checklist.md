# Checklist — Spec S8.2: Star Rating

## Phase 1: Setup & Dependencies
- [x] Verify S8.1 (evaluate route) is `done`
- [x] Verify S3.2 (message thread) is `done`
- [x] Create `src/StarRating.jsx`
- [x] No new npm dependencies needed (plain React state + `localStorage`)

## Phase 2: Tests First (TDD)
- [x] Write test file: `src/__tests__/StarRating.test.jsx`
  - [x] test_star_rating_renders_five_stars
  - [x] test_clicking_star_fills_up_to_that_star_and_calls_onRate
  - [x] test_rating_persists_to_localStorage
  - [x] test_rating_hydrates_from_localStorage_on_mount
  - [x] test_independent_ratings_for_different_response_ids
  - [x] test_malformed_localStorage_does_not_throw
- [x] Update `src/__tests__/EvaluatePage.test.jsx`
  - [x] test_evaluate_page_rate_section_renders_star_rating_per_response
  - [x] test_evaluate_page_empty_responses_shows_placeholder
- [x] Run tests — expect failures (Red)

## Phase 3: Implementation
- [x] Implement FR-1 — `StarRating.jsx`: 5 star buttons, click sets rating, `onRate` callback
- [x] Implement FR-2 — `StarRating.jsx`: read/write `localStorage['llm-playground:ratings']` keyed
  by `responseId`, with malformed-JSON fallback
- [x] Implement FR-3 — `EvaluatePage.jsx`: `sampleResponses` prop (default sample list), render a
  `StarRating` per entry inside `eval-rate-section`, keep placeholder text for the empty case
- [x] Run tests — expect pass (Green) — 10/10 passed (StarRating + EvaluatePage)
- [x] Refactor if needed — none needed

## Phase 4: Integration
- [x] Confirm `/evaluate` still renders both sections; `/chat`, `/learn`, `/compare` unaffected
- [x] Run lint: `npx oxlint src/` — clean
- [x] Run full test suite: `npm run test` — 203/203 passed (23 test files)

## Phase 5: Verification
- [x] All 3 tangible outcomes verified
- [x] No hardcoded secrets/tokens
- [x] Ratings survive a `StarRating` remount (manual or test-covered check) —
  test_rating_hydrates_from_localStorage_on_mount covers this
- [x] Update `roadmap.md` status for S8.2: `spec-written` → `done` (after implementation)
