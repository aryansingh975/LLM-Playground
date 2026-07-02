import { useState } from 'react'

const CARDS = [
  {
    id: 'sft',
    title: 'SFT (Supervised Fine-Tuning)',
    summary: 'Teaching the base model to follow instructions.',
    detail:
      'The pre-trained base model only predicts likely next tokens — it doesn’t yet know how to ' +
      'follow an instruction or hold a conversation. SFT fine-tunes it on a curated set of ' +
      'instruction/response pairs written or approved by humans, teaching it the "assistant" ' +
      'behavior expected in a chat interface like this one.',
  },
  {
    id: 'rlhf',
    title: 'RLHF',
    summary: 'Learning from human preferences, not just examples.',
    detail:
      'Reinforcement Learning from Human Feedback trains a separate reward model on human ' +
      'rankings between candidate responses — which reply do people prefer? — and then uses that ' +
      'reward signal to further tune the SFT model, pushing it toward outputs humans actually rate ' +
      'more highly.',
  },
  {
    id: 'ppo',
    title: 'PPO',
    summary: 'The algorithm that optimizes against the reward model.',
    detail:
      'Proximal Policy Optimization is the reinforcement learning algorithm most commonly used to ' +
      'update the model against the reward model’s scores. A KL-divergence penalty keeps the ' +
      'updated policy close to the original SFT model, preventing it from drifting into ' +
      'reward-gaming behavior that no longer resembles coherent language.',
  },
  {
    id: 'verifiable-tasks',
    title: 'Verifiable Tasks',
    summary: 'Rewarding answers that can be checked automatically.',
    detail:
      'For tasks with a checkable ground truth — math problems, code that must pass unit tests — ' +
      'training can use an automatic verifier instead of a human or learned reward model. This ' +
      '"reinforcement learning from verifiable rewards" style training is cheaper to scale and ' +
      'gives an unambiguous signal wherever correctness can be checked by a program.',
  },
]

export default function PostrainPanel() {
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
                data-testid={`postrain-detail-${card.id}`}
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
