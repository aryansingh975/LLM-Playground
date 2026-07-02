# Checklist — Spec S10.1: Production Build

## Phase 1: Setup & Dependencies
- [x] Verify S9.1, S9.2, S9.3 (polish specs) are `done`
- [x] Confirm `package.json` already has `build` (`vite build`) and `preview` (`vite preview`)
      scripts — no changes needed
- [x] No new npm dependencies needed (`vite`, `node:fs`, `node:child_process` already available)

## Phase 2: Tests First (TDD)
- [x] Write test file: `src/__tests__/prodBuild.test.js`
  - [x] test_build_produces_dist_index_and_hashed_assets
  - [x] test_build_inlines_vite_env_vars_into_bundle
  - [x] test_gitignore_excludes_dist
- [x] N/A — no Red phase: this is a verification spec (no `src` behavior changes to make),
      `npm run build` was already correctly wired since S0.2, so all 3 new tests passed green on
      first run — confirming the existing build pipeline, not fixing it

## Phase 3: Implementation
- [x] N/A — FR-1: `npm run build` already runs cleanly end-to-end; no code changes required
- [x] N/A — FR-2: placeholder `VITE_GROQ_API_KEY` already ends up inlined in `dist/assets/*.js`
      (verified by test), confirming Vite's existing static env substitution — no code changes
- [x] FR-3: ran `npm run build && npx vite preview --port 4321`; `curl` against the preview root
      returned HTTP 200 with `<div id="root">` and correct hashed asset references
- [x] Run tests — pass (Green) — 3/3 in `prodBuild.test.js`
- [x] Refactor if needed — none needed

## Phase 4: Integration
- [x] Ran `npm run build && npm run preview` equivalent (`vite preview --port 4321`); verified via
      HTTP that the served root HTML matches the built `dist/index.html` (hashed `<script>`/`<link>`
      tags, `#root` present) — no console access from this environment, so full interactive
      click-through (chat/sliders/routes) wasn't done in an actual browser; the HTTP-level check
      confirms the bundle isn't broken by minification, which was FR-3's core concern
- [x] Run lint: `npm run lint` — clean (only the pre-existing unrelated `BenchmarkChart.jsx` warning
      also seen in S9.1)
- [x] Run full test suite: `npm run test` — 229/229 passed (26 test files, up from 226/25 before
      this spec)

## Phase 5: Verification
- [x] All 5 tangible outcomes verified
- [x] No hardcoded secrets/tokens (placeholder key used in tests only, never a real key)
- [x] Confirm `dist/` is not committed — `git status` shows no `dist/` entries (already gitignored)
- [x] Update `roadmap.md` status for S10.1: `pending` → `spec-written` (done in create-spec step) →
      `done` (this step)
