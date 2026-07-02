// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from '../App'

vi.mock('../api', () => ({
  callProvider: vi.fn(),
}))

describe('S1.1 — HTML Skeleton', () => {
  beforeEach(() => {
    render(<App />)
  })

  it('renders a prompt input with id prompt-input', () => {
    expect(document.getElementById('prompt-input')).not.toBeNull()
  })

  it('renders a send button with id send-btn and label Send', () => {
    const btn = document.getElementById('send-btn')
    expect(btn).not.toBeNull()
    expect(btn.textContent).toBe('Send')
  })

  it('renders a response area with id response-area', () => {
    expect(document.getElementById('response-area')).not.toBeNull()
  })

  it('response area shows the empty-chat placeholder initially', () => {
    const area = document.getElementById('response-area')
    expect(area.querySelector('[data-testid="empty-chat-state"]')).not.toBeNull()
  })

  it('does not render the Vite boilerplate counter button', () => {
    expect(screen.queryByText(/Count is/i)).toBeNull()
  })
})

describe('S1.2 — JS Click Handler', () => {
  let callProvider

  beforeEach(async () => {
    const api = await import('../api')
    callProvider = api.callProvider
    vi.mocked(callProvider).mockReset()
    render(<App />)
  })

  it('clicking Send displays the reply in the response area', async () => {
    const user = userEvent.setup()
    vi.mocked(callProvider).mockResolvedValue('AI reply')
    await user.type(screen.getByRole('textbox'), 'hello world')
    await user.click(screen.getByRole('button', { name: 'Send' }))
    await waitFor(() =>
      expect(document.getElementById('response-area').textContent).toContain('AI reply')
    )
  })

  it('clicking Send twice accumulates both replies in the response area', async () => {
    const user = userEvent.setup()
    vi.mocked(callProvider).mockResolvedValueOnce('first reply').mockResolvedValueOnce('second reply')
    await user.type(screen.getByRole('textbox'), 'first')
    await user.click(screen.getByRole('button', { name: 'Send' }))
    await waitFor(() =>
      expect(document.getElementById('response-area').textContent).toContain('first reply')
    )
    await user.type(screen.getByRole('textbox'), 'second')
    await user.click(screen.getByRole('button', { name: 'Send' }))
    await waitFor(() => {
      expect(document.getElementById('response-area').textContent).toContain('first reply')
      expect(document.getElementById('response-area').textContent).toContain('second reply')
    })
  })

  it('clicking Send clears the prompt input', async () => {
    const user = userEvent.setup()
    vi.mocked(callProvider).mockResolvedValue('any reply')
    await user.type(screen.getByRole('textbox'), 'some text')
    await user.click(screen.getByRole('button', { name: 'Send' }))
    expect(screen.getByRole('textbox').value).toBe('')
  })

  it('clicking Send with empty input shows Loading then empty on undefined reply', async () => {
    const user = userEvent.setup()
    vi.mocked(callProvider).mockResolvedValue('')
    await user.click(screen.getByRole('button', { name: 'Send' }))
    await waitFor(() => {
      const area = document.getElementById('response-area')
      expect(area.querySelector('[data-testid="empty-chat-state"]')).not.toBeNull()
    })
  })
})

describe('S1.3 — Basic Styling', () => {
  beforeEach(() => {
    render(<App />)
  })

  it('main element has a layout class', () => {
    const main = document.querySelector('main')
    expect(main.className).toMatch(/flex/)
  })

  it('prompt input has a full-width class', () => {
    expect(document.getElementById('prompt-input').className).toMatch(/w-full/)
  })

  it('send button has a background colour class', () => {
    expect(document.getElementById('send-btn').className).toMatch(/bg-\w/)
  })

  it('response area has a top margin class', () => {
    expect(document.getElementById('response-area').className).toMatch(/mt-/)
  })
})

