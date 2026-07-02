import { useState } from 'react'
import { callProvider } from './api'
import { countTokens } from './tokenizer'
import ProviderPicker from './ProviderPicker'
import ChatInput from './ChatInput'
import ResponseCard from './ResponseCard'

async function fetchColumnReply(provider, text) {
  try {
    const reply = await callProvider(provider, text)
    return { ok: true, reply }
  } catch (err) {
    return { ok: false, error: err.message }
  }
}

function ComparePage() {
  const [leftProvider, setLeftProvider] = useState('groq')
  const [rightProvider, setRightProvider] = useState('gemini')

  const [leftLoading, setLeftLoading] = useState(false)
  const [leftReply, setLeftReply] = useState('')
  const [leftError, setLeftError] = useState('')
  const [leftTokenCount, setLeftTokenCount] = useState(null)
  const [leftLatencyMs, setLeftLatencyMs] = useState(null)

  const [rightLoading, setRightLoading] = useState(false)
  const [rightReply, setRightReply] = useState('')
  const [rightError, setRightError] = useState('')
  const [rightTokenCount, setRightTokenCount] = useState(null)
  const [rightLatencyMs, setRightLatencyMs] = useState(null)

  async function handleCompare(text) {
    setLeftLoading(true)
    setLeftReply('')
    setLeftError('')
    setLeftTokenCount(null)
    setLeftLatencyMs(null)
    setRightLoading(true)
    setRightReply('')
    setRightError('')
    setRightTokenCount(null)
    setRightLatencyMs(null)

    const leftStart = performance.now()
    const leftCall = fetchColumnReply(leftProvider, text).then((result) => {
      setLeftLatencyMs(Math.round(performance.now() - leftStart))
      if (result.ok) {
        setLeftReply(result.reply)
        setLeftTokenCount(countTokens(result.reply))
      } else {
        setLeftError(result.error)
      }
      setLeftLoading(false)
    })

    const rightStart = performance.now()
    const rightCall = fetchColumnReply(rightProvider, text).then((result) => {
      setRightLatencyMs(Math.round(performance.now() - rightStart))
      if (result.ok) {
        setRightReply(result.reply)
        setRightTokenCount(countTokens(result.reply))
      } else {
        setRightError(result.error)
      }
      setRightLoading(false)
    })

    await Promise.all([leftCall, rightCall])
  }

  return (
    <main className="flex flex-col min-h-screen p-8">
      <ChatInput
        id="compare-prompt-input"
        sendBtnId="compare-send-btn"
        onSend={handleCompare}
        loading={leftLoading || rightLoading}
      />
      <div className="flex flex-row flex-1">
        <div className="flex-1 flex flex-col p-8 border-r">
          <ProviderPicker
            value={leftProvider}
            onChange={setLeftProvider}
            id="compare-provider-left"
            label="Left Provider"
          />
          <div className="mt-4 min-h-8">
            <ResponseCard
              provider={leftProvider}
              loading={leftLoading}
              reply={leftReply}
              error={leftError}
              tokenCount={leftTokenCount}
              latencyMs={leftLatencyMs}
              testId="compare-response-left"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col p-8">
          <ProviderPicker
            value={rightProvider}
            onChange={setRightProvider}
            id="compare-provider-right"
            label="Right Provider"
          />
          <div className="mt-4 min-h-8">
            <ResponseCard
              provider={rightProvider}
              loading={rightLoading}
              reply={rightReply}
              error={rightError}
              tokenCount={rightTokenCount}
              latencyMs={rightLatencyMs}
              testId="compare-response-right"
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export default ComparePage
