// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

const barCalls = []

vi.mock('react-chartjs-2', () => ({
  Bar: (props) => {
    barCalls.push(props)
    return <div data-testid="benchmark-bar-chart" />
  },
}))

const { default: BenchmarkChart, BENCHMARK_DATA } = await import('../BenchmarkChart')

describe('S8.3 — BenchmarkChart', () => {
  it('test_benchmark_data_has_one_entry_per_model', () => {
    expect(BENCHMARK_DATA).toHaveLength(3)
    for (const entry of BENCHMARK_DATA) {
      expect(typeof entry.model).toBe('string')
      for (const field of ['mmlu', 'humaneval', 'gsm8k']) {
        expect(typeof entry[field]).toBe('number')
        expect(entry[field]).toBeGreaterThanOrEqual(0)
        expect(entry[field]).toBeLessThanOrEqual(100)
      }
    }
  })

  it('test_benchmark_chart_passes_labels_and_datasets_to_bar', () => {
    barCalls.length = 0
    render(<BenchmarkChart />)

    expect(barCalls).toHaveLength(1)
    const { data } = barCalls[0]
    expect(data.labels).toEqual(BENCHMARK_DATA.map((d) => d.model))

    const byLabel = Object.fromEntries(data.datasets.map((d) => [d.label, d.data]))
    expect(byLabel['MMLU']).toEqual(BENCHMARK_DATA.map((d) => d.mmlu))
    expect(byLabel['HumanEval']).toEqual(BENCHMARK_DATA.map((d) => d.humaneval))
    expect(byLabel['GSM8K']).toEqual(BENCHMARK_DATA.map((d) => d.gsm8k))
  })

  it('test_benchmark_chart_accepts_custom_data_prop', () => {
    barCalls.length = 0
    const customData = [{ model: 'Test Model', mmlu: 10, humaneval: 20, gsm8k: 30 }]
    render(<BenchmarkChart data={customData} />)

    const { data } = barCalls[0]
    expect(data.labels).toEqual(['Test Model'])

    const byLabel = Object.fromEntries(data.datasets.map((d) => [d.label, d.data]))
    expect(byLabel['MMLU']).toEqual([10])
    expect(byLabel['HumanEval']).toEqual([20])
    expect(byLabel['GSM8K']).toEqual([30])
  })

  it('test_benchmark_chart_handles_empty_data', () => {
    barCalls.length = 0
    expect(() => render(<BenchmarkChart data={[]} />)).not.toThrow()

    const { data } = barCalls[0]
    expect(data.labels).toEqual([])
    expect(data.datasets).toHaveLength(3)
    for (const dataset of data.datasets) {
      expect(dataset.data).toEqual([])
    }
  })

  it('renders the chart element', () => {
    render(<BenchmarkChart />)
    expect(screen.getByTestId('benchmark-bar-chart')).toBeInTheDocument()
  })
})