describe('S2.2 — First API Call', () => {
  let callProvider

  beforeEach(async () => {
    const api = await import('../api')
    callProvider = api.callProvider
    vi.mocked(callProvider).mockReset()
    render(<App />)
  })

  it('shows Loading while request is in flight', async () => {
    const user = userEvent.setup()
    vi.mocked(callProvider).mockReturnValue(new Promise(() => {}))
    await user.type(screen.getByRole('textbox'), 'hello')
    await user.click(screen.getByRole('button', { name: 'Send' }))
    expect(document.getElementById('send-btn')).toBeDisabled()
  })

  it('displays reply on success', async () => {
    const user = userEvent.setup()
    vi.mocked(callProvider).mockResolvedValue('AI says hi')
    await user.type(screen.getByRole('textbox'), 'hello')
    await user.click(screen.getByRole('button', { name: 'Send' }))
    await waitFor(() =>
      expect(document.getElementById('response-area').textContent).toContain('AI says hi')
    )
  })

  it('displays error message on failure', async () => {
    const user = userEvent.setup()
    vi.mocked(callProvider).mockRejectedValue(new Error('Groq error: check your API key and try again.'))
    await user.type(screen.getByRole('textbox'), 'hello')
    await user.click(screen.getByRole('button', { name: 'Send' }))
    await waitFor(() =>
      expect(document.getElementById('error-area').textContent).not.toBe('')
    )
  })
})

describe('S3.1 — Component Architecture', () => {
  let callProvider

  beforeEach(async () => {
    const api = await import('../api')
    callProvider = api.callProvider
    vi.mocked(callProvider).mockReset()
    render(<App />)
  })

  it('messages_starts_empty', () => {
    const area = document.getElementById('response-area')
    expect(area.querySelector('[data-testid="empty-chat-state"]')).not.toBeNull()
  })

  it('send_appends_user_message', async () => {
    const user = userEvent.setup()
    vi.mocked(callProvider).mockResolvedValue('AI reply')
    await user.type(screen.getByRole('textbox'), 'Hello')
    await user.click(screen.getByRole('button', { name: 'Send' }))
    await waitFor(() =>
      expect(document.getElementById('response-area').textContent).toContain('Hello')
    )
  })

  it('send_appends_assistant_reply', async () => {
    const user = userEvent.setup()
    vi.mocked(callProvider).mockResolvedValue('AI reply')
    await user.type(screen.getByRole('textbox'), 'Hello')
    await user.click(screen.getByRole('button', { name: 'Send' }))
    await waitFor(() =>
      expect(document.getElementById('response-area').textContent).toContain('AI reply')
    )
  })

  it('blank_input_no_call', async () => {
    const user = userEvent.setup()
    vi.mocked(callProvider).mockResolvedValue('AI reply')
    await user.click(screen.getByRole('button', { name: 'Send' }))
    expect(vi.mocked(callProvider)).not.toHaveBeenCalled()
  })

  it('error_state_user_message_preserved', async () => {
    const user = userEvent.setup()
    vi.mocked(callProvider).mockRejectedValue(new Error('Groq error'))
    await user.type(screen.getByRole('textbox'), 'Hello')
    await user.click(screen.getByRole('button', { name: 'Send' }))
    await waitFor(() => {
      expect(document.getElementById('error-area').textContent).not.toBe('')
      expect(document.getElementById('response-area').textContent).toContain('Hello')
    })
  })

  it('loading_disables_button', async () => {
    const user = userEvent.setup()
    vi.mocked(callProvider).mockReturnValue(new Promise(() => {}))
    await user.type(screen.getByRole('textbox'), 'Hello')
    await user.click(screen.getByRole('button', { name: 'Send' }))
    expect(document.getElementById('send-btn')).toBeDisabled()
  })
})

