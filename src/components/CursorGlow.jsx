import { useEffect, useRef } from 'react'

/**
 * A soft light that follows the cursor across the whole page. Uses
 * mix-blend-mode: screen so it brightens dark sections without ever
 * flattening text underneath, and lerps toward the cursor for a smooth,
 * slightly trailing feel rather than snapping instantly.
 */
export default function CursorGlow() {
  const glowRef = useRef(null)
  const target = useRef({ x: -500, y: -500 })
  const current = useRef({ x: -500, y: -500 })
  const raf = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    if (prefersReduced || !isFinePointer) return

    const handleMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMove)

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.1
      current.current.y += (target.current.y - current.current.y) * 0.1
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${current.current.x}px, ${current.current.y}px)`
      }
      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 z-30 pointer-events-none hidden md:block"
      style={{
        width: 240,
        height: 240,
        marginLeft: -120,
        marginTop: -120,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(56,189,248,0.18), transparent 70%)',
        mixBlendMode: 'screen',
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  )
}
