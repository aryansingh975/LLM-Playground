import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Pin root to the OS-canonical path of this file (not process.cwd()) to avoid
// https://github.com/vitest-dev/vitest/issues/5251 — on Windows, a shell whose
// cwd resolves with a different drive-letter casing than Windows itself
// (e.g. Git Bash's `d:/...` vs `D:/...`) makes Vite's module-graph lookups
// miss, crashing with "Cannot read properties of undefined (reading 'config')".
const root = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  root,
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'node',
    globals: true,
  },
})
