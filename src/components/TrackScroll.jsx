import { useEffect, useRef, useState } from 'react'
import { Flame, Wind, Gauge } from 'lucide-react'

// Stylized closed-loop circuit shape — evocative of an infield road course
// (front straight, hairpin, technical infield esses, back stretch) rather
// than a literal survey of Indianapolis Motor Speedway's actual geometry.
const TRACK_D =
  'M 80,410 L 560,410 C 650,410 700,385 700,320 L 700,230 ' +
  'C 700,170 655,150 590,150 L 470,150 C 425,150 400,128 400,95 ' +
  'C 400,60 428,38 468,38 L 575,38 C 635,38 668,68 668,112 ' +
  'C 668,152 638,175 595,175 L 300,175 C 215,175 150,228 150,300 ' +
  'L 150,325 C 150,372 118,410 80,410 Z'

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
  const [point, setPoint] = useState({ x: 80, y: 410 })
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
            <svg viewBox="0 0 800 460" className="w-full h-auto">
              <path
                ref={pathRef}
                d={TRACK_D}
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="6"
              />
              {pathLength > 0 && (
                <path
                  d={TRACK_D}
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={pathLength}
                  strokeDashoffset={pathLength * (1 - progress)}
                  style={{ transition: 'stroke-dashoffset 60ms linear' }}
                />
              )}
              <circle
                cx={point.x}
                cy={point.y}
                r="11"
                fill="#38BDF8"
                stroke="#05070F"
                strokeWidth="3"
              />
            </svg>
            <div className="eyebrow text-[10px] text-slate/60 text-center mt-2">
              2.439-MI INFIELD ROAD COURSE &middot; STYLIZED, NOT TO SCALE
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
