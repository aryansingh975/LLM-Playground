# Spec S1.2 — JS Click Handler

## Overview
Wire up the Send button from S1.1 so that clicking it reads whatever the user has typed in the prompt input and displays that text in the response area. No AI call yet — the response area simply echoes the typed message back. This is the first time the app becomes interactive: something happens when you click a button.

## Dependencies
- S1.1 — HTML Skeleton must be `done` (`#prompt-input`, `#send-btn`, `#response-area` exist in App.jsx)

## Target Location
`src/App.jsx` — add a click handler to the Send button; read `prompt` state; write to a new `response` state displayed in `#response-area`

---

## Functional Requirements

### FR-1: Click handler on Send button
- **What**: Clicking `#send-btn` triggers a function that reads the current value of the prompt input and writes it to the response area
- **Inputs**: Current value of the `prompt` state (string)
- **Outputs**: `#response-area` text content is set to the typed message
- **Edge cases**: Clicking with an empty input — the response area should show nothing (empty string), not crash or show `undefined`

### FR-2: Response area reflects the latest submission
- **What**: Each click replaces the response area content with the new submission (not appending)
- **Inputs**: User types a new message and clicks Send again
- **Outputs**: `#response-area` shows only the most recently sent message
- **Edge cases**: Clicking multiple times in a row — only the last value appears

### FR-3: Prompt input is cleared after Send
- **What**: After clicking Send, the text input is cleared (value reset to empty string)
- **Inputs**: Any non-empty prompt
- **Outputs**: `#prompt-input` value becomes `""` after the click
- **Edge cases**: Clearing after an empty submit should leave the input empty (no change, no crash)

---

## Tangible Outcomes

- [ ] **Outcome 1**: Typing "hello" and clicking Send shows "hello" in `#response-area`
- [ ] **Outcome 2**: Clicking Send a second time with new text replaces the previous response (not appends)
- [ ] **Outcome 3**: After clicking Send, `#prompt-input` is empty
- [ ] **Outcome 4**: Clicking Send with an empty input leaves `#response-area` empty (no "undefined" or null text)
- [ ] **Outcome 5**: All 5 existing S1.1 tests still pass (no regressions)

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)
1. **clicking Send displays the typed text in the response area**: type into input, click Send, assert `#response-area` text equals typed value
2. **clicking Send a second time replaces the previous response**: send "first", send "second", assert area shows "second" only
3. **clicking Send clears the prompt input**: type text, click Send, assert `#prompt-input` value is `""`
4. **clicking Send with empty input leaves response area empty**: click Send without typing, assert `#response-area` text is `""`

### Mocking Strategy
- No external dependencies to mock
- Use `@testing-library/react` + `@testing-library/user-event` for realistic click and type interactions
- Test file: `src/__tests__/App.test.jsx` — add a new `describe` block for S1.2, keep the S1.1 block intact

### Coverage Expectation
- All four FRs have at least one test
- The empty-input edge case is explicitly covered

---

## References
- roadmap.md Phase 1 row for S1.2
- S1.1 spec — the skeleton elements this spec wires up
