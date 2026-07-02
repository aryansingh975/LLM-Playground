# Checklist — Spec S5.1: Tokeniser Logic

## Phase 1: Setup & Dependencies
- [x] Verify S0.1 (Node.js/npm installed) is `done`
- [x] `npm install gpt-tokenizer` — adds it to `package.json` `dependencies`
- [x] Create `src/tokenizer.js`

## Phase 2: Tests First (TDD)
- [x] Write test file: `src/__tests__/tokenizer.test.js`
- [x] test_tokenize_splits_simple_text
- [x] test_tokenize_empty_string_returns_empty_array
- [x] test_tokenize_unicode_round_trips
- [x] test_tokenize_throws_on_non_string
- [x] test_countTokens_matches_tokenize_length
- [x] test_countTokens_empty_string_is_zero
- [x] test_countTokens_throws_on_non_string
- [x] Run tests — expect failures (Red)

## Phase 3: Implementation
- [x] Implement FR-1 — `src/tokenizer.js`: `tokenize(text)` using `gpt-tokenizer`'s `encode()` +
  per-id `decode([id])`; throws `TypeError` on non-string input
- [x] Implement FR-2 — `src/tokenizer.js`: `countTokens(text)` using `encode(text).length`; same
  `TypeError` behavior on non-string input
- [x] Run tests — expect pass (Green) — 7/7 passing
- [x] Refactor if needed — none needed, implementation is minimal (12 lines)

## Phase 4: Integration
- [x] N/A — this spec is logic-only; S5.2 wires `tokenize()`/`countTokens()` into UI
- [x] Run lint: `npx oxlint src/` — clean, exit 0
- [x] Run full test suite — 129/129 tests green (all 12 test files, including new
  `tokenizer.test.js`)

## Phase 5: Verification
- [x] All 6 tangible outcomes verified
- [x] No hardcoded secrets/tokens
- [x] `gpt-tokenizer` dependency present in `package.json` `dependencies` (confirmed:
  `"gpt-tokenizer": "^3.4.0"`)
- [x] Update `roadmap.md` status for S5.1: `spec-written` → `done`
