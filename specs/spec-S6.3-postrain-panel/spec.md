# Spec S6.3 — Postrain Panel

## Overview
Replace the "coming soon — post-training, evaluation, and generation concepts" placeholder line in
`LearnPage.jsx` with a real Post-training section: four concept cards — SFT, RLHF, PPO, Verifiable
Tasks — each showing a one-line summary plus an expandable detail paragraph. This is the second of
three content specs (S6.2–S6.4) that fill in the Learn panel scaffolded by S6.1, following the exact
card pattern established by `PretrainPanel.jsx` in S6.2. S6.4 (evaluation + generation) follows the
same pattern next.

## Dependencies
- S6.1 — Routing (`done`). Provides `LearnPage.jsx` mounted at `/learn` via `NavBar`/`App.jsx`.
- S6.2 — Pretrain Panel (`done`). Establishes the `.map()`-over-data-array + per-card
  expand/collapse `Set` pattern (`src/PretrainPanel.jsx`) that this spec reuses for post-training.

## Target Location
`src/PostrainPanel.jsx` (new file — the four cards), `src/LearnPage.jsx` (modified — renders
`<PostrainPanel />` under a "Post-training" heading, replacing that portion of the placeholder text)

---

## Functional Requirements

### FR-1: `PostrainPanel` renders four concept cards
- **What**: A `PostrainPanel` component rendering four cards, one each for "SFT (Supervised
  Fine-Tuning)", "RLHF", "PPO", "Verifiable Tasks". Each card always shows its title and a short
  one-line summary. Card data lives in a local array (`{ id, title, summary, detail }`) rendered via
  `.map()`, matching the pattern in `PretrainPanel.jsx`.
- **Inputs**: None — static content, no props required (self-contained component pattern, like
  `PretrainPanel.jsx`).
- **Outputs**: Four `<article>` cards in the DOM, each with a heading matching its title and a
  summary line.
- **Edge cases**: None — content is static and fixed at four cards.

### FR-2: Each card expands/collapses independently on click
- **What**: Each card has a toggle button (the card header) that reveals a longer `detail`
  paragraph. Clicking again collapses it. Expansion state is tracked per card via a `Set` of
  expanded ids in one `useState`, identical to `PretrainPanel.jsx`'s `toggle`/`expandedIds` logic —
  expanding one card does not affect any other card's state.
- **Inputs**: Click events on each card's toggle button.
- **Outputs**: Detail paragraph is absent from the DOM when collapsed, present when expanded
  (`data-testid="postrain-detail-{id}"`); toggle is a real `<button>` with `aria-expanded`.
- **Edge cases**: Expanding two or more cards simultaneously must not collapse previously expanded
  cards (no shared/exclusive "accordion" state).

### FR-3: `LearnPage` renders `PostrainPanel` under a "Post-training" heading
- **What**: `LearnPage.jsx` adds a "Post-training" `<h2>` section (same structure as the existing
  "Pre-training" section) followed by `<PostrainPanel />`. The trailing placeholder paragraph is
  narrowed to cover only the sections not yet built (evaluation, generation) — it must not mention
  post-training anymore.
- **Inputs/Outputs**: None beyond composition — `LearnPage` owns no new state.
- **Edge cases**: None.

### FR-4: Card content is factually accurate and consistent with the rest of the app
- **What**: Summary/detail text must describe each stage correctly: SFT (fine-tuning the
  pre-trained base model on curated instruction/response pairs so it learns to follow instructions),
  RLHF (Reinforcement Learning from Human Feedback — training a reward model on human preference
  rankings between candidate responses, then using that reward signal to further tune the model),
  PPO (Proximal Policy Optimization — the reinforcement learning algorithm most commonly used to
  optimize the policy against the reward model while a KL penalty keeps it close to the SFT model),
  Verifiable Tasks (training on tasks with an automatically checkable ground truth — math, code
  execution, unit tests — so reward can come from a verifier instead of a human or learned reward
  model, e.g. RLVR-style training).
- **Inputs/Outputs**: None — content-only requirement, verified by review rather than a unit test.
- **Edge cases**: None.

---

## Tangible Outcomes

- [x] **Outcome 1**: `PostrainPanel` renders exactly four cards titled "SFT (Supervised
  Fine-Tuning)", "RLHF", "PPO", "Verifiable Tasks".
- [x] **Outcome 2**: Each card's detail text is absent from the DOM by default and appears only after
  its toggle is clicked.
- [x] **Outcome 3**: Expanding one card's detail does not collapse another already-expanded card.
- [x] **Outcome 4**: `LearnPage` renders a "Post-training" heading and the four `PostrainPanel`
  cards; placeholder "coming soon" copy still mentions evaluation and generation but no longer
  mentions post-training.
- [x] **Outcome 5**: All pre-existing tests (across all `src/__tests__/*.test.jsx` files) continue to
  pass unmodified.

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)
1. **test_postrain_panel_renders_four_cards** (`PostrainPanel.test.jsx`): render `<PostrainPanel />`;
   assert headings "SFT (Supervised Fine-Tuning)", "RLHF", "PPO", "Verifiable Tasks" are all present.
2. **test_card_detail_hidden_by_default** (`PostrainPanel.test.jsx`): render `<PostrainPanel />`;
   assert none of the four detail paragraphs are present in the document.
3. **test_clicking_toggle_reveals_detail** (`PostrainPanel.test.jsx`): click the "RLHF" card's
   toggle; assert its detail paragraph is now present.
4. **test_clicking_toggle_again_collapses_detail** (`PostrainPanel.test.jsx`): click the same toggle
   twice; assert the detail paragraph is absent again.
5. **test_expanding_one_card_does_not_collapse_another** (`PostrainPanel.test.jsx`): click the "SFT"
   toggle, then the "PPO" toggle; assert both detail paragraphs are present simultaneously.
6. **test_learn_page_renders_postrain_panel** (`LearnPage.test.jsx`, existing file — add cases):
   render `<LearnPage />`; assert a "Post-training" heading and the "RLHF" card title are present.
7. **test_learn_page_still_shows_placeholder_for_remaining_sections** (`LearnPage.test.jsx`): render
   `<LearnPage />`; assert placeholder/"coming soon" text for evaluation and generation is still
   present, and that it no longer mentions post-training.

### Mocking Strategy
- No mocking needed — `PostrainPanel` and the updated `LearnPage` are pure static-content components
  with local `useState`, no network/API calls.
- Use `@testing-library/react` `render`/`screen` and `@testing-library/user-event` for click
  interactions, matching the pattern in `PretrainPanel.test.jsx`.

### Coverage Expectation
- All 4 FRs covered by at least one test; all 7 tests above are green; every pre-existing test file
  continues to pass with zero unrelated modifications (only `LearnPage.test.jsx` gains new cases).

---

## References
- `roadmap.md` row S6.3 — "Post-training cards" (SFT, RLHF, PPO, Verifiable tasks)
- `specs/spec-S6.2-pretrain-panel/spec.md`, `src/PretrainPanel.jsx` — card + expand/collapse pattern
  this spec follows exactly for `PostrainPanel`
- `src/LearnPage.jsx` — placeholder section this spec narrows
- `specs/spec-S6.4-eval-gen-panels/` (future) — adds the remaining Learn panel sections using the
  same card pattern
