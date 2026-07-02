// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import PostrainPanel from '../PostrainPanel'

describe('S6.3 — PostrainPanel', () => {
  it('test_postrain_panel_renders_four_cards', () => {
    render(<PostrainPanel />)
    expect(screen.getByRole('heading', { name: 'SFT (Supervised Fine-Tuning)' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'RLHF' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'PPO' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Verifiable Tasks' })).toBeInTheDocument()
  })

  it('test_card_detail_hidden_by_default', () => {
    render(<PostrainPanel />)
    expect(screen.queryByTestId('postrain-detail-sft')).not.toBeInTheDocument()
    expect(screen.queryByTestId('postrain-detail-rlhf')).not.toBeInTheDocument()
    expect(screen.queryByTestId('postrain-detail-ppo')).not.toBeInTheDocument()
    expect(screen.queryByTestId('postrain-detail-verifiable-tasks')).not.toBeInTheDocument()
  })

  it('test_clicking_toggle_reveals_detail', async () => {
    const user = userEvent.setup()
    render(<PostrainPanel />)
    await user.click(screen.getByRole('button', { name: /RLHF/ }))
    expect(screen.getByTestId('postrain-detail-rlhf')).toBeInTheDocument()
  })

  it('test_clicking_toggle_again_collapses_detail', async () => {
    const user = userEvent.setup()
    render(<PostrainPanel />)
    const toggle = screen.getByRole('button', { name: /RLHF/ })
    await user.click(toggle)
    await user.click(toggle)
    expect(screen.queryByTestId('postrain-detail-rlhf')).not.toBeInTheDocument()
  })

  it('test_expanding_one_card_does_not_collapse_another', async () => {
    const user = userEvent.setup()
    render(<PostrainPanel />)
    await user.click(screen.getByRole('button', { name: /SFT/ }))
    await user.click(screen.getByRole('button', { name: /PPO/ }))
    expect(screen.getByTestId('postrain-detail-sft')).toBeInTheDocument()
    expect(screen.getByTestId('postrain-detail-ppo')).toBeInTheDocument()
  })
})
