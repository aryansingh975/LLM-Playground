# Checklist — Spec S8.3: Benchmark Chart

## Phase 1: Setup & Dependencies
- [x] Verify S8.1 (evaluate route) is `done`
- [x] Create `src/BenchmarkChart.jsx`
- [x] Add `chart.js` and `react-chartjs-2` to `package.json` dependencies; `npm install`

## Phase 2: Tests First (TDD)
- [x] Write test file: `src/__tests__/BenchmarkChart.test.jsx`
  - [x] test_benchmark_data_has_one_entry_per_model
  - [x] test_benchmark_chart_passes_labels_and_datasets_to_bar
  - [x] test_benchmark_chart_accepts_custom_data_prop
  - [x] test_benchmark_chart_handles_empty_data
- [x] Update `src/__tests__/EvaluatePage.test.jsx`
  - [x] test_evaluate_page_benchmark_section_renders_chart
- [x] Run tests — expect failures (Red)

## Phase 3: Implementation
- [x] Implement FR-1 — `BenchmarkChart.jsx`: `BENCHMARK_DATA` constant (Groq/Gemini/OpenRouter,
  MMLU/HumanEval/GSM8K scores)
- [x] Implement FR-2 — `BenchmarkChart.jsx`: `<Bar>` chart from `react-chartjs-2`, `data` prop
  (defaults to `BENCHMARK_DATA`), register required Chart.js pieces (`Chart.js` `register(...)`)
- [x] Implement FR-3 — `EvaluatePage.jsx`: render `<BenchmarkChart />` inside
  `eval-benchmark-section`, remove the "Benchmark chart coming soon" placeholder
- [x] Run tests — expect pass (Green)
- [x] Refactor if needed — none needed

## Phase 4: Integration
- [x] Confirm `/evaluate` still renders both sections; `eval-rate-section` (S8.2) unaffected
- [x] Run lint: `npx oxlint src/` — clean (1 non-blocking `react-refresh` warning re: exporting
  `BENCHMARK_DATA` alongside the component, needed for FR-1's testability requirement)
- [x] Run full test suite: `npm run test` — 209/209 passed (24 test files)

## Phase 5: Verification
- [x] All 3 tangible outcomes verified
- [x] No hardcoded secrets/tokens (benchmark scores are public data, not credentials)
- [x] Update `roadmap.md` status for S8.3: `spec-written` → `done` (after implementation)
