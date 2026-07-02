# Spec S4.5 — Provider Picker

## Overview
Add a provider dropdown (Groq / Gemini / OpenRouter) to the sidebar, alongside the temperature,
top-p, and max tokens sliders built in S4.2–S4.4. Switching the dropdown must change which AI
API is actually called when sending a message. Today `src/api.js` only exports `callGroq` — this
spec adds `callGemini` and `callOpenRouter` (mirroring `callGroq`'s signature and error contract
exactly: `(prompt, temperature = 1, topP = 1, maxTokens = 1024)`, same categorized error messages
for missing key / rate limit / no internet / unexpected response shape), plus a `callProvider`
dispatcher that routes to the right function by provider name. `App.jsx` lifts a `provider` state
value (default `'groq'`, the same lifted-state pattern already used for
`temperature`/`topP`/`maxTokens`) and `handleSend` calls `callProvider(provider, ...)` instead of
calling `callGroq` directly.

## Dependencies
- S4.4 — Max tokens slider pattern (`<MaxTokensSlider>`, lifted state in `App.jsx`, `callGroq`
  request body shape) exists and is `done`; this spec mirrors that pattern for the provider
  dropdown and extends `api.js` with two new provider functions.
- S2.1 — `.env.example` already declares `VITE_GEMINI_API_KEY` and `VITE_OPENROUTER_API_KEY`
  (done); no new env var names are introduced by this spec.

## Target Location
`src/ProviderPicker.jsx` (new), `src/App.jsx` (lift `provider` state + wire into `<Sidebar>` and
`handleSend`), `src/api.js` (`callGemini`, `callOpenRouter`, `callProvider` dispatcher added
alongside the existing `callGroq`)

---

## Functional Requirements

### FR-1: New `<ProviderPicker>` component
- **What**: A controlled React component rendering a `<select>` with three `<option>`s — visible
  labels "Groq", "Gemini", "OpenRouter" with values `'groq'`, `'gemini'`, `'openrouter'` — plus a
  label above it (same visual pattern as the sliders: `<label>` + control, no internal state).
- **Inputs**: `value` (string, required — one of `'groq' | 'gemini' | 'openrouter'`), `onChange`
  (function, required — called with the new string value when the selection changes).
- **Outputs**: Renders the select with the current `value` selected; calling `onChange` is the
  only side effect.
- **Edge cases**: `onChange` must receive the raw string value (`e.target.value`) — no `Number()`
  coercion like the sliders, since provider names are strings, not numbers.

### FR-2: `App.jsx` lifts `provider` state and wires it into the sidebar
- **What**: `App.jsx` adds `const [provider, setProvider] = useState('groq')` and renders
  `<ProviderPicker value={provider} onChange={setProvider} />` inside `<Sidebar>`, alongside the
  existing `<TemperatureSlider>`, `<TopPSlider>`, and `<MaxTokensSlider>`.
- **Inputs**: No new props — internal state only.
- **Outputs**: The dropdown appears inside the sidebar panel, below the max tokens slider;
  changing it updates `provider` state.
- **Edge cases**: Sidebar must still render correctly with four children now present (regression
  check — mirrors the "future children mount without layout breakage" edge case from
  S4.1–S4.4).

### FR-3: `src/api.js` gains `callGemini` and `callOpenRouter`
- **What**: Two new exported functions mirroring `callGroq`'s signature
  `(prompt, temperature = 1, topP = 1, maxTokens = 1024)` and returning the reply string.
- **`callGemini`**:
  - Reads `import.meta.env.VITE_GEMINI_API_KEY`; throws
    `'No API key found. Add VITE_GEMINI_API_KEY to .env.local and restart the dev server.'` if
    missing.
  - POSTs to
    `` `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}` ``
    with body
    `{ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature, topP, maxOutputTokens: maxTokens } }`.
  - Extracts the reply from `data.candidates[0].content.parts[0].text`; throws
    `'Unexpected response format'` if that path is missing.
