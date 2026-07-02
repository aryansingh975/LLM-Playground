# Checklist — Spec S10.2: Vercel Deployment

## Phase 1: Setup & Dependencies
- [x] Verify S10.1 (production build) is `done`
- [ ] **MANUAL** Confirm a Vercel account can be created for free (GitHub sign-in, no credit card)
      — requires the user's own GitHub login; not something this environment can do
- [x] No new npm dependencies needed (`vercel.json` is plain static config)

## Phase 2: Tests First (TDD)
- [x] Write test file: `src/__tests__/vercelConfig.test.js`
  - [x] test_vercel_json_exists_and_is_valid_json
  - [x] test_vercel_json_has_spa_catchall_rewrite
- [x] Run tests — failed as expected (Red) — `vercel.json` didn't exist yet (`ENOENT`)

## Phase 3: Implementation
- [x] Implement FR-1 — created `vercel.json` with a catch-all rewrite to `/index.html`
- [x] Run tests — pass (Green) — 2/2 in `vercelConfig.test.js`
- [ ] **MANUAL** Implement FR-2 — sign in to vercel.com with GitHub, import this repo as a project
- [ ] **MANUAL** Implement FR-2 — decide: set real `VITE_*` keys in Vercel's Environment Variables,
      or deliberately leave them unset (understand either way that any key set there is inlined into
      the public bundle, per S10.1 FR-2)
- [ ] **MANUAL** Implement FR-3 — trigger first deployment, confirm green checkmark in Vercel
      dashboard

## Phase 4: Integration
- [ ] **MANUAL** Open the live URL directly (not via in-app navigation) at `/`, `/learn`,
      `/compare`, `/evaluate` — confirm all four load correctly (proves FR-1's rewrite works live)
- [ ] **MANUAL** Push a trivial commit to `main`, confirm Vercel dashboard shows a new auto-triggered
      deployment
- [x] Run lint: `npm run lint` — clean (only the pre-existing unrelated `BenchmarkChart.jsx` warning)
- [x] Run full test suite: `npm run test` — 231/231 passed (27 test files, up from 229/26 before
      this spec)

## Phase 5: Verification
- [x] Outcome 1 verified (`vercel.json` valid, has catch-all rewrite) — automated
- [ ] **MANUAL** Outcomes 2–5 unverified — require an actual Vercel account, dashboard access, and a
      live deployment, none of which this environment can perform (no browser, no Vercel
      credentials, no ability to sign up for external accounts on the user's behalf)
- [x] No hardcoded secrets/tokens committed to the repo (keys, if used, only ever go in Vercel's
      dashboard, never a tracked file)
- [ ] **MANUAL** Record the live URL in `README.md` — blocked on Outcome 3 (first deploy)
- [ ] Update `roadmap.md` status for S10.2: staying at `spec-written` — NOT moved to `done`, since
      FR-2/FR-3/FR-4 (account creation, dashboard config, live deploy, route checks, auto-redeploy)
      are unimplemented and unverifiable from here. Only FR-1 (this repo's `vercel.json`) is done.
