import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

const root = fileURLToPath(new URL('../..', import.meta.url))
const archPath = join(root, 'docs', 'architecture.md')
const readmePath = join(root, 'README.md')

describe('S11.2 — Architecture doc', () => {
  it('exists at docs/architecture.md', () => {
    expect(existsSync(archPath)).toBe(true)
  })

  it('contains a diagram naming User, Browser, and at least one AI provider', () => {
    const doc = readFileSync(archPath, 'utf-8')
    expect(doc).toMatch(/User/i)
    expect(doc).toMatch(/Browser/i)
    const providers = ['Groq', 'Gemini', 'OpenRouter']
    expect(providers.some((p) => doc.includes(p))).toBe(true)
  })

  it('states there is no backend server and that keys stay in the browser', () => {
    const doc = readFileSync(archPath, 'utf-8')
    expect(doc).toMatch(/no backend|no server/i)
    expect(doc).toMatch(/browser/i)
    expect(doc).toMatch(/key/i)
  })

  it('describes all 4 routes', () => {
    const doc = readFileSync(archPath, 'utf-8')
    for (const route of ['/chat', '/learn', '/compare', '/evaluate']) {
      expect(doc).toContain(route)
    }
  })

  it('is linked from README.md', () => {
    const readme = readFileSync(readmePath, 'utf-8')
    expect(readme).toContain('docs/architecture.md')
  })
})
