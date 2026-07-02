// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import PretrainPanel from '../PretrainPanel'

describe('S6.2 — PretrainPanel', () => {
  it('test_pretrain_panel_renders_four_cards', () => {
    render(<PretrainPanel />)
    expect(screen.getByRole('heading', { name: 'Data Collection' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Cleaning' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Tokenisation' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Architecture' })).toBeInTheDocument()
  })

  it('test_card_detail_hidden_by_default', () => {
    render(<PretrainPanel />)
    expect(screen.queryByTestId('pretrain-detail-data-collection')).not.toBeInTheDocument()
    expect(screen.queryByTestId('pretrain-detail-cleaning')).not.toBeInTheDocument()
    expect(screen.queryByTestId('pretrain-detail-tokenisation')).not.toBeInTheDocument()
    expect(screen.queryByTestId('pretrain-detail-architecture')).not.toBeInTheDocument()
  })

  it('test_clicking_toggle_reveals_detail', async () => {
    const user = userEvent.setup()
    render(<PretrainPanel />)
    await user.click(screen.getByRole('button', { name: /Data Collection/ }))
    expect(screen.getByTestId('pretrain-detail-data-collection')).toBeInTheDocument()
  })

  it('test_clicking_toggle_again_collapses_detail', async () => {
    const user = userEvent.setup()
    render(<PretrainPanel />)
    const toggle = screen.getByRole('button', { name: /Data Collection/ })
    await user.click(toggle)
    await user.click(toggle)
    expect(screen.queryByTestId('pretrain-detail-data-collection')).not.toBeInTheDocument()
  })

  it('test_expanding_one_card_does_not_collapse_another', async () => {
    const user = userEvent.setup()
    render(<PretrainPanel />)
    await user.click(screen.getByRole('button', { name: /Cleaning/ }))
    await user.click(screen.getByRole('button', { name: /Tokenisation/ }))
    expect(screen.getByTestId('pretrain-detail-cleaning')).toBeInTheDocument()
    expect(screen.getByTestId('pretrain-detail-tokenisation')).toBeInTheDocument()
  })
})
