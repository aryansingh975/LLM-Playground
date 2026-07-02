// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import NavBar from '../NavBar'

function mockMatchMedia(matches) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation(query => ({
      matches,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  })
}

describe('S6.1 — NavBar', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
    mockMatchMedia(false)
  })

  it('test_navbar_renders_chat_and_learn_links', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    )
    expect(screen.getByRole('link', { name: 'Chat' })).toHaveAttribute('href', '/chat')
    expect(screen.getByRole('link', { name: 'Learn' })).toHaveAttribute('href', '/learn')
  })

  it('test_chat_link_active_at_chat_route', () => {
    render(
      <MemoryRouter initialEntries={['/chat']}>
        <NavBar />
      </MemoryRouter>
    )
    expect(screen.getByRole('link', { name: 'Chat' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Learn' })).not.toHaveAttribute('aria-current')
  })

  it('test_learn_link_active_at_learn_route', () => {
    render(
      <MemoryRouter initialEntries={['/learn']}>
        <NavBar />
      </MemoryRouter>
    )
    expect(screen.getByRole('link', { name: 'Learn' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Chat' })).not.toHaveAttribute('aria-current')
  })

  it('test_navbar_renders_compare_link', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    )
    expect(screen.getByRole('link', { name: 'Compare' })).toHaveAttribute('href', '/compare')
  })

  it('test_compare_link_active_at_compare_route', () => {
    render(
      <MemoryRouter initialEntries={['/compare']}>
        <NavBar />
      </MemoryRouter>
    )
    expect(screen.getByRole('link', { name: 'Compare' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Chat' })).not.toHaveAttribute('aria-current')
    expect(screen.getByRole('link', { name: 'Learn' })).not.toHaveAttribute('aria-current')
  })

  it('test_navbar_renders_evaluate_link', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    )
    expect(screen.getByRole('link', { name: 'Evaluate' })).toHaveAttribute('href', '/evaluate')
  })

  it('test_evaluate_link_active_at_evaluate_route', () => {
    render(
      <MemoryRouter initialEntries={['/evaluate']}>
        <NavBar />
      </MemoryRouter>
    )
    expect(screen.getByRole('link', { name: 'Evaluate' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Chat' })).not.toHaveAttribute('aria-current')
    expect(screen.getByRole('link', { name: 'Learn' })).not.toHaveAttribute('aria-current')
    expect(screen.getByRole('link', { name: 'Compare' })).not.toHaveAttribute('aria-current')
  })
})

describe('S9.1 — NavBar theme toggle', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
    mockMatchMedia(false)
  })

  it('test_navbar_renders_theme_toggle_button', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    )
    expect(screen.getByRole('button', { name: /switch to (dark|light) mode/i })).toBeInTheDocument()
  })

  it('test_clicking_theme_toggle_flips_dark_class_and_label', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    )
    const button = screen.getByRole('button', { name: /switch to dark mode/i })
    fireEvent.click(button)

    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument()
  })
})
