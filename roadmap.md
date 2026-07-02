# Roadmap — LLM Playground 🧠
### Beginner Edition (Python background, learning as we go)

---

## Before You Read This

This roadmap is written for someone who:
- ✅ Knows basic Python
- ✅ Has VS Code and Git installed
- ❌ Has NOT used JavaScript, React, or npm before
- ❌ Has NOT built a web app before

**That is completely fine.** This roadmap is designed so you learn one small thing at a time. Every spec (mini-task) explains *what* you're building, *why* it matters, and *exactly how* to do it — no assumed knowledge.

---

## What Are We Building?

A web page you open in your browser where you can:
1. Type a message and get a reply from a free AI (like ChatGPT but free)
2. Tweak sliders to change how the AI responds
3. See how the AI "thinks" about words (tokeniser demo)
4. Learn how LLMs work through interactive cards
5. Compare two AI models side by side

**The whole thing runs in your browser. No server. No paid APIs. Just free tools.**

---

## Tech Stack (Plain English Version)

| What | Tool | Why it's like Python |
|------|------|----------------------|
| Language | JavaScript | Like Python, but runs in the browser |
| Project setup | Node.js + npm | Like Python + pip — manages packages |
| Build tool | Vite | Like running `python app.py` but for web |
| UI framework | React | Like functions that draw things on screen |
| Styling | Tailwind CSS | Pre-made CSS classes, like f-strings for design |
| AI APIs | Groq, Gemini, OpenRouter | Like calling `requests.get()` but to an AI |
| Testing | Vitest | Like pytest but for JavaScript |
| Hosting | Vercel (free) | Like sharing a Google Colab link, but permanent |

> 💡 **You don't need to know all of this now.** Each spec will introduce one tool at a time and explain it from scratch.

---

## How This Roadmap Works

### What is a "Spec"?
A spec (specification) is a mini-document that describes **one small feature** of the project.
Think of it like a recipe — before you cook, you read the recipe. Before you code, you read the spec.

### The 4 Steps Every Spec Goes Through

```
Step 1  WRITE SPEC     → You read and understand what needs to be built
Step 2  VERIFY SPEC    → You check: do I understand this? Can I test it?
Step 3  BUILD IT       → You write the code (start with a failing test, then make it pass)
Step 4  CHECK IT       → Does it work? Does it match the spec?
```

### Spec Status Labels
- `pending` — not started yet
- `spec` — you've read and understood the spec
- `impl` — you're writing the code
- `done` — it works and passes all checks ✅

### The Golden Rule
**Never start a spec until everything it "Depends On" is marked `done`.**
This stops you from building on a shaky foundation.

---

## Phases Overview

| Phase | Name | # Specs | What You'll Learn | Output |
|-------|------|---------|-------------------|--------|
| 0 | Tools Setup | 5 | npm, Node.js, Git, JS basics, React basics | Your computer is ready and you understand the language |
| 1 | First Web Page | 3 | HTML, basic JavaScript | A page that opens in the browser |
| 2 | Connect to Free AI | 3 | fetch(), API keys, JSON | AI replies to your typed message |
| 3 | Make It Look Good | 3 | Tailwind CSS, React basics | A proper chat UI |
| 4 | Generation Controls | 5 | React state, sliders, provider switching | Sliders and provider picker control AI behaviour |
| 5 | Tokeniser Demo | 2 | String manipulation, npm packages | Live token visualiser |
| 6 | Learn Concepts Panel | 4 | React components, routing | All 4 LLM topic sections |
| 7 | Multi-model Compare | 3 | Promise.all, parallel requests | Side-by-side model comparison |
| 8 | Evaluation Tab | 3 | Data display, Chart.js | Rating + benchmark viewer |
| 9 | Polish | 3 | Dark mode, mobile layout | Looks great everywhere |
| 10 | Deploy | 2 | Vercel, environment | Live public URL |
| 11 | Docs | 3 | Markdown, screenshots | README + portfolio piece |

**Total: ~39 specs. At 1 per day, you finish in 6–10 weeks (realistic for someone learning JavaScript from scratch).**

---

## Phase 0 — Tools Setup

