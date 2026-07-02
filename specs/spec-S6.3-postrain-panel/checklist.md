# Checklist — Spec S6.3: Postrain Panel

## Phase 1: Setup & Dependencies
- [x] Verify S6.1 (routing) and S6.2 (pretrain panel) are `done`
- [x] Create `src/PostrainPanel.jsx`
- [x] No new npm dependencies needed (static content + `useState`, same as `PretrainPanel.jsx`)

## Phase 2: Tests First (TDD)
- [x] Write test file: `src/__tests__/PostrainPanel.test.jsx`
- [x] test_postrain_panel_renders_four_cards
- [x] test_card_detail_hidden_by_default
- [x] test_clicking_toggle_reveals_detail
- [x] test_clicking_toggle_again_collapses_detail
- [x] test_expanding_one_card_does_not_collapse_another
- [x] Add cases to existing `src/__tests__/LearnPage.test.jsx`
- [x] test_learn_page_renders_postrain_panel
- [x] test_learn_page_still_shows_placeholder_for_remaining_sections
- [x] Run tests — expect failures (Red) — confirmed: 2 new tests failed, 2 pre-existing passed

## Phase 3: Implementation
- [x] Implement FR-1 — `PostrainPanel.jsx`: card data array + `.map()` render (title + summary)
- [x] Implement FR-2 — `PostrainPanel.jsx`: per-card expand/collapse via `Set` of expanded ids in one
  `useState`; toggle is a real `<button>` with `aria-expanded`
- [x] Implement FR-3 — `LearnPage.jsx`: add "Post-training" heading + `<PostrainPanel />`; narrow
  placeholder copy to only mention evaluation/generation
- [x] Implement FR-4 — write accurate summary/detail copy for all four cards (SFT, RLHF, PPO,
  Verifiable Tasks)
- [x] Run tests — expect pass (Green) — 9/9 new tests green (5 PostrainPanel + 2 new LearnPage +
  2 pre-existing S6.2 LearnPage tests unaffected)
- [x] Refactor if needed — none needed

## Phase 4: Integration
- [x] Confirm `/learn` route still renders via `App.jsx`/`NavBar.jsx` unchanged (no changes to
  those files; `LearnPage` is rendered the same way, just with new content)
- [x] Run lint: `npx oxlint src/` — clean, no output
- [x] Run full test suite: `npm run test` — 156/156 passed (17 test files)

## Phase 5: Verification
- [x] All 5 tangible outcomes verified
- [x] No hardcoded secrets/tokens
- [x] Card content reviewed for factual accuracy (SFT, RLHF, PPO, verifiable tasks) — no overstated
  or invented claims
- [x] Update `roadmap.md` status for S6.3: `spec-written` → `done` (after implementation)
