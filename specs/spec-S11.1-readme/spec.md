# Spec S11.1 — README

## Overview
Replace the default Vite/React template `README.md` (currently just boilerplate about
`@vitejs/plugin-react` and Oxlint) with a real project README: what the app does, how to run it
locally, how to get the three free API keys it needs, and the live Vercel URL. This is the first
thing a recruiter, visitor, or future-you opens on the GitHub repo page — it needs to work
standalone, without any other context from this conversation or the `specs/` folder.

## Dependencies
- S10.2 — Vercel Deployment (`done`). Provides the live URL
  (`https://llm-playground-two.vercel.app`) this spec's README links to.

## Target Location
- `README.md` — project root (currently the unmodified Vite template, plus a 4-line "Live demo"
  note prepended during S10.2 — this spec replaces the whole file)

---

## Functional Requirements

### FR-1: Project description
- **What**: A "What is this?" section near the top explaining the app is a free, browser-only LLM
  playground — chat with Groq/Gemini/OpenRouter, tune generation sliders, see the tokeniser split
  text into chips, compare two models side by side, rate responses, and read plain-English cards on
  how LLMs are trained/evaluated. Pulled from roadmap.md's "What Are We Building?" section, not
  invented.
- **Inputs**: none (static content).
- **Outputs**: `README.md` contains a description section of at least a few sentences, naming the
  project's core features (chat, sliders, tokeniser, learn panels, compare, evaluate).
- **Edge cases**: none — this is prose, not logic.

### FR-2: "How to run locally" section with exact commands
- **What**: A section giving the exact sequence a stranger needs to clone and run the app:
  `git clone`, `npm install`, `npm run dev` — matching this repo's actual `package.json` scripts
  (`dev`, `build`, `test`, `lint`), not invented commands.
- **Inputs**: `package.json`'s `scripts` block (source of truth for command names).
- **Outputs**: `README.md` contains a fenced code block with `git clone`, `npm install`, and
  `npm run dev` (in that order, or clearly sequenced).
- **Edge cases**: keep commands consistent with `package.json` — if a script name in the README
  doesn't match `package.json`, the README is wrong, not the package.json.

### FR-3: "How to get free API keys" section
- **What**: A section listing all three providers this app supports (Groq, Gemini via Google AI
  Studio, OpenRouter), each with a sign-up link and the `.env.local` variable name it needs — mirrors
  S2.1's `.env.example` contract exactly (`VITE_GROQ_API_KEY`, `VITE_GEMINI_API_KEY`,
  `VITE_OPENROUTER_API_KEY`).
- **Inputs**: `.env.example` (source of truth for variable names).
- **Outputs**: `README.md` mentions all three provider names and all three `VITE_*` variable names.
- **Edge cases**: if a key is left unset, link to `specs/spec-S2.3-error-handling/spec.md`'s
  behavior (friendly "No API key found" message, not a crash) so a reader isn't surprised.

### FR-4: Live Vercel URL retained and correctly placed
- **What**: The live demo URL added ad hoc during S10.2 (`https://llm-playground-two.vercel.app`)
  is preserved in the rewritten README, in a clearly labeled "Live Demo" section near the top, along
  with the existing caveat that no API keys are configured on the deployed instance.
- **Inputs**: the URL itself (already known from S10.2 — not re-derived).
- **Outputs**: `README.md` contains the exact live URL string.
- **Edge cases**: none — this FR is about not losing S10.2's addition during the rewrite.

---

## Tangible Outcomes

- [ ] **Outcome 1**: `README.md` exists and no longer contains the default Vite template boilerplate
  text ("This template provides a minimal setup...").
- [ ] **Outcome 2**: `README.md` contains a project description naming its core features.
- [ ] **Outcome 3**: `README.md` contains a fenced code block with `git clone`, `npm install`,
  `npm run dev`.
- [ ] **Outcome 4**: `README.md` names all three providers (Groq, Gemini, OpenRouter) and all three
  `VITE_*` variable names from `.env.example`.
- [ ] **Outcome 5**: `README.md` contains the live Vercel URL.
- [ ] **Outcome 6**: A person unfamiliar with the project could follow the README alone and get the
  app running locally with their own keys (manual read-through check).

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)
1. **test_readme_exists**: assert `README.md` exists at the project root.
2. **test_readme_no_longer_has_vite_boilerplate**: assert `README.md` does NOT contain the string
   `"This template provides a minimal setup"`.
3. **test_readme_has_project_description**: assert `README.md` mentions at least 3 of: `"chat"`,
   `"tokeniser"` (or `"tokenizer"`), `"compare"`, `"evaluate"`, `"Groq"`, `"Gemini"`, `"OpenRouter"`
   (case-insensitive) — a loose proxy for "the description is substantive and accurate."
4. **test_readme_has_run_commands**: assert `README.md` contains `git clone`, `npm install`, and
   `npm run dev`.
5. **test_readme_has_api_key_section**: assert `README.md` contains all three variable names
   (`VITE_GROQ_API_KEY`, `VITE_GEMINI_API_KEY`, `VITE_OPENROUTER_API_KEY`) and all three provider
   names (`Groq`, `Gemini`, `OpenRouter`).
6. **test_readme_has_live_url**: assert `README.md` contains
   `https://llm-playground-two.vercel.app`.

### Mocking Strategy
- No external dependencies — these tests only read `README.md` and `package.json`/`.env.example` as
  local files.
- Test file: `src/__tests__/readme.test.js`, `environment: 'node'` (same pattern as S2.1's
  `config.test.js` and S10.1's `prodBuild.test.js` — no jsdom needed for plain file reads).

### Coverage Expectation
- All 4 FRs covered by the 6 tests above; Outcome 6 (a stranger can actually follow it) is a manual
  read-through, same precedent as S9.1's in-browser dark-mode check — content quality isn't fully
  machine-checkable.

---

## References
- `roadmap.md` row S11.1 — "Write README: what the project does, how to run it, how to get free API
  keys"; Phase 11 goal — "a proper README... great for your portfolio"
- `checklist.md` (repo root, legacy combined checklist) — S11.1 section's original 5-test list,
  reused here as this spec's FRs/tests
- `specs/spec-S10.2-vercel-deploy/spec.md` — the live URL and the ad hoc README edit this spec
  formalizes into a full rewrite
- `specs/spec-S2.1-get-api-keys/spec.md` and `.env.example` — the three `VITE_*` variable names and
  provider sign-up flow this spec documents for a first-time reader
- `package.json` — the actual `scripts` block (`dev`, `build`, `test`, `lint`) the "How to run"
  section must match exactly
