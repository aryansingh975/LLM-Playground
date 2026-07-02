# Checklist — Spec S10.2: Vercel Deployment

## Phase 1: Setup & Dependencies
- [x] Verify S10.1 (production build) is `done`
- [x] Confirm a Vercel account can be created for free (GitHub sign-in, no credit card) — done by
      user, team `aryan-singh976` created on the Hobby (free) plan
- [x] No new npm dependencies needed (`vercel.json` is plain static config)

## Phase 2: Tests First (TDD)
- [x] Write test file: `src/__tests__/vercelConfig.test.js`
  - [x] test_vercel_json_exists_and_is_valid_json
  - [x] test_vercel_json_has_spa_catchall_rewrite
- [x] Run tests — failed as expected (Red) — `vercel.json` didn't exist yet (`ENOENT`)

## Phase 3: Implementation
- [x] Implement FR-1 — created `vercel.json` with a catch-all rewrite to `/index.html`
- [x] Run tests — pass (Green) — 2/2 in `vercelConfig.test.js`
- [x] Implement FR-2 — deliberately left `VITE_*` env vars unset on the Vercel project (documented
      choice: this is a public, shareable portfolio URL — keeping keys off it avoids exposing a
      personal free-tier key, at the cost of the live demo not returning real AI replies; S2.3's "No
      API key found" error surfaces instead, same as running locally without `.env.local`)
- [x] Implement FR-3 — repo imported (`aryansingh975/LLM-Playground`, `main`), first deployment
      succeeded (commit `66bc595`, green/Ready in the Vercel dashboard)

## Phase 4: Integration
- [x] Opened the live URL directly (not via in-app navigation) at `/`, `/learn`, `/compare`,
      `/evaluate` — all four loaded correctly (confirmed via screenshots: Chat, Learn panels,
      Compare two-column layout, Evaluate ratings + benchmark chart) — proves FR-1's rewrite works
      live, not just locally
- [x] Pushed a follow-up commit (`7fd9adb` — README live-URL update) to `main`; Vercel dashboard
      showed a new auto-triggered deployment (Ready/Production, 48s after push) — confirms FR-4's
      auto-redeploy behavior
- [x] Run lint: `npm run lint` — clean (only the pre-existing unrelated `BenchmarkChart.jsx` warning)
- [x] Run full test suite: `npm run test` — all passing, no regressions from `vercel.json` or the
      README change

## Phase 5: Verification
- [x] All 6 tangible outcomes verified:
  1. `vercel.json` valid + catch-all rewrite — automated test
  2. Environment Variables page — deliberately left unset (valid documented choice, FR-2)
  3. Vercel dashboard shows successful deployment — confirmed (commit `66bc595`, Ready)
  4. Live URL's 4 routes work directly — confirmed via screenshots
  5. Push to `main` triggers auto-redeploy — confirmed (commit `7fd9adb`, new deployment 48s later)
  6. Live URL recorded in `README.md` — done (`https://llm-playground-two.vercel.app`)
- [x] No hardcoded secrets/tokens committed to the repo — no keys were ever set on the Vercel
      project, so nothing to leak
- [x] Live URL recorded in `README.md`: https://llm-playground-two.vercel.app
- [x] Update `roadmap.md` status for S10.2: `spec-written` → `done`
