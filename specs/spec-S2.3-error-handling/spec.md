# Spec S2.3 — Error Handling

## Overview
The current `callGroq` implementation throws raw technical errors (`"Groq API error: 429"`, `"VITE_GROQ_API_KEY is not set"`), and `App.jsx` displays them as plain strings. This spec replaces those with three classified, human-friendly error paths — missing API key, rate limit (HTTP 429), and no internet (network failure) — and renders them with distinct red styling in the UI so users know what went wrong and what to do next.

## Dependencies
- S2.2 — `callGroq(prompt)` in `src/api.js` and `handleSend` / `#response-area` in `src/App.jsx` both exist and work

## Target Location
- `src/api.js` — refine error classification and messages in `callGroq`
- `src/App.jsx` — add separate `error` state; render friendly error in a styled `#error-area`

---

## Functional Requirements

### FR-1: Classified error messages in `callGroq` (`src/api.js`)
- **What**: `callGroq` must throw `Error` objects with user-readable messages for each of the three failure scenarios below. The existing "unexpected response format" path is unchanged.
- **Inputs**: The prompt string and the result of `fetch` (or the exception thrown by `fetch`)
- **Outputs**: One of four distinct thrown errors (see cases)

| Scenario | Detection | `err.message` must include |
|----------|-----------|---------------------------|
| No API key | `VITE_GROQ_API_KEY` is falsy before the fetch | `"No API key"` |
| Rate limit | `response.ok === false && response.status === 429` | `"Rate limit"` |
| No internet | `fetch` itself throws (network failure, i.e. `TypeError`) | `"No internet"` |
| Other HTTP error | `response.ok === false && status !== 429` | `"Groq error"` |

- **Edge cases**:
  - `fetch` can throw a `TypeError` (e.g. `"Failed to fetch"`) when there is no network — catch this before propagating
  - `response.status === 429` must be checked *before* the generic non-ok branch
  - An empty string `""` for the key counts as missing (same as `undefined`)

### FR-2: Separate `error` state and `#error-area` in `App.jsx`
- **What**: Replace the single `response`-based error display with a dedicated `error` state. On success, `error` is cleared; on failure, `response` is not modified and `error` holds the user-readable message.
- **Inputs**: The error thrown by `callGroq` in the `catch` block
- **Outputs**:
  - `#error-area` — visible (non-empty text) when `error` is set; styled in red (`text-red-600`)
  - `#response-area` — unchanged from last successful reply while `error` is set; cleared to `""` on the next successful call
  - `error` state cleared to `""` at the start of each new send (before the API call)
- **Edge cases**:
  - If the user sends again after an error, the previous error message disappears immediately (set to `""` in `handleSend` before the call)
  - The button remains disabled (`loading === true`) during the call even when an error eventually occurs

### FR-3: User-readable message content
- **What**: The strings shown to users must be understandable without technical knowledge.
- **Examples** (exact wording is flexible, but must include the keyword in the detection column):

| Error | Message shown in `#error-area` |
|-------|-------------------------------|
| No API key | "No API key found. Add VITE_GROQ_API_KEY to .env.local and restart the dev server." |
| Rate limit | "Rate limit reached. Wait a few seconds and try again." |
| No internet | "No internet connection. Check your network and try again." |
| Other HTTP | "Groq returned an error. Check your API key and try again." |

---

## Tangible Outcomes

- [ ] **Outcome 1**: `callGroq(prompt)` with no env key set throws an error whose `.message` contains `"No API key"`
- [ ] **Outcome 2**: `callGroq(prompt)` with `fetch` returning `{ ok: false, status: 429 }` throws an error whose `.message` contains `"Rate limit"`
- [ ] **Outcome 3**: `callGroq(prompt)` when `fetch` itself throws a `TypeError` re-throws an error whose `.message` contains `"No internet"`
- [ ] **Outcome 4**: `callGroq(prompt)` with `fetch` returning `{ ok: false, status: 500 }` throws an error whose `.message` contains `"Groq error"`
- [ ] **Outcome 5**: After a rate-limit failure, `#error-area` is non-empty and contains "Rate limit"; `#response-area` is unchanged
- [ ] **Outcome 6**: After a missing-key failure, `#error-area` is non-empty; it contains "No API key" guidance
- [ ] **Outcome 7**: After a network failure, `#error-area` is non-empty and contains "No internet"
- [ ] **Outcome 8**: When a subsequent send succeeds, `#error-area` is empty again
- [ ] **Outcome 9**: No hardcoded API key anywhere in `src/`

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)

**`src/__tests__/api.test.js`** — extend the existing describe block with an S2.3 section:

1. **callGroq_throws_no_api_key_message**: stub `VITE_GROQ_API_KEY` as `undefined`; assert the thrown error message includes `"No API key"`
2. **callGroq_throws_no_api_key_on_empty_string**: stub key as `""`; same assertion
3. **callGroq_throws_rate_limit_message**: mock `fetch` → `{ ok: false, status: 429 }`; assert message includes `"Rate limit"`
4. **callGroq_throws_no_internet_message**: mock `fetch` to throw `new TypeError("Failed to fetch")`; assert message includes `"No internet"`
5. **callGroq_throws_groq_error_on_other_status**: mock `fetch` → `{ ok: false, status: 500 }`; assert message includes `"Groq error"`

**`src/__tests__/App.test.jsx`** — add an S2.3 describe block (mock `callGroq` from `'../api'`):

6. **shows_rate_limit_error_in_error_area**: mock `callGroq` to reject with `Error("Rate limit reached...")`; click Send; assert `#error-area` is non-empty and `#response-area` is unchanged
7. **shows_no_key_error_in_error_area**: mock `callGroq` to reject with `Error("No API key found...")`; click Send; assert `#error-area` contains "No API key"
8. **shows_no_internet_error_in_error_area**: mock `callGroq` to reject with `Error("No internet connection...")`; click Send; assert `#error-area` contains "No internet"
9. **clears_error_on_next_success**: mock `callGroq` to reject then resolve; send twice; assert `#error-area` is empty after the second send

### Mocking Strategy
- Mock global `fetch` with `vi.fn()` in `api.test.js` — never hit the live Groq API
- Mock `callGroq` import in `App.test.jsx` using `vi.mock('../api')`; use `vi.mocked(callGroq).mockRejectedValueOnce(...)` per test
- Stub `import.meta.env.VITE_GROQ_API_KEY` using `vi.stubEnv('VITE_GROQ_API_KEY', value)` (restore in `afterEach`)

### Coverage Expectation
- All four error branches in `callGroq` have at least one test
- All three UI error scenarios (rate limit, no key, no internet) have at least one App test
- The "error clears on success" path has a test

---

## References
- roadmap.md Phase 2 row for S2.3
- S2.2 spec — the `callGroq` function and `App.jsx` error display this spec extends
- Vitest docs: `vi.stubEnv`, `vi.mock`, `vi.mocked`
