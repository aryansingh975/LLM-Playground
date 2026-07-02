import { useEffect, useRef } from 'react'

const USER_CLASSES =
  'ml-auto max-w-[75%] rounded-lg px-3 py-2 bg-blue-500 text-white text-right break-words'
const ASSISTANT_CLASSES =
  'mr-auto max-w-[75%] rounded-lg px-3 py-2 bg-gray-200 text-gray-800 text-left break-words'

export default function MessageThread({ messages = [], loading = false }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages, loading])

  if (messages.length === 0 && !loading) {
    return (
      <div ref={containerRef} className="flex flex-col gap-2 overflow-y-auto h-full">
        <div data-testid="empty-chat-state" className="m-auto text-center text-gray-400 italic px-3 py-8">
          Start the conversation — type a message below.
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="flex flex-col gap-2 overflow-y-auto h-full">
      {messages.map((msg, i) => (
        <div key={i} className={msg.role === 'user' ? USER_CLASSES : ASSISTANT_CLASSES}>
          {msg.text}
        </div>
      ))}
      {loading && (
        <div
          data-testid="loading-indicator"
          className="mr-auto text-gray-400 italic px-3 py-2"
        >
          …
        </div>
      )}
    </div>
  )
}
