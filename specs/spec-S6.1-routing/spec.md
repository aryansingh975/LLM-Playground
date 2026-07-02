# Spec S6.1 — Routing

## Overview
Install React Router and give the app two real pages — `/chat` (the existing chat UI) and `/learn`
(a placeholder for now, to be filled in by S6.2–S6.4) — with a nav bar that links between them.
This is the foundation for Phase 6 (Learn Concepts Panel) and Phase 7/8 (Compare, Evaluate), which
all add further routes on top of this one. `App.jsx` becomes a thin router shell; the existing chat
UI (all state, `handleSend`, sidebar, message thread) moves verbatim into a new `ChatPage.jsx` so
every pre-existing test (S1.1 through S4.5, 34 tests in `App.test.jsx`) keeps passing unmodified —
they render `<App />`, which now redirects `/` → `/chat` and renders exactly the same chat UI as
before.

## Dependencies
- S3.1 — App component architecture checkpoint (the `messages`/`handleSend` state shape this spec
  relocates into `ChatPage.jsx` without altering).

## Target Location
`src/App.jsx` (becomes the router shell), `src/ChatPage.jsx` (new file — chat UI moved from
`App.jsx`, unchanged), `src/LearnPage.jsx` (new file — placeholder), `src/NavBar.jsx` (new file),
`package.json` (add `react-router-dom` dependency)

---

## Functional Requirements

### FR-1: `App.jsx` becomes a router shell
- **What**: `App.jsx` wraps everything in `<BrowserRouter>`, renders `<NavBar />`, then `<Routes>`
  with three routes: `/chat` → `<ChatPage />`, `/learn` → `<LearnPage />`, and a catch-all `*` →
  `<Navigate to="/chat" replace />` (this single catch-all also handles the bare `/` root, since it
  matches anything not already matched by `/chat` or `/learn`).
- **Inputs**: None — routing state comes from the browser's URL/history, read internally by
  `BrowserRouter` (same self-contained-component pattern as `ChatInput.jsx`, no required props).
- **Outputs**: Visiting `/` or any unrecognized path redirects to `/chat`; `/chat` and `/learn` each
  render their respective page.
- **Edge cases**: Unknown paths (e.g. `/foo`) redirect to `/chat` rather than showing a blank page
  or 404.

### FR-2: Chat UI extracted into `ChatPage.jsx` unchanged
- **What**: Move the entire existing `App.jsx` body — `messages`/`error`/`loading`/`temperature`/
  `topP`/`maxTokens`/`provider` state, `handleSend`, and the sidebar/message-thread/chat-input JSX —
  into a new `ChatPage.jsx`, byte-for-byte in behavior (same element IDs: `prompt-input`,
  `send-btn`, `response-area`, `error-area`; same props/state wiring).
- **Inputs/Outputs**: Identical to the pre-S6.1 `App.jsx` — this is a pure relocation, no logic
  changes.
- **Edge cases**: None beyond what S1.1–S4.5 already cover — this FR's entire job is to introduce
  zero behavioral difference.

### FR-3: `NavBar` with links to `/chat` and `/learn`
- **What**: A `NavBar` component rendering two `react-router-dom` `<NavLink>` elements — "Chat" →
  `/chat` and "Learn" → `/learn`. `NavLink` automatically applies `aria-current="page"` to whichever
  link matches the current route, so the active page is distinguishable without extra state.
- **Inputs**: None — reads the current route internally via `NavLink`/router context.
- **Outputs**: Clicking a link navigates via client-side routing (no full page reload); the link
  matching the active route has `aria-current="page"`.
- **Edge cases**: On `/chat`, only the Chat link is marked active; on `/learn`, only the Learn link.

### FR-4: `/learn` placeholder page
- **What**: A minimal `LearnPage` component rendering a heading and short "coming soon" copy — just
  enough for the route to have visible content. S6.2–S6.4 replace this with the real pre-training/
  post-training/evaluation/generation panels.
