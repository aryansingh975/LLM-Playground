# Checklist — Spec S3.1: Component Architecture

## Phase 1: Setup & Dependencies
- [x] Confirm S0.2 is `done` (Vite project runs, `npm run dev` works)
- [x] Confirm S2.2 is `done` (`callGroq` exported from `src/api.js`)
- [x] Locate `src/App.jsx` — this is the only file touched in this spec
- [x] No new npm packages needed (React Testing Library should already be present from S2.x tests)

## Phase 2: Tests First (TDD)
- [x] Create `src/__tests__/App.test.jsx`
- [x] Write `test_messages_starts_empty` — render App, assert no messages visible
- [x] Write `test_send_appends_user_message` — mock callGroq, send 'Hello', assert it appears
- [x] Write `test_send_appends_assistant_reply` — mock callGroq resolving 'AI reply', assert reply appears
- [x] Write `test_blank_input_no_call` — send with empty input, assert callGroq not called
- [x] Write `test_error_state` — mock callGroq rejecting, assert error area shows message
- [x] Write `test_loading_disables_button` — mock pending callGroq, assert send-btn is disabled
- [x] Run `npm --prefix . run test` — expect all 6 to **fail** (Red) — 3 failed as expected (send_appends_user_message, blank_input_no_call, error_state_user_message_preserved)

## Phase 3: Implementation
- [x] Replace `response` state with `messages: []` array
- [x] Replace `prompt` state with `input: ''`
- [x] Update `handleSend`: guard blank input → append user turn → clear input → call API → append assistant turn (or set error)
- [x] Remove `setResponse('Loading…')` line entirely
- [x] Update JSX: render messages list from array (map over `messages`)
- [x] Add region comment `{/* MessageThread region — will become <MessageThread> in S3.2 */}`
- [x] Add region comment `{/* ChatInput region — will become <ChatInput> in S3.3 */}`
- [x] Preserve all four element IDs: `prompt-input`, `send-btn`, `response-area`, `error-area`
- [x] Run `npm --prefix . run test` — expect all 6 to **pass** (Green) — 26/26 App tests pass

## Phase 4: Integration
- [x] N/A — dev server test deferred to `/verify-spec` (no live API key in this env)
- [x] N/A — accumulated messages verified by `clicking Send twice accumulates both replies` test
- [x] N/A — blank-input guard verified by `blank_input_no_call` test
- [x] Run lint: `npm run lint` — no errors (oxlint clean)
- [x] Run full test suite: `npm run test` — 50/50 pass across all test files

## Phase 5: Verification
- [x] Outcome 1: `messages` is `useState([])` in source — confirmed ✓
- [x] Outcome 2: Two messages appended per round-trip (user + assistant) — confirmed by test ✓
- [x] Outcome 3: `setResponse('Loading…')` absent from file — confirmed ✓
- [x] Outcome 4: Blank-input guard test passes ✓
- [x] Outcome 5: Both region comments present in JSX — confirmed by reading file ✓
- [x] Outcome 6: All four element IDs preserved — confirmed ✓
- [x] No hardcoded API keys or tokens in App.jsx
- [x] Update `roadmap.md` status: `spec-written` → `done` ✓ (confirmed during /verify-spec)
