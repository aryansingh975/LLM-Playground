# Spec S9.1 — Dark Mode

## Overview
Add a dark/light mode toggle to the app, with the chosen preference persisted across page
refreshes. Tailwind v4 defaults to OS-preference-driven (`prefers-color-scheme`) dark styling, so
this spec switches the project to Tailwind's class-based dark variant (`.dark` on `<html>`) and
adds a `useTheme` hook that resolves the initial theme (stored preference, falling back to system
preference), toggles the `dark` class on `document.documentElement`, and persists the user's choice
to `localStorage` — mirroring the `localStorage`-backed persistence pattern already used by
`StarRating` (S8.2). A toggle control in `NavBar` lets the user flip themes from any page.

## Dependencies
- S1.3 — Basic Styling (`done`). Provides the Tailwind CSS install this spec builds on.

## Target Location
- `src/index.css` (modified — add `@custom-variant dark (&:where(.dark, .dark *));` so `dark:`
  utilities respond to the `.dark` class instead of OS preference)
- `src/useTheme.js` (new — hook: resolves initial theme, applies/removes the `dark` class on
  `document.documentElement`, persists to `localStorage`, exposes `toggleTheme`)
- `src/NavBar.jsx` (modified — render a theme toggle button wired to `useTheme`)

---

## Functional Requirements

### FR-1: `useTheme` resolves the initial theme from storage or system preference
- **What**: On mount, `useTheme` reads `localStorage.getItem('llm-playground:theme')`. If it's a
  valid value (`'light'` or `'dark'`), that becomes the initial theme. Otherwise it falls back to
  `window.matchMedia('(prefers-color-scheme: dark)').matches` (`'dark'` if matched, else
  `'light'`).
- **Inputs**: None (reads global `localStorage` and `window.matchMedia`).
- **Outputs**: `{ theme, toggleTheme }` where `theme` is `'light'` or `'dark'`.
- **Edge cases**: stored value is missing, corrupt, or not `'light'`/`'dark'` → fall back to system
  preference; `window.matchMedia` is undefined (unsupported environment) → default to `'light'`
  without throwing.

### FR-2: `useTheme` applies the theme and persists changes
- **What**: Whenever `theme` changes (including on initial mount), `document.documentElement`'s
  `classList` is updated so it has the `dark` class iff `theme === 'dark'`, and
  `localStorage.setItem('llm-playground:theme', theme)` is called. `toggleTheme()` flips `theme`
  between `'light'` and `'dark'`.
- **Inputs**: calls to the returned `toggleTheme` function.
- **Outputs**: side effects on `document.documentElement.classList` and `localStorage`; updated
  `theme` value from the hook.
- **Edge cases**: `localStorage.setItem` throwing (e.g. storage disabled/full) does not crash the
  toggle — the in-memory `theme` state and DOM class still update.

### FR-3: `NavBar` renders a theme toggle wired to `useTheme`
- **What**: `NavBar` renders a button (`aria-label` reflecting the action, e.g. "Switch to dark
  mode" / "Switch to light mode") that calls `toggleTheme` on click and shows an icon/label
  reflecting the *current* theme.
- **Inputs**: click event.
- **Outputs**: clicking the button flips the theme (dark class toggles on `document.documentElement`,
  new value persisted); the button's label/`aria-label` updates to reflect the new state.
- **Edge cases**: rapid repeated clicks toggle correctly each time (no stuck state, no double-flip
  per click).

### FR-4: Tailwind is configured for class-based dark mode
- **What**: `src/index.css` includes `@custom-variant dark (&:where(.dark, .dark *));` alongside
  the existing `@import "tailwindcss";`, switching `dark:` utility classes from Tailwind v4's
  default media-query strategy to responding to an ancestor `.dark` class.
- **Inputs**: none — static CSS configuration.
- **Outputs**: any `dark:*` utility class in the app responds to the `dark` class placed on
  `document.documentElement` by `useTheme`, not to OS-level `prefers-color-scheme`.
- **Edge cases**: none — build-time CSS config; correctness is exercised indirectly through FR-1/FR-2
  integration behavior (the `dark` class actually being present/absent on `document.documentElement`).

---

## Tangible Outcomes

- [ ] **Outcome 1**: Calling `toggleTheme` flips `document.documentElement.classList.contains('dark')`
  between `true`/`false`.
- [ ] **Outcome 2**: After `toggleTheme` runs, `localStorage.getItem('llm-playground:theme')` matches
  the new theme; a fresh `useTheme` mount afterwards initializes to that same stored value.
- [ ] **Outcome 3**: `NavBar` renders a toggle button; clicking it flips the `dark` class on
  `document.documentElement` and updates the button's `aria-label`.
- [ ] **Outcome 4**: `src/index.css` contains the `@custom-variant dark (&:where(.dark, .dark *));`
  declaration.

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)
1. **test_use_theme_defaults_to_system_preference_when_no_stored_value** (`useTheme.test.js`): with
   `localStorage` empty and `window.matchMedia` mocked to match `(prefers-color-scheme: dark)`,
   assert the hook's initial `theme` is `'dark'`.
