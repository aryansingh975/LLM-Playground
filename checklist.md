# LLM Playground — All Checklists (S0.1 → S11.3)

Combined checklist document for the LLM Playground project. Each section tracks one spec through its 4-phase lifecycle: Create Spec → Verify Spec → Implement (TDD) → Verify Implement. Update the Status line in each section as you progress: `pending` → `spec` → `impl` → `done`.

---

# Checklist S0.1 — Install Node.js and npm

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** nothing — this is the first spec.

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (none required)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed (self-review is fine for a solo project)
- [ ] Dependencies confirmed correct and `done`
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: `node --version` prints a version string starting with `v18` or higher — RED (not installed) → GREEN (installed) → confirmed
- [ ] Test 2: `npm --version` prints a version string (any number) — RED → GREEN → confirmed
- [ ] Test 3: opening a **new** terminal after install still shows both versions (PATH is set correctly) — RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (manual check: both commands work in a fresh terminal)
- [ ] Coverage target met; lint/format clean (N/A — no code written in this spec)
- [ ] Acceptance criteria demonstrably met: `node --version` ≥ v18, `npm --version` present
- [ ] Integrates with dependents without breaking them (S0.2 can now run `npm create vite`)
- [ ] Merged to `main` via reviewed PR (commit: `S0.1(impl): install Node.js v20 LTS`)
→ **DONE.** S0.2 unlocks.

---

