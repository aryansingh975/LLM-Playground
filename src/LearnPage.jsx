import PretrainPanel from './PretrainPanel'
import PostrainPanel from './PostrainPanel'
import EvaluationPanel from './EvaluationPanel'
import GenerationPanel from './GenerationPanel'

function LearnPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Learn</h1>

      <section className="mt-4">
        <h2 className="text-xl font-semibold">Pre-training</h2>
        <div className="mt-2">
          <PretrainPanel />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Post-training</h2>
        <div className="mt-2">
          <PostrainPanel />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Evaluation</h2>
        <div className="mt-2">
          <EvaluationPanel />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Text Generation</h2>
        <div className="mt-2">
          <GenerationPanel />
        </div>
      </section>
    </div>
  )
}

export default LearnPage
