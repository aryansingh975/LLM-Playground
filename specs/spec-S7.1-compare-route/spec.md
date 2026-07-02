# Spec S7.1 — Compare Route

## Overview
Add a `/compare` route with a two-column layout — the foundation for Phase 7 (Multi-model
Compare). Each column gets its own independent `ProviderPicker`, so a user can pick two different
free models to compare. This spec is layout-only, following the same pattern S4.1 (Sidebar Layout)
used for the controls sidebar: get the structure and per-column state in place first, then S7.2
wires up the shared prompt + `Promise.all` send, and S7.3 replaces the placeholder response areas
with real response cards (provider name, token count, latency).

## Dependencies
- S6.1 — Routing (`done`). Provides the `BrowserRouter`/`Routes` shell in `App.jsx` and the
  `NavBar` this spec adds a link to.

## Target Location
`src/ComparePage.jsx` (new file — two-column layout), `src/App.jsx` (modified — add `/compare`
route), `src/NavBar.jsx` (modified — add "Compare" link), `src/ProviderPicker.jsx` (modified — add
optional `id`/`label` props so two independent instances can render on one page without duplicate
DOM ids; existing callers keep the current defaults, so `ChatPage.jsx`'s usage is unaffected)

---

## Functional Requirements

### FR-1: `ProviderPicker` accepts optional `id`/`label` props
- **What**: `ProviderPicker` gains two optional props, `id` (default `'provider-picker'`) and
  `label` (default `'Provider'`), used for the `<select>`'s `id`/`htmlFor` and the `<label>` text
  respectively. This lets `ComparePage` render two instances on the same page (e.g.
  `id="compare-provider-left"`, `label="Left Provider"`) without colliding DOM ids or ambiguous
  `getByLabelText('Provider')` queries. `ChatPage.jsx`'s existing usage passes no `id`/`label`, so
  its rendered output is unchanged (still `id="provider-picker"`, label "Provider").
- **Inputs**: `value`, `onChange` (unchanged), plus new optional `id: string`, `label: string`.
- **Outputs**: `<select id={id}>` and `<label htmlFor={id}>{label}</label>`.
- **Edge cases**: Omitting `id`/`label` reproduces the exact pre-S7.1 markup — all 3 existing
  `ProviderPicker.test.jsx` tests must keep passing unmodified.

### FR-2: `/compare` route added to `App.jsx`
- **What**: `App.jsx`'s `<Routes>` gains a fourth route, `/compare` → `<ComparePage />`, alongside
  the existing `/chat`, `/learn`, and catch-all.
- **Inputs**: None — routing state comes from the browser URL, same as the existing routes.
- **Outputs**: Visiting `/compare` renders `ComparePage`; `/chat` and `/learn` behavior is
  unaffected; the catch-all still redirects unknown paths to `/chat`.
- **Edge cases**: None beyond what S6.1 already covers for route dispatch.

### FR-3: `NavBar` links to `/compare`
- **What**: `NavBar` adds a third `NavLink`, "Compare" → `/compare`, alongside "Chat" and "Learn",
  using the same `linkClassName` active-state helper already in `NavBar.jsx`.
- **Inputs**: None — reads the current route internally via `NavLink`.
- **Outputs**: Clicking "Compare" navigates to `/compare`; the link matching the active route has
  `aria-current="page"` (same mechanism S6.1 already established for Chat/Learn).
- **Edge cases**: On `/compare`, only the Compare link is marked active; Chat/Learn links are
  unaffected by this addition.

### FR-4: `ComparePage` renders a two-column layout with independent provider state
- **What**: `ComparePage` renders two side-by-side columns (`flex flex-row`, each column
  `flex-1`). Each column owns its own `useState` for its provider (`leftProvider`/
  `rightProvider`) and renders a `<ProviderPicker>` wired to that state, with distinct `id`/`label`
  props from FR-1 (`id="compare-provider-left"`/`label="Left Provider"` and
  `id="compare-provider-right"`/`label="Right Provider"`). Changing one column's picker does not
  affect the other — they are fully independent state.
- **Inputs**: None — `ComparePage` is a self-contained, no-props component (same pattern as
  `ChatPage`/`LearnPage`).
- **Outputs**: Two `<ProviderPicker>` instances in the DOM, each independently selectable via its
  own label.
- **Edge cases**: Selecting the same provider in both columns is allowed (no validation forcing
  them to differ) — comparing a model against itself is a valid, if uninteresting, use case.

### FR-5: Default providers differ; each column has a placeholder response area
- **What**: The left column defaults to `'groq'` and the right column defaults to `'gemini'`, so
  the two columns show different models out of the box. Each column also renders a placeholder
  response area (`data-testid="compare-response-left"` / `"compare-response-right"`, text such as
  "Response will appear here") — an empty slot for S7.3's response cards, following the same
  placeholder-then-fill pattern S6.1 used for `LearnPage`.
- **Inputs/Outputs**: None beyond the static default state and placeholder markup.
- **Edge cases**: None — no prompt input or send action exists yet in this spec (that is S7.2's
  scope); the placeholders are inert.

---

## Tangible Outcomes

- [ ] **Outcome 1**: `ProviderPicker` renders with custom `id`/`label` when passed, and with the
  original `id="provider-picker"`/label "Provider" when they are omitted; all 3 pre-existing
  `ProviderPicker.test.jsx` tests pass unmodified.
- [ ] **Outcome 2**: Visiting `/compare` (via `App`) renders `ComparePage`; `/chat`, `/learn`, and
  the unknown-path redirect all continue to work exactly as before.
- [ ] **Outcome 3**: `NavBar` renders a "Compare" link; it has `aria-current="page"` only when the
  current route is `/compare`.
- [ ] **Outcome 4**: `ComparePage` renders two independently-labelled `ProviderPicker` instances
  ("Left Provider", "Right Provider"); changing the left picker's value does not change the
  right picker's value, and vice versa.
- [ ] **Outcome 5**: On initial render, the left picker's value is `'groq'` and the right picker's
  value is `'gemini'`.
- [ ] **Outcome 6**: Both `compare-response-left` and `compare-response-right` placeholder elements
  are present in the DOM on initial render.

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)
1. **test_provider_picker_accepts_custom_id_and_label** (`ProviderPicker.test.jsx`): render with
   `id="compare-provider-left"` and `label="Left Provider"`; assert `getByLabelText('Left
   Provider')` returns a select with `id="compare-provider-left"`.
