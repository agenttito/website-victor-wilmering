import { useEffect, useRef, useState } from 'react'
import { navLinks } from '../data/content'
import { useLanguage } from '../i18n/useLanguage'
import './Nav.css'

function LanguageSwitch({ className }) {
  const { lang, setLang, t } = useLanguage()

  return (
    <div className={`lang-switch${className ? ` ${className}` : ''}`} role="group" aria-label={t.a11y.language}>
      <button
        type="button"
        className={`lang-switch-option${lang === 'en' ? ' is-active' : ''}`}
        aria-pressed={lang === 'en'}
        onClick={() => setLang('en')}
      >
        EN
      </button>
      <span className="lang-switch-divider" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        className={`lang-switch-option${lang === 'nl' ? ' is-active' : ''}`}
        aria-pressed={lang === 'nl'}
        onClick={() => setLang('nl')}
      >
        NL
      </button>
    </div>
  )
}

export default function Nav() {
  const { lang, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef(null)
  const firstLinkRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', menuOpen)
    if (menuOpen) {
      firstLinkRef.current?.focus()
    } else {
      toggleRef.current?.focus()
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <>
      <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#top" className="nav-wordmark">
            Victor Wilmering
          </a>

          <nav className="nav-links" aria-label={t.a11y.primaryNav}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label[lang]}
              </a>
            ))}
          </nav>

          <div className="nav-right">
            <span className="nav-available">
              <span className="nav-available-dot" aria-hidden="true" />
              {t.nav.availableForWork}
            </span>

            <LanguageSwitch className="nav-lang" />

            <button
              ref={toggleRef}
              type="button"
              className="nav-toggle"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="visually-hidden">{menuOpen ? t.a11y.closeMenu : t.a11y.openMenu}</span>
              <span className={`nav-toggle-bars${menuOpen ? ' is-open' : ''}`} aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={t.a11y.siteMenu}
        inert={!menuOpen}
      >
        <nav className="mobile-menu-links" aria-label={t.a11y.mobileNav}>
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-menu-link"
              ref={i === 0 ? firstLinkRef : undefined}
              onClick={handleLinkClick}
              style={{ transitionDelay: menuOpen ? `${80 + i * 60}ms` : '0ms' }}
            >
              {link.label[lang]}
            </a>
          ))}
        </nav>
        <div className="mobile-menu-footer">
          <span className="nav-available">
            <span className="nav-available-dot" aria-hidden="true" />
            {t.nav.availableForWork}
          </span>
          <LanguageSwitch className="mobile-menu-lang" />
        </div>
      </div>
    </>
  )
}
