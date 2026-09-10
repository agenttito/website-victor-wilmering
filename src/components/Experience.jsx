import { useReveal } from '../hooks/useReveal'
import './Experience.css'

export default function Experience() {
  const scopeRef = useReveal()

  return (
    <section className="section experience-section" ref={scopeRef} aria-label="Experience">
      <div className="container experience-inner">
        <div className="experience-stat" data-reveal>
          <span className="experience-number">
            10<span className="experience-plus">+</span>
          </span>
          <span className="experience-caption">Years of creative experience</span>
        </div>

        <div className="experience-facts" data-reveal data-reveal-delay="120">
          <p className="experience-fact">
            <span className="experience-dot" aria-hidden="true" />
            Amsterdam-based
          </p>
          <p className="experience-fact">
            <span className="experience-dot" aria-hidden="true" />
            Available for selected freelance projects and collaborations
          </p>
        </div>
      </div>
    </section>
  )
}
