# Spec S3.3 — Chat Input

## Overview
Extract the inline textarea + Send button from `App.jsx` into a dedicated `<ChatInput>` component. The component owns its own text input state, submits on button click or Enter key (Shift+Enter inserts a newline), and calls an `onSend(text)` callback supplied by `App`. While the AI is loading, the button and textarea are disabled so the user cannot fire duplicate requests. After a successful send the input is cleared. `App.jsx` is updated to import and use `<ChatInput>` in place of the old inline region, and moves the `handleSend` logic so it accepts the text as a parameter rather than reading it from its own `input` state.

## Dependencies
- S3.2 — `<MessageThread>` is wired into `App.jsx`; the messages + loading state managed in `App` is the interface `ChatInput` connects to.
- S2.2 — `callGroq` (in `src/api.js`) is the AI call triggered on send.

## Target Location
`src/ChatInput.jsx` (new file) and `src/App.jsx` (updated to use it)

---

## Functional Requirements

### FR-1: Controlled textarea with local state
- **What**: `<ChatInput>` maintains its own `input` string state via `useState`. The textarea is a controlled input bound to this state.
- **Inputs**: None from the parent — the component manages its own text internally.
- **Outputs**: Textarea reflects the current `input` value at all times.
- **Edge cases**: Initial render → textarea is empty string, not undefined. Very long text wraps inside the textarea.

### FR-2: Send on button click
- **What**: Clicking the "Send" button calls `onSend(input.trim())` and then clears `input` to `''`. If `input.trim()` is empty the call is a no-op (no callback fired, no clear).
- **Inputs**: `onSend` prop (function), current `input` state.
- **Outputs**: `onSend` invoked with trimmed text; `input` reset to `''` after send.
- **Edge cases**: Whitespace-only input is rejected (no send, no clear). `onSend` is not called when input is blank.

### FR-3: Send on Enter key (Shift+Enter inserts newline)
- **What**: Pressing Enter (without Shift) in the textarea triggers the same send logic as the button — call `onSend(input.trim())` and clear. Pressing Shift+Enter inserts a real newline (default textarea behaviour — do not prevent it).
- **Inputs**: `onKeyDown` event on the textarea.
- **Outputs**: `onSend` called and input cleared on plain Enter; newline inserted on Shift+Enter.
- **Edge cases**: Enter on empty/whitespace-only input → `preventDefault` called but `onSend` is not.

### FR-4: Disabled state while loading
- **What**: When the `loading` prop is `true`, both the textarea and the Send button have `disabled={true}`. The button also receives a visual disabled style (e.g. `opacity-50 cursor-not-allowed`).
- **Inputs**: `loading` prop (boolean, default `false`).
- **Outputs**: `textarea.disabled` and `button.disabled` are true while loading; false otherwise.
- **Edge cases**: If `loading` is undefined it defaults to `false` (no disabled state).

### FR-5: App.jsx wired to use `<ChatInput>`
- **What**: The inline `<textarea>` + `<button>` block in `App.jsx` is replaced with `<ChatInput onSend={handleSend} loading={loading} />`. The `input` and `setInput` state in `App` is removed (it moves into `ChatInput`). `handleSend` is refactored to accept `text` as a parameter instead of reading from the now-gone `input` state. The comment `{/* ChatInput region */}` is added where the component is used.
- **Inputs**: `handleSend(text)` function, `loading` state.
- **Outputs**: App renders and behaves identically to before from the user's perspective. The DOM IDs `prompt-input` (on the textarea) and `send-btn` (on the button) still exist — they are now inside `ChatInput.jsx`.
- **Edge cases**: `loading` false and no messages → textarea enabled, button enabled.

---

## Tangible Outcomes

- [ ] **Outcome 1**: `src/ChatInput.jsx` exists and exports a default React component.
- [ ] **Outcome 2**: Rendering `<ChatInput onSend={vi.fn()} loading={false} />` shows a textarea and a Send button in the DOM.
- [ ] **Outcome 3**: Clicking Send with non-empty text calls `onSend` with the trimmed text and clears the textarea.
- [ ] **Outcome 4**: Pressing Enter (without Shift) with non-empty text calls `onSend` and clears the textarea.
- [ ] **Outcome 5**: Clicking Send or pressing Enter with whitespace-only text does NOT call `onSend`.
- [ ] **Outcome 6**: `loading={true}` makes the textarea and button both disabled.
- [ ] **Outcome 7**: `App.jsx` no longer contains the inline `<textarea>` or `<button>` block — it delegates to `<ChatInput>`.
- [ ] **Outcome 8**: `#prompt-input` and `#send-btn` still exist in the DOM when `App` is rendered (selectors used by integration tests from prior specs).

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)
1. **test_renders_textarea_and_button**: Render `<ChatInput onSend={vi.fn()} loading={false} />`; assert a textarea and a button with text "Send" are in the DOM.
2. **test_typing_updates_textarea**: Fire `change` event on textarea with value "hello"; assert textarea value becomes "hello".
3. **test_send_button_calls_onSend**: Type "hello", click Send; assert `onSend` was called once with `"hello"`.
4. **test_send_clears_input**: Type "hello", click Send; assert textarea value is `""` after click.
5. **test_empty_send_no_callback**: Leave textarea empty, click Send; assert `onSend` was NOT called.
6. **test_whitespace_send_no_callback**: Type "   ", click Send; assert `onSend` was NOT called and textarea value is unchanged (or cleared — implementation choice, but callback must not fire).
7. **test_enter_key_sends**: Type "hello", fire `keyDown` with `key: 'Enter'` and `shiftKey: false`; assert `onSend` called with `"hello"` and textarea cleared.
8. **test_shift_enter_no_send**: Type "hello", fire `keyDown` with `key: 'Enter'` and `shiftKey: true`; assert `onSend` was NOT called.
9. **test_loading_true_disables_controls**: Render with `loading={true}`; assert `textarea.disabled` is `true` and `button.disabled` is `true`.
10. **test_loading_false_enables_controls**: Render with `loading={false}`; assert `textarea.disabled` is `false` and `button.disabled` is `false`.

### Mocking Strategy
- No external API calls — `ChatInput` is a pure UI component; `onSend` is mocked with `vi.fn()`.
- Use `@testing-library/react` (`render`, `screen`, `fireEvent`) with jsdom (already configured in Vitest).
- `App.jsx` integration: mount `<App />` in one test and assert `#prompt-input` and `#send-btn` exist; mock `callGroq` via `vi.mock('./api')` to avoid real HTTP.

### Coverage Expectation
- All 5 FRs have at least one passing test; all 10 named tests above are green before the spec is marked done.

---

## References
- `roadmap.md` row S3.3 — "Chat input"
- `CLAUDE.md` — no hardcoded secrets; no co-author in commits; frontend tests use Vitest + jsdom
- `src/App.jsx` — current inline region (`<textarea id="prompt-input">`, `<button id="send-btn">`) to be extracted
- `src/api.js` — exports `callGroq`; called by `handleSend` in `App.jsx`
