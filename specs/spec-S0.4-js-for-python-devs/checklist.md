# Checklist — S0.4 JavaScript for Python Developers

## Phase 1 — Setup
- [x] Spec folder `specs/spec-S0.4-js-for-python-devs/` exists
- [x] `spec.md` written and reviewed
- [x] Vitest is available (`npm run test` works in project root)

## Phase 2 — Tests First (Red)
- [x] `src/__tests__/js-primer.test.js` created
- [x] `describe('2 - arrow functions')` block with test for `doubleAll`
- [x] `describe('4a - array filter')` block with test for `keepEvens`
- [x] `describe('4b - array reduce')` block with test for `sumAll`
- [x] `describe('3 - template literals')` block with test for `greet`
- [x] `describe('5 - destructuring')` block with test for `getFullName`
- [x] `describe('6 - async/await + fetch')` block with test for `fetchFirstTitle`
- [x] All tests failed (red) before implementation confirmed

## Phase 3 — Implementation (Green)
- [x] `src/js-primer.js` created with all 6 exports
- [x] `doubleAll(arr)` — maps array, doubles each element
- [x] `keepEvens(arr)` — filters to even numbers only
- [x] `sumAll(arr)` — reduces array to sum
- [x] `greet(name)` — returns template literal greeting
- [x] `getFullName({ first, last })` — destructures object, returns full name
- [x] `fetchFirstTitle(url)` — async function, awaits fetch, returns first title
- [x] Each function has a Python-equivalent comment

## Phase 4 — Verification
- [x] `npm run test` passes — 9/9 tests green
- [x] N/A — oxlint does not lint .js files outside src React components; patterns are clean
- [x] All Tangible Outcomes from spec.md are met
- [x] `roadmap.md` status updated to `done` for S0.4
