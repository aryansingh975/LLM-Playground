# Checklist — Spec S4.5: Provider Picker

## Phase 1: Setup & Dependencies
- [x] Verify S4.4 (Max tokens slider) is `done` and its tests pass
- [x] Verify S2.1 — `.env.example` already has `VITE_GEMINI_API_KEY`/`VITE_OPENROUTER_API_KEY`
- [x] Create `src/ProviderPicker.jsx` (new file)
- [x] No new npm packages needed — only React + Tailwind + native `fetch` (already used by `callGroq`)

## Phase 2: Tests First (TDD)
- [x] Write test file: `src/__tests__/ProviderPicker.test.jsx`
- [x] test_provider_picker_renders_select_with_three_options
- [x] test_provider_picker_reflects_current_value
- [x] test_provider_picker_calls_onChange_with_string
- [x] Add to `src/__tests__/App.test.jsx`: test_app_renders_provider_picker, test_app_passes_provider_to_callProvider
- [x] Add to `src/__tests__/api.test.js`: callProvider delegation tests (groq/gemini/openrouter/unknown), full callGemini test block, full callOpenRouter test block
- [x] Run tests — expect failures (Red)

## Phase 3: Implementation
- [x] Implement FR-1 — `src/ProviderPicker.jsx`: controlled `<select>` (groq/gemini/openrouter options) + label; `onChange` receives the raw string value
- [x] Implement FR-2 — `src/App.jsx`: add `provider` state (`useState('groq')`); render `<ProviderPicker>` inside `<Sidebar>` alongside the three sliders
- [x] Implement FR-3 — `src/api.js`: add `callGemini` and `callOpenRouter`, mirroring `callGroq`'s signature and error-message contract exactly
- [x] Implement FR-4 — `src/api.js`: add `callProvider(provider, prompt, temperature, topP, maxTokens)` dispatcher; throws `Unknown provider: <provider>` for unrecognized values; `src/App.jsx` `handleSend` calls `callProvider(provider, ...)` instead of `callGroq` directly
- [x] Run tests — expect pass (Green)
- [x] Refactor if needed (extract shared fetch/error-handling helper across callGroq/callGemini/callOpenRouter only if it doesn't obscure each provider's distinct request/response shape)

## Phase 4: Integration
- [x] Confirm `<ProviderPicker>` is imported and rendered inside `<Sidebar>` in `src/App.jsx`
- [x] Confirm `handleSend` calls `callProvider(provider, ...)` and no longer calls `callGroq` directly
- [x] Run lint: `npx oxlint src/` — clean, exit 0
- [x] Run full test suite — all prior tests (App, Sidebar, TemperatureSlider, TopPSlider, MaxTokensSlider, api, ChatInput, MessageThread) plus new ProviderPicker/api tests green (122/122)

## Phase 5: Verification
- [x] All 10 tangible outcomes verified
- [x] No hardcoded API keys or secrets — Gemini/OpenRouter keys read from `import.meta.env`, same as Groq
- [x] `callGemini`/`callOpenRouter` throw the same categorized errors (missing key / rate limit / no internet / unexpected format) as `callGroq` — verified via mirrored tests
- [x] Pre-existing `App.test.jsx` assertions extended (not behaviorally changed) to include the new `provider` argument in `callProvider` call assertions, mirroring the S4.4 checklist note
- [x] Update `roadmap.md` status for S4.5: `spec-written` → `done` (after implementation)

## Note
- `App.jsx` `handleSend` switched from calling `callGroq` directly to calling `callProvider`. This
  meant every pre-existing `App.test.jsx` describe block (S1.2, S2.2, S3.1, S2.3, S4.2, S4.3,
  S4.4) needed its mock/variable renamed from `callGroq` to `callProvider`, and the three
  arg-asserting tests (S4.2/S4.3/S4.4) needed a `'groq'` first argument added to their
  `toHaveBeenCalledWith(...)` assertions, since the default `provider` state is `'groq'`. Test
  intent/behavior is unchanged — only the call signature being asserted shifted, per the
  Coverage Expectation note in spec.md. `Sidebar.test.jsx`'s `../api` mock was also updated to
  export `callProvider` instead of `callGroq` for consistency (it never invokes the mock, so this
  was not required to pass, only for accuracy).
