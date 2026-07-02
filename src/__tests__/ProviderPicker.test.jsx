// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProviderPicker from '../ProviderPicker'

describe('S4.5 — ProviderPicker component', () => {
  it('test_provider_picker_renders_select_with_three_options', () => {
    render(<ProviderPicker value="groq" onChange={vi.fn()} />)
    const select = screen.getByRole('combobox')
    const values = Array.from(select.options).map((o) => o.value)
    expect(values).toEqual(['groq', 'gemini', 'openrouter'])
  })

  it('test_provider_picker_reflects_current_value', () => {
    render(<ProviderPicker value="openrouter" onChange={vi.fn()} />)
    expect(screen.getByRole('combobox').value).toBe('openrouter')
  })

  it('test_provider_picker_calls_onChange_with_string', () => {
    const onChange = vi.fn()
    render(<ProviderPicker value="groq" onChange={onChange} />)
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'gemini' } })
    expect(onChange).toHaveBeenCalledWith('gemini')
  })
})

describe('S7.1 — ProviderPicker id/label props', () => {
  it('test_provider_picker_accepts_custom_id_and_label', () => {
    render(
      <ProviderPicker
        value="groq"
        onChange={vi.fn()}
        id="compare-provider-left"
        label="Left Provider"
      />
    )
    expect(screen.getByLabelText('Left Provider')).toHaveAttribute('id', 'compare-provider-left')
  })

  it('test_provider_picker_default_id_and_label_unchanged', () => {
    render(<ProviderPicker value="groq" onChange={vi.fn()} />)
    expect(screen.getByLabelText('Provider')).toHaveAttribute('id', 'provider-picker')
  })
})
