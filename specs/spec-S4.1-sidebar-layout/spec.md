# Spec S4.1 — Sidebar Layout

## Overview
Restructure `App.jsx` from its current single-column layout into a two-panel layout: a fixed-width sidebar on the left and a flexible chat area on the right. The sidebar is extracted into a dedicated `<Sidebar>` component that renders a "Controls" heading and accepts `children` — this is the slot where S4.2–S4.5 will slot in the temperature slider, top-p slider, max-tokens slider, and provider picker. For S4.1 the sidebar is empty (no controls yet). All existing DOM IDs (`#response-area`, `#error-area`, `#prompt-input`, `#send-btn`) must remain intact so prior tests continue to pass.

## Dependencies
- S3.3 — `<ChatInput>` is wired into `App.jsx`; this spec restructures that same `App.jsx` around it.

## Target Location
`src/Sidebar.jsx` (new file) and `src/App.jsx` (layout restructure)

---

## Functional Requirements

### FR-1: New `<Sidebar>` component
- **What**: A React component that renders a visually distinct panel containing a "Controls" heading and any `children` passed to it. For S4.1 no children are passed — it renders the heading and an empty body.
- **Inputs**: `children` prop (optional, default empty).
- **Outputs**: A DOM element with a visible "Controls" heading; children rendered inside the panel below it.
- **Edge cases**: No children → renders heading only, no crash. Future children (sliders) mount and render without layout breakage.

### FR-2: Two-panel flex layout in App.jsx
- **What**: The outermost `<main>` in `App.jsx` switches from a narrow single-column (`max-w-xl mx-auto`) to a full-width flex-row container (`flex flex-row`). `<Sidebar>` is rendered as one flex child; the chat area (MessageThread + error + ChatInput) is the other flex child and grows to fill remaining space (`flex-1`).
- **Inputs**: No props — this is a structural change to `App.jsx`.
- **Outputs**: Sidebar and chat column are direct siblings inside the flex container. Sidebar has a defined width (e.g. `w-64`); chat column has `flex-1`.
- **Edge cases**: At narrow viewport widths the sidebar may overflow horizontally — acceptable for S4.1 (mobile layout is S9.2). The existing chat behaviour is unchanged.

### FR-3: Chat area DOM IDs preserved
- **What**: After the layout restructure, all four IDs used by prior tests remain in the DOM when `<App>` is rendered: `#response-area` (wrapper around MessageThread), `#error-area` (error text div), `#prompt-input` (textarea inside ChatInput), `#send-btn` (button inside ChatInput).
- **Inputs**: Rendered `<App>` component.
- **Outputs**: `document.getElementById('response-area')` etc. all return non-null elements.
- **Edge cases**: IDs must not be duplicated — exactly one element per ID.

### FR-4: Sidebar visually distinct
- **What**: The sidebar panel has at least one Tailwind class that gives it a visible border or background that differs from the chat area (e.g. `border-r`, `bg-gray-50`, `bg-slate-100`). This makes it clear to the user that it is a separate panel.
- **Inputs**: Rendered sidebar element.
- **Outputs**: The sidebar element's `className` contains a border or background class.
- **Edge cases**: Visual distinction is verified by class name, not pixel comparison.

---

## Tangible Outcomes

- [ ] **Outcome 1**: `src/Sidebar.jsx` exists and exports a default React component.
- [ ] **Outcome 2**: Rendering `<Sidebar />` shows an element with the text "Controls" in the DOM.
- [ ] **Outcome 3**: Rendering `<Sidebar><p>hello</p></Sidebar>` renders the "hello" text inside the panel.
- [ ] **Outcome 4**: The flex-row layout container is present in the rendered `<App>` (verifiable by class attribute).
- [ ] **Outcome 5**: `#response-area`, `#error-area`, `#prompt-input`, and `#send-btn` all exist in the rendered `<App>` DOM (regression — all prior App tests still pass).
- [ ] **Outcome 6**: The sidebar element has a border or background class distinguishing it from the chat column.

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)
1. **test_sidebar_renders_controls_heading**: Render `<Sidebar />`; assert the text "Controls" is in the document.
2. **test_sidebar_renders_children**: Render `<Sidebar><span data-testid="child">hi</span></Sidebar>`; assert the child is in the document.
3. **test_sidebar_has_visual_distinction_class**: Render `<Sidebar />`; query the root element and assert its `className` matches a border or background pattern (e.g. `/border|bg-/`).
4. **test_app_has_flex_row_container**: Render `<App />`; assert at least one element has a class matching `flex` and `flex-row` (or `flex-row` alone — Tailwind shorthand).
5. **test_app_sidebar_present**: Render `<App />`; assert an element with the text "Controls" is in the document.
6. **test_app_response_area_preserved**: Render `<App />`; assert `document.getElementById('response-area')` is non-null.
7. **test_app_error_area_preserved**: Render `<App />`; assert `document.getElementById('error-area')` is non-null.
8. **test_app_prompt_input_preserved**: Render `<App />`; assert `document.getElementById('prompt-input')` is non-null.
9. **test_app_send_btn_preserved**: Render `<App />`; assert `document.getElementById('send-btn')` is non-null.

### Mocking Strategy
- No external API calls for `Sidebar` unit tests — pure rendering component.
- `App.jsx` tests: mock `callGroq` via `vi.mock('../api')` (same as existing `App.test.jsx` pattern) to avoid real HTTP.
- Use `@testing-library/react` (`render`, `screen`) with jsdom (`// @vitest-environment jsdom` header).

### Coverage Expectation
- All 4 FRs have at least one passing test; the 9 named tests above are all green before the spec is marked done.

---

## References
- `roadmap.md` row S4.1 — "Sidebar layout"; Phase 4 goal — sliders + provider picker go here
- `CLAUDE.md` — no hardcoded secrets; frontend tests use Vitest + jsdom
- `src/App.jsx` — current single-column layout to be restructured
- `src/ChatInput.jsx`, `src/MessageThread.jsx` — remain unchanged; just repositioned in the layout
