# Checklist — Spec S1.2: JS Click Handler

## Phase 1: Setup & Dependencies
- [x] Confirm S1.1 is `done` (`#prompt-input`, `#send-btn`, `#response-area` exist in App.jsx)
- [x] Confirm `src/App.jsx` has `prompt` state from S1.1 (controlled textarea)
- [x] Install `@testing-library/user-event` if not already present (`npm install --save-dev @testing-library/user-event`)

## Phase 2: Tests First (TDD)
- [x] Open `src/__tests__/App.test.jsx` and add a new `describe('S1.2 — JS Click Handler')` block
- [x] Write test: clicking Send displays typed text in `#response-area`
- [x] Write test: clicking Send a second time replaces (not appends) the response
- [x] Write test: clicking Send clears `#prompt-input` to `""`
- [x] Write test: clicking Send with empty input leaves `#response-area` empty
- [x] Run `npm run test` — expect the 4 new tests to fail (Red) ✗

## Phase 3: Implementation
- [x] Add `response` state to `App.jsx`: `const [response, setResponse] = useState('')`
- [x] Write `handleSend` function: reads `prompt`, sets `response` to it, clears `prompt` to `""`
- [x] Attach `onClick={handleSend}` to `#send-btn`
- [x] Render `{response}` inside `#response-area`
- [x] Run `npm run test` — expect all tests to pass (Green) ✓
- [x] Refactor if needed (no extra features beyond spec)

## Phase 4: Integration
- [x] Run `npm run dev` — manually type a message, click Send, verify text appears in response area
- [x] Verify input clears after Send
- [x] Run `npm run lint` — no warnings
- [x] Run full test suite: `npm run test` — 18/18 pass (S1.1 + S1.2)

## Phase 5: Verification
- [x] All 5 tangible outcomes checked
- [x] No hardcoded secrets or tokens
- [x] No unused imports in `App.jsx`
- [x] Update `roadmap.md` status: `spec-written` → `done`
