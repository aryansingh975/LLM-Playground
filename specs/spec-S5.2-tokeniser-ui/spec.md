# Spec S5.2 — Tokeniser UI

## Overview
Build the token chip UI: a self-contained `<TokeniserDemo>` component with a text input where, as
the user types, the text is split into coloured "chips" — one per token — using the `tokenize()`
function built in S5.1. Each chip cycles through a fixed colour palette by position, and a live
token count is shown alongside. This component is standalone (no required props, own internal
input state) so it can be dropped in anywhere later — S6.4 embeds it inline in the Evaluation and
Text Generation learn-panel sections.

## Dependencies
- S5.1 — `tokenize()` (and `countTokens()`) in `src/tokenizer.js`, already `done`.
- S3.1 — App component architecture checkpoint; establishes the single-responsibility,
  self-contained component pattern (own `useState`, no required props) that this component follows,
  matching `ChatInput.jsx`.

## Target Location
`src/TokeniserDemo.jsx` (new file), `src/tokenColors.js` (new file — `TOKEN_COLORS` palette,
extracted to its own module so `TokeniserDemo.jsx` only exports the component, per the
`react(only-export-components)` fast-refresh lint rule)

---

## Functional Requirements

### FR-1: `<TokeniserDemo>` renders a text input and live chip list
- **What**: A self-contained component (own internal `useState` for the input text, no required
  props — same pattern as `ChatInput.jsx`) rendering a `<textarea>` (`id="tokeniser-input"`,
  `aria-label="Text to tokenise"`) and, below it, a chip for every token returned by
  `tokenize(inputText)`, recomputed on every keystroke.
- **Inputs**: None (no required props).
- **Outputs**: Renders the textarea plus a chip `<span>` per token; each chip's visible text is
  `token.text`.
- **Edge cases**: Empty input (`''`) renders zero chips (no crash — `tokenize('')` returns `[]`).
  Typing and then clearing the textarea removes all previously rendered chips.

### FR-2: Live token count display
- **What**: A count label (e.g. `"Token count: 3"`) that reflects `tokenize(inputText).length`
  (equivalently `countTokens(inputText)`), updating on every keystroke alongside the chips.
- **Inputs**: Same internal input state as FR-1.
- **Outputs**: A text node containing `"Token count: "` followed by the current count.
- **Edge cases**: Empty input shows `"Token count: 0"`.

### FR-3: Chips cycle through a fixed colour palette by position
- **What**: A fixed array of Tailwind background-colour classes (`TOKEN_COLORS`); each chip's
  `className` includes `TOKEN_COLORS[index % TOKEN_COLORS.length]`, so colour repeats
  deterministically once the token count exceeds the palette size. Every chip also gets
  `whitespace-pre` so tokens that are pure/leading whitespace (a common BPE token shape) stay
  visible instead of being collapsed by normal CSS whitespace handling.
- **Inputs**: The token's index within the array returned by `tokenize(inputText)`.
- **Outputs**: Chip `className` contains the palette colour class and `whitespace-pre`.
- **Edge cases**: Token count larger than `TOKEN_COLORS.length` — chip at index `TOKEN_COLORS.length`
  must reuse the same colour class as chip at index `0` (verifies the modulo cycling, not just a
  lookup that happens to work for small inputs).

---

## Tangible Outcomes

- [ ] **Outcome 1**: `src/TokeniserDemo.jsx` exists and exports a default React component.
- [ ] **Outcome 2**: Rendering `<TokeniserDemo />` with no input shows the textarea, zero chips, and
  "Token count: 0".
- [ ] **Outcome 3**: Typing `"hello world"` into the textarea renders exactly
  `tokenize('hello world').length` chip elements, whose concatenated text equals `"hello world"`.
- [ ] **Outcome 4**: The token count label updates to match `tokenize(inputText).length` as the
  user types.
- [ ] **Outcome 5**: Chip colour classes cycle through `TOKEN_COLORS` by index (chip `i` and chip
  `i + TOKEN_COLORS.length` share the same colour class).
- [ ] **Outcome 6**: Every chip has the `whitespace-pre` class so whitespace tokens render visibly.

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)
1. **test_renders_empty_state_with_zero_count**: Render `<TokeniserDemo />`; assert the textarea
   is present; assert no chip elements; assert `"Token count: 0"` is shown.
2. **test_typing_renders_chips_matching_tokenize**: `fireEvent.change` the textarea with
   `"hello world"`; assert the number of rendered chips equals `tokenize('hello world').length`;
   assert the chips' concatenated text equals `"hello world"`.
3. **test_token_count_updates_live**: Type text into the textarea; assert the count label shows
   `tokenize(text).length`.
4. **test_chips_cycle_through_color_palette**: Type text long enough to produce more tokens than
   `TOKEN_COLORS.length`; assert the chip at index `0` and the chip at index `TOKEN_COLORS.length`
   have the same colour class.
5. **test_chips_have_whitespace_pre_class**: Type text with multiple tokens; assert every rendered
   chip has the `whitespace-pre` class.
6. **test_clearing_input_removes_chips**: Type text (chips appear), then clear the textarea to
   `''`; assert zero chips remain and the count returns to `"Token count: 0"`.

### Mocking Strategy
- No mocking — `tokenize()`/`countTokens()` from `src/tokenizer.js` run fully offline and
  deterministically (same as their own unit tests in S5.1); component tests import and call them
  directly for cross-checking expected chip counts/text.
- Component rendering: `@testing-library/react` `render`/`fireEvent`, same pattern as
  `ChatInput.test.jsx` / `TopPSlider.test.jsx`.

### Coverage Expectation
- All 3 FRs have at least one passing test; all 6 named tests above are green; all pre-existing
  tests continue to pass unmodified (this is a new, standalone component — no existing files change).

---

## References
- `roadmap.md` row S5.2 — "Token chip UI" (colour per token, show token count), Phase 5 goal
- `specs/spec-S5.1-tokeniser-logic/spec.md` — `tokenize()`/`countTokens()` this component consumes
- `src/ChatInput.jsx` — self-contained component pattern (internal `useState`, no required props,
  controlled `<textarea>`) this component follows
- `src/__tests__/TopPSlider.test.jsx`, `src/__tests__/ChatInput.test.jsx` — existing test patterns
  to match (`@testing-library/react`, `fireEvent`)
- `specs/spec-S6.4-eval-gen-panels/` (future) — will embed `<TokeniserDemo>` inline
