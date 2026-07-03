import { describe, it, expect } from 'vitest'
import { getTimeGreeting } from '../greeting'

describe('getTimeGreeting', () => {
  it('returns "Still awake?" from midnight to before 5am', () => {
    expect(getTimeGreeting(new Date(2026, 0, 1, 0))).toBe('Still awake?')
    expect(getTimeGreeting(new Date(2026, 0, 1, 4))).toBe('Still awake?')
  })

  it('returns "Good morning" from 5am to before noon', () => {
    expect(getTimeGreeting(new Date(2026, 0, 1, 5))).toBe('Good morning')
    expect(getTimeGreeting(new Date(2026, 0, 1, 9))).toBe('Good morning')
  })

  it('returns "Good afternoon" from noon to before 6pm', () => {
    expect(getTimeGreeting(new Date(2026, 0, 1, 14))).toBe('Good afternoon')
  })

  it('returns "Good evening" from 6pm onward', () => {
    expect(getTimeGreeting(new Date(2026, 0, 1, 20))).toBe('Good evening')
  })
})
