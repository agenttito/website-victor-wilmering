import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useScrollHeroVideo } from '../hooks/useScrollHeroVideo'
import { useLanguage } from '../i18n/useLanguage'
import './Hero.css'

const TITLE_FADE_END = 0.07

function windowOpacity(progress, start, end) {
  if (progress <= start || progress >= end) return 0
  const span = end - start
  const fadeIn = start + span * 0.25
  const fadeOut = end - span * 0.25
  if (progress < fadeIn) return (progress - start) / (fadeIn - start)
  if (progress > fadeOut) return 1 - (progress - fadeOut) / (end - fadeOut)
  return 1
}

export default function Hero() {
  const reducedMotion = useReducedMotion()
  const { t } = useLanguage()
  const phrases = t.hero.phrases

  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const videoRef = useRef(null)
  const posterRef = useRef(null)
  const titleRef = useRef(null)
  const scrollCueRef = useRef(null)
  const phraseRefs = useRef([])
  const overlayRef = useRef(null)

  const handleProgress = (progress) => {
    if (titleRef.current) {
      const opacity = Math.max(0, 1 - progress / TITLE_FADE_END)
      titleRef.current.style.opacity = opacity
      titleRef.current.style.transform = `translateY(${(1 - opacity) * -18}px)`
      titleRef.current.style.visibility = opacity <= 0.01 ? 'hidden' : 'visible'
    }
    if (scrollCueRef.current) {
      const opacity = Math.max(0, 1 - progress / (TITLE_FADE_END * 0.7))
      scrollCueRef.current.style.opacity = opacity
    }
    phraseRefs.current.forEach((el, i) => {
      if (!el) return
      const { start, end } = phrases[i]
      const opacity = windowOpacity(progress, start, end)
      el.style.opacity = opacity
      el.style.transform = `translateY(${(1 - opacity) * 14}px)`
    })
    if (overlayRef.current) {
      const end = Math.min(1, Math.max(0, (progress - 0.9) / 0.1))
      overlayRef.current.style.opacity = 0.45 + end * 0.5
    }
  }

  const { status, loadProgress } = useScrollHeroVideo({
    sectionRef,
    stageRef,
    videoRef,
    enabled: !reducedMotion,
    onProgress: handleProgress,
  })

  // Initial paint before hook takes over: show the first frame immediately.
  useEffect(() => {
    if (titleRef.current) titleRef.current.style.opacity = '1'
    if (scrollCueRef.current) scrollCueRef.current.style.opacity = '1'
  }, [])

  const isReady = reducedMotion || status === 'ready'

  return (
    <section
      ref={sectionRef}
      className={`hero-scroll${reducedMotion ? ' is-static' : ''}`}
      aria-label={t.a11y.heroLabel}
    >
      <div ref={stageRef} className="hero-stage">
        <div className="hero-media">
          <img
            ref={posterRef}
            src="/video/hero-poster.jpg"
            alt=""
            className="hero-media-layer hero-poster"
            style={{ opacity: isReady && !reducedMotion ? 0 : 1 }}
            fetchPriority="high"
          />

          {!reducedMotion && (
            <video
              ref={videoRef}
              className="hero-media-layer hero-video"
              style={{ opacity: status === 'ready' ? 1 : 0 }}
              muted
              playsInline
              webkit-playsinline="true"
              preload="auto"
              poster="/video/hero-poster.jpg"
              aria-hidden="true"
              tabIndex={-1}
            >
              <source src="/video/victor-wilmering-hero-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
              <source src="/video/victor-wilmering-hero.mp4" type="video/mp4" />
            </video>
          )}

          <div ref={overlayRef} className="hero-fade-overlay" aria-hidden="true" />

          {!reducedMotion && status === 'loading' && (
            <div className="hero-loader" role="status">
              <svg className="hero-loader-ring" viewBox="0 0 44 44" aria-hidden="true">
                <circle className="hero-loader-track" cx="22" cy="22" r="19" />
                <circle
                  className="hero-loader-fill"
                  cx="22"
                  cy="22"
                  r="19"
                  style={{
                    strokeDasharray: 2 * Math.PI * 19,
                    strokeDashoffset: 2 * Math.PI * 19 * (1 - loadProgress),
                  }}
                />
              </svg>
              <span className="visually-hidden">{t.a11y.loadingHero(Math.round(loadProgress * 100))}</span>
            </div>
          )}
        </div>

        <div className="hero-content">
          <div ref={titleRef} className="hero-title-block">
            <h1 className="hero-title">
              Victor Wilmering
              <span className="hero-title-sub">{t.hero.role}</span>
              <span className="hero-title-location">{t.hero.location}</span>
            </h1>
            <p className="hero-lead">{t.hero.lead}</p>
          </div>

          <div ref={scrollCueRef} className="hero-scroll-cue">
            <span className="hero-scroll-cue-line" aria-hidden="true" />
            <span>{t.hero.scrollCue}</span>
          </div>

          <div className="hero-phrases" aria-hidden={reducedMotion}>
            {phrases.map((phrase, i) => (
              <p
                key={`phrase-${i}`}
                ref={(el) => {
                  phraseRefs.current[i] = el
                }}
                className="hero-phrase"
                style={{ opacity: 0 }}
              >
                {phrase.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
