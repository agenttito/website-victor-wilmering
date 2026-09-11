import { useReveal } from '../hooks/useReveal'
import { useLanguage } from '../i18n/useLanguage'
import './Experience.css'

export default function Experience() {
  const { t } = useLanguage()
  const scopeRef = useReveal()

  return (
    <section className="section experience-section" ref={scopeRef} aria-label={t.experience.ariaLabel}>
      <div className="container experience-inner">
        <div className="experience-stat" data-reveal>
          <span className="experience-number">
            10<span className="experience-plus">+</span>
          </span>
          <span className="experience-caption">{t.experience.caption}</span>
        </div>

        <div className="experience-facts" data-reveal data-reveal-delay="120">
          <p className="experience-fact">
            <span className="experience-dot" aria-hidden="true" />
            {t.experience.amsterdamBased}
          </p>
          <p className="experience-fact">
            <span className="experience-dot" aria-hidden="true" />
            {t.experience.availableFreelance}
          </p>
        </div>
      </div>
    </section>
  )
}
