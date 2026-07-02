# Spec S7.2 — Parallel Calls

## Overview
Wire up the `/compare` page (scaffolded layout-only in S7.1) so a single shared prompt is sent to
both columns' providers **at the same time** using `Promise.all`, per the Phase 7 goal ("one
prompt → two columns → two different AI replies"). Each column keeps its own loading/reply/error
state — dispatched together, but resolved and rendered independently, so one provider being slow
or erroring never blocks or corrupts the other column's result. This reuses the existing
`callProvider` dispatcher from S2.2/S4.5 (`src/api.js`) unchanged; no new API code is needed. S7.3
will later replace the plain reply text in each column with a full response card (provider name,
token count, latency) — this spec's job is only to get the reply (or error) text flowing into the
placeholder response areas S7.1 already created.

## Dependencies
- S7.1 — Compare Route (`done`). Provides `ComparePage.jsx`'s two-column layout, each with its own
  `leftProvider`/`rightProvider` state and the `compare-response-left`/`compare-response-right`
  placeholder slots this spec now fills in.
- S2.2 — First API Call (`done`). Provides `callProvider(provider, prompt, temperature, topP,
  maxTokens)` in `src/api.js`, reused here unmodified (temperature/topP/maxTokens omitted so each
  provider function's own defaults apply, same as `ChatPage.jsx`'s first send before sliders are
  touched).

## Target Location
`src/ChatInput.jsx` (modified — add optional `id`/`sendBtnId` props, mirroring the `id`/`label`
pattern S7.1 added to `ProviderPicker`, so `ComparePage` can render its own instance without
colliding with `ChatPage`'s `#prompt-input`/`#send-btn`), `src/ComparePage.jsx` (modified — add a
shared `<ChatInput>` and a `handleCompare` function that dispatches both provider calls via
`Promise.all` and updates each column's state independently)

---

## Functional Requirements

### FR-1: `ChatInput` accepts optional `id`/`sendBtnId` props
- **What**: `ChatInput` gains two optional props, `id` (default `'prompt-input'`) and `sendBtnId`
  (default `'send-btn'`), applied to the `<textarea>` and `<button>` respectively. Omitting them
  reproduces the exact pre-S7.2 markup, so `ChatPage.jsx`'s existing usage (no props passed) is
  unaffected.
- **Inputs**: `onSend`, `loading` (unchanged), plus new optional `id: string`, `sendBtnId: string`.
- **Outputs**: `<textarea id={id}>` and `<button id={sendBtnId}>`.
- **Edge cases**: Omitting both props keeps `#prompt-input`/`#send-btn` — all pre-existing
  `ChatInput.test.jsx` tests must keep passing unmodified.

### FR-2: `ComparePage` renders one shared prompt input
- **What**: `ComparePage` renders a single `<ChatInput id="compare-prompt-input"
  sendBtnId="compare-send-btn" onSend={handleCompare} loading={...} />` above the two columns —
  one prompt, shared by both columns, rather than one input per column.
- **Inputs**: None — self-contained, same as `ChatPage`'s composition of `ChatInput`.
- **Outputs**: A single textarea (`#compare-prompt-input`) and send button
  (`#compare-send-btn`) in the DOM; distinct from `ChatPage`'s `#prompt-input`/`#send-btn` (which
  remain `null` when `ComparePage` is rendered, exactly as S7.1's own regression test already
  asserts for `/compare`).
- **Edge cases**: Blank/whitespace-only input never triggers a send — `ChatInput`'s existing
  `submit()` guard (`if (!input.trim()) return`) already covers this, reused unmodified.

### FR-3: `handleCompare` dispatches both provider calls concurrently via `Promise.all`
- **What**: On send, `handleCompare(text)` calls two internal async helpers — one for
  `leftProvider`, one for `rightProvider` — each of which calls `callProvider(provider, text)` and
  **catches its own errors** (returns `{ ok: true, reply }` or `{ ok: false, error }` rather than
  letting the rejection propagate). Both helpers are invoked together and awaited via
  `Promise.all([leftCall, rightCall])`, so both HTTP requests are in flight simultaneously — neither
  column waits for the other to finish before starting its own request.
- **Inputs**: `text` (string, the shared prompt).
- **Outputs**: Two settled results, one per column, each independently either a reply string or an
  error message.
