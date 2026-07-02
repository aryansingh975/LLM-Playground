# Spec S11.3 — Final Acceptance Checklist

## Overview
The last spec in the project: confirm everything actually works end-to-end, not just in individual
specs' unit tests. This means checking that every spec in `roadmap.md`'s Master Spec Index is marked
`done`, that the live Vercel URL (from S10.2) actually loads and works for a real visitor, that the
core chat flow and the offline-capable tokeniser demo both function on the deployed instance, and
that the README (S11.1) has screenshots of all four routes so a portfolio visitor can see the app
without running it. This spec is the project's finish line — nothing depends on it.

## Dependencies
- S11.1 — README (`done`). Provides the README this spec adds screenshots to and the file this
  spec's outcomes must be visible from.

## Target Location
- `docs/screenshots/` — new directory, one image per route (`chat.png`, `learn.png`, `compare.png`,
  `evaluate.png`).
- `README.md` — updated to embed the 4 screenshots.
- `src/__tests__/acceptance.test.js` — new test file for this spec's automatable checks.
- `roadmap.md` — the Master Spec Index this spec audits (read-only input, not modified by the
  acceptance checks themselves).

---

## Functional Requirements

### FR-1: All specs in the Master Spec Index are `done`
- **What**: Every row in `roadmap.md`'s "Master Spec Index" table (S0.1 through S11.2, i.e. every
  spec except S11.3 itself) has Status `done`. This is the project's actual completion gate — S11.3
  cannot mark itself `done` while any other row still reads `pending`, `spec-written`, or `impl`.
- **Inputs**: `roadmap.md`'s Master Spec Index table contents.
- **Outputs**: a passing check (test or manual audit) confirming zero non-`done` rows other than
  S11.3's own row.
- **Edge cases**: S11.3's own row is expected to still read `spec-written` (not yet `done`) while
  this spec is being implemented — exclude it from the audit until Phase 5.

### FR-2: Live URL loads quickly
- **What**: The live Vercel URL (`https://llm-playground-two.vercel.app`, from S10.2) loads in under
  5 seconds on a normal internet connection.
- **Inputs**: the live URL, a manual timed page load.
- **Outputs**: a recorded pass/fail — page interactive in <5s.
- **Edge cases**: this is a manual, environment-dependent check (network speed, Vercel cold starts) —
  documented as **MANUAL**, not automated, same precedent as S10.2's FR-3/FR-4.

### FR-3: Full chat flow works on the live URL
- **What**: On the deployed instance, typing a message, clicking Send, and seeing an AI reply appear
  in the thread works end-to-end — either with a real key entered by the tester, or showing the
  expected "No API key found" message (S2.3) if no key is configured, without crashing either way.
- **Inputs**: the live URL, a typed test message.
- **Outputs**: a recorded pass/fail for the observed behavior (reply appears, or the friendly error
  appears — both are valid "working" outcomes per S10.2's documented key-exposure tradeoff).
- **Edge cases**: **MANUAL** — requires a live browser session against the deployed instance.

### FR-4: Tokeniser demo works without an API key
- **What**: The `/learn` route's tokeniser demo (S5.1/S5.2/S6.4) splits typed text into token chips
  without making any network call or requiring an API key — proving the offline-capable parts of the
  app work even with zero configuration.
- **Inputs**: the live URL's `/learn` route, typed text.
- **Outputs**: a recorded pass/fail — token chips render with no API key configured.
- **Edge cases**: **MANUAL** — requires a live browser session; no `fetch` should fire for this
  interaction (can be confirmed via DevTools Network tab during the manual check).

### FR-5: Screenshots of all 4 routes exist and are embedded in the README
- **What**: One screenshot per route (`/chat`, `/learn`, `/compare`, `/evaluate`) saved under
  `docs/screenshots/`, each embedded in `README.md` via Markdown image syntax so they render on the
  GitHub repo page.
- **Inputs**: the live or local app, one screenshot taken per route.
- **Outputs**: `docs/screenshots/chat.png`, `learn.png`, `compare.png`, `evaluate.png` all exist;
  `README.md` contains a Markdown image reference (`![...](docs/screenshots/....png)`) for each.
- **Edge cases**: image files themselves aren't diffable/testable content — the automated test only
  checks file existence and that the README references each path; visual correctness is a manual
  review.

---

## Tangible Outcomes

- [ ] **Outcome 1**: Every row in `roadmap.md`'s Master Spec Index other than S11.3 reads `done`.
- [ ] **Outcome 2**: The live Vercel URL loads in under 5 seconds (manual, recorded).
- [ ] **Outcome 3**: The full chat flow works (or shows the expected no-key message) on the live URL
  (manual, recorded).
- [ ] **Outcome 4**: The tokeniser demo works on the live URL with no API key configured (manual,
  recorded).
- [ ] **Outcome 5**: `docs/screenshots/` contains 4 PNGs (one per route), all referenced from
  `README.md`.
- [ ] **Outcome 6**: A first-time visitor to the GitHub repo can see what the app looks like (via
  README screenshots) without cloning or running anything.

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)
1. **test_all_specs_done_except_self**: parse `roadmap.md`'s Master Spec Index table, assert every
   row's Status is `done` except the `S11.3` row.
2. **test_screenshots_exist**: assert `docs/screenshots/chat.png`, `learn.png`, `compare.png`, and
   `evaluate.png` all exist.
3. **test_readme_embeds_screenshots**: assert `README.md` contains a Markdown image reference
   (`docs/screenshots/chat.png` etc.) for each of the 4 screenshot files.
4. **Manual (cannot be automated — live network, real browser, timed/visual judgment)**:
   - Live URL loads in <5s (FR-2)
   - Full chat flow works on the live URL (FR-3)
   - Tokeniser demo works with no API key on the live URL (FR-4)

### Mocking Strategy
- No HTTP mocking needed for the automated tests — they read local files (`roadmap.md`,
  `README.md`, `docs/screenshots/*.png`) only.
- No way to mock a live deployed URL's load time or a real browser session from this repo's test
  suite — those stay manual, same precedent as S10.2's FR-3/FR-4 and S2.1's account-setup checks.
- Test file: `src/__tests__/acceptance.test.js`, `environment: 'node'`.

### Coverage Expectation
- FR-1 and FR-5 fully covered by automated tests.
- FR-2/FR-3/FR-4 are manual by nature (live network, real browser, timed/visual judgment) —
  documented as explicit **MANUAL** checklist items rather than skipped silently.

---

## References
- `roadmap.md` — Master Spec Index (the completion gate FR-1 audits) and Phase 11 goal — "project
  is complete, live, documented, and usable by anyone"
- `checklist.md` (repo root, legacy combined checklist, lines ~1381-1414) — S11.3 section's original
  5-test list, reused here as this spec's FRs/tests
- `specs/spec-S10.2-vercel-deploy/spec.md` — the live URL (`https://llm-playground-two.vercel.app`)
  and the precedent for marking live-environment checks as **MANUAL**
- `specs/spec-S11.1-readme/spec.md` — the README this spec adds screenshots to
- `specs/spec-S2.3-error-handling/spec.md` — the "No API key found" behavior FR-3 treats as a valid
  passing outcome
- `specs/spec-S5.1-tokeniser-logic/`, `specs/spec-S6.4-eval-gen-panels/` — the tokeniser demo FR-4
  exercises
