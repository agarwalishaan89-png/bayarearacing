import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import PhotoSlot from './PhotoSlot.jsx'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#team', label: 'Team' },
  { href: '#sponsors', label: 'Sponsors' },
  { href: '#media', label: 'Media' },
  { href: '#support', label: 'Support' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-ink/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <PhotoSlot
            src="/images/logo.png"
            alt="Bay Area Racing logo"
            label="Logo"
            className="w-8 h-8"
          />
          <span className="font-display font-700 text-lg tracking-wide">
            BAY AREA <span className="text-sky">RACING</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-slate hover:text-white transition-colors eyebrow tracking-widest text-[11px]"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#support"
            className="eyebrow text-[11px] px-4 py-2 bg-sky text-ink font-semibold hover:bg-white transition-colors panel-cut"
          >
            Sponsor Us
          </a>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-ink border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-slate hover:text-white eyebrow text-xs tracking-widest"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#support"
            onClick={() => setOpen(false)}
            className="eyebrow text-xs px-4 py-2.5 bg-sky text-ink font-semibold text-center panel-cut"
          >
            Sponsor Us
          </a>
        </div>
      )}
    </header>
  )
}