- **Inputs/Outputs**: None — static placeholder content.
- **Edge cases**: None.

---

## Tangible Outcomes

- [ ] **Outcome 1**: `react-router-dom` appears in `package.json` `dependencies`.
- [ ] **Outcome 2**: Rendering `<App />` (default location `/`) shows the chat UI (`prompt-input`,
  `send-btn`, `response-area` all present) — identical to pre-S6.1 behavior.
- [ ] **Outcome 3**: All 34 pre-existing tests in `App.test.jsx` (S1.1 through S4.5) pass
  unmodified.
- [ ] **Outcome 4**: `NavBar` renders links named "Chat" and "Learn"; the link matching the current
  route has `aria-current="page"`.
- [ ] **Outcome 5**: Clicking the "Learn" link renders `LearnPage`'s placeholder content and removes
  the chat UI from the DOM; clicking "Chat" restores it.
- [ ] **Outcome 6**: Visiting an unrecognized path redirects to `/chat`.

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)
1. **test_navbar_renders_chat_and_learn_links** (`NavBar.test.jsx`, wrapped in `MemoryRouter`):
   assert links named "Chat" (`href="/chat"`) and "Learn" (`href="/learn"`) are present.
2. **test_chat_link_active_at_chat_route** (`NavBar.test.jsx`, `MemoryRouter initialEntries={['/chat']}`):
   Chat link has `aria-current="page"`; Learn link does not.
3. **test_learn_link_active_at_learn_route** (`NavBar.test.jsx`, `MemoryRouter initialEntries={['/learn']}`):
   Learn link has `aria-current="page"`; Chat link does not.
4. **test_default_route_shows_chat_page** (new describe block in `App.test.jsx`): render `<App />`;
   assert `prompt-input` is present (default `/` redirected to `/chat`).
5. **test_navigating_to_learn_shows_learn_page** (`App.test.jsx`): render `<App />`; click the
   "Learn" link; assert `LearnPage` placeholder text is visible and `prompt-input` is gone.
6. **test_navigating_back_to_chat_restores_chat_ui** (`App.test.jsx`): from `/learn`, click "Chat";
   assert `prompt-input` reappears.
7. **test_unknown_route_redirects_to_chat** (`App.test.jsx`): `window.history.pushState({}, '',
   '/unknown-route')` before rendering `<App />`; assert `prompt-input` is present.

### Mocking Strategy
- No new mocking needed beyond the existing `vi.mock('../api', ...)` already used throughout
  `App.test.jsx` — routing is pure client-side state, no network involved.
- `NavBar.test.jsx` wraps the component in `react-router-dom`'s `MemoryRouter` (standard pattern
  for testing router-dependent components in isolation, since `NavLink` requires a router context).
- `App.test.jsx` renders the full `<App />` (which owns its own `BrowserRouter`), matching the
  existing self-contained-component test pattern — no wrapper needed there.

### Coverage Expectation
- All 4 FRs covered by at least one test; all 7 new tests above are green; all 34 pre-existing
  `App.test.jsx` tests (S1.1–S4.5) continue to pass with zero modifications.

---

## References
- `roadmap.md` row S6.1 — "Routing" (React Router, `/chat` + `/learn` routes, nav bar), Phase 6 goal
- `specs/spec-S3.1-component-architecture/spec.md` — the `messages`/`handleSend` state shape this
  spec relocates into `ChatPage.jsx`
- `src/__tests__/App.test.jsx` — 34 pre-existing tests (S1.1–S4.5) that must keep passing unmodified
- `src/ChatInput.jsx` — self-contained component pattern (no required props) `App.jsx`/`NavBar.jsx`
  follow
- `specs/spec-S6.2-pretrain-panel/`, `spec-S6.3-postrain-panel/`, `spec-S6.4-eval-gen-panels/`
  (future) — replace `LearnPage`'s placeholder with real content
