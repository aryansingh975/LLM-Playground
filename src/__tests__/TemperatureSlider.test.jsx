// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TemperatureSlider from '../TemperatureSlider'

describe('S4.2 — TemperatureSlider component', () => {
  it('test_temperature_slider_renders_range_input', () => {
    render(<TemperatureSlider value={1} onChange={vi.fn()} />)
    const slider = screen.getByRole('slider')
    expect(slider).toHaveAttribute('min', '0')
    expect(slider).toHaveAttribute('max', '2')
  })

  it('test_temperature_slider_shows_current_value', () => {
    render(<TemperatureSlider value={1.5} onChange={vi.fn()} />)
    expect(screen.getByText(/1.5/)).toBeInTheDocument()
  })

  it('test_temperature_slider_calls_onChange_with_number', () => {
    const onChange = vi.fn()
    render(<TemperatureSlider value={1} onChange={onChange} />)
    fireEvent.change(screen.getByRole('slider'), { target: { value: '0.4' } })
    expect(onChange).toHaveBeenCalledWith(0.4)
  })
})
