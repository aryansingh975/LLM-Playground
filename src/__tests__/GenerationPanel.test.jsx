// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import GenerationPanel from '../GenerationPanel'
import { tokenize } from '../tokenizer'

describe('S6.4 — GenerationPanel', () => {
  it('test_generation_panel_renders_three_cards', () => {
    render(<GenerationPanel />)
    expect(screen.getByRole('heading', { name: 'Decoding Strategies' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Context Window' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Prompting Patterns' })).toBeInTheDocument()
  })

  it('test_generation_card_detail_hidden_by_default', () => {
    render(<GenerationPanel />)
    expect(screen.queryByTestId('gen-detail-decoding-strategies')).not.toBeInTheDocument()
    expect(screen.queryByTestId('gen-detail-context-window')).not.toBeInTheDocument()
    expect(screen.queryByTestId('gen-detail-prompting-patterns')).not.toBeInTheDocument()
  })

  it('test_generation_clicking_toggle_reveals_and_collapses_detail', async () => {
    const user = userEvent.setup()
    render(<GenerationPanel />)
    const toggle = screen.getByRole('button', { name: /Decoding Strategies/ })
    await user.click(toggle)
    expect(screen.getByTestId('gen-detail-decoding-strategies')).toBeInTheDocument()
    await user.click(toggle)
    expect(screen.queryByTestId('gen-detail-decoding-strategies')).not.toBeInTheDocument()
  })

  it('test_generation_panel_renders_tokeniser_demo', () => {
    render(<GenerationPanel />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeInTheDocument()
    fireEvent.change(textarea, { target: { value: 'hello world' } })
    const expected = tokenize('hello world').length
    expect(screen.getByText(`Token count: ${expected}`)).toBeInTheDocument()
  })
})
