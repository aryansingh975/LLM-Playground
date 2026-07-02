# Spec S5.1 — Tokeniser Logic

## Overview
Add the pure-logic half of the tokeniser demo: install the `gpt-tokenizer` npm package and write a
`tokenize(text)` function that splits arbitrary text into an ordered list of `{ id, text }` token
objects (BPE token id + the decoded substring it represents), plus a `countTokens(text)` helper.
This is logic-only — no UI. S5.2 (`tokeniser-ui`) will consume `tokenize()`'s output to render
coloured token chips and a live token count.

## Dependencies
- S0.1 — Node.js and npm installed (needed to `npm install gpt-tokenizer`).

## Target Location
`src/tokenizer.js` (new file), `package.json` (add `gpt-tokenizer` dependency)

---

## Functional Requirements

### FR-1: `tokenize(text)` splits text into token objects
- **What**: Encode `text` with `gpt-tokenizer`'s default (`cl100k_base`) encoding via `encode()`,
  then decode each resulting token id back to its substring via `decode([id])`, returning an
  ordered array of `{ id, text }` objects — one per token, in original text order.
- **Inputs**: `text` (string, required).
- **Outputs**: `Array<{ id: number, text: string }>`. Concatenating every `text` field in order
  reconstructs the original input string exactly.
- **Edge cases**:
  - Empty string (`''`) → returns `[]`.
  - Whitespace-only input → still produces token(s); no special-casing.
  - Unicode/emoji input (e.g. multi-byte characters) → each token's `id`/`text` pair stays
    consistent with `gpt-tokenizer`'s own encode/decode round trip (no corruption).
  - Non-string input (`null`, `undefined`, `number`) → throws a `TypeError` with a clear message
    rather than silently returning a malformed result.

### FR-2: `countTokens(text)` returns the token count
- **What**: Return the number of tokens `text` encodes to, without building the full `{id, text}`
  array (uses `encode(text).length` directly — cheaper than calling `tokenize(text).length`).
- **Inputs**: `text` (string, required).
- **Outputs**: `number` (non-negative integer; `0` for an empty string).
- **Edge cases**: Same non-string-input `TypeError` behavior as FR-1, for consistency.

---

## Tangible Outcomes

- [ ] **Outcome 1**: `gpt-tokenizer` appears in `package.json` `dependencies` and is present in
  `node_modules` after `npm install`.
- [ ] **Outcome 2**: `src/tokenizer.js` exists and exports `tokenize` and `countTokens`.
- [ ] **Outcome 3**: `tokenize('hello world')` returns an array of `{ id, text }` objects whose
  `text` fields concatenate back to `'hello world'`.
- [ ] **Outcome 4**: `tokenize('')` returns `[]`.
- [ ] **Outcome 5**: `countTokens('hello world')` returns a positive integer matching
  `tokenize('hello world').length`.
- [ ] **Outcome 6**: Calling `tokenize(null)` or `countTokens(undefined)` throws a `TypeError`.

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)
1. **test_tokenize_splits_simple_text**: `tokenize('hello world')` returns an array; each item has
   numeric `id` and string `text`; joined `text` fields equal `'hello world'`.
2. **test_tokenize_empty_string_returns_empty_array**: `tokenize('')` returns `[]`.
3. **test_tokenize_unicode_round_trips**: `tokenize('héllo 👋 world')`'s joined `text` fields equal
   the original string exactly.
4. **test_tokenize_throws_on_non_string**: `tokenize(null)`, `tokenize(undefined)`, and
   `tokenize(42)` each throw `TypeError`.
5. **test_countTokens_matches_tokenize_length**: `countTokens('hello world')` equals
   `tokenize('hello world').length`.
6. **test_countTokens_empty_string_is_zero**: `countTokens('')` returns `0`.
7. **test_countTokens_throws_on_non_string**: `countTokens(null)` throws `TypeError`.

### Mocking Strategy
- No network or DB involved — `gpt-tokenizer` runs fully offline/in-process. Tests call
  `tokenize`/`countTokens` directly with no mocks, same pattern as `js-primer.test.js`.

### Coverage Expectation
- Both exported functions (`tokenize`, `countTokens`) have passing tests for the happy path, the
  empty-string edge case, and the invalid-input edge case; all 7 named tests above are green.

---

## References
- `roadmap.md` row S5.1 — "Tokeniser logic" (install `gpt-tokenizer`, split text into tokens, test
  it), Phase 5 goal
- `specs/spec-S5.2-tokeniser-ui/` (to be created) — consumes `tokenize()`'s `{id, text}` output for
  the coloured chip UI and live token count
- `src/api.js`, `src/js-primer.js` — existing plain-JS-module conventions this file follows (named
  exports, no default export, no framework dependency)
