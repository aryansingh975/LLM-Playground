const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'

export async function callGroq(prompt, temperature = 1, topP = 1, maxTokens = 1024) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY
  if (!apiKey) {
    throw new Error('No API key found. Add VITE_GROQ_API_KEY to .env.local and restart the dev server.')
  }

  let response
  try {
    response = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [{ role: 'user', content: prompt }],
        temperature,
        top_p: topP,
        max_tokens: maxTokens,
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

  const data = await response.json()
  if (!data.choices?.[0]) {
    throw new Error('Unexpected response format')
  }

  return data.choices[0].message.content
}

const GEMINI_URL = (apiKey) =>
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`

export async function callGemini(prompt, temperature = 1, topP = 1, maxTokens = 1024) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('No API key found. Add VITE_GEMINI_API_KEY to .env.local and restart the dev server.')
  }

  let response
  try {
    response = await fetch(GEMINI_URL(apiKey), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
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

  const data = await response.json()
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (text === undefined) {
    throw new Error('Unexpected response format')
  }

  return text
}

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

export async function callOpenRouter(prompt, temperature = 1, topP = 1, maxTokens = 1024) {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY
  if (!apiKey) {
    throw new Error('No API key found. Add VITE_OPENROUTER_API_KEY to .env.local and restart the dev server.')
  }

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
        messages: [{ role: 'user', content: prompt }],
        temperature,
        top_p: topP,
        max_tokens: maxTokens,
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

  const data = await response.json()
  if (!data.choices?.[0]) {
    throw new Error('Unexpected response format')
  }

  return data.choices[0].message.content
}

export async function callProvider(provider, prompt, temperature, topP, maxTokens) {
  switch (provider) {
    case 'groq':
      return callGroq(prompt, temperature, topP, maxTokens)
    case 'gemini':
      return callGemini(prompt, temperature, topP, maxTokens)
    case 'openrouter':
      return callOpenRouter(prompt, temperature, topP, maxTokens)
    default:
      throw new Error(`Unknown provider: ${provider}`)
  }
}
