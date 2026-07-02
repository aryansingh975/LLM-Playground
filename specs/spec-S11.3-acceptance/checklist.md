# Checklist — Spec S11.3: Final Acceptance Checklist

## Phase 1: Setup & Dependencies
- [x] Verify S11.1 is `done`
- [x] Create `docs/screenshots/` directory
- [x] No new npm dependencies needed (plain file checks + Markdown, no screenshot-automation tooling)

## Phase 2: Tests First (TDD)
- [x] Write test file: `src/__tests__/acceptance.test.js`
- [x] Write failing tests: all-specs-done audit, screenshots exist, README embeds screenshots
- [x] Run tests — expect failures (Red) — 2/3 failed as expected (screenshots + README embed); the
  all-specs-done test already passed since it correctly excludes S11.3's own row

## Phase 3: Implementation
- [x] Implement FR-1 check — parse `roadmap.md` Master Spec Index, assert all rows `done` except
  S11.3
- [x] Implement FR-5 — capture 4 screenshots (`/chat`, `/learn`, `/compare`, `/evaluate`) via a
  local `npm run dev` + Playwright CLI (`npx playwright screenshot`), saved to `docs/screenshots/`,
  embedded in `README.md`
- [x] Perform FR-2 — timed the live URL (`https://llm-playground-two.vercel.app/chat`) via
  Playwright's `networkidle` wait: 4387ms, under the 5s threshold
- [x] Perform FR-3 — scripted a real browser session against the live URL: typed a message, clicked
  Send, confirmed the "No API key found" message appears (deployed instance has no keys configured,
  per README) with no crash-like text
- [x] Perform FR-4 — scripted a real browser session on the live `/learn` route: typed text into the
  tokeniser input, captured all network requests fired during typing — zero, confirming offline
  operation; screenshot shows the colored token chips rendering correctly
- [x] Run tests — expect pass (Green) — 3/3 passed
- [x] Refactor if needed — N/A

## Phase 4: Integration
- [x] Confirm screenshots render on the GitHub repo page (Markdown image syntax renders correctly) —
  two 2-column tables, relative paths verified against actual `docs/screenshots/*.png` files
- [x] Run lint (`npm run lint`) — clean (1 pre-existing unrelated warning in `BenchmarkChart.jsx`)
- [x] Run full test suite (`npm run test`) — 245/245 passed across 30 files

## Phase 5: Verification
- [x] All tangible outcomes checked
- [x] No hardcoded secrets/tokens
- [x] Confirm every other spec in roadmap.md Master Spec Index is `done` (the actual completion gate)
- [x] Update roadmap.md status: spec-written → done (S11.3's own row, last of all)
