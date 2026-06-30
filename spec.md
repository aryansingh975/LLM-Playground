# LLM Playground — All Specs (S0.1 → S11.3)

Combined spec document for the LLM Playground project. Each section below is one atomic spec, in build order. See `roadmap.md` for the phase overview and `checklist.md` for the 4-phase tracking checklist of each spec.

---

# Spec S0.1 — Install Node.js and npm

| Field | Value |
|-------|-------|
| **Spec** | S0.1 |
| **Phase** | 0 — Tools Setup |
| **Owner** | Solo |
| **Location** | N/A (local machine setup, no repo files) |
| **Depends On** | None — first spec |
| **Status** | pending |

## Objective
Get Node.js and npm installed and verified on the local machine so every later spec that needs `npm`/`node` commands can run. Node.js is the JavaScript equivalent of the Python interpreter; npm is the JavaScript equivalent of `pip`.

## Scope
**In:** Downloading and installing Node.js LTS, verifying both `node` and `npm` are on PATH.
**Out:** Creating any project files (that's S0.2). No code is written in this spec.

## Interface / Contract
Two CLI commands must succeed and print a version string:
```
node --version   →  v18.x.x or higher
npm --version    →  any 9.x/10.x version string
```

## Dependencies & Assumptions
- Upstream specs: none
- Libraries / data: Node.js LTS installer from nodejs.org
- Thresholds: Node version must be ≥ v18 (Vite 5 requires this minimum)

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given Node.js LTS is downloaded and installed, when I run `node --version` in a new terminal, then it prints a version string ≥ v18 | manual-acceptance |
| 2 | Given Node.js is installed, when I run `npm --version`, then it prints a version string with no error | manual-acceptance |
| 3 | Given install just completed, when I open a brand-new terminal window (not one open before install), then both commands above still work (confirms PATH was updated correctly) | manual-acceptance |

## Notes / Risks
- Windows users may need to restart the terminal (sometimes the whole machine) for PATH changes to take effect.
- Mac users may be prompted for their system password during install — this is expected and safe.
- If `node` is "not recognized," the most common cause is using an old terminal tab opened before the installer ran.

---

# Spec S0.2 — Create the Project with Vite

| Field | Value |
|-------|-------|
| **Spec** | S0.2 |
| **Phase** | 0 — Tools Setup |
| **Owner** | Solo |
| **Location** | `llm-playground/` (new project root) |
| **Depends On** | S0.1 (`done`) |
| **Status** | pending |

## Objective
Scaffold a working React + Vite project so there is a running dev server and a browser-visible "Hello World" page that hot-reloads on save.

## Scope
**In:** Running the Vite scaffolding command, `npm install`, confirming `npm run dev` serves the starter page, confirming hot reload works.
**Out:** Any custom UI, styling, or chat logic — those come in Phase 1+.

## Interface / Contract
```
npm create vite@latest llm-playground -- --template react
cd llm-playground && npm install && npm run dev
→ serves http://localhost:5173
```
Resulting file structure dependents rely on:
```
llm-playground/
├── src/App.jsx       ← main component, edited by nearly every later spec
├── src/main.jsx       ← app entry point
├── index.html
├── package.json       ← scripts: dev, build, preview
└── vite.config.js
```

## Dependencies & Assumptions
- Upstream specs: S0.1 `done` (Node.js + npm available)
- Libraries / data: `vite@latest`, React 18 template
- Thresholds: dev server must boot in well under 5 seconds (Vite default)

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given Node.js is installed, when I run `npm create vite@latest llm-playground -- --template react`, then a `llm-playground/` folder is created with the file structure above | integration |
| 2 | Given the project folder exists, when I run `npm install` inside it, then it exits with code 0 and creates `node_modules/` | integration |
| 3 | Given dependencies are installed, when I run `npm run dev`, then the terminal prints a local URL and the browser at that URL shows the Vite + React starter page | manual-acceptance |
| 4 | Given the dev server is running, when I edit text inside `src/App.jsx` and save, then the browser updates automatically within ~1 second without a manual refresh | manual-acceptance |

## Notes / Risks
- `node_modules/` must never be committed to Git — confirmed in S0.3.
- If port 5173 is already in use, Vite will automatically try 5174, etc. — not a bug.

---

# Spec S0.3 — Git Setup and First Push to GitHub

| Field | Value |
|-------|-------|
| **Spec** | S0.3 |
| **Phase** | 0 — Tools Setup |
| **Owner** | Solo |
| **Location** | `.git/`, `.gitignore`, GitHub remote |
| **Depends On** | S0.2 (`done`) |
| **Status** | pending |

## Objective
Put the project under version control and push it to a GitHub repository, so every subsequent spec's work is committed and recoverable, and `node_modules/` is correctly excluded.

## Scope
**In:** `git init`, `.gitignore`, first commit, creating a GitHub repo, `git push`.
**Out:** Branch protection rules, CI workflows (not needed for a solo beginner project), PR templates.

## Interface / Contract
```
git init
echo "node_modules/" >> .gitignore
git add .
git commit -m "S0.3(impl): initial project commit"
git remote add origin <github-url>
git push -u origin main
```

## Dependencies & Assumptions
- Upstream specs: S0.2 `done` (project folder exists)
- Libraries / data: Git CLI (already installed per user's existing setup), a GitHub account
- Thresholds: none

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given the project folder exists, when I run `git init`, then it exits with code 0 and creates a `.git/` folder | unit |
| 2 | Given `.gitignore` is created, when I open it, then it contains a `node_modules/` line | unit |
| 3 | Given changes are staged, when I run `git commit -m "S0.3(impl): initial project commit"`, then the commit succeeds | integration |
| 4 | Given a GitHub repo is created and remote is added, when I run `git push -u origin main`, then the files appear on github.com | manual-acceptance |
| 5 | Given the push succeeded, when I view the repo on GitHub, then `node_modules/` is NOT present in the file list | manual-acceptance |

## Notes / Risks
- Forgetting `.gitignore` before the first commit means `node_modules/` gets committed — if this happens, run `git rm -r --cached node_modules` to fix it.
- Use a private repo if you don't want the project public yet; it can be made public later for the README/portfolio phase (S11).

---

# Spec S0.4 — JavaScript for Python Developers

| Field | Value |
|-------|-------|
| **Spec** | S0.4 |
| **Phase** | 0 — Tools Setup |
| **Owner** | Solo |
| **Location** | `scratch/js-basics.js` (temporary scratch file — deleted after this spec) |
| **Depends On** | S0.1 (`done`) |
| **Status** | pending |

## Objective
Learn the six JavaScript patterns that appear in almost every line of this project — by reading a comparison to Python and then running each pattern in the terminal. After this spec, none of the syntax in Phase 1 will look foreign.

## Scope
**In:** `const`/`let`, arrow functions, `.map()`, async/await, destructuring, template literals — each explained with a Python equivalent and confirmed by running a tiny `node` script.
**Out:** DOM manipulation, React, npm packages — those come later. This spec is pure language mechanics.

## The 6 Patterns (Python → JavaScript)

| Python | JavaScript | Notes |
|--------|-----------|-------|
| `x = 5` | `const x = 5` | Use `const` by default; `let` only when the value must change |
| `def greet(name): return f"Hi {name}"` | `const greet = (name) => \`Hi ${name}\`` | Arrow function + template literal |
| `[x*2 for x in nums]` | `nums.map(x => x * 2)` | `.map()` is the JS list comprehension |
| `async def fetch(): await something()` | `async function fetch() { await something() }` | Same concept, different syntax |
| `a, b = pair` | `const [a, b] = pair` | Destructuring — unpacks arrays and objects |
| `data["key"]` | `const { key } = data` | Object destructuring — extracts fields by name |

## Interface / Contract
```js
// After this spec you can read and write these patterns without looking them up:
const double = (n) => n * 2
const nums = [1, 2, 3]
const doubled = nums.map(double)            // [2, 4, 6]
const [first, ...rest] = doubled            // first=2, rest=[4,6]
const { length } = doubled                  // length=3
const msg = `First doubled value: ${first}` // "First doubled value: 2"
```

## Dependencies & Assumptions
- Upstream specs: S0.1 `done` (Node.js installed — needed to run `node scratch/js-basics.js`)
- Libraries / data: none
- Thresholds: none

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given a scratch file with `const greet = (name) => \`Hello ${name}\`; console.log(greet("world"))`, when I run `node scratch/js-basics.js`, then the terminal prints `Hello world` | integration |
| 2 | Given `[1,2,3].map(x => x * 2)`, when logged, then the terminal prints `[2, 4, 6]` | integration |
| 3 | Given `const { length } = [1,2,3]`, when `length` is logged, then the terminal prints `3` | integration |
| 4 | Given an `async` function that awaits `Promise.resolve("done")`, when run, then the terminal prints `done` without error | integration |
| 5 | Given all four tests above pass, when I delete `scratch/js-basics.js`, then the project still runs — confirming no real code depended on the scratch file | unit |

## Notes / Risks
- This spec produces **no permanent project files** — the scratch file is deleted at the end. Its only output is your own understanding.
- If any of the `node` commands give a `SyntaxError`, re-read the pattern table above — 99% of errors at this stage are a missed backtick, brace, or parenthesis.

---

# Spec S0.5 — React Fundamentals

| Field | Value |
|-------|-------|
| **Spec** | S0.5 |
| **Phase** | 0 — Tools Setup |
| **Owner** | Solo |
| **Location** | `src/App.jsx` (temporary experiment — reverted at the end) |
| **Depends On** | S0.2 (`done`), S0.4 (`done`) |
| **Status** | pending |

## Objective
Understand what React is, what a component is, what JSX is, and what `useState` does — by adding a tiny counter to the running Vite app and watching it update live. Then revert the change so `App.jsx` is clean for Phase 1.

## Scope
**In:** A mental model of component, JSX, state, and re-render — confirmed by hands-on experiment in the live project.
**Out:** Multi-component architecture (Phase 3), hooks beyond `useState` (introduced when needed in later specs).

## The 4 Concepts

**1. Component** — a function that returns JSX (HTML-like code). React calls this function every time the screen needs to update.
```jsx
function App() {            // ← this is a component
  return <h1>Hello</h1>   // ← this is JSX
}
```

**2. JSX** — looks like HTML but it's JavaScript. Two key rules: use `className` instead of `class`; wrap all sibling elements in one parent tag.
```jsx
// ✅ valid JSX
<div className="box">
  <h1>Title</h1>
  <p>Body</p>
</div>
```

**3. useState** — stores a value that React watches. When the value changes, React redraws the component automatically.
```jsx
const [count, setCount] = useState(0)
// count   ← current value (read this)
// setCount ← function to change the value (call this)
```

**4. Re-render** — every time `setCount` (or any setter) is called, React re-runs the component function and updates only the parts of the page that changed. You never manually update the DOM.

## Interface / Contract
```jsx
// Experiment to add to App.jsx temporarily:
function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
// After confirming it works → revert App.jsx to the Vite default starter
```

## Dependencies & Assumptions
- Upstream specs: S0.2 `done` (Vite project running), S0.4 `done` (arrow functions and destructuring understood)
- Libraries / data: React 18 (already installed by S0.2)
- Thresholds: none

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given the counter code is added to `App.jsx`, when `npm run dev` is running and I open the browser, then I see "Count: 0" and a button | manual-acceptance |
| 2 | Given I click the button 3 times, when I check the screen, then it shows "Count: 3" — confirming useState is working | manual-acceptance |
| 3 | Given the button is clicked, when I watch the page, then only the number updates — the rest of the page does not flicker — confirming React's partial re-render | manual-acceptance |
| 4 | Given the experiment is confirmed, when I revert `App.jsx` to the Vite default and save, then the dev server still shows the starter page without errors | manual-acceptance |

## Notes / Risks
- This spec is **read + experiment + revert** — its output is understanding, not code. Phase 1 starts with a clean `App.jsx`.
- If you feel confused after this spec, re-read "The 4 Concepts" section above before moving to S1.1. These 4 ideas underpin every spec from here to S11.3.

---

# Spec S1.1 — HTML Skeleton

| Field | Value |
|-------|-------|
| **Spec** | S1.1 |
| **Phase** | 1 — First Web Page |
| **Owner** | Solo |
| **Location** | `src/App.jsx` |
| **Depends On** | S0.2 (`done`), S0.3 (`done`) |
| **Status** | pending |

## Objective
Replace the default Vite starter markup with a minimal skeleton containing a text input, a send button, and a response display area — the three elements every later spec builds on.

## Scope
**In:** Static HTML/JSX elements only — input, button, response container.
**Out:** Any click behaviour (S1.2), styling (S1.3), or API calls (Phase 2).

## Interface / Contract
`App.jsx` must render three elements with stable identifiers for later specs to hook into:
```jsx
<input id="user-input" type="text" />
<button id="send-button">Send</button>
<div id="response-area"></div>
```

## Dependencies & Assumptions
- Upstream specs: S0.2 `done` (project scaffolded), S0.3 `done` (work can be committed)
- Libraries / data: none beyond React itself
- Thresholds: none

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given `App.jsx` is edited, when the page loads, then a text `<input>` is visible | manual-acceptance |
| 2 | Given the page is loaded, when I inspect the DOM, then a `<button>` with visible text ("Send") exists | manual-acceptance |
| 3 | Given the page is loaded, when I inspect the DOM, then a response container element exists (initially empty) | manual-acceptance |
| 4 | Given the new markup is in place, when I run `npm run dev`, then the dev server still starts with no console errors | integration |

## Notes / Risks
- Keep this spec purely structural — resist the urge to add styling or logic; that's explicitly out of scope and belongs to S1.2/S1.3.

---

# Spec S1.2 — JavaScript Click Handler

| Field | Value |
|-------|-------|
| **Spec** | S1.2 |
| **Phase** | 1 — First Web Page |
| **Owner** | Solo |
| **Location** | `src/App.jsx` |
| **Depends On** | S1.1 (`done`) |
| **Status** | pending |

## Objective
Wire the Send button to an onClick handler that reads the input value and displays it in the response area, proving the basic event-driven interaction pattern before any real AI call is introduced.

## Scope
**In:** `onClick` handler, reading input value via React state, writing it to the response area, clearing/guarding on empty input.
**Out:** Any network calls (that's Phase 2); styling (S1.3).

## Interface / Contract
```jsx
function handleSend(): void
// reads input state, if non-empty writes it into response state, else no-op
```

## Dependencies & Assumptions
- Upstream specs: S1.1 `done` (input, button, response area exist)
- Libraries / data: React `useState` only
- Thresholds: none

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given I type "hello" in the input, when I click Send, then "hello" appears in the response area | manual-acceptance |
| 2 | Given the input is empty, when I click Send, then nothing changes (no crash, no blank write) | manual-acceptance |
| 3 | Given I send "hello" then type "world" and send again, when I check the response area, then it shows "world" (replaced, not appended) | manual-acceptance |
| 4 | Given any of the above interactions, when I open browser DevTools console, then no errors are logged | manual-acceptance |

## Notes / Risks
- This spec intentionally just "echoes" input — it's a placeholder pattern for where the real AI response will be inserted in S2.2.

---

# Spec S1.3 — Basic Tailwind Styling

| Field | Value |
|-------|-------|
| **Spec** | S1.3 |
| **Phase** | 1 — First Web Page |
| **Owner** | Solo |
| **Location** | `tailwind.config.js`, `src/index.css`, `src/App.jsx` |
| **Depends On** | S1.2 (`done`) |
| **Status** | pending |

## Objective
Install Tailwind CSS and apply enough utility classes to the existing skeleton so the page looks like a centred, readable, intentional UI rather than unstyled browser defaults.

## Scope
**In:** Tailwind install/config, applying classes to the input/button/response-area from S1.1–S1.2.
**Out:** Dark mode (S9.1), mobile responsiveness (S9.2), sidebar layout (S4.1).

## Interface / Contract
```
npm install -D tailwindcss postcss autoprefixer
// tailwind.config.js content: ["./src/**/*.{js,jsx}"]
// src/index.css contains @tailwind base/components/utilities
```

## Dependencies & Assumptions
- Upstream specs: S1.2 `done` (click handler functioning)
- Libraries / data: `tailwindcss`, `postcss`, `autoprefixer`
- Thresholds: none

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given Tailwind is installed, when I run `npm install -D tailwindcss postcss autoprefixer`, then it exits with code 0 | integration |
| 2 | Given `tailwind.config.js` exists, when I open it, then `content` includes `./src/**/*.{js,jsx}` | unit |
| 3 | Given a utility class like `bg-blue-500` is applied to an element, when the page renders, then that element visibly shows the blue background | manual-acceptance |
| 4 | Given styling is applied, when I view the page, then it is centred on screen with a bordered input and a coloured button | manual-acceptance |
| 5 | Given styling changes are in place, when I repeat the S1.2 click test, then the echo behaviour still works correctly | manual-acceptance |

## Notes / Risks
- Keep styling minimal and functional here — visual polish is intentionally deferred to Phase 9.

---

# Spec S2.1 — Get Free API Keys (Groq, Gemini, OpenRouter)

| Field | Value |
|-------|-------|
| **Spec** | S2.1 |
| **Phase** | 2 — Connect to Free AI |
| **Owner** | Solo |
| **Location** | N/A (external account setup, no repo files) |
| **Depends On** | S0.1 (`done`) |
| **Status** | pending |

## Objective
Obtain a working, free API key from all three providers used in this project (Groq, Gemini, OpenRouter) and confirm each is valid via a `curl` test. Getting all three keys here means S4.3's provider switcher and S7.2's parallel calls will work without a separate setup detour later.

## Scope
**In:** Account creation and key generation for Groq, Google AI Studio (Gemini), and OpenRouter; validation via curl for each.
**Out:** Storing keys in the app (done via the browser key-input field built in S2.2), any UI for key entry.

## Interface / Contract
```bash
# Groq
curl https://api.groq.com/openai/v1/chat/completions \
  -H "Authorization: Bearer $GROQ_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"llama-3.3-70b-versatile","messages":[{"role":"user","content":"hi"}]}'
→ 200 OK, choices[0].message.content has text

# Gemini (via OpenAI-compatible endpoint)
curl https://generativelanguage.googleapis.com/v1beta/openai/chat/completions \
  -H "Authorization: Bearer $GEMINI_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-2.0-flash","messages":[{"role":"user","content":"hi"}]}'
→ 200 OK, choices[0].message.content has text

# OpenRouter
curl https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $OPENROUTER_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"meta-llama/llama-3.3-70b-instruct:free","messages":[{"role":"user","content":"hi"}]}'
→ 200 OK, choices[0].message.content has text
```

## Dependencies & Assumptions
- Upstream specs: S0.1 `done` (terminal/curl available — curl ships with most OSes)
- Libraries / data: free accounts at console.groq.com, aistudio.google.com, openrouter.ai
- Thresholds: Groq key starts with `gsk_`; Gemini key starts with `AIza`; OpenRouter key starts with `sk-or-`

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given I sign up at console.groq.com and generate a key, when I run the Groq curl command, then I get a 200 response with AI text | integration |
| 2 | Given I sign up at aistudio.google.com and generate a key, when I run the Gemini curl command, then I get a 200 response with AI text | integration |
| 3 | Given I sign up at openrouter.ai and generate a key, when I run the OpenRouter curl command, then I get a 200 response with AI text | integration |
| 4 | Given all three keys work, when I store them, then each is saved outside of any Git-tracked file (password manager or local `.env` not committed to GitHub) | manual-acceptance |

## Notes / Risks
- **Never commit any key to GitHub.** If you do, revoke it immediately in the provider's dashboard and generate a new one.
- All three providers have free tiers sufficient for this project — no credit card required.
- OpenRouter's free models have a `:free` suffix in the model name. Without it you may be charged.

---

# Spec S2.2 — First Real AI API Call

| Field | Value |
|-------|-------|
| **Spec** | S2.2 |
| **Phase** | 2 — Connect to Free AI |
| **Owner** | Solo |
| **Location** | `src/App.jsx` |
| **Depends On** | S2.1 (`done`), S1.2 (`done`) |
| **Status** | pending |

## Objective
Replace the echo behaviour from S1.2 with a real `fetch()` call to the Groq API, so the response area shows an actual AI-generated reply instead of the user's own text.

## Scope
**In:** `fetch()` POST to Groq's `/v1/chat/completions`, an input field for the API key, loading state on the button while waiting.
**Out:** Robust error handling (S2.3), multi-message history (S3.1/S3.2).

## Interface / Contract
```js
async function sendToGroq(apiKey: string, userMessage: string): Promise<string>
// POST https://api.groq.com/openai/v1/chat/completions
// body: { model: "llama-3.3-70b-versatile", messages: [{role:"user", content: userMessage}] }
// returns: response.choices[0].message.content
```

## Dependencies & Assumptions
- Upstream specs: S2.1 `done` (valid key in hand), S1.2 `done` (click handler exists to extend)
- Libraries / data: native `fetch`, no extra npm package needed
- Thresholds: response should arrive within ~5 seconds under normal conditions

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given a valid API key is entered and "What is 2+2?" is typed, when I click Send, then a fetch request is sent to Groq's endpoint (visible in DevTools Network tab) | integration |
| 2 | Given the request succeeds, when the response arrives, then the response area shows "4" or a similar correct answer within 5 seconds | manual-acceptance |
| 3 | Given a request is in flight, when I look at the Send button, then it shows a loading/disabled state | manual-acceptance |
| 4 | Given the response has arrived, when I look at the Send button, then it returns to its normal clickable state | manual-acceptance |

## Notes / Risks
- This spec has zero error handling by design — that is deliberately deferred to S2.3 so each spec stays atomic.

---

# Spec S2.3 — API Error Handling

| Field | Value |
|-------|-------|
| **Spec** | S2.3 |
| **Phase** | 2 — Connect to Free AI |
| **Owner** | Solo |
| **Location** | `src/App.jsx`, `src/lib/apiError.js` |
| **Depends On** | S2.2 (`done`) |
| **Status** | pending |

## Objective
Wrap the S2.2 fetch call with handling for the three most common failure modes (missing key, invalid key, no internet) so the app never crashes silently and always shows the user a clear, actionable message.

## Scope
**In:** Try/catch around the fetch, distinguishing 401 (bad key), network failure, and empty-key client-side validation.
**Out:** Rate-limit-specific UX (covered generically here, refined in S9.3), retry button (S9.3).

## Interface / Contract
```js
function normaliseError(error): { message: string, type: 'missing_key' | 'invalid_key' | 'network' | 'unknown' }
```

## Dependencies & Assumptions
- Upstream specs: S2.2 `done` (fetch call exists to wrap)
- Libraries / data: native `fetch` error shapes, HTTP status codes
- Thresholds: none

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given the API key field is empty, when I click Send, then I see "Please enter your API key" and no request is sent | manual-acceptance |
| 2 | Given an invalid key like "abc123" is entered, when I click Send, then I see "Invalid API key — check your Groq key" | manual-acceptance |
| 3 | Given the network is disconnected, when I click Send, then I see "No internet connection — check your network" | manual-acceptance |
| 4 | Given any error message is shown, when I start typing in the input again, then the error message clears | manual-acceptance |

## Notes / Risks
- Wifi-off testing must be done manually (no automated way to simulate this in a simple beginner setup) — note the result in the checklist by hand.

---

# Spec S3.1 — App Component Architecture Checkpoint

| Field | Value |
|-------|-------|
| **Spec** | S3.1 |
| **Phase** | 3 — Proper Chat UI |
| **Owner** | Solo |
| **Location** | `src/App.jsx` |
| **Depends On** | S0.2 (`done`), S2.2 (`done`) |
| **Status** | pending |

## Objective
By now `App.jsx` has accumulated logic from Phases 1 and 2 — input state, click handling, fetch call, loading state, error state — all in one function. Before splitting into `MessageThread` and `ChatInput` in S3.2/S3.3, clean up `App.jsx` so each piece of state and each handler has a single, clear purpose. This makes the splits in S3.2/S3.3 straightforward rather than tangled.

## Scope
**In:** Audit `App.jsx` for clarity — rename vague variables, group related state together, extract any inline logic into a clearly-named handler function if it isn't already. No new features.
**Out:** Creating child components (S3.2, S3.3); anything to do with learning React basics (that was S0.5).

## Interface / Contract
```jsx
function App() {
  // state: one const per concern (input, response, loading, error)
  const [input, setInput] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // handlers: one function per action, clearly named
  async function handleSend() { /* calls Groq API from S2.2 */ }

  return ( /* JSX — still a single component, not split yet */ )
}
export default App
```

## Dependencies & Assumptions
- Upstream specs: S0.2 `done` (React project exists), S2.2 `done` (real AI call works and is the main logic to organise)
- Libraries / data: React 18 only
- Thresholds: none

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given `App.jsx` after cleanup, when I read it, then every `useState` variable has a name that explains what it holds (no `val`, `data`, `stuff`) | unit |
| 2 | Given `App.jsx` after cleanup, when I read it, then the API call lives in a clearly-named async function (e.g. `handleSend`), not inline in the JSX | unit |
| 3 | Given the refactored `App.jsx`, when I run `npm run dev`, then the page still renders without console errors | manual-acceptance |
| 4 | Given the page renders, when I repeat the S2.2 send flow (enter key, click Send, see AI reply), then it still works exactly as before | manual-acceptance |

## Notes / Risks
- This is a refactor checkpoint, not new functionality. If the app already has clear variable names and a clean handler from your Phase 1/2 work, this spec is a quick review pass, not a rewrite.
- The payoff for doing this carefully is that S3.2 and S3.3 — where you split `App.jsx` into components — will feel natural instead of confusing.

---

# Spec S3.2 — Message Thread Component

| Field | Value |
|-------|-------|
| **Spec** | S3.2 |
| **Phase** | 3 — Proper Chat UI |
| **Owner** | Solo |
| **Location** | `src/components/MessageThread.jsx`, `src/store/chatStore.js` |
| **Depends On** | S3.1 (`done`) |
| **Status** | pending |

## Objective
Build a scrollable message thread that stores and displays a growing list of user/assistant messages with distinct visual styling per role, replacing the single-response echo from earlier specs.

## Scope
**In:** Message list state (`useReducer` or `useState` array), `MessageThread` component rendering user (right-aligned) vs AI (left-aligned) bubbles, auto-scroll to latest.
**Out:** The input box itself (S3.3), API wiring (already exists from S2.2, reused here).

## Interface / Contract
```js
// message shape
{ role: 'user' | 'assistant', content: string, timestamp: number }

// component
<MessageThread messages={Message[]} />
```

## Dependencies & Assumptions
- Upstream specs: S3.1 `done` (App is a clean component)
- Libraries / data: React state only
- Thresholds: none

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given `MessageThread.jsx` is created, when imported, then it exports a valid component | unit |
| 2 | Given a user message is added, when rendered, then it appears right-aligned with a distinct background colour | manual-acceptance |
| 3 | Given an assistant message is added, when rendered, then it appears left-aligned with a different background colour | manual-acceptance |
| 4 | Given message A then message B are added, when I view the thread, then B appears below A (append, not replace) | manual-acceptance |
| 5 | Given a new message arrives, when the thread updates, then it auto-scrolls to show the latest message | manual-acceptance |

## Notes / Risks
- Each message needs a stable unique key (e.g. timestamp or incrementing id) to avoid React list-rendering warnings.

---

# Spec S3.3 — Chat Input Component

| Field | Value |
|-------|-------|
| **Spec** | S3.3 |
| **Phase** | 3 — Proper Chat UI |
| **Owner** | Solo |
| **Location** | `src/components/ChatInput.jsx` |
| **Depends On** | S3.2 (`done`), S2.2 (`done`) |
| **Status** | pending |

## Objective
Build a proper chat input component (auto-resizing textarea, Enter-to-send, Shift+Enter-for-newline) that appends to the `MessageThread` and triggers the Groq API call, completing the full type → send → reply loop.

## Scope
**In:** Textarea with keybindings, send button, disabled state while loading, "Thinking..." indicator in the thread.
**Out:** Generation controls/sliders (Phase 4), multi-provider support (S4.3).

## Interface / Contract
```jsx
<ChatInput onSend={(text: string) => void} disabled={boolean} />
```

## Dependencies & Assumptions
- Upstream specs: S3.2 `done` (thread exists to append into), S2.2 `done` (API call exists to trigger)
- Libraries / data: React state only
- Thresholds: none

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given text is typed and Enter is pressed (no Shift), when the event fires, then the message sends (same as clicking Send) | manual-acceptance |
| 2 | Given text is typed and Shift+Enter is pressed, when the event fires, then a newline is added instead of sending | manual-acceptance |
| 3 | Given a message is sent, when I check the input, then it is cleared to empty | manual-acceptance |
| 4 | Given a request is in flight, when I check the Send button, then it is disabled | manual-acceptance |
| 5 | Given a request is in flight, when I check the thread, then an animated "Thinking..." indicator is visible | manual-acceptance |

## Notes / Risks
- This spec is the first point where the full chat loop (type → send → AI reply in thread) is demonstrably complete — good milestone to pause and celebrate.

---

# Spec S4.1 — Sidebar Layout

| Field | Value |
|-------|-------|
| **Spec** | S4.1 |
| **Phase** | 4 — Generation Controls |
| **Owner** | Solo |
| **Location** | `src/App.jsx`, `src/components/Sidebar.jsx` |
| **Depends On** | S3.3 (`done`) |
| **Status** | pending |

## Objective
Split the page into a two-column layout — a narrower left sidebar for controls and a wider right column for the chat — so future control specs (S4.2, S4.3) have a dedicated home.

## Scope
**In:** Two-column CSS grid/flex layout, a labelled sidebar container ("Controls" heading), moving existing chat components into the right column.
**Out:** The actual sliders/controls themselves (S4.2, S4.3).

## Interface / Contract
```jsx
<div className="app-layout">
  <Sidebar>{/* controls go here in later specs */}</Sidebar>
  <main>{/* MessageThread + ChatInput from S3.2/S3.3 */}</main>
</div>
```

## Dependencies & Assumptions
- Upstream specs: S3.3 `done` (chat loop functioning)
- Libraries / data: Tailwind CSS grid/flex utilities
- Thresholds: sidebar ≈ 1/3 width, chat ≈ 2/3 width

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given the new layout, when the page loads, then two columns are visible — sidebar left, chat right | manual-acceptance |
| 2 | Given both columns are visible, when measured, then the sidebar is narrower than the chat column | manual-acceptance |
| 3 | Given the layout change, when I repeat the S3.3 chat loop, then it still works correctly inside the right column | manual-acceptance |
| 4 | Given the sidebar, when I look at it, then it has a visible "Controls" heading | manual-acceptance |

## Notes / Risks
- Mobile responsiveness for this layout is explicitly deferred to S9.2 — desktop-only is acceptable here.

---

# Spec S4.2 — Temperature Slider

| Field | Value |
|-------|-------|
| **Spec** | S4.2 |
| **Phase** | 4 — Generation Controls |
| **Owner** | Solo |
| **Location** | `src/components/controls/TemperatureSlider.jsx` |
| **Depends On** | S4.1 (`done`) |
| **Status** | pending |

## Objective
Add a temperature slider (0–2) in the sidebar that is wired into the existing Groq fetch call's `temperature` parameter, letting the user directly observe how randomness affects AI output.

## Scope
**In:** Range input (min 0, max 2, step 0.1), live numeric readout, passing the value into the request body from S2.2.
**Out:** Top-p / max-tokens (S4.3), provider switching (S4.3).

## Interface / Contract
```jsx
<TemperatureSlider value={number} onChange={(v: number) => void} />
// value flows into the fetch body: { ..., temperature: value }
```

## Dependencies & Assumptions
- Upstream specs: S4.1 `done` (sidebar exists)
- Libraries / data: React state
- Thresholds: range 0–2.0, step 0.1, default 0.7

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given the sidebar, when I look for the slider, then a range input with min=0, max=2, step=0.1 exists | unit |
| 2 | Given I move the slider, when the value changes, then a numeric readout next to it updates live (e.g. "0.7") | manual-acceptance |
| 3 | Given a temperature value is set, when I send a message, then the request body's `temperature` field matches the slider value (check DevTools Network tab) | integration |
| 4 | Given temperature is set to 0.1, when I ask "Tell me a joke" and compare to temperature 1.8 with the same prompt, then the two responses are noticeably different | manual-acceptance |

## Notes / Risks
- AI responses are non-deterministic even at the same temperature, so test #4 should be evaluated qualitatively (is there a visible style/randomness difference), not for an exact match.

---

# Spec S4.3 — Top-p Slider

| Field | Value |
|-------|-------|
| **Spec** | S4.3 |
| **Phase** | 4 — Generation Controls |
| **Owner** | Solo |
| **Location** | `src/components/controls/TopPSlider.jsx` |
| **Depends On** | S4.2 (`done`) |
| **Status** | pending |

## Objective
Add a top-p (nucleus sampling) slider to the sidebar and wire it into the Groq API call, so the user can control how the AI narrows its word choices — and understand how top-p differs from temperature.

## Scope
**In:** Range input (0.1–1.0, step 0.05), live numeric readout, `top_p` field added to the fetch request body.
**Out:** Max tokens slider (S4.4), provider switching (S4.5).

## Background — Top-p vs Temperature
Temperature controls *how random* the AI is overall. Top-p controls *how many words* the AI considers: at top-p 0.1 it only looks at the top 10% most-likely words; at top-p 1.0 it considers everything. They work together — you usually set one and leave the other at its default.

## Interface / Contract
```jsx
<TopPSlider value={number} onChange={(v: number) => void} />
// value flows into the fetch body: { ..., top_p: value }
// default: 0.9
```

## Dependencies & Assumptions
- Upstream specs: S4.2 `done` (temperature slider pattern established — this spec follows the same pattern)
- Libraries / data: React state only
- Thresholds: range 0.1–1.0, step 0.05, default 0.9

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given the sidebar, when I look for the top-p slider, then a range input with min=0.1, max=1.0, step=0.05 exists | unit |
| 2 | Given I move the slider, when the value changes, then a numeric readout next to it updates live (e.g. "0.90") | manual-acceptance |
| 3 | Given a top-p value is set, when I send a message, then the request body's `top_p` field matches the slider value (check DevTools Network tab) | integration |
| 4 | Given top-p is set to 0.1, when I compare a response to top-p 1.0 on the same prompt, then the low top-p response feels more predictable/repetitive | manual-acceptance |

## Notes / Risks
- Many providers ignore `top_p` when `temperature` is also set — Groq follows the OpenAI convention of using whichever is not the default. For this project, sending both is fine; the provider picks the right behaviour.

---

# Spec S4.4 — Max Tokens Slider

| Field | Value |
|-------|-------|
| **Spec** | S4.4 |
| **Phase** | 4 — Generation Controls |
| **Owner** | Solo |
| **Location** | `src/components/controls/MaxTokensSlider.jsx` |
| **Depends On** | S4.3 (`done`) |
| **Status** | pending |

## Objective
Add a max tokens slider to the sidebar and wire it into the API call, giving the user direct control over how long the AI's response can be — and making the concept of token-length limits visible.

## Scope
**In:** Range input (64–2048, step 64), live numeric readout, `max_tokens` field added to the fetch request body.
**Out:** Provider switching (S4.5).

## Interface / Contract
```jsx
<MaxTokensSlider value={number} onChange={(v: number) => void} />
// value flows into the fetch body: { ..., max_tokens: value }
// default: 512
```

## Dependencies & Assumptions
- Upstream specs: S4.3 `done` (top-p slider pattern established — this follows the same pattern again)
- Libraries / data: React state only
- Thresholds: range 64–2048, step 64, default 512

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given the sidebar, when I look for the max tokens slider, then a range input with min=64, max=2048, step=64 exists | unit |
| 2 | Given I move the slider, when the value changes, then a numeric readout next to it updates live (e.g. "512 tokens") | manual-acceptance |
| 3 | Given a max tokens value is set, when I send a message, then the request body's `max_tokens` field matches the slider value (check DevTools Network tab) | integration |
| 4 | Given max tokens is set to 64, when I ask "Explain quantum physics", then the response is cut short mid-answer — confirming the cap works | manual-acceptance |

## Notes / Risks
- Setting max tokens very low (e.g. 64) will cause the AI to stop mid-sentence — this is expected behaviour, not a bug. It is actually a useful demonstration of what `max_tokens` does.

---

# Spec S4.5 — Provider Picker

| Field | Value |
|-------|-------|
| **Spec** | S4.5 |
| **Phase** | 4 — Generation Controls |
| **Owner** | Solo |
| **Location** | `src/components/controls/ProviderSelector.jsx`, `src/lib/providers.js` |
| **Depends On** | S4.4 (`done`) |
| **Status** | pending |

## Objective
Add a provider dropdown that lets the user switch between Groq, Gemini, and OpenRouter. Selecting a different provider changes the API base URL and the model name sent in the request — making it possible to compare providers informally before Phase 7 builds proper side-by-side comparison.

## Scope
**In:** Dropdown with three provider options, a `providers.js` config mapping each provider to its base URL and a default free model, separate key-input fields per provider, switching the active provider wires all sliders to the new endpoint.
**Out:** Sending to both providers simultaneously (that's Phase 7's `Promise.allSettled` approach).

## Interface / Contract
```js
// src/lib/providers.js
export const PROVIDERS = {
  groq:        { baseUrl: 'https://api.groq.com/openai/v1',                    model: 'llama-3.3-70b-versatile' },
  gemini:      { baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai', model: 'gemini-2.0-flash' },
  openrouter:  { baseUrl: 'https://openrouter.ai/api/v1',                      model: 'meta-llama/llama-3.3-70b-instruct:free' },
}
```
```jsx
<ProviderSelector provider={'groq'|'gemini'|'openrouter'} onChange={(p) => void} />
```

## Dependencies & Assumptions
- Upstream specs: S4.4 `done` (all sliders built — provider switch must carry all slider values to the new endpoint)
- Libraries / data: API keys from S2.1 (all three already obtained); native `fetch`
- Thresholds: none

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given the sidebar, when I look at the provider dropdown, then it lists Groq, Gemini, and OpenRouter | unit |
| 2 | Given I select Gemini and send a message, when I check DevTools Network tab, then the request goes to `generativelanguage.googleapis.com` — not Groq's URL | integration |
| 3 | Given I select OpenRouter and send a message, when I check DevTools, then the request goes to `openrouter.ai` with a `:free` model name | integration |
| 4 | Given I switch provider, when I check the slider values, then temperature / top-p / max-tokens are still at my chosen settings (not reset) | manual-acceptance |
| 5 | Given I switch from Groq to Gemini mid-conversation, when I send a new message, then the new reply comes from Gemini (different provider, possibly different style) | manual-acceptance |

## Notes / Risks
- Each provider needs its own API key. The simplest UX is three separate key inputs in the sidebar (one per provider), with only the active provider's key sent. Keys entered in the browser are never stored server-side.

---

# Spec S5.1 — Tokeniser Logic

| Field | Value |
|-------|-------|
| **Spec** | S5.1 |
| **Phase** | 5 — Tokeniser Demo |
| **Owner** | Solo |
| **Location** | `src/lib/tokeniser.js` |
| **Depends On** | S0.1 (`done`) |
| **Status** | pending |

## Objective
Wrap the `gpt-tokenizer` npm package in a small, tested function that splits any input string into BPE tokens, providing the pure-logic foundation for the visual tokeniser demo in S5.2.

## Scope
**In:** `npm install gpt-tokenizer`, a `tokenise(text)` function, Vitest unit tests covering empty/simple/complex strings.
**Out:** Any UI rendering (S5.2).

## Interface / Contract
```js
function tokenise(text: string): Array<{ token: string, id: number }>
```

## Dependencies & Assumptions
- Upstream specs: S0.1 `done` (npm available)
- Libraries / data: `gpt-tokenizer` (npm, BPE-based, matches OpenAI's tokeniser approach closely enough for educational purposes)
- Thresholds: none

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given `gpt-tokenizer` is installed, when I run `npm install gpt-tokenizer`, then it exits with code 0 | integration |
| 2 | Given `tokenise("Hello world")` is called, when the result returns, then it contains exactly 2 token objects | unit |
| 3 | Given `tokenise("Unbelievable")` is called, when the result returns, then it contains 3 or more tokens (demonstrating sub-word splitting) | unit |
| 4 | Given `tokenise("")` is called, when the result returns, then it is an empty array and no error is thrown | unit |
| 5 | Given all tests above are written, when I run `npm run test`, then all pass with zero failures | integration |

## Notes / Risks
- `gpt-tokenizer` approximates GPT-style BPE; exact token counts may differ slightly from Llama/Gemini's actual tokenisers, but the demo is for educational illustration, not production accuracy.

---

# Spec S5.2 — Tokeniser UI

| Field | Value |
|-------|-------|
| **Spec** | S5.2 |
| **Phase** | 5 — Tokeniser Demo |
| **Owner** | Solo |
| **Location** | `src/components/TokeniserDemo.jsx` |
| **Depends On** | S5.1 (`done`), S3.1 (`done`) |
| **Status** | pending |

## Objective
Render the S5.1 `tokenise()` output as live, colour-coded token chips as the user types, making the abstract concept of tokenisation visually concrete.

## Scope
**In:** Text input, debounced live tokenisation (~150ms), alternating chip colours, space-as-middle-dot rendering, token count badge.
**Out:** The tokeniser algorithm itself (already built in S5.1).

## Interface / Contract
```jsx
<TokeniserDemo /> // self-contained, no required props
```

## Dependencies & Assumptions
- Upstream specs: S5.1 `done` (tokenise function), S3.1 `done` (component pattern established)
- Libraries / data: `tokenise()` from S5.1
- Thresholds: debounce ~150ms

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given I type in the demo input, when ~150ms passes, then coloured token chips appear matching the typed text | manual-acceptance |
| 2 | Given multiple tokens are shown, when I compare adjacent chips, then they alternate between at least 2 distinct background colours | manual-acceptance |
| 3 | Given a token contains a space, when rendered, then the space is shown as a `·` character | manual-acceptance |
| 4 | Given text is typed, when chips render, then a token count badge (e.g. "5 tokens") updates to match | manual-acceptance |
| 5 | Given I clear the input, when the field is empty, then all chips disappear and the counter resets to 0 | manual-acceptance |

## Notes / Risks
- This component must work fully offline — it should never call any external API, reinforcing that tokenisation happens locally before any model call.

---

# Spec S6.1 — React Router Setup

| Field | Value |
|-------|-------|
| **Spec** | S6.1 |
| **Phase** | 6 — Learn Concepts Panel |
| **Owner** | Solo |
| **Location** | `src/App.jsx`, `src/routes/` |
| **Depends On** | S3.1 (`done`) |
| **Status** | pending |

## Objective
Install React Router and introduce `/chat` and `/learn` routes with a shared nav bar, establishing the multi-page structure that Phases 6–8 build into.

## Scope
**In:** `react-router-dom` install, `/` (Chat) and `/learn` (placeholder) routes, nav bar with links.
**Out:** Learn panel content itself (S6.2–S6.4), `/compare` and `/evaluate` routes (Phase 7/8 add these).

## Interface / Contract
```jsx
<BrowserRouter>
  <NavBar />
  <Routes>
    <Route path="/" element={<ChatRoute />} />
    <Route path="/learn" element={<LearnRoute />} />
  </Routes>
</BrowserRouter>
```

## Dependencies & Assumptions
- Upstream specs: S3.1 `done` (App is a clean component to wrap)
- Libraries / data: `react-router-dom` v6
- Thresholds: none

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given `react-router-dom` is installed, when I run `npm install react-router-dom`, then it exits with code 0 | integration |
| 2 | Given routing is set up, when I navigate to `/`, then the Chat view (from Phase 3/4) renders | manual-acceptance |
| 3 | Given routing is set up, when I navigate to `/learn`, then a placeholder Learn view renders (even just "Coming soon") | manual-acceptance |
| 4 | Given the app loads, when I look at the nav bar, then links to Chat and Learn are visible on every page | manual-acceptance |
| 5 | Given I click a nav link, when the URL changes, then the page content updates without a full browser reload | manual-acceptance |

## Notes / Risks
- This spec unblocks S6.2, S6.3, S6.4 (which can be built independently/in parallel once routing exists) and S7.1 (Compare route).

---

# Spec S6.2 — Pre-training Explainer Panel

| Field | Value |
|-------|-------|
| **Spec** | S6.2 |
| **Phase** | 6 — Learn Concepts Panel |
| **Owner** | Solo |
| **Location** | `src/components/learn/PreTrainingPanel.jsx` |
| **Depends On** | S6.1 (`done`) |
| **Status** | pending |

## Objective
Build the Pre-training tab of the Learn route with four explainer cards (Data Collection, Data Cleaning, Tokenisation, Architecture) in plain language, linking the Tokenisation card to the live demo from S5.2.

## Scope
**In:** Four content cards with headings + 2+ sentences each, embedding/linking the S5.2 tokeniser demo.
**Out:** Post-training, Evaluation, Generation tabs (S6.3, S6.4).

## Interface / Contract
```jsx
<PreTrainingPanel /> // renders inside the /learn route's Pre-training tab
```

## Dependencies & Assumptions
- Upstream specs: S6.1 `done` (routing + tab bar exist), S5.2 `done` recommended (tokeniser demo to embed) — note: if S5.2 isn't done yet, link can point forward and be wired once it is
- Libraries / data: none beyond existing components
- Thresholds: none

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given I open `/learn`, when I view the tab bar, then "Pre-training" is the first tab | manual-acceptance |
| 2 | Given I'm on the Pre-training tab, when I scroll, then 4 cards are visible: Data Collection, Data Cleaning, Tokenisation, Architecture | manual-acceptance |
| 3 | Given each card, when I read it, then it has a heading and at least 2 sentences of plain-English explanation | manual-acceptance |
| 4 | Given the Tokenisation card, when I interact with it, then it links to or embeds the S5.2 tokeniser demo | manual-acceptance |

## Notes / Risks
- Content accuracy matters here — Architecture card should correctly name Transformers as the shared design behind GPT, Llama, Gemini, DeepSeek, Qwen, and Gemma.

---

# Spec S6.3 — Post-training Explainer Panel

| Field | Value |
|-------|-------|
| **Spec** | S6.3 |
| **Phase** | 6 — Learn Concepts Panel |
| **Owner** | Solo |
| **Location** | `src/components/learn/PostTrainingPanel.jsx` |
| **Depends On** | S6.1 (`done`) |
| **Status** | pending |

## Objective
Build the Post-training tab with four explainer cards (SFT, RLHF, PPO, Verifiable Tasks) so users understand how a raw pre-trained model becomes a helpful assistant.

## Scope
**In:** Four content cards, a simple step diagram (raw model → SFT → RLHF → deployed assistant).
**Out:** Pre-training, Evaluation, Generation tabs.

## Interface / Contract
```jsx
<PostTrainingPanel /> // renders inside the /learn route's Post-training tab
```

## Dependencies & Assumptions
- Upstream specs: S6.1 `done` (routing + tab bar exist)
- Libraries / data: none
- Thresholds: none

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given I open `/learn`, when I click the Post-training tab, then it renders | manual-acceptance |
| 2 | Given I'm on the Post-training tab, when I scroll, then 4 cards are visible: SFT, RLHF, PPO, Verifiable Tasks | manual-acceptance |
| 3 | Given each card, when I read it, then it has a heading and at least 2 sentences of plain-English explanation | manual-acceptance |
| 4 | Given I switch to Post-training then back to Pre-training, when I check the Pre-training tab, then its content (from S6.2) is unchanged/intact | manual-acceptance |

## Notes / Risks
- Can be built in parallel with S6.4 once S6.1 is done — no dependency between the two.

---

# Spec S6.4 — Evaluation and Text Generation Panels

| Field | Value |
|-------|-------|
| **Spec** | S6.4 |
| **Phase** | 6 — Learn Concepts Panel |
| **Owner** | Solo |
| **Location** | `src/components/learn/EvaluationPanel.jsx`, `src/components/learn/GenerationPanel.jsx` |
| **Depends On** | S6.1 (`done`) |
| **Status** | pending |

## Objective
Complete the Learn route by adding the Evaluation tab (Traditional Metrics, Benchmarks, Human Eval & Leaderboards) and the Text Generation tab (Greedy, Beam Search, Top-k, Top-p), embedding an interactive probability visual in the latter.

## Scope
**In:** Two new tabs with their content cards, an embedded/simplified probability bar chart in the Generation tab.
**Out:** Pre-training and Post-training tabs (already done in S6.2/S6.3).

## Interface / Contract
```jsx
<EvaluationPanel />
<GenerationPanel /> // includes embedded probability visual
```

## Dependencies & Assumptions
- Upstream specs: S6.1 `done` (routing + tab bar exist)
- Libraries / data: simple static probability dataset for the demo (can be inline, doesn't require S5 to be complete)
- Thresholds: none

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given I open `/learn`, when I check the tab bar, then "Evaluation" and "Text Generation" tabs exist | manual-acceptance |
| 2 | Given I'm on the Evaluation tab, when I scroll, then 3 cards are visible: Traditional Metrics, Benchmarks, Human Eval & Leaderboards | manual-acceptance |
| 3 | Given I'm on the Text Generation tab, when I scroll, then 4 cards are visible: Greedy, Beam Search, Top-k, Top-p | manual-acceptance |
| 4 | Given the Text Generation tab, when I view it, then a probability bar chart is embedded and interactive (e.g. temperature affects bar heights) | manual-acceptance |
| 5 | Given all 4 Learn tabs now exist (Pre-training, Post-training, Evaluation, Text Generation), when I click through each, then none break the others | manual-acceptance |

## Notes / Risks
- This spec finalises the entire `/learn` route — good checkpoint to mark Phase 6 complete and move to Phase 7.

---

# Spec S7.1 — Compare Route Layout

| Field | Value |
|-------|-------|
| **Spec** | S7.1 |
| **Phase** | 7 — Multi-model Comparison |
| **Owner** | Solo |
| **Location** | `src/routes/CompareRoute.jsx` |
| **Depends On** | S6.1 (`done`) |
| **Status** | pending |

## Objective
Add a `/compare` route with a shared prompt input and a 2-column layout, each column labelled with its own provider, ready to receive parallel API calls in S7.2.

## Scope
**In:** New route + nav link, shared prompt input, two-column grid with provider labels.
**Out:** Actually sending requests (S7.2), response card content (S7.3).

## Interface / Contract
```jsx
<Route path="/compare" element={<CompareRoute />} />
// layout: <PromptInput /> + <div className="grid grid-cols-2">{columns}</div>
```

## Dependencies & Assumptions
- Upstream specs: S6.1 `done` (router exists)
- Libraries / data: none new
- Thresholds: none

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given routing exists, when I navigate to `/compare`, then the Compare view renders | manual-acceptance |
| 2 | Given the nav bar, when I check it, then a "Compare" link is present | manual-acceptance |
| 3 | Given the Compare view, when I look at it, then a shared prompt input sits above two columns | manual-acceptance |
| 4 | Given the two columns, when I check each, then they show a provider label (e.g. "Groq" / "Gemini") | manual-acceptance |
| 5 | Given `/compare` is added, when I revisit `/` and `/learn`, then both still work unaffected | manual-acceptance |

## Notes / Risks
- Keep this purely structural — no fetch logic yet, that's S7.2's job.

---

# Spec S7.2 — Parallel API Calls

| Field | Value |
|-------|-------|
| **Spec** | S7.2 |
| **Phase** | 7 — Multi-model Comparison |
| **Owner** | Solo |
| **Location** | `src/lib/parallelFetch.js` |
| **Depends On** | S7.1 (`done`), S2.2 (`done`) |
| **Status** | pending |

## Objective
Wire the shared prompt input from S7.1 to fire requests to both providers simultaneously using `Promise.allSettled`, so one provider's failure never blocks the other's response from displaying.

## Scope
**In:** `Promise.allSettled` across active provider columns, independent loading/error state per column.
**Out:** Visual response cards (S7.3) — this spec only handles the fetch orchestration logic.

## Interface / Contract
```js
async function compareProviders(prompt: string, providers: string[]): Promise<Record<string, {status: 'fulfilled'|'rejected', value?: string, reason?: Error}>>
```

## Dependencies & Assumptions
- Upstream specs: S7.1 `done` (layout exists), S2.2 `done` (single-provider fetch logic to reuse)
- Libraries / data: native `Promise.allSettled`
- Thresholds: none

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given a prompt is submitted, when I check DevTools Network tab, then requests to both providers fire at approximately the same time | manual-acceptance |
| 2 | Given both requests succeed, when responses arrive, then each column fills with its respective provider's reply | manual-acceptance |
| 3 | Given one provider has a wrong API key, when I submit a prompt, then that column shows an error while the working column still shows its response | manual-acceptance |
| 4 | Given a prompt is submitted, when requests are in flight, then both columns show a loading indicator simultaneously | manual-acceptance |

## Notes / Risks
- `Promise.allSettled` (not `Promise.all`) is required specifically so one rejected promise doesn't cancel the other's resolution.

---

# Spec S7.3 — Response Cards

| Field | Value |
|-------|-------|
| **Spec** | S7.3 |
| **Phase** | 7 — Multi-model Comparison |
| **Owner** | Solo |
| **Location** | `src/components/compare/ResponseCard.jsx` |
| **Depends On** | S7.2 (`done`) |
| **Status** | pending |

## Objective
Render each column's API result from S7.2 as a polished card showing the provider badge, response text, token count, and latency, completing the Compare feature.

## Scope
**In:** Card UI per column with metadata (provider, tokens, ms), scrollable response text.
**Out:** Diff highlighting between responses (a stretch goal not in the core 35-spec roadmap, can be added later as a new spec if desired).

## Interface / Contract
```jsx
<ResponseCard provider={string} content={string} tokenCount={number} latencyMs={number} status={'loading'|'success'|'error'} />
```

## Dependencies & Assumptions
- Upstream specs: S7.2 `done` (parallel fetch results available)
- Libraries / data: none new
- Thresholds: none

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given a response arrives, when I view its card, then a provider name badge is visible at the top | manual-acceptance |
| 2 | Given a response arrives, when I view its card, then the token count is shown (e.g. "142 tokens") | manual-acceptance |
| 3 | Given a response arrives, when I view its card, then the latency in ms is shown (e.g. "830ms") | manual-acceptance |
| 4 | Given a long response, when I view its card, then the text area scrolls internally rather than expanding the whole page | manual-acceptance |

## Notes / Risks
- This spec completes Phase 7 — good checkpoint before starting the Evaluation tab in Phase 8.

---

# Spec S8.1 — Evaluate Route Layout

| Field | Value |
|-------|-------|
| **Spec** | S8.1 |
| **Phase** | 8 — Evaluation Tab |
| **Owner** | Solo |
| **Location** | `src/routes/EvaluateRoute.jsx` |
| **Depends On** | S6.1 (`done`) |
| **Status** | pending |

## Objective
Add a `/evaluate` route with two sub-tabs ("Rate responses" and "Benchmark scores") as the home for S8.2 and S8.3.

## Scope
**In:** New route + nav link, sub-tab navigation within the route.
**Out:** The rating widget itself (S8.2), the benchmark chart itself (S8.3).

## Interface / Contract
```jsx
<Route path="/evaluate" element={<EvaluateRoute />} />
// sub-tabs: 'rate' | 'benchmarks'
```

## Dependencies & Assumptions
- Upstream specs: S6.1 `done` (router exists)
- Libraries / data: none new
- Thresholds: none

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given routing exists, when I navigate to `/evaluate`, then the Evaluate view renders | manual-acceptance |
| 2 | Given the nav bar, when I check it, then an "Evaluate" link is present | manual-acceptance |
| 3 | Given the Evaluate view, when I look at it, then two sub-tabs are visible: "Rate responses" and "Benchmark scores" | manual-acceptance |
| 4 | Given `/evaluate` is added, when I revisit `/`, `/learn`, `/compare`, then all still work unaffected | manual-acceptance |

## Notes / Risks
- Sub-tab switching can reuse the same pattern established in S6.1's nav/tab logic.

---

# Spec S8.2 — Star Rating Widget

| Field | Value |
|-------|-------|
| **Spec** | S8.2 |
| **Phase** | 8 — Evaluation Tab |
| **Owner** | Solo |
| **Location** | `src/components/eval/ResponseRater.jsx` |
| **Depends On** | S8.1 (`done`), S3.2 (`done`) |
| **Status** | pending |

## Objective
Let users rate recent AI responses 1–5 stars with an optional note, and export the ratings as JSON, demonstrating the "human evaluation" concept taught in S6.4 hands-on.

## Scope
**In:** List of last N AI messages, 5-star clickable rating widget, optional text note, in-memory persistence across route navigation, JSON export button.
**Out:** Benchmark chart (S8.3).

## Interface / Contract
```jsx
<ResponseRater messages={Message[]} />
// rating shape: { messageId: string, stars: 1-5, note?: string }
```

## Dependencies & Assumptions
- Upstream specs: S8.1 `done` (route + sub-tab exist), S3.2 `done` (message store to read from)
- Libraries / data: `sessionStorage` for export persistence
- Thresholds: shows last 5 messages

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given chat history exists, when I open "Rate responses", then the last 5 AI messages are listed | manual-acceptance |
| 2 | Given a message, when I look at it, then 5 clickable star icons are shown | manual-acceptance |
| 3 | Given I click star 3, when I check the widget, then stars 1, 2, and 3 are all highlighted | manual-acceptance |
| 4 | Given I rate a message then navigate to `/learn` and back, when I check the rating, then it is still saved | manual-acceptance |
| 5 | Given ratings exist, when I click "Export as JSON", then a file downloads containing message text + rating | manual-acceptance |

## Notes / Risks
- Ratings are stored in memory/sessionStorage only — they do not persist across a full page refresh by design (matches the no-backend architecture).

---

# Spec S8.3 — Benchmark Score Chart

| Field | Value |
|-------|-------|
| **Spec** | S8.3 |
| **Phase** | 8 — Evaluation Tab |
| **Owner** | Solo |
| **Location** | `src/components/eval/BenchmarkChart.jsx` |
| **Depends On** | S8.1 (`done`) |
| **Status** | pending |

## Objective
Display a static bar chart comparing the three free models (Llama 3.3 70B, Gemini Flash, DeepSeek V3) across standard benchmarks (MMLU, HumanEval, GSM8K), making the "Benchmarks" concept from S6.4 concrete.

## Scope
**In:** `chart.js` + `react-chartjs-2` install, bar chart with benchmark on x-axis, grouped bars per model, hover tooltips.
**Out:** Live/dynamic benchmark fetching — data is a static, hand-curated dataset.

## Interface / Contract
```jsx
<BenchmarkChart /> // self-contained, reads from a local static dataset
```

## Dependencies & Assumptions
- Upstream specs: S8.1 `done` (sub-tab exists)
- Libraries / data: `chart.js`, `react-chartjs-2`, static benchmark score dataset (sourced from public model cards)
- Thresholds: at least 3 benchmarks × 3 models

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given the libraries are installed, when I run `npm install chart.js react-chartjs-2`, then it exits with code 0 | integration |
| 2 | Given I open "Benchmark scores", when the tab renders, then a bar chart is visible | manual-acceptance |
| 3 | Given the chart, when I check the x-axis, then at least MMLU, HumanEval, and GSM8K are labelled | manual-acceptance |
| 4 | Given the chart, when I check each benchmark group, then at least 3 bars (one per model) are shown | manual-acceptance |
| 5 | Given I hover over a bar, when the tooltip appears, then it shows the exact numeric score | manual-acceptance |

## Notes / Risks
- Benchmark scores should be sourced from publicly published model cards at time of writing and noted as approximate/illustrative in a caption, since scores change as models update.

---

# Spec S9.1 — Dark Mode Toggle

| Field | Value |
|-------|-------|
| **Spec** | S9.1 |
| **Phase** | 9 — Polish |
| **Owner** | Solo |
| **Location** | `tailwind.config.js`, `src/store/themeStore.js` |
| **Depends On** | S1.3 (`done`) |
| **Status** | pending |

## Objective
Add a dark/light mode toggle in the nav bar with the preference persisted across page refreshes via `localStorage`, applied consistently across all 4 routes.

## Scope
**In:** Tailwind `class`-strategy dark mode, toggle button, `localStorage` persistence, verifying readability in dark mode across existing components.
**Out:** Per-component visual redesign beyond colour scheme swapping.

## Interface / Contract
```js
// tailwind.config.js: darkMode: 'class'
function toggleTheme(): void  // adds/removes 'dark' class on <html>, saves to localStorage
```

## Dependencies & Assumptions
- Upstream specs: S1.3 `done` (Tailwind installed)
- Libraries / data: Tailwind dark mode utilities, `localStorage`
- Thresholds: none

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given the nav bar, when I look at it, then a dark/light toggle button is visible | manual-acceptance |
| 2 | Given I click the toggle, when the page updates, then the colour scheme switches between light and dark | manual-acceptance |
| 3 | Given dark mode is active, when I read any text on screen, then it remains clearly readable (no invisible text) | manual-acceptance |
| 4 | Given I set dark mode and refresh the page, when it reloads, then dark mode is still active | manual-acceptance |

## Notes / Risks
- Test dark mode across all 4 routes (`/`, `/learn`, `/compare`, `/evaluate`) individually since each was styled separately in earlier phases.

---

# Spec S9.2 — Mobile Responsive Layout

| Field | Value |
|-------|-------|
| **Spec** | S9.2 |
| **Phase** | 9 — Polish |
| **Owner** | Solo |
| **Location** | `src/components/Layout.jsx`, all route components |
| **Depends On** | S3.3 (`done`) |
| **Status** | pending |

## Objective
Make the whole app usable on a narrow mobile screen (≤768px) — sidebar collapses, chat input sticks to the bottom, tap targets are large enough, no horizontal scrolling.

## Scope
**In:** Responsive breakpoints for Sidebar (S4.1), Compare columns (S7.1), nav bar, chat input positioning.
**Out:** A dedicated separate mobile design — this is responsive adaptation of the existing desktop layout, not a rebuild.

## Interface / Contract
```css
/* Tailwind responsive utilities, e.g. */
.sidebar { @apply md:block hidden; } /* example pattern, exact implementation flexible */
```

## Dependencies & Assumptions
- Upstream specs: S3.3 `done` (core chat exists to make responsive)
- Libraries / data: Tailwind responsive utilities (`sm:`, `md:`, etc.)
- Thresholds: breakpoint at 768px; tap targets ≥ 44px

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given Chrome DevTools mobile emulation at <768px width, when I view the app, then the sidebar collapses (hidden or becomes a bottom sheet/drawer) | manual-acceptance |
| 2 | Given mobile view, when I scroll the chat thread, then the chat input remains stuck to the bottom of the screen | manual-acceptance |
| 3 | Given mobile view, when I measure any button or link, then it is at least 44px tall | manual-acceptance |
| 4 | Given mobile view, when I check the page, then no horizontal scrollbar appears | manual-acceptance |

## Notes / Risks
- Test on at least one real small device or accurate emulation (e.g. iPhone SE 375px width) in addition to resizing the desktop browser window.

---

# Spec S9.3 — Empty and Error States

| Field | Value |
|-------|-------|
| **Spec** | S9.3 |
| **Phase** | 9 — Polish |
| **Owner** | Solo |
| **Location** | `src/components/MessageThread.jsx`, `src/components/ChatInput.jsx` |
| **Depends On** | S2.3 (`done`) |
| **Status** | pending |

## Objective
Ensure the app never shows a blank or broken screen: a welcoming empty state when chat is new, inline (not popup) error messages with a retry option, and a clear rate-limit message.

## Scope
**In:** Empty-chat welcome message, inline error rendering inside the thread, "Retry" button that resends the last message, rate-limit-specific copy.
**Out:** New error types beyond those already identified in S2.3.

## Interface / Contract
```jsx
<EmptyState />          // shown when messages.length === 0
<ErrorMessage onRetry={() => void} type={'rate_limit'|'invalid_key'|'network'|'unknown'} />
```

## Dependencies & Assumptions
- Upstream specs: S2.3 `done` (error normaliser exists to extend)
- Libraries / data: none new
- Thresholds: none

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given the chat is empty, when the page loads, then a welcome message with getting-started instructions is shown | manual-acceptance |
| 2 | Given an API call fails, when the error occurs, then the message appears inline in the chat thread (not as a browser alert/popup) | manual-acceptance |
| 3 | Given an error is shown, when I click "Retry", then the last message is resent | manual-acceptance |
| 4 | Given a 429 rate-limit response is received, when the error displays, then it specifically says to wait or switch providers | manual-acceptance |

## Notes / Risks
- This spec is the last one before considering the app "feature complete" — after this, Phase 10 is purely about shipping what already works.

---

# Spec S10.1 — Production Build

| Field | Value |
|-------|-------|
| **Spec** | S10.1 |
| **Phase** | 10 — Deploy |
| **Owner** | Solo |
| **Location** | `vite.config.js` |
| **Depends On** | S9.1 (`done`), S9.2 (`done`), S9.3 (`done`) |
| **Status** | pending |

## Objective
Verify the app builds correctly for production (`npm run build`), produces a working `dist/` folder, and keeps the JS bundle reasonably small, before deploying in S10.2.

## Scope
**In:** Running and verifying `npm run build` and `npm run preview`, checking bundle size.
**Out:** Actual deployment to Vercel (S10.2).

## Interface / Contract
```
npm run build   → creates dist/ with index.html + hashed JS/CSS assets
npm run preview → serves dist/ locally for final verification
```

## Dependencies & Assumptions
- Upstream specs: S9.1, S9.2, S9.3 all `done` (feature-complete app)
- Libraries / data: Vite's built-in build/preview commands
- Thresholds: total JS bundle < 500 KB

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given the app is feature-complete, when I run `npm run build`, then it completes without errors | integration |
| 2 | Given the build succeeds, when I check the project folder, then `dist/` exists with `index.html` and asset files | unit |
| 3 | Given `dist/` exists, when I run `npm run preview` and open the local URL, then all 4 routes work correctly | manual-acceptance |
| 4 | Given the build output, when I check the terminal summary, then the total JS bundle is under 500 KB | manual-acceptance |

## Notes / Risks
- If the bundle exceeds 500KB, the most common fix is checking for accidentally-duplicated or oversized dependencies (e.g. unused chart libraries) — not a hard blocker, just worth investigating.

---

# Spec S10.2 — Vercel Deployment

| Field | Value |
|-------|-------|
| **Spec** | S10.2 |
| **Phase** | 10 — Deploy |
| **Owner** | Solo |
| **Location** | Vercel project settings (no new repo files required) |
| **Depends On** | S10.1 (`done`) |
| **Status** | pending |

## Objective
Deploy the project to Vercel's free tier, producing a public URL that anyone can open and use with their own free API keys, with auto-deploy on every push to `main`.

## Scope
**In:** Vercel account/project setup, GitHub import, first deployment, verifying auto-deploy on push.
**Out:** Custom domains, paid Vercel tiers.

## Interface / Contract
```
Vercel project imported from GitHub repo
→ public URL e.g. https://llm-playground-xyz.vercel.app
→ auto-deploys on every push to main
```

## Dependencies & Assumptions
- Upstream specs: S10.1 `done` (production build verified)
- Libraries / data: Vercel free account (sign in with GitHub)
- Thresholds: none

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given a Vercel account is created, when I import the GitHub repo, then the first deployment completes successfully (green checkmark) | manual-acceptance |
| 2 | Given deployment succeeds, when I open the public URL, then the app loads | manual-acceptance |
| 3 | Given the live URL, when I navigate to all 4 routes, then each works correctly | manual-acceptance |
| 4 | Given the live app, when I push a new commit to `main`, then Vercel automatically redeploys without manual intervention | manual-acceptance |

## Notes / Risks
- No environment variables are needed since API keys are supplied by each user in the browser, not stored server-side.

---

# Spec S11.1 — README

| Field | Value |
|-------|-------|
| **Spec** | S11.1 |
| **Phase** | 11 — Docs |
| **Owner** | Solo |
| **Location** | `README.md` |
| **Depends On** | S10.2 (`done`) |
| **Status** | pending |

## Objective
Write a complete README so a stranger (or future employer) can understand the project, run it locally, and get their own free API keys, without needing to ask any questions.

## Scope
**In:** Project description, local run instructions, free API key links, live URL, screenshots placeholder (filled by S11.3).
**Out:** Full architecture explanation (S11.2 handles that in detail).

## Interface / Contract
```
README.md sections:
1. What this project does
2. How to run locally
3. How to get free API keys
4. Architecture overview (brief, links to docs/architecture.md)
5. Live demo URL
6. Screenshots
```

## Dependencies & Assumptions
- Upstream specs: S10.2 `done` (live URL exists to reference)
- Libraries / data: none
- Thresholds: none

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given the repo, when I open `README.md`, then it exists at the root | unit |
| 2 | Given the README, when I read it, then a 1–2 paragraph project description is present | manual-acceptance |
| 3 | Given the README, when I follow the "How to run locally" steps exactly, then the app runs successfully on a fresh clone | manual-acceptance |
| 4 | Given the README, when I check the API key section, then it links to Groq, Gemini, and OpenRouter signup pages | manual-acceptance |
| 5 | Given the README, when I check it, then the live Vercel URL from S10.2 is present and working | manual-acceptance |

## Notes / Risks
- Test instruction #3 by literally following your own README on a clean checkout — the best way to catch missing steps.

---

# Spec S11.2 — Architecture Diagram

| Field | Value |
|-------|-------|
| **Spec** | S11.2 |
| **Phase** | 11 — Docs |
| **Owner** | Solo |
| **Location** | `docs/architecture.md` |
| **Depends On** | S10.2 (`done`) |
| **Status** | pending |

## Objective
Document the data flow (User → Browser → AI Provider API → Response → UI) and the no-backend architecture decision, so the project's design is explainable to others and to future-you.

## Scope
**In:** A diagram (ASCII art or embedded image), an explanation that there is no backend and keys never leave the browser, a one-sentence description of each of the 4 routes.
**Out:** Per-component code-level documentation (not required for this beginner project).

## Interface / Contract
```
docs/architecture.md contains:
- ASCII or image diagram of: User → Browser (React SPA) → Groq/Gemini/OpenRouter API → Response → UI
- Explicit note: no backend server; keys stored only in browser state
- 4 one-sentence route descriptions: /chat, /learn, /compare, /evaluate
```

## Dependencies & Assumptions
- Upstream specs: S10.2 `done` (full architecture is finalised by this point)
- Libraries / data: none
- Thresholds: none

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given the repo, when I open `docs/architecture.md`, then it exists | unit |
| 2 | Given the doc, when I read it, then a diagram showing User → Browser → API → UI is present and legible | manual-acceptance |
| 3 | Given the doc, when I read it, then it explicitly states there is no backend and keys stay client-side | manual-acceptance |
| 4 | Given the doc, when I read it, then each of the 4 routes is described in one sentence | manual-acceptance |

## Notes / Risks
- This doc is a strong portfolio artifact — it shows you can explain technical decisions, not just implement them.

---

# Spec S11.3 — Final Acceptance Checklist

| Field | Value |
|-------|-------|
| **Spec** | S11.3 |
| **Phase** | 11 — Docs |
| **Owner** | Solo |
| **Location** | `docs/acceptance.md`, `docs/screenshots/` |
| **Depends On** | S11.1 (`done`), S11.2 (`done`) |
| **Status** | pending |

## Objective
Run the full end-to-end acceptance pass: confirm every one of the 35 specs is `done`, the live app performs well, screenshots are captured, and declare the project complete.

## Scope
**In:** Spec index review, live-URL smoke test, screenshot capture for all 4 routes, embedding screenshots in README.
**Out:** Any new feature work — this spec only verifies and documents what already exists.

## Interface / Contract
```
docs/acceptance.md — final checklist of all 35 specs with their status
docs/screenshots/ — PNG/GIF for each of the 4 routes, referenced in README.md
```

## Dependencies & Assumptions
- Upstream specs: S11.1 `done` (README exists), S11.2 `done` (architecture doc exists)
- Libraries / data: none
- Thresholds: page load under 5 seconds on a normal connection

## Acceptance Criteria → Test List

| # | Test (given / when / then) | Type |
|---|----------------------------|------|
| 1 | Given the Master Spec Index, when I review all 35 specs, then every single one shows status `done` | manual-acceptance |
| 2 | Given the live Vercel URL, when I time the initial load, then it completes in under 5 seconds | manual-acceptance |
| 3 | Given the live URL, when I run the full chat flow (type → send → reply appears), then it works end-to-end | e2e |
| 4 | Given the live URL, when I use the tokeniser demo without entering any API key, then it still works (proving it's offline-capable) | manual-acceptance |
| 5 | Given `docs/screenshots/`, when I check it, then screenshots of all 4 routes exist and are embedded in `README.md` | manual-acceptance |

## Notes / Risks
- This is the final spec in the roadmap — once it's `done`, the LLM Playground project is complete and demo-ready.

---

