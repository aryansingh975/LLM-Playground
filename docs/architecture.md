# Architecture

How data flows through LLM Playground, and what runs where.

## Data flow

```
┌──────┐     types a message     ┌─────────┐        fetch()        ┌──────────────────────┐
│ User │ ───────────────────────▶│ Browser │ ─────────────────────▶│ Groq / Gemini /       │
└──────┘                         │  (SPA)  │                        │ OpenRouter API        │
                                  │         │◀───────────────────── │ (public REST endpoint)│
                                  └────┬────┘      JSON response    └──────────────────────┘
                                       │
                                       ▼
                                  UI re-renders
                                  with the reply
```

`User → Browser → Groq/Gemini/OpenRouter API → Response → UI` — that's the whole request path.
There is **no backend server** for this project. The browser calls each provider's public REST
endpoint directly with `fetch()` (see `src/api.js`'s `callGroq`, `callGemini`, and `callOpenRouter`
functions), and the JSON reply is rendered straight into the chat thread. No request ever passes
through infrastructure this project controls.

## Where API keys live

Because there's no backend, there's nowhere for a server to hold secrets. Keys stay in the browser:

- **Locally**: keys come from `.env.local` (`VITE_GROQ_API_KEY`, `VITE_GEMINI_API_KEY`,
  `VITE_OPENROUTER_API_KEY` — see the README's "How to get free API keys" section). Vite inlines
  `VITE_*` variables into the client bundle at build time.
- **On the deployed instance**: the same `VITE_*` variables, set in Vercel's Environment Variables
  UI. Whatever is configured there becomes readable in the shipped bundle by anyone who opens
  DevTools — this is a known, accepted tradeoff of a server-free architecture, not an oversight.
- **Not set**: the app still loads and is fully browsable; sending a message shows a friendly "No
  API key found" message instead of crashing.

## Routes

The app is a single-page app (`react-router-dom`, no server-side rendering) with four routes:

| Route | What it does |
|-------|--------------|
| `/chat` | Type a message, send it to the selected provider (Groq / Gemini / OpenRouter), and see the reply appended to the message thread. |
| `/learn` | Static explainer cards on how LLMs are pre-trained, post-trained, and evaluated, plus the tokeniser demo — no network calls. |
| `/compare` | Sends the same prompt to two providers at once via `Promise.all` and shows both replies side by side. |
| `/evaluate` | Star-rate chat responses and view benchmark charts (MMLU / HumanEval / GSM8K) for each free model. |

## Why no backend

The whole point of this project is that it runs on free tiers with zero infrastructure to manage:
static hosting (Vercel) for the SPA, and direct browser calls to each provider's already-public,
CORS-enabled free API. Adding a backend would mean a server to pay for and operate just to relay
requests — with no security benefit, since a backend proxying a free-tier key doesn't hide anything
a determined user couldn't also get from their own free account.
