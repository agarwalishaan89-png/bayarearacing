// Builds a smooth wavy path across a doubled-width tile. Because the wave's
// angular frequency is an exact integer number of cycles per tile, the point
// at x=tileWidth always matches the point at x=0 — so animating the whole
// path left by exactly one tile width loops with no visible seam.
function buildFlowPath({
  tileWidth = 1200,
  baseline = 120,
  amplitude = 22,
  frequency = 2,
  phase = 0,
  harmonicMix = 0.3,
  harmonicMult = 2.6,
  points = 140,
}) {
  const totalWidth = tileWidth * 2
  const step = totalWidth / points
  let d = ''
  for (let i = 0; i <= points; i++) {
    const x = i * step
    const angle = (x / tileWidth) * Math.PI * 2 * frequency + phase
    const y =
      baseline +
      Math.sin(angle) * amplitude +
      Math.sin(angle * harmonicMult) * amplitude * harmonicMix
    d += i === 0 ? `M${x.toFixed(1)},${y.toFixed(1)}` : ` L${x.toFixed(1)},${y.toFixed(1)}`
  }
  return d
}

const LAYERS = [
  { baseline: 60, amplitude: 18, frequency: 2, phase: 0.4, opacity: 0.35, duration: 26, reverse: false, color: 'rgba(255,255,255,0.9)' },
  { baseline: 95, amplitude: 26, frequency: 3, phase: 1.8, opacity: 0.22, duration: 34, reverse: true, color: 'rgba(255,255,255,0.8)' },
  { baseline: 130, amplitude: 20, frequency: 2, phase: 3.1, opacity: 0.4, duration: 20, reverse: false, color: 'rgba(56,189,248,0.55)' },
  { baseline: 150, amplitude: 30, frequency: 4, phase: 0.9, opacity: 0.18, duration: 40, reverse: true, color: 'rgba(255,255,255,0.7)' },
  { baseline: 170, amplitude: 16, frequency: 3, phase: 4.2, opacity: 0.28, duration: 30, reverse: false, color: 'rgba(255,255,255,0.85)' },
]

export default function FlowingLines({ className = '' }) {
  return (
    <div className={`absolute overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 2400 200"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        {LAYERS.map((layer, i) => (
          <path
            key={i}
            d={buildFlowPath({ tileWidth: 1200, ...layer })}
            fill="none"
            stroke={layer.color}
            strokeWidth="1"
            style={{
              opacity: layer.opacity,
              animation: `${layer.reverse ? 'flowScrollRight' : 'flowScrollLeft'} ${layer.duration}s linear infinite`,
            }}
          />
        ))}
      </svg>
    </div>
  )
}
