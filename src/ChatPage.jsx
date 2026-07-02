import { useState } from 'react'
import { callProvider } from './api'
import MessageThread from './MessageThread'
import ChatInput from './ChatInput'
import Sidebar from './Sidebar'
import TemperatureSlider from './TemperatureSlider'
import TopPSlider from './TopPSlider'
import MaxTokensSlider from './MaxTokensSlider'
import ProviderPicker from './ProviderPicker'

function ChatPage() {
  const [messages, setMessages] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [temperature, setTemperature] = useState(1)
  const [topP, setTopP] = useState(1)
  const [maxTokens, setMaxTokens] = useState(1024)
  const [provider, setProvider] = useState('groq')

  async function handleSend(text) {
    setMessages(prev => [...prev, { role: 'user', text }])
    setLoading(true)
    setError('')

    try {
      const reply = await callProvider(provider, text, temperature, topP, maxTokens)
      setMessages(prev => [...prev, { role: 'assistant', text: reply }])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex flex-row min-h-screen">
      <Sidebar>
        <TemperatureSlider value={temperature} onChange={setTemperature} />
        <TopPSlider value={topP} onChange={setTopP} />
        <MaxTokensSlider value={maxTokens} onChange={setMaxTokens} />
        <ProviderPicker value={provider} onChange={setProvider} />
      </Sidebar>
      {/* Chat column */}
      <div className="flex-1 flex flex-col p-8 max-w-2xl">
        <div id="response-area" className="mt-4 min-h-8">
          <MessageThread messages={messages} loading={loading} />
        </div>
        <div id="error-area" className="mt-2">
          {error && (
            <div
              role="alert"
              className="flex items-center gap-2 border border-red-300 bg-red-50 text-red-700 rounded px-3 py-2"
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
