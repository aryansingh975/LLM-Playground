const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'

// Accepts either a single prompt string (one-shot, e.g. the Compare page) or an
// array of { role, text } turns (a full conversation, e.g. the Chat page) so the
// model can see prior messages instead of just the latest one.
function normalizeMessages(promptOrMessages) {
  if (typeof promptOrMessages === 'string') {
    return [{ role: 'user', text: promptOrMessages }]
  }
  return promptOrMessages
}

// Reads a fetch Response body as a Server-Sent Events stream (both Groq/OpenRouter's
// OpenAI-compatible format and Gemini's `alt=sse` format use "data: {json}\n\n" lines).
// `extractDelta` pulls the incremental text out of each parsed JSON event.
// Calls `onChunk(accumulatedTextSoFar)` after every new piece of text arrives, and
// resolves with the final full text once the stream ends.
async function readSSEStream(response, extractDelta, onChunk) {
  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let full = ''

  while (true) {
    const { value, done } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop()

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed.startsWith('data:')) continue
      const jsonStr = trimmed.slice(5).trim()
      if (!jsonStr || jsonStr === '[DONE]') continue

      let parsed
      try {
        parsed = JSON.parse(jsonStr)
      } catch {
        continue
      }
      const delta = extractDelta(parsed)
      if (delta) {
        full += delta
        onChunk(full)
      }
    }
  }

  return full
}

export async function callGroq(promptOrMessages, temperature = 1, topP = 1, maxTokens = 1024, onChunk) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY
  if (!apiKey) {
    throw new Error('No API key found. Add VITE_GROQ_API_KEY to .env.local and restart the dev server.')
  }

  const messages = normalizeMessages(promptOrMessages).map((m) => ({ role: m.role, content: m.text }))
  const streaming = typeof onChunk === 'function'

  let response
  try {
    response = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages,
        temperature,
        top_p: topP,
        max_tokens: maxTokens,
        stream: streaming,
      }),
    })
  } catch {
    throw new Error('No internet connection. Check your network and try again.')
  }

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Rate limit reached. Wait a few seconds and try again.')
    }
    throw new Error('Groq error: check your API key and try again.')
  }

  if (streaming) {
    return readSSEStream(response, (parsed) => parsed.choices?.[0]?.delta?.content, onChunk)
  }

  const data = await response.json()
  if (!data.choices?.[0]) {
    throw new Error('Unexpected response format')
  }

  return data.choices[0].message.content
}

const GEMINI_URL = (apiKey, streaming) =>
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:${streaming ? 'streamGenerateContent' : 'generateContent'}?${streaming ? 'alt=sse&' : ''}key=${apiKey}`

export async function callGemini(promptOrMessages, temperature = 1, topP = 1, maxTokens = 1024, onChunk) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('No API key found. Add VITE_GEMINI_API_KEY to .env.local and restart the dev server.')
  }

  // Gemini calls the assistant's role "model" instead of "assistant".
  const contents = normalizeMessages(promptOrMessages).map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.text }],
  }))
  const streaming = typeof onChunk === 'function'

  let response
  try {
    response = await fetch(GEMINI_URL(apiKey, streaming), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
        generationConfig: { temperature, topP, maxOutputTokens: maxTokens },
      }),
    })
  } catch {
    throw new Error('No internet connection. Check your network and try again.')
  }

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Rate limit reached. Wait a few seconds and try again.')
    }
    throw new Error('Gemini error: check your API key and try again.')
  }

  if (streaming) {
    return readSSEStream(response, (parsed) => parsed.candidates?.[0]?.content?.parts?.[0]?.text, onChunk)
  }

  const data = await response.json()
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (text === undefined) {
    throw new Error('Unexpected response format')
  }

  return text
}

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

export async function callOpenRouter(promptOrMessages, temperature = 1, topP = 1, maxTokens = 1024, onChunk) {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY
  if (!apiKey) {
    throw new Error('No API key found. Add VITE_OPENROUTER_API_KEY to .env.local and restart the dev server.')
  }

  const messages = normalizeMessages(promptOrMessages).map((m) => ({ role: m.role, content: m.text }))
  const streaming = typeof onChunk === 'function'

  let response
  try {
    response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.1-8b-instruct:free',
        messages,
        temperature,
        top_p: topP,
        max_tokens: maxTokens,
        stream: streaming,
      }),
    })
  } catch {
    throw new Error('No internet connection. Check your network and try again.')
  }

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Rate limit reached. Wait a few seconds and try again.')
    }
    throw new Error('OpenRouter error: check your API key and try again.')
  }

  if (streaming) {
    return readSSEStream(response, (parsed) => parsed.choices?.[0]?.delta?.content, onChunk)
  }

  const data = await response.json()
  if (!data.choices?.[0]) {
    throw new Error('Unexpected response format')
  }

  return data.choices[0].message.content
}

export async function callProvider(provider, prompt, temperature, topP, maxTokens, onChunk) {
  switch (provider) {
    case 'groq':
      return callGroq(prompt, temperature, topP, maxTokens, onChunk)
    case 'gemini':
      return callGemini(prompt, temperature, topP, maxTokens, onChunk)
    case 'openrouter':
      return callOpenRouter(prompt, temperature, topP, maxTokens, onChunk)
    default:
      throw new Error(`Unknown provider: ${provider}`)
  }
}