> **Goal:** Get your computer ready to build web apps — and understand the language before you write a single line of it.
> You already have VS Code and Git. This phase adds Node.js, npm, the Vite project scaffold, JavaScript fundamentals, and a hands-on React primer.
> **Complete all 5 specs here before starting Phase 1. S0.4 and S0.5 are reading + tiny experiments, not full features — but they are the most important specs in the whole project for someone coming from Python.**

| Spec | Spec Location | Depends On | What You'll Do | Status |
|------|--------------|-----------|----------------|--------|
| S0.1 | `specs/spec-S0.1-install-node/` | — | Install Node.js and npm. Run `node --version` to confirm | done |
| S0.2 | `specs/spec-S0.2-create-project/` | S0.1 | Create the project with Vite. Run `npm run dev`. See "Hello World" in browser | done |
| S0.3 | `specs/spec-S0.3-git-setup/` | S0.2 | Create a GitHub repo. Push the starter project. Understand what `.gitignore` does | done |
| S0.4 | `specs/spec-S0.4-js-for-python-devs/` | S0.1 | Learn the 6 JavaScript patterns used throughout this project. Compare each to its Python equivalent | done |
| S0.5 | `specs/spec-S0.5-react-fundamentals/` | S0.2, S0.4 | Learn what React is, what a component is, what JSX is, and what `useState` does — by experimenting in the live project | done |

---

## Phase 1 — First Web Page

> **Goal:** Build a real HTML page with a text box and a button.
> No AI yet — just getting comfortable with HTML and JavaScript.
> **By the end: you type something, click a button, and text appears on screen.**

| Spec | Spec Location | Depends On | What You'll Do | Status |
|------|--------------|-----------|----------------|--------|
| S1.1 | `specs/spec-S1.1-html-skeleton/` | S0.2 | Create `index.html` with a text input, a button, and a response area | done |
| S1.2 | `specs/spec-S1.2-js-click-handler/` | S1.1 | Write JavaScript so clicking the button shows the typed text on screen | done |
| S1.3 | `specs/spec-S1.3-basic-styling/` | S1.2 | Add Tailwind CSS. Make it look clean — centred, readable, not ugly | done |

---

## Phase 2 — Connect to Free AI

> **Goal:** Replace the fake echo response with a real AI reply.
> You'll get a free API key from Groq and make your first AI call.
> **By the end: you type a message, click Send, and an AI replies.**

| Spec | Spec Location | Depends On | What You'll Do | Status |
|------|--------------|-----------|----------------|--------|
| S2.1 | `specs/spec-S2.1-get-api-keys/` | S0.1 | Sign up at Groq, Gemini, and OpenRouter. Get a free API key from each. Test all three with curl | done |
| S2.2 | `specs/spec-S2.2-first-api-call/` | S2.1, S1.2 | Write a `fetch()` call to Groq's API. Show the AI's reply on screen | done |
| S2.3 | `specs/spec-S2.3-error-handling/` | S2.2 | Handle "no key entered", "rate limit hit", and "no internet" gracefully | done |

---

## Phase 3 — Proper Chat UI

> **Goal:** Turn the basic page into a real chat interface — like WhatsApp or ChatGPT.
> This is where you'll learn React properly for the first time.
> **By the end: messages appear in a thread, user on the right, AI on the left.**

| Spec | Spec Location | Depends On | What You'll Do | Status |
|------|--------------|-----------|----------------|--------|
| S3.1 | `specs/spec-S3.1-component-architecture/` | S0.2, S2.2 | Clean up `App.jsx` into a single-responsibility component — the foundation for splitting into `MessageThread` and `ChatInput` in S3.2/S3.3 | done |
| S3.2 | `specs/spec-S3.2-message-thread/` | S3.1 | Build `<MessageThread>` component. Messages stored in a list. New messages append | done |
| S3.3 | `specs/spec-S3.3-chat-input/` | S3.2, S2.2 | Build `<ChatInput>` component. Enter to send. AI reply appears in thread | done |

---

## Phase 4 — Generation Controls

> **Goal:** Add sliders and a provider picker that control how the AI responds and which AI you talk to.
> You'll learn how React "state" works — the data that makes the UI update.
> **By the end: you can tune temperature, top-p, and max tokens, and switch between three free AI providers.**

