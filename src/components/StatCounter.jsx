import { useEffect, useRef, useState } from 'react'

/**
 * Counts up from 0 to `target` once the element scrolls into view.
 * Renders `prefix` + the animated number (comma-formatted if `commas`) + `suffix`.
 */
export default function StatCounter({ target, prefix = '', suffix = '', commas = false, duration = 1200 }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          let raf
          let start
          const step = (ts) => {
            if (!start) start = ts
            const progress = Math.min((ts - start) / duration, 1)
            setValue(Math.floor(progress * target))
            if (progress < 1) raf = requestAnimationFrame(step)
          }
          raf = requestAnimationFrame(step)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  const displayValue = commas ? value.toLocaleString('en-US') : value

  return (
    <span ref={ref}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  )
}