describe('S2.3 — Error Handling', () => {
  let callProvider

  beforeEach(async () => {
    const api = await import('../api')
    callProvider = api.callProvider
    vi.mocked(callProvider).mockReset()
    render(<App />)
  })

  it('shows_rate_limit_error_in_error_area', async () => {
    const user = userEvent.setup()
    vi.mocked(callProvider).mockRejectedValue(new Error('Rate limit reached. Wait a few seconds and try again.'))
    await user.type(screen.getByRole('textbox'), 'hello')
    await user.click(screen.getByRole('button', { name: 'Send' }))
    await waitFor(() => {
      expect(document.getElementById('error-area').textContent).toMatch(/Rate limit/)
    })
  })

  it('shows_no_key_error_in_error_area', async () => {
    const user = userEvent.setup()
    vi.mocked(callProvider).mockRejectedValue(new Error('No API key found. Add VITE_GROQ_API_KEY to .env.local and restart the dev server.'))
    await user.type(screen.getByRole('textbox'), 'hello')
    await user.click(screen.getByRole('button', { name: 'Send' }))
    await waitFor(() =>
      expect(document.getElementById('error-area').textContent).toMatch(/No API key/)
    )
  })

  it('shows_no_internet_error_in_error_area', async () => {
    const user = userEvent.setup()
    vi.mocked(callProvider).mockRejectedValue(new Error('No internet connection. Check your network and try again.'))
    await user.type(screen.getByRole('textbox'), 'hello')
    await user.click(screen.getByRole('button', { name: 'Send' }))
    await waitFor(() =>
      expect(document.getElementById('error-area').textContent).toMatch(/No internet/)
    )
  })

  it('clears_error_on_next_success', async () => {
    const user = userEvent.setup()
    vi.mocked(callProvider)
      .mockRejectedValueOnce(new Error('Rate limit reached. Wait a few seconds and try again.'))
      .mockResolvedValueOnce('AI reply')
    await user.type(screen.getByRole('textbox'), 'hello')
    await user.click(screen.getByRole('button', { name: 'Send' }))
    await waitFor(() =>
      expect(document.getElementById('error-area').textContent).toMatch(/Rate limit/)
    )
    await user.type(screen.getByRole('textbox'), 'hello again')
    await user.click(screen.getByRole('button', { name: 'Send' }))
    await waitFor(() =>
      expect(document.getElementById('error-area').textContent).toBe('')
    )
  })
})

describe('S9.3 — Error alert styling', () => {
  let callProvider

  beforeEach(async () => {
    const api = await import('../api')
    callProvider = api.callProvider
    vi.mocked(callProvider).mockReset()
    render(<App />)
  })

  it('test_error_area_renders_alert_role_when_error_present', async () => {
    const user = userEvent.setup()
    vi.mocked(callProvider).mockRejectedValue(new Error('Rate limit reached. Wait a few seconds and try again.'))
    await user.type(screen.getByRole('textbox'), 'hello')
    await user.click(screen.getByRole('button', { name: 'Send' }))
    await waitFor(() => {
      const alert = document.getElementById('error-area').querySelector('[role="alert"]')
      expect(alert).not.toBeNull()
      expect(alert.textContent).toMatch(/Rate limit/)
    })
  })

  it('test_error_area_no_alert_when_no_error', () => {
    const errorArea = document.getElementById('error-area')
    expect(errorArea.querySelector('[role="alert"]')).toBeNull()
    expect(errorArea.textContent).toBe('')
  })
})

describe('S4.2 — Temperature Slider', () => {
  let callProvider

  beforeEach(async () => {
    const api = await import('../api')
    callProvider = api.callProvider
    vi.mocked(callProvider).mockReset()
    render(<App />)
  })

  it('test_app_renders_temperature_slider', () => {
    expect(screen.getByRole('slider', { name: /temperature/i })).toBeInTheDocument()
  })

  it('test_app_passes_temperature_to_callProvider', async () => {
    const user = userEvent.setup()
    vi.mocked(callProvider).mockResolvedValue('AI reply')
    fireEvent.change(screen.getByRole('slider', { name: /temperature/i }), { target: { value: '0.4' } })
    await user.type(screen.getByRole('textbox'), 'hello')
    await user.click(screen.getByRole('button', { name: 'Send' }))
    await waitFor(() => expect(callProvider).toHaveBeenCalledWith('groq', 'hello', 0.4, 1, 1024))
  })
})

