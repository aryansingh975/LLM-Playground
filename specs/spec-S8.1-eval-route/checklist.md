# Checklist — Spec S8.1: Evaluate Route

## Phase 1: Setup & Dependencies
- [x] Verify S6.1 (routing) is `done`
- [x] Create `src/EvaluatePage.jsx`
- [x] No new npm dependencies needed (reuses `react-router-dom` from S6.1)

## Phase 2: Tests First (TDD)
- [x] Update `src/__tests__/NavBar.test.jsx`
  - [x] test_navbar_renders_evaluate_link
  - [x] test_evaluate_link_active_at_evaluate_route
- [x] Update `src/__tests__/App.test.jsx`
  - [x] test_app_navigating_to_evaluate_shows_evaluate_page
- [x] Write test file: `src/__tests__/EvaluatePage.test.jsx`
  - [x] test_evaluate_page_renders_rate_responses_section
  - [x] test_evaluate_page_renders_benchmarks_section
- [x] Run tests — expect failures (Red)

## Phase 3: Implementation
- [x] Implement FR-1 — `App.jsx`: add `/evaluate` route → `EvaluatePage`
- [x] Implement FR-2 — `NavBar.jsx`: add "Evaluate" `NavLink`
- [x] Implement FR-3 — `EvaluatePage.jsx`: heading + two stacked `<section>`s ("Rate Responses" /
  "Benchmarks") with placeholder content (`eval-rate-section` / `eval-benchmark-section`)
- [x] Run tests — expect pass (Green) — 195/195 passed (22 test files)
- [x] Refactor if needed — none needed

## Phase 4: Integration
- [x] Confirm `/chat`, `/learn`, `/compare` routes still render unchanged via `App.jsx`
- [x] Run lint: `npx oxlint src/`
- [x] Run full test suite: `npm run test`

## Phase 5: Verification
- [x] All 3 tangible outcomes verified
- [x] No hardcoded secrets/tokens
- [x] Update `roadmap.md` status for S8.1: `spec-written` → `done` (after implementation)