- **`callOpenRouter`**:
  - Reads `import.meta.env.VITE_OPENROUTER_API_KEY`; throws
    `'No API key found. Add VITE_OPENROUTER_API_KEY to .env.local and restart the dev server.'`
    if missing.
  - POSTs to `https://openrouter.ai/api/v1/chat/completions` with header
    `Authorization: Bearer <key>` and body (OpenAI-compatible, same shape as `callGroq`)
    `{ model: 'meta-llama/llama-3.1-8b-instruct:free', messages: [{ role: 'user', content: prompt }], temperature, top_p: topP, max_tokens: maxTokens }`.
  - Extracts the reply from `data.choices[0].message.content`; throws
    `'Unexpected response format'` if missing.
- **Shared edge cases (both functions, matching `callGroq`)**: network failure → `'No internet
  connection. Check your network and try again.'`; HTTP 429 → `'Rate limit reached. Wait a few
  seconds and try again.'`; other non-ok status → `'<Provider> error: check your API key and try
  again.'` (`'Gemini error: ...'` / `'OpenRouter error: ...'`).

### FR-4: `callProvider` dispatcher wired into `App.jsx`
- **What**: `src/api.js` exports `callProvider(provider, prompt, temperature, topP, maxTokens)`
  that delegates to `callGroq`, `callGemini`, or `callOpenRouter` based on `provider`. `App.jsx`
  `handleSend` calls `callProvider(provider, text, temperature, topP, maxTokens)` instead of
  calling `callGroq` directly.
- **Inputs**: `provider` (string: `'groq' | 'gemini' | 'openrouter'`), plus the same
  `prompt`/`temperature`/`topP`/`maxTokens` args as the individual call functions.
- **Outputs**: Returns whatever the delegated function returns (the reply string); propagates
  any error the delegated function throws.
- **Edge cases**: An unrecognized `provider` string (anything other than the three known values)
  throws `` `Unknown provider: ${provider}` `` rather than silently falling back to Groq — this
  surfaces bugs (e.g. a typo in a future provider addition) instead of masking them.

---

## Tangible Outcomes

- [ ] **Outcome 1**: `src/ProviderPicker.jsx` exists and exports a default React component.
- [ ] **Outcome 2**: Rendering `<ProviderPicker value="groq" onChange={fn} />` shows a `<select>`
  with three options (Groq/Gemini/OpenRouter) and `"groq"` selected.
- [ ] **Outcome 3**: Firing a `change` event on the select (choosing "Gemini") calls `onChange`
  with the string `"gemini"`.
- [ ] **Outcome 4**: Rendering `<App />` shows the provider picker inside the sidebar, alongside
  the temperature, top-p, and max tokens controls.
- [ ] **Outcome 5**: `callProvider('groq', ...)` calls `callGroq`; `callProvider('gemini', ...)`
  calls `callGemini`; `callProvider('openrouter', ...)` calls `callOpenRouter` — each with the
  same `(prompt, temperature, topP, maxTokens)` arguments.
- [ ] **Outcome 6**: Sending a message with `provider` set to `'gemini'` results in a POST to the
  Gemini endpoint (not the Groq or OpenRouter endpoint).
- [ ] **Outcome 7**: `callGemini` sends a request body containing
  `contents[0].parts[0].text === prompt` and
  `generationConfig === { temperature, topP, maxOutputTokens: maxTokens }`.
- [ ] **Outcome 8**: `callOpenRouter` sends a request with `Authorization: Bearer <key>` and a
  body with `max_tokens`/`top_p`/`temperature` fields (OpenAI-compatible shape).
- [ ] **Outcome 9**: `callGemini` and `callOpenRouter` throw the same categorized error messages
  as `callGroq` for missing key, HTTP 429, and network failure.
