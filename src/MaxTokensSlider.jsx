export default function MaxTokensSlider({ value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="max-tokens-slider" className="text-sm text-gray-600">
        Max tokens: {value}
      </label>
      <input
        id="max-tokens-slider"
        type="range"
        min="64"
        max="2048"
        step="64"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  )
}
