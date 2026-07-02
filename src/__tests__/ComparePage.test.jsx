// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import ComparePage from '../ComparePage'

vi.mock('../api', () => ({
  callProvider: vi.fn(),
}))

describe('S7.1 — ComparePage', () => {
  it('test_compare_page_renders_two_columns', () => {
    render(<ComparePage />)
    const left = screen.getByLabelText('Left Provider')
    const right = screen.getByLabelText('Right Provider')
    expect(left).toBeInTheDocument()
    expect(right).toBeInTheDocument()
    expect(left).not.toBe(right)
  })

  it('test_compare_page_columns_have_independent_provider_state', () => {
    render(<ComparePage />)
    fireEvent.change(screen.getByLabelText('Left Provider'), { target: { value: 'openrouter' } })
    expect(screen.getByLabelText('Left Provider').value).toBe('openrouter')
    expect(screen.getByLabelText('Right Provider').value).toBe('gemini')

    fireEvent.change(screen.getByLabelText('Right Provider'), { target: { value: 'groq' } })
    expect(screen.getByLabelText('Right Provider').value).toBe('groq')
    expect(screen.getByLabelText('Left Provider').value).toBe('openrouter')
  })

  it('test_compare_page_default_providers_differ', () => {
    render(<ComparePage />)
    expect(screen.getByLabelText('Left Provider').value).toBe('groq')
    expect(screen.getByLabelText('Right Provider').value).toBe('gemini')
  })

  it('test_compare_page_shows_placeholder_response_areas', () => {
    render(<ComparePage />)
    expect(screen.getByTestId('compare-response-left')).toBeInTheDocument()
    expect(screen.getByTestId('compare-response-right')).toBeInTheDocument()
  })
})

describe('S7.2 — Parallel Calls', () => {
  let callProvider

  beforeEach(async () => {
    const api = await import('../api')
    callProvider = api.callProvider
    vi.mocked(callProvider).mockReset()
  })

  it('test_compare_page_renders_shared_prompt_input', () => {
    render(<ComparePage />)
    expect(document.getElementById('compare-prompt-input')).not.toBeNull()
    expect(document.getElementById('compare-send-btn')).not.toBeNull()
  })

  it('test_compare_page_sends_prompt_to_both_providers_concurrently', async () => {
    const user = userEvent.setup()
    vi.mocked(callProvider).mockReturnValue(new Promise(() => {}))
    render(<ComparePage />)
    await user.type(document.getElementById('compare-prompt-input'), 'hello')
    await user.click(document.getElementById('compare-send-btn'))
    expect(callProvider).toHaveBeenCalledWith('groq', 'hello')
    expect(callProvider).toHaveBeenCalledWith('gemini', 'hello')
    expect(callProvider).toHaveBeenCalledTimes(2)
  })

  it('test_compare_page_shows_independent_loading_states', async () => {
    const user = userEvent.setup()
    let resolveRight
    vi.mocked(callProvider).mockImplementation((provider) => {
      if (provider === 'groq') return Promise.resolve('left reply')
      return new Promise((resolve) => {
        resolveRight = resolve
      })
    })
    render(<ComparePage />)
    await user.type(document.getElementById('compare-prompt-input'), 'hello')
    await user.click(document.getElementById('compare-send-btn'))
    await waitFor(() =>
      expect(screen.getByTestId('compare-response-left').textContent).toContain('left reply')
    )
    expect(screen.getByTestId('compare-response-right').textContent).toContain('Loading')
    resolveRight('right reply')
  })

  it('test_compare_page_displays_reply_in_correct_column', async () => {
    const user = userEvent.setup()
    vi.mocked(callProvider).mockImplementation((provider) =>
      Promise.resolve(provider === 'groq' ? 'left reply' : 'right reply')
    )
    render(<ComparePage />)
    await user.type(document.getElementById('compare-prompt-input'), 'hello')
    await user.click(document.getElementById('compare-send-btn'))
    await waitFor(() => {
      expect(screen.getByTestId('compare-response-left').textContent).toContain('left reply')
      expect(screen.getByTestId('compare-response-right').textContent).toContain('right reply')
    })
  })

  it('test_compare_page_one_provider_failure_does_not_block_other_success', async () => {
    const user = userEvent.setup()
    vi.mocked(callProvider).mockImplementation((provider) => {
      if (provider === 'groq') return Promise.reject(new Error('Groq error: boom'))
      return Promise.resolve('right reply')
    })
    render(<ComparePage />)
    await user.type(document.getElementById('compare-prompt-input'), 'hello')
    await user.click(document.getElementById('compare-send-btn'))
    await waitFor(() => {
      expect(screen.getByTestId('compare-response-left').textContent).toContain('Error:')
      expect(screen.getByTestId('compare-response-right').textContent).toContain('right reply')
    })
  })

  it('test_compare_page_send_button_disabled_while_loading', async () => {
    const user = userEvent.setup()
    vi.mocked(callProvider).mockReturnValue(new Promise(() => {}))
    render(<ComparePage />)
    await user.type(document.getElementById('compare-prompt-input'), 'hello')
    await user.click(document.getElementById('compare-send-btn'))
    expect(document.getElementById('compare-send-btn')).toBeDisabled()
  })
})

describe('S7.3 — Response Cards', () => {
  let callProvider

  beforeEach(async () => {
    const api = await import('../api')
    callProvider = api.callProvider
    vi.mocked(callProvider).mockReset()
  })

  it('test_compare_page_shows_token_count_and_latency_after_reply', async () => {
    const user = userEvent.setup()
    vi.mocked(callProvider).mockResolvedValue('hello world')
    render(<ComparePage />)
    await user.type(document.getElementById('compare-prompt-input'), 'hello')
    await user.click(document.getElementById('compare-send-btn'))
    await waitFor(() => {
      expect(screen.getByTestId('compare-response-left').textContent).toContain('tokens')
      expect(screen.getByTestId('compare-response-left').textContent).toMatch(/\d+ms/)
    })
  })

  it('test_compare_page_latencies_are_independent_per_column', async () => {
    const user = userEvent.setup()
    let resolveRight
    vi.mocked(callProvider).mockImplementation((provider) => {
      if (provider === 'groq') return Promise.resolve('left reply')
      return new Promise((resolve) => {
        resolveRight = resolve
      })
    })
    render(<ComparePage />)
    await user.type(document.getElementById('compare-prompt-input'), 'hello')
    await user.click(document.getElementById('compare-send-btn'))
    await waitFor(() =>
      expect(screen.getByTestId('compare-response-left').textContent).toMatch(/\d+ms/)
    )
    expect(screen.getByTestId('compare-response-right').textContent).not.toMatch(/\d+ms/)
    resolveRight('right reply')
    await waitFor(() =>
      expect(screen.getByTestId('compare-response-right').textContent).toMatch(/\d+ms/)
    )
  })

  it('test_compare_page_no_token_count_on_error', async () => {
    const user = userEvent.setup()
    vi.mocked(callProvider).mockImplementation((provider) => {
      if (provider === 'groq') return Promise.reject(new Error('Groq error: boom'))
      return Promise.resolve('right reply')
    })
    render(<ComparePage />)
    await user.type(document.getElementById('compare-prompt-input'), 'hello')
    await user.click(document.getElementById('compare-send-btn'))
    await waitFor(() => {
      expect(screen.getByTestId('compare-response-left').textContent).toContain('Error:')
      expect(screen.getByTestId('compare-response-left').textContent).not.toContain('tokens')
    })
  })
})
