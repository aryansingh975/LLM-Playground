# Checklist — Spec S2.2: First API Call

## Phase 1: Setup & Dependencies
- [x] Confirm S2.1 is `done` (`.env.example` exists; `.env.local` has `VITE_GROQ_API_KEY` set)
- [x] Confirm S1.2 is `done` (`handleSend`, `#send-btn`, `#response-area` in App.jsx)
- [x] No new npm packages needed — uses native browser `fetch`

## Phase 2: Tests First (TDD)
- [x] Create `src/__tests__/api.test.js` — unit tests for `callGroq` with mocked `fetch`
- [x] Write `callGroq_posts_to_correct_url` — assert fetch called with Groq endpoint
- [x] Write `callGroq_sends_authorization_header` — assert Bearer token in headers
- [x] Write `callGroq_returns_reply_text` — assert resolved value equals `choices[0].message.content`
- [x] Write `callGroq_throws_on_missing_key` — assert throws when env var is absent
- [x] Write `callGroq_throws_on_non_ok_response` — assert throws with status 401 in message
- [x] Add `describe('S2.2')` block to `src/__tests__/App.test.jsx` with `vi.mock('../api')`
- [x] Write `shows_loading_while_request_in_flight` — never-resolving promise, assert disabled + "Loading…"
- [x] Write `displays_reply_on_success` — resolved mock, assert reply text in response area
- [x] Write `displays_error_on_failure` — rejected mock, assert "Error:" in response area
- [x] Run `npm run test` — expect all 8 new tests to fail (Red) ✗ (module missing = Red)

## Phase 3: Implementation
- [x] Create `src/api.js` — export `callGroq(prompt)` async function
  - [x] Guard: throw if `import.meta.env.VITE_GROQ_API_KEY` is falsy
  - [x] POST to Groq endpoint with correct headers + body (model: `llama3-8b-8192`)
  - [x] Throw on non-ok response
  - [x] Return `data.choices[0].message.content`
- [x] Update `src/App.jsx`
  - [x] Import `callGroq` from `./api`
  - [x] Add `loading` state: `const [loading, setLoading] = useState(false)`
  - [x] Update `handleSend`: set loading true → call `callGroq` → set response or error → set loading false
  - [x] Disable `#send-btn` when `loading` is true
  - [x] Show "Loading…" in `#response-area` while loading
- [x] Updated S1.2 tests to use `vi.mock` + `waitFor` (S1.2 echo behavior superseded by async API call)
- [x] Run `npm run test` — 35/35 pass (Green) ✓
- [x] Refactor if needed (no extra features)

## Phase 4: Integration
- [ ] **MANUAL** Run `npm run dev` — type a message, click Send, verify real AI reply appears (requires `.env.local` with key)
- [ ] **MANUAL** Verify button disables while loading and re-enables after
- [ ] **MANUAL** Verify error message appears if key is removed from `.env.local`
- [x] Run `npm run lint` — no warnings
- [x] Run full test suite: `npm run test` — 35/35 pass

## Phase 5: Verification
- [x] All 6 tangible outcomes verified by tests
- [x] `VITE_GROQ_API_KEY` read only from `import.meta.env` — no hardcoded keys in `api.js`
- [x] No unused imports
- [x] Update `roadmap.md` status: `spec-written` → `done`
