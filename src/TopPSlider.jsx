export default function TopPSlider({ value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="top-p-slider" className="text-sm text-gray-600">
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
    </div>
  )
}
