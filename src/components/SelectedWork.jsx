import { useRef, useState } from 'react'
import { projects } from '../data/projects'
import { useReveal } from '../hooks/useReveal'
import ProjectArt from './ProjectArt'
import ProjectModal from './ProjectModal'
import './SelectedWork.css'

export default function SelectedWork({ onCursorChange }) {
  const [activeProject, setActiveProject] = useState(null)
  const scopeRef = useReveal()
  const lastTriggerRef = useRef(null)

  const openProject = (project, event) => {
    lastTriggerRef.current = event?.currentTarget ?? null
    setActiveProject(project)
  }

  const closeProject = () => {
    setActiveProject(null)
    lastTriggerRef.current?.focus?.()
  }

  return (
    <section id="work" className="section work-section" ref={scopeRef}>
      <div className="container">
        <div className="section-head" data-reveal>
          <div>
            <span className="eyebrow">Selected Work</span>
            <h2 className="work-heading">A decade of ideas, made visible.</h2>
          </div>
          <p className="work-intro">
            Six projects spanning identity, campaigns and digital work — each one built from a
            single clear idea, carried through with precision.
          </p>
        </div>

        <div className="work-grid">
          {projects.map((project, i) => (
            <button
              type="button"
              key={project.id}
              className={`work-card work-card--${project.size}`}
              data-reveal
              data-reveal-delay={(i % 3) * 90}
              onClick={(event) => openProject(project, event)}
              onMouseEnter={() => onCursorChange?.('view')}
              onMouseLeave={() => onCursorChange?.(null)}
              aria-haspopup="dialog"
            >
              <span className="work-card-media">
                <ProjectArt project={project} />
              </span>
              <span className="work-card-meta">
                <span className="work-card-top">
                  <span className="work-card-category">{project.category}</span>
                  <span className="work-card-year">{project.year}</span>
                </span>
                <span className="work-card-title">{project.client}</span>
                <span className="work-card-desc">{project.description}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <ProjectModal project={activeProject} onClose={closeProject} />
    </section>
  )
}
