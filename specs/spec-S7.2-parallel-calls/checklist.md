# Checklist — Spec S7.2: Parallel Calls

## Phase 1: Setup & Dependencies
- [x] Verify S7.1 (compare route) and S2.2 (first API call) are `done`
- [x] Locate `src/ChatInput.jsx` and `src/ComparePage.jsx` for modification
- [x] No new npm dependencies needed (reuses `callProvider` from `src/api.js`, native
  `Promise.all`)

## Phase 2: Tests First (TDD)
- [x] Update `src/__tests__/ChatInput.test.jsx`
- [x] test_chat_input_accepts_custom_ids
- [x] test_chat_input_default_ids_unchanged
- [x] Update `src/__tests__/ComparePage.test.jsx`
- [x] test_compare_page_renders_shared_prompt_input
- [x] test_compare_page_sends_prompt_to_both_providers_concurrently
- [x] test_compare_page_shows_independent_loading_states
- [x] test_compare_page_displays_reply_in_correct_column
- [x] test_compare_page_one_provider_failure_does_not_block_other_success
- [x] test_compare_page_send_button_disabled_while_loading
- [x] Run tests — expect failures (Red) — 7/22 failed as expected before implementation

## Phase 3: Implementation
- [x] Implement FR-1 — `ChatInput.jsx`: add optional `id`/`sendBtnId` props, defaults preserve
  current markup
- [x] Implement FR-2 — `ComparePage.jsx`: render one shared `<ChatInput>` above the two columns
- [x] Implement FR-3 — `ComparePage.jsx`: `handleCompare` — two error-catching per-column async
  helpers (`fetchColumnReply`) dispatched together via `Promise.all`
- [x] Implement FR-4 — `ComparePage.jsx`: independent `leftLoading`/`leftReply`/`leftError` and
  `rightLoading`/`rightReply`/`rightError` state
- [x] Implement FR-5 — response areas render loading/reply/error/placeholder text per column via
  `columnResponseText`; `compare-send-btn` disabled while either column is loading
- [x] Run tests — expect pass (Green) — 22/22 new/updated tests green
- [x] Refactor if needed — moved `<ChatInput>` above the two-column row (initial draft placed it
  as a third flex sibling instead of above, per FR-2)

## Phase 4: Integration
- [x] Confirm `ChatPage.jsx`'s existing `ChatInput` usage renders `#prompt-input`/`#send-btn`
  unchanged
- [x] Confirm all 6 S7.1 `ComparePage.test.jsx` tests still pass unmodified
- [x] Run lint: `npx oxlint src/` — clean, no output
- [x] Run full test suite: `npm run test` — 181/181 passed (20 test files)

## Phase 5: Verification
- [x] All 6 tangible outcomes verified
- [x] No hardcoded secrets/tokens
- [x] Confirm one-provider-failure scenario genuinely does not block the other column — read
  `fetchColumnReply`/`handleCompare`: each column's `try`/`catch` is independent, and
  `Promise.all` wraps two already-settled-internally promises, so neither branch can reject the
  combinator
- [x] Update `roadmap.md` status for S7.2: `spec-written` → `done` (after implementation)
