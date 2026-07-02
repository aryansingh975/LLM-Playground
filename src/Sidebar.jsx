import { useState } from 'react'

export default function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        className="md:hidden p-2 border-b bg-gray-50 text-left"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Hide controls' : 'Show controls'}
        onClick={() => setIsOpen(open => !open)}
      >
        ☰ Controls
      </button>
      <aside
        className={`w-64 shrink-0 border-r bg-gray-50 p-4 ${isOpen ? 'flex' : 'hidden'} md:flex flex-col gap-4`}
      >
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Controls</h2>
        {children}
      </aside>
    </>
  )
}
