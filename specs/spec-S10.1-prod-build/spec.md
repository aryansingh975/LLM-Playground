# Spec S10.1 — Production Build

## Overview
The app has only ever been run via `npm run dev` (Vite's dev server — unminified, hot-reloading,
serving straight from `src/`). Before deploying to Vercel (S10.2), the project needs a verified
**production build**: `npm run build` (already wired to `vite build` in `package.json`) compiles
`src/` into a static, minified `dist/` folder that any static host can serve. This spec doesn't add
a new feature — it verifies the existing build pipeline actually produces a working, deployable
bundle, and documents one consequence of this project's "no server" architecture that matters for
deployment: `VITE_*` API keys are inlined as literal strings into the client bundle at build time,
not kept secret server-side.

## Dependencies
- S9.1 — Dark Mode (`done`)
- S9.2 — Mobile Layout (`done`)
- S9.3 — Empty + Error States (`done`)

All three are UI-polish specs; their purpose here is to have the app's final look-and-feel frozen
before validating what ships in the production bundle.

## Target Location
- `package.json` — `build` (`vite build`) and `preview` (`vite preview`) scripts (already present,
  unmodified)
- `vite.config.js` — build/plugin config the production build runs through (already present,
  unmodified)
- `src/__tests__/prodBuild.test.js` — new automated test file for this spec
- `.gitignore` — already excludes `dist` (verified, not modified)

---

## Functional Requirements

### FR-1: `npm run build` produces a valid production bundle
- **What**: Running `npm run build` (`vite build`) compiles `src/` + `index.html` into `dist/`,
  producing `dist/index.html` plus hashed JS/CSS bundles under `dist/assets/`, and exits with code 0.
- **Inputs**: existing `src/` tree, `vite.config.js`, `index.html`. No CLI arguments.
- **Outputs**: `dist/index.html` exists and references a hashed script in `dist/assets/`;
  `dist/assets/` contains at least one `.js` file and one `.css` file; process exit code `0`.
- **Edge cases**: build must succeed with no `.env` file present at all (env vars are optional at
  build time — same as dev, S2.3's "No API key found" error just surfaces at runtime instead);
  `vite build` empties `dist/` before writing, so a stale `dist/` from a prior build never leaves
  orphaned files behind.

### FR-2: `VITE_*` env vars are inlined into the built bundle, not kept secret
- **What**: Document and verify the existing behavior (unchanged from S2.1) that
  `import.meta.env.VITE_GROQ_API_KEY` / `VITE_GEMINI_API_KEY` / `VITE_OPENROUTER_API_KEY` — read in
  `src/api.js` — are statically substituted by Vite with literal string values from `.env` at build
  time. Because this project has no backend (per roadmap: "The whole thing runs in your browser. No
  server."), whatever key value is present at `npm run build` time ends up readable in the shipped
  JS bundle. No code in `src/api.js` changes — this FR is a verification + documentation step so the
  deploy step (S10.2) doesn't get run with a key nobody intended to expose publicly.
- **Inputs**: a placeholder value assigned to `VITE_GROQ_API_KEY` in the build's environment.
- **Outputs**: the built `dist/assets/*.js` bundle contains that literal placeholder string.
- **Edge cases**: no `.env` present at build time → build still succeeds; `import.meta.env.VITE_*`
  compiles to `undefined`, and `callGroq`/`callGemini`/`callOpenRouter` throw their existing "No API
  key found" error at runtime (S2.3 behavior, unchanged).

### FR-3: `npm run preview` serves the production build and the app still works
- **What**: `vite preview` serves the just-built `dist/` folder as static files over local HTTP,
  proving the minified/tree-shaken bundle isn't broken (a common failure mode: code that works
  unminified in dev but breaks after production optimizations).
- **Inputs**: a completed `dist/` build (FR-1 must run first).
- **Outputs**: the preview server's root URL returns HTML containing `<div id="root">`; manually
  confirmed in a browser that the chat flow, sliders, provider picker, tokeniser demo, and the
  `/learn`, `/compare`, `/evaluate` routes all still render and behave as they do under `npm run dev`.
- **Edge cases**: running `npm run preview` before ever running `npm run build` — `vite preview` errors
  because `dist/` doesn't exist; this is expected tool behavior, not a bug this spec needs to fix.

---

## Tangible Outcomes

- [ ] **Outcome 1**: `npm run build` exits `0` and produces `dist/index.html` plus at least one
  `.js` and one `.css` file under `dist/assets/`.
- [ ] **Outcome 2**: An automated test (`prodBuild.test.js`) runs the build and asserts that output
  structure — this is not just a manual, one-time check.
- [ ] **Outcome 3**: An automated test confirms a placeholder `VITE_GROQ_API_KEY` value set at build
  time appears as a literal string in the built JS bundle, proving (and documenting) that env vars
  are client-visible in this architecture.
- [ ] **Outcome 4**: `npm run preview` serves `dist/` and the root path's HTML contains `#root`;
  manually confirmed in a browser that every existing route/feature still works post-build.
- [ ] **Outcome 5**: `dist/` stays out of git — `.gitignore` already lists it; confirmed, not
  reintroduced.

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)
1. **test_build_produces_dist_index_and_hashed_assets** (`src/__tests__/prodBuild.test.js`): run
   `npm run build` via `child_process.execSync`; assert `dist/index.html` exists and
   `fs.readdirSync('dist/assets')` contains at least one file matching `/\.js$/` and one matching
   `/\.css$/`.
2. **test_build_inlines_vite_env_vars_into_bundle** (`src/__tests__/prodBuild.test.js`): run the
   build with `VITE_GROQ_API_KEY` set to a unique placeholder token in the child process's `env`;
   read every `dist/assets/*.js` file and assert the token string appears in at least one of them.
3. **test_gitignore_excludes_dist** (`src/__tests__/prodBuild.test.js`): read `.gitignore` and
   assert it contains a `dist` entry.
4. **Manual check (not a Vitest test)**: run `npm run build && npm run preview`, open the printed
   local URL in a browser, and click through chat / sliders / provider picker / tokeniser / learn /
   compare / evaluate — confirm no console errors and no visual regressions vs. `npm run dev`.
   Recorded as a Phase 4 checklist step, matching how S9.1 verified dark-mode toggling manually in
   the running app rather than via jsdom.

### Mocking Strategy
- No HTTP/API mocking needed — this spec doesn't call Groq/Gemini/OpenRouter.
- Tests 1–3 spawn a real `vite build` via Node's `child_process`/`fs` (a local build-tool
  invocation, not a network call) — give these tests a longer timeout (e.g. 60s) since they're
  slower than the rest of the suite.
- No DB or browser mocking involved.

### Coverage Expectation
- All three FRs have at least one automated test; FR-3's in-browser behavior is covered by the
  manual Phase 4 check since Vitest's `node` test environment doesn't spin up a real browser against
  a live preview server.

---

## References
- `roadmap.md` row S10.1 — "Run `npm run build`. Understand what a 'production build' is"; Phase 10
  goal — "a real public URL you can share"
- `specs/spec-S2.1-get-api-keys/spec.md` — established `.env` / `VITE_*` key convention this spec
  verifies the build-time handling of
- `specs/spec-S2.3-error-handling/spec.md` — the "No API key found" runtime error this spec confirms
  still fires correctly when a production build ships without a key
- `package.json` — existing `build` / `preview` scripts (`vite build` / `vite preview`), unmodified
- `vite.config.js` — build/plugin pipeline this spec's build runs through, unmodified
