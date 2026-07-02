# Checklist — Spec S5.2: Tokeniser UI

## Phase 1: Setup & Dependencies
- [x] Verify S5.1 (`tokenize()`/`countTokens()` in `src/tokenizer.js`) is `done`
- [x] Verify S3.1 (component architecture checkpoint) is `done`
- [x] Create `src/TokeniserDemo.jsx`
- [x] No new npm packages needed — only React + Tailwind (already installed) + `src/tokenizer.js`

## Phase 2: Tests First (TDD)
- [x] Write test file: `src/__tests__/TokeniserDemo.test.jsx`
- [x] test_renders_empty_state_with_zero_count
- [x] test_typing_renders_chips_matching_tokenize
- [x] test_token_count_updates_live
- [x] test_chips_cycle_through_color_palette
- [x] test_chips_have_whitespace_pre_class
- [x] test_clearing_input_removes_chips
- [x] Run tests — expect failures (Red)

## Phase 3: Implementation
- [x] Implement FR-1 — `src/TokeniserDemo.jsx`: controlled `<textarea>` with internal `useState`;
  recompute `tokenize(inputText)` on every render; map to chip `<span>` elements
- [x] Implement FR-2 — token count label reflecting `tokenize(inputText).length`
- [x] Implement FR-3 — fixed `TOKEN_COLORS` palette array; chip `className` includes
  `TOKEN_COLORS[index % TOKEN_COLORS.length]` + `whitespace-pre`
- [x] Run tests — expect pass (Green) — 6/6 passing
- [x] Refactor if needed — extracted `TOKEN_COLORS` into its own `src/tokenColors.js` module.
  `npx oxlint` flagged `react(only-export-components)` on the original single-file version
  (exporting a non-component constant alongside the component breaks fast refresh); moving the
  palette to a dedicated module is exactly the fix oxlint suggests and keeps lint fully clean.

## Phase 4: Integration
- [x] N/A for this spec — `<TokeniserDemo>` is standalone; embedding into `App.jsx`/learn panels
  happens in S6.4 once routing (S6.1) exists
- [x] Run lint: `npx oxlint src/` — clean, exit 0 (no warnings)
- [x] Run full test suite — 135/135 tests green (all 13 test files, including new
  `TokeniserDemo.test.jsx`)

## Phase 5: Verification
- [x] All 6 tangible outcomes verified
- [x] No hardcoded secrets/tokens
- [x] Update `roadmap.md` status for S5.2: `spec-written` → `done`
