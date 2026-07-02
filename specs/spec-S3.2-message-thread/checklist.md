# Checklist — Spec S3.2: Message Thread

## Phase 1: Setup & Dependencies
- [x] Verify S3.1 is `done` (App.jsx has `messages` array state and region comment)
- [x] Confirm `@testing-library/react` is available (it was added in S3.1)
- [x] Create `src/MessageThread.jsx` (new file)
- [x] Create `src/__tests__/MessageThread.test.jsx` (new test file)

## Phase 2: Tests First (TDD)
- [x] Write `test_renders_empty_without_crash`
- [x] Write `test_renders_user_message`
- [x] Write `test_renders_assistant_message`
- [x] Write `test_user_and_assistant_have_different_classes`
- [x] Write `test_loading_indicator_shown`
- [x] Write `test_loading_indicator_hidden`
- [x] Write `test_multiple_messages_all_rendered`
- [x] Write `test_undefined_messages_no_crash`
- [x] Run tests — expect failures (Red): `npm --prefix . run test`

## Phase 3: Implementation
- [x] Implement FR-1 — render `messages` prop as a list of elements
- [x] Implement FR-2 — user vs assistant CSS class split (right-aligned blue / left-aligned grey)
- [x] Implement FR-3 — loading indicator shown when `loading === true`
- [x] Implement FR-4 — `useEffect` + `useRef` to scroll container to bottom on update
- [x] Run tests — expect pass (Green)
- [x] Implement FR-5 — update `App.jsx` to import and use `<MessageThread messages={messages} loading={loading} />`; keep `#response-area` and `#error-area` in the DOM
- [x] Run full test suite — all S3.1 tests still pass

## Phase 4: Integration
- [x] N/A — browser verification deferred to /verify-spec (no live API key in CI)
- [x] N/A — browser verification deferred to /verify-spec
- [x] N/A — browser verification deferred to /verify-spec
- [x] Run lint: oxlint src/MessageThread.jsx src/App.jsx — clean
- [x] Run full test suite: 58/58 passed

## Phase 5: Verification
- [x] All 6 tangible outcomes checked off
- [x] No hardcoded API keys or secrets in any new file
- [x] `src/MessageThread.jsx` — no inline styles (Tailwind classes only)
- [x] `#response-area` still present in DOM (26 App.test.jsx tests pass including S1.1 skeleton tests)
- [x] Update `roadmap.md` status: `spec-written` → `done`
