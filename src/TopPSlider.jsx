export default function TopPSlider({ value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="top-p-slider" className="text-sm text-gray-600 dark:text-gray-300">
        Top-p: {value}
      </label>
      <input
        id="top-p-slider"
        type="range"
        min="0.1"
        max="1"
        step="0.05"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <p className="text-xs text-gray-400 dark:text-gray-500">
        Lower = safer word choices. Higher (1.0) = considers all possible words.
      </p>
    </div>
  )
}
