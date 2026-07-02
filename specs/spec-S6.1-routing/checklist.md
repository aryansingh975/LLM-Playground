# Checklist — Spec S6.1: Routing

## Phase 1: Setup & Dependencies
- [x] Verify S3.1 (component architecture checkpoint) is `done`
- [x] `npm install react-router-dom` — adds it to `package.json` `dependencies`
- [x] Create `src/ChatPage.jsx`, `src/LearnPage.jsx`, `src/NavBar.jsx`

## Phase 2: Tests First (TDD)
- [x] Write test file: `src/__tests__/NavBar.test.jsx`
- [x] test_navbar_renders_chat_and_learn_links
- [x] test_chat_link_active_at_chat_route
- [x] test_learn_link_active_at_learn_route
- [x] Add new describe block to `src/__tests__/App.test.jsx`: test_default_route_shows_chat_page,
  test_navigating_to_learn_shows_learn_page, test_navigating_back_to_chat_restores_chat_ui,
  test_unknown_route_redirects_to_chat
- [x] Run tests — expect failures (Red) — `NavBar.test.jsx` fails (module missing);
  test_navigating_to_learn_shows_learn_page / test_navigating_back_to_chat_restores_chat_ui fail
  (no "Learn"/"Chat" links yet); the other 2 new tests pass vacuously against the pre-routing
  `App.jsx` (expected — they'll be the real regression check once routing exists)

## Phase 3: Implementation
- [x] Implement FR-1 — `src/App.jsx`: `<BrowserRouter>` + `<NavBar/>` + `<Routes>` (`/chat`,
  `/learn`, catch-all `*` → `<Navigate to="/chat" replace/>`)
- [x] Implement FR-2 — `src/ChatPage.jsx`: move existing `App.jsx` body verbatim (state,
  `handleSend`, JSX, all element IDs unchanged)
- [x] Implement FR-3 — `src/NavBar.jsx`: `<NavLink>` to `/chat` and `/learn`
- [x] Implement FR-4 — `src/LearnPage.jsx`: placeholder heading + copy
- [x] Run tests — expect pass (Green) — 41/41 (34 pre-existing + 3 NavBar + 4 routing)
- [x] Refactor if needed — none needed

## Phase 4: Integration
- [x] Confirm `main.jsx` still renders `<App />` unchanged (routing is self-contained inside App)
- [x] Run lint: `npx oxlint src/` — clean, exit 0
- [x] Run full test suite — 142/142 tests green (all 14 test files)

## Phase 5: Verification
- [x] All 6 tangible outcomes verified
- [x] No hardcoded secrets/tokens
- [x] `react-router-dom` dependency present in `package.json` `dependencies` (confirmed:
  `"react-router-dom": "^7.18.1"`)
- [x] Update `roadmap.md` status for S6.1: `spec-written` → `done`
