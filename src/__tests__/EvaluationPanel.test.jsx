// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import EvaluationPanel from '../EvaluationPanel'

describe('S6.4 — EvaluationPanel', () => {
  it('test_evaluation_panel_renders_four_cards', () => {
    render(<EvaluationPanel />)
    expect(screen.getByRole('heading', { name: 'Benchmarks' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Human & Preference Evaluation' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Limitations & Hallucination' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Safety & Alignment' })).toBeInTheDocument()
  })

  it('test_evaluation_card_detail_hidden_by_default', () => {
    render(<EvaluationPanel />)
    expect(screen.queryByTestId('eval-detail-benchmarks')).not.toBeInTheDocument()
    expect(screen.queryByTestId('eval-detail-human-preference')).not.toBeInTheDocument()
    expect(screen.queryByTestId('eval-detail-limitations-hallucination')).not.toBeInTheDocument()
    expect(screen.queryByTestId('eval-detail-safety-alignment')).not.toBeInTheDocument()
  })

  it('test_evaluation_clicking_toggle_reveals_and_collapses_detail', async () => {
    const user = userEvent.setup()
    render(<EvaluationPanel />)
    const toggle = screen.getByRole('button', { name: /Benchmarks/ })
    await user.click(toggle)
    expect(screen.getByTestId('eval-detail-benchmarks')).toBeInTheDocument()
    await user.click(toggle)
    expect(screen.queryByTestId('eval-detail-benchmarks')).not.toBeInTheDocument()
  })

  it('test_evaluation_expanding_one_card_does_not_collapse_another', async () => {
    const user = userEvent.setup()
    render(<EvaluationPanel />)
    await user.click(screen.getByRole('button', { name: /Human & Preference Evaluation/ }))
    await user.click(screen.getByRole('button', { name: /Safety & Alignment/ }))
    expect(screen.getByTestId('eval-detail-human-preference')).toBeInTheDocument()
    expect(screen.getByTestId('eval-detail-safety-alignment')).toBeInTheDocument()
  })
})
