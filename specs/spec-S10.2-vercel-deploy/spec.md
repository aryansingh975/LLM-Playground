# Spec S10.2 — Vercel Deployment

## Overview
Deploy the app to Vercel's free tier so it has a real public URL anyone can open — the final step
before the project is share-ready. Two things need to be right for this to actually work end-to-end:
(1) client-side routing (`/`, `/learn`, `/compare`, `/evaluate` via `react-router-dom`, S6.1) needs a
`vercel.json` rewrite so a direct visit or refresh on e.g. `/learn` doesn't 404 — Vercel otherwise
looks for a literal `learn` file and finds nothing, since the whole app is one `index.html` shell
with client-side routes; (2) the `.env.local` `VITE_*` keys (S2.1) that exist only on the local
machine need to be re-entered in Vercel's Environment Variables UI, and — per S10.1's FR-2 finding —
whatever key is configured there becomes readable in the live bundle, so this spec makes that
decision explicit rather than silently shipping a real key.

## Dependencies
- S10.1 — Production Build (`done`). Confirmed `npm run build` produces a working `dist/`, and
  documented that `VITE_*` env vars are inlined into the client bundle at build time — the fact this
  spec's FR-2 builds on directly.

## Target Location
- `vercel.json` — new file at project root (Vercel SPA rewrite config)
- `src/__tests__/vercelConfig.test.js` — new test file for this spec
- `README.md` — updated with the live URL once deployed (tracked here; full README authoring is
  S11.1's job)
- Vercel dashboard (external, not a repo file) — project import + Environment Variables

---

## Functional Requirements

### FR-1: `vercel.json` rewrites all paths to `index.html` for client-side routing
- **What**: A `vercel.json` at the project root with a catch-all rewrite so every path Vercel
  receives is served `index.html`, letting `react-router-dom` (S6.1) take over client-side routing
  in the browser instead of Vercel 404ing on paths that don't correspond to a real file in `dist/`.
- **Inputs**: none — static config, no build-time variables.
- **Outputs**: `vercel.json` parses as valid JSON and contains a `rewrites` array with a
  `{"source": "/(.*)", "destination": "/index.html"}` entry (or equivalent catch-all).
- **Edge cases**: without this file, a fresh browser tab opened directly at
  `https://<app>.vercel.app/learn` (not navigated to via an in-app link) 404s, because Vercel's
  static file server has no literal `learn` file to serve — this FR exists specifically to prevent
  that regression once live.

### FR-2: `VITE_*` env vars configured in Vercel, with the exposure tradeoff made explicit
- **What**: The three keys from local `.env.local` (S2.1: `VITE_GROQ_API_KEY`,
  `VITE_GEMINI_API_KEY`, `VITE_OPENROUTER_API_KEY`) are added under Vercel's Project Settings →
  Environment Variables so the production build has something to inline (S10.1 FR-2 behavior,
  unchanged — this spec doesn't add server-side key handling, because there is no server, per the
  roadmap's "no server" architecture). Before entering a real key: understand that it becomes
  readable in the deployed bundle by anyone who opens DevTools — same finding S10.1 verified
  locally, now shipped publicly.
- **Inputs**: real key values, entered manually in the Vercel dashboard UI (never committed).
- **Outputs**: Vercel's Environment Variables page lists all three `VITE_*` names; the next
  deployment's build log shows a successful `vite build`.
- **Edge cases**: leaving a key unset is valid — the deployed app still builds and loads (S10.1
  FR-1), that provider's calls just show the existing "No API key found" error (S2.3) instead of a
  reply; a deployer who doesn't want to expose a personal key publicly can ship the demo shell
  without setting any of the three.

### FR-3: First deployment succeeds and the live app is reachable
- **What**: Vercel account created (free, GitHub sign-in), this repo imported as a project, and the
  first deployment completes with a green checkmark in the Vercel dashboard.
- **Inputs**: this GitHub repo, connected via Vercel's GitHub integration.
- **Outputs**: a public `https://<project>.vercel.app` URL that returns the same app shell verified
  locally in S10.1 (root `<div id="root">`, hashed asset references).
- **Edge cases**: a failed build in Vercel's log almost certainly means something works locally but
  not in Vercel's clean-checkout environment (e.g. a file only present locally, or an env var
  referenced in code but never set) — cross-check against the exact `npm run build` command verified
  in S10.1.

### FR-4: All four client-side routes work on the live URL, and pushes auto-redeploy
- **What**: `/`, `/learn`, `/compare`, `/evaluate` all load correctly when visited directly on the
  live URL (proving FR-1's rewrite works in production, not just in theory), and pushing a new
  commit to `main` triggers Vercel to automatically rebuild and redeploy without manual intervention
  (Vercel's default GitHub integration behavior).
- **Inputs**: the live URL; a trivial follow-up commit pushed to `main`.
- **Outputs**: all four routes return 200 with the expected page content; the Vercel dashboard shows
  a new deployment triggered by the push, and the live URL reflects the change once it completes.
- **Edge cases**: none beyond FR-1/FR-3 — this FR is the end-to-end proof that both already hold in
  the live environment, not just locally.

---

## Tangible Outcomes

- [ ] **Outcome 1**: `vercel.json` exists, is valid JSON, and contains a catch-all rewrite to
  `/index.html`.
- [ ] **Outcome 2**: Vercel project's Environment Variables page has all three `VITE_*` names
  configured (with real keys, or deliberately left unset — either is a valid, documented choice).
- [ ] **Outcome 3**: The Vercel dashboard shows a successful (green) deployment for this repo.
- [ ] **Outcome 4**: Visiting the live URL's `/`, `/learn`, `/compare`, and `/evaluate` paths
  directly (not just via in-app navigation) all return the app, not a 404.
- [ ] **Outcome 5**: Pushing a commit to `main` triggers a new Vercel deployment automatically.
- [ ] **Outcome 6**: The live URL is recorded (e.g. in `README.md`) so S11.1 can reference it.

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)
1. **test_vercel_json_exists_and_is_valid_json** (`src/__tests__/vercelConfig.test.js`): read
   `vercel.json` from the project root, assert it exists and `JSON.parse` succeeds.
2. **test_vercel_json_has_spa_catchall_rewrite** (`src/__tests__/vercelConfig.test.js`): assert the
   parsed config's `rewrites` array contains an entry whose `destination` is `/index.html` and whose
   `source` matches any path (e.g. `/(.*)`).
3. **Manual (cannot be automated — external service, no API access from this environment)**:
   - Vercel account created, repo imported, first deploy green in the dashboard (FR-3)
   - `VITE_*` env vars configured in the Vercel dashboard, or deliberately left unset (FR-2)
   - Live URL's four routes checked directly in a browser (FR-4)
   - A follow-up push confirmed to trigger auto-redeploy (FR-4)

### Mocking Strategy
- No HTTP mocking needed for the two automated tests — they only read/parse a local JSON file.
- No way to mock Vercel's own build/deploy pipeline from this repo; those steps stay manual, same
  precedent as S2.1's provider-account setup (curl checks marked **MANUAL** in that spec's
  checklist).

### Coverage Expectation
- FR-1 fully covered by the two automated tests.
- FR-2/FR-3/FR-4 are manual by nature (external account, external dashboard, live network) —
  documented as explicit **MANUAL** checklist items rather than skipped silently.

---

## References
- `roadmap.md` row S10.2 — "Deploy to Vercel (free). Get a public URL. Share it"; Phase 10 goal —
  "a real public URL you can share"
- `checklist.md` (repo root, legacy combined checklist) — S10.2 section's original 5-test list,
  reused here as the FR-3/FR-4 manual checks
- `specs/spec-S10.1-prod-build/spec.md` — FR-1 (build output this deploys) and FR-2 (the env-var
  inlining behavior FR-2 here builds directly on)
- `specs/spec-S2.1-get-api-keys/spec.md` and its checklist — precedent for marking
  account-creation/external-service steps as **MANUAL** rather than automated
- `specs/spec-S6.1-routing/spec.md` — the `react-router-dom` client-side routes this spec's
  `vercel.json` rewrite exists to support
