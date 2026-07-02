# Spec S2.2 — First API Call

## Overview
Replace the echo behaviour from S1.2 with a real AI call: when the user clicks Send, the app sends the typed message to Groq's chat completions API and displays the AI's reply in `#response-area`. This is the first time the app talks to a live AI. The API key comes from `import.meta.env.VITE_GROQ_API_KEY` (never hardcoded). A loading indicator is shown while the request is in flight, and a simple error message is shown if the call fails.

## Dependencies
- S2.1 — API keys obtained; `VITE_GROQ_API_KEY` is set in `.env.local`
- S1.2 — JS click handler exists in `App.jsx` (`handleSend`, `#response-area`)

## Target Location
- `src/api.js` — new module: exports `callGroq(prompt)` function
- `src/App.jsx` — import and call `callGroq`; add loading state; display reply or error

---

## Functional Requirements

### FR-1: `callGroq(prompt)` function in `src/api.js`
- **What**: An async function that sends a user message to Groq's OpenAI-compatible chat completions endpoint and returns the assistant's reply text
- **Inputs**: `prompt` (string) — the user's message
- **Outputs**: `string` — the assistant's reply from `choices[0].message.content`
- **Endpoint**: `https://api.groq.com/openai/v1/chat/completions`
- **Headers**: `Content-Type: application/json`, `Authorization: Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
- **Body**:
  ```json
  {
    "model": "llama3-8b-8192",
    "messages": [{ "role": "user", "content": "<prompt>" }]
  }
  ```
- **Edge cases**:
  - If `VITE_GROQ_API_KEY` is undefined/empty, throw an `Error('VITE_GROQ_API_KEY is not set')`
  - If the API returns a non-OK HTTP status, throw an `Error('Groq API error: <status>')`
  - If the response JSON has no `choices`, throw an `Error('Unexpected response format')`

### FR-2: Loading state in `App.jsx`
- **What**: While the API call is in flight, the `#response-area` shows "Loading…" and the Send button is disabled so the user cannot double-submit
- **Inputs**: React `loading` state (`boolean`), set to `true` before the call, `false` after (whether success or error)
- **Outputs**: `#send-btn` has `disabled` attribute while loading; `#response-area` text is "Loading…" while loading

### FR-3: Reply displayed in `App.jsx`
- **What**: On success, the assistant's reply text (returned by `callGroq`) replaces the loading text in `#response-area`
- **Outputs**: `#response-area` text content equals the reply string from Groq

### FR-4: Error displayed on failure
- **What**: If `callGroq` throws, `#response-area` shows a human-readable error message (e.g. "Error: Groq API error: 401") instead of crashing the app
- **Outputs**: `#response-area` text starts with "Error:" on failure

---

## Tangible Outcomes

- [ ] **Outcome 1**: `src/api.js` exports a `callGroq` function
- [ ] **Outcome 2**: `callGroq` POSTs to `https://api.groq.com/openai/v1/chat/completions` with correct headers and body (verified by mock)
- [ ] **Outcome 3**: While the request is in flight, `#send-btn` is disabled and `#response-area` shows "Loading…"
- [ ] **Outcome 4**: On success, `#response-area` shows the mocked reply text
- [ ] **Outcome 5**: On failure (non-2xx or missing key), `#response-area` shows a message starting with "Error:"
- [ ] **Outcome 6**: `VITE_GROQ_API_KEY` is never hardcoded — always from `import.meta.env`

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)

**`src/__tests__/api.test.js`** — unit tests for `callGroq` in isolation (mock `fetch`):

1. **callGroq_posts_to_correct_url**: mock `fetch` to return a valid response; assert `fetch` was called with `https://api.groq.com/openai/v1/chat/completions`
2. **callGroq_sends_authorization_header**: assert the Authorization header is `Bearer test-key`
3. **callGroq_returns_reply_text**: mock a response with `choices[0].message.content = "Hello!"`, assert `callGroq` returns `"Hello!"`
4. **callGroq_throws_on_missing_key**: set `import.meta.env.VITE_GROQ_API_KEY` to `undefined`; assert `callGroq` throws
5. **callGroq_throws_on_non_ok_response**: mock `fetch` to return `{ ok: false, status: 401 }`; assert `callGroq` throws with message containing "401"

**`src/__tests__/App.test.jsx`** — integration tests in the S2.2 describe block (mock `callGroq`):

6. **shows_loading_while_request_in_flight**: mock `callGroq` to return a never-resolving promise; assert `#send-btn` is disabled and `#response-area` shows "Loading…"
7. **displays_reply_on_success**: mock `callGroq` to resolve with "AI says hi"; click Send; assert `#response-area` shows "AI says hi"
8. **displays_error_on_failure**: mock `callGroq` to reject; click Send; assert `#response-area` text starts with "Error:"

### Mocking Strategy
- Mock global `fetch` with `vi.fn()` in `api.test.js` — never hit the live Groq API
- Mock the `callGroq` import in `App.test.jsx` using `vi.mock('../api')` so App tests are independent of the network
- Set `import.meta.env.VITE_GROQ_API_KEY` in tests using `vi.stubEnv` or by directly setting `import.meta.env` before each test

### Coverage Expectation
- All public exports of `api.js` have tests
- All three App states (loading, success, error) have at least one test each

---

## References
- roadmap.md Phase 2 row for S2.2
- Groq API docs: OpenAI-compatible endpoint, model `llama3-8b-8192`
- S1.2 spec — the handleSend + response area this spec extends
- S2.1 spec — the VITE_GROQ_API_KEY env var this spec consumes
