# Spec S3.2 — Message Thread

## Overview
Extract the inline message-list JSX from `App.jsx` into a dedicated `<MessageThread>` component that renders a scrollable conversation history. Each message is a `{ role, text }` object — user messages appear right-aligned, assistant messages left-aligned. A loading indicator is shown while the AI is responding. The component auto-scrolls to the newest message on every render. `App.jsx` is updated to import and use `<MessageThread>` in place of the old inline region.

## Dependencies
- S3.1 — `App.jsx` already holds `messages` as `{ role, text }[]` and has the `{/* MessageThread region */}` comment marking where this component slots in.

## Target Location
`src/MessageThread.jsx` (new file) and `src/App.jsx` (updated to use it)

---

## Functional Requirements

### FR-1: Accept and render a messages prop
- **What**: `<MessageThread messages={[]} loading={false} />` renders an empty container (no error, no crash). When `messages` has entries, each `text` is rendered inside its own element.
- **Inputs**: `messages` — array of `{ role: 'user' | 'assistant', text: string }`; `loading` — boolean.
- **Outputs**: One visible element per message; nothing rendered when the array is empty.
- **Edge cases**: `messages` undefined → treat as empty array (no crash). Very long `text` wraps within its bubble rather than overflowing.

### FR-2: Visual distinction between user and assistant messages
- **What**: User messages (`role === 'user'`) render right-aligned with a distinct background (e.g. blue). Assistant messages (`role === 'assistant'`) render left-aligned with a different background (e.g. grey). Role must be visually distinguishable — not just by position.
- **Inputs**: `role` field on each message object.
- **Outputs**: Different CSS classes applied per role.
- **Edge cases**: Unknown `role` value falls back to left-aligned assistant style.

### FR-3: Loading indicator while awaiting AI reply
- **What**: When `loading === true`, a visible loading indicator (e.g. "…", spinner text, or animated dots) is rendered below the last message and is distinct from the messages themselves.
- **Inputs**: `loading` prop.
- **Outputs**: Indicator present in the DOM when `loading` is true; absent when false.
- **Edge cases**: Indicator must not appear as a message bubble with role styling — it is visually separate.

### FR-4: Auto-scroll to newest message
- **What**: The thread container scrolls to the bottom whenever `messages` or `loading` changes — i.e., every time a new message arrives, the user sees it without manual scrolling.
- **Inputs**: Changes to `messages` or `loading` trigger a `useEffect`.
- **Outputs**: The scroll container's `scrollTop` is set to `scrollHeight` after each update.
- **Edge cases**: If the container is not yet mounted (ref is null), the effect does nothing.

### FR-5: App.jsx wired to use `<MessageThread>`
- **What**: The inline message-list block inside `App.jsx` is replaced with `<MessageThread messages={messages} loading={loading} />`. The comment `{/* MessageThread region */}` is updated to reflect the component is now in use. Element IDs `response-area` and `error-area` must still exist in the DOM (move `response-area` onto the `<MessageThread>` wrapper or keep it on a surrounding div).
- **Inputs**: `messages` and `loading` state from `App`.
- **Outputs**: App renders identically to before from the user's perspective; existing test selectors (`#response-area`, `#error-area`) remain valid.
- **Edge cases**: `loading` false and `messages` empty → empty thread, no indicator.

---

## Tangible Outcomes

- [ ] **Outcome 1**: `src/MessageThread.jsx` exists and exports a default React component.
- [ ] **Outcome 2**: Rendering `<MessageThread messages={[{role:'user',text:'Hi'}]} loading={false}/>` shows the text "Hi" in the DOM.
- [ ] **Outcome 3**: User message element has different CSS class(es) than assistant message element (verifiable by class attribute in test).
- [ ] **Outcome 4**: `loading={true}` renders a loading indicator; `loading={false}` does not.
- [ ] **Outcome 5**: `App.jsx` no longer contains the inline `messages.map(…)` block — it delegates to `<MessageThread>`.
- [ ] **Outcome 6**: `#response-area` still exists in the DOM when `App` is rendered (so S3.1 tests keep passing).

---

## Test-Driven Requirements

### Tests to Write First (Red → Green)
1. **test_renders_empty_without_crash**: Render `<MessageThread messages={[]} loading={false} />`; assert no error thrown, container present in DOM.
2. **test_renders_user_message**: Render with `[{role:'user', text:'Hello'}]`; assert `'Hello'` is in the document.
3. **test_renders_assistant_message**: Render with `[{role:'assistant', text:'Hi there'}]`; assert `'Hi there'` is in the document.
4. **test_user_and_assistant_have_different_classes**: Render both a user and an assistant message; query their wrapper elements and assert they do not share the same `className`.
5. **test_loading_indicator_shown**: Render with `loading={true}`; assert a loading indicator element is present (e.g. `getByTestId('loading-indicator')` or `getByText(/\.\.\./)`).
6. **test_loading_indicator_hidden**: Render with `loading={false}`; assert the loading indicator is NOT in the document.
7. **test_multiple_messages_all_rendered**: Render with 3 messages; assert all 3 texts appear.
8. **test_undefined_messages_no_crash**: Render `<MessageThread messages={undefined} loading={false} />`; assert no crash.

### Mocking Strategy
- No external API calls — this is a pure rendering component.
- Use `@testing-library/react` (`render`, `screen`) with jsdom (already configured in Vitest).
- `useEffect` scroll side-effect: mock `Element.prototype.scrollTo` or `scrollTop` setter with `vi.fn()` if needed to prevent jsdom errors, but do not assert scroll behaviour in unit tests (it is a DOM side-effect, not business logic).

### Coverage Expectation
- All 5 FRs have at least one passing test; edge cases (empty list, undefined prop, loading toggle) are each covered by a dedicated test.

---

## References
- `roadmap.md` row S3.2 — "Message thread"
- `CLAUDE.md` — no hardcoded secrets; no co-author in commits; frontend tests use Vitest + jsdom
- `src/App.jsx` — current inline region to be replaced; `src/api.js` — not touched by this spec
