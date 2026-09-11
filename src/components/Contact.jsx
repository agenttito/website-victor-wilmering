import { contactLinks } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import { useLanguage } from '../i18n/useLanguage'
import './Contact.css'

const ICONS = {
  'Email Victor': (
    <path
      d="M3 5h14v10H3V5Zm0 0 7 6 7-6"
      stroke="currentColor"
      strokeWidth="1.4"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  LinkedIn: (
    <path
      d="M4 4h2.4v2.4H4V4Zm.1 4h2.2v8H4.1V8Zm4 0h2.1v1.1c.5-.8 1.4-1.3 2.6-1.3 2 0 3.2 1.3 3.2 3.7V16h-2.2v-4.1c0-1.2-.5-1.9-1.5-1.9-1 0-1.7.7-1.7 1.9V16H8.1V8Z"
      fill="currentColor"
    />
  ),
  Instagram: (
    <path
      d="M6.5 4h7A2.5 2.5 0 0 1 16 6.5v7a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 4 13.5v-7A2.5 2.5 0 0 1 6.5 4Zm3.5 3.4a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2Zm4-.6a.7.7 0 1 1-1.4 0 .7.7 0 0 1 1.4 0Z"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="none"
    />
  ),
}

// Icons are keyed by the stable English label regardless of display language.
const ICON_KEYS = ['Email Victor', 'LinkedIn', 'Instagram']

export default function Contact() {
  const { lang, t } = useLanguage()
  const scopeRef = useReveal()

  return (
    <section id="contact" className="section contact-section" ref={scopeRef}>
      <div className="container contact-inner">
        <span className="eyebrow" data-reveal>
          {t.contact.eyebrow}
        </span>
        <h2 className="contact-heading" data-reveal>
          {t.contact.heading[0]}
          <br />
          {t.contact.heading[1]}
        </h2>

        <div className="contact-actions" data-reveal data-reveal-delay="120">
          {contactLinks.map((link, i) => (
            <a
              key={ICON_KEYS[i]}
              href={link.href}
              className={`btn contact-btn${i === 0 ? '' : ' btn-outline'}`}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              <svg className="btn-icon" viewBox="0 0 20 20">
                {ICONS[ICON_KEYS[i]]}
              </svg>
              {link.label[lang]}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
