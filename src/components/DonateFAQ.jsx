import { useState } from 'react'
import { ShieldCheck, ChevronDown, Mail, Wrench, Handshake } from 'lucide-react'
import Reveal from './Reveal.jsx'

const FAQS = [
  {
    q: 'Is my donation tax-deductible?',
    a: 'Yes. Bay Area Racing is a 501(c)(3) nonprofit organization affiliated with Foothill High School. All donations are tax-deductible.',
  },
  {
    q: 'What does my sponsorship fund?',
    a: 'Sponsorships fund materials and fabrication (carbon fiber, structural metals, engine components), logistics to transport the car and team over 2,000+ miles to competition, and hardware and equipment used in testing. More information can be found in our sponsor packet which we will gladly send over.',
  },
  {
    q: 'Can we sponsor with materials or services instead of cash?',
    a: 'Yes. We welcome donations of tools and materials (metals, composites, bearings, fabrication equipment) as well as technical services like machining, welding, CFD analysis, and engineering consultation.',
  },
  {
    q: 'What do sponsors receive in return?',
    a: 'Every tier includes logo placement and recognition; higher tiers add vehicle decals, featured social media highlights, marketing material inclusion, and a 3D-printed model of the vehicle on request.',
  },
  {
    q: 'How do I get in touch?',
    a: 'Email us at bayarearacingteam@gmail.com or reach out on Instagram @bayarea.racing. We\u2019d love to talk through a partnership that fits your goals.',
  },
]

const WAYS = [
  { icon: Handshake, title: 'Financial contribution', desc: 'Checks preferred \u2014 gives us the flexibility to fund materials, travel, or miscellaneous parts.' },
  { icon: Wrench, title: 'Tools & materials', desc: 'Metals, composites, bearings, and fabrication tools go directly into the build.' },
  { icon: Mail, title: 'Technical services', desc: 'Machining, welding, CFD analysis, or engineering consultation from your team.' },
]

export default function DonateFAQ() {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <section id="support" className="relative bg-navy py-24 md:py-32 overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-16">
        <Reveal>
          <div className="eyebrow text-sky text-xs mb-4">Support the Team</div>
          <h2 className="font-display font-700 uppercase text-4xl md:text-5xl leading-tight mb-6">
            Fuel the next season
          </h2>
          <p className="text-slate leading-relaxed mb-8 max-w-md">
            We&rsquo;re raising $35,000 for the 2026&ndash;27 season, funding a transition to
            smoother bearings and a redesigned, more aerodynamic chassis.
          </p>

          <div className="hud-corners border border-white/10 bg-ink/60 p-6 mb-8">
            <div className="flex items-center gap-2 mb-4 text-sky">
              <ShieldCheck className="w-5 h-5" />
              <span className="eyebrow text-[11px]">501(c)(3) Verified Nonprofit</span>
            </div>
            <p className="text-sm text-white/80 mb-5">
              Every contribution is tax-deductible and goes directly toward the vehicle and team.
            </p>
            <a
              href="mailto:bayarearacingteam@gmail.com?subject=Sponsorship%20Inquiry"
              className="block text-center eyebrow text-xs px-6 py-3.5 bg-sky text-ink font-semibold hover:bg-white transition-colors panel-cut"
            >
              Start a Sponsorship
            </a>
          </div>

          <div className="space-y-4">
            {WAYS.map((w) => (
              <div key={w.title} className="flex items-start gap-3">
                <w.icon className="w-5 h-5 text-sky mt-0.5 shrink-0" />
                <div>
                  <div className="font-display font-600 text-sm text-white">{w.title}</div>
                  <div className="text-xs text-slate mt-0.5">{w.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="eyebrow text-sky text-xs mb-4">FAQ</div>
          <h3 className="font-display font-700 uppercase text-2xl mb-6">Common questions</h3>
          <div className="border-t border-white/10">
            {FAQS.map((item, idx) => {
              const isOpen = openIdx === idx
              return (
                <div key={item.q} className="border-b border-white/10">
                  <button
                    onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-display font-600 text-base text-white">{item.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-sky shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all ${
                      isOpen ? 'max-h-48 pb-5' : 'max-h-0'
                    }`}
                  >
                    <p className="text-sm text-slate leading-relaxed pr-8">{item.a}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
