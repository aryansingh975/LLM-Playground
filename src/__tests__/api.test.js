import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { callGroq, callGemini, callOpenRouter, callProvider } from '../api'

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

function mockFetchOk(content = 'Hello from AI') {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: vi.fn().mockResolvedValue({
      choices: [{ message: { content } }],
    }),
  })
}

describe('S2.2 — callGroq', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_GROQ_API_KEY', 'test-key')
    mockFetchOk()
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('callGroq_posts_to_correct_url', async () => {
    await callGroq('hello')
    expect(fetch).toHaveBeenCalledWith(GROQ_URL, expect.anything())
  })

  it('callGroq_sends_authorization_header', async () => {
    await callGroq('hello')
    const [, options] = fetch.mock.calls[0]
    expect(options.headers['Authorization']).toBe('Bearer test-key')
  })

  it('callGroq_returns_reply_text', async () => {
    mockFetchOk('AI says hi')
    const reply = await callGroq('hello')
    expect(reply).toBe('AI says hi')
  })

  it('callGroq_throws_on_missing_key', async () => {
    vi.stubEnv('VITE_GROQ_API_KEY', '')
    await expect(callGroq('hello')).rejects.toThrow('No API key')
  })

  it('callGroq_throws_on_non_ok_response', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 401 })
    await expect(callGroq('hello')).rejects.toThrow('Groq error')
  })
})

describe('S2.3 — Error Classification', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('callGroq_throws_no_api_key_message', async () => {
    vi.stubEnv('VITE_GROQ_API_KEY', undefined)
    await expect(callGroq('hello')).rejects.toThrow('No API key')
  })

  it('callGroq_throws_no_api_key_on_empty_string', async () => {
    vi.stubEnv('VITE_GROQ_API_KEY', '')
    await expect(callGroq('hello')).rejects.toThrow('No API key')
  })

  it('callGroq_throws_rate_limit_message', async () => {
    vi.stubEnv('VITE_GROQ_API_KEY', 'test-key')
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 429 })
    await expect(callGroq('hello')).rejects.toThrow('Rate limit')
  })

  it('callGroq_throws_no_internet_message', async () => {
    vi.stubEnv('VITE_GROQ_API_KEY', 'test-key')
    global.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'))
    await expect(callGroq('hello')).rejects.toThrow('No internet')
  })

  it('callGroq_throws_groq_error_on_other_status', async () => {
    vi.stubEnv('VITE_GROQ_API_KEY', 'test-key')
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 500 })
    await expect(callGroq('hello')).rejects.toThrow('Groq error')
  })
})

describe('S4.2 — Temperature parameter', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_GROQ_API_KEY', 'test-key')
    mockFetchOk()
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('callGroq_sends_temperature_in_body', async () => {
    await callGroq('hello', 0.5)
    const [, options] = fetch.mock.calls[0]
    expect(JSON.parse(options.body).temperature).toBe(0.5)
  })

  it('callGroq_defaults_temperature_to_one', async () => {
    await callGroq('hello')
    const [, options] = fetch.mock.calls[0]
    expect(JSON.parse(options.body).temperature).toBe(1)
  })
})

describe('S4.3 — Top-p parameter', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_GROQ_API_KEY', 'test-key')
    mockFetchOk()
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('callGroq_sends_top_p_in_body', async () => {
    await callGroq('hello', 1, 0.5)
    const [, options] = fetch.mock.calls[0]
    expect(JSON.parse(options.body).top_p).toBe(0.5)
  })

  it('callGroq_defaults_top_p_to_one', async () => {
    await callGroq('hello')
    const [, options] = fetch.mock.calls[0]
    expect(JSON.parse(options.body).top_p).toBe(1)
  })
})

describe('S4.4 — Max tokens parameter', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_GROQ_API_KEY', 'test-key')
    mockFetchOk()
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('callGroq_sends_max_tokens_in_body', async () => {
    await callGroq('hello', 1, 1, 256)
    const [, options] = fetch.mock.calls[0]
    expect(JSON.parse(options.body).max_tokens).toBe(256)
  })

  it('callGroq_defaults_max_tokens', async () => {
    await callGroq('hello')
    const [, options] = fetch.mock.calls[0]
    expect(JSON.parse(options.body).max_tokens).toBe(1024)
  })
})

