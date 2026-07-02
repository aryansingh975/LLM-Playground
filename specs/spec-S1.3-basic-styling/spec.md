# Spec S1.3 — Basic Styling

## Overview
Install Tailwind CSS and apply utility classes to the three elements built in S1.1/S1.2 so the page looks clean, centred, and readable. No AI logic, no new behaviour — just appearance. The goal is a layout that doesn't embarrass you: the input, button, and response area are visually separated, the page is centred on the screen, and text is comfortable to read. Tailwind is set up here once and reused by every future spec.

## Dependencies
- S1.2 — JS Click Handler must be `done` (App.jsx has prompt input, Send button, response area, and working click logic)

## Target Location
- `src/App.jsx` — add Tailwind utility classes to existing elements
- `src/index.css` (or `src/App.css`) — add `@tailwind` directives
- `vite.config.js` — no change needed if using Tailwind v4 (CSS-first config)
- `package.json` — add `tailwindcss` and `@tailwindcss/vite` devDependencies

---

## Functional Requirements

### FR-1: Tailwind CSS is installed and active
- **What**: The Tailwind CSS package is installed and its styles are injected into the app
- **Inputs**: `npm install` installs the package; Vite plugin (or PostCSS) processes it
- **Outputs**: Tailwind utility classes applied to elements are reflected in computed styles at runtime
- **Edge cases**: Tailwind v4 uses CSS-first config (`@import "tailwindcss"` in a CSS file) — no `tailwind.config.js` needed; verify the approach matches the installed version

### FR-2: Page layout is centred
- **What**: The `<main>` container is horizontally centred on the page with a sensible max-width so it doesn't stretch to full screen on wide monitors
- **Inputs**: Tailwind classes on `<main>` (e.g. `mx-auto`, `max-w-xl`, `p-8`)
- **Outputs**: Content appears centred in the viewport
- **Edge cases**: On narrow screens (mobile) the padding should not clip content — use responsive-safe values

### FR-3: Prompt input is visibly styled
- **What**: The textarea has a visible border, padding, and fills the container width so it's easy to type in
- **Inputs**: Tailwind classes on `<textarea>` (e.g. `w-full`, `border`, `rounded`, `p-2`)
- **Outputs**: Input is clearly distinct from the background, full-width, and has comfortable padding
- **Edge cases**: Focus state should be visible (e.g. `focus:outline-none focus:ring-2`)

### FR-4: Send button is clearly styled
- **What**: The button has a background colour, text colour, padding, and a hover state so it's obvious it's clickable
- **Inputs**: Tailwind classes on `<button>` (e.g. `bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700`)
- **Outputs**: Button is visually distinct and signals interactivity
- **Edge cases**: Must not be disabled-looking by default

### FR-5: Response area is visibly separated
- **What**: The response area has enough top margin or padding to be visually separated from the button, and text inside it is readable
- **Inputs**: Tailwind classes on `#response-area` (e.g. `mt-4`, `min-h-[2rem]`, `text-gray-800`)
- **Outputs**: When a response appears it's clearly visible and separated from the input controls
- **Edge cases**: When empty it should not take up distracting space — `min-h` keeps it stable

---

## Tangible Outcomes

- [ ] **Outcome 1**: `npm run dev` shows the page centred with a visible text area, a blue Send button, and a response section — not the default unstyled browser layout
- [ ] **Outcome 2**: The `<main>` element has at least one centering class (`mx-auto` or equivalent) in the rendered HTML
- [ ] **Outcome 3**: The `<textarea>` has at least one width class (`w-full` or equivalent) in the rendered HTML
- [ ] **Outcome 4**: The `<button>` has at least one background-colour class (`bg-*`) in the rendered HTML
- [ ] **Outcome 5**: All 9 existing tests (S1.1 + S1.2) still pass after adding classes — no regressions

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)

Styling tests verify structural choices — that the classes are present on the correct elements. They do not test visual appearance (that requires a browser).

1. **main element has a centering class**: render `<App />`, check `<main>` className includes `mx-auto`
2. **textarea has full-width class**: render `<App />`, check `#prompt-input` className includes `w-full`
3. **button has a background colour class**: render `<App />`, check `#send-btn` className matches `/bg-\w/`
4. **response area has a top margin class**: render `<App />`, check `#response-area` className includes `mt-`

### Mocking Strategy
- No external dependencies to mock
- Use `@testing-library/react` to render `<App />` and inspect `className` props
- Add a new `describe('S1.3 — Basic Styling')` block in `src/__tests__/App.test.jsx`

### Coverage Expectation
- One class-presence test per major FR (layout, input, button, response area)
- Existing S1.1 + S1.2 tests must still pass after classes are added

---

## References
- roadmap.md Phase 1 row for S1.3
- Tailwind CSS v4 docs — CSS-first installation with Vite plugin (`@tailwindcss/vite`)
- S1.1 + S1.2 specs — the elements receiving styles
