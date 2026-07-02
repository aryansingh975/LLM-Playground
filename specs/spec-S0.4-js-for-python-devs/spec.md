# Spec S0.4 — JavaScript for Python Developers

| Field | Value |
|-------|-------|
| **Spec ID** | S0.4 |
| **Slug** | js-for-python-devs |
| **Phase** | 0 — Tools Setup |
| **Owner** | Solo |
| **Location** | `src/js-primer.js` + `src/__tests__/js-primer.test.js` |
| **Depends On** | S0.1 |
| **Status** | pending |

## Objective

Learn the 6 JavaScript patterns used throughout this project by writing and testing them
side-by-side with their Python equivalents. This is the single most important spec for someone
coming from Python — every later spec assumes fluency with these 6 patterns.

## The 6 Patterns

| # | Pattern | JS | Python equivalent |
|---|---------|-----|-------------------|
| 1 | Variable declaration | `const` / `let` | `x = ...` |
| 2 | Arrow functions | `(x) => x * 2` | `lambda x: x * 2` / `def` |
| 3 | Template literals | `` `Hello ${name}` `` | `f"Hello {name}"` |
| 4 | Array methods | `.map()` `.filter()` `.reduce()` | list comprehensions |
| 5 | Destructuring | `const { a, b } = obj` | tuple/dict unpacking |
| 6 | Async / await + fetch | `async function` + `await fetch()` | `requests.get()` in async context |

## Scope

**In:** A `src/js-primer.js` module that exports one small function per pattern, plus a
`src/__tests__/js-primer.test.js` with one `describe` block per pattern.

**Out:** No UI changes. No API calls to real services. `fetch` is mocked.

## Tangible Outcomes

1. `src/js-primer.js` exists and exports 6 named functions: `doubleAll`, `keepEvens`,
   `sumAll`, `greet`, `getFullName`, `fetchFirstTitle`.
2. `src/__tests__/js-primer.test.js` exists with one `describe` per pattern (6 blocks).
3. All 6 tests pass: `npm --prefix . run test` (run from project root).
4. Each function has a one-line comment showing the Python equivalent.

## TDD Notes

- Write all tests first (red), then implement each function (green).
- `fetchFirstTitle` must use `vi.fn()` to mock `fetch` — never call a real URL.
- Tests are the verification; reading the comments is the learning.
