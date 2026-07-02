// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TopPSlider from '../TopPSlider'

describe('S4.3 — TopPSlider component', () => {
  it('test_top_p_slider_renders_range_input', () => {
    render(<TopPSlider value={1} onChange={vi.fn()} />)
    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('min', '0.1')
    expect(slider).toHaveAttribute('max', '1')
  })

  it('test_top_p_slider_shows_current_value', () => {
    render(<TopPSlider value={0.8} onChange={vi.fn()} />)
    expect(screen.getByText(/0.8/)).toBeInTheDocument()
  })

  it('test_top_p_slider_calls_onChange_with_number', () => {
    const onChange = vi.fn()
    render(<TopPSlider value={1} onChange={onChange} />)
    fireEvent.change(screen.getByRole('slider'), { target: { value: '0.4' } })
    expect(onChange).toHaveBeenCalledWith(0.4)
  })
})