2. **test_provider_picker_default_id_and_label_unchanged** (`ProviderPicker.test.jsx`): render with
   no `id`/`label` props; assert `getByLabelText('Provider')` returns a select with
   `id="provider-picker"` (regression guard for FR-1's default-preserving behavior).
3. **test_navbar_renders_compare_link** (`NavBar.test.jsx`, wrapped in `MemoryRouter`): assert a
   link named "Compare" (`href="/compare"`) is present alongside the existing Chat/Learn links.
4. **test_compare_link_active_at_compare_route** (`NavBar.test.jsx`, `MemoryRouter
   initialEntries={['/compare']}`): Compare link has `aria-current="page"`; Chat and Learn links do
   not.
5. **test_app_navigating_to_compare_shows_compare_page** (`App.test.jsx`): render `<App />`; click
   the "Compare" link; assert both "Left Provider" and "Right Provider" labels are visible and
   `prompt-input` (the chat page's input) is gone.
6. **test_compare_page_renders_two_columns** (`ComparePage.test.jsx`): render `<ComparePage />`;
   assert `getByLabelText('Left Provider')` and `getByLabelText('Right Provider')` are both
   present and are distinct elements.
7. **test_compare_page_columns_have_independent_provider_state** (`ComparePage.test.jsx`): change
   the left picker's value; assert the right picker's value is unchanged, and vice versa.
8. **test_compare_page_default_providers_differ** (`ComparePage.test.jsx`): render
   `<ComparePage />`; assert the left picker's value is `'groq'` and the right picker's value is
   `'gemini'`.
9. **test_compare_page_shows_placeholder_response_areas** (`ComparePage.test.jsx`): assert
   `getByTestId('compare-response-left')` and `getByTestId('compare-response-right')` are both
   present.

### Mocking Strategy
- No network mocking needed — `ComparePage` in this spec is pure layout + local `useState`, no
  `callProvider`/`fetch` calls (that begins in S7.2). `App.test.jsx` continues to mock `../api` via
  the existing `vi.mock('../api', ...)` only because `ChatPage` (rendered at `/chat`) still needs
  it, not because of anything new in this spec.
- `NavBar.test.jsx` continues to use `react-router-dom`'s `MemoryRouter` to test router-dependent
  link behavior in isolation, matching the S6.1 pattern.
- Use `@testing-library/react` (`render`, `screen`, `fireEvent`) with jsdom, matching every other
  component test in this repo.

### Coverage Expectation
- All 5 FRs covered by at least one test; all 9 tests above are green; all pre-existing tests
  (`ProviderPicker.test.jsx`, `NavBar.test.jsx`, `App.test.jsx`, and every other `src/__tests__/*`
  file) continue to pass with zero unintended modifications.

---

## References
- `roadmap.md` row S7.1 — "Add `/compare` route. Two-column layout. Each column has its own
  provider"; Phase 7 goal — "one prompt → two columns → two different AI replies"
- `specs/spec-S6.1-routing/spec.md`, `src/App.jsx`, `src/NavBar.jsx` — route/nav pattern this spec
  extends
- `specs/spec-S4.1-sidebar-layout/spec.md` — precedent for a layout-only spec (structure + state
  first, wiring/content follow in later specs)
- `src/ProviderPicker.jsx`, `specs/spec-S4.5-provider-picker/` — component reused per column
- `specs/spec-S7.2-parallel-calls/`, `specs/spec-S7.3-response-cards/` (future) — wire the shared
  prompt + `Promise.all` send and replace the placeholder response areas with real cards
