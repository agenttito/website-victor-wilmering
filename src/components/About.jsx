import { useReveal } from '../hooks/useReveal'
import './About.css'

export default function About() {
  const scopeRef = useReveal()

  return (
    <section id="about" className="section about-section" ref={scopeRef}>
      <div className="container about-grid">
        <div className="about-label" data-reveal>
          <span className="eyebrow">About Victor</span>
          <span className="about-index">01 / Amsterdam</span>
        </div>

        <div className="about-copy">
          <p className="about-lead" data-reveal>
            I’m Victor Wilmering, an Amsterdam-based graphic designer with over 10 years of
            experience turning ideas into clear, distinctive visual communication.
          </p>
          <p className="about-body" data-reveal data-reveal-delay="120">
            My work combines strong concepts with precise execution—from brand identities and
            campaigns to digital experiences and content. I believe the best design feels
            effortless, communicates instantly and stays memorable.
          </p>
        </div>
      </div>
    </section>
  )
}
