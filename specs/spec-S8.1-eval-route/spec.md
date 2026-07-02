# Spec S8.1 — Evaluate Route

## Overview
Add an `/evaluate` route with two stacked sub-sections — "Rate Responses" and "Benchmarks" — the
foundation for Phase 8 (Evaluation Tab). This spec is layout-only, following the same
placeholder-then-fill pattern S6.1 used for `LearnPage` and S7.1 used for `ComparePage`: get the
route, nav link, and section structure in place first, then S8.2 replaces the "Rate Responses"
placeholder with a real star-rating widget (per `S3.2` message thread entries), and S8.3 replaces
the "Benchmarks" placeholder with a real MMLU/HumanEval/GSM8K bar chart.

## Dependencies
- S6.1 — Routing (`done`). Provides the `BrowserRouter`/`Routes` shell in `App.jsx` and the
  `NavBar` this spec adds a link to.

## Target Location
`src/EvaluatePage.jsx` (new file — two-section layout), `src/App.jsx` (modified — add `/evaluate`
route), `src/NavBar.jsx` (modified — add "Evaluate" link)

---

## Functional Requirements

### FR-1: `/evaluate` route added to `App.jsx`
- **What**: `App.jsx`'s `<Routes>` gains a fifth route, `/evaluate` → `<EvaluatePage />`, alongside
  the existing `/chat`, `/learn`, `/compare`, and catch-all.
- **Inputs**: None — routing state comes from the browser URL, same as the existing routes.
- **Outputs**: Visiting `/evaluate` renders `EvaluatePage`; `/chat`, `/learn`, `/compare` behavior is
  unaffected; the catch-all still redirects unknown paths to `/chat`.
- **Edge cases**: None beyond what S6.1 already covers for route dispatch.

### FR-2: `NavBar` links to `/evaluate`
- **What**: `NavBar` adds a fourth `NavLink`, "Evaluate" → `/evaluate`, alongside "Chat", "Learn",
  and "Compare", using the same `linkClassName` active-state helper already in `NavBar.jsx`.
- **Inputs**: None — reads the current route internally via `NavLink`.
- **Outputs**: Clicking "Evaluate" navigates to `/evaluate`; the link matching the active route has
  `aria-current="page"` (same mechanism S6.1/S7.1 already established for the other links).
- **Edge cases**: On `/evaluate`, only the Evaluate link is marked active; Chat/Learn/Compare links
  are unaffected by this addition.

### FR-3: `EvaluatePage` renders two stacked sub-sections
- **What**: `EvaluatePage` renders a heading ("Evaluate") followed by two `<section>` blocks, each
  with its own sub-heading and a placeholder content area: "Rate Responses"
  (`data-testid="eval-rate-section"`, placeholder text such as "No responses to rate yet") and
  "Benchmarks" (`data-testid="eval-benchmark-section"`, placeholder text such as "Benchmark chart
  coming soon"). This mirrors `LearnPage`'s stacked-`<section>` convention.
- **Inputs/Outputs**: None — `EvaluatePage` is a self-contained, no-props component (same pattern as
  `ChatPage`/`LearnPage`/`ComparePage`), static placeholder content only.
- **Edge cases**: None — no rating or benchmark data exists yet (that is S8.2's and S8.3's scope);
  the placeholders are inert.

---

## Tangible Outcomes

- [ ] **Outcome 1**: Visiting `/evaluate` (via `App`) renders `EvaluatePage`; `/chat`, `/learn`,
  `/compare`, and the unknown-path redirect all continue to work exactly as before.
- [ ] **Outcome 2**: `NavBar` renders an "Evaluate" link; it has `aria-current="page"` only when the
  current route is `/evaluate`.
- [ ] **Outcome 3**: `EvaluatePage` renders both `eval-rate-section` and `eval-benchmark-section`
  placeholder elements on initial render, each under its own sub-heading ("Rate Responses" /
  "Benchmarks").

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)
1. **test_navbar_renders_evaluate_link** (`NavBar.test.jsx`, wrapped in `MemoryRouter`): assert a
   link named "Evaluate" (`href="/evaluate"`) is present alongside the existing Chat/Learn/Compare
   links.
2. **test_evaluate_link_active_at_evaluate_route** (`NavBar.test.jsx`, `MemoryRouter
   initialEntries={['/evaluate']}`): Evaluate link has `aria-current="page"`; Chat/Learn/Compare
   links do not.
3. **test_app_navigating_to_evaluate_shows_evaluate_page** (`App.test.jsx`): render `<App />`; click
   the "Evaluate" link; assert both sub-heading texts ("Rate Responses", "Benchmarks") are visible
   and `prompt-input` (the chat page's input) is gone.
4. **test_evaluate_page_renders_rate_responses_section** (`EvaluatePage.test.jsx`): render
   `<EvaluatePage />`; assert `getByTestId('eval-rate-section')` is present under the "Rate
   Responses" sub-heading.
5. **test_evaluate_page_renders_benchmarks_section** (`EvaluatePage.test.jsx`): render
   `<EvaluatePage />`; assert `getByTestId('eval-benchmark-section')` is present under the
   "Benchmarks" sub-heading.

### Mocking Strategy
- No network mocking needed — `EvaluatePage` in this spec is pure static layout, no
  `callProvider`/`fetch` calls. `App.test.jsx` continues to mock `../api` only because `ChatPage`
  (rendered at `/chat`) still needs it, not because of anything new in this spec.
- `NavBar.test.jsx` continues to use `react-router-dom`'s `MemoryRouter` to test router-dependent
  link behavior in isolation, matching the S6.1/S7.1 pattern.
- Use `@testing-library/react` (`render`, `screen`, `fireEvent`) with jsdom, matching every other
  component test in this repo.

### Coverage Expectation
- All 3 FRs covered by at least one test; all 5 tests above are green; all pre-existing tests
  (`NavBar.test.jsx`, `App.test.jsx`, and every other `src/__tests__/*` file) continue to pass with
  zero unintended modifications.

---

## References
- `roadmap.md` row S8.1 — "Add `/evaluate` route. Two sub-sections: rate responses, view
  benchmarks"; Phase 8 goal — "users can star-rate AI answers and see how models compare on
  standard tests"
- `specs/spec-S6.1-routing/spec.md`, `specs/spec-S7.1-compare-route/spec.md` — route/nav/placeholder
  pattern this spec extends
- `src/LearnPage.jsx` — precedent for stacked `<section>` sub-headings within one page
- `specs/spec-S8.2-star-rating/`, `specs/spec-S8.3-benchmark-chart/` (future) — replace the
  placeholder sections with the real star-rating widget and benchmark bar chart
