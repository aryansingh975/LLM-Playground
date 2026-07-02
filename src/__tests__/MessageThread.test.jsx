// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import MessageThread from '../MessageThread'

describe('S3.2 — Message Thread', () => {
  it('renders_empty_without_crash', () => {
    const { container } = render(<MessageThread messages={[]} loading={false} />)
    expect(container.firstChild).not.toBeNull()
  })

  it('renders_user_message', () => {
    render(<MessageThread messages={[{ role: 'user', text: 'Hello' }]} loading={false} />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders_assistant_message', () => {
    render(<MessageThread messages={[{ role: 'assistant', text: 'Hi there' }]} loading={false} />)
    expect(screen.getByText('Hi there')).toBeInTheDocument()
  })

  it('user_and_assistant_have_different_classes', () => {
    render(
      <MessageThread
        messages={[
          { role: 'user', text: 'User message' },
          { role: 'assistant', text: 'Assistant message' },
        ]}
        loading={false}
      />
    )
    const userEl = screen.getByText('User message')
    const assistantEl = screen.getByText('Assistant message')
    expect(userEl.className).not.toBe(assistantEl.className)
  })

  it('loading_indicator_shown', () => {
    render(<MessageThread messages={[]} loading={true} />)
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument()
  })

  it('loading_indicator_hidden', () => {
    render(<MessageThread messages={[]} loading={false} />)
    expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument()
  })

  it('multiple_messages_all_rendered', () => {
    const msgs = [
      { role: 'user', text: 'First' },
      { role: 'assistant', text: 'Second' },
      { role: 'user', text: 'Third' },
    ]
    render(<MessageThread messages={msgs} loading={false} />)
    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
    expect(screen.getByText('Third')).toBeInTheDocument()
  })

  it('undefined_messages_no_crash', () => {
    const { container } = render(<MessageThread messages={undefined} loading={false} />)
    expect(container.firstChild).not.toBeNull()
  })
})

describe('S9.3 — Empty chat state', () => {
  it('test_message_thread_shows_empty_state_when_no_messages_and_not_loading', () => {
    render(<MessageThread messages={[]} loading={false} />)
    expect(screen.getByTestId('empty-chat-state')).toBeInTheDocument()
  })

  it('test_message_thread_hides_empty_state_when_messages_present', () => {
    render(<MessageThread messages={[{ role: 'user', text: 'Hi' }]} loading={false} />)
    expect(screen.queryByTestId('empty-chat-state')).not.toBeInTheDocument()
  })

  it('test_message_thread_hides_empty_state_while_loading', () => {
    render(<MessageThread messages={[]} loading={true} />)
    expect(screen.queryByTestId('empty-chat-state')).not.toBeInTheDocument()
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument()
  })
})
