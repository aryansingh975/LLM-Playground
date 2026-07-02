# Checklist — Spec S9.2: Mobile Layout

## Phase 1: Setup & Dependencies
- [x] Verify S3.3 (chat input) is `done`
- [x] Locate target files: `src/Sidebar.jsx`, `src/ChatInput.jsx`
- [x] No new npm dependencies needed (Tailwind responsive utilities + existing React `useState`)

## Phase 2: Tests First (TDD)
- [x] Update `src/__tests__/Sidebar.test.jsx`
  - [x] test_sidebar_renders_toggle_button_hidden_on_desktop
  - [x] test_sidebar_collapsed_by_default
  - [x] test_clicking_toggle_expands_sidebar
  - [x] test_clicking_toggle_twice_collapses_again
- [x] Update `src/__tests__/ChatInput.test.jsx`
  - [x] test_chat_input_root_has_sticky_bottom_classes
- [x] Run tests — expect failures (Red)

## Phase 3: Implementation
- [x] Implement FR-1 — `Sidebar.jsx`: add toggle `<button>` (`md:hidden`), `isOpen` state via
  `useState`, `aria-expanded`/`aria-label` reflecting state
- [x] Implement FR-2 — `Sidebar.jsx`: `<aside>` className conditional `hidden`/`flex` based on
  `isOpen` (default collapsed)
- [x] Implement FR-3 — `Sidebar.jsx`: `<aside>` className always includes `md:flex` regardless of
  `isOpen`
- [x] Implement FR-4 — `ChatInput.jsx`: add `sticky bottom-0 md:static` to the root container
  className
- [x] Run tests — expect pass (Green)
- [x] Refactor if needed — fixed a regression in the pre-existing
  `test_sidebar_has_visual_distinction_class` test: the new toggle `<button>` becoming
  `container.firstChild` (instead of `<aside>`) needed its own `border-b bg-gray-50` styling to
  keep that assertion meaningful

## Phase 4: Integration
- [x] Confirm `ChatPage` still renders `Sidebar` + `ChatInput` correctly (no prop/API changes
  required on either component)
- [x] Run lint: `npx oxlint src/Sidebar.jsx src/ChatInput.jsx src/__tests__/Sidebar.test.jsx
  src/__tests__/ChatInput.test.jsx` — clean
- [x] Run full test suite: `npm run test` — 221/221 passed (25 test files)

## Phase 5: Verification
- [x] All 4 tangible outcomes verified
- [x] No hardcoded secrets/tokens
- [x] Update `roadmap.md` status for S9.2: `pending` → `spec-written` (done as part of this step) →
  `done` (after implementation)
