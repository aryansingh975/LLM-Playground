# Checklist — Spec S9.3: Empty + Error States

## Phase 1: Setup & Dependencies
- [x] Verify S2.3 (error handling) is `done`
- [x] Locate target files: `src/MessageThread.jsx`, `src/ChatPage.jsx`
- [x] No new npm dependencies needed (Tailwind + existing React)

## Phase 2: Tests First (TDD)
- [x] Update `src/__tests__/MessageThread.test.jsx`
  - [x] test_message_thread_shows_empty_state_when_no_messages_and_not_loading
  - [x] test_message_thread_hides_empty_state_when_messages_present
  - [x] test_message_thread_hides_empty_state_while_loading
- [x] Update `src/__tests__/App.test.jsx`
  - [x] test_error_area_renders_alert_role_when_error_present
  - [x] test_error_area_no_alert_when_no_error
  - [x] Update "response area is initially empty" (S1.1) to expect the empty-state placeholder
  - [x] Update "messages_starts_empty" (S3.1) to expect the empty-state placeholder
- [x] Run tests — expect failures (Red)

## Phase 3: Implementation
- [x] Implement FR-1 — `MessageThread.jsx`: render `data-testid="empty-chat-state"` placeholder
  when `messages.length === 0 && !loading`
- [x] Implement FR-2 — `ChatPage.jsx`: restyle `#error-area` as a bordered/tinted alert box with
  `role="alert"` and warning icon, shown only when `error` is truthy
- [x] Run tests — expect pass (Green)
- [x] Refactor if needed — discovered and updated a third pre-existing test with the same old
  blank-on-empty assumption: S1.2 "clicking Send with empty input shows Loading then empty on
  undefined reply" (`App.test.jsx`)

## Phase 4: Integration
- [x] Confirm `ChatPage` still renders `MessageThread` and the error area correctly (no prop/API
  changes required on either component)
- [x] Run lint: `npx oxlint src/MessageThread.jsx src/ChatPage.jsx src/__tests__/MessageThread.test.jsx
  src/__tests__/App.test.jsx` — clean
- [x] Run full test suite: `npm run test` — 226/226 passed (25 test files)

## Phase 5: Verification
- [x] All 5 tangible outcomes verified
- [x] No hardcoded secrets/tokens
- [x] Update `roadmap.md` status for S9.3: `pending` → `spec-written` (done as part of this step) →
  `done` (after implementation)
