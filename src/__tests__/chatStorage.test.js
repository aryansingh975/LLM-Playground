// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { loadMessages, saveMessages } from '../chatStorage'

const STORAGE_KEY = 'llm-playground:chat-history'

describe('chatStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('loadMessages returns an empty array when nothing is stored', () => {
    expect(loadMessages()).toEqual([])
  })

  it('saveMessages then loadMessages round-trips the conversation', () => {
    const messages = [
      { role: 'user', text: 'hello' },
      { role: 'assistant', text: 'hi there' },
    ]
    saveMessages(messages)
    expect(loadMessages()).toEqual(messages)
  })

  it('loadMessages returns an empty array for corrupted JSON instead of throwing', () => {
    localStorage.setItem(STORAGE_KEY, 'not valid json{{{')
    expect(loadMessages()).toEqual([])
  })

  it('loadMessages returns an empty array if the stored value is not an array', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ not: 'an array' }))
    expect(loadMessages()).toEqual([])
  })

  it('saveMessages does not throw when localStorage.setItem fails', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota exceeded')
    })
    expect(() => saveMessages([{ role: 'user', text: 'hi' }])).not.toThrow()
    spy.mockRestore()
  })
})
