# Spec S4.3 — Top-p Slider

## Overview
Add a top-p slider (range 0.1–1.0) to the sidebar, alongside the temperature slider built in
S4.2. The slider controls the `top_p` parameter sent to Groq's chat-completions API. Top-p
(nucleus sampling) restricts token selection to the smallest set of tokens whose cumulative
probability reaches `top_p`, which is a different randomness knob than `temperature` (which
reshapes the whole probability distribution rather than truncating it). The slider's value must
live in `App.jsx` state (lifted state, the same pattern already used for
`temperature`/`messages`/`error`/`loading`) and be threaded through `handleSend` into `callGroq`,
which gains a `topP` parameter and includes it as `top_p` in the request body.

## Dependencies
- S4.2 — Temperature slider pattern (`<TemperatureSlider>`, lifted state in `App.jsx`, `callGroq`
  request body shape) exists and is `done`; this spec mirrors that pattern for top-p.

## Target Location
`src/TopPSlider.jsx` (new file), `src/App.jsx` (lift state + wire into `<Sidebar>` and
`handleSend`), `src/api.js` (`callGroq` gains a `topP` parameter)

---

## Functional Requirements

### FR-1: New `<TopPSlider>` component
- **What**: A controlled React component rendering an `<input type="range">` (min `0.1`, max `1.0`,
  step `0.05`) plus a label showing the current numeric value (e.g. "Top-p: 1").
- **Inputs**: `value` (number, required), `onChange` (function, required — called with the new
  numeric value on every slider move).
- **Outputs**: Renders the range input and value label; calling `onChange` is the only side
  effect (no internal state — fully controlled by the parent, same shape as `TemperatureSlider`).
- **Edge cases**: Value below `0.1` or above `1.0` cannot occur because the native range input
  clamps to `min`/`max`. `onChange` must receive a `Number`, not the raw string event value, so
  callers never need to parse it themselves.

### FR-2: `App.jsx` lifts `topP` state and wires it into the sidebar
- **What**: `App.jsx` adds `const [topP, setTopP] = useState(1)` (1 is Groq's default — no
  truncation) and renders `<TopPSlider value={topP} onChange={setTopP} />` inside `<Sidebar>`,
  alongside the existing `<TemperatureSlider>`.
- **Inputs**: No new props — internal state only.
- **Outputs**: The slider appears inside the sidebar panel, below the temperature slider; moving
  it updates `topP` state.
- **Edge cases**: Sidebar must still render correctly with two children now present (regression
  check — mirrors the "future children mount without layout breakage" edge case from S4.1/S4.2).

### FR-3: `topP` threaded into `callGroq`
- **What**: `handleSend` in `App.jsx` calls `callGroq(text, temperature, topP)` instead of
  `callGroq(text, temperature)`. `callGroq` in `src/api.js` accepts a third parameter
  `topP = 1` (default keeps existing callers/tests working) and includes it as `top_p` in the
  JSON request body sent to Groq.
- **Inputs**: `prompt` (string), `temperature` (number, optional, defaults to `1`), `topP` (number,
  optional, defaults to `1`).
- **Outputs**: The `fetch` call's body is `JSON.stringify({ model, messages, temperature, top_p })`.
- **Edge cases**: Existing calls to `callGroq('hello')` and `callGroq('hello', 0.5)` (no `topP`
  arg) must keep working and default `top_p` to `1` — this preserves all S4.2/S2.2/S2.3 tests
  without modification.

---

## Tangible Outcomes

- [ ] **Outcome 1**: `src/TopPSlider.jsx` exists and exports a default React component.
- [ ] **Outcome 2**: Rendering `<TopPSlider value={1} onChange={fn} />` shows a range input with
  `min="0.1"`, `max="1"`, and a visible label containing "1".
- [ ] **Outcome 3**: Firing a `change` event on the slider calls `onChange` with a numeric value
  (not a string).
- [ ] **Outcome 4**: Rendering `<App />` shows the top-p slider inside the sidebar, alongside the
  temperature slider.
- [ ] **Outcome 5**: Sending a message calls `callGroq` with the current `temperature` and `topP`
  values as the second and third arguments.
- [ ] **Outcome 6**: `callGroq('hello', 1, 0.5)` sends a request body whose parsed JSON has
  `top_p === 0.5`.
- [ ] **Outcome 7**: `callGroq('hello')` and `callGroq('hello', 0.5)` (topP omitted) send a
  request body with `top_p === 1` — all pre-existing `api.test.js` tests still pass unmodified.

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)
1. **test_top_p_slider_renders_range_input**: Render `<TopPSlider value={1} onChange={vi.fn()} />`; query the range input; assert `min="0.1"` and `max="1"`.
2. **test_top_p_slider_shows_current_value**: Render with `value={0.8}`; assert a label/text containing "0.8" is in the document.
3. **test_top_p_slider_calls_onChange_with_number**: Render with an `onChange` spy; fire a `change` event with target value `"0.4"`; assert the spy was called with the number `0.4` (not the string `"0.4"`).
4. **test_app_renders_top_p_slider**: Render `<App />`; assert a second range input (top-p) is present inside the sidebar, alongside the temperature slider.
5. **test_app_passes_top_p_to_callGroq**: Render `<App />`, move the top-p slider, send a message; assert the mocked `callGroq` was called with `(text, temperature, newTopPValue)`.
6. **test_callGroq_sends_top_p_in_body**: `await callGroq('hello', 1, 0.5)`; parse `fetch.mock.calls[0][1].body`; assert `top_p === 0.5`.
7. **test_callGroq_defaults_top_p_to_one**: `await callGroq('hello')`; parse the sent body; assert `top_p === 1`.

### Mocking Strategy
- `TopPSlider` unit tests: no API mocking needed — pure controlled component, use
  `@testing-library/react` `render`/`fireEvent` (same pattern as `TemperatureSlider.test.jsx`).
- `App.jsx` tests: mock `callGroq` via `vi.mock('../api')` (same pattern as
  `Sidebar.test.jsx`/`App.test.jsx`) to assert call arguments without hitting the network.
- `api.js` tests: reuse the existing `mockFetchOk()` helper pattern in `api.test.js`; inspect
  `fetch.mock.calls[0][1].body` (JSON string) to verify the `top_p` field.

### Coverage Expectation
- All 3 FRs have at least one passing test; the 7 named tests above are all green before the spec
  is marked done; all pre-existing tests (`App.test.jsx`, `Sidebar.test.jsx`,
  `TemperatureSlider.test.jsx`, `api.test.js`) continue to pass unmodified.

---

## References
- `roadmap.md` row S4.3 — "Top-p slider" (0.1–1.0), Phase 4 goal
- `specs/spec-S4.2-temperature-slider/spec.md` — sibling slider pattern this spec mirrors
- `src/App.jsx` — lifted state pattern (`temperature`/`messages`/`error`/`loading`) to follow for `topP`
- `src/api.js` — `callGroq` request body structure to extend with `top_p`
- `src/__tests__/api.test.js`, `src/__tests__/TemperatureSlider.test.jsx`, `src/__tests__/Sidebar.test.jsx` — existing test patterns to match
