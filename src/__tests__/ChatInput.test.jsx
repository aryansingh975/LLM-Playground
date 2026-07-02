// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ChatInput from '../ChatInput'

describe('S3.3 — Chat Input', () => {
  it('test_renders_textarea_and_button', () => {
    render(<ChatInput onSend={vi.fn()} loading={false} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument()
  })

  it('test_typing_updates_textarea', () => {
    render(<ChatInput onSend={vi.fn()} loading={false} />)
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'hello' } })
    expect(textarea.value).toBe('hello')
  })

  it('test_send_button_calls_onSend', () => {
    const onSend = vi.fn()
    render(<ChatInput onSend={onSend} loading={false} />)
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'hello' } })
    fireEvent.click(screen.getByRole('button', { name: 'Send' }))
    expect(onSend).toHaveBeenCalledOnce()
    expect(onSend).toHaveBeenCalledWith('hello')
  })

  it('test_send_clears_input', () => {
    const onSend = vi.fn()
    render(<ChatInput onSend={onSend} loading={false} />)
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'hello' } })
    fireEvent.click(screen.getByRole('button', { name: 'Send' }))
    expect(textarea.value).toBe('')
  })

  it('test_empty_send_no_callback', () => {
    const onSend = vi.fn()
    render(<ChatInput onSend={onSend} loading={false} />)
    fireEvent.click(screen.getByRole('button', { name: 'Send' }))
    expect(onSend).not.toHaveBeenCalled()
  })

  it('test_whitespace_send_no_callback', () => {
    const onSend = vi.fn()
    render(<ChatInput onSend={onSend} loading={false} />)
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: '   ' } })
    fireEvent.click(screen.getByRole('button', { name: 'Send' }))
    expect(onSend).not.toHaveBeenCalled()
  })

  it('test_enter_key_sends', () => {
    const onSend = vi.fn()
    render(<ChatInput onSend={onSend} loading={false} />)
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'hello' } })
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false })
    expect(onSend).toHaveBeenCalledOnce()
    expect(onSend).toHaveBeenCalledWith('hello')
    expect(textarea.value).toBe('')
  })

  it('test_shift_enter_no_send', () => {
    const onSend = vi.fn()
    render(<ChatInput onSend={onSend} loading={false} />)
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'hello' } })
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: true })
    expect(onSend).not.toHaveBeenCalled()
  })

  it('test_loading_true_disables_controls', () => {
    render(<ChatInput onSend={vi.fn()} loading={true} />)
    expect(screen.getByRole('textbox')).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled()
  })

  it('test_loading_false_enables_controls', () => {
    render(<ChatInput onSend={vi.fn()} loading={false} />)
    expect(screen.getByRole('textbox')).not.toBeDisabled()
    expect(screen.getByRole('button', { name: 'Send' })).not.toBeDisabled()
  })
})

describe('S7.2 — ChatInput id/sendBtnId props', () => {
  it('test_chat_input_accepts_custom_ids', () => {
    render(
      <ChatInput
        onSend={vi.fn()}
        loading={false}
        id="compare-prompt-input"
        sendBtnId="compare-send-btn"
      />
    )
    expect(document.getElementById('compare-prompt-input')).not.toBeNull()
    expect(document.getElementById('compare-send-btn')).not.toBeNull()
    expect(document.getElementById('prompt-input')).toBeNull()
    expect(document.getElementById('send-btn')).toBeNull()
  })

  it('test_chat_input_default_ids_unchanged', () => {
    render(<ChatInput onSend={vi.fn()} loading={false} />)
    expect(document.getElementById('prompt-input')).not.toBeNull()
    expect(document.getElementById('send-btn')).not.toBeNull()
  })
})

describe('S9.2 — ChatInput mobile sticky bottom', () => {
  it('test_chat_input_root_has_sticky_bottom_classes', () => {
    const { container } = render(<ChatInput onSend={vi.fn()} loading={false} />)
    expect(container.firstChild.className).toMatch(/sticky/)
    expect(container.firstChild.className).toMatch(/bottom-0/)
    expect(container.firstChild.className).toMatch(/md:static/)
  })
})
