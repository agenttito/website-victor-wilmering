import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/useLanguage'
import './CustomCursor.css'

/**
 * Lightweight custom cursor for desktop pointers. `mode` is 'view' while
 * hovering a Selected Work card; otherwise the small default dot shows.
 * Disabled entirely on touch devices and when reduced motion is requested.
 */
export default function CustomCursor({ mode }) {
  const { t } = useLanguage()
  const [enabled] = useState(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return fine && !reduced
  })
  const dotRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!enabled) return undefined
    document.documentElement.classList.add('cursor-enabled')

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    let raf = requestAnimationFrame(tick)
    function tick() {
      pos.current.x += (target.current.x - pos.current.x) * 0.22
      pos.current.y += (target.current.y - pos.current.y) * 0.22
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
      }
      raf = requestAnimationFrame(tick)
    }

    return () => {
      document.documentElement.classList.remove('cursor-enabled')
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div ref={dotRef} className={`custom-cursor${mode ? ` custom-cursor--${mode}` : ''}`} aria-hidden="true">
      <span className="custom-cursor-label">{t.work.viewShort}</span>
    </div>
  )
}
