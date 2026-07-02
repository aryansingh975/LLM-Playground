import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

const root = process.cwd()
const envExample = join(root, '.env.example')
const gitignore = join(root, '.gitignore')

describe('S2.1 — API Key Config Files', () => {
  it('env_example_exists: .env.example exists at project root', () => {
    expect(existsSync(envExample)).toBe(true)
  })

  it('env_example_has_groq_key: .env.example contains VITE_GROQ_API_KEY=', () => {
    const content = readFileSync(envExample, 'utf8')
    expect(content).toContain('VITE_GROQ_API_KEY=')
  })

  it('env_example_has_gemini_key: .env.example contains VITE_GEMINI_API_KEY=', () => {
    const content = readFileSync(envExample, 'utf8')
    expect(content).toContain('VITE_GEMINI_API_KEY=')
  })

  it('env_example_has_openrouter_key: .env.example contains VITE_OPENROUTER_API_KEY=', () => {
    const content = readFileSync(envExample, 'utf8')
    expect(content).toContain('VITE_OPENROUTER_API_KEY=')
  })

  it('gitignore_allows_env_example: .gitignore contains !.env.example exception', () => {
    const content = readFileSync(gitignore, 'utf8')
    expect(content).toContain('!.env.example')
  })
})
