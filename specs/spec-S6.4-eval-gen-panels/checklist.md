# Checklist — Spec S6.4: Eval Gen Panels

## Phase 1: Setup & Dependencies
- [x] Verify S6.1 (routing), S6.2 (pretrain panel), S6.3 (postrain panel) are `done`
- [x] Verify `src/TokeniserDemo.jsx` (S5.1/S5.2) exists and is `done`
- [x] Create `src/EvaluationPanel.jsx`
- [x] Create `src/GenerationPanel.jsx`
- [x] No new npm dependencies needed (static content + `useState`, same as `PretrainPanel.jsx`)

## Phase 2: Tests First (TDD)
- [x] Write test file: `src/__tests__/EvaluationPanel.test.jsx`
- [x] test_evaluation_panel_renders_four_cards
- [x] test_evaluation_card_detail_hidden_by_default
- [x] test_evaluation_clicking_toggle_reveals_and_collapses_detail
- [x] test_evaluation_expanding_one_card_does_not_collapse_another
- [x] Write test file: `src/__tests__/GenerationPanel.test.jsx`
- [x] test_generation_panel_renders_three_cards
- [x] test_generation_card_detail_hidden_by_default
- [x] test_generation_clicking_toggle_reveals_and_collapses_detail
- [x] test_generation_panel_renders_tokeniser_demo
- [x] Update existing `src/__tests__/LearnPage.test.jsx`
- [x] test_learn_page_renders_evaluation_and_generation_panels
- [x] test_learn_page_no_longer_shows_placeholder (replaces the S6.3 placeholder-presence test)
- [x] Removed S6.2's `test_learn_page_still_shows_placeholder_for_other_sections` — its single-blob
  `getByText(/evaluation/i)` assertion became ambiguous (matches both the new "Evaluation" heading
  and "Human & Preference Evaluation") once real headings replaced the placeholder; fully superseded
  by S6.3's and this spec's own heading-presence tests
- [x] Run tests — expect failures (Red)

## Phase 3: Implementation
- [x] Implement FR-1 — `EvaluationPanel.jsx`: card data array + `.map()` render (title + summary)
- [x] Implement FR-2 — `GenerationPanel.jsx`: card data array + `.map()` render (title + summary)
- [x] Implement FR-3 — both panels: per-card expand/collapse via `Set` of expanded ids in one
  `useState` each; toggle is a real `<button>` with `aria-expanded`
- [x] Implement FR-4 — `GenerationPanel.jsx`: import and render `<TokeniserDemo />` inline, always
  visible, under its own heading
- [x] Implement FR-5 — `LearnPage.jsx`: add "Evaluation" + "Text Generation" headings and panels;
  remove the `learn-placeholder` paragraph entirely
- [x] Implement FR-6 — write accurate summary/detail copy for all seven cards
- [x] Run tests — expect pass (Green) — 12/12 new/updated tests green (4 Evaluation + 4 Generation
  + 2 new LearnPage + 2 pre-existing S6.2/S6.3 heading tests unaffected)
- [x] Refactor if needed — none needed

## Phase 4: Integration
- [x] Confirm `/learn` route still renders via `App.jsx`/`NavBar.jsx` unchanged (no changes to
  those files; `LearnPage` is rendered the same way, just with new content)
- [x] Run lint: `npx oxlint src/` — clean, no output
- [x] Run full test suite: `npm run test` — 164/164 passed (19 test files)

## Phase 5: Verification
- [x] All 5 tangible outcomes verified
- [x] No hardcoded secrets/tokens
- [x] Card content reviewed for factual accuracy (benchmarks, human/preference eval, hallucination,
  safety, decoding, context window, prompting) — no overstated or invented claims
- [x] `TokeniserDemo.jsx` itself left unmodified (only imported/rendered)
- [x] Update `roadmap.md` status for S6.4: `spec-written` → `done` (after implementation)
