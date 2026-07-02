# Checklist — Spec S4.4: Max Tokens Slider

## Phase 1: Setup & Dependencies
- [x] Verify S4.3 (Top-p slider) is `done` and its tests pass
- [x] Create `src/MaxTokensSlider.jsx` (new file)
- [x] No new npm packages needed — only React + Tailwind (already installed)

## Phase 2: Tests First (TDD)
- [x] Write test file: `src/__tests__/MaxTokensSlider.test.jsx`
- [x] test_max_tokens_slider_renders_range_input
- [x] test_max_tokens_slider_shows_current_value
- [x] test_max_tokens_slider_calls_onChange_with_number
- [x] Add to `src/__tests__/App.test.jsx`: test_app_renders_max_tokens_slider, test_app_passes_max_tokens_to_callGroq
- [x] Add to `src/__tests__/api.test.js`: test_callGroq_sends_max_tokens_in_body, test_callGroq_defaults_max_tokens
- [x] Run tests — expect failures (Red)

## Phase 3: Implementation
- [x] Implement FR-1 — `src/MaxTokensSlider.jsx`: controlled range input (min 64, max 2048, step 64) + value label; `onChange` receives a `Number`
- [x] Implement FR-2 — `src/App.jsx`: add `maxTokens` state (`useState(1024)`); render `<MaxTokensSlider>` inside `<Sidebar>` alongside `<TemperatureSlider>`/`<TopPSlider>`
- [x] Implement FR-3 — `src/api.js`: `callGroq(prompt, temperature = 1, topP = 1, maxTokens = 1024)`; include `max_tokens` in request body; `src/App.jsx` `handleSend` passes `maxTokens` to `callGroq`
- [x] Run tests — expect pass (Green)
- [x] Refactor if needed (none needed — mirrors TopPSlider exactly)

## Phase 4: Integration
- [x] Confirm `<MaxTokensSlider>` is imported and rendered inside `<Sidebar>` in `src/App.jsx`
- [x] Confirm `handleSend` passes current `maxTokens` value into `callGroq`
- [x] Run lint: `npx oxlint src/` — clean, exit 0
- [x] Run full test suite — 98/98 tests green (including all prior App + Sidebar + TemperatureSlider + TopPSlider + api + ChatInput + MessageThread tests)

## Phase 5: Verification
- [x] All 7 tangible outcomes verified
- [x] No hardcoded API keys or secrets
- [x] Existing `callGroq('hello')`, `callGroq('hello', 0.5)`, and `callGroq('hello', 1, 0.5)` calls (no maxTokens arg) still default `max_tokens` to `1024` — verified via test_callGroq_defaults_max_tokens; pre-existing S4.2/S4.3/S2.2/S2.3 callGroq tests unmodified
- [x] Update `roadmap.md` status for S4.4: `spec-written` → `done`

## Note
- Two pre-existing `App.test.jsx` assertions (`test_app_passes_temperature_to_callGroq`, `test_app_passes_top_p_to_callGroq`) were updated to add the new default `maxTokens` (`1024`) as a 4th argument to their `toHaveBeenCalledWith(...)` assertions, since `App.jsx` now always calls `callGroq` with all four arguments. Assertions/intent unchanged — only the expected call signature was extended, mirroring the disambiguation note left in the S4.3 checklist.
