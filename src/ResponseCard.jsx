const PROVIDER_LABELS = {
  groq: 'Groq',
  gemini: 'Gemini',
  openrouter: 'OpenRouter',
}

function bodyText(loading, reply, error) {
  if (loading) return 'Loading…'
  if (error) return `Error: ${error}`
  if (reply) return reply
  return 'Response will appear here'
}

export default function ResponseCard({
  provider,
  loading,
  reply,
  error,
  tokenCount,
  latencyMs,
  testId,
}) {
  const showMetadata = !loading && !error && !!reply

  return (
    <div data-testid={testId} className="border rounded p-3">
      <div className="flex justify-between text-sm text-gray-600">
        <span>{PROVIDER_LABELS[provider] ?? provider}</span>
        {showMetadata && (
          <span>
            {tokenCount} tokens · {latencyMs}ms
          </span>
        )}
      </div>
      <div className="mt-2">{bodyText(loading, reply, error)}</div>
    </div>
  )
}
