# Spec S2.1 — Get API Keys

## Overview
Sign up for three free AI providers — Groq, Gemini (Google AI Studio), and OpenRouter — and obtain a free API key from each. Store the keys securely in a `.env.local` file that is never committed to git. Create a committed `.env.example` file showing the required variable names so any developer who clones the repo knows what to configure. Test all three keys manually with `curl` to confirm they work before moving on to S2.2 (which will make the first real API call in code).

## Dependencies
- S0.1 — Node.js and npm must be installed (curl is also required, comes with most OSes)

## Target Location
- `.env.example` — committed, shows required variable names with empty values
- `.env.local` — NOT committed (gitignored), stores your real keys
- `.gitignore` — add `!.env.example` exception so the example file can be committed

---

## Functional Requirements

### FR-1: Three API keys obtained and stored
- **What**: The developer has active free accounts at Groq, Gemini, and OpenRouter and has generated an API key from each
- **Inputs**: Sign-up at each provider's website (free, no credit card needed for free tiers)
- **Outputs**: Three API key strings, stored in `.env.local` as `VITE_` prefixed variables
- **Variable names**:
  - `VITE_GROQ_API_KEY=gsk_...`
  - `VITE_GEMINI_API_KEY=AIza...`
  - `VITE_OPENROUTER_API_KEY=sk-or-...`
- **Why `VITE_` prefix**: Vite only exposes env vars with `VITE_` prefix to browser code via `import.meta.env`
- **Edge cases**: Never commit `.env.local` — the `.gitignore` already covers `*.local` and `.env.*`

### FR-2: `.env.example` committed to the repo
- **What**: A file `.env.example` at the project root with the three variable names set to empty strings, so anyone cloning the repo knows what to configure
- **Contents**:
  ```
  VITE_GROQ_API_KEY=
  VITE_GEMINI_API_KEY=
  VITE_OPENROUTER_API_KEY=
  ```
- **Edge cases**: The current `.gitignore` has `.env.*` which would also ignore `.env.example` — add `!.env.example` exception to allow it to be committed

### FR-3: `.gitignore` updated to protect secrets but allow the example
- **What**: `.gitignore` must ignore `.env.local` (and all real env files) but explicitly allow `.env.example`
- **Outputs**: Add `!.env.example` after the `.env.*` line in `.gitignore`

### FR-4: Keys verified with curl (manual)
- **What**: Each key is tested with a minimal `curl` request to confirm the account and key are active
- **Groq test**:
  ```bash
  curl https://api.groq.com/openai/v1/models \
    -H "Authorization: Bearer $VITE_GROQ_API_KEY"
  ```
- **Gemini test**:
  ```bash
  curl "https://generativelanguage.googleapis.com/v1beta/models?key=$VITE_GEMINI_API_KEY"
  ```
- **OpenRouter test**:
  ```bash
  curl https://openrouter.ai/api/v1/models \
    -H "Authorization: Bearer $VITE_OPENROUTER_API_KEY"
  ```
- **Expected**: Each returns a JSON object with a `data` or `models` array (not a 401 or 403 error)
- **Edge cases**: If curl returns 401, the key is wrong; if 429, the rate limit is hit — wait and retry

---

## Tangible Outcomes

- [ ] **Outcome 1**: `.env.example` exists at project root with all three `VITE_*` variable names
- [ ] **Outcome 2**: `.env.local` exists locally (not committed) with real key values filled in
- [ ] **Outcome 3**: `.gitignore` contains `!.env.example` so the example file is trackable by git
- [ ] **Outcome 4**: `curl` to each provider returns HTTP 200 with a JSON response (not a 401/403)
- [ ] **Outcome 5**: Running `git status` does NOT show `.env.local` as a tracked/untracked file

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)

This is a setup spec — the automated tests verify the config files are correct, not the actual API calls (which require live keys and would hit real servers).

1. **env_example_exists**: assert `.env.example` file exists at project root
2. **env_example_has_groq_key**: assert `.env.example` contains `VITE_GROQ_API_KEY=`
3. **env_example_has_gemini_key**: assert `.env.example` contains `VITE_GEMINI_API_KEY=`
4. **env_example_has_openrouter_key**: assert `.env.example` contains `VITE_OPENROUTER_API_KEY=`
5. **gitignore_allows_env_example**: assert `.gitignore` contains `!.env.example`

### Mocking Strategy
- No external dependencies to mock — these tests only read local files
- Use Vitest's Node.js `fs` module (available in `environment: 'node'`) to read file contents
- Test file: `src/__tests__/config.test.js` (new file, runs in node environment — no jsdom needed)

### Coverage Expectation
- All five file-existence and content checks covered
- The curl verification is manual (cannot automate without live keys)

---

## References
- roadmap.md Phase 2 row for S2.1
- Vite docs: environment variables must be prefixed `VITE_` to be available in browser via `import.meta.env`
- Groq free tier: console.groq.com
- Gemini free tier: aistudio.google.com
- OpenRouter free models: openrouter.ai
