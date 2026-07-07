// Builds a smooth wavy path across a doubled-width tile. Because the wave's
// angular frequency is an exact integer number of cycles per tile, the point
// at x=tileWidth always matches the point at x=0 — so animating the whole
// path left by exactly one tile width loops with no visible seam.
function buildFlowPath({
  tileWidth,
  baseline,
  amplitude,
  frequency,
  phase,
  harmonicMix,
  harmonicMult,
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

// Deterministic pseudo-random so the pattern is stable across re-renders
// within a single page load, without needing React state.
function mulberry32(seed) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function generateLines(count, seed = 7) {
  const rand = mulberry32(seed)
  const lines = []
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1)
    lines.push({
      baseline: 6 + t * 188 + (rand() - 0.5) * 10,
      amplitude: 8 + rand() * 24,
      frequency: 1 + Math.floor(rand() * 3), // integer -> seamless loop
      phase: rand() * Math.PI * 2,
      harmonicMix: 0.1 + rand() * 0.25,
      harmonicMult: 2 + rand() * 1.6,
      opacity: 0.06 + rand() * 0.16,
      duration: 22 + rand() * 34,
      reverse: rand() > 0.5,
      color: rand() > 0.88 ? 'rgba(56,189,248,0.7)' : 'rgba(255,255,255,0.9)',
    })
  }
  return lines
}

const LINES = generateLines(28)

export default function FlowingLines({ className = '' }) {
  return (
    <div className={`absolute overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 2400 200" preserveAspectRatio="none" className="w-full h-full">
        {LINES.map((layer, i) => (
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
