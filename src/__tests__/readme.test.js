import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

const root = fileURLToPath(new URL('../..', import.meta.url))
const readmePath = join(root, 'README.md')

describe('S11.1 — README', () => {
  it('exists at the project root', () => {
    expect(existsSync(readmePath)).toBe(true)
  })

  it('no longer contains the default Vite template boilerplate', () => {
    const readme = readFileSync(readmePath, 'utf-8')
    expect(readme).not.toContain('This template provides a minimal setup')
  })

  it('has a project description naming its core features', () => {
    const readme = readFileSync(readmePath, 'utf-8').toLowerCase()
    const keywords = ['chat', 'tokeniser', 'tokenizer', 'compare', 'evaluate', 'groq', 'gemini', 'openrouter']
    const mentioned = keywords.filter((k) => readme.includes(k))
    expect(mentioned.length).toBeGreaterThanOrEqual(3)
  })

  it('has a "how to run locally" section with the exact commands', () => {
    const readme = readFileSync(readmePath, 'utf-8')
    expect(readme).toContain('git clone')
    expect(readme).toContain('npm install')
    expect(readme).toContain('npm run dev')
  })

  it('has an API key section naming all three providers and env vars', () => {
    const readme = readFileSync(readmePath, 'utf-8')
    for (const provider of ['Groq', 'Gemini', 'OpenRouter']) {
      expect(readme).toContain(provider)
    }
    for (const key of ['VITE_GROQ_API_KEY', 'VITE_GEMINI_API_KEY', 'VITE_OPENROUTER_API_KEY']) {
      expect(readme).toContain(key)
    }
  })

  it('contains the live Vercel URL', () => {
    const readme = readFileSync(readmePath, 'utf-8')
    expect(readme).toContain('https://llm-playground-two.vercel.app')
  })
})
