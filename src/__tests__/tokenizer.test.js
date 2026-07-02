import { describe, it, expect } from 'vitest'
import { tokenize, countTokens } from '../tokenizer.js'

describe('tokenize', () => {
  it('splits simple text into token objects that reconstruct the original', () => {
    const tokens = tokenize('hello world')
    expect(Array.isArray(tokens)).toBe(true)
    expect(tokens.length).toBeGreaterThan(0)
    for (const token of tokens) {
      expect(typeof token.id).toBe('number')
      expect(typeof token.text).toBe('string')
    }
    expect(tokens.map((t) => t.text).join('')).toBe('hello world')
  })

  it('returns an empty array for an empty string', () => {
    expect(tokenize('')).toEqual([])
  })

  it('round-trips unicode and emoji text exactly', () => {
    const input = 'héllo 👋 world'
    const tokens = tokenize(input)
    expect(tokens.map((t) => t.text).join('')).toBe(input)
  })

  it('throws a TypeError on non-string input', () => {
    expect(() => tokenize(null)).toThrow(TypeError)
    expect(() => tokenize(undefined)).toThrow(TypeError)
    expect(() => tokenize(42)).toThrow(TypeError)
  })
})

describe('countTokens', () => {
  it('matches the length of tokenize()', () => {
    expect(countTokens('hello world')).toBe(tokenize('hello world').length)
  })

  it('returns 0 for an empty string', () => {
    expect(countTokens('')).toBe(0)
  })

  it('throws a TypeError on non-string input', () => {
    expect(() => countTokens(null)).toThrow(TypeError)
  })
})