- **Edge cases**: If both providers are the same (e.g. user picks `groq` for both columns), two
  independent `callProvider` calls still fire — no de-duplication. If `text` is empty, `ChatInput`
  never calls `handleCompare` (FR-2's edge case).

### FR-4: Each column tracks independent loading/reply/error state
- **What**: `ComparePage` holds `leftLoading`/`leftReply`/`leftError` and
  `rightLoading`/`rightReply`/`rightError` (six `useState` values, or two per-column state objects).
  Both loading flags are set `true` at the start of `handleCompare` and each is set back to `false`
  independently as soon as its own helper settles — the left column does not wait for the right
  column's request to finish, and vice versa.
- **Inputs/Outputs**: Internal state only, driven by FR-3's two helpers.
- **Edge cases**: A second send while the first is still in flight is not explicitly guarded against
  in this spec (no dedicated race-condition test) — `compare-send-btn` is simply disabled while
  either column is loading (see FR-5), which prevents the user from triggering overlapping sends
  through the UI.

### FR-5: Response areas show loading, reply, or error text per column
- **What**: The `compare-response-left`/`compare-response-right` elements (placeholders since S7.1)
  now render: `"Loading…"` while that column's request is in flight, the reply text on success, an
  `"Error: <message>"` string on failure, or the original S7.1 placeholder text
  ("Response will appear here") when nothing has been sent yet — so S7.1's own
  `test_compare_page_shows_placeholder_response_areas` test keeps passing unmodified on first
  render. `compare-send-btn` is disabled while either `leftLoading` or `rightLoading` is `true`.
- **Inputs/Outputs**: Derived directly from FR-4's state.
- **Edge cases**: One column erroring while the other succeeds must show the error in one column
  and the reply in the other simultaneously — this is the core scenario this spec exists to get
  right, since a naive `Promise.all` over un-caught `callProvider` calls would otherwise reject the
  whole combinator and lose the successful column's reply.

---

## Tangible Outcomes

- [ ] **Outcome 1**: `ChatInput` renders with custom `id`/`sendBtnId` when passed, and with the
  original `#prompt-input`/`#send-btn` when they are omitted; all pre-existing `ChatInput.test.jsx`
  tests pass unmodified.
- [ ] **Outcome 2**: `ComparePage` renders exactly one shared prompt textarea
  (`#compare-prompt-input`) and send button (`#compare-send-btn`); `ChatPage`'s
  `#prompt-input`/`#send-btn` remain absent when `/compare` is rendered.
- [ ] **Outcome 3**: Sending a prompt calls `callProvider` for both `leftProvider` and
  `rightProvider` with the same prompt text, and both calls are dispatched before either has
  resolved (verified via deferred/never-resolving mocks — both are pending simultaneously).
- [ ] **Outcome 4**: Each column shows `"Loading…"` independently while its own request is in
  flight, then shows its own reply text once its own request resolves — independent of the other
  column's timing.
- [ ] **Outcome 5**: If the left column's call rejects and the right column's call resolves, the
  left column shows an `"Error: ..."` message and the right column shows its reply — neither
  column's outcome is lost or blocked by the other.
- [ ] **Outcome 6**: `compare-send-btn` is disabled while either column is loading.

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)
1. **test_chat_input_accepts_custom_ids** (`ChatInput.test.jsx`): render with
   `id="compare-prompt-input"` and `sendBtnId="compare-send-btn"`; assert those ids are present
   (via `document.getElementById`) instead of `prompt-input`/`send-btn`.
2. **test_chat_input_default_ids_unchanged** (`ChatInput.test.jsx`): render with no `id`/`sendBtnId`
   props; assert `#prompt-input`/`#send-btn` are still present (regression guard for FR-1).
3. **test_compare_page_renders_shared_prompt_input** (`ComparePage.test.jsx`): render
   `<ComparePage />`; assert `document.getElementById('compare-prompt-input')` and
   `document.getElementById('compare-send-btn')` are both present, and exactly one of each exists.
4. **test_compare_page_sends_prompt_to_both_providers_concurrently** (`ComparePage.test.jsx`, mocks
   `../api`): mock `callProvider` to return never-resolving promises for both calls; type a prompt,
   click send; assert `callProvider` was called twice — once with `('groq', 'hello')` (or however
   the left default is wired) and once with `('gemini', 'hello')` — both calls present before
   either resolves.
5. **test_compare_page_shows_independent_loading_states** (`ComparePage.test.jsx`): mock
   `callProvider` so the left call resolves quickly and the right call never resolves; send a
   prompt; assert the left response area shows its reply while the right still shows "Loading…".
6. **test_compare_page_displays_reply_in_correct_column** (`ComparePage.test.jsx`): mock
   `callProvider` to resolve `"left reply"` for the left provider and `"right reply"` for the
   right; send a prompt; assert `compare-response-left` contains "left reply" and
   `compare-response-right` contains "right reply" (not swapped).
7. **test_compare_page_one_provider_failure_does_not_block_other_success**
   (`ComparePage.test.jsx`): mock `callProvider` to reject for the left provider and resolve for the
   right; send a prompt; assert `compare-response-left` shows an "Error:" message and
   `compare-response-right` shows the successful reply.
8. **test_compare_page_send_button_disabled_while_loading** (`ComparePage.test.jsx`): mock
   `callProvider` to return a never-resolving promise for at least one column; send a prompt;
   assert `#compare-send-btn` is disabled.

### Mocking Strategy
- `ComparePage.test.jsx` uses `vi.mock('../api', () => ({ callProvider: vi.fn() }))`, matching the
  existing `App.test.jsx` pattern, so no real HTTP is ever hit.
- Independent-timing tests (5, 7) use two separately-controlled promises (e.g. one resolved
  `Promise.resolve(...)`, one that never resolves, or explicit resolve/reject callbacks captured
  via `new Promise((resolve) => { capturedResolve = resolve })`) to prove the two columns really do
  settle independently rather than one waiting on the other.
- `ChatInput.test.jsx` needs no mocking — pure rendering/props component.

### Coverage Expectation
- All 5 FRs covered by at least one test; all 8 tests above are green; all pre-existing tests
  (`ChatInput.test.jsx`, `ComparePage.test.jsx`'s 4 S7.1 tests, `App.test.jsx`, `NavBar.test.jsx`,
  `ProviderPicker.test.jsx`, and every other `src/__tests__/*` file) continue to pass with zero
  unintended modifications.

---

## References
- `roadmap.md` row S7.2 — "Send the prompt to both providers at the same time using `Promise.all`"
- `specs/spec-S7.1-compare-route/spec.md`, `src/ComparePage.jsx` — the two-column layout, per-column
  provider state, and placeholder response areas this spec fills in
- `specs/spec-S2.2-first-api-call/spec.md`, `src/api.js` — `callProvider` dispatcher reused
  unmodified
- `src/ChatInput.jsx`, `specs/spec-S3.3-chat-input/` — the input component extended with optional
  `id`/`sendBtnId` props, following the same reuse pattern S7.1 established for `ProviderPicker`
- `specs/spec-S7.3-response-cards/` (future) — replaces the plain reply text in each column with a
  full response card (provider name, token count, latency)
