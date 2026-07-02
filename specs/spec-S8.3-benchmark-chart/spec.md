# Spec S8.3 — Benchmark Chart

## Overview
Add a bar chart showing standard benchmark scores (MMLU, HumanEval, GSM8K) for each of the
project's three free models (Groq, Gemini, OpenRouter), and wire it into the "Benchmarks" section
of `EvaluatePage` (built as a placeholder in S8.1), replacing the "Benchmark chart coming soon"
text. Uses Chart.js (via `react-chartjs-2`), per the roadmap tech stack, with a static,
publicly-published score dataset — no live benchmark API (this project makes no paid/authenticated
calls beyond the chat providers already in use).

## Dependencies
- S8.1 — Evaluate Route (`done`). Provides `EvaluatePage` and the `eval-benchmark-section`
  placeholder ("Benchmark chart coming soon") this spec replaces.

## Target Location
`src/BenchmarkChart.jsx` (new file — static dataset + the chart component), `src/EvaluatePage.jsx`
(modified — replace the "Benchmarks" placeholder with `<BenchmarkChart />`), `package.json`
(modified — add `chart.js` and `react-chartjs-2` dependencies)

---

## Functional Requirements

### FR-1: Static benchmark dataset, one entry per project model
- **What**: `BenchmarkChart.jsx` exports a `BENCHMARK_DATA` constant: an array of exactly 3 entries
  (one per provider this project already supports — Groq, Gemini, OpenRouter — matching
  `ResponseCard`'s `PROVIDER_LABELS`), each shaped `{ model: string, mmlu: number, humaneval:
  number, gsm8k: number }` with publicly published scores (0-100 scale) for the specific free model
  each provider serves in this project.
- **Inputs**: None — hardcoded data, no fetch.
- **Outputs**: `BENCHMARK_DATA` array usable both as the chart's default data and as a directly
  testable/importable value.
- **Edge cases**: None — static data, always well-formed by construction.

### FR-2: `BenchmarkChart` renders a grouped bar chart via Chart.js
- **What**: Renders a `react-chartjs-2` `<Bar>` chart with one label per model (x-axis) and three
  datasets — "MMLU", "HumanEval", "GSM8K" — each an array of that benchmark's score per model, in
  the same order as the labels. Y-axis is scores 0-100.
- **Inputs**: optional `data` prop — an array shaped like `BENCHMARK_DATA` (defaults to
  `BENCHMARK_DATA` when omitted).
- **Outputs**: a `<Bar>` element receiving `data.labels` (model names) and `data.datasets` (3
  entries, each `{ label, data }` with per-model scores in label order).
- **Edge cases**: an empty `data` array renders a `<Bar>` with empty `labels`/`datasets` arrays
  rather than throwing.

### FR-3: `EvaluatePage`'s "Benchmarks" section renders `BenchmarkChart`
- **What**: Inside `eval-benchmark-section`, `EvaluatePage` renders `<BenchmarkChart />` in place of
  the S8.1 "Benchmark chart coming soon" placeholder text. The section, its `data-testid`, and its
  "Benchmarks" sub-heading are unchanged from S8.1.
- **Inputs**: None — `EvaluatePage` still takes no benchmark-related props (mirrors S8.1's
  no-props-needed pattern for this section; S8.2's `sampleResponses` prop is unaffected).
- **Outputs**: `eval-benchmark-section` contains the chart element; the old placeholder text is
  gone.
- **Edge cases**: None beyond FR-2's.

---

## Tangible Outcomes

- [ ] **Outcome 1**: `BENCHMARK_DATA` has exactly 3 entries (Groq, Gemini, OpenRouter), each with
  numeric `mmlu`, `humaneval`, `gsm8k` fields.
- [ ] **Outcome 2**: `BenchmarkChart` passes a `<Bar>` chart `labels` matching the model names and 3
  datasets ("MMLU", "HumanEval", "GSM8K") with per-model scores in the same order as the labels;
  passing a custom `data` prop overrides the default dataset.
- [ ] **Outcome 3**: `EvaluatePage`'s `eval-benchmark-section` renders the chart component instead of
  the "Benchmark chart coming soon" placeholder, with `eval-rate-section` (S8.2) unaffected.

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)
1. **test_benchmark_data_has_one_entry_per_model** (`BenchmarkChart.test.jsx`): import
   `BENCHMARK_DATA`; assert it has 3 entries and each has `model`, `mmlu`, `humaneval`, `gsm8k`
   fields, with the three benchmark fields numeric and within `0`-`100`.
2. **test_benchmark_chart_passes_labels_and_datasets_to_bar** (`BenchmarkChart.test.jsx`, mocking
   `react-chartjs-2`'s `Bar`): render `<BenchmarkChart />`; assert the mocked `Bar` was called with
   `data.labels` equal to `BENCHMARK_DATA.map(d => d.model)` and `data.datasets` containing 3
   entries labeled "MMLU"/"HumanEval"/"GSM8K", each `data` array matching the corresponding field
   from `BENCHMARK_DATA` in label order.
3. **test_benchmark_chart_accepts_custom_data_prop** (`BenchmarkChart.test.jsx`): render
   `<BenchmarkChart data={[{ model: 'Test Model', mmlu: 10, humaneval: 20, gsm8k: 30 }]} />`; assert
   the mocked `Bar` received `labels: ['Test Model']` and datasets with `data: [10]` / `[20]` /
   `[30]` for MMLU/HumanEval/GSM8K respectively (not the default `BENCHMARK_DATA`).
4. **test_benchmark_chart_handles_empty_data** (`BenchmarkChart.test.jsx`): render `<BenchmarkChart
   data={[]} />`; assert the mocked `Bar` received `labels: []` and 3 datasets each with `data: []`,
   with no error thrown.
5. **test_evaluate_page_benchmark_section_renders_chart** (`EvaluatePage.test.jsx`, mocking
   `react-chartjs-2`): render `<EvaluatePage />`; assert `eval-benchmark-section` contains the
   (mocked) chart element and no longer shows "Benchmark chart coming soon".

### Mocking Strategy
- No network mocking needed — `BENCHMARK_DATA` is static, no `fetch`/`callProvider` involved.
- Mock `react-chartjs-2`'s `Bar` export (`vi.mock('react-chartjs-2', ...)`) with a stub that renders
  a `data-testid="benchmark-bar-chart"` element and exposes the `data`/`options` props it received
  (e.g. via a `data-props={JSON.stringify(...)}` attribute or a shared spy) — this avoids exercising
  real `<canvas>` rendering in jsdom, matching how this repo avoids other environment-unfriendly
  browser APIs in tests.
- Use `@testing-library/react` (`render`, `screen`) with jsdom, matching every other component test
  in this repo.

### Coverage Expectation
- All 3 FRs covered by at least one test; all 5 tests above are green; pre-existing
  `EvaluatePage.test.jsx` tests from S8.1/S8.2 continue to pass, updated only where the "Benchmarks"
  placeholder-text assertion needs to reflect the new chart content.

---

## References
- `roadmap.md` row S8.3 — "Bar chart showing MMLU / HumanEval / GSM8K scores for each free model";
  Tech Stack table — Chart.js; Phase 8 goal — "see how models compare on standard tests"
- `specs/spec-S8.1-eval-route/spec.md` — `EvaluatePage` layout and `eval-benchmark-section`
  placeholder this spec replaces
- `specs/spec-S8.2-star-rating/spec.md` — precedent for a self-contained widget wired into
  `EvaluatePage`, and for the `EvaluatePage.test.jsx` update pattern
- `src/ResponseCard.jsx` (`PROVIDER_LABELS`) — the three provider/model identities `BENCHMARK_DATA`
  mirrors
- `src/EvaluationPanel.jsx` — existing MMLU/HumanEval/GSM8K explainer text (Learn tab); this spec
  adds the actual scored comparison, not the concept explanation
