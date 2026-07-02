# Checklist — Spec S11.1: README

## Phase 1: Setup & Dependencies
- [x] Verify S10.2 (Vercel deployment) is `done`
- [x] Locate target file: `README.md` (was default Vite template + S10.2's ad hoc live-URL note)
- [x] No new npm dependencies needed

## Phase 2: Tests First (TDD)
- [x] Write test file: `src/__tests__/readme.test.js`
  - [x] test_readme_exists
  - [x] test_readme_no_longer_has_vite_boilerplate
  - [x] test_readme_has_project_description
  - [x] test_readme_has_run_commands
  - [x] test_readme_has_api_key_section
  - [x] test_readme_has_live_url
- [x] Run tests — failed as expected (Red) — 4/6 failed against the old template README (boilerplate
      still present, no description/run-commands/API-key sections); the exists and live-URL checks
      passed already thanks to S10.2's earlier edit

## Phase 3: Implementation
- [x] Implement FR-1 — project description section (chat, sliders, tokeniser, learn cards, compare,
      evaluate — pulled from roadmap.md's "What Are We Building?")
- [x] Implement FR-2 — "How to run locally" section with `git clone` / `npm install` / `npm run dev`,
      matching `package.json`'s actual script names exactly
- [x] Implement FR-3 — "How to get free API keys" table (Groq/Gemini/OpenRouter sign-up links +
      `VITE_*` variable names from `.env.example`) with a `.env.local` copy step and a link to
      S2.3's error-handling behavior
- [x] Implement FR-4 — carried forward the live Vercel URL from S10.2 into a "Live demo" section
- [x] Run tests — pass (Green) — 6/6 in `readme.test.js`
- [x] Refactor if needed — added a short "Tech stack" section linking to `roadmap.md`/`specs/` for
      extra portfolio context (not spec-required, low-risk addition, doesn't affect any test)

## Phase 4: Integration
- [x] Manual read-through: description, run commands, API key table, and live URL are all present,
      accurate, and match `package.json` / `.env.example` exactly — a stranger could follow this
      README alone to get the app running with their own keys
- [x] N/A — GitHub rendering check requires a push; markdown syntax used (headers, tables, fenced
      code blocks, links) is standard GitHub-flavored markdown, consistent with the rest of this
      repo's docs (roadmap.md, specs/*.md)
- [x] Run lint: `npm run lint` — clean (only the pre-existing unrelated `BenchmarkChart.jsx` warning)
- [x] Run full test suite: `npm run test` — 237/237 passed (28 test files, up from 231/27 before this
      spec)

## Phase 5: Verification
- [x] All 6 tangible outcomes verified
- [x] No hardcoded secrets/tokens — only variable *names* appear in the README, never real key values
- [x] Update `roadmap.md` status for S11.1: `pending` → `spec-written` (done in create-spec step) →
      `done` (this step)