describe('S4.3 — Top-p Slider', () => {
  let callProvider

  beforeEach(async () => {
    const api = await import('../api')
    callProvider = api.callProvider
    vi.mocked(callProvider).mockReset()
    render(<App />)
  })

  it('test_app_renders_top_p_slider', () => {
    expect(screen.getByRole('slider', { name: /top-p/i })).toBeInTheDocument()
  })

  it('test_app_passes_top_p_to_callProvider', async () => {
    const user = userEvent.setup()
    vi.mocked(callProvider).mockResolvedValue('AI reply')
    fireEvent.change(screen.getByRole('slider', { name: /top-p/i }), { target: { value: '0.4' } })
    await user.type(screen.getByRole('textbox'), 'hello')
    await user.click(screen.getByRole('button', { name: 'Send' }))
    await waitFor(() => expect(callProvider).toHaveBeenCalledWith('groq', 'hello', 1, 0.4, 1024))
  })
})

describe('S4.4 — Max Tokens Slider', () => {
  let callProvider

  beforeEach(async () => {
    const api = await import('../api')
    callProvider = api.callProvider
    vi.mocked(callProvider).mockReset()
    render(<App />)
  })

  it('test_app_renders_max_tokens_slider', () => {
    expect(screen.getByRole('slider', { name: /max tokens/i })).toBeInTheDocument()
  })

  it('test_app_passes_max_tokens_to_callProvider', async () => {
    const user = userEvent.setup()
    vi.mocked(callProvider).mockResolvedValue('AI reply')
    fireEvent.change(screen.getByRole('slider', { name: /max tokens/i }), { target: { value: '256' } })
    await user.type(screen.getByRole('textbox'), 'hello')
    await user.click(screen.getByRole('button', { name: 'Send' }))
    await waitFor(() => expect(callProvider).toHaveBeenCalledWith('groq', 'hello', 1, 1, 256))
  })
})

describe('S4.5 — Provider Picker', () => {
  let callProvider

  beforeEach(async () => {
    const api = await import('../api')
    callProvider = api.callProvider
    vi.mocked(callProvider).mockReset()
    render(<App />)
  })

  it('test_app_renders_provider_picker', () => {
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('test_app_passes_provider_to_callProvider', async () => {
    const user = userEvent.setup()
    vi.mocked(callProvider).mockResolvedValue('AI reply')
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'gemini' } })
    await user.type(screen.getByRole('textbox'), 'hello')
    await user.click(screen.getByRole('button', { name: 'Send' }))
    await waitFor(() => expect(callProvider).toHaveBeenCalledWith('gemini', 'hello', 1, 1, 1024))
  })
})

describe('S6.1 — Routing', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/')
  })

  it('test_default_route_shows_chat_page', () => {
    render(<App />)
    expect(document.getElementById('prompt-input')).not.toBeNull()
  })

  it('test_navigating_to_learn_shows_learn_page', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('link', { name: 'Learn' }))
    expect(document.getElementById('prompt-input')).toBeNull()
  })

  it('test_navigating_back_to_chat_restores_chat_ui', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('link', { name: 'Learn' }))
    await user.click(screen.getByRole('link', { name: 'Chat' }))
    expect(document.getElementById('prompt-input')).not.toBeNull()
  })

  it('test_unknown_route_redirects_to_chat', () => {
    window.history.pushState({}, '', '/unknown-route')
    render(<App />)
    expect(document.getElementById('prompt-input')).not.toBeNull()
  })
})

describe('S7.1 — Compare Route', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/')
  })

  it('test_app_navigating_to_compare_shows_compare_page', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('link', { name: 'Compare' }))
    expect(screen.getByLabelText('Left Provider')).toBeInTheDocument()
    expect(screen.getByLabelText('Right Provider')).toBeInTheDocument()
    expect(document.getElementById('prompt-input')).toBeNull()
  })
})

describe('S8.1 — Evaluate Route', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/')
  })

  it('test_app_navigating_to_evaluate_shows_evaluate_page', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('link', { name: 'Evaluate' }))
    expect(screen.getByRole('heading', { name: 'Rate Responses' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Benchmarks' })).toBeInTheDocument()
    expect(document.getElementById('prompt-input')).toBeNull()
  })
})
