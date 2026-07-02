import { useState } from 'react'

const CARDS = [
  {
    id: 'benchmarks',
    title: 'Benchmarks',
    summary: 'Standard tests used to compare models.',
    detail:
      'Benchmarks like MMLU (broad knowledge), HumanEval (code generation), and GSM8K (grade-' +
      'school math) give every model the same fixed set of questions with known correct answers, ' +
      'so scores can be compared apples-to-apples across providers.',
  },
  {
    id: 'human-preference',
    title: 'Human & Preference Evaluation',
    summary: 'Asking people which response is better.',
    detail:
      'Benchmarks can’t capture everything — tone, helpfulness, and following instructions are ' +
      'often judged by humans (or a trained reward model) ranking pairs of responses. This is the ' +
      'same preference-ranking idea that RLHF uses during training, just applied afterward to ' +
      'evaluate a finished model.',
  },
  {
    id: 'limitations-hallucination',
    title: 'Limitations & Hallucination',
    summary: 'Fluent text is not the same as correct text.',
    detail:
      'A model can produce a confident, well-written answer that is simply wrong — it has no ' +
      'built-in fact-checker. Without retrieval or tool use to ground its answers in a real ' +
      'source, it is predicting plausible-sounding tokens, not looking anything up.',
  },
  {
    id: 'safety-alignment',
    title: 'Safety & Alignment',
    summary: 'Checking a model refuses harmful requests appropriately.',
    detail:
      'Safety evaluation (often via red-teaming — deliberately trying to provoke bad behavior) ' +
      'checks whether a model appropriately declines harmful requests without being so cautious ' +
      'that it refuses reasonable ones too.',
  },
]

export default function EvaluationPanel() {
  const [expandedIds, setExpandedIds] = useState(new Set())

  function toggle(id) {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="flex flex-col gap-3">
      {CARDS.map((card) => {
        const isExpanded = expandedIds.has(card.id)
        return (
          <article key={card.id} className="rounded-lg border border-gray-200 p-4">
            <button
              type="button"
              onClick={() => toggle(card.id)}
              aria-expanded={isExpanded}
              className="flex w-full flex-col items-start gap-1 text-left"
            >
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="text-gray-600">{card.summary}</p>
            </button>
            {isExpanded && (
              <p
                data-testid={`eval-detail-${card.id}`}
                className="mt-2 text-gray-700"
              >
                {card.detail}
              </p>
            )}
          </article>
        )
      })}
    </div>
  )
}
