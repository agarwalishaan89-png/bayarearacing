import { Instagram } from 'lucide-react'
import PhotoSlot from './PhotoSlot.jsx'
import Reveal from './Reveal.jsx'
import FlowingLines from './FlowingLines.jsx'

const PHOTOS = [
  { src: '/images/track-1.jpg', label: 'Track photo 1' },
  { src: '/images/track-2.jpg', label: 'Track photo 2' },
  { src: '/images/track-3.jpg', label: 'Track photo 3' },
  { src: '/images/track-4.jpg', label: 'Track photo 4' },
  { src: '/images/track-5.jpg', label: 'Track photo 5' },
  { src: '/images/track-6.jpg', label: 'Track photo 6' },
]

export default function Media() {
  return (
    <section id="media" className="relative bg-ink py-24 md:py-32 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <div className="relative flex flex-wrap items-end justify-between gap-6 mb-12">
            <FlowingLines className="inset-x-0 -top-24 h-[420px]" />
            <div className="relative">
              <div className="eyebrow text-sky text-xs mb-4">Media</div>
              <h2 className="font-display font-700 uppercase text-4xl md:text-5xl leading-tight">
                From the garage <br className="hidden md:block" />
                to the track
              </h2>
            </div>
            <a
              href="https://www.instagram.com/bayarea.racing/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative eyebrow text-xs inline-flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 hover:border-sky/50 transition-colors"
            >
              <Instagram className="w-4 h-4 text-sky" />
              @bayarea.racing
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[160px] md:auto-rows-[220px]">
          {PHOTOS.map((p, i) => (
            <Reveal
              key={p.src}
              delay={i * 80}
              className={i === 0 ? 'col-span-2 row-span-2 md:col-span-2 md:row-span-2' : ''}
            >
              <a
                href="https://www.instagram.com/bayarea.racing/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden hud-corners block w-full h-full"
              >
                <PhotoSlot src={p.src} alt={p.label} label={p.label} className="w-full h-full" />
                <div className="absolute inset-0 bg-royal/0 group-hover:bg-royal/30 transition-colors flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
