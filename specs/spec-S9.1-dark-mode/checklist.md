# Checklist — Spec S9.1: Dark Mode

## Phase 1: Setup & Dependencies
- [x] Verify S1.3 (basic styling) is `done`
- [x] Create `src/useTheme.js`
- [x] No new npm dependencies needed (uses browser `localStorage`/`matchMedia` + existing React)

## Phase 2: Tests First (TDD)
- [x] Write test file: `src/__tests__/useTheme.test.js`
  - [x] test_use_theme_defaults_to_system_preference_when_no_stored_value
  - [x] test_use_theme_reads_stored_preference_from_localStorage
  - [x] test_use_theme_handles_invalid_stored_value_gracefully
  - [x] test_use_theme_toggle_flips_theme_and_persists
  - [x] test_use_theme_applies_dark_class_to_document_element
- [x] Update `src/__tests__/NavBar.test.jsx`
  - [x] test_navbar_renders_theme_toggle_button
  - [x] test_clicking_theme_toggle_flips_dark_class_and_label
- [x] Run tests — expect failures (Red)

## Phase 3: Implementation
- [x] Implement FR-1 — `useTheme.js`: resolve initial theme from `localStorage`, falling back to
  `window.matchMedia('(prefers-color-scheme: dark)')`, defaulting to `'light'` if unsupported
- [x] Implement FR-2 — `useTheme.js`: sync `dark` class on `document.documentElement` and persist to
  `localStorage` on every theme change; `toggleTheme` flips `'light'`/`'dark'`
- [x] Implement FR-3 — `NavBar.jsx`: add toggle button calling `toggleTheme`, label/`aria-label`
  reflects current theme
- [x] Implement FR-4 — `src/index.css`: add `@custom-variant dark (&:where(.dark, .dark *));`
- [x] Run tests — expect pass (Green)
- [x] Refactor if needed — none needed

## Phase 4: Integration
- [x] Confirm toggling in the running app (`npm run dev`) actually changes visible styling (add/
  confirm at least one `dark:` utility class exists somewhere visible, e.g. body/background, to
  prove the wiring works end-to-end)
- [x] Run lint: `npx oxlint src/` — clean (only a pre-existing unrelated warning in
  `BenchmarkChart.jsx`)
- [x] Run full test suite: `npm run test` — 216/216 passed (25 test files)

## Phase 5: Verification
- [x] All 4 tangible outcomes verified
- [x] No hardcoded secrets/tokens
- [x] Update `roadmap.md` status for S9.1: `pending` → `spec-written` (done as part of this step) →
  `done` (after implementation)
