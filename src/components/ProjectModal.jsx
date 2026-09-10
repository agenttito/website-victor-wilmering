import { useEffect, useRef } from 'react'
import ProjectArt from './ProjectArt'
import './ProjectModal.css'

export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const isOpen = Boolean(project)

  useEffect(() => {
    if (!isOpen) return undefined

    closeRef.current?.focus()
    document.documentElement.classList.add('menu-open')

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.documentElement.classList.remove('menu-open')
    }
  }, [isOpen, onClose])

  if (!project) return null

  return (
    <div className="project-modal-backdrop" onMouseDown={onClose}>
      <div
        ref={dialogRef}
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" className="project-modal-close" onClick={onClose}>
          <span className="visually-hidden">Close project</span>
          <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
            <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          </svg>
        </button>

        <div className="project-modal-media">
          <ProjectArt project={project} />
        </div>

        <div className="project-modal-body">
          <div className="project-modal-top">
            <span className="project-modal-category">{project.category}</span>
            <span className="project-modal-year">{project.year}</span>
          </div>
          <h3 id="project-modal-title" className="project-modal-title">
            {project.client}
          </h3>
          <p className="project-modal-desc">{project.description}</p>
          <ul className="project-modal-tags">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <p className="project-modal-note">
            Full case study coming soon — this preview shows placeholder artwork standing in for
            real project photography.
          </p>
        </div>
      </div>
    </div>
  )
}
