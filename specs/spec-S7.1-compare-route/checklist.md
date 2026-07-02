# Checklist — Spec S7.1: Compare Route

## Phase 1: Setup & Dependencies
- [x] Verify S6.1 (routing) is `done`
- [x] Create `src/ComparePage.jsx`
- [x] No new npm dependencies needed (reuses `react-router-dom` from S6.1 and `ProviderPicker` from
  S4.5)

## Phase 2: Tests First (TDD)
- [x] Update `src/__tests__/ProviderPicker.test.jsx`
- [x] test_provider_picker_accepts_custom_id_and_label
- [x] test_provider_picker_default_id_and_label_unchanged
- [x] Update `src/__tests__/NavBar.test.jsx`
- [x] test_navbar_renders_compare_link
- [x] test_compare_link_active_at_compare_route
- [x] Update `src/__tests__/App.test.jsx`
- [x] test_app_navigating_to_compare_shows_compare_page
- [x] Write test file: `src/__tests__/ComparePage.test.jsx`
- [x] test_compare_page_renders_two_columns
- [x] test_compare_page_columns_have_independent_provider_state
- [x] test_compare_page_default_providers_differ
- [x] test_compare_page_shows_placeholder_response_areas
- [x] Run tests — expect failures (Red)

## Phase 3: Implementation
- [x] Implement FR-1 — `ProviderPicker.jsx`: add optional `id`/`label` props, defaults preserve
  current markup
- [x] Implement FR-2 — `App.jsx`: add `/compare` route → `ComparePage`
- [x] Implement FR-3 — `NavBar.jsx`: add "Compare" `NavLink`
- [x] Implement FR-4 — `ComparePage.jsx`: two-column flex layout, independent `useState` per
  column, wired to two `ProviderPicker` instances with distinct `id`/`label`
- [x] Implement FR-5 — default left=`'groq'`, right=`'gemini'`; add placeholder response areas
  (`compare-response-left`/`compare-response-right`)
- [x] Run tests — expect pass (Green) — 53/53 new/updated tests green
- [x] Refactor if needed — none needed

## Phase 4: Integration
- [x] Confirm `/chat` and `/learn` routes still render unchanged via `App.jsx`
- [x] Run lint: `npx oxlint src/` — clean, no output
- [x] Run full test suite: `npm run test` — 173/173 passed (20 test files)

## Phase 5: Verification
- [x] All 6 tangible outcomes verified
- [x] No hardcoded secrets/tokens
- [x] `ChatPage.jsx`'s existing `ProviderPicker` usage confirmed unaffected (still renders
  `id="provider-picker"`, label "Provider")
- [x] Update `roadmap.md` status for S7.1: `spec-written` → `done` (after implementation)