- [ ] **Outcome 10**: `callProvider('bogus', 'hi')` rejects with `'Unknown provider: bogus'`.

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)
1. **test_provider_picker_renders_select_with_three_options**: Render `<ProviderPicker value="groq" onChange={vi.fn()} />`; query the select; assert options with values `groq`/`gemini`/`openrouter` exist.
2. **test_provider_picker_reflects_current_value**: Render with `value="openrouter"`; assert the select's value is `"openrouter"`.
3. **test_provider_picker_calls_onChange_with_string**: Fire a `change` event choosing `"gemini"`; assert the spy was called with `"gemini"` (a string).
4. **test_app_renders_provider_picker**: Render `<App />`; assert a select (provider picker) is present inside the sidebar.
5. **test_app_passes_provider_to_callProvider**: Render `<App />`, change the provider to `"gemini"`, send a message; assert the mocked `callProvider` was called with `('gemini', text, temperature, topP, maxTokens)`.
6. **test_callProvider_delegates_to_callGroq**: `await callProvider('groq', 'hi', 1, 1, 1024)`; assert `callGroq` was invoked with `('hi', 1, 1, 1024)` (mock the module's internal call, or assert via `fetch` hitting the Groq URL).
7. **test_callProvider_delegates_to_callGemini**: same, asserting the Gemini URL is hit.
8. **test_callProvider_delegates_to_callOpenRouter**: same, asserting the OpenRouter URL is hit.
9. **test_callProvider_throws_on_unknown_provider**: `await expect(callProvider('bogus', 'hi')).rejects.toThrow('Unknown provider: bogus')`.
10. **test_callGemini_posts_to_correct_url_with_key**: assert `fetch` called with the Gemini URL containing `key=test-key`.
11. **test_callGemini_sends_correct_body_shape**: assert parsed body has `contents[0].parts[0].text === 'hello'` and `generationConfig.maxOutputTokens === 1024`.
12. **test_callGemini_returns_reply_text**: mock `candidates[0].content.parts[0].text`; assert it's returned.
13. **test_callGemini_throws_on_missing_key / rate_limit / no_internet / unexpected_format**: mirror the four `callGroq` error-path tests.
14. **test_callOpenRouter_posts_to_correct_url**: assert `fetch` called with `https://openrouter.ai/api/v1/chat/completions`.
15. **test_callOpenRouter_sends_authorization_header**: assert `Authorization: Bearer test-key`.
16. **test_callOpenRouter_sends_openai_compatible_body**: assert `temperature`/`top_p`/`max_tokens` present in the parsed body.
17. **test_callOpenRouter_returns_reply_text**: mock `choices[0].message.content`; assert it's returned.
18. **test_callOpenRouter_throws_on_missing_key / rate_limit / no_internet / unexpected_format**: mirror the four `callGroq` error-path tests.

### Mocking Strategy
- `ProviderPicker` unit tests: no API mocking needed — pure controlled component, use
  `@testing-library/react` `render`/`fireEvent` (same pattern as `TopPSlider.test.jsx`).
- `App.jsx` tests: mock `callProvider` via `vi.mock('../api')` (same pattern as
  `Sidebar.test.jsx`/`App.test.jsx`) to assert call arguments without hitting the network.
- `api.js` tests: reuse the existing `mockFetchOk()` helper pattern in `api.test.js`, adapted per
  provider's response shape (`candidates[...]` for Gemini, `choices[...]` for OpenRouter);
  inspect `fetch.mock.calls[0]` (URL + `options.headers`/`options.body`) same as existing
  `callGroq` tests.

### Coverage Expectation
- All 4 FRs have at least one passing test; the tests listed above are all green before the spec
  is marked done; all pre-existing tests (`App.test.jsx`, `Sidebar.test.jsx`,
  `TemperatureSlider.test.jsx`, `TopPSlider.test.jsx`, `MaxTokensSlider.test.jsx`, `api.test.js`)
  continue to pass unmodified except where `App.test.jsx` assertions must be extended to include
  the new `provider` argument (same disambiguation pattern noted in the S4.4 checklist).

---

## References
- `roadmap.md` row S4.5 — "Add provider dropdown (Groq / Gemini / OpenRouter). Switching it
  changes which API is called", Phase 4 goal
- `specs/spec-S4.4-max-tokens-slider/spec.md` — sibling control pattern this spec mirrors
- `specs/spec-S2.1-get-api-keys/spec.md` — `VITE_GEMINI_API_KEY` / `VITE_OPENROUTER_API_KEY`
  already declared in `.env.example`
- `src/App.jsx` — lifted state pattern (`temperature`/`topP`/`maxTokens`) to follow for `provider`
- `src/api.js` — `callGroq` request/error-handling contract that `callGemini`/`callOpenRouter`
  must mirror exactly
- `src/__tests__/api.test.js`, `src/__tests__/TopPSlider.test.jsx`,
  `src/__tests__/Sidebar.test.jsx` — existing test patterns to match
