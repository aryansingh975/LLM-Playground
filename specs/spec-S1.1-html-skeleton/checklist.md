# Checklist — Spec S1.1: HTML Skeleton

## Phase 1: Setup & Dependencies
- [x] Confirm S0.2 is `done` (Vite + React project runs with `npm run dev`)
- [x] Confirm `src/App.jsx` exists (it does — it's the Vite starter file to replace)
- [x] No new npm packages needed for this spec

## Phase 2: Tests First (TDD)
- [x] Create test file `src/__tests__/App.test.jsx`
- [x] Install `@testing-library/react` and `@testing-library/jest-dom` if not already present (`npm install --save-dev @testing-library/react @testing-library/jest-dom jsdom`)
- [x] Write `test_renders_prompt_input` — query by id `prompt-input`, assert it exists
- [x] Write `test_renders_send_button` — query by id `send-btn`, assert text is "Send"
- [x] Write `test_renders_response_area` — query by id `response-area`, assert it exists
- [x] Write `test_response_area_initially_empty` — assert response area has no text content
- [x] Write `test_no_boilerplate` — assert counter button is absent
- [x] Run `npm run test` — expect failures (Red) ✗

## Phase 3: Implementation
- [x] Open `src/App.jsx`
- [x] Remove all boilerplate imports (`reactLogo`, `viteLogo`, `heroImg`, `App.css`)
- [x] Replace the JSX return with the three structural elements:
  - `<textarea id="prompt-input" placeholder="Type your message…" aria-label="Prompt input" />`
  - `<button id="send-btn">Send</button>`
  - `<div id="response-area"></div>`
- [x] Run `npm run test` — expect pass (Green) ✓
- [x] Refactor if needed (wrapped elements in `<main>` container)

## Phase 4: Integration
- [x] Run `npm run dev` — open browser, verify the three elements are visible
- [x] Check browser console — no errors
- [x] Run `npm run lint` (oxlint) — no warnings
- [x] Run full test suite: `npm run test` — 14/14 pass

## Phase 5: Verification
- [x] All 5 tangible outcomes checked (input/button/area in DOM, no boilerplate)
- [x] No hardcoded secrets or tokens
- [x] No unused imports left in `App.jsx`
- [x] Update `roadmap.md` status: `spec-written` → `done`
