import { useState, useEffect } from 'react'
import { callProvider } from './api'
import { loadMessages, saveMessages } from './chatStorage'
import MessageThread from './MessageThread'
import ChatInput from './ChatInput'
import Sidebar from './Sidebar'
import TemperatureSlider from './TemperatureSlider'
import TopPSlider from './TopPSlider'
import MaxTokensSlider from './MaxTokensSlider'
import ProviderPicker from './ProviderPicker'

function ChatPage() {
  const [messages, setMessages] = useState(loadMessages)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [temperature, setTemperature] = useState(1)
  const [topP, setTopP] = useState(1)
  const [maxTokens, setMaxTokens] = useState(1024)
  const [provider, setProvider] = useState('groq')

  useEffect(() => {
    saveMessages(messages)
  }, [messages])

  function handleNewChat() {
    setMessages([])
    setError('')
  }

  async function handleSend(text) {
    const conversation = [...messages, { role: 'user', text }]
    setMessages(conversation)
    setLoading(true)
    setError('')

    // A pure function of `prev` (no mutated closure state) — React 18 StrictMode
    // double-invokes state updaters in development, which would corrupt a mutable
    // "have we added the assistant message yet" flag if one lived in this closure.
    function updateAssistantMessage(text) {
      setMessages(prev => {
        if (prev.length === conversation.length) {
          return [...prev, { role: 'assistant', text }]
        }
        const updated = [...prev]
        updated[updated.length - 1] = { role: 'assistant', text }
        return updated
      })
    }

    try {
      // updateAssistantMessage is called as chunks stream in, so the reply appears
      // progressively; the final resolved value is applied once more to guarantee
      // the message ends up correct even if the provider didn't stream anything.
      const reply = await callProvider(provider, conversation, temperature, topP, maxTokens, updateAssistantMessage)
      updateAssistantMessage(reply)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex flex-row h-full overflow-hidden bg-white dark:bg-gray-950">
      <Sidebar>
        <button
          type="button"
          onClick={handleNewChat}
          disabled={loading || messages.length === 0}
          className="text-sm font-medium text-blue-600 dark:text-blue-400 text-left hover:underline disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
        >
          + New Chat
        </button>
        <TemperatureSlider value={temperature} onChange={setTemperature} />
        <TopPSlider value={topP} onChange={setTopP} />
        <MaxTokensSlider value={maxTokens} onChange={setMaxTokens} />
        <ProviderPicker value={provider} onChange={setProvider} />
      </Sidebar>
      {/* Chat column */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden p-8">
        <div id="response-area" className="flex-1 mt-4 min-h-0 overflow-hidden">
          <MessageThread messages={messages} loading={loading} />
        </div>
        <div id="error-area" className="mt-2">
          {error && (
            <div
              role="alert"
              className="flex items-center gap-2 border border-red-300 bg-red-50 text-red-700 rounded px-3 py-2 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
            >
              <span aria-hidden="true">⚠️</span>
              <span>{error}</span>
            </div>
          )}
        </div>
        {/* ChatInput — handles input state, Enter-to-send, disabled-while-loading */}
        <ChatInput onSend={handleSend} loading={loading} />
      </div>
    </main>
  )
}

export default ChatPage
