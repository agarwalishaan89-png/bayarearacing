import { Instagram, Youtube, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <div className="font-display font-700 text-lg tracking-wide">
            BAY AREA <span className="text-sky">RACING</span>
          </div>
          <p className="text-slate text-xs mt-2 max-w-xs">
            A 501(c)(3) nonprofit affiliated with Foothill High School. All donations are
            tax-deductible.
          </p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href="https://www.instagram.com/bayarea.racing/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate hover:text-sky transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://www.youtube.com/@FoothillRacing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate hover:text-sky transition-colors"
            aria-label="YouTube"
          >
            <Youtube className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate hover:text-sky transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:bayarearacingteam@gmail.com"
            className="text-slate hover:text-sky transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        <div className="eyebrow text-[10px] text-slate/60">
          &copy; {new Date().getFullYear()} Bay Area Racing
        </div>
      </div>
    </footer>
  )
}
