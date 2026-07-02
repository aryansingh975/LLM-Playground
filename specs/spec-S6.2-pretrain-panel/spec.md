# Spec S6.2 — Pretrain Panel

## Overview
Replace the "coming soon" placeholder in `LearnPage.jsx` with a real Pre-training section: four
concept cards — Data Collection, Cleaning, Tokenisation, Architecture — each showing a one-line
summary plus an expandable detail paragraph. This is the first of three content specs (S6.2–S6.4)
that fill in the Learn panel scaffolded by S6.1; S6.3 (post-training) and S6.4 (evaluation +
generation) follow the same card pattern for their own sections.

## Dependencies
- S6.1 — Routing (`done`). Provides `LearnPage.jsx` mounted at `/learn` via `NavBar`/`App.jsx`; this
  spec replaces that page's placeholder content for the pre-training section only.

## Target Location
`src/PretrainPanel.jsx` (new file — the four cards), `src/LearnPage.jsx` (modified — renders
`<PretrainPanel />` under a "Pre-training" heading, replacing that portion of the placeholder text)

---

## Functional Requirements

### FR-1: `PretrainPanel` renders four concept cards
- **What**: A `PretrainPanel` component rendering four cards, one each for "Data Collection",
  "Cleaning", "Tokenisation", "Architecture". Each card always shows its title and a short one-line
  summary. Card data lives in a local array (`{ id, title, summary, detail }`) rendered via `.map()`,
  matching the list-rendering pattern already used in `MessageThread.jsx`/`TokeniserDemo.jsx`.
- **Inputs**: None — static content, no props required (self-contained component pattern, like
  `ChatInput.jsx`/`TokeniserDemo.jsx`).
- **Outputs**: Four `<article>`/`<div>` cards in the DOM, each with a heading matching its title and
  a summary line.
- **Edge cases**: None — content is static and fixed at four cards.

### FR-2: Each card expands/collapses independently on click
- **What**: Each card has a toggle (clicking the card header or a dedicated button) that reveals a
  longer `detail` paragraph explaining the concept. Clicking again collapses it. Expansion state is
  tracked per card (e.g. a `Set` of expanded ids in one `useState`), so expanding one card does not
  affect any other card's state.
- **Inputs**: Click events on each card's toggle element.
- **Outputs**: Detail paragraph is absent from the DOM (or hidden) when collapsed, present when
  expanded; toggle is keyboard-accessible (a real `<button>`, not a bare `<div onClick>`).
- **Edge cases**: Expanding two or more cards simultaneously must not collapse previously expanded
  cards (no shared/exclusive "accordion" state).

### FR-3: `LearnPage` renders `PretrainPanel` under a "Pre-training" heading
- **What**: `LearnPage.jsx` adds a "Pre-training" `<h2>` (or similar) followed by `<PretrainPanel />`.
  The existing placeholder copy is narrowed to cover only the sections not yet built (post-training,
  evaluation, generation) — it must not claim pre-training is "coming soon" anymore.
- **Inputs/Outputs**: None beyond composition — `LearnPage` owns no new state.
- **Edge cases**: None.

### FR-4: Card content is factually accurate and consistent with the rest of the app
- **What**: Summary/detail text must describe each stage correctly: Data Collection (web crawls,
  books, code, licensing/quality considerations), Cleaning (deduplication, quality/language
  filtering), Tokenisation (subword/BPE splitting into a fixed vocabulary — may reference that this
  app's own tokeniser demo, built in S5.1/S5.2, shows this live), Architecture (transformer,
  attention, decoder-only stacks used by most LLMs).
- **Inputs/Outputs**: None — content-only requirement, verified by review rather than a unit test.
- **Edge cases**: None.

---

## Tangible Outcomes

- [ ] **Outcome 1**: `PretrainPanel` renders exactly four cards titled "Data Collection", "Cleaning",
  "Tokenisation", "Architecture".
- [ ] **Outcome 2**: Each card's detail text is absent from the DOM by default and appears only after
  its toggle is clicked.
- [ ] **Outcome 3**: Expanding one card's detail does not collapse another already-expanded card.
- [ ] **Outcome 4**: `LearnPage` renders a "Pre-training" heading and the four `PretrainPanel` cards;
  placeholder "coming soon" copy for post-training/evaluation/generation is still present.
- [ ] **Outcome 5**: All pre-existing tests (across all `src/__tests__/*.test.jsx` files) continue to
  pass unmodified.

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)
1. **test_pretrain_panel_renders_four_cards** (`PretrainPanel.test.jsx`): render `<PretrainPanel />`;
   assert headings "Data Collection", "Cleaning", "Tokenisation", "Architecture" are all present.
2. **test_card_detail_hidden_by_default** (`PretrainPanel.test.jsx`): render `<PretrainPanel />`;
   assert none of the four detail paragraphs are present in the document.
3. **test_clicking_toggle_reveals_detail** (`PretrainPanel.test.jsx`): click the "Data Collection"
   card's toggle; assert its detail paragraph is now present.
4. **test_clicking_toggle_again_collapses_detail** (`PretrainPanel.test.jsx`): click the same toggle
   twice; assert the detail paragraph is absent again.
5. **test_expanding_one_card_does_not_collapse_another** (`PretrainPanel.test.jsx`): click the
   "Cleaning" toggle, then the "Tokenisation" toggle; assert both detail paragraphs are present
   simultaneously.
6. **test_learn_page_renders_pretrain_panel** (`LearnPage.test.jsx`, new file): render `<LearnPage />`;
   assert a "Pre-training" heading and the "Data Collection" card title are present.
7. **test_learn_page_still_shows_placeholder_for_other_sections** (`LearnPage.test.jsx`): render
   `<LearnPage />`; assert placeholder/"coming soon" text for post-training, evaluation, and
   generation is still present.

### Mocking Strategy
- No mocking needed — `PretrainPanel` and the updated `LearnPage` are pure static-content components
  with local `useState`, no network/API calls (unlike `ChatPage`, this section doesn't touch `api.js`).
- Use `@testing-library/react` `render`/`screen` and `@testing-library/user-event` for click
  interactions, matching the pattern in `TokeniserDemo.test.jsx`/`NavBar.test.jsx`.

### Coverage Expectation
- All 4 FRs covered by at least one test; all 7 new tests above are green; every pre-existing test
  file continues to pass with zero modifications.

---

## References
- `roadmap.md` row S6.2 — "Pre-training cards" (Data collection, Cleaning, Tokenisation, Architecture)
- `specs/spec-S6.1-routing/spec.md` — `LearnPage.jsx` placeholder this spec replaces
- `src/TokeniserDemo.jsx`, `src/MessageThread.jsx` — `.map()`-over-data-array component pattern this
  spec follows for `PretrainPanel`
- `specs/spec-S5.1-tokeniser-logic/`, `specs/spec-S5.2-tokeniser-ui/` — tokeniser demo referenced by
  the Tokenisation card's detail text
- `specs/spec-S6.3-postrain-panel/`, `specs/spec-S6.4-eval-gen-panels/` (future) — add the remaining
  Learn panel sections using the same card pattern
