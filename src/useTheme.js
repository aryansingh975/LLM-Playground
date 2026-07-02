import { useState, useEffect, useCallback } from 'react'

const THEME_KEY = 'llm-playground:theme'

function systemPrefersDark() {
  return typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false
}

function readStoredTheme() {
  const stored = localStorage.getItem(THEME_KEY)
  return stored === 'light' || stored === 'dark' ? stored : null
}

function resolveInitialTheme() {
  return readStoredTheme() ?? (systemPrefersDark() ? 'dark' : 'light')
}

export default function useTheme() {
  const [theme, setTheme] = useState(resolveInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      // storage disabled/full — theme still applies for this session
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme(current => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggleTheme }
}
