import { describe, it, expect } from 'vitest'
import { getTimeGreeting } from '../greeting'

describe('getTimeGreeting', () => {
  it('returns "Good morning" before noon', () => {
    expect(getTimeGreeting(new Date(2026, 0, 1, 9))).toBe('Good morning')
  })

  it('returns "Good afternoon" from noon to before 6pm', () => {
    expect(getTimeGreeting(new Date(2026, 0, 1, 14))).toBe('Good afternoon')
  })

  it('returns "Good evening" from 6pm onward', () => {
    expect(getTimeGreeting(new Date(2026, 0, 1, 20))).toBe('Good evening')
  })
})
