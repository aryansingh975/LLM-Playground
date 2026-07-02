# Spec S4.4 — Max Tokens Slider

## Overview
Add a max tokens slider (range 64–2048) to the sidebar, alongside the temperature and top-p
sliders built in S4.2/S4.3. The slider controls the `max_tokens` parameter sent to Groq's
chat-completions API, which caps how many tokens the model is allowed to generate in its reply
(a hard length cap, unlike `temperature`/`top_p` which shape *which* tokens get picked). The
slider's value must live in `App.jsx` state (lifted state, the same pattern already used for
`temperature`/`topP`/`messages`/`error`/`loading`) and be threaded through `handleSend` into
`callGroq`, which gains a `maxTokens` parameter and includes it as `max_tokens` in the request
body.

## Dependencies
- S4.3 — Top-p slider pattern (`<TopPSlider>`, lifted state in `App.jsx`, `callGroq` request body
  shape) exists and is `done`; this spec mirrors that pattern for max tokens.

## Target Location
`src/MaxTokensSlider.jsx` (new file), `src/App.jsx` (lift state + wire into `<Sidebar>` and
`handleSend`), `src/api.js` (`callGroq` gains a `maxTokens` parameter)

---

## Functional Requirements

### FR-1: New `<MaxTokensSlider>` component
- **What**: A controlled React component rendering an `<input type="range">` (min `64`, max
  `2048`, step `64`) plus a label showing the current numeric value (e.g. "Max tokens: 1024").
- **Inputs**: `value` (number, required), `onChange` (function, required — called with the new
  numeric value on every slider move).
- **Outputs**: Renders the range input and value label; calling `onChange` is the only side
  effect (no internal state — fully controlled by the parent, same shape as `TopPSlider`).
- **Edge cases**: Value below `64` or above `2048` cannot occur because the native range input
  clamps to `min`/`max`. `onChange` must receive a `Number`, not the raw string event value, so
  callers never need to parse it themselves.

### FR-2: `App.jsx` lifts `maxTokens` state and wires it into the sidebar
- **What**: `App.jsx` adds `const [maxTokens, setMaxTokens] = useState(1024)` (a reasonable
  mid-range default) and renders `<MaxTokensSlider value={maxTokens} onChange={setMaxTokens} />`
  inside `<Sidebar>`, alongside the existing `<TemperatureSlider>` and `<TopPSlider>`.
- **Inputs**: No new props — internal state only.
- **Outputs**: The slider appears inside the sidebar panel, below the top-p slider; moving it
  updates `maxTokens` state.
- **Edge cases**: Sidebar must still render correctly with three children now present
  (regression check — mirrors the "future children mount without layout breakage" edge case from
  S4.1/S4.2/S4.3).

### FR-3: `maxTokens` threaded into `callGroq`
- **What**: `handleSend` in `App.jsx` calls `callGroq(text, temperature, topP, maxTokens)` instead
  of `callGroq(text, temperature, topP)`. `callGroq` in `src/api.js` accepts a fourth parameter
  `maxTokens = 1024` (default keeps existing callers/tests working) and includes it as
  `max_tokens` in the JSON request body sent to Groq.
- **Inputs**: `prompt` (string), `temperature` (number, optional, defaults to `1`), `topP` (number,
  optional, defaults to `1`), `maxTokens` (number, optional, defaults to `1024`).
- **Outputs**: The `fetch` call's body is
  `JSON.stringify({ model, messages, temperature, top_p, max_tokens })`.
- **Edge cases**: Existing calls to `callGroq('hello')`, `callGroq('hello', 0.5)`, and
  `callGroq('hello', 1, 0.5)` (no `maxTokens` arg) must keep working and default `max_tokens` to
  `1024` — this preserves all S4.2/S4.3/S2.2/S2.3 tests without modification.

---

## Tangible Outcomes

