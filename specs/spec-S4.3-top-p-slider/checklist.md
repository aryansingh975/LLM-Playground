# Checklist — Spec S4.3: Top-p Slider

## Phase 1: Setup & Dependencies
- [x] Verify S4.2 (Temperature slider) is `done` and its tests pass
- [x] Create `src/TopPSlider.jsx` (new file)
- [x] No new npm packages needed — only React + Tailwind (already installed)

## Phase 2: Tests First (TDD)
- [x] Write test file: `src/__tests__/TopPSlider.test.jsx`
- [x] test_top_p_slider_renders_range_input
- [x] test_top_p_slider_shows_current_value
- [x] test_top_p_slider_calls_onChange_with_number
- [x] Add to `src/__tests__/App.test.jsx`: test_app_renders_top_p_slider, test_app_passes_top_p_to_callGroq
- [x] Add to `src/__tests__/api.test.js`: test_callGroq_sends_top_p_in_body, test_callGroq_defaults_top_p_to_one
- [x] Run tests — expect failures (Red)

## Phase 3: Implementation
- [x] Implement FR-1 — `src/TopPSlider.jsx`: controlled range input (min 0.1, max 1.0, step 0.05) + value label; `onChange` receives a `Number`
- [x] Implement FR-2 — `src/App.jsx`: add `topP` state (`useState(1)`); render `<TopPSlider>` inside `<Sidebar>` alongside `<TemperatureSlider>`
- [x] Implement FR-3 — `src/api.js`: `callGroq(prompt, temperature = 1, topP = 1)`; include `top_p` in request body; `src/App.jsx` `handleSend` passes `topP` to `callGroq`
- [x] Run tests — expect pass (Green)
- [x] Refactor if needed (none needed — mirrors TemperatureSlider exactly)

## Phase 4: Integration
- [x] Confirm `<TopPSlider>` is imported and rendered inside `<Sidebar>` in `src/App.jsx`
- [x] Confirm `handleSend` passes current `topP` value into `callGroq`
- [x] Run lint: `npx oxlint src/` — clean, exit 0
- [x] Run full test suite — 91/91 tests green (including all prior App + Sidebar + TemperatureSlider + api + ChatInput + MessageThread tests), confirmed stable across 2 consecutive runs

## Phase 5: Verification
- [x] All 7 tangible outcomes verified
- [x] No hardcoded API keys or secrets
- [x] Existing `callGroq('hello')` and `callGroq('hello', 0.5)` calls (no topP arg) still default `top_p` to `1` — verified via test_callGroq_defaults_top_p_to_one; pre-existing S4.2/S2.2/S2.3 callGroq tests unmodified
- [x] Update `roadmap.md` status for S4.3: `spec-written` → `done`

## Note
- Two pre-existing `App.test.jsx` assertions (`test_app_renders_temperature_slider`, `test_app_passes_temperature_to_callGroq`) were updated from ambiguous `screen.getByRole('slider')` to `screen.getByRole('slider', { name: /temperature/i })`, since a second slider now exists in the DOM. Assertions/intent unchanged — only the query was disambiguated.
