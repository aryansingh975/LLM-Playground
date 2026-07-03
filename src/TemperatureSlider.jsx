export default function TemperatureSlider({ value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="temperature-slider" className="text-sm text-gray-600 dark:text-gray-300">
        Temperature: {value}
      </label>
      <input
        id="temperature-slider"
        type="range"
        min="0"
        max="2"
        step="0.1"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <p className="text-xs text-gray-400 dark:text-gray-500">
        Higher = more creative and varied. Lower = more focused and predictable.
      </p>
    </div>
  )
}
