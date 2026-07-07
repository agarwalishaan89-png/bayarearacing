// Ported from geodo.ai's BackgroundPaths technique: two mirrored sets of
// static bezier curves that converge toward a shared center point. Each
// path uses pathLength="1" + stroke-dasharray, and only the dash *offset*
// animates — the curve itself never moves. That's what creates the subtle
// "flowing" look rather than a wave sliding sideways.
function makePathSet(position) {
  const paths = []
  for (let i = 0; i < 36; i++) {
    const p = position
    const centerY = 158 + (i - 18) * 1.2
    const sway = 15 + (i % 5) * 3
    const d =
      `M-20 ${centerY}` +
      `C${120 - i * 2 * p} ${centerY - sway * p}` +
      ` ${280 - i * 2 * p} ${centerY + sway * p}` +
      ` 348 ${centerY}` +
      `C${416 + i * 2 * p} ${centerY - sway * p}` +
      ` ${576 + i * 2 * p} ${centerY + sway * p}` +
      ` 716 ${centerY}`
    paths.push({
      key: `${position}-${i}`,
      d,
      strokeWidth: 0.2 + i * 0.015,
      strokeOpacity: 0.12 + i * 0.03,
      duration: 8 + Math.random() * 6,
      delay: -Math.random() * 10,
    })
  }
  return paths
}

const ALL_PATHS = [...makePathSet(1), ...makePathSet(-1)]

export default function FlowingLines({ className = '' }) {
  return (
    <div className={`absolute overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        {ALL_PATHS.map((p) => (
          <path
            key={p.key}
            d={p.d}
            stroke="white"
            strokeWidth={p.strokeWidth}
            strokeOpacity={p.strokeOpacity}
            pathLength="1"
            style={{
              strokeDasharray: '0.3 0.7',
              animation: `flowPathDash ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </svg>
    </div>
  )
}
