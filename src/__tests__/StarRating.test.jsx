// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import StarRating from '../StarRating'

const RATINGS_KEY = 'llm-playground:ratings'

describe('S8.2 — StarRating', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('test_star_rating_renders_five_stars', () => {
    render(<StarRating responseId="r1" />)
    expect(screen.getByRole('button', { name: 'Rate 1 star' })).toBeInTheDocument()
    for (let n = 2; n <= 5; n++) {
      expect(screen.getByRole('button', { name: `Rate ${n} stars` })).toBeInTheDocument()
    }
  })

  it('test_clicking_star_fills_up_to_that_star_and_calls_onRate', () => {
    const onRate = vi.fn()
    render(<StarRating responseId="r1" onRate={onRate} />)
    fireEvent.click(screen.getByRole('button', { name: 'Rate 3 stars' }))

    expect(screen.getByRole('button', { name: 'Rate 1 star' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
    expect(screen.getByRole('button', { name: 'Rate 2 stars' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
    expect(screen.getByRole('button', { name: 'Rate 3 stars' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
    expect(screen.getByRole('button', { name: 'Rate 4 stars' })).toHaveAttribute(
      'aria-pressed',
      'false'
    )
    expect(screen.getByRole('button', { name: 'Rate 5 stars' })).toHaveAttribute(
      'aria-pressed',
      'false'
    )
    expect(onRate).toHaveBeenCalledWith(3)
  })

  it('test_rating_persists_to_localStorage', () => {
    render(<StarRating responseId="r1" />)
    fireEvent.click(screen.getByRole('button', { name: 'Rate 4 stars' }))

    const stored = JSON.parse(localStorage.getItem(RATINGS_KEY))
    expect(stored.r1).toBe(4)
  })

  it('test_rating_hydrates_from_localStorage_on_mount', () => {
    localStorage.setItem(RATINGS_KEY, JSON.stringify({ r1: 4 }))
    render(<StarRating responseId="r1" />)

    expect(screen.getByRole('button', { name: 'Rate 4 stars' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
    expect(screen.getByRole('button', { name: 'Rate 5 stars' })).toHaveAttribute(
      'aria-pressed',
      'false'
    )
  })

  it('test_independent_ratings_for_different_response_ids', () => {
    render(
      <>
        <StarRating responseId="r1" />
        <StarRating responseId="r2" />
      </>
    )
    fireEvent.click(screen.getAllByRole('button', { name: 'Rate 5 stars' })[0])

    const stored = JSON.parse(localStorage.getItem(RATINGS_KEY))
    expect(stored.r1).toBe(5)
    expect(stored.r2).toBeUndefined()
  })

  it('test_malformed_localStorage_does_not_throw', () => {
    localStorage.setItem(RATINGS_KEY, 'not-json')

    expect(() => render(<StarRating responseId="r1" />)).not.toThrow()
    expect(screen.getByRole('button', { name: 'Rate 1 star' })).toHaveAttribute(
      'aria-pressed',
      'false'
    )
  })
})
