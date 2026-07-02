import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

// Publicly published benchmark scores for the specific free model each provider serves here.
export const BENCHMARK_DATA = [
  { model: 'Groq (Llama 3.1 8B Instant)', mmlu: 73.0, humaneval: 72.6, gsm8k: 91.6 },
  { model: 'Gemini (1.5 Flash)', mmlu: 78.9, humaneval: 74.3, gsm8k: 86.2 },
  { model: 'OpenRouter (Mistral 7B Instruct)', mmlu: 62.5, humaneval: 40.2, gsm8k: 52.1 },
]

export default function BenchmarkChart({ data = BENCHMARK_DATA }) {
  const chartData = {
    labels: data.map((entry) => entry.model),
    datasets: [
      { label: 'MMLU', data: data.map((entry) => entry.mmlu) },
      { label: 'HumanEval', data: data.map((entry) => entry.humaneval) },
      { label: 'GSM8K', data: data.map((entry) => entry.gsm8k) },
    ],
  }

  const options = {
    responsive: true,
    scales: {
      y: { min: 0, max: 100 },
    },
  }

  return <Bar data={chartData} options={options} />
}
