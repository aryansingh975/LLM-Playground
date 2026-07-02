# Spec S9.2 — Mobile Layout

## Overview
Make the chat page usable on small screens: the `Sidebar` (temperature/top-p/max-tokens/provider
controls) collapses behind a toggle button on narrow viewports instead of permanently consuming
horizontal space, while staying always-visible on medium+ screens exactly as it is today (no
desktop regression). The `ChatInput` sticks to the bottom of the viewport on small screens, mirroring
familiar mobile chat-app ergonomics (WhatsApp/ChatGPT), so the message box stays reachable without
scrolling past the response thread.

## Dependencies
- S3.3 — Chat Input (`done`). Provides `ChatInput` with its Enter-to-send + disabled-while-loading
  behavior, which this spec adds responsive positioning classes to without changing its logic.

## Target Location
- `src/Sidebar.jsx` (modified — add a `md:hidden` toggle button and self-contained `isOpen` state;
  `<aside>` becomes conditionally `hidden`/`flex` below the `md` breakpoint but keeps `md:flex`
  unconditionally so desktop behavior is unchanged)
- `src/ChatInput.jsx` (modified — add `sticky bottom-0` (small-screen) / `md:static` (desktop)
  positioning classes to the component's root container)

---

## Functional Requirements

### FR-1: `Sidebar` renders a mobile-only toggle button
- **What**: `Sidebar` renders a `<button>` (visible only below the `md` breakpoint, via a `md:hidden`
  class) that toggles an internal `isOpen` boolean state. The button's `aria-expanded` attribute and
  `aria-label` reflect the current state (e.g. "Show controls" / "Hide controls").
- **Inputs**: click events on the toggle button.
- **Outputs**: `isOpen` flips between `true`/`false`; button `aria-expanded`/`aria-label` update to
  match.
- **Edge cases**: repeated clicks toggle correctly each time (no stuck state).

### FR-2: `Sidebar`'s content collapses on small screens, driven by `isOpen`
- **What**: The `<aside>` wrapping the sidebar's children has a `hidden` class when `isOpen` is
  `false` and a `flex` class when `isOpen` is `true`, so on small screens the controls are hidden
  until the toggle is opened.
- **Inputs**: the `isOpen` state from FR-1.
- **Outputs**: `<aside>`'s className includes `hidden` or `flex` matching `isOpen`.
- **Edge cases**: initial render (before any click) defaults to collapsed (`isOpen = false` →
  `hidden`), matching "collapses on small screens" as the default mobile state.

### FR-3: `Sidebar` stays visible on medium+ screens regardless of `isOpen`
- **What**: The `<aside>`'s className always includes `md:flex`, so Tailwind's `md:` breakpoint
  override keeps the sidebar visible on desktop-sized viewports no matter what `isOpen` is —
  preserving the existing S4.1 desktop layout (sidebar + controls always present) without
  regression.
- **Inputs**: none — static class, unconditional on `isOpen`.
- **Outputs**: `<aside>` className contains `md:flex` in every render.
- **Edge cases**: none — this is what prevents the FR-2 `hidden` class from hiding the sidebar on
  desktop.

### FR-4: `ChatInput`'s root container sticks to the bottom on small screens
- **What**: `ChatInput`'s outer `<div>` includes `sticky bottom-0` (so it sticks to the bottom of its
  scrolling container on small screens) and `md:static` (so it reverts to normal in-flow positioning
  on medium+ screens, matching the existing desktop layout where the input sits below the message
  thread without sticking).
- **Inputs**: none — static classes; no change to `ChatInput`'s existing input/send logic.
- **Outputs**: `ChatInput`'s root `<div>` className includes `sticky`, `bottom-0`, and `md:static`.
- **Edge cases**: none — purely a class addition; all existing `ChatInput` behavior (Enter-to-send,
  disabled-while-loading, controlled `input` state) is unchanged.

---

## Tangible Outcomes

