import { useState } from 'react'
import TokeniserDemo from './TokeniserDemo'

const CARDS = [
  {
    id: 'decoding-strategies',
    title: 'Decoding Strategies',
    summary: 'How the model picks the next token.',
    detail:
      'At each step the model outputs a probability over every possible next token. Greedy ' +
      'decoding always picks the single most likely one; sampling instead draws from that ' +
      'distribution, shaped by controls like temperature and top-p — the same sliders on this ' +
      'app’s Chat page — to trade off predictability against variety.',
  },
  {
    id: 'context-window',
    title: 'Context Window',
    summary: 'The limited number of tokens a model can see at once.',
    detail:
      'A model can only attend to a fixed number of tokens at a time — the prompt, the ' +
      'conversation so far, and the reply all share that budget. This app’s max-tokens slider ' +
      'caps how many tokens the reply itself is allowed to use within that shared window.',
  },
  {
    id: 'prompting-patterns',
    title: 'Prompting Patterns',
    summary: 'Shaping output through how you ask.',
    detail:
      'Messages are structured into roles — system, user, assistant — so the model knows which ' +
      'text is an instruction versus a reply. Including a few worked examples in the prompt ' +
      '("few-shot" prompting) can steer the format and style of the response without any ' +
      'retraining.',
  },
]

export default function GenerationPanel() {
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
                data-testid={`gen-detail-${card.id}`}
                className="mt-2 text-gray-700"
              >
                {card.detail}
              </p>
            )}
          </article>
        )
      })}

      <div className="mt-2 rounded-lg border border-gray-200 p-4">
        <h3 className="text-lg font-semibold">Try it: tokenisation at generation time</h3>
        <p className="mt-1 mb-2 text-gray-600">
          Every prompt and reply is tokenised the same way — type below to see it live.
        </p>
        <TokeniserDemo />
      </div>
    </div>
  )
}