- [ ] **Outcome 1**: `src/MaxTokensSlider.jsx` exists and exports a default React component.
- [ ] **Outcome 2**: Rendering `<MaxTokensSlider value={1024} onChange={fn} />` shows a range input
  with `min="64"`, `max="2048"`, and a visible label containing "1024".
- [ ] **Outcome 3**: Firing a `change` event on the slider calls `onChange` with a numeric value
  (not a string).
- [ ] **Outcome 4**: Rendering `<App />` shows the max tokens slider inside the sidebar, alongside
  the temperature and top-p sliders.
- [ ] **Outcome 5**: Sending a message calls `callGroq` with the current `temperature`, `topP`, and
  `maxTokens` values as the second, third, and fourth arguments.
- [ ] **Outcome 6**: `callGroq('hello', 1, 1, 256)` sends a request body whose parsed JSON has
  `max_tokens === 256`.
- [ ] **Outcome 7**: `callGroq('hello')`, `callGroq('hello', 0.5)`, and `callGroq('hello', 1, 0.5)`
  (maxTokens omitted) send a request body with `max_tokens === 1024` — all pre-existing
  `api.test.js` tests still pass unmodified.

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)
1. **test_max_tokens_slider_renders_range_input**: Render `<MaxTokensSlider value={1024} onChange={vi.fn()} />`; query the range input; assert `min="64"` and `max="2048"`.
2. **test_max_tokens_slider_shows_current_value**: Render with `value={512}`; assert a label/text containing "512" is in the document.
3. **test_max_tokens_slider_calls_onChange_with_number**: Render with an `onChange` spy; fire a `change` event with target value `"128"`; assert the spy was called with the number `128` (not the string `"128"`).
4. **test_app_renders_max_tokens_slider**: Render `<App />`; assert a third range input (max tokens) is present inside the sidebar, alongside the temperature and top-p sliders.
5. **test_app_passes_max_tokens_to_callGroq**: Render `<App />`, move the max tokens slider, send a message; assert the mocked `callGroq` was called with `(text, temperature, topP, newMaxTokensValue)`.
6. **test_callGroq_sends_max_tokens_in_body**: `await callGroq('hello', 1, 1, 256)`; parse `fetch.mock.calls[0][1].body`; assert `max_tokens === 256`.
7. **test_callGroq_defaults_max_tokens**: `await callGroq('hello')`; parse the sent body; assert `max_tokens === 1024`.

### Mocking Strategy
- `MaxTokensSlider` unit tests: no API mocking needed — pure controlled component, use
  `@testing-library/react` `render`/`fireEvent` (same pattern as `TopPSlider.test.jsx`).
- `App.jsx` tests: mock `callGroq` via `vi.mock('../api')` (same pattern as
  `Sidebar.test.jsx`/`App.test.jsx`) to assert call arguments without hitting the network.
- `api.js` tests: reuse the existing `mockFetchOk()` helper pattern in `api.test.js`; inspect
  `fetch.mock.calls[0][1].body` (JSON string) to verify the `max_tokens` field.

### Coverage Expectation
- All 3 FRs have at least one passing test; the 7 named tests above are all green before the spec
  is marked done; all pre-existing tests (`App.test.jsx`, `Sidebar.test.jsx`,
  `TemperatureSlider.test.jsx`, `TopPSlider.test.jsx`, `api.test.js`) continue to pass unmodified.

---

## References
- `roadmap.md` row S4.4 — "Max tokens slider" (64–2048), Phase 4 goal
- `specs/spec-S4.3-top-p-slider/spec.md` — sibling slider pattern this spec mirrors
- `src/App.jsx` — lifted state pattern (`temperature`/`topP`/`messages`/`error`/`loading`) to
  follow for `maxTokens`
- `src/api.js` — `callGroq` request body structure to extend with `max_tokens`
- `src/__tests__/api.test.js`, `src/__tests__/TopPSlider.test.jsx`, `src/__tests__/Sidebar.test.jsx` — existing test patterns to match
