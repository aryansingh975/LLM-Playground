# Checklist — Spec S11.2: Architecture Diagram

## Phase 1: Setup & Dependencies
- [x] Verify S10.2 is `done`
- [x] Create `docs/` directory and `docs/architecture.md`
- [x] No new npm dependencies needed (plain Markdown/ASCII diagram, no image tooling)

## Phase 2: Tests First (TDD)
- [x] Write test file: `src/__tests__/architecture.test.js`
- [x] Write failing tests for each FR (doc exists, diagram present, no-backend note, route
  descriptions, README link)
- [x] Run tests — expect failures (Red)

## Phase 3: Implementation
- [x] Implement FR-1 — ASCII diagram: `User → Browser → Groq/Gemini/OpenRouter API → Response → UI`
- [x] Implement FR-2 — no-backend / client-side-keys callout
- [x] Implement FR-3 — one-sentence description per route (`/chat`, `/learn`, `/compare`,
  `/evaluate`)
- [x] Implement FR-4 — add "Architecture" section + link in `README.md`
- [x] Run tests — expect pass (Green)
- [x] Refactor if needed — N/A, doc was clean on first pass

## Phase 4: Integration
- [x] Confirm `docs/architecture.md` renders cleanly on GitHub (diagram readable in a fixed-width
  code block) — reviewed the fenced ASCII block manually, aligns in monospace
- [x] Run lint (`npm run lint` at repo root) — passes (1 pre-existing unrelated warning in
  `BenchmarkChart.jsx`)
- [x] Run full test suite (`npm run test`) — 242/242 passed across 29 files

## Phase 5: Verification
- [x] All tangible outcomes checked
- [x] No hardcoded secrets/tokens in the doc
- [x] Diagram matches `src/api.js`'s actual fetch calls (no invented backend hop)
- [x] Update roadmap.md status: spec-written → done (when ready)
