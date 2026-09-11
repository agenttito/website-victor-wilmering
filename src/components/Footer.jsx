import { navLinks } from '../data/content'
import { useLanguage } from '../i18n/useLanguage'
import './Footer.css'

export default function Footer() {
  const { lang, t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <a href="#top" className="footer-wordmark">
          Victor Wilmering
        </a>

        <nav className="footer-links" aria-label={t.a11y.footerNav}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label[lang]}
            </a>
          ))}
        </nav>

        <p className="footer-meta">{t.footer.meta(year)}</p>
      </div>
    </footer>
  )
}
