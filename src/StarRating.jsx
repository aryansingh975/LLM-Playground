import { useState } from 'react'

const RATINGS_KEY = 'llm-playground:ratings'
const STARS = [1, 2, 3, 4, 5]

function readRatings() {
  try {
    const parsed = JSON.parse(localStorage.getItem(RATINGS_KEY))
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function writeRating(responseId, value) {
  const ratings = readRatings()
  ratings[responseId] = value
  localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings))
}

export default function StarRating({ responseId, initialRating = 0, onRate }) {
  const [rating, setRating] = useState(() => {
    const stored = readRatings()[responseId]
    return typeof stored === 'number' ? stored : initialRating
  })

  function handleClick(value) {
    setRating(value)
    writeRating(responseId, value)
    onRate?.(value)
  }

  return (
    <div className="flex gap-1" role="group" aria-label="Star rating">
      {STARS.map(n => (
        <button
          key={n}
          type="button"
          aria-label={`Rate ${n} star${n === 1 ? '' : 's'}`}
          aria-pressed={n <= rating}
          onClick={() => handleClick(n)}
          className={n <= rating ? 'text-yellow-400' : 'text-gray-300'}
        >
          ★
        </button>
      ))}
    </div>
  )
}
