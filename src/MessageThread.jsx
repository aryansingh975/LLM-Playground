import { useEffect, useRef } from 'react'
import { getTimeGreeting } from './greeting'

const USER_CLASSES =
  'ml-auto max-w-[75%] rounded-lg px-3 py-2 bg-blue-500 text-white text-right break-words'
const ASSISTANT_CLASSES =
  'mr-auto max-w-[75%] rounded-lg px-3 py-2 bg-gray-200 text-gray-800 text-left break-words dark:bg-gray-700 dark:text-gray-100'

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
        <div data-testid="empty-chat-state" className="m-auto text-center px-3 py-8">
          <h1 className="text-3xl font-serif text-gray-700 dark:text-gray-200 mb-2">
            {getTimeGreeting()}
          </h1>
          <p className="text-gray-400 dark:text-gray-500 italic">
            Start the conversation — type a message below.
          </p>
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
