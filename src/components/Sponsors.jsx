import PhotoSlot from './PhotoSlot.jsx'
import Reveal from './Reveal.jsx'
import StatCounter from './StatCounter.jsx'

const TIERS = [
  {
    name: 'Diamond',
    accent: 'border-sky/40',
    sponsors: [
      { name: 'Altair', logo: '/images/sponsor-altair.png' },
      { name: 'Rapid Harness', logo: '/images/sponsor-rapid-harness.png' },
      { name: 'QA Source', logo: '/images/sponsor-qa-source.png' },
    ],
  },
  {
    name: 'Platinum',
    accent: 'border-royal/60',
    sponsors: [
      { name: 'Gene Haas Foundation', logo: '/images/sponsor-gene-haas.png' },
      { name: 'Coastline', logo: '/images/sponsor-coastline.png' },
      { name: 'Formlabs', logo: '/images/sponsor-formlabs.png' },
      { name: 'Bystronic', logo: '/images/sponsor-bystronic.png' },
      { name: 'Bay Area Composites', logo: '/images/sponsor-bay-area-composites.png' },
      { name: 'Chabot-Las Positas Community College District', logo: '/images/sponsor-las-positas.png' },
    ],
  },
  {
    name: 'Gold',
    accent: 'border-white/30',
    sponsors: [
      { name: 'Hakko', logo: '/images/sponsor-hakko.png' },
      { name: 'Wilwood Brakes', logo: '/images/sponsor-wilwood.png' },
    ],
  },
]

export default function Sponsors() {
  return (
    <section id="sponsors" className="relative bg-navy py-24 md:py-32 overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <div>
              <div className="eyebrow text-sky text-xs mb-4">Our Partners</div>
              <h2 className="font-display font-700 uppercase text-4xl md:text-5xl leading-tight">
                Sponsors that <br className="hidden md:block" />
                power the build
              </h2>
            </div>
            <div className="hud-corners border border-white/10 bg-ink/60 px-6 py-4">
              <div className="tabular font-display font-700 text-3xl text-sky">
                <StatCounter target={30000} prefix="$" suffix="+" commas duration={1600} />
              </div>
              <div className="eyebrow text-[10px] text-slate mt-1">Raised for the 2026&ndash;27 season</div>
            </div>
          </div>
        </Reveal>

        <div className="space-y-10">
          {TIERS.map((tier, tierIdx) => (
            <Reveal key={tier.name} delay={tierIdx * 100}>
              <div className="flex items-baseline gap-3 mb-4">
                <h3 className="font-display font-700 uppercase text-lg text-white">{tier.name}</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {tier.sponsors.map((s) => (
                  <div
                    key={s.name}
                    className={`hud-corners flex items-center justify-center bg-white h-20 px-4 py-3 overflow-hidden border ${tier.accent}`}
                  >
                    <PhotoSlot
                      src={s.logo}
                      alt={`${s.name} logo`}
                      label={`${s.name} logo`}
                      className="max-w-full max-h-full"
                      fit="contain"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <a
            href="#support"
            className="inline-block mt-14 eyebrow text-xs px-6 py-3 border border-sky text-sky hover:bg-sky hover:text-ink transition-colors panel-cut"
          >
            Become a Sponsor
          </a>
        </Reveal>
      </div>
    </section>
  )
}
