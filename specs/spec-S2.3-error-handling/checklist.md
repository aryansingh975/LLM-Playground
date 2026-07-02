# Checklist — Spec S2.3: Error Handling

## Phase 1: Setup & Dependencies
- [x] Verify S2.2 is `done` (callGroq exists in src/api.js; App.jsx has handleSend + #response-area)
- [x] Locate target files: `src/api.js` and `src/App.jsx`
- [x] No new npm packages needed — Vitest and @testing-library/react already installed

## Phase 2: Tests First (TDD)
- [x] Open `src/__tests__/api.test.js` — add an `S2.3` describe block
- [x] Write `callGroq_throws_no_api_key_message` (missing key → message includes "No API key")
- [x] Write `callGroq_throws_no_api_key_on_empty_string` (empty string key → same)
- [x] Write `callGroq_throws_rate_limit_message` (HTTP 429 → message includes "Rate limit")
- [x] Write `callGroq_throws_no_internet_message` (fetch throws TypeError → message includes "No internet")
- [x] Write `callGroq_throws_groq_error_on_other_status` (HTTP 500 → message includes "Groq error")
- [x] Open `src/__tests__/App.test.jsx` — add an `S2.3` describe block
- [x] Write `shows_rate_limit_error_in_error_area`
- [x] Write `shows_no_key_error_in_error_area`
- [x] Write `shows_no_internet_error_in_error_area`
- [x] Write `clears_error_on_next_success`
- [x] Run tests — expect failures (Red): 12 failures confirmed

## Phase 3: Implementation
- [x] **`src/api.js` FR-1** — wrap `fetch` call in try/catch; rethrow TypeError as "No internet" error
- [x] **`src/api.js` FR-1** — check `response.status === 429` before the generic non-ok branch; throw "Rate limit" error
- [x] **`src/api.js` FR-1** — refine the no-key error message to include "No API key"
- [x] **`src/api.js` FR-1** — refine the generic HTTP error message to include "Groq error"
- [x] **`src/App.jsx` FR-2** — add `const [error, setError] = useState('')`
- [x] **`src/App.jsx` FR-2** — in `handleSend`: clear `error` to `""` at the start; on catch: call `setError(err.message)` and restore previous response; on success: error auto-stays cleared
- [x] **`src/App.jsx` FR-3** — add `<div id="error-area" className="mt-2 text-red-600">{error}</div>` below the response area
- [x] Run tests — expect pass (Green): 30/30 passed

## Phase 4: Integration
- [x] Run lint: `npm run lint` (oxlint — clean)
- [x] Run full test suite: 30/30 passed

## Phase 5: Verification
- [x] All 9 tangible outcomes checked (via passing tests)
- [x] No hardcoded API key in `src/api.js` or `src/App.jsx`
- [x] `#error-area` is empty on first render (no false error shown)
- [x] `#error-area` clears when a subsequent send succeeds (clears_error_on_next_success test)
- [x] Update roadmap.md status: `spec-written` → `done`
