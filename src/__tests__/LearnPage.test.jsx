// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LearnPage from '../LearnPage'

describe('S6.2 — LearnPage pretrain section', () => {
  it('test_learn_page_renders_pretrain_panel', () => {
    render(<LearnPage />)
    expect(screen.getByRole('heading', { name: 'Pre-training' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Data Collection' })).toBeInTheDocument()
  })

})

describe('S6.3 — LearnPage postrain section', () => {
  it('test_learn_page_renders_postrain_panel', () => {
    render(<LearnPage />)
    expect(screen.getByRole('heading', { name: 'Post-training' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'RLHF' })).toBeInTheDocument()
  })
})

describe('S6.4 — LearnPage evaluation and generation sections', () => {
  it('test_learn_page_renders_evaluation_and_generation_panels', () => {
    render(<LearnPage />)
    expect(screen.getByRole('heading', { name: 'Evaluation' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Text Generation' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Benchmarks' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Decoding Strategies' })).toBeInTheDocument()
  })

  it('test_learn_page_no_longer_shows_placeholder', () => {
    render(<LearnPage />)
    expect(screen.queryByTestId('learn-placeholder')).not.toBeInTheDocument()
  })
})
