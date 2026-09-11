import { useState } from 'react'
import { services } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import { useLanguage } from '../i18n/useLanguage'
import './Services.css'

export default function Services() {
  const { lang, t } = useLanguage()
  const [openIndex, setOpenIndex] = useState(0)
  const scopeRef = useReveal()

  return (
    <section id="services" className="section services-section" ref={scopeRef}>
      <div className="container">
        <div className="section-head" data-reveal>
          <div>
            <span className="eyebrow">{t.services.eyebrow}</span>
            <h2 className="services-heading">{t.services.heading}</h2>
          </div>
        </div>

        <ul className="services-list" data-reveal>
          {services.map((service, i) => {
            const isOpen = openIndex === i
            return (
              <li key={service.number} className="service-row">
                <button
                  type="button"
                  className="service-trigger"
                  aria-expanded={isOpen}
                  aria-controls={`service-panel-${i}`}
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                >
                  <span className="service-number">{service.number}</span>
                  <span className="service-title">{service.title[lang]}</span>
                  <span className={`service-icon${isOpen ? ' is-open' : ''}`} aria-hidden="true">
                    <svg viewBox="0 0 20 20" width="18" height="18">
                      <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div
                  id={`service-panel-${i}`}
                  className={`service-panel${isOpen ? ' is-open' : ''}`}
                  role="region"
                >
                  <p>{service.description[lang]}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
