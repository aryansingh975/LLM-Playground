// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TokeniserDemo from '../TokeniserDemo'
import { TOKEN_COLORS } from '../tokenColors'
import { tokenize } from '../tokenizer'

describe('S5.2 — Tokeniser Demo', () => {
  it('test_renders_empty_state_with_zero_count', () => {
    render(<TokeniserDemo />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.queryAllByTestId('token-chip')).toHaveLength(0)
    expect(screen.getByText('Token count: 0')).toBeInTheDocument()
  })

  it('test_typing_renders_chips_matching_tokenize', () => {
    render(<TokeniserDemo />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'hello world' } })
    const chips = screen.getAllByTestId('token-chip')
    const expected = tokenize('hello world')
    expect(chips).toHaveLength(expected.length)
    expect(chips.map((c) => c.textContent).join('')).toBe('hello world')
  })

  it('test_token_count_updates_live', () => {
    render(<TokeniserDemo />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'hello world' } })
    const expected = tokenize('hello world').length
    expect(screen.getByText(`Token count: ${expected}`)).toBeInTheDocument()
  })

  it('test_chips_cycle_through_color_palette', () => {
    render(<TokeniserDemo />)
    // Repeat a short phrase until it tokenizes to more than a full palette cycle.
    const text = 'alpha beta gamma delta epsilon zeta eta theta iota kappa '.repeat(3)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: text } })
    const chips = screen.getAllByTestId('token-chip')
    expect(chips.length).toBeGreaterThan(TOKEN_COLORS.length)
    expect(chips[0].className).toContain(TOKEN_COLORS[0])
    expect(chips[TOKEN_COLORS.length].className).toContain(TOKEN_COLORS[0])
  })

  it('test_chips_have_whitespace_pre_class', () => {
    render(<TokeniserDemo />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'hello world' } })
    const chips = screen.getAllByTestId('token-chip')
    expect(chips.length).toBeGreaterThan(0)
    for (const chip of chips) {
      expect(chip.className).toContain('whitespace-pre')
    }
  })

  it('test_clearing_input_removes_chips', () => {
    render(<TokeniserDemo />)
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'hello world' } })
    expect(screen.getAllByTestId('token-chip').length).toBeGreaterThan(0)
    fireEvent.change(textarea, { target: { value: '' } })
    expect(screen.queryAllByTestId('token-chip')).toHaveLength(0)
    expect(screen.getByText('Token count: 0')).toBeInTheDocument()
  })
})
