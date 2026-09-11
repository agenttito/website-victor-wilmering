import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Nav from './components/Nav'
import Hero from './components/Hero'
import SelectedWork from './components/SelectedWork'
import About from './components/About'
import Services from './components/Services'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import { useReducedMotion } from './hooks/useReducedMotion'
import { LanguageProvider } from './i18n/LanguageContext'
import { useLanguage } from './i18n/useLanguage'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const reducedMotion = useReducedMotion()
  const [cursorMode, setCursorMode] = useState(null)

  useEffect(() => {
    if (reducedMotion) return undefined

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [reducedMotion])

  // Smooth anchor scrolling, works with or without Lenis.
  useEffect(() => {
    const onClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return
      const id = anchor.getAttribute('href')
      if (!id || id === '#') return
      const target = id === '#top' ? document.body : document.querySelector(id)
      if (!target) return
      e.preventDefault()
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
      if (id !== '#top') {
        window.history.pushState(null, '', id)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [reducedMotion])

  return (
    <LanguageProvider>
      <AppContent cursorMode={cursorMode} setCursorMode={setCursorMode} />
    </LanguageProvider>
  )
}

function AppContent({ cursorMode, setCursorMode }) {
  const { t } = useLanguage()

  return (
    <div id="top">
      <a href="#main" className="skip-link">
        {t.a11y.skipToContent}
      </a>

      <CustomCursor mode={cursorMode} />
      <Nav />

      <main id="main">
        <Hero />
        <SelectedWork onCursorChange={setCursorMode} />
        <About />
        <Services />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