| Spec | Spec Location | Depends On | What You'll Do | Status |
|------|--------------|-----------|----------------|--------|
| S4.1 | `specs/spec-S4.1-sidebar-layout/` | S3.3 | Add a sidebar panel next to the chat. Controls go here | done |
| S4.2 | `specs/spec-S4.2-temperature-slider/` | S4.1 | Add temperature slider (0–2). Wire to API call. See responses change | done |
| S4.3 | `specs/spec-S4.3-top-p-slider/` | S4.2 | Add top-p slider (0.1–1.0). Wire to API call. Understand how top-p differs from temperature | done |
| S4.4 | `specs/spec-S4.4-max-tokens-slider/` | S4.3 | Add max tokens slider (64–2048). Wire to API call. See how response length is capped | done |
| S4.5 | `specs/spec-S4.5-provider-picker/` | S4.4 | Add provider dropdown (Groq / Gemini / OpenRouter). Switching it changes which API is called | done |

---

## Phase 5 — Tokeniser Demo

> **Goal:** Show users how text gets split into tokens.
> You'll use an npm package to do the actual BPE splitting.
> **By the end: type any text and see it split into coloured token chips.**

| Spec | Spec Location | Depends On | What You'll Do | Status |
|------|--------------|-----------|----------------|--------|
| S5.1 | `specs/spec-S5.1-tokeniser-logic/` | S0.1 | Install `gpt-tokenizer`. Write a function that splits text into tokens. Test it | done |
| S5.2 | `specs/spec-S5.2-tokeniser-ui/` | S5.1, S3.1 | Build the token chip UI. Each token gets a different colour. Show token count | done |

---

## Phase 6 — Learn Concepts Panel

> **Goal:** Add a "Learn" tab with 4 sections covering your LLM outline.
> You'll learn React Router — how to have multiple "pages" in one web app.
> **By the end: clicking tabs shows interactive explainer cards.**

| Spec | Spec Location | Depends On | What You'll Do | Status |
|------|--------------|-----------|----------------|--------|
| S6.1 | `specs/spec-S6.1-routing/` | S3.1 | Install React Router. Add `/chat` and `/learn` routes. Nav bar links between them | done |
| S6.2 | `specs/spec-S6.2-pretrain-panel/` | S6.1 | Build pre-training section: Data collection, Cleaning, Tokenisation, Architecture cards | done |
| S6.3 | `specs/spec-S6.3-postrain-panel/` | S6.1 | Build post-training section: SFT, RLHF, PPO, Verifiable tasks cards | done |
| S6.4 | `specs/spec-S6.4-eval-gen-panels/` | S6.1 | Build Evaluation and Text Generation sections. Embed the tokeniser demo inline | done |

---

## Phase 7 — Multi-model Comparison

> **Goal:** Send the same prompt to multiple AIs and see their responses side by side.
> **By the end: one prompt → two columns → two different AI replies.**

| Spec | Spec Location | Depends On | What You'll Do | Status |
|------|--------------|-----------|----------------|--------|
| S7.1 | `specs/spec-S7.1-compare-route/` | S6.1 | Add `/compare` route. Two-column layout. Each column has its own provider | done |
| S7.2 | `specs/spec-S7.2-parallel-calls/` | S7.1, S2.2 | Send the prompt to both providers at the same time using `Promise.all` | done |
| S7.3 | `specs/spec-S7.3-response-cards/` | S7.2 | Show each response in a card with provider name, token count, and latency | done |

---

## Phase 8 — Evaluation Tab

> **Goal:** Add a way to rate responses and see benchmark scores.
> **By the end: users can star-rate AI answers and see how models compare on standard tests.**

| Spec | Spec Location | Depends On | What You'll Do | Status |
|------|--------------|-----------|----------------|--------|
| S8.1 | `specs/spec-S8.1-eval-route/` | S6.1 | Add `/evaluate` route. Two sub-sections: rate responses, view benchmarks | done |
| S8.2 | `specs/spec-S8.2-star-rating/` | S8.1, S3.2 | Star rating widget for each AI response. Stores ratings in browser memory | done |
| S8.3 | `specs/spec-S8.3-benchmark-chart/` | S8.1 | Bar chart showing MMLU / HumanEval / GSM8K scores for each free model | done |

---

## Phase 9 — Polish

> **Goal:** Make it look professional and work on phones too.
> **By the end: dark mode works, mobile layout is clean, errors are handled nicely.**

