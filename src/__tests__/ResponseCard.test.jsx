// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ResponseCard from '../ResponseCard'

describe('S7.3 — ResponseCard component', () => {
  it('test_response_card_shows_provider_label', () => {
    render(
      <ResponseCard
        provider="groq"
        loading={false}
        reply=""
        error=""
        tokenCount={null}
        latencyMs={null}
        testId="card"
      />
    )
    expect(screen.getByText('Groq')).toBeInTheDocument()
  })

  it('test_response_card_shows_token_count_and_latency_on_success', () => {
    render(
      <ResponseCard
        provider="groq"
        loading={false}
        reply="hi"
        error=""
        tokenCount={5}
        latencyMs={120}
        testId="card"
      />
    )
    const card = screen.getByTestId('card')
    expect(card.textContent).toContain('5 tokens')
    expect(card.textContent).toContain('120ms')
  })

  it('test_response_card_hides_metadata_while_loading', () => {
    render(
      <ResponseCard
        provider="groq"
        loading={true}
        reply=""
        error=""
        tokenCount={null}
        latencyMs={null}
        testId="card"
      />
    )
    expect(screen.getByTestId('card').textContent).not.toContain('tokens')
  })

  it('test_response_card_hides_metadata_on_error', () => {
    render(
      <ResponseCard
        provider="groq"
        loading={false}
        reply=""
        error="boom"
        tokenCount={null}
        latencyMs={null}
        testId="card"
      />
    )
    const card = screen.getByTestId('card')
    expect(card.textContent).toContain('Error: boom')
    expect(card.textContent).not.toContain('tokens')
  })

  it('test_response_card_hides_metadata_before_send', () => {
    render(
      <ResponseCard
        provider="groq"
        loading={false}
        reply=""
        error=""
        tokenCount={null}
        latencyMs={null}
        testId="card"
      />
    )
    const card = screen.getByTestId('card')
    expect(card.textContent).toContain('Response will appear here')
    expect(card.textContent).not.toContain('tokens')
  })

  it('test_response_card_falls_back_to_raw_provider_string_for_unknown_provider', () => {
    render(
      <ResponseCard
        provider="mystery"
        loading={false}
        reply=""
        error=""
        tokenCount={null}
        latencyMs={null}
        testId="card"
      />
    )
    expect(screen.getByText('mystery')).toBeInTheDocument()
  })
})
