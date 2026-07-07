import { useState } from 'react'
import { Camera } from 'lucide-react'

/**
 * Drop-in replaceable image slot.
 * Put a real file at /public + `src` (e.g. public/images/team-1.jpg) and it
 * will render automatically. Until then, it shows a labeled placeholder so
 * it's obvious exactly which file to add.
 */
export default function PhotoSlot({ src, alt, label, className = '', imgClassName = '', fit = 'cover' }) {
  const [failed, setFailed] = useState(false)
  const fitClass = fit === 'contain' ? 'object-contain' : 'object-cover'

  if (failed) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center gap-1 border border-dashed border-sky/40 bg-navy/60 text-center px-2 py-1 overflow-hidden ${className}`}
      >
        <Camera className="w-4 h-4 text-sky/70 shrink-0" strokeWidth={1.5} />
        <span className="eyebrow text-[8px] text-slate leading-tight">
          Replace image
        </span>
        {label && (
          <span className="text-[9px] text-slate/80 leading-tight truncate max-w-full">
            {label}
          </span>
        )}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={`${className} ${imgClassName} ${fitClass}`}
    />
  )
}
