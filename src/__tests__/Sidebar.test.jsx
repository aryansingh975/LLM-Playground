// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Sidebar from '../Sidebar'
import App from '../App'

vi.mock('../api', () => ({ callProvider: vi.fn() }))

describe('S4.1 — Sidebar component', () => {
  it('test_sidebar_renders_controls_heading', () => {
    render(<Sidebar />)
    expect(screen.getByText('Controls')).toBeInTheDocument()
  })

  it('test_sidebar_renders_children', () => {
    render(
      <Sidebar>
        <span data-testid="child">hi</span>
      </Sidebar>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('test_sidebar_has_visual_distinction_class', () => {
    const { container } = render(<Sidebar />)
    expect(container.firstChild.className).toMatch(/border|bg-/)
  })
})

describe('S4.1 — App layout', () => {
  it('test_app_has_flex_row_container', () => {
    render(<App />)
    expect(document.querySelector('.flex-row')).not.toBeNull()
  })

  it('test_app_sidebar_present', () => {
    render(<App />)
    expect(screen.getByText('Controls')).toBeInTheDocument()
  })

  it('test_app_response_area_preserved', () => {
    render(<App />)
    expect(document.getElementById('response-area')).not.toBeNull()
  })

  it('test_app_error_area_preserved', () => {
    render(<App />)
    expect(document.getElementById('error-area')).not.toBeNull()
  })

  it('test_app_prompt_input_preserved', () => {
    render(<App />)
    expect(document.getElementById('prompt-input')).not.toBeNull()
  })

  it('test_app_send_btn_preserved', () => {
    render(<App />)
    expect(document.getElementById('send-btn')).not.toBeNull()
  })
})

describe('S9.2 — Sidebar mobile collapse', () => {
  it('test_sidebar_renders_toggle_button_hidden_on_desktop', () => {
    render(<Sidebar />)
    const toggle = screen.getByRole('button', { name: 'Show controls' })
    expect(toggle.className).toMatch(/md:hidden/)
  })

  it('test_sidebar_collapsed_by_default', () => {
    const { container } = render(<Sidebar />)
    const aside = container.querySelector('aside')
    expect(aside.className).toMatch(/hidden/)
    expect(aside.className).toMatch(/md:flex/)
    expect(screen.getByRole('button', { name: 'Show controls' })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
  })

  it('test_clicking_toggle_expands_sidebar', () => {
    const { container } = render(<Sidebar />)
    fireEvent.click(screen.getByRole('button', { name: 'Show controls' }))

    const aside = container.querySelector('aside')
    expect(aside.className).toMatch(/flex/)
    expect(aside.className).not.toMatch(/hidden/)
    expect(aside.className).toMatch(/md:flex/)
    expect(screen.getByRole('button', { name: 'Hide controls' })).toHaveAttribute(
      'aria-expanded',
      'true'
    )
  })

  it('test_clicking_toggle_twice_collapses_again', () => {
    const { container } = render(<Sidebar />)
    const toggle = screen.getByRole('button', { name: 'Show controls' })
    fireEvent.click(toggle)
    fireEvent.click(screen.getByRole('button', { name: 'Hide controls' }))

    const aside = container.querySelector('aside')
    expect(aside.className).toMatch(/hidden/)
    expect(screen.getByRole('button', { name: 'Show controls' })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
  })
})
