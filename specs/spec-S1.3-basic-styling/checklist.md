# Checklist — Spec S1.3: Basic Styling

## Phase 1: Setup & Dependencies
- [x] Confirm S1.2 is `done` (App.jsx has working click handler)
- [x] Check which Tailwind version to install — v4 uses `@tailwindcss/vite` plugin (CSS-first, no config file); v3 uses `tailwindcss postcss autoprefixer`
- [x] Install Tailwind: `npm install --save-dev tailwindcss @tailwindcss/vite` (v4)
- [x] Wire the Tailwind plugin into `vite.config.js` and add `@import "tailwindcss"` to `src/index.css`

## Phase 2: Tests First (TDD)
- [x] Open `src/__tests__/App.test.jsx` and add a new `describe('S1.3 — Basic Styling')` block
- [x] Write test: `<main>` has `mx-auto` class
- [x] Write test: `#prompt-input` has `w-full` class
- [x] Write test: `#send-btn` className matches `/bg-\w/`
- [x] Write test: `#response-area` className includes `mt-`
- [x] Run `npm run test` — expect 4 new tests to fail (Red) ✗

## Phase 3: Implementation
- [x] Add `@import "tailwindcss"` to `src/index.css` (v4, CSS-first); cleaned up orphaned Vite boilerplate CSS
- [x] Ensure the CSS file is imported in `src/main.jsx` (already was)
- [x] Add centering classes to `<main>`: `className="mx-auto max-w-xl p-8"`
- [x] Add width + border + focus classes to `<textarea>`: `className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"`
- [x] Add colour + hover classes to `<button>`: `className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"`
- [x] Add spacing + readability classes to `#response-area`: `className="mt-4 min-h-8 text-gray-800"`
- [x] Run `npm run test` — expect all tests to pass (Green) ✓
- [x] Refactor class strings if needed (no behaviour changes)

## Phase 4: Integration
- [x] Run `npm run dev` — visually confirm centred layout, styled input, blue button, visible response area
- [x] Run `npm run lint` — no warnings
- [x] Run full test suite: `npm run test` — 22/22 pass (S1.1 + S1.2 + S1.3)

## Phase 5: Verification
- [x] All 5 tangible outcomes checked
- [x] No hardcoded secrets or tokens
- [x] No unused imports
- [x] Update `roadmap.md` status: `spec-written` → `done`
