import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

const root = fileURLToPath(new URL('../..', import.meta.url))

describe('S10.2 — vercel.json SPA rewrite', () => {
  it('exists and is valid JSON', () => {
    const raw = readFileSync(join(root, 'vercel.json'), 'utf-8')
    expect(() => JSON.parse(raw)).not.toThrow()
  })

  it('has a catch-all rewrite to /index.html', () => {
    const config = JSON.parse(readFileSync(join(root, 'vercel.json'), 'utf-8'))
    const hasCatchAll = config.rewrites?.some(
      (r) => r.destination === '/index.html' && r.source === '/(.*)'
    )
    expect(hasCatchAll).toBe(true)
  })
})