describe('S4.5 — callGemini', () => {
  function mockGeminiOk(text = 'Hello from Gemini') {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ candidates: [{ content: { parts: [{ text }] } }] }),
    })
  }

  beforeEach(() => {
    vi.stubEnv('VITE_GEMINI_API_KEY', 'test-key')
    mockGeminiOk()
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('callGemini_posts_to_correct_url_with_key', async () => {
    await callGemini('hello')
    const [url] = fetch.mock.calls[0]
    expect(url).toContain('generativelanguage.googleapis.com')
    expect(url).toContain('key=test-key')
  })

  it('callGemini_sends_correct_body_shape', async () => {
    await callGemini('hello', 0.5, 0.5, 1024)
    const [, options] = fetch.mock.calls[0]
    const body = JSON.parse(options.body)
    expect(body.contents[0].parts[0].text).toBe('hello')
    expect(body.generationConfig).toEqual({ temperature: 0.5, topP: 0.5, maxOutputTokens: 1024 })
  })

  it('callGemini_returns_reply_text', async () => {
    mockGeminiOk('Gemini says hi')
    const reply = await callGemini('hello')
    expect(reply).toBe('Gemini says hi')
  })

  it('callGemini_throws_on_missing_key', async () => {
    vi.stubEnv('VITE_GEMINI_API_KEY', '')
    await expect(callGemini('hello')).rejects.toThrow('No API key')
  })

  it('callGemini_throws_rate_limit_message', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 429 })
    await expect(callGemini('hello')).rejects.toThrow('Rate limit')
  })

  it('callGemini_throws_no_internet_message', async () => {
    global.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'))
    await expect(callGemini('hello')).rejects.toThrow('No internet')
  })

  it('callGemini_throws_on_unexpected_format', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: vi.fn().mockResolvedValue({}) })
    await expect(callGemini('hello')).rejects.toThrow('Unexpected response format')
  })
})

describe('S4.5 — callOpenRouter', () => {
  function mockOpenRouterOk(content = 'Hello from OpenRouter') {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ choices: [{ message: { content } }] }),
    })
  }

  beforeEach(() => {
    vi.stubEnv('VITE_OPENROUTER_API_KEY', 'test-key')
    mockOpenRouterOk()
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('callOpenRouter_posts_to_correct_url', async () => {
    await callOpenRouter('hello')
    expect(fetch).toHaveBeenCalledWith(OPENROUTER_URL, expect.anything())
  })

  it('callOpenRouter_sends_authorization_header', async () => {
    await callOpenRouter('hello')
    const [, options] = fetch.mock.calls[0]
    expect(options.headers['Authorization']).toBe('Bearer test-key')
  })

  it('callOpenRouter_sends_openai_compatible_body', async () => {
    await callOpenRouter('hello', 0.5, 0.5, 256)
    const [, options] = fetch.mock.calls[0]
    const body = JSON.parse(options.body)
    expect(body.temperature).toBe(0.5)
    expect(body.top_p).toBe(0.5)
    expect(body.max_tokens).toBe(256)
  })

  it('callOpenRouter_returns_reply_text', async () => {
    mockOpenRouterOk('OpenRouter says hi')
    const reply = await callOpenRouter('hello')
    expect(reply).toBe('OpenRouter says hi')
  })

  it('callOpenRouter_throws_on_missing_key', async () => {
    vi.stubEnv('VITE_OPENROUTER_API_KEY', '')
    await expect(callOpenRouter('hello')).rejects.toThrow('No API key')
  })

  it('callOpenRouter_throws_rate_limit_message', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 429 })
    await expect(callOpenRouter('hello')).rejects.toThrow('Rate limit')
  })

  it('callOpenRouter_throws_no_internet_message', async () => {
    global.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'))
    await expect(callOpenRouter('hello')).rejects.toThrow('No internet')
  })

  it('callOpenRouter_throws_on_unexpected_format', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, json: vi.fn().mockResolvedValue({}) })
    await expect(callOpenRouter('hello')).rejects.toThrow('Unexpected response format')
  })
})

describe('S4.5 — callProvider dispatcher', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_GROQ_API_KEY', 'test-key')
    vi.stubEnv('VITE_GEMINI_API_KEY', 'test-key')
    vi.stubEnv('VITE_OPENROUTER_API_KEY', 'test-key')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('callProvider_delegates_to_groq', async () => {
    mockFetchOk('groq reply')
    await callProvider('groq', 'hi', 1, 1, 1024)
    expect(fetch).toHaveBeenCalledWith(GROQ_URL, expect.anything())
  })

  it('callProvider_delegates_to_gemini', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ candidates: [{ content: { parts: [{ text: 'gemini reply' }] } }] }),
    })
    await callProvider('gemini', 'hi', 1, 1, 1024)
    const [url] = fetch.mock.calls[0]
    expect(url).toContain('generativelanguage.googleapis.com')
  })

  it('callProvider_delegates_to_openrouter', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ choices: [{ message: { content: 'or reply' } }] }),
    })
    await callProvider('openrouter', 'hi', 1, 1, 1024)
    expect(fetch).toHaveBeenCalledWith(OPENROUTER_URL, expect.anything())
  })

  it('callProvider_throws_on_unknown_provider', async () => {
    await expect(callProvider('bogus', 'hi')).rejects.toThrow('Unknown provider: bogus')
  })
})