- [ ] **Outcome 1**: `Sidebar` renders a toggle `<button>` with a `md:hidden` class in its
  className.
- [ ] **Outcome 2**: On initial render, `Sidebar`'s `<aside>` className includes `hidden` (collapsed
  by default) and always includes `md:flex`; clicking the toggle button flips `<aside>`'s className
  to include `flex` instead of `hidden`, and updates the button's `aria-expanded`/`aria-label`.
- [ ] **Outcome 3**: `ChatInput`'s root container className includes `sticky`, `bottom-0`, and
  `md:static`.
- [ ] **Outcome 4**: All pre-existing S4.1 `Sidebar`/App-layout tests (`test_sidebar_renders_controls_heading`,
  `test_sidebar_renders_children`, `test_app_sidebar_present`, etc.) and all S3.3 `ChatInput` tests
  continue to pass unchanged — no regression from the added responsive classes.

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)
1. **test_sidebar_renders_toggle_button_hidden_on_desktop** (`Sidebar.test.jsx`): render `<Sidebar
   />`; assert a button (e.g. matched by `aria-label` "Show controls") is present with `md:hidden`
   in its className.
2. **test_sidebar_collapsed_by_default** (`Sidebar.test.jsx`): render `<Sidebar />`; assert the
   `<aside>` className includes `hidden` and `md:flex`, and the toggle button has
   `aria-expanded="false"`.
3. **test_clicking_toggle_expands_sidebar** (`Sidebar.test.jsx`): render `<Sidebar />`; click the
   toggle button; assert `<aside>` className now includes `flex` (not `hidden`), still includes
   `md:flex`, and the button's `aria-expanded` is `"true"` with an updated `aria-label` ("Hide
   controls").
4. **test_clicking_toggle_twice_collapses_again** (`Sidebar.test.jsx`): render `<Sidebar />`; click
   the toggle button twice; assert `<aside>` className includes `hidden` again and
   `aria-expanded="false"`.
5. **test_chat_input_root_has_sticky_bottom_classes** (`ChatInput.test.jsx`): render `<ChatInput
   onSend={vi.fn()} />`; assert the root container's className matches `/sticky/`, `/bottom-0/`, and
   `/md:static/`.
6. **Regression**: re-run existing `Sidebar.test.jsx` ("S4.1 — Sidebar component", "S4.1 — App
   layout") and `ChatInput.test.jsx` suites — all must remain green.

### Mocking Strategy
- No network calls involved — purely presentational/class-based changes.
- Use `@testing-library/react` (`render`, `screen`, `fireEvent`) with jsdom, matching this repo's
  existing component-test conventions (e.g. `Sidebar.test.jsx`, `StarRating.test.jsx`).
- No `matchMedia`/viewport mocking needed: tests assert the presence of responsive Tailwind classes
  (`md:hidden`, `md:flex`, `md:static`) rather than actual computed layout at a given viewport width,
  matching how S1.3 tested Tailwind classes rather than rendered pixels.

### Coverage Expectation
- All 4 FRs covered by at least one test; all 5 new tests above are green; every pre-existing
  `Sidebar.test.jsx` and `ChatInput.test.jsx` test continues to pass unchanged.

---

## References
- `roadmap.md` row S9.2 — "Sidebar collapses on small screens. Chat input sticks to the bottom";
  Phase 9 goal — "mobile layout is clean"
- `specs/spec-S4.1-sidebar-layout/spec.md` and `src/__tests__/Sidebar.test.jsx` — existing `Sidebar`
  behavior and the "S4.1 — App layout" regression tests this spec must not break
- `specs/spec-S3.3-chat-input/spec.md` — existing `ChatInput` behavior (Enter-to-send,
  disabled-while-loading) this spec adds positioning classes to without touching
- `specs/spec-S9.1-dark-mode/spec.md` — precedent for a self-contained component managing its own
  toggle state (`useTheme` pattern reused here as local `useState` in `Sidebar`)