2. **test_use_theme_reads_stored_preference_from_localStorage** (`useTheme.test.js`): with
   `localStorage.setItem('llm-playground:theme', 'dark')` set beforehand and `matchMedia` mocked to
   *not* match dark, assert the hook still initializes to `'dark'` (stored value wins).
3. **test_use_theme_handles_invalid_stored_value_gracefully** (`useTheme.test.js`): with
   `localStorage` containing an invalid value (e.g. `'blue'`), assert the hook falls back to the
   system-preference result instead of throwing or using the invalid value.
4. **test_use_theme_toggle_flips_theme_and_persists** (`useTheme.test.js`): render the hook via
   `renderHook`, call `toggleTheme()`, assert `theme` flips and `localStorage.getItem(...)` reflects
   the new value.
5. **test_use_theme_applies_dark_class_to_document_element** (`useTheme.test.js`): call
   `toggleTheme()` until `theme === 'dark'`, assert
   `document.documentElement.classList.contains('dark')` is `true`; toggle again and assert it's
   removed.
6. **test_navbar_renders_theme_toggle_button** (`NavBar.test.jsx`): render `<NavBar />`, assert a
   button with an `aria-label` matching `/switch to (dark|light) mode/i` is present.
7. **test_clicking_theme_toggle_flips_dark_class_and_label** (`NavBar.test.jsx`): render `<NavBar
   />`, click the toggle button, assert `document.documentElement.classList.contains('dark')`
   changed and the button's `aria-label` updated to reflect the new state.

### Mocking Strategy
- No network calls involved.
- `window.matchMedia` is not implemented by jsdom — stub it per-test (e.g.
  `Object.defineProperty(window, 'matchMedia', { value: vi.fn().mockReturnValue({ matches: ... }) })`).
- `localStorage` is jsdom's real implementation (as used by `StarRating.test.jsx`); clear it in
  `beforeEach`/`afterEach` so tests don't leak state into each other.
- Reset `document.documentElement.classList` (remove `dark`) in `beforeEach`/`afterEach` for the same
  reason.
- Use `@testing-library/react`'s `renderHook` (for `useTheme.test.js`) and `render`/`screen`/`fireEvent`
  or `userEvent` (for `NavBar.test.jsx`), matching this repo's existing test conventions.

### Coverage Expectation
- All 4 FRs covered by at least one test; all 7 tests above are green; pre-existing
  `NavBar.test.jsx` tests (S6.1) continue to pass unchanged.

---

## References
- `roadmap.md` row S9.1 — "Add a dark/light mode toggle. Preference saved across page refreshes";
  Phase 9 goal — "dark mode works"
- `specs/spec-S1.3-basic-styling/spec.md` — Tailwind CSS install this spec builds on
- `src/StarRating.jsx` (S8.2) — precedent for `localStorage`-backed persistence with a
  read/write-helper pattern and graceful fallback on parse failure
- `src/NavBar.jsx` — existing nav links this spec adds a toggle button alongside
- Tailwind CSS v4 docs — class-based dark mode via `@custom-variant dark (&:where(.dark, .dark
  *));` (v4 defaults to `prefers-color-scheme`-driven dark mode otherwise)
