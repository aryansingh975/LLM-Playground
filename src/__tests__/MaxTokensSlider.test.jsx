// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import MaxTokensSlider from '../MaxTokensSlider'

describe('S4.4 — MaxTokensSlider component', () => {
  it('test_max_tokens_slider_renders_range_input', () => {
    render(<MaxTokensSlider value={1024} onChange={vi.fn()} />)
    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('min', '64')
    expect(slider).toHaveAttribute('max', '2048')
  })

  it('test_max_tokens_slider_shows_current_value', () => {
    render(<MaxTokensSlider value={512} onChange={vi.fn()} />)
    expect(screen.getByText(/512/)).toBeInTheDocument()
  })

  it('test_max_tokens_slider_calls_onChange_with_number', () => {
    const onChange = vi.fn()
    render(<MaxTokensSlider value={1024} onChange={onChange} />)
    fireEvent.change(screen.getByRole('slider'), { target: { value: '128' } })
    expect(onChange).toHaveBeenCalledWith(128)
  })
})
