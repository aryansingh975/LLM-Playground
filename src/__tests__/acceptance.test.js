import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

const root = fileURLToPath(new URL('../..', import.meta.url))
const roadmapPath = join(root, 'roadmap.md')
const readmePath = join(root, 'README.md')
const screenshotFiles = ['chat.png', 'learn.png', 'compare.png', 'evaluate.png']

function parseMasterSpecIndex(markdown) {
  const lines = markdown.split('\n')
  const startIdx = lines.findIndex((l) => l.trim() === '## Master Spec Index')
  const rows = []
  for (let i = startIdx + 1; i < lines.length; i++) {
    const line = lines[i]
    const match = line.match(/^\|\s*(S\d+\.\d+)\s*\|.*\|\s*([a-z-]+)\s*\|\s*$/)
    if (match) rows.push({ spec: match[1], status: match[2] })
  }
  return rows
}

describe('S11.3 — Final Acceptance Checklist', () => {
  it('every spec in the Master Spec Index is done, except S11.3 itself', () => {
    const roadmap = readFileSync(roadmapPath, 'utf-8')
    const rows = parseMasterSpecIndex(roadmap)
    expect(rows.length).toBeGreaterThan(0)
    const notDone = rows.filter((r) => r.spec !== 'S11.3' && r.status !== 'done')
    expect(notDone).toEqual([])
  })

  it('has a screenshot for each of the 4 routes', () => {
    for (const file of screenshotFiles) {
      expect(existsSync(join(root, 'docs', 'screenshots', file))).toBe(true)
    }
  })

  it('embeds all 4 screenshots in README.md', () => {
    const readme = readFileSync(readmePath, 'utf-8')
    for (const file of screenshotFiles) {
      expect(readme).toContain(`docs/screenshots/${file}`)
    }
  })
})
