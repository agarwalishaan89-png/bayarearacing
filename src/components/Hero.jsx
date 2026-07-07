import { useRef, useState } from 'react'
import { ArrowRight, Gauge } from 'lucide-react'
import PhotoSlot from './PhotoSlot.jsx'
import StatCounter from './StatCounter.jsx'

const STATS = [
  { target: 143, suffix: '', unit: 'MPG', label: 'Peak Efficiency Achieved' },
  { target: 8, suffix: 'th', unit: 'PLACE', label: 'Globally at Indianapolis' },
  { target: 15, suffix: '+', unit: 'PARTNERS', label: 'Corporate Sponsors' },
]

export default function Hero() {
  const sectionRef = useRef(null)
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, active: false })

  const handleMouseMove = (e) => {
    const el = sectionRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      active: true,
    })
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setSpotlight((s) => ({ ...s, active: false }))}
      className="relative min-h-screen flex items-end overflow-hidden bg-ink"
    >
      <PhotoSlot
        src="/images/hero-track.jpg"
        alt="Bay Area Racing vehicle on track"
        label="Hero background — track/vehicle shot"
        className="absolute inset-0 w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-transparent to-transparent" />

      {/* Animated scanning grid backdrop */}

      {/* Mouse-reactive spotlight glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: spotlight.active ? 1 : 0,
          background: `radial-gradient(500px circle at ${spotlight.x}% ${spotlight.y}%, rgba(56,189,248,0.16), transparent 60%)`,
        }}
        aria-hidden="true"
      />

      <div
        className="stripe-sweep absolute top-0 left-0 h-full w-[45%] bg-gradient-to-b from-royal/40 to-sky/10 origin-top-left"
        style={{ transform: 'skewX(-12deg) translateX(-30%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 pb-16 md:pb-20 pt-32">
        <div className="rise-in eyebrow text-sky text-xs flex items-center gap-2 mb-5" style={{ animationDelay: '0.1s' }}>
          <Gauge className="w-4 h-4" />
          Shell Eco-marathon &middot; Urban Concept
        </div>

        <h1
          className="rise-in font-display font-700 uppercase leading-[0.95] text-5xl md:text-7xl lg:text-8xl max-w-4xl"
          style={{ animationDelay: '0.2s' }}
        >
          Engineering the <span className="text-sky">Future</span> of Clean Mobility
        </h1>

        <p
          className="rise-in text-slate text-base md:text-lg max-w-xl mt-6"
          style={{ animationDelay: '0.35s' }}
        >
          A student-led engineering team based in Pleasanton, California, designing and building
          ultra energy-efficient vehicles to compete at the Shell Eco-marathon.
        </p>

        <a
          href="#support"
          className="rise-in inline-flex items-center gap-2 mt-8 px-7 py-3.5 bg-sky text-ink font-display font-700 uppercase text-sm tracking-wide panel-cut hover:bg-white transition-colors"
          style={{ animationDelay: '0.45s' }}
        >
          Sponsor Us
          <ArrowRight className="w-4 h-4" />
        </a>

        <div
          className="rise-in grid grid-cols-3 gap-px mt-14 max-w-3xl border border-white/10 bg-white/5"
          style={{ animationDelay: '0.55s' }}
        >
          {STATS.map((s) => (
            <div key={s.label} className="bg-ink/70 px-4 md:px-6 py-5">
              <div className="flex items-baseline gap-1.5">
                <span className="tabular font-display font-700 text-3xl md:text-4xl text-white">
                  <StatCounter target={s.target} suffix={s.suffix} />
                </span>
                <span className="eyebrow text-sky text-[10px]">{s.unit}</span>
              </div>
              <div className="text-slate text-xs mt-1.5 leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