# Checklist S0.2 — Create the Project with Vite

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S0.1 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S0.1 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed (self-review is fine for a solo project)
- [ ] Dependencies confirmed correct and `done` (S0.1 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: `npm create vite@latest llm-playground -- --template react` exits with code 0 and creates the folder — RED → GREEN → confirmed
- [ ] Test 2: `npm install` inside `llm-playground/` completes without errors and creates `node_modules/` — RED → GREEN → confirmed
- [ ] Test 3: `npm run dev` starts a server and browser shows the starter page at `http://localhost:5173` — RED → GREEN → confirmed
- [ ] Test 4: editing `src/App.jsx` and saving causes the browser to update without a manual refresh (hot reload works) — RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (manual: all 4 tests above pass)
- [ ] Coverage target met; lint/format clean (`package.json` exists, `src/App.jsx` exists, no missing files)
- [ ] Acceptance criteria demonstrably met: `npm run dev` starts, browser shows app, live reload works
- [ ] Integrates with dependents without breaking them (S0.3 can now `git init` inside this folder)
- [ ] Merged to `main` via reviewed PR (commit: `S0.2(impl): scaffold Vite + React project`)
→ **DONE.** S0.3 unlocks.

---

# Checklist S0.3 — Git Setup and First Push to GitHub

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S0.2 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S0.2 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S0.2 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: `git init` runs without error inside `llm-playground/` — RED → GREEN → confirmed
- [ ] Test 2: `.gitignore` contains `node_modules/` entry — opening the file and checking counts — RED → GREEN → confirmed
- [ ] Test 3: `git add .` + `git commit -m "S0.3(impl): initial project commit"` exits with code 0 — RED → GREEN → confirmed
- [ ] Test 4: GitHub repo created, `git push` succeeds, files visible on github.com — RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (manual: repo visible on GitHub with all files)
- [ ] Coverage target met; `node_modules/` is NOT pushed to GitHub (check the repo online)
- [ ] Acceptance criteria demonstrably met: GitHub repo exists, first commit visible, `node_modules` absent
- [ ] Integrates with dependents without breaking them (all Phase 1 specs can now commit their changes)
- [ ] Merged to `main` via reviewed PR (commit: `S0.3(impl): git init and push to GitHub`)
→ **DONE.** S0.4 unlocks.

---

# Checklist S0.4 — JavaScript for Python Developers

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S0.1 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S0.1 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S0.1 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: `const greet = (name) => \`Hello ${name}\`; console.log(greet("world"))` prints `Hello world` when run with `node scratch/js-basics.js` — RED (file doesn't exist) → GREEN (file created and runs) → confirmed
- [ ] Test 2: `console.log([1,2,3].map(x => x * 2))` prints `[2, 4, 6]` — RED → GREEN → confirmed
- [ ] Test 3: `const { length } = [1,2,3]; console.log(length)` prints `3` — RED → GREEN → confirmed
- [ ] Test 4: async function awaiting `Promise.resolve("done")` and logging the result prints `done` without error — RED → GREEN → confirmed
- [ ] Test 5: `scratch/js-basics.js` is deleted; `npm run dev` still starts without error — RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green (manual: all 5 terminal tests confirmed)
- [ ] Coverage target met; scratch file deleted — no permanent files added by this spec
- [ ] Acceptance criteria demonstrably met: can read and write all 6 JS patterns without looking them up
- [ ] Integrates with dependents without breaking them (S1.1+ can now use arrow functions, destructuring, etc. without confusion)
- [ ] No commit needed for this spec (no permanent code) — note in checklist that spec is done
→ **DONE.** S0.5 unlocks.

---

# Checklist S0.5 — React Fundamentals

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S0.2 `done`, S0.4 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S0.2, S0.4 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S0.2 ✅, S0.4 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: counter code added to `App.jsx`; `npm run dev` shows "Count: 0" and a button in the browser — RED (code not added) → GREEN (added) → confirmed
- [ ] Test 2: clicking the button 3 times shows "Count: 3" — visual RED → GREEN → confirmed
- [ ] Test 3: clicking the button visibly updates only the count, not the whole page (no flicker/full reload) — visual RED → GREEN → confirmed
- [ ] Test 4: `App.jsx` reverted to Vite default; `npm run dev` still starts and shows the starter page without console errors — RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green (manual: all 4 tests confirmed)
- [ ] Coverage target met; `App.jsx` is back to the clean Vite starter — no permanent changes from this spec
- [ ] Acceptance criteria demonstrably met: can explain in own words what a component, JSX, useState, and re-render are
- [ ] Integrates with dependents without breaking them (S1.1 starts from a clean App.jsx; the React knowledge from this spec makes Phase 1 code make sense)
- [ ] No commit needed for this spec (no permanent code) — note in checklist that spec is done
→ **DONE.** Phase 1 specs unlock.

---

# Checklist S1.1 — HTML Skeleton

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S0.2 `done`, S0.3 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S0.2, S0.3 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done`
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: `index.html` (or `App.jsx`) contains a text `<input>` element — open file and verify — RED → GREEN → confirmed
- [ ] Test 2: page contains a `<button>` element with visible text (e.g. "Send") — check in browser DevTools → RED → GREEN → confirmed
- [ ] Test 3: page contains a response area element (e.g. a `<div id="response">`) where output will appear — RED → GREEN → confirmed
- [ ] Test 4: `npm run dev` still starts without errors after changes — RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (manual: open browser, see all 3 elements)
- [ ] Coverage target met; lint/format clean (no console errors in browser DevTools)
- [ ] Acceptance criteria demonstrably met: input box, button, and response area all visible on screen
- [ ] Integrates with dependents without breaking them (S1.2 can add a click handler to the button)
- [ ] Merged to `main` via reviewed PR (commit: `S1.1(impl): add HTML skeleton with input, button, response area`)
→ **DONE.** S1.2 unlocks.

---

# Checklist S1.2 — JavaScript Click Handler

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S1.1 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S1.1 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S1.1 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: typing "hello" in the input and clicking the button shows "hello" in the response area — manual RED → GREEN → confirmed
- [ ] Test 2: clicking the button with an empty input shows nothing (or a "please type something" message) — manual RED → GREEN → confirmed
- [ ] Test 3: clicking the button multiple times replaces (not appends) the previous response — manual RED → GREEN → confirmed
- [ ] Test 4: no JavaScript errors appear in browser DevTools console — RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (manual: all 4 tests above pass in the browser)
- [ ] Coverage target met; lint/format clean (no console errors or warnings)
- [ ] Acceptance criteria demonstrably met: typing + clicking shows typed text in response area
- [ ] Integrates with dependents without breaking them (S1.3 can add styling without breaking this behaviour)
- [ ] Merged to `main` via reviewed PR (commit: `S1.2(impl): add click handler that echoes input to response area`)
→ **DONE.** S1.3 unlocks.

---

# Checklist S1.3 — Basic Tailwind Styling

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S1.2 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S1.2 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S1.2 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: `npm install -D tailwindcss postcss autoprefixer` exits with code 0 — RED → GREEN → confirmed
- [ ] Test 2: `tailwind.config.js` exists and contains the `content` array pointing to `./src/**/*.{js,jsx}` — file check RED → GREEN → confirmed
- [ ] Test 3: adding a Tailwind class (e.g. `bg-blue-500`) to a div actually changes its colour in the browser — visual RED → GREEN → confirmed
- [ ] Test 4: the page is centred on screen, the input has a visible border, the button has a background colour — visual RED → GREEN → confirmed
- [ ] Test 5: click handler from S1.2 still works after styling changes — manual RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (manual: all 5 tests above pass)
- [ ] Coverage target met; lint/format clean (no Tailwind warning in terminal)
- [ ] Acceptance criteria demonstrably met: page looks clean, centred, readable — not the default unstyled browser look
- [ ] Integrates with dependents without breaking them (S2.2 can add more elements and style them with Tailwind)
- [ ] Merged to `main` via reviewed PR (commit: `S1.3(impl): install Tailwind and style basic layout`)
→ **DONE.** Phase 2 specs unlock.

---

# Checklist S2.1 — Get Free API Keys (Groq, Gemini, OpenRouter)

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S0.1 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S0.1 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S0.1 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: Groq account created at console.groq.com; key generated (starts with `gsk_`); curl test returns a 200 response with AI text — RED → GREEN → confirmed
- [ ] Test 2: Google AI Studio account at aistudio.google.com; key generated (starts with `AIza`); curl test returns a 200 response with AI text — RED → GREEN → confirmed
- [ ] Test 3: OpenRouter account at openrouter.ai; key generated (starts with `sk-or-`); curl test with a `:free` model returns a 200 response with AI text — RED → GREEN → confirmed
- [ ] Test 4: all three keys stored safely outside any Git-tracked file (password manager or local `.env` not in repo) — RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green (manual: all three curl tests return valid AI responses)
- [ ] Coverage target met; no key is present in any committed file (check GitHub to confirm)
- [ ] Acceptance criteria demonstrably met: three working API keys in hand, each confirmed via curl
- [ ] Integrates with dependents without breaking them (S2.2 uses the Groq key; S4.3 and S7.2 use all three)
- [ ] Merged to `main` via reviewed PR (commit: `S2.1(impl): document API key setup for Groq, Gemini, OpenRouter`)
→ **DONE.** S2.2 unlocks.

---

# Checklist S2.2 — First Real AI API Call

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S2.1 `done`, S1.2 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S2.1, S1.2 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S2.1 ✅, S1.2 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: pasting a valid API key into the key input field and clicking Send sends a `fetch()` request to `https://api.groq.com/openai/v1/chat/completions` — verify in browser DevTools Network tab — RED → GREEN → confirmed
- [ ] Test 2: typing "What is 2+2?" and clicking Send shows "4" (or similar) in the response area within 5 seconds — manual RED → GREEN → confirmed
- [ ] Test 3: the button shows a loading state ("Thinking..." or disabled) while waiting for the reply — visual RED → GREEN → confirmed
- [ ] Test 4: after the reply arrives the button returns to normal and is clickable again — visual RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (manual: all 4 tests pass)
- [ ] Coverage target met; lint/format clean (no console errors in DevTools)
- [ ] Acceptance criteria demonstrably met: real AI reply appears in the response area
- [ ] Integrates with dependents without breaking them (S2.3 can add error handling around this same fetch call)
- [ ] Merged to `main` via reviewed PR (commit: `S2.2(impl): wire fetch() call to Groq API`)
→ **DONE.** S2.3 and S3.1 unlock.

---

# Checklist S2.3 — API Error Handling

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S2.2 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S2.2 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S2.2 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: clicking Send with the API key field empty shows "Please enter your API key" message — no crash — RED → GREEN → confirmed
- [ ] Test 2: entering a wrong key (e.g. "abc123") shows "Invalid API key — check your Groq key" message — RED → GREEN → confirmed
- [ ] Test 3: turning off wifi and clicking Send shows "No internet connection — check your network" message — RED → GREEN → confirmed
- [ ] Test 4: all error messages disappear when the user starts typing in the input field again — RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (manual: all 4 error scenarios tested)
- [ ] Coverage target met; lint/format clean (no unhandled promise rejections in console)
- [ ] Acceptance criteria demonstrably met: all 3 error types show a friendly message instead of crashing
- [ ] Integrates with dependents without breaking them (S3.3 chat input uses this same error display)
- [ ] Merged to `main` via reviewed PR (commit: `S2.3(impl): add friendly error messages for API failures`)
→ **DONE.** Phase 3 specs unlock.

---

# Checklist S3.1 — App Component Architecture Checkpoint

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S0.2 `done`, S2.2 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S0.2, S2.2 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S0.2 ✅, S2.2 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: every `useState` variable in `App.jsx` has a descriptive name — no `val`, `data`, `x`, or similar — file review RED → GREEN → confirmed
- [ ] Test 2: the Groq API call lives in its own named async function (e.g. `handleSend`), not written inline inside JSX — file review RED → GREEN → confirmed
- [ ] Test 3: `npm run dev` starts and the page renders without console errors after the refactor — visual RED → GREEN → confirmed
- [ ] Test 4: the full S2.2 send flow still works (type a message, click Send, see AI reply, loading state shown while waiting) — manual RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green (manual: all 4 tests pass)
- [ ] Coverage target met; lint/format clean (no React warnings in console about keys or hooks)
- [ ] Acceptance criteria demonstrably met: `App.jsx` is clean and readable — each state variable and handler has a clear purpose
- [ ] Integrates with dependents without breaking them (S3.2 can extract `<MessageThread>` from `App.jsx` without untangling messy code)
- [ ] Merged to `main` via reviewed PR (commit: `S3.1(impl): clean up App.jsx component architecture`)
→ **DONE.** S3.2 unlocks.

---

# Checklist S3.2 — Message Thread Component

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S3.1 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S3.1 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S3.1 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: `src/components/MessageThread.jsx` file exists and exports a component — file check RED → GREEN → confirmed
- [ ] Test 2: user messages appear right-aligned with a coloured background (e.g. blue) — visual RED → GREEN → confirmed
- [ ] Test 3: AI messages appear left-aligned with a different background (e.g. grey) — visual RED → GREEN → confirmed
- [ ] Test 4: sending a second message appends it below the first (does not replace it) — manual RED → GREEN → confirmed
- [ ] Test 5: the thread automatically scrolls to the latest message when a new one arrives — manual RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (manual: all 5 tests pass)
- [ ] Coverage target met; lint/format clean (no missing React `key` prop warnings)
- [ ] Acceptance criteria demonstrably met: messages display in a chat-like thread, auto-scrolls
- [ ] Integrates with dependents without breaking them (S3.3 chat input appends messages into this thread)
- [ ] Merged to `main` via reviewed PR (commit: `S3.2(impl): build MessageThread component`)
→ **DONE.** S3.3 unlocks.

---

# Checklist S3.3 — Chat Input Component

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S3.2 `done`, S2.2 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S3.2, S2.2 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S3.2 ✅, S2.2 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: pressing Enter in the text area sends the message (same as clicking Send) — manual RED → GREEN → confirmed
- [ ] Test 2: pressing Shift+Enter in the text area adds a new line instead of sending — manual RED → GREEN → confirmed
- [ ] Test 3: the input clears to empty after sending — visual RED → GREEN → confirmed
- [ ] Test 4: the Send button is disabled (grey, not clickable) while the AI is generating a reply — visual RED → GREEN → confirmed
- [ ] Test 5: an animated "Thinking..." indicator appears in the thread while waiting for the reply — visual RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (manual: all 5 tests pass)
- [ ] Coverage target met; lint/format clean (no console errors)
- [ ] Acceptance criteria demonstrably met: full chat loop works — type, send, see AI reply in thread
- [ ] Integrates with dependents without breaking them (S4.1 sidebar sits beside this component without breaking it)
- [ ] Merged to `main` via reviewed PR (commit: `S3.3(impl): build ChatInput component with full chat loop`)
→ **DONE.** Phase 4 specs unlock.

---

# Checklist S4.1 — Sidebar Layout

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S3.3 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S3.3 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S3.3 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: the page is now split into two columns — left sidebar and right chat area — visual RED → GREEN → confirmed
- [ ] Test 2: the sidebar is narrower than the chat area (e.g. roughly 1/3 vs 2/3 of the screen width) — visual RED → GREEN → confirmed
- [ ] Test 3: the chat input and message thread from S3.3 still work correctly inside the right column — manual RED → GREEN → confirmed
- [ ] Test 4: the sidebar has a visible heading such as "Controls" — visual RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (manual: all 4 tests pass)
- [ ] Coverage target met; lint/format clean (no layout overflow — no horizontal scrollbar)
- [ ] Acceptance criteria demonstrably met: two-column layout with sidebar on the left, chat on the right
- [ ] Integrates with dependents without breaking them (S4.2 can place the temperature slider inside the sidebar)
- [ ] Merged to `main` via reviewed PR (commit: `S4.1(impl): add two-column layout with sidebar`)
→ **DONE.** S4.2 unlocks.

---

# Checklist S4.2 — Temperature Slider

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S4.1 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S4.1 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S4.1 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: sidebar contains a range `<input>` (slider) with min=0, max=2, step=0.1 — inspect element in DevTools RED → GREEN → confirmed
- [ ] Test 2: moving the slider updates a numeric readout next to it in real time (e.g. "0.7") — visual RED → GREEN → confirmed
- [ ] Test 3: the slider's current value is sent as `temperature` in the API request body — verify in DevTools Network tab RED → GREEN → confirmed
- [ ] Test 4: setting temperature to 0.1 and asking "Tell me a joke" gives a different response than setting it to 1.8 — manual comparison RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (manual: all 4 tests pass)
- [ ] Coverage target met; lint/format clean (no console errors)
- [ ] Acceptance criteria demonstrably met: temperature slider visibly changes the `temperature` field sent to Groq
- [ ] Integrates with dependents without breaking them (S4.3 can add top-p and max-tokens in the same sidebar section)
- [ ] Merged to `main` via reviewed PR (commit: `S4.2(impl): add temperature slider wired to API`)
→ **DONE.** S4.3 unlocks.

---

# Checklist S4.3 — Top-p Slider

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S4.2 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S4.2 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S4.2 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: sidebar contains a top-p slider with min=0.1, max=1.0, step=0.05 — inspect element in DevTools RED → GREEN → confirmed
- [ ] Test 2: moving the slider updates a numeric readout next to it in real time (e.g. "0.90") — visual RED → GREEN → confirmed
- [ ] Test 3: the slider's current value is sent as `top_p` in the API request body — verify in DevTools Network tab RED → GREEN → confirmed
- [ ] Test 4: setting top-p to 0.1 gives a noticeably more predictable response than 1.0 on the same prompt — manual comparison RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green (manual: all 4 tests pass)
- [ ] Coverage target met; lint/format clean (no console errors)
- [ ] Acceptance criteria demonstrably met: top-p slider visible in sidebar, value correctly sent to API
- [ ] Integrates with dependents without breaking them (S4.4 adds another slider beside this one without layout issues)
- [ ] Merged to `main` via reviewed PR (commit: `S4.3(impl): add top-p slider wired to API`)
→ **DONE.** S4.4 unlocks.

---

# Checklist S4.4 — Max Tokens Slider

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S4.3 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S4.3 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S4.3 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: sidebar contains a max tokens slider with min=64, max=2048, step=64 — inspect element in DevTools RED → GREEN → confirmed
- [ ] Test 2: moving the slider updates a numeric readout next to it in real time (e.g. "512 tokens") — visual RED → GREEN → confirmed
- [ ] Test 3: the slider's current value is sent as `max_tokens` in the API request body — verify in DevTools Network tab RED → GREEN → confirmed
- [ ] Test 4: setting max tokens to 64 and asking "Explain quantum physics" causes the response to be cut off mid-answer — confirming the cap works — manual RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green (manual: all 4 tests pass)
- [ ] Coverage target met; lint/format clean (no console errors)
- [ ] Acceptance criteria demonstrably met: max tokens slider visible, value correctly caps the API response length
- [ ] Integrates with dependents without breaking them (S4.5 provider picker sits below these sliders without layout issues)
- [ ] Merged to `main` via reviewed PR (commit: `S4.4(impl): add max tokens slider wired to API`)
→ **DONE.** S4.5 unlocks.

---

# Checklist S4.5 — Provider Picker

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S4.4 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S4.4 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S4.4 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: sidebar contains a provider dropdown listing Groq, Gemini, and OpenRouter — visual RED → GREEN → confirmed
- [ ] Test 2: selecting Gemini and sending a message sends the request to `generativelanguage.googleapis.com` — DevTools Network tab RED → GREEN → confirmed
- [ ] Test 3: selecting OpenRouter and sending a message sends the request to `openrouter.ai` with a `:free` model name — DevTools RED → GREEN → confirmed
- [ ] Test 4: switching provider does not reset the temperature / top-p / max-tokens sliders — manual RED → GREEN → confirmed
- [ ] Test 5: switching from Groq to Gemini mid-conversation and sending a new message returns a reply from Gemini — manual RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green (manual: all 5 tests pass)
- [ ] Coverage target met; lint/format clean (no console errors when switching providers)
- [ ] Acceptance criteria demonstrably met: all three providers callable, correct API URL used for each
- [ ] Integrates with dependents without breaking them (Phase 5 tokeniser demo is independent of provider logic)
- [ ] Merged to `main` via reviewed PR (commit: `S4.5(impl): add provider picker for Groq, Gemini, OpenRouter`)
→ **DONE.** Phase 5 specs unlock.

---

# Checklist S5.1 — Tokeniser Logic

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S0.1 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S0.1 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S0.1 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: `npm install gpt-tokenizer` exits with code 0 — RED → GREEN → confirmed
- [ ] Test 2: `tokenise("Hello world")` returns an array of 2 token objects — written Vitest test RED → GREEN → confirmed
- [ ] Test 3: `tokenise("Unbelievable")` returns an array of 3 or more tokens (BPE splits it) — written Vitest test RED → GREEN → confirmed
- [ ] Test 4: `tokenise("")` returns an empty array and does not throw — written Vitest test RED → GREEN → confirmed
- [ ] Test 5: `npm run test` passes all 3 Vitest tests with no failures — RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (`npm run test` exits 0)
- [ ] Coverage target met; lint/format clean (no ESLint errors in `src/lib/tokeniser.js`)
- [ ] Acceptance criteria demonstrably met: tokeniser function correctly splits known strings
- [ ] Integrates with dependents without breaking them (S5.2 imports this function and uses it in the UI)
- [ ] Merged to `main` via reviewed PR (commit: `S5.1(impl): add tokeniser module using gpt-tokenizer`)
→ **DONE.** S5.2 unlocks.

---

# Checklist S5.2 — Tokeniser UI

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S5.1 `done`, S3.1 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S5.1, S3.1 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S5.1 ✅, S3.1 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: typing in the tokeniser input shows coloured token chips appearing in real time (within 200ms) — visual RED → GREEN → confirmed
- [ ] Test 2: adjacent tokens have different background colours (alternating palette so you can tell them apart) — visual RED → GREEN → confirmed
- [ ] Test 3: spaces inside tokens are shown as `·` (middle dot) so the split is clearly visible — visual RED → GREEN → confirmed
- [ ] Test 4: a token count badge (e.g. "5 tokens") updates as you type — visual RED → GREEN → confirmed
- [ ] Test 5: clearing the input clears all chips and resets the counter to 0 — visual RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (manual: all 5 visual tests pass)
- [ ] Coverage target met; lint/format clean (no console errors when typing fast)
- [ ] Acceptance criteria demonstrably met: tokeniser demo is interactive, informative, and correct
- [ ] Integrates with dependents without breaking them (S6.5 generation panel can embed this component inline)
- [ ] Merged to `main` via reviewed PR (commit: `S5.2(impl): build TokeniserDemo component with coloured chips`)
→ **DONE.** Phase 6 specs unlock.

---

# Checklist S6.1 — React Router Setup

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S3.1 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S3.1 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S3.1 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: `npm install react-router-dom` exits with code 0 — RED → GREEN → confirmed
- [ ] Test 2: navigating to `/` shows the Chat view — manual browser check RED → GREEN → confirmed
- [ ] Test 3: navigating to `/learn` shows the Learn view (even if it just says "Coming soon") — manual RED → GREEN → confirmed
- [ ] Test 4: a nav bar is visible on every page with links to Chat and Learn — visual RED → GREEN → confirmed
- [ ] Test 5: clicking a nav link changes the URL in the browser bar and the page content changes without a full page reload — manual RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (manual: all 5 tests pass)
- [ ] Coverage target met; lint/format clean (no React Router warnings in console)
- [ ] Acceptance criteria demonstrably met: routing works, nav bar visible, no full-page reloads
- [ ] Integrates with dependents without breaking them (S6.2–S6.4 can render inside the `/learn` route)
- [ ] Merged to `main` via reviewed PR (commit: `S6.1(impl): install React Router and add /chat /learn routes`)
→ **DONE.** S6.2, S6.3, S6.4 unlock.

---

# Checklist S6.2 — Pre-training Explainer Panel

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S6.1 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S6.1 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S6.1 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: the `/learn` route shows a tab bar with at least "Pre-training" as the first tab — visual RED → GREEN → confirmed
- [ ] Test 2: the Pre-training tab contains 4 cards: Data Collection, Data Cleaning, Tokenisation, Architecture — visual RED → GREEN → confirmed
- [ ] Test 3: each card has a heading and at least 2 sentences of plain-English explanation — content review RED → GREEN → confirmed
- [ ] Test 4: the Tokenisation card links to or embeds the tokeniser demo from S5.2 — manual RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (manual: all 4 tests pass)
- [ ] Coverage target met; lint/format clean (no broken links or missing imports)
- [ ] Acceptance criteria demonstrably met: all 4 pre-training concept cards readable and accurate
- [ ] Integrates with dependents without breaking them (S6.3 adds its own tab without affecting this one)
- [ ] Merged to `main` via reviewed PR (commit: `S6.2(impl): build pre-training explainer panel`)
→ **DONE.** Does not block other specs — can proceed to S6.3 in parallel.

---

# Checklist S6.3 — Post-training Explainer Panel

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S6.1 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S6.1 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S6.1 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: the learn tab bar contains a "Post-training" tab — visual RED → GREEN → confirmed
- [ ] Test 2: the Post-training tab contains 4 cards: SFT, RLHF, PPO, Verifiable Tasks — visual RED → GREEN → confirmed
- [ ] Test 3: each card has a heading and at least 2 sentences of plain-English explanation — content review RED → GREEN → confirmed
- [ ] Test 4: clicking Post-training tab does not break the Pre-training tab (switching back still shows S6.2 content) — manual RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (manual: all 4 tests pass)
- [ ] Coverage target met; lint/format clean (no missing imports)
- [ ] Acceptance criteria demonstrably met: all 4 post-training concept cards readable and accurate
- [ ] Integrates with dependents without breaking them (S6.4 adds two more tabs without affecting this one)
- [ ] Merged to `main` via reviewed PR (commit: `S6.3(impl): build post-training explainer panel`)
→ **DONE.**

---

# Checklist S6.4 — Evaluation and Text Generation Panels

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S6.1 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S6.1 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S6.1 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: the learn tab bar contains "Evaluation" and "Text Generation" tabs — visual RED → GREEN → confirmed
- [ ] Test 2: the Evaluation tab contains 3 cards: Traditional Metrics, Benchmarks, Human Eval & Leaderboards — visual RED → GREEN → confirmed
- [ ] Test 3: the Text Generation tab contains 4 cards: Greedy, Beam Search, Top-k, Top-p — visual RED → GREEN → confirmed
- [ ] Test 4: the Text Generation tab embeds the probability bar chart (from S5 or a simplified version) — visual RED → GREEN → confirmed
- [ ] Test 5: all 4 tabs (Pre-training, Post-training, Evaluation, Text Generation) work without any tab breaking another — manual RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (manual: all 5 tests pass)
- [ ] Coverage target met; lint/format clean (no broken imports)
- [ ] Acceptance criteria demonstrably met: all 4 learn tabs complete and navigable
- [ ] Integrates with dependents without breaking them (Phase 7 adds `/compare` route without affecting `/learn`)
- [ ] Merged to `main` via reviewed PR (commit: `S6.4(impl): build evaluation and text generation panels`)
→ **DONE.** Phase 7 specs unlock.

---

# Checklist S7.1 — Compare Route Layout

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S6.1 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S6.1 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S6.1 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: navigating to `/compare` shows the Compare view — manual RED → GREEN → confirmed
- [ ] Test 2: nav bar now has a "Compare" link — visual RED → GREEN → confirmed
- [ ] Test 3: the page has a shared prompt input at the top and two columns below it — visual RED → GREEN → confirmed
- [ ] Test 4: each column has its own provider label (e.g. "Groq" / "Gemini") — visual RED → GREEN → confirmed
- [ ] Test 5: the `/chat` and `/learn` routes still work after adding `/compare` — manual RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (manual: all 5 tests pass)
- [ ] Coverage target met; lint/format clean (no layout overflow)
- [ ] Acceptance criteria demonstrably met: `/compare` loads with two-column layout and shared prompt input
- [ ] Integrates with dependents without breaking them (S7.2 wires the prompt input to parallel API calls)
- [ ] Merged to `main` via reviewed PR (commit: `S7.1(impl): add /compare route with two-column layout`)
→ **DONE.** S7.2 unlocks.

---

# Checklist S7.2 — Parallel API Calls

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S7.1 `done`, S2.2 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S7.1, S2.2 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S7.1 ✅, S2.2 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: clicking "Compare" sends requests to both providers simultaneously (check DevTools Network — both requests appear at the same time) — manual RED → GREEN → confirmed
- [ ] Test 2: both responses arrive and fill their respective columns — visual RED → GREEN → confirmed
- [ ] Test 3: if one provider fails (wrong key), that column shows an error while the other column still shows a response — manual RED → GREEN → confirmed
- [ ] Test 4: both columns show a loading indicator simultaneously while waiting — visual RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (manual: all 4 tests pass)
- [ ] Coverage target met; lint/format clean (no unhandled promise rejections)
- [ ] Acceptance criteria demonstrably met: both providers called in parallel, independent failure handling works
- [ ] Integrates with dependents without breaking them (S7.3 adds response cards inside these columns)
- [ ] Merged to `main` via reviewed PR (commit: `S7.2(impl): wire parallel API calls with Promise.allSettled`)
→ **DONE.** S7.3 unlocks.

---

# Checklist S7.3 — Response Cards

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S7.2 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S7.2 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S7.2 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: each response column shows a card with the provider name as a badge at the top — visual RED → GREEN → confirmed
- [ ] Test 2: each card shows the number of tokens used (e.g. "142 tokens") — visual RED → GREEN → confirmed
- [ ] Test 3: each card shows how long the response took in milliseconds (e.g. "830ms") — visual RED → GREEN → confirmed
- [ ] Test 4: the response text inside the card is scrollable if it is longer than the card height — visual RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (manual: all 4 tests pass)
- [ ] Coverage target met; lint/format clean (no layout overflow in cards)
- [ ] Acceptance criteria demonstrably met: response cards show provider, token count, latency, and response text
- [ ] Integrates with dependents without breaking them (Phase 8 evaluate tab is a separate route and does not depend on these cards)
- [ ] Merged to `main` via reviewed PR (commit: `S7.3(impl): build response cards with provider badge and metadata`)
→ **DONE.** Phase 8 specs unlock.

---

# Checklist S8.1 — Evaluate Route Layout

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S6.1 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S6.1 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S6.1 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: navigating to `/evaluate` shows the Evaluate view — manual RED → GREEN → confirmed
- [ ] Test 2: nav bar now has an "Evaluate" link — visual RED → GREEN → confirmed
- [ ] Test 3: the page has two sub-tabs: "Rate responses" and "Benchmark scores" — visual RED → GREEN → confirmed
- [ ] Test 4: all existing routes (`/`, `/learn`, `/compare`) still work after adding `/evaluate` — manual RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (manual: all 4 tests pass)
- [ ] Coverage target met; lint/format clean (no broken routes)
- [ ] Acceptance criteria demonstrably met: `/evaluate` route exists with two sub-tabs visible
- [ ] Integrates with dependents without breaking them (S8.2 renders inside "Rate responses" sub-tab)
- [ ] Merged to `main` via reviewed PR (commit: `S8.1(impl): add /evaluate route with sub-tab layout`)
→ **DONE.** S8.2 and S8.3 unlock.

---

# Checklist S8.2 — Star Rating Widget

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S8.1 `done`, S3.2 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S8.1, S3.2 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S8.1 ✅, S3.2 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: the "Rate responses" tab lists the last 5 AI messages from the chat — visual RED → GREEN → confirmed
- [ ] Test 2: each message has 5 star icons that can be clicked to rate it 1–5 — visual RED → GREEN → confirmed
- [ ] Test 3: clicking a star highlights it and all stars to its left (e.g. clicking star 3 highlights stars 1, 2, 3) — visual RED → GREEN → confirmed
- [ ] Test 4: ratings persist if you navigate away to `/learn` and come back to `/evaluate` (stored in memory/state) — manual RED → GREEN → confirmed
- [ ] Test 5: clicking "Export as JSON" downloads a file containing the message text and its rating — manual RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (manual: all 5 tests pass)
- [ ] Coverage target met; lint/format clean (stars are keyboard-accessible — can Tab to them and press Space)
- [ ] Acceptance criteria demonstrably met: AI messages can be rated 1–5 stars and exported
- [ ] Integrates with dependents without breaking them (S8.3 benchmark chart is in the other sub-tab and does not interact with ratings)
- [ ] Merged to `main` via reviewed PR (commit: `S8.2(impl): build star rating widget for AI responses`)
→ **DONE.**

---

# Checklist S8.3 — Benchmark Score Chart

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S8.1 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S8.1 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S8.1 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: `npm install chart.js react-chartjs-2` exits with code 0 — RED → GREEN → confirmed
- [ ] Test 2: the "Benchmark scores" tab shows a bar chart — visual RED → GREEN → confirmed
- [ ] Test 3: the chart has at least 3 benchmarks on the x-axis: MMLU, HumanEval, GSM8K — visual RED → GREEN → confirmed
- [ ] Test 4: the chart has at least 3 bars per benchmark (one for each free model: Llama 3.3, Gemini Flash, DeepSeek V3) — visual RED → GREEN → confirmed
- [ ] Test 5: hovering over a bar shows a tooltip with the exact score — visual RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (manual: all 5 tests pass)
- [ ] Coverage target met; lint/format clean (no Chart.js console warnings)
- [ ] Acceptance criteria demonstrably met: benchmark chart renders correctly with real score data
- [ ] Integrates with dependents without breaking them (Phase 9 polish specs do not change chart logic)
- [ ] Merged to `main` via reviewed PR (commit: `S8.3(impl): build benchmark score bar chart with Chart.js`)
→ **DONE.** Phase 9 specs unlock.

---

# Checklist S9.1 — Dark Mode Toggle

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S1.3 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S1.3 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S1.3 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: a dark/light mode toggle button is visible in the nav bar — visual RED → GREEN → confirmed
- [ ] Test 2: clicking the toggle switches the page between light and dark colour schemes — visual RED → GREEN → confirmed
- [ ] Test 3: in dark mode all text is still readable (no white text on white background or black text on black background) — visual RED → GREEN → confirmed
- [ ] Test 4: the preference is saved to `localStorage` so refreshing the page keeps the chosen mode — manual RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (manual: all 4 tests pass)
- [ ] Coverage target met; lint/format clean (no Tailwind class conflicts)
- [ ] Acceptance criteria demonstrably met: dark mode works on all 4 routes and persists on refresh
- [ ] Integrates with dependents without breaking them (S9.2 mobile layout works in both modes)
- [ ] Merged to `main` via reviewed PR (commit: `S9.1(impl): add dark mode toggle with localStorage persistence`)
→ **DONE.** S9.2 unlocks.

---

# Checklist S9.2 — Mobile Responsive Layout

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S3.3 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S3.3 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S3.3 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: on a screen narrower than 768px (simulate in Chrome DevTools → mobile view) the sidebar collapses — visual RED → GREEN → confirmed
- [ ] Test 2: on mobile the chat input stays stuck to the bottom of the screen even when scrolling up — visual RED → GREEN → confirmed
- [ ] Test 3: all buttons and links are at least 44px tall on mobile (easy to tap with a finger) — measure in DevTools RED → GREEN → confirmed
- [ ] Test 4: no horizontal scrollbar appears on mobile — visual RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (manual: all 4 tests pass in Chrome DevTools mobile emulation)
- [ ] Coverage target met; lint/format clean (no Tailwind overflow warnings)
- [ ] Acceptance criteria demonstrably met: app is usable on a 375px wide screen (iPhone SE size)
- [ ] Integrates with dependents without breaking them (S9.3 error states display correctly on mobile too)
- [ ] Merged to `main` via reviewed PR (commit: `S9.2(impl): make layout responsive for mobile screens`)
→ **DONE.** S9.3 unlocks.

---

# Checklist S9.3 — Empty and Error States

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S2.3 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S2.3 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S2.3 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: when the chat is empty (no messages yet) a welcome message appears with instructions on how to get started — visual RED → GREEN → confirmed
- [ ] Test 2: when an API call fails the error message appears inline in the chat thread (not as a popup) — visual RED → GREEN → confirmed
- [ ] Test 3: a "Retry" button appears after an API error — clicking it resends the last message — manual RED → GREEN → confirmed
- [ ] Test 4: when the rate limit is hit the error message says "Rate limit reached — wait a moment or switch to a different provider" — manual RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (manual: all 4 tests pass)
- [ ] Coverage target met; lint/format clean (no unhandled states that show a blank screen)
- [ ] Acceptance criteria demonstrably met: app never shows a blank or crashed view — always guides the user
- [ ] Integrates with dependents without breaking them (Phase 10 build and deploy will bundle all these states correctly)
- [ ] Merged to `main` via reviewed PR (commit: `S9.3(impl): add empty state, error messages, and retry button`)
→ **DONE.** Phase 10 specs unlock.

---

# Checklist S10.1 — Production Build

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S9.1 `done`, S9.2 `done`, S9.3 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S9.1, S9.2, S9.3 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S9.1 ✅, S9.2 ✅, S9.3 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: `npm run build` completes without errors — RED → GREEN → confirmed
- [ ] Test 2: a `dist/` folder is created containing `index.html` and JS/CSS asset files — file check RED → GREEN → confirmed
- [ ] Test 3: `npm run preview` serves the production build locally and all 4 routes work — manual RED → GREEN → confirmed
- [ ] Test 4: the total JavaScript bundle size reported by Vite is under 500 KB — terminal output check RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (`npm run build` passes in GitHub Actions)
- [ ] Coverage target met; lint/format clean (no build warnings about large chunks)
- [ ] Acceptance criteria demonstrably met: production build works, all routes functional, bundle < 500KB
- [ ] Integrates with dependents without breaking them (`dist/` folder is what S10.2 deploys to Vercel)
- [ ] Merged to `main` via reviewed PR (commit: `S10.1(impl): verify production build and bundle size`)
→ **DONE.** S10.2 unlocks.

---

# Checklist S10.2 — Vercel Deployment

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S10.1 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S10.1 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S10.1 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: Vercel account created at vercel.com (free, sign in with GitHub) — manual RED → GREEN → confirmed
- [ ] Test 2: project imported from GitHub repo and first deployment succeeds (green checkmark in Vercel dashboard) — manual RED → GREEN → confirmed
- [ ] Test 3: the public URL (e.g. `https://llm-playground-abc.vercel.app`) opens in the browser and shows the app — manual RED → GREEN → confirmed
- [ ] Test 4: all 4 routes (`/`, `/learn`, `/compare`, `/evaluate`) work on the live URL — manual RED → GREEN → confirmed
- [ ] Test 5: pushing a new commit to `main` automatically re-deploys the app (Vercel auto-deploy works) — manual RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (manual: all 5 tests pass on the live URL)
- [ ] Coverage target met; public URL recorded in `README.md`
- [ ] Acceptance criteria demonstrably met: anyone with the link can open and use the playground
- [ ] Integrates with dependents without breaking them (S11 docs specs can now include the live URL and screenshots)
- [ ] Merged to `main` via reviewed PR (commit: `S10.2(impl): deploy to Vercel — live at [URL]`)
→ **DONE.** Phase 11 specs unlock.

---

# Checklist S11.1 — README

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S10.2 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S10.2 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S10.2 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: `README.md` exists at the root of the repo — file check RED → GREEN → confirmed
- [ ] Test 2: README contains a description of what the project does (1–2 paragraphs) — content review RED → GREEN → confirmed
- [ ] Test 3: README contains a "How to run locally" section with exact commands (`git clone`, `npm install`, `npm run dev`) — content review RED → GREEN → confirmed
- [ ] Test 4: README contains a "How to get free API keys" section with links to Groq, Gemini, and OpenRouter — content review RED → GREEN → confirmed
- [ ] Test 5: README contains the live Vercel URL — content review RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (manual: a stranger could follow the README and get the app running)
- [ ] Coverage target met; README renders correctly on GitHub (check the GitHub repo page)
- [ ] Acceptance criteria demonstrably met: all 5 sections present and accurate
- [ ] Integrates with dependents without breaking them (S11.2 architecture doc is linked from the README)
- [ ] Merged to `main` via reviewed PR (commit: `S11.1(impl): write README`)
→ **DONE.** S11.2 unlocks.

---

# Checklist S11.2 — Architecture Diagram

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S10.2 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S10.2 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S10.2 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: `docs/architecture.md` exists — file check RED → GREEN → confirmed
- [ ] Test 2: the document contains a diagram (ASCII art or embedded image) showing: User → Browser → Groq/Gemini/OpenRouter API → Response → UI — content review RED → GREEN → confirmed
- [ ] Test 3: the diagram notes that there is no backend server and API keys stay in the browser — content review RED → GREEN → confirmed
- [ ] Test 4: the doc describes what each of the 4 routes (`/chat`, `/learn`, `/compare`, `/evaluate`) does in one sentence each — content review RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (manual: doc renders on GitHub, diagram is readable)
- [ ] Coverage target met; linked from README under an "Architecture" heading
- [ ] Acceptance criteria demonstrably met: someone new to the project understands the data flow from reading this doc
- [ ] Integrates with dependents without breaking them (S11.3 acceptance checklist references this doc)
- [ ] Merged to `main` via reviewed PR (commit: `S11.2(impl): add architecture diagram and data flow doc`)
→ **DONE.** S11.3 unlocks.

---

# Checklist S11.3 — Final Acceptance Checklist

Status: `pending` → `spec` → `impl` → `done`
A spec is **done** only when Phase 4 passes. Do not start Phase 1 until every **Depends On** spec is `done`.

**Depends On:** S11.1 `done`, S11.2 `done`

## Phase 1 · Create Spec
- [ ] All upstream deps are `done` (S11.1, S11.2 must be `done`)
- [ ] `spec.md` complete — objective, scope, interface, deps, acceptance criteria, test list (no TBDs)
- [ ] Interface/contract is precise and unambiguous
→ Status becomes `spec` after Phase 2.

## Phase 2 · Verify Spec
- [ ] Reviewed
- [ ] Dependencies confirmed correct and `done` (S11.1 ✅, S11.2 ✅)
- [ ] Every acceptance criterion is concrete and testable
- [ ] Test list agreed → **spec frozen**

## Phase 3 · Implement Spec (TDD)  → status `impl`
- [ ] Test 1: all 35 specs in the Master Spec Index are marked `done` — spreadsheet/checklist review RED → GREEN → confirmed
- [ ] Test 2: the live Vercel URL loads in under 5 seconds on a normal internet connection — manual timed test RED → GREEN → confirmed
- [ ] Test 3: the full chat flow works on the live URL (type message → get AI reply → see it in thread) — manual RED → GREEN → confirmed
- [ ] Test 4: the tokeniser demo works without an API key (it's offline-capable) — manual RED → GREEN → confirmed
- [ ] Test 5: screenshots of all 4 routes exist in `docs/screenshots/` and are embedded in the README — file check RED → GREEN → confirmed
- [ ] No skipped / xfail tests

## Phase 4 · Verify Implement  → status `done`
- [ ] Full suite green in CI (manual: all 5 tests pass on the live URL)
- [ ] Coverage target met; every spec is `done`, no spec is still `pending` or `impl`
- [ ] Acceptance criteria demonstrably met: project is complete, live, documented, and usable by anyone
- [ ] Integrates with dependents without breaking them (this is the final spec — nothing depends on it)
- [ ] Merged to `main` via reviewed PR (commit: `S11.3(impl): final acceptance — project complete 🎉`)
→ **DONE. Project complete.**

---

