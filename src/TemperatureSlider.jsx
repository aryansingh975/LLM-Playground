export default function TemperatureSlider({ value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="temperature-slider" className="text-sm text-gray-600">
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
    </div>
  )
}
