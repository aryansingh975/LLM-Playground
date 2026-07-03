import { NavLink } from 'react-router-dom'
import useTheme from './useTheme'

function linkClassName({ isActive }) {
  return isActive ? 'font-bold underline' : 'text-blue-600'
}

function NavBar() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <nav className="flex gap-4 p-4 border-b items-center bg-white dark:bg-gray-900 dark:text-gray-100">
      <NavLink to="/chat" className={linkClassName}>
        Chat
      </NavLink>
      <NavLink to="/learn" className={linkClassName}>
        Learn
      </NavLink>
      <NavLink to="/compare" className={linkClassName}>
        Compare
      </NavLink>
      <NavLink to="/evaluate" className={linkClassName}>
        Evaluate
      </NavLink>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className="ml-auto flex items-center gap-1 text-sm"
      >
        <span aria-hidden="true">{isDark ? '☀️' : '🌙'}</span>
        {isDark ? 'Light mode' : 'Dark mode'}
      </button>
    </nav>
  )
}

export default NavBar
