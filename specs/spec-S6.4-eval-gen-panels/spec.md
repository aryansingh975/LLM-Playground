# Spec S6.4 — Eval Gen Panels

## Overview
Replace the remaining "coming soon — evaluation and generation concepts" placeholder in
`LearnPage.jsx` with two real sections: Evaluation (how we know if an LLM is any good) and Text
Generation (what happens when the model actually produces output), following the same card pattern
as S6.2 (`PretrainPanel`) and S6.3 (`PostrainPanel`). This is the third and final content spec for
the Learn panel scaffolded by S6.1. Per the roadmap notes, the Generation section must also embed
the tokeniser demo (`TokeniserDemo.jsx`, built in S5.1/S5.2) inline — this is the first place in the
app where that component is actually mounted rather than just referenced in explanatory text.

## Dependencies
- S6.1 — Routing (`done`). Provides `LearnPage.jsx` mounted at `/learn`.
- (Established pattern, not a hard blocking dependency): S6.2 — Pretrain Panel (`done`) and S6.3 —
  Postrain Panel (`done`) establish the `.map()`-over-data-array + per-card expand/collapse `Set`
  pattern this spec reuses for both new panels.
- `src/TokeniserDemo.jsx` (built in S5.1/S5.2, `done`) — embedded live in the Generation section.

## Target Location
`src/EvaluationPanel.jsx` (new file — evaluation cards), `src/GenerationPanel.jsx` (new file —
generation cards + embedded `<TokeniserDemo />`), `src/LearnPage.jsx` (modified — renders
`<EvaluationPanel />` under an "Evaluation" heading and `<GenerationPanel />` under a "Text
Generation" heading, removing the placeholder paragraph entirely since all four Learn sections now
have real content)

---

## Functional Requirements

### FR-1: `EvaluationPanel` renders four concept cards
- **What**: An `EvaluationPanel` component rendering four cards: "Benchmarks", "Human & Preference
  Evaluation", "Limitations & Hallucination", "Safety & Alignment". Each card always shows its title
  and a one-line summary. Card data lives in a local array (`{ id, title, summary, detail }`)
  rendered via `.map()`, matching `PretrainPanel.jsx`/`PostrainPanel.jsx`.
- **Inputs**: None — static content, no props required.
- **Outputs**: Four `<article>` cards in the DOM, each with a heading matching its title and a
  summary line.
- **Edge cases**: None — content is static and fixed at four cards.

### FR-2: `GenerationPanel` renders three concept cards
- **What**: A `GenerationPanel` component rendering three cards: "Decoding Strategies", "Context
  Window", "Prompting Patterns". Same data-array + `.map()` pattern as FR-1.
- **Inputs**: None — static content, no props required.
- **Outputs**: Three `<article>` cards in the DOM, each with a heading matching its title and a
  summary line.
- **Edge cases**: None — content is static and fixed at three cards.

### FR-3: Each card in both panels expands/collapses independently on click
- **What**: Each card has a toggle button (the card header) that reveals a longer `detail`
  paragraph. Clicking again collapses it. Expansion state is tracked per card via a `Set` of
  expanded ids in one `useState` per panel — identical to `PretrainPanel.jsx`/`PostrainPanel.jsx`'s
  `toggle`/`expandedIds` logic. Expanding a card in one panel never affects cards in the other panel
  (separate component instances, separate state).
- **Inputs**: Click events on each card's toggle button.
- **Outputs**: Detail paragraph is absent from the DOM when collapsed, present when expanded
  (`data-testid="eval-detail-{id}"` for `EvaluationPanel`, `data-testid="gen-detail-{id}"` for
  `GenerationPanel`); toggle is a real `<button>` with `aria-expanded`.
- **Edge cases**: Expanding two or more cards simultaneously (within the same panel) must not
  collapse previously expanded cards.

### FR-4: `GenerationPanel` embeds a live `TokeniserDemo` inline
- **What**: `GenerationPanel` renders `<TokeniserDemo />` (imported from `./TokeniserDemo`, no new
  props needed — it is already a self-contained component) directly in its own DOM, always visible
  (not behind a card toggle), under a heading such as "Try it: tokenisation at generation time".
  This satisfies the roadmap requirement to "embed the tokeniser demo inline" in the generation
  section.
- **Inputs/Outputs**: None beyond composition — `GenerationPanel` owns no new state for this; the
  demo's own internal state (from S5.1/S5.2) is unaffected.
- **Edge cases**: None — reuses `TokeniserDemo` exactly as built, no modifications to that file.

### FR-5: `LearnPage` renders both new panels and drops the placeholder
- **What**: `LearnPage.jsx` adds an "Evaluation" `<h2>` section with `<EvaluationPanel />` and a
  "Text Generation" `<h2>` section with `<GenerationPanel />`, in that order, after the existing
  Pre-training and Post-training sections. The trailing "coming soon" placeholder paragraph
  (`data-testid="learn-placeholder"`, added in S6.3) is removed entirely — every Learn section now
  has real content.
- **Inputs/Outputs**: None beyond composition — `LearnPage` owns no new state.
- **Edge cases**: None.

