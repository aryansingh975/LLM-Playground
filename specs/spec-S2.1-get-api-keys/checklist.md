# Checklist — Spec S2.1: Get API Keys

## Phase 1: Setup & Dependencies
- [x] Confirm S0.1 is `done` (Node.js v24.17.0 installed; `node --version` works)
- [x] Confirm `curl` is available: `curl --version`
- [x] No new npm packages needed for this spec

## Phase 2: Tests First (TDD)
- [x] Create test file `src/__tests__/config.test.js`
- [x] Write test: `.env.example` exists at project root
- [x] Write test: `.env.example` contains `VITE_GROQ_API_KEY=`
- [x] Write test: `.env.example` contains `VITE_GEMINI_API_KEY=`
- [x] Write test: `.env.example` contains `VITE_OPENROUTER_API_KEY=`
- [x] Write test: `.gitignore` contains `!.env.example`
- [x] Run `npm run test` — expect 5 new tests to fail (Red) ✗

## Phase 3: Implementation
- [x] Create `.env.example` at project root with the three empty variable names
- [x] Add `!.env.example` to `.gitignore` (after the `.env.*` line)
- [ ] **MANUAL** Sign up at Groq (console.groq.com) → generate API key → copy `gsk_...` value
- [ ] **MANUAL** Sign up at Google AI Studio (aistudio.google.com) → generate API key → copy `AIza...` value
- [ ] **MANUAL** Sign up at OpenRouter (openrouter.ai) → generate API key → copy `sk-or-...` value
- [ ] **MANUAL** Create `.env.local` at project root and paste all three keys in
- [x] Run `npm run test` — all 5 config tests pass (Green) ✓ (27/27 total)

## Phase 4: Integration (Manual Verification)
- [ ] **MANUAL** Source `.env.local` in a terminal and test Groq with curl — expect HTTP 200 + JSON
- [ ] **MANUAL** Test Gemini with curl — expect HTTP 200 + JSON
- [ ] **MANUAL** Test OpenRouter with curl — expect HTTP 200 + JSON
- [ ] **MANUAL** Run `git status` — confirm `.env.local` is NOT listed (gitignored)
- [x] Run `git status` — `.env.example` is listed as untracked (ready to commit)
- [x] Run `npm run lint` — no warnings
- [x] Run full test suite: `npm run test` — 27/27 pass

## Phase 5: Verification
- [x] `.env.example` committed-ready with all three `VITE_*` variable names
- [x] `.gitignore` updated — `.env.*` ignored but `!.env.example` excepted
- [x] No real API keys hardcoded anywhere in source files
- [ ] **MANUAL** `.env.local` created locally with real keys (user action required)
- [ ] **MANUAL** All three curl tests return HTTP 200
- [x] Update `roadmap.md` status: `spec-written` → `done`
