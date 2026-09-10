import { navLinks } from '../data/content'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <a href="#top" className="footer-wordmark">
          Victor Wilmering
        </a>

        <nav className="footer-links" aria-label="Footer">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <p className="footer-meta">
          © {year} Victor Wilmering. Graphic design, Amsterdam.
        </p>
      </div>
    </footer>
  )
}
