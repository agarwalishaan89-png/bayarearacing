import { useEffect, useRef, useState } from 'react'
import { Flame, Wind, Gauge } from 'lucide-react'

// Traced from the official Indianapolis Motor Speedway infield road course
// diagram (14 turns). Straight segments with rounded joins, matching how
// IMS's own track maps are drawn — this is a best-effort reconstruction
// from the published layout, not surveyed GPS data.
const TRACK_D =
  'M754,518 ' +
  'L290,518 ' +
  'C260,518 235,514 218,500 ' +     // Turn 1
  'C205,490 205,480 210,472 ' +     // approach Turn 2
  'C215,466 200,464 190,460 ' +     // Turn 2
  'C160,450 130,455 122,446 ' +     // sweep to Turn 3
  'C95,420 90,380 90,341 ' +        // Turn 3 -> Turn 4 hairpin
  'C90,310 130,318 160,320 ' +      // Turn 4 -> approach Turn 5
  'C190,322 205,318 224,316 ' +     // Turn 5
  'C235,314 240,304 247,302 ' +     // Turn 6
  'L771,296 ' +                     // long straight to Turn 7
  'C790,296 787,280 787,260 ' +     // Turn 7 (pedestrian bridge kink)
  'L787,220 ' +
  'C787,205 780,198 787,196 ' +     // Turn 8
  'L810,196 ' +
  'C815,180 818,165 821,154 ' +     // up to Turn 9
  'C825,135 828,115 833,101 ' +     // Turn 9 -> Turn 10
  'C860,90 920,92 970,96 ' +        // Turn 10 sweep right
  'C1000,98 1015,100 1027,106 ' +   // Turn 11 apex
  'C1050,118 1064,150 1064,220 ' +  // down right side
  'L1064,300 ' +
  'C1064,320 1064,330 1064,334 ' +  // Turn 12
  'C1030,338 1005,338 995,338 ' +   // Turn 13
  'C985,340 985,350 990,360 ' +
  'C1000,390 1000,440 995,478 ' +   // sweep down to Turn 14
  'C993,495 970,505 940,510 ' +     // Turn 14 rounding
  'L754,518 ' +
  'Z'

const TURNS = [
  { num: 1, x: 218, y: 500, dx: 0, dy: 30 },
  { num: 2, x: 190, y: 460, dx: -25, dy: 10 },
  { num: 3, x: 122, y: 446, dx: -30, dy: 5 },
  { num: 4, x: 90, y: 341, dx: -32, dy: 0 },
  { num: 5, x: 224, y: 316, dx: -5, dy: -25 },
  { num: 6, x: 247, y: 302, dx: 10, dy: -25 },
  { num: 7, x: 787, y: 296, dx: 0, dy: 30 },
  { num: 8, x: 787, y: 196, dx: -28, dy: 0 },
  { num: 9, x: 821, y: 154, dx: 22, dy: -8 },
  { num: 10, x: 833, y: 101, dx: -10, dy: -25 },
  { num: 11, x: 1027, y: 106, dx: 20, dy: -20 },
  { num: 12, x: 1064, y: 334, dx: 30, dy: 0 },
  { num: 13, x: 995, y: 338, dx: -25, dy: 5 },
  { num: 14, x: 995, y: 478, dx: 25, dy: 15 },
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
  const [point, setPoint] = useState({ x: 754, y: 518 })
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
              Every Move Counts.
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
              <rect x="512" y="508" width="20" height="20" fill="white" opacity="0.6" />

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
