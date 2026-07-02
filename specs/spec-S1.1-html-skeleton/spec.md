# Spec S1.1 — HTML Skeleton

## Overview
Replace the Vite starter boilerplate in `App.jsx` with the foundational UI structure for the LLM Playground: a text input where the user types a prompt, a Send button, and a response area that will later show the AI reply. No logic yet — just the structure and named elements so S1.2 (JS click handler) has something to wire up.

## Dependencies
- S0.2 — Vite + React project must be scaffolded and running

## Target Location
`src/App.jsx` — replace scaffold content with the chat skeleton layout

---

## Functional Requirements

### FR-1: Text input element
- **What**: A `<textarea>` (or `<input type="text">`) where the user types their message
- **Inputs**: User keyboard input
- **Outputs**: The entered text is readable by JavaScript (accessible via React `useState` or a ref)
- **Attributes**: `id="prompt-input"` (for tests to find it), a descriptive `placeholder` (e.g. "Type your message…"), `aria-label="Prompt input"` for accessibility
- **Edge cases**: Empty input — the element must still render with no default value

### FR-2: Send button
- **What**: A `<button>` the user clicks to submit their message
- **Outputs**: Clickable; no handler yet (that's S1.2)
- **Attributes**: `id="send-btn"`, visible label "Send"
- **Edge cases**: Must render enabled (not disabled) by default

### FR-3: Response area
- **What**: A `<div>` (or `<p>`) that will display the AI reply; starts empty
- **Attributes**: `id="response-area"`, visible only when it has content is optional at this stage — it just needs to exist in the DOM
- **Edge cases**: Empty string / no content — renders as an empty element (no crash, no placeholder text required)

### FR-4: Remove boilerplate
- **What**: Delete all Vite starter content from `App.jsx` (hero images, counter button, docs links)
- **Why**: Keeps the component clean so S1.2 only touches the new elements
- **Edge cases**: Imports for deleted assets (`reactLogo`, `viteLogo`, `heroImg`, `App.css`) must also be removed to avoid lint errors

---

## Tangible Outcomes

- [ ] **Outcome 1**: Running `npm run dev` shows a page with a text input, a "Send" button, and an empty response area — no Vite boilerplate visible
- [ ] **Outcome 2**: `document.getElementById('prompt-input')` returns the input element in the browser console
- [ ] **Outcome 3**: `document.getElementById('send-btn')` returns the button in the browser console
- [ ] **Outcome 4**: `document.getElementById('response-area')` returns the response div in the browser console
- [ ] **Outcome 5**: No console errors or lint warnings on load

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)

1. **test_renders_prompt_input**: renders a prompt input with id `prompt-input`
2. **test_renders_send_button**: renders a button with id `send-btn` and text "Send"
3. **test_renders_response_area**: renders a response area with id `response-area`
4. **test_response_area_initially_empty**: response area has no text content on initial render
5. **test_no_boilerplate**: page does not contain the old counter button or the Vite/React logo images

### Mocking Strategy
- No external dependencies to mock at this stage
- Use Vitest + `@testing-library/react` to render `<App />` and query by `id`
- Test file: `src/__tests__/App.test.jsx`

### Coverage Expectation
- All three structural elements (input, button, response area) have at least one render test
- Boilerplate removal verified by asserting the counter is absent

---

## References
- roadmap.md Phase 1 row for S1.1
- S0.2 spec (project scaffold) — the Vite + React baseline this spec replaces
