export default function ProviderPicker({ value, onChange, id = 'provider-picker', label = 'Provider' }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm text-gray-600 dark:text-gray-300">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white dark:bg-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded px-2 py-1"
      >
        <option value="groq">Groq</option>
        <option value="gemini">Gemini</option>
        <option value="openrouter">OpenRouter</option>
      </select>
    </div>
  )
}