| Spec | Spec Location | Depends On | What You'll Do | Status |
|------|--------------|-----------|----------------|--------|
| S9.1 | `specs/spec-S9.1-dark-mode/` | S1.3 | Add a dark/light mode toggle. Preference saved across page refreshes | done |
| S9.2 | `specs/spec-S9.2-mobile-layout/` | S3.3 | Sidebar collapses on small screens. Chat input sticks to the bottom | done |
| S9.3 | `specs/spec-S9.3-empty-error-states/` | S2.3 | Nice empty state when chat is empty. Clear error messages when API fails | done |

---

## Phase 10 — Deploy

> **Goal:** Put your project on the internet so anyone can use it.
> **By the end: a real public URL you can share.**

| Spec | Spec Location | Depends On | What You'll Do | Status |
|------|--------------|-----------|----------------|--------|
| S10.1 | `specs/spec-S10.1-prod-build/` | S9.1, S9.2, S9.3 | Run `npm run build`. Understand what a "production build" is | done |
| S10.2 | `specs/spec-S10.2-vercel-deploy/` | S10.1 | Deploy to Vercel (free). Get a public URL. Share it | spec-written |

---

## Phase 11 — Docs

> **Goal:** Document your project like a professional.
> **By the end: a proper README, architecture diagram, and screenshots — great for your portfolio.**

| Spec | Spec Location | Depends On | What You'll Do | Status |
|------|--------------|-----------|----------------|--------|
| S11.1 | `specs/spec-S11.1-readme/` | S10.2 | Write README: what the project does, how to run it, how to get free API keys | pending |
| S11.2 | `specs/spec-S11.2-architecture/` | S10.2 | Draw a simple diagram of how data flows: user → browser → AI API → back | pending |
| S11.3 | `specs/spec-S11.3-acceptance/` | S11.1 | Final checklist: does everything work? Is every spec done? | pending |

---

## Master Spec Index

| Spec | Phase | What You'll Do | Status |
|------|-------|----------------|--------|
| S0.1 | Tools Setup | Install Node.js and npm | done |
| S0.2 | Tools Setup | Create project with Vite | done |
| S0.3 | Tools Setup | Push to GitHub | done |
| S0.4 | Tools Setup | JavaScript fundamentals for Python developers | done |
| S0.5 | Tools Setup | React fundamentals — components, JSX, useState | done |
| S1.1 | First Web Page | HTML skeleton | done |
| S1.2 | First Web Page | JS click handler | done |
| S1.3 | First Web Page | Basic Tailwind styling | done |
| S2.1 | Connect to AI | Get free API keys: Groq + Gemini + OpenRouter | done |
| S2.2 | Connect to AI | First real AI call | done |
| S2.3 | Connect to AI | Error handling | done |
| S3.1 | Chat UI | App component architecture checkpoint | done |
| S3.2 | Chat UI | Message thread | done |
| S3.3 | Chat UI | Chat input | done |
| S4.1 | Controls | Sidebar layout | done |
| S4.2 | Controls | Temperature slider | done |
| S4.3 | Controls | Top-p slider | done |
| S4.4 | Controls | Max tokens slider | done |
| S4.5 | Controls | Provider picker (Groq / Gemini / OpenRouter) | done |
| S5.1 | Tokeniser | Tokeniser logic | done |
| S5.2 | Tokeniser | Token chip UI | done |
| S6.1 | Learn Panel | Routing | done |
| S6.2 | Learn Panel | Pre-training cards | done |
| S6.3 | Learn Panel | Post-training cards | done |
| S6.4 | Learn Panel | Evaluation + Generation cards | done |
| S7.1 | Compare | Compare route layout | done |
| S7.2 | Compare | Parallel AI calls | done |
| S7.3 | Compare | Response cards | done |
| S8.1 | Evaluate | Evaluate route | done |
| S8.2 | Evaluate | Star rating widget | done |
| S8.3 | Evaluate | Benchmark chart | done |
| S9.1 | Polish | Dark mode | done |
| S9.2 | Polish | Mobile layout | done |
| S9.3 | Polish | Empty + error states | done |
| S10.1 | Deploy | Production build | done |
| S10.2 | Deploy | Vercel deploy | spec-written |
| S11.1 | Docs | README | pending |
| S11.2 | Docs | Architecture diagram | pending |
| S11.3 | Docs | Final acceptance checklist | pending |
