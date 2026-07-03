import { useState } from 'react'

export default function ChatInput({ onSend, loading = false, id = 'prompt-input', sendBtnId = 'send-btn' }) {
  const [input, setInput] = useState('')

  function submit() {
    if (!input.trim()) return
    onSend(input.trim())
    setInput('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div className="mt-4 flex flex-col gap-2 sticky bottom-0 md:static bg-white dark:bg-gray-900">
      <textarea
        id={id}
        className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:placeholder-gray-400"
        placeholder="Type your message…"
        aria-label="Prompt input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />
      <button
        id={sendBtnId}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={submit}
        disabled={loading}
      >
        Send
      </button>
    </div>
  )
}
