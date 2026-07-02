# Checklist — Spec S4.2: Temperature Slider

## Phase 1: Setup & Dependencies
- [x] Verify S4.1 (Sidebar layout) is `done` and its tests pass
- [x] Create `src/TemperatureSlider.jsx` (new file)
- [x] No new npm packages needed — only React + Tailwind (already installed)

## Phase 2: Tests First (TDD)
- [x] Write test file: `src/__tests__/TemperatureSlider.test.jsx`
- [x] test_temperature_slider_renders_range_input
- [x] test_temperature_slider_shows_current_value
- [x] test_temperature_slider_calls_onChange_with_number
- [x] Add to `src/__tests__/App.test.jsx`: test_app_renders_temperature_slider, test_app_passes_temperature_to_callGroq
- [x] Add to `src/__tests__/api.test.js`: callGroq_sends_temperature_in_body, callGroq_defaults_temperature_to_one
- [x] Run tests — expect failures (Red): confirmed missing `TemperatureSlider` module caused import-resolution failures across the suite

## Phase 3: Implementation
- [x] Implement FR-1 — `src/TemperatureSlider.jsx`: controlled range input (min 0, max 2, step 0.1) + value label; `onChange` receives a `Number`
- [x] Implement FR-2 — `src/App.jsx`: added `temperature` state (`useState(1)`); renders `<TemperatureSlider>` inside `<Sidebar>`
- [x] Implement FR-3 — `src/api.js`: `callGroq(prompt, temperature = 1)`; includes `temperature` in request body; `src/App.jsx` `handleSend` passes `temperature` to `callGroq`
- [x] Run tests — all 7 new tests pass (Green)
- [x] Refactor if needed (no behaviour change needed)

## Phase 4: Integration
- [x] Confirm `<TemperatureSlider>` is imported and rendered inside `<Sidebar>` in `src/App.jsx`
- [x] Confirm `handleSend` passes current `temperature` value into `callGroq`
- [x] Run lint: `npx oxlint src/` — clean, no errors
- [x] Run full test suite — 84/84 tests green (including all prior App + Sidebar + api + ChatInput + MessageThread tests)

## Phase 5: Verification
- [x] All 7 tangible outcomes verified
- [x] No hardcoded API keys or secrets
- [x] Existing `callGroq('hello')` calls (no temperature arg) still default to `1` — no pre-existing test modified
- [x] Update `roadmap.md` status for S4.2: `spec-written` → `done`
