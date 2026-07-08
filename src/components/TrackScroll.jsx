import { useEffect, useRef, useState } from 'react'
import { Flame, Wind, Gauge } from 'lucide-react'

// Traced from the official Indianapolis Motor Speedway infield road course
// diagram (14 turns). Straight segments with rounded joins, matching how
// IMS's own track maps are drawn — this is a best-effort reconstruction
// from the published layout, not surveyed GPS data.
const TRACK_D =
  'M700,520 L270,520 L205,495 L160,435 L90,335 L190,295 L250,285 ' +
  'L300,330 L340,270 L790,335 L775,200 L895,195 L835,55 L1045,120 ' +
  'L1090,295 L985,335 L1095,400 Z'

const TURNS = [
  { num: 1, x: 255, y: 517, dx: 0, dy: 34 },
  { num: 2, x: 200, y: 452, dx: -28, dy: 10 },
  { num: 3, x: 130, y: 432, dx: -34, dy: 0 },
  { num: 4, x: 62, y: 318, dx: -36, dy: -4 },
  { num: 5, x: 160, y: 292, dx: -6, dy: -28 },
  { num: 6, x: 222, y: 278, dx: 4, dy: -28 },
  { num: 7, x: 758, y: 340, dx: 0, dy: 32 },
  { num: 8, x: 735, y: 198, dx: -32, dy: 0 },
  { num: 9, x: 855, y: 198, dx: 32, dy: 0 },
  { num: 10, x: 785, y: 63, dx: -14, dy: -28 },
  { num: 11, x: 1015, y: 132, dx: 22, dy: -20 },
  { num: 12, x: 1055, y: 290, dx: 34, dy: 0 },
  { num: 13, x: 930, y: 338, dx: -6, dy: 28 },
  { num: 14, x: 1055, y: 405, dx: 34, dy: 10 },
]

const PHASES = [
  {
    range: [0, 0.34],
    icon: Flame,
    title: 'The Burn Phase',
    description:
      'Engine on, accelerating hard down the straight to build speed before the next shutdown.',
  },
  {
    range: [0.34, 0.67],
    icon: Wind,
    title: 'The Coast Phase',
    description:
      'Engine off. Momentum alone carries the car through the infield \u2014 the heart of burn-and-coast driving.',
  },
  {
    range: [0.67, 1.001],
    icon: Gauge,
    title: 'The Fuel Calculation Gate',
    description:
      'Checkpoint: measured fuel burn against distance covered, tuning the next lap\u2019s burn-and-coast ratio.',
  },
]

export default function TrackScroll() {
  const wrapperRef = useRef(null)
  const pathRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [point, setPoint] = useState({ x: 700, y: 520 })
  const [pathLength, setPathLength] = useState(0)

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength())
    }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const p = total > 0 ? Math.min(Math.max(scrolled / total, 0), 1) : 0
      setProgress(p)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const path = pathRef.current
    if (!path || !pathLength) return
    const pt = path.getPointAtLength(progress * pathLength)
    setPoint({ x: pt.x, y: pt.y })
  }, [progress, pathLength])

  const activePhase =
    PHASES.find((ph) => progress >= ph.range[0] && progress < ph.range[1]) ||
    PHASES[PHASES.length - 1]

  return (
    <section ref={wrapperRef} className="relative bg-ink" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="relative max-w-6xl mx-auto w-full px-6 md:px-10 grid md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-16 items-center">
          <div>
            <div className="eyebrow text-sky text-xs mb-4">Race Strategy</div>
            <h2 className="font-display font-700 uppercase text-3xl md:text-5xl leading-tight mb-4">
              2.439 Miles.
              <br />
              Every Watt Counts.
            </h2>
            <p className="text-slate text-sm md:text-base max-w-md mb-8">
              Our driving strategy on the Indianapolis Motor Speedway infield road course comes
              down to one technique: burn-and-coast. Scroll to follow one lap.
            </p>

            <div className="hud-corners border border-white/10 bg-navy/60 p-6 max-w-md min-h-[132px]">
              <div className="flex items-center gap-2 mb-2 text-sky">
                <activePhase.icon className="w-5 h-5" />
                <span className="eyebrow text-[11px]">{activePhase.title}</span>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">{activePhase.description}</p>
            </div>
          </div>

          <div className="relative">
            <svg viewBox="0 0 1150 600" className="w-full h-auto">
              <path
                ref={pathRef}
                d={TRACK_D}
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="12"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {pathLength > 0 && (
                <path
                  d={TRACK_D}
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="12"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeDasharray={pathLength}
                  strokeDashoffset={pathLength * (1 - progress)}
                  style={{ transition: 'stroke-dashoffset 60ms linear' }}
                />
              )}

              {/* Turn number markers */}
              {TURNS.map((t) => (
                <g key={t.num}>
                  <circle
                    cx={t.x + t.dx}
                    cy={t.y + t.dy}
                    r="15"
                    fill="#0B1638"
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="1.5"
                  />
                  <text
                    x={t.x + t.dx}
                    y={t.y + t.dy}
                    fill="rgba(255,255,255,0.75)"
                    fontSize="14"
                    fontFamily="'JetBrains Mono', monospace"
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    {t.num}
                  </text>
                </g>
              ))}

              {/* Start/finish marker */}
              <rect x="640" y="510" width="20" height="20" fill="white" opacity="0.6" />

              {/* Car marker */}
              <circle
                cx={point.x}
                cy={point.y}
                r="13"
                fill="#38BDF8"
                stroke="#05070F"
                strokeWidth="3"
              />
            </svg>
            <div className="eyebrow text-[10px] text-slate/60 text-center mt-2">
              2.439-MI INFIELD ROAD COURSE &middot; INDIANAPOLIS MOTOR SPEEDWAY
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
