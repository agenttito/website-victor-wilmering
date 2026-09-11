import { useReveal } from '../hooks/useReveal'
import { useLanguage } from '../i18n/useLanguage'
import './About.css'

export default function About() {
  const { t } = useLanguage()
  const scopeRef = useReveal()

  return (
    <section id="about" className="section about-section" ref={scopeRef}>
      <div className="container about-grid">
        <div className="about-label" data-reveal>
          <span className="eyebrow">{t.about.eyebrow}</span>
          <span className="about-index">{t.about.index}</span>
        </div>

        <div className="about-copy">
          <p className="about-lead" data-reveal>
            {t.about.lead}
          </p>
          <p className="about-body" data-reveal data-reveal-delay="120">
            {t.about.body}
          </p>
        </div>
      </div>
    </section>
  )
}
