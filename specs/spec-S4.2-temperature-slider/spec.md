# Spec S4.2 — Temperature Slider

## Overview
Add a temperature slider (range 0–2) to the sidebar built in S4.1. The slider controls the
`temperature` parameter sent to Groq's chat-completions API, letting the user see how a higher
temperature makes replies more random/creative and a lower temperature makes them more
deterministic. The slider's value must live in `App.jsx` state (lifted state, the same pattern
already used for `messages`/`error`/`loading`) and be threaded through `handleSend` into
`callGroq`, which gains a `temperature` parameter and includes it in the request body.

## Dependencies
- S4.1 — `<Sidebar>` component and flex layout exist in `App.jsx`; this spec fills the sidebar's
  `children` slot with the first control.

## Target Location
`src/TemperatureSlider.jsx` (new file), `src/App.jsx` (lift state + wire into `<Sidebar>` and
`handleSend`), `src/api.js` (`callGroq` gains a `temperature` parameter)

---

## Functional Requirements

### FR-1: New `<TemperatureSlider>` component
- **What**: A controlled React component rendering an `<input type="range">` (min `0`, max `2`,
  step `0.1`) plus a label showing the current numeric value (e.g. "Temperature: 1.0").
- **Inputs**: `value` (number, required), `onChange` (function, required — called with the new
  numeric value on every slider move).
- **Outputs**: Renders the range input and value label; calling `onChange` is the only side
  effect (no internal state — fully controlled by the parent).
- **Edge cases**: Value below `0` or above `2` cannot occur because the native range input clamps
  to `min`/`max`. `onChange` must receive a `Number`, not the raw string event value, so callers
  never need to parse it themselves.

### FR-2: `App.jsx` lifts `temperature` state and wires it into the sidebar
- **What**: `App.jsx` adds `const [temperature, setTemperature] = useState(1)` (1 is Groq's
  default) and renders `<Sidebar><TemperatureSlider value={temperature} onChange={setTemperature} /></Sidebar>`.
- **Inputs**: No new props — internal state only.
- **Outputs**: The slider appears inside the sidebar panel; moving it updates `temperature` state.
- **Edge cases**: Sidebar must still render correctly with a child now present (regression check
  from S4.1's "future children mount without layout breakage" edge case).

### FR-3: `temperature` threaded into `callGroq`
- **What**: `handleSend` in `App.jsx` calls `callGroq(text, temperature)` instead of
  `callGroq(text)`. `callGroq` in `src/api.js` accepts a second parameter `temperature = 1`
  (default keeps existing callers/tests working) and includes `temperature` in the JSON request
  body sent to Groq.
- **Inputs**: `prompt` (string), `temperature` (number, optional, defaults to `1`).
- **Outputs**: The `fetch` call's body is `JSON.stringify({ model, messages, temperature })`.
- **Edge cases**: Existing calls to `callGroq('hello')` (no temperature arg) must keep working
  and default to `1` — this preserves all S2.2/S2.3 tests without modification.

---

## Tangible Outcomes

- [ ] **Outcome 1**: `src/TemperatureSlider.jsx` exists and exports a default React component.
- [ ] **Outcome 2**: Rendering `<TemperatureSlider value={1} onChange={fn} />` shows a range input
  with `min="0"`, `max="2"`, and a visible label containing "1".
- [ ] **Outcome 3**: Firing a `change` event on the slider calls `onChange` with a numeric value
  (not a string).
- [ ] **Outcome 4**: Rendering `<App />` shows the temperature slider inside the sidebar.
- [ ] **Outcome 5**: Sending a message calls `callGroq` with the current `temperature` value as
  the second argument.
- [ ] **Outcome 6**: `callGroq('hello', 0.5)` sends a request body whose parsed JSON has
  `temperature === 0.5`.
- [ ] **Outcome 7**: `callGroq('hello')` (temperature omitted) sends a request body with
  `temperature === 1` — all pre-existing `api.test.js` tests still pass unmodified.

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)
1. **test_temperature_slider_renders_range_input**: Render `<TemperatureSlider value={1} onChange={vi.fn()} />`; query the range input; assert `min="0"` and `max="2"`.
2. **test_temperature_slider_shows_current_value**: Render with `value={1.5}`; assert a label/text containing "1.5" is in the document.
3. **test_temperature_slider_calls_onChange_with_number**: Render with an `onChange` spy; fire a `change` event with target value `"0.4"`; assert the spy was called with the number `0.4` (not the string `"0.4"`).
4. **test_app_renders_temperature_slider**: Render `<App />`; assert a range input is present inside the sidebar (e.g. via `screen.getByRole('slider')` or querying `input[type="range"]`).
5. **test_app_passes_temperature_to_callGroq**: Render `<App />`, move the slider, send a message; assert the mocked `callGroq` was called with `(text, newTemperatureValue)`.
6. **test_callGroq_sends_temperature_in_body**: `await callGroq('hello', 0.5)`; parse `fetch.mock.calls[0][1].body`; assert `temperature === 0.5`.
7. **test_callGroq_defaults_temperature_to_one**: `await callGroq('hello')`; parse the sent body; assert `temperature === 1`.

### Mocking Strategy
- `TemperatureSlider` unit tests: no API mocking needed — pure controlled component, use
  `@testing-library/react` `render`/`fireEvent`.
- `App.jsx` tests: mock `callGroq` via `vi.mock('../api')` (same pattern as `Sidebar.test.jsx` /
  `App.test.jsx`) to assert call arguments without hitting the network.
- `api.js` tests: reuse the existing `mockFetchOk()` helper pattern in `api.test.js`; inspect
  `fetch.mock.calls[0][1].body` (JSON string) to verify the `temperature` field.

### Coverage Expectation
- All 3 FRs have at least one passing test; the 7 named tests above are all green before the spec
  is marked done; all pre-existing tests (`App.test.jsx`, `Sidebar.test.jsx`, `api.test.js`)
  continue to pass unmodified.

---

## References
- `roadmap.md` row S4.2 — "Temperature slider" (0–2), Phase 4 goal
- `specs/spec-S4.1-sidebar-layout/spec.md` — sidebar `children` slot this spec fills
- `src/App.jsx` — lifted state pattern (`messages`/`error`/`loading`) to follow for `temperature`
- `src/api.js` — `callGroq` request body structure to extend
- `src/__tests__/api.test.js`, `src/__tests__/Sidebar.test.jsx` — existing test patterns to match
