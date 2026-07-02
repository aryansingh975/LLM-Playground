import { useState } from 'react'
import { tokenize } from './tokenizer'
import { TOKEN_COLORS } from './tokenColors'

export default function TokeniserDemo() {
  const [input, setInput] = useState('')
  const tokens = tokenize(input)

  return (
    <div className="flex flex-col gap-2">
      <textarea
        id="tokeniser-input"
        className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Type text to tokenise…"
        aria-label="Text to tokenise"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex flex-wrap gap-1">
        {tokens.map((token, i) => (
          <span
            key={i}
            data-testid="token-chip"
            className={`whitespace-pre rounded px-1 ${TOKEN_COLORS[i % TOKEN_COLORS.length]}`}
          >
            {token.text}
          </span>
        ))}
      </div>
      <div>Token count: {tokens.length}</div>
    </div>
  )
}
