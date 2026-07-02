import { useState } from 'react'

const CARDS = [
  {
    id: 'data-collection',
    title: 'Data Collection',
    summary: 'Where the raw training text comes from.',
    detail:
      'Pre-training starts with massive amounts of text pulled from web crawls (like Common ' +
      'Crawl), books, Wikipedia, and code repositories — often trillions of tokens. Not every ' +
      'source is used as-is: licensing and quality both matter when deciding what goes in.',
  },
  {
    id: 'cleaning',
    title: 'Cleaning',
    summary: 'Turning raw scraped text into something usable.',
    detail:
      'Raw crawl data is noisy: boilerplate, near-duplicate pages, and low-quality or wrong-' +
      'language text all need to be filtered out. Deduplication and quality/language filtering ' +
      'shrink a huge raw corpus down to a smaller, cleaner training set.',
  },
  {
    id: 'tokenisation',
    title: 'Tokenisation',
    summary: 'Splitting text into the chunks a model actually sees.',
    detail:
      'Models don’t read raw characters — text is split into subword tokens using an ' +
      'algorithm like BPE, mapped to a fixed vocabulary. Try the tokeniser demo on the Chat page ' +
      'to see this splitting happen live on your own text.',
  },
  {
    id: 'architecture',
    title: 'Architecture',
    summary: 'The transformer that turns tokens into predictions.',
    detail:
      'Most LLMs are decoder-only transformers: stacked layers of self-attention (which lets ' +
      'each token weigh every other token before it) and feed-forward blocks, trained to predict ' +
      'the next token over and over across the whole corpus.',
  },
]

export default function PretrainPanel() {
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
                data-testid={`pretrain-detail-${card.id}`}
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
