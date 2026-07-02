import { describe, it, expect, beforeAll } from 'vitest'
import { execSync } from 'node:child_process'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

const root = fileURLToPath(new URL('../..', import.meta.url))
const distDir = join(root, 'dist')
const assetsDir = join(distDir, 'assets')
const PLACEHOLDER_KEY = 'llm-playground-test-placeholder-89f3'

describe('S10.1 — Production Build', () => {
  beforeAll(() => {
    execSync('npm run build', {
      cwd: root,
      env: { ...process.env, VITE_GROQ_API_KEY: PLACEHOLDER_KEY },
      stdio: 'pipe',
    })
  }, 60000)

  it('produces dist/index.html and hashed JS/CSS assets', () => {
    expect(existsSync(join(distDir, 'index.html'))).toBe(true)
    const assetFiles = readdirSync(assetsDir)
    expect(assetFiles.some((f) => f.endsWith('.js'))).toBe(true)
    expect(assetFiles.some((f) => f.endsWith('.css'))).toBe(true)
  })

  it('inlines VITE_GROQ_API_KEY into the built bundle', () => {
    const jsFiles = readdirSync(assetsDir).filter((f) => f.endsWith('.js'))
    const found = jsFiles.some((f) =>
      readFileSync(join(assetsDir, f), 'utf-8').includes(PLACEHOLDER_KEY)
    )
    expect(found).toBe(true)
  })
})

describe('S10.1 — dist stays out of git', () => {
  it('.gitignore lists dist', () => {
    const gitignore = readFileSync(join(root, '.gitignore'), 'utf-8')
    expect(/^dist$/m.test(gitignore)).toBe(true)
  })
})
