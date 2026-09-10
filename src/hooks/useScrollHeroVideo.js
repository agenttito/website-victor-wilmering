import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Drives a <video>'s currentTime from scroll position.
 *
 * The tall `sectionRef` element supplies the scroll distance; `stageRef`
 * (a 100dvh child) is pinned for that distance via ScrollTrigger, which is
 * meaningfully more reliable than plain `position: sticky` once iOS
 * Safari's collapsing address bar and transformed ancestors get involved.
 * A GSAP-driven scroll listener reports raw progress; a separate
 * requestAnimationFrame loop lerps toward it and writes video.currentTime,
 * so seeking never looks stepped even on a jumpy trackpad/wheel event.
 *
 * `onProgress` is called every animation frame with the eased 0-1 value —
 * callers should use it to imperatively set styles (never setState) to
 * keep this on the fast path.
 */
export function useScrollHeroVideo({ sectionRef, stageRef, videoRef, enabled, onProgress }) {
  const [status, setStatus] = useState('loading')
  const [loadProgress, setLoadProgress] = useState(0)

  const targetProgress = useRef(0)
  const currentProgress = useRef(0)
  const durationRef = useRef(0)
  const onProgressRef = useRef(onProgress)
  useEffect(() => {
    onProgressRef.current = onProgress
  })

  // Video preloading + readiness
  useEffect(() => {
    if (!enabled) return undefined
    const video = videoRef.current
    if (!video) return undefined

    let settled = false

    const markReady = () => {
      if (settled) return
      settled = true
      setStatus('ready')
    }
    const handleLoadedMetadata = () => {
      durationRef.current = video.duration || 0
    }
    const handleProgress = () => {
      if (!video.buffered.length || !video.duration) return
      const buffered = video.buffered.end(video.buffered.length - 1)
      setLoadProgress(Math.min(1, buffered / video.duration))
    }
    const handleError = () => setStatus('error')

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('progress', handleProgress)
    video.addEventListener('canplaythrough', markReady)
    video.addEventListener('loadeddata', markReady)
    video.addEventListener('error', handleError)

    // The <source> + preload="auto" in JSX already starts the fetch
    // declaratively — calling video.load() here would abort and restart
    // it (a real problem under StrictMode's dev-only double-effect).
    // Just pick up state for a video that was already loading/loaded
    // before these listeners were attached.
    if (video.duration) durationRef.current = video.duration
    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) markReady()

    // Safety net: an unusually slow network or an unplayable source should
    // never leave the loader spinning forever — fall back to the static
    // poster. If the video does eventually become playable, `markReady`
    // still overrides this and the crossfade to video happens as normal.
    const fallbackTimer = window.setTimeout(() => {
      if (!settled) setStatus('error')
    }, 12000)

    return () => {
      window.clearTimeout(fallbackTimer)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('progress', handleProgress)
      video.removeEventListener('canplaythrough', markReady)
      video.removeEventListener('loadeddata', markReady)
      video.removeEventListener('error', handleError)
    }
  }, [enabled, videoRef])

  // Pin + scroll progress
  useEffect(() => {
    if (!enabled) return undefined
    const section = sectionRef.current
    const stage = stageRef.current
    if (!section || !stage) return undefined

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      pin: stage,
      pinSpacing: false,
      anticipatePin: 1,
      onUpdate: (self) => {
        targetProgress.current = self.progress
      },
    })

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)

    return () => {
      trigger.kill()
      window.removeEventListener('load', refresh)
    }
  }, [enabled, sectionRef, stageRef])

  // rAF smoothing loop — writes video.currentTime + reports eased progress
  useEffect(() => {
    if (!enabled) return undefined
    let raf = requestAnimationFrame(tick)

    function tick() {
      const diff = targetProgress.current - currentProgress.current
      currentProgress.current += diff * 0.12
      if (Math.abs(diff) < 0.0006) currentProgress.current = targetProgress.current

      const video = videoRef.current
      const duration = durationRef.current
      if (video && duration) {
        const time = currentProgress.current * duration
        if (Number.isFinite(time) && Math.abs(video.currentTime - time) > 0.008) {
          try {
            video.currentTime = time
          } catch {
            /* seek not ready yet — retried next frame */
          }
        }
      }

      onProgressRef.current?.(currentProgress.current)
      raf = requestAnimationFrame(tick)
    }

    return () => cancelAnimationFrame(raf)
  }, [enabled, videoRef])

  return { status, loadProgress }
}
