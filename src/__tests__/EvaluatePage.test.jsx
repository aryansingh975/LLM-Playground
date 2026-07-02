// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'

vi.mock('react-chartjs-2', () => ({
  Bar: () => <div data-testid="benchmark-bar-chart" />,
}))

import EvaluatePage from '../EvaluatePage'

describe('S8.1 — EvaluatePage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('test_evaluate_page_renders_rate_responses_section', () => {
    render(<EvaluatePage />)
    expect(screen.getByRole('heading', { name: 'Rate Responses' })).toBeInTheDocument()
    expect(screen.getByTestId('eval-rate-section')).toBeInTheDocument()
  })

  it('test_evaluate_page_renders_benchmarks_section', () => {
    render(<EvaluatePage />)
    expect(screen.getByRole('heading', { name: 'Benchmarks' })).toBeInTheDocument()
    expect(screen.getByTestId('eval-benchmark-section')).toBeInTheDocument()
  })
})

describe('S8.3 — EvaluatePage benchmark chart', () => {
  it('test_evaluate_page_benchmark_section_renders_chart', () => {
    render(<EvaluatePage />)

    const section = screen.getByTestId('eval-benchmark-section')
    expect(within(section).getByTestId('benchmark-bar-chart')).toBeInTheDocument()
    expect(within(section).queryByText('Benchmark chart coming soon')).not.toBeInTheDocument()
  })
})

describe('S8.2 — EvaluatePage star ratings', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('test_evaluate_page_rate_section_renders_star_rating_per_response', () => {
    render(
      <EvaluatePage
        sampleResponses={[
          { id: 'a', text: 'Hi' },
          { id: 'b', text: 'Hello' },
        ]}
      />
    )

    const section = screen.getByTestId('eval-rate-section')
    expect(within(section).getByText('Hi')).toBeInTheDocument()
    expect(within(section).getByText('Hello')).toBeInTheDocument()
    expect(within(section).getAllByRole('button', { name: /Rate \d star/ })).toHaveLength(10)
  })

  it('test_evaluate_page_empty_responses_shows_placeholder', () => {
    render(<EvaluatePage sampleResponses={[]} />)

    const section = screen.getByTestId('eval-rate-section')
    expect(within(section).getByText('No responses to rate yet')).toBeInTheDocument()
  })
})
