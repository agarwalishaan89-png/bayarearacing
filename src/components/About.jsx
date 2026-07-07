import { CheckCircle2 } from 'lucide-react'
import PhotoSlot from './PhotoSlot.jsx'
import Reveal from './Reveal.jsx'

const SPEC_ROWS = [
  { label: 'Build duration', value: '14 months' },
  { label: 'Technical inspection', value: 'Passed, first attempt' },
  { label: 'Category', value: 'Urban Concept' },
  { label: 'Powertrain', value: 'Gasoline' },
  { label: 'Chassis material', value: 'Carbon fiber composite' },
  { label: 'Distance to competition', value: '2,200+ miles' },
]

export default function About() {
  return (
    <section id="about" className="relative bg-navy py-24 md:py-32 overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-14 items-start">
        <Reveal>
          <div className="eyebrow text-sky text-xs mb-4">About the Team</div>
          <h2 className="font-display font-700 uppercase text-4xl md:text-5xl leading-tight mb-6">
            Built by students,<br />run like a race team
          </h2>
          <p className="text-slate leading-relaxed mb-4">
            Bay Area Racing began as a small group of students working out of a garage, driven by
            curiosity and a shared ambition to take on a real-world engineering challenge. Every
            component of our vehicle is conceptualized, designed, and built by students &mdash;
            nothing is assembled from a kit.
          </p>
          <p className="text-slate leading-relaxed mb-8">
            Across a 14-month build cycle, our team took the vehicle from a clean-sheet concept
            through fabrication, testing, and a first-attempt pass of full technical
            inspection &mdash; a stage where many experienced, collegiate-level teams fall short.
          </p>

          <div className="flex items-start gap-3 mb-3">
            <CheckCircle2 className="w-5 h-5 text-sky mt-0.5 shrink-0" />
            <p className="text-sm text-slate">
              Completed four official track runs without engine failure or breakdown.
            </p>
          </div>
          <div className="flex items-start gap-3 mb-3">
            <CheckCircle2 className="w-5 h-5 text-sky mt-0.5 shrink-0" />
            <p className="text-sm text-slate">
              Guided by advisor{' '}
              <a
                href="https://www.linkedin.com/in/niklas-j-890700125/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky underline hover:text-white transition-colors"
              >
                Nick Janetzky
              </a>
              , a former Mercedes-Benz automotive engineer and project leader.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-sky mt-0.5 shrink-0" />
            <p className="text-sm text-slate">
              Continuing to refine our gasoline powertrain for greater fuel efficiency each season.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150} className="hud-corners border border-white/10">
          <PhotoSlot
            src="/images/about-build.jpg"
            alt="Team working on the vehicle chassis"
            label="Build/garage photo"
            className="w-full h-64 md:h-72"
          />
          <div className="bg-ink/80 divide-y divide-white/10">
            {SPEC_ROWS.map((row) => (
              <div key={row.label} className="flex items-center justify-between px-6 py-3.5">
                <span className="eyebrow text-[11px] text-slate">{row.label}</span>
                <span className="font-display font-600 text-sm text-white text-right">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
