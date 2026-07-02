# Spec S11.2 — Architecture Diagram

## Overview
Document how data actually flows through the app: the user types in the browser, the browser calls
an AI provider's API directly (Groq, Gemini, or OpenRouter — whichever is selected), and the reply
comes straight back to the UI. There is no backend server in this project — `src/api.js` calls
`fetch()` straight from the browser to each provider's public REST endpoint, and API keys live only
in the browser (`.env.local` at build time, or entered by the user at runtime). This spec produces a
standalone doc, `docs/architecture.md`, that makes that shape obvious to a reader who has never seen
the code, and is linked from the README.

## Dependencies
- S10.2 — Vercel Deployment (`done`). The deployed app is the concrete thing this doc describes.

## Target Location
- `docs/architecture.md` — new file, the diagram + data-flow doc.
- `README.md` — add an "Architecture" heading that links to `docs/architecture.md` (README itself
  already exists per S11.1; this spec only adds the link, not a rewrite).

---

## Functional Requirements

### FR-1: Data-flow diagram
- **What**: An ASCII-art (or embedded-image) diagram in `docs/architecture.md` showing the request
  path: `User → Browser → Groq/Gemini/OpenRouter API → Response → UI`. Matches `src/api.js`'s three
  `callGroq` / `callGemini` / `callOpenRouter` functions — no server hop in between.
- **Inputs**: none (static doc; source of truth is `src/api.js`'s `fetch()` calls, which hit each
  provider's public URL directly from the browser).
- **Outputs**: `docs/architecture.md` contains a diagram block naming "User", "Browser", and at least
  one of "Groq", "Gemini", "OpenRouter".
- **Edge cases**: none — this is a static document, not executable logic.

### FR-2: No-backend / key-storage note
- **What**: A short paragraph or callout stating explicitly that there is no backend server for this
  app, and that API keys stay client-side (`.env.local` at build time via Vite's `VITE_*` prefix, or
  typed into the browser by the user) — never sent to or stored on any server this project controls.
- **Inputs**: `.env.example` / S2.1's `VITE_*` key convention (already documented in README via
  S11.1).
- **Outputs**: `docs/architecture.md` contains language stating no backend server exists and that
  keys remain in the browser.
- **Edge cases**: none — prose, not logic.

### FR-3: Route-by-route description
- **What**: A one-sentence description of each of the 4 routes so a new reader understands what each
  page does: `/chat` (send a message, get a reply from the selected provider), `/learn` (static
  explainer cards on LLM training/eval), `/compare` (same prompt sent to two providers in parallel via
  `Promise.all`), `/evaluate` (star-rate responses and view benchmark charts).
- **Inputs**: `src/` routing (S6.1) and each route's spec (S7.1 compare, S8.1 evaluate) as source of
  truth for what each route actually does — not invented behavior.
- **Outputs**: `docs/architecture.md` mentions all 4 route paths (`/chat`, `/learn`, `/compare`,
  `/evaluate`), each with a one-sentence description.
- **Edge cases**: none — prose describing existing, already-implemented routes.

### FR-4: README links to the architecture doc
- **What**: `README.md` gets an "Architecture" heading/section that links to `docs/architecture.md`,
  so a visitor reading the README can find the deeper data-flow doc.
- **Inputs**: `README.md` (from S11.1, already `done`).
- **Outputs**: `README.md` contains a heading (e.g. `## Architecture`) and a relative link to
  `docs/architecture.md`.
- **Edge cases**: don't remove or rewrite existing README content from S11.1 — this is an additive
  link only.

---

## Tangible Outcomes

- [ ] **Outcome 1**: `docs/architecture.md` exists.
- [ ] **Outcome 2**: The doc contains a diagram naming User, Browser, and at least one AI provider,
  showing the request/response path with no backend hop.
- [ ] **Outcome 3**: The doc explicitly states there is no backend server and that API keys stay in
  the browser.
- [ ] **Outcome 4**: The doc describes all 4 routes (`/chat`, `/learn`, `/compare`, `/evaluate`), one
  sentence each.
- [ ] **Outcome 5**: `README.md` has an "Architecture" section linking to `docs/architecture.md`.
- [ ] **Outcome 6**: Someone new to the project can read `docs/architecture.md` alone and understand
  the data flow (manual read-through check — same precedent as S11.1 Outcome 6).

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)
1. **test_architecture_doc_exists**: assert `docs/architecture.md` exists.
2. **test_architecture_doc_has_diagram**: assert the doc contains `"User"`, `"Browser"`, and at least
   one of `"Groq"`, `"Gemini"`, `"OpenRouter"` (case-insensitive).
3. **test_architecture_doc_notes_no_backend**: assert the doc contains language indicating no backend
   server (e.g. matches `/no backend/i` or `/no server/i`) and mentions keys staying in the browser
   (e.g. `/browser/i` near `/key/i`).
4. **test_architecture_doc_describes_routes**: assert the doc mentions all of `/chat`, `/learn`,
   `/compare`, `/evaluate`.
5. **test_readme_links_architecture**: assert `README.md` contains `docs/architecture.md`.

### Mocking Strategy
- No external dependencies — these tests only read `docs/architecture.md` and `README.md` as local
  files, same pattern as S11.1's `src/__tests__/readme.test.js`.
- Test file: `src/__tests__/architecture.test.js`, `environment: 'node'`.

### Coverage Expectation
- All 4 FRs covered by the 5 tests above; Outcome 6 (a stranger can actually follow the diagram) is a
  manual read-through, same precedent as S11.1's Outcome 6 and S9.1's in-browser dark-mode check.

---

## References
- `roadmap.md` row S11.2 — "Draw a simple diagram of how data flows: user → browser → AI API → back";
  Phase 11 goal — "a proper README, architecture diagram, and screenshots"
- `checklist.md` (repo root, legacy combined checklist, lines ~1345-1377) — S11.2 section's original
  4-test list, reused here as this spec's FRs/tests
- `src/api.js` — the actual `fetch()` calls to Groq/Gemini/OpenRouter that this doc's diagram must
  match (no backend hop)
- `specs/spec-S11.1-readme/spec.md` — the README this spec links from, not rewrites
- `specs/spec-S6.1-routing/`, `specs/spec-S7.1-compare-route/`, `specs/spec-S8.1-eval-route/` —
  source of truth for each route's one-sentence description
