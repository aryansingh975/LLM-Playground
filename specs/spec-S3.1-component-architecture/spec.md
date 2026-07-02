# Spec S3.1 — Component Architecture

## Overview
Refactor `App.jsx` into a clean orchestrator component — the single source of truth for chat state — before it is split into child components in S3.2 and S3.3. Right now App mixes state management, event logic, and JSX rendering detail all in one flat function. This spec converts `response` (a plain string) to a `messages` array (`{ role, text }[]`), consolidates the state shape, and restructures the JSX so it reads as two clearly-delineated regions: a message list area (future `<MessageThread>`) and an input area (future `<ChatInput>`). No new files are created in this spec — only App.jsx is touched.

## Dependencies
- S0.2 — Vite + React project scaffold (App.jsx exists and hot-reloads)
- S2.2 — `callGroq` wired in `api.js` and imported by App

## Target Location
`src/App.jsx`

---

## Functional Requirements

### FR-1: Messages state replaces response string
- **What**: Replace the `response` (string) and `prompt` (string) states with `messages` (`{ role: 'user' | 'assistant', text: string }[]`) and `input` (string).
- **Inputs**: Initial render — no prior messages.
- **Outputs**: `messages` starts as `[]`; `input` starts as `''`.
- **Edge cases**: Existing `setResponse('Loading…')` hack removed entirely — loading is tracked by the `loading` boolean only.

### FR-2: handleSend appends to messages array
- **What**: On send, (1) append `{ role: 'user', text: input }` to messages immediately, (2) clear `input`, (3) call `callGroq(input)`, (4) append `{ role: 'assistant', text: reply }` on success or set `error` on failure. Never mutate existing entries.
- **Inputs**: `input` state (non-empty string), `callGroq` from `api.js`.
- **Outputs**: `messages` array grows by 1 (user) then 1 (assistant) per round-trip.
- **Edge cases**: If `input` is blank/whitespace, `handleSend` returns early without calling the API or appending anything.

### FR-3: JSX is split into two named regions
- **What**: The JSX returned by App has exactly two logical regions, each marked with a comment: `{/* MessageThread region — will become <MessageThread> in S3.2 */}` and `{/* ChatInput region — will become <ChatInput> in S3.3 */}`. All existing element IDs (`response-area`, `error-area`, `prompt-input`, `send-btn`) are preserved so S2.x tests do not break.
- **Inputs**: `messages`, `input`, `loading`, `error` state.
- **Outputs**: Message list rendered from the array; input + button rendered from `input` state.
- **Edge cases**: Empty `messages` renders nothing in the list area (no placeholder text needed here — that is S9.3).

---

## Tangible Outcomes

- [ ] **Outcome 1**: `messages` is an array — `useState([])` — not a string. Verified by reading the source.
- [ ] **Outcome 2**: Sending a message causes `messages` to contain `{ role: 'user', text: '...' }` followed by `{ role: 'assistant', text: '...' }` after the API resolves.
- [ ] **Outcome 3**: `setResponse('Loading…')` no longer appears anywhere in the file.
- [ ] **Outcome 4**: Blank-input guard — `handleSend` called with empty `input` does NOT append to `messages` and does NOT call `callGroq`.
- [ ] **Outcome 5**: Both region comments present in JSX.
- [ ] **Outcome 6**: All four element IDs preserved (`prompt-input`, `send-btn`, `response-area`, `error-area`).

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)
1. **test_messages_starts_empty**: Render `<App />`; assert the message list is empty (no `role` elements visible).
2. **test_send_appends_user_message**: Mock `callGroq` to resolve `'AI reply'`; fire a send with input `'Hello'`; assert `'Hello'` appears in the DOM.
3. **test_send_appends_assistant_reply**: Same mock; assert `'AI reply'` appears in the DOM after the send resolves.
4. **test_blank_input_no_call**: Mock `callGroq`; send with empty string; assert `callGroq` was never called.
5. **test_error_state**: Mock `callGroq` to reject; send a message; assert the error area shows an error and `messages` still contains the user turn.
6. **test_loading_disables_button**: Mock `callGroq` to be a pending promise; assert `send-btn` is `disabled` while loading.

### Mocking Strategy
- Mock `./api` module with `vi.mock('./api', () => ({ callGroq: vi.fn() }))` — never hit the live Groq API.
- Use `@testing-library/react` (`render`, `fireEvent`, `screen`, `waitFor`) with jsdom.
- Each test resets `callGroq` mock with `vi.resetAllMocks()` in `beforeEach`.

### Coverage Expectation
- All six FRs covered by at least one test each; edge cases (blank input, error path) have dedicated tests.

---

## References
- `roadmap.md` row S3.1 — "App component architecture checkpoint"
- `CLAUDE.md` — no hardcoded tokens; no co-author in commits
- Current `src/App.jsx` — starting point; `src/api.js` — `callGroq` export
