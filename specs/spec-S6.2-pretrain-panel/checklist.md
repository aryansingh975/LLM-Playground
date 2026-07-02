# Checklist — Spec S6.2: Pretrain Panel

## Phase 1: Setup & Dependencies
- [x] Verify S6.1 (routing) is `done`
- [x] Create `src/PretrainPanel.jsx`
- [x] No new npm dependencies needed (static content + `useState`, same as existing components)

## Phase 2: Tests First (TDD)
- [x] Write test file: `src/__tests__/PretrainPanel.test.jsx`
- [x] test_pretrain_panel_renders_four_cards
- [x] test_card_detail_hidden_by_default
- [x] test_clicking_toggle_reveals_detail
- [x] test_clicking_toggle_again_collapses_detail
- [x] test_expanding_one_card_does_not_collapse_another
- [x] Write test file: `src/__tests__/LearnPage.test.jsx`
- [x] test_learn_page_renders_pretrain_panel
- [x] test_learn_page_still_shows_placeholder_for_other_sections
- [x] Run tests — expect failures (Red)

## Phase 3: Implementation
- [x] Implement FR-1 — `PretrainPanel.jsx`: card data array + `.map()` render (title + summary)
- [x] Implement FR-2 — `PretrainPanel.jsx`: per-card expand/collapse via `Set` of expanded ids in one
  `useState`; toggle is a real `<button>`
- [x] Implement FR-3 — `LearnPage.jsx`: add "Pre-training" heading + `<PretrainPanel />`; narrow
  placeholder copy to only cover post-training/evaluation/generation
- [x] Implement FR-4 — write accurate summary/detail copy for all four cards
- [x] Run tests — expect pass (Green) — 7/7 new tests green
- [x] Refactor if needed — none needed

## Phase 4: Integration
- [x] Confirm `/learn` route still renders via `App.jsx`/`NavBar.jsx` unchanged (no changes to
  those files; `LearnPage` is rendered the same way, just with new content)
- [x] Run lint: `npx oxlint src/` — clean, no output
- [x] Run full test suite: `npm run test` — 149/149 passed (16 test files)

## Phase 5: Verification
- [x] All 5 tangible outcomes verified
- [x] No hardcoded secrets/tokens
- [x] Card content reviewed for factual accuracy (data collection, cleaning, tokenisation,
  architecture) — no overstated or invented claims
- [x] Update `roadmap.md` status for S6.2: `spec-written` → `done` (after implementation)
