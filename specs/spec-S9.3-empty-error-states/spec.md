# Spec S9.3 — Empty + Error States

## Overview
Two small polish behaviors for the chat page: (1) `MessageThread` shows a friendly placeholder
("nice empty state") instead of blank space when there are no messages yet, and (2) the error
message rendered in `ChatPage`'s `#error-area` is upgraded from plain red text to a clearly-styled
alert box (bordered, tinted background, `role="alert"`, warning icon) so a failed API call reads as
an unmistakable error state rather than easy-to-miss red text. S2.3 already classified error
messages (missing key / rate limit / no internet / other) and put them in `#error-area` — this spec
only changes how that area is *presented*, not the message content or classification logic.

## Dependencies
- S2.3 — Error Handling (`done`). Provides the classified error messages and `#error-area` this
  spec restyles.

## Target Location
- `src/MessageThread.jsx` (modified — render a friendly placeholder when `messages.length === 0 &&
  !loading`)
- `src/ChatPage.jsx` (modified — replace `#error-area`'s plain `text-red-600` text with a bordered/
  tinted alert box, `role="alert"`, shown only when `error` is set)

---

## Functional Requirements

### FR-1: `MessageThread` shows a friendly empty-state placeholder
- **What**: When `messages.length === 0 && !loading`, `MessageThread` renders a
  `data-testid="empty-chat-state"` element with encouraging copy (e.g. "Start the conversation —
  type a message below.") instead of rendering nothing.
- **Inputs**: `messages` array (defaults to `[]`), `loading` boolean (defaults to `false`).
- **Outputs**: the `empty-chat-state` element is present in the DOM exactly when `messages.length
  === 0 && !loading`.
- **Edge cases**: `messages.length === 0 && loading === true` → no empty-state (the existing
  loading indicator takes precedence — preserves the S3.2 `loading_indicator_shown` test);
  `messages.length > 0` → no empty-state regardless of `loading`; `messages === undefined` (default
  prop `[]`) → empty-state still shows, matching the S3.2 `undefined_messages_no_crash` default-prop
  behavior.

### FR-2: `ChatPage`'s error display becomes a clearly-styled alert
- **What**: `#error-area` renders nothing when `error` is falsy (unchanged). When `error` is
  truthy, its contents are wrapped in a bordered, background-tinted alert box carrying `role="alert"`
  and a warning icon, instead of today's plain `<div className="text-red-600">{error}</div>`.
- **Inputs**: the existing `error` state string (unchanged — still set/cleared by `handleSend`,
  still sourced from `callProvider`'s classified error messages per S2.3).
- **Outputs**: `#error-area`'s `textContent` is `''` when `error` is falsy, and still contains the
  exact original error message substring when `error` is set (icon markup aside) — preserving every
  existing S1.1/S3.1/S2.3 assertion that checks `#error-area`'s `textContent` is empty or matches a
  keyword (`Rate limit`, `No API key`, `No internet`).
- **Edge cases**: none beyond existing — purely presentational; error content/classification is
  untouched (owned by `src/api.js`, S2.3).

---

## Tangible Outcomes

- [ ] **Outcome 1**: `MessageThread` renders the `empty-chat-state` element when `messages` is
  empty and `loading` is `false`.
- [ ] **Outcome 2**: The `empty-chat-state` element is absent once at least one message exists, and
  absent while `loading` is `true` (even with zero messages).
- [ ] **Outcome 3**: `#error-area` contains an element with `role="alert"` only when `error` is
  set; when `error` is empty, `#error-area`'s `textContent` is still `''`.
- [ ] **Outcome 4**: Every pre-existing error-content assertion (`textContent` matches `/Rate
  limit/`, `/No API key/`, `/No internet/`, or is `not.toBe('')` / `toBe('')`) continues to pass
  against the restyled alert markup.
- [ ] **Outcome 5**: The two pre-existing tests that assumed the *old* blank-on-empty behavior
  (S1.1 "response area is initially empty", S3.1 "messages_starts_empty") are updated to assert the
  new empty-state placeholder is present instead of an empty string — a deliberate, spec-driven
  behavior change, not a regression.

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)
1. **test_message_thread_shows_empty_state_when_no_messages_and_not_loading**
   (`MessageThread.test.jsx`): render `<MessageThread messages={[]} loading={false} />`; assert
   `screen.getByTestId('empty-chat-state')` is present.
2. **test_message_thread_hides_empty_state_when_messages_present**
   (`MessageThread.test.jsx`): render with a non-empty `messages` array; assert
   `screen.queryByTestId('empty-chat-state')` is `null`.
3. **test_message_thread_hides_empty_state_while_loading** (`MessageThread.test.jsx`): render
   `<MessageThread messages={[]} loading={true} />`; assert `empty-chat-state` is absent and the
   existing `loading-indicator` testid is still present (no double-rendering conflict).
4. **test_error_area_renders_alert_role_when_error_present** (`App.test.jsx`, S9.3 block): mock
   `callProvider` to reject with a classified error; send a message; assert
   `document.getElementById('error-area').querySelector('[role="alert"]')` is present and its
   `textContent` matches the expected keyword (e.g. `/Rate limit/`).
5. **test_error_area_no_alert_when_no_error** (`App.test.jsx`, S9.3 block): render `<App />` with no
   send yet; assert `document.getElementById('error-area').querySelector('[role="alert"]')` is
   `null` and `#error-area`'s `textContent` is `''`.
6. **Update pre-existing tests** (regression, intentional behavior change):
   - S1.1 "response area is initially empty" (`App.test.jsx`) → assert the empty-state placeholder
     (e.g. via `getByTestId('empty-chat-state')`) is present instead of asserting `textContent ===
     ''`.
   - S3.1 "messages_starts_empty" (`App.test.jsx`) → same update.
   - S1.2 "clicking Send with empty input shows Loading then empty on undefined reply"
     (`App.test.jsx`) → discovered during implementation: blank input never triggers a send, so
     `#response-area` stays in the empty/not-loading state and now shows the placeholder too — same
     update as the two tests above.
   - All other pre-existing `MessageThread.test.jsx` and `App.test.jsx` tests (S2.3 error-keyword
     assertions, S3.1 send/reply flow, S3.2 message rendering) must continue to pass unchanged.

### Mocking Strategy
- No network calls introduced — purely presentational changes.
- Reuse this repo's existing `vi.mock('../api', ...)` / `vi.mocked(callProvider).mockRejectedValue(...)`
  pattern from `App.test.jsx`'s S2.3 block for the new alert-role tests.
- Use `@testing-library/react` (`render`, `screen`, `waitFor`) with jsdom, matching every other
  component test in this repo.

### Coverage Expectation
- Both FRs covered by at least one test; all 5 new tests above are green; the 2 pre-existing tests
  updated for the new default-empty-state behavior are green; every other pre-existing
  `MessageThread.test.jsx` and `App.test.jsx` test remains green unchanged.

---

## References
- `roadmap.md` row S9.3 — "Nice empty state when chat is empty. Clear error messages when API
  fails"; Phase 9 goal — "errors are handled nicely"
- `specs/spec-S2.3-error-handling/spec.md` — the classified error messages and `#error-area` this
  spec restyles without touching message content
- `specs/spec-S3.2-message-thread/spec.md` and `src/__tests__/MessageThread.test.jsx` — existing
  `MessageThread` behavior (loading indicator, message rendering) this spec must not break
- `src/ChatPage.jsx` — current plain-text `#error-area` this spec upgrades to a `role="alert"` box
