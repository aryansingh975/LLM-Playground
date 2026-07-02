import StarRating from './StarRating'
import BenchmarkChart from './BenchmarkChart'

const DEFAULT_SAMPLE_RESPONSES = [
  { id: 'sample-1', text: 'The capital of France is Paris.' },
  { id: 'sample-2', text: 'Photosynthesis converts light energy into chemical energy.' },
]

function EvaluatePage({ sampleResponses = DEFAULT_SAMPLE_RESPONSES }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Evaluate</h1>

      <section className="mt-4">
        <h2 className="text-xl font-semibold">Rate Responses</h2>
        <div className="mt-2" data-testid="eval-rate-section">
          {sampleResponses.length === 0 ? (
            'No responses to rate yet'
          ) : (
            <ul className="flex flex-col gap-3">
              {sampleResponses.map(({ id, text }) => (
                <li
                  key={id}
                  className="flex items-center justify-between gap-4 border rounded p-2"
                >
                  <span>{text}</span>
                  <StarRating responseId={id} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Benchmarks</h2>
        <div className="mt-2" data-testid="eval-benchmark-section">
          <BenchmarkChart />
        </div>
      </section>
    </div>
  )
}

export default EvaluatePage
