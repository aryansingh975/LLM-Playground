# Checklist — Spec S3.3: Chat Input

## Phase 1: Setup & Dependencies
- [x] Verify S3.2 (Message Thread) is `done` and its tests pass
- [x] Verify S2.2 (First AI call / `callGroq`) is `done`
- [x] Create `src/ChatInput.jsx` (new file)
- [x] No new npm packages needed — only React (already installed)

## Phase 2: Tests First (TDD)
- [x] Write test file: `src/__tests__/ChatInput.test.jsx`
- [x] test_renders_textarea_and_button
- [x] test_typing_updates_textarea
- [x] test_send_button_calls_onSend
- [x] test_send_clears_input
- [x] test_empty_send_no_callback
- [x] test_whitespace_send_no_callback
- [x] test_enter_key_sends
- [x] test_shift_enter_no_send
- [x] test_loading_true_disables_controls
- [x] test_loading_false_enables_controls
- [x] Run tests — expect failures (Red): `npm --prefix frontend run test` or `npx vitest`

## Phase 3: Implementation
- [x] Implement FR-1 — controlled textarea with `useState` for `input`
- [x] Implement FR-2 — Send button calls `onSend(input.trim())` and clears; no-op on blank
- [x] Implement FR-3 — `onKeyDown`: plain Enter sends, Shift+Enter is a no-op (lets newline through)
- [x] Implement FR-4 — `disabled={loading}` on both textarea and button; visual disabled style on button
- [x] Run tests — expect all 10 pass (Green)
- [x] Refactor if needed (no behaviour change)

## Phase 4: Integration
- [x] Update `src/App.jsx`:
  - [x] Import `ChatInput` from `./ChatInput`
  - [x] Remove `input` and `setInput` state from `App`
  - [x] Refactor `handleSend` to accept `text` as parameter (not read from state)
  - [x] Replace inline `<textarea>` + `<button>` block with `<ChatInput onSend={handleSend} loading={loading} />`
  - [x] Add comment `{/* ChatInput — handles input state, Enter-to-send, disabled-while-loading */}`
- [x] Move `id="prompt-input"` onto the textarea inside `ChatInput.jsx`
- [x] Move `id="send-btn"` onto the button inside `ChatInput.jsx`
- [x] Run lint: `npm --prefix frontend run lint` (or `npx eslint src/`)
- [x] Run full test suite — all tests green

## Phase 5: Verification
- [x] All 8 tangible outcomes checked off in `spec.md`
- [x] `#prompt-input` and `#send-btn` are still queryable in the rendered `<App>` DOM
- [x] N/A — manual smoke test deferred to /verify-spec (no browser environment here)
- [x] N/A — manual smoke test deferred to /verify-spec (no browser environment here)
- [x] Button and textarea disabled-while-loading verified by test_loading_true_disables_controls
- [x] No hardcoded API keys or secrets
- [x] Update `roadmap.md` status for S3.3: `spec-written` → `done`
