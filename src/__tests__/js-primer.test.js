import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  doubleAll,
  keepEvens,
  sumAll,
  greet,
  getFullName,
  fetchFirstTitle,
} from '../js-primer.js'

// ─── Pattern 1 & 2: const/let + Arrow Functions ───────────────────────────────
describe('2 - arrow functions: doubleAll', () => {
  it('doubles every number in an array', () => {
    expect(doubleAll([1, 2, 3])).toEqual([2, 4, 6])
  })

  it('returns empty array for empty input', () => {
    expect(doubleAll([])).toEqual([])
  })
})

// ─── Pattern 4a: .filter() ───────────────────────────────────────────────────
describe('4a - array filter: keepEvens', () => {
  it('keeps only even numbers', () => {
    expect(keepEvens([1, 2, 3, 4, 5])).toEqual([2, 4])
  })

  it('returns empty array when no evens', () => {
    expect(keepEvens([1, 3, 5])).toEqual([])
  })
})

// ─── Pattern 4b: .reduce() ───────────────────────────────────────────────────
describe('4b - array reduce: sumAll', () => {
  it('sums all numbers in an array', () => {
    expect(sumAll([1, 2, 3, 4])).toBe(10)
  })

  it('returns 0 for empty array', () => {
    expect(sumAll([])).toBe(0)
  })
})

// ─── Pattern 3: Template Literals ────────────────────────────────────────────
describe('3 - template literals: greet', () => {
  it('returns a greeting with the given name', () => {
    expect(greet('Aryan')).toBe('Hello, Aryan!')
  })
})

// ─── Pattern 5: Destructuring ────────────────────────────────────────────────
describe('5 - destructuring: getFullName', () => {
  it('combines first and last name from an object', () => {
    expect(getFullName({ first: 'Ada', last: 'Lovelace' })).toBe('Ada Lovelace')
  })
})

// ─── Pattern 6: Async/Await + fetch ──────────────────────────────────────────
describe('6 - async/await + fetch: fetchFirstTitle', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('fetches JSON and returns the first item title', async () => {
    const mockData = [{ title: 'Learn JavaScript' }, { title: 'Learn React' }]
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockData),
    })

    const title = await fetchFirstTitle('https://fake-api.test/items')
    expect(title).toBe('Learn JavaScript')
    expect(fetch).toHaveBeenCalledWith('https://fake-api.test/items')
  })
})
