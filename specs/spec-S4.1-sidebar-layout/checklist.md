# Checklist — Spec S4.1: Sidebar Layout

## Phase 1: Setup & Dependencies
- [x] Verify S3.3 (Chat Input) is `done` and its tests pass
- [x] Create `src/Sidebar.jsx` (new file)
- [x] No new npm packages needed — only React + Tailwind (already installed)

## Phase 2: Tests First (TDD)
- [x] Write test file: `src/__tests__/Sidebar.test.jsx`
- [x] test_sidebar_renders_controls_heading
- [x] test_sidebar_renders_children
- [x] test_sidebar_has_visual_distinction_class
- [x] test_app_has_flex_row_container
- [x] test_app_sidebar_present
- [x] test_app_response_area_preserved
- [x] test_app_error_area_preserved
- [x] test_app_prompt_input_preserved
- [x] test_app_send_btn_preserved
- [x] Run tests — expect failures (Red): `npx vitest run src/__tests__/Sidebar.test.jsx`

## Phase 3: Implementation
- [x] Implement FR-1 — `src/Sidebar.jsx`: heading "Controls" + children slot + visual-distinction class
- [x] Implement FR-2 — `src/App.jsx`: switch outer layout to `flex flex-row`; add `<Sidebar>` as flex child; wrap chat content in `flex-1` div
- [x] Implement FR-3 — confirm all four DOM IDs remain inside the chat column
- [x] Implement FR-4 — ensure sidebar `className` has a border or background class
- [x] Run tests — expect all 9 pass (Green)
- [x] Refactor if needed (no behaviour change)

## Phase 4: Integration
- [x] Confirm `<Sidebar>` is imported and used in `src/App.jsx`
- [x] Confirm chat area (`<MessageThread>`, `<ChatInput>`, error div) still in their own column
- [x] Run lint: `npx oxlint src/`
- [x] Run full test suite — all tests green (including all prior App + ChatInput + MessageThread tests)
  - Note: updated S1.3 test "main element has a centering class" → "has a layout class" (checks `/flex/`) because the layout restructure intentionally removed `mx-auto` from `<main>`

## Phase 5: Verification
- [x] All 6 tangible outcomes verified
- [x] No hardcoded API keys or secrets
- [x] Sidebar panel is empty (no controls) — correct for S4.1; S4.2–S4.5 add controls
- [x] Update `roadmap.md` status for S4.1: `spec-written` → `done`