### FR-6: Card content is factually accurate and consistent with the rest of the app
- **What**: Summary/detail text must describe each concept correctly and, where relevant, tie back
  to features already built in this app: Benchmarks (standard tests like MMLU, HumanEval, GSM8K —
  the same three named in the roadmap's future S8.3 benchmark chart — used to compare models on
  knowledge, code, and math); Human & Preference Evaluation (humans or trained reward models ranking
  responses — the same preference-ranking idea introduced by RLHF in S6.3); Limitations &
  Hallucination (models can produce fluent but factually wrong or unverifiable text, especially
  without retrieval/tools); Safety & Alignment (red-teaming and refusal behavior for harmful
  requests); Decoding Strategies (greedy decoding vs. sampling — ties directly to this app's own
  temperature/top-p sliders from S4.2/S4.3); Context Window (the fixed number of tokens a model can
  attend to at once, including prompt + reply — ties to the max-tokens slider from S4.4); Prompting
  Patterns (system/user/assistant roles, few-shot examples, instructions).
- **Inputs/Outputs**: None — content-only requirement, verified by review rather than a unit test.
- **Edge cases**: None.

---

## Tangible Outcomes

- [x] **Outcome 1**: `EvaluationPanel` renders exactly four cards titled "Benchmarks", "Human &
  Preference Evaluation", "Limitations & Hallucination", "Safety & Alignment".
- [x] **Outcome 2**: `GenerationPanel` renders exactly three cards titled "Decoding Strategies",
  "Context Window", "Prompting Patterns", plus a live, always-visible `TokeniserDemo` (a `textbox`
  with a live token count, per S5.2's own tests).
- [x] **Outcome 3**: In both panels, each card's detail text is absent from the DOM by default and
  appears only after its own toggle is clicked; expanding one card never collapses another.
- [x] **Outcome 4**: `LearnPage` renders "Evaluation" and "Text Generation" headings with their
  respective panels, and the old placeholder text (`learn-placeholder`) is no longer present.
- [x] **Outcome 5**: All pre-existing tests (across all `src/__tests__/*.test.jsx` files) continue to
  pass. `LearnPage.test.jsx`'s S6.3 placeholder-presence test was replaced (per FR-5) and its S6.2
  placeholder-presence test was removed as obsolete — its single-blob text assertion became
  ambiguous once real "Evaluation"/"Post-training" headings existed, and it was fully superseded by
  S6.3's and this spec's own heading-presence tests; this is an intentional content change, not a
  regression.

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)
1. **test_evaluation_panel_renders_four_cards** (`EvaluationPanel.test.jsx`): render
   `<EvaluationPanel />`; assert all four headings are present.
2. **test_evaluation_card_detail_hidden_by_default** (`EvaluationPanel.test.jsx`): assert none of
   the four detail paragraphs are present.
3. **test_evaluation_clicking_toggle_reveals_and_collapses_detail** (`EvaluationPanel.test.jsx`):
   click the "Benchmarks" toggle; assert detail appears; click again; assert it disappears.
4. **test_evaluation_expanding_one_card_does_not_collapse_another** (`EvaluationPanel.test.jsx`):
   click two different toggles; assert both details are present simultaneously.
5. **test_generation_panel_renders_three_cards** (`GenerationPanel.test.jsx`): render
   `<GenerationPanel />`; assert all three headings are present.
6. **test_generation_card_detail_hidden_by_default** (`GenerationPanel.test.jsx`): assert none of
   the three detail paragraphs are present.
7. **test_generation_clicking_toggle_reveals_and_collapses_detail** (`GenerationPanel.test.jsx`):
   click the "Decoding Strategies" toggle; assert detail appears; click again; assert it disappears.
8. **test_generation_panel_renders_tokeniser_demo** (`GenerationPanel.test.jsx`): render
   `<GenerationPanel />`; assert a `textbox` (the tokeniser demo's input) is present and typing into
   it updates a visible token count, reusing the same assertions as `TokeniserDemo.test.jsx`.
9. **test_learn_page_renders_evaluation_and_generation_panels** (`LearnPage.test.jsx`): render
   `<LearnPage />`; assert "Evaluation", "Text Generation" headings and one card title from each
   ("Benchmarks", "Decoding Strategies") are present.
10. **test_learn_page_no_longer_shows_placeholder** (`LearnPage.test.jsx`, replaces the S6.3
    placeholder test): render `<LearnPage />`; assert `queryByTestId('learn-placeholder')` is null.

### Mocking Strategy
- No mocking needed — `EvaluationPanel`, `GenerationPanel`, and the updated `LearnPage` are pure
  static-content components with local `useState`, no network/API calls. `TokeniserDemo` itself
  needs no mocking (pure local `tokenize()` function, already covered by its own S5.2 tests).
- Use `@testing-library/react` `render`/`screen` and `@testing-library/user-event`/`fireEvent` for
  interactions, matching `PretrainPanel.test.jsx`/`PostrainPanel.test.jsx`/`TokeniserDemo.test.jsx`.

### Coverage Expectation
- All 6 FRs covered by at least one test; all 10 new/updated tests above are green; every other
  pre-existing test file continues to pass with zero modifications.

---

## References
- `roadmap.md` row S6.4 — "Build Evaluation and Text Generation sections. Embed the tokeniser demo
  inline"
- `specs/spec-S6.2-pretrain-panel/`, `specs/spec-S6.3-postrain-panel/`, `src/PretrainPanel.jsx`,
  `src/PostrainPanel.jsx` — card + expand/collapse pattern this spec follows for both new panels
- `specs/spec-S5.1-tokeniser-logic/`, `specs/spec-S5.2-tokeniser-ui/`, `src/TokeniserDemo.jsx` — the
  existing tokeniser demo embedded live by `GenerationPanel`
- `specs/spec-S4.2-temperature-slider/`, `specs/spec-S4.3-top-p-slider/`,
  `specs/spec-S4.4-max-tokens-slider/` — the sliders referenced by the Decoding Strategies/Context
  Window card content
- `src/LearnPage.jsx` — placeholder section this spec removes entirely
