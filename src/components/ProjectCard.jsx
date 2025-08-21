// src/components/ProjectCard.jsx
export default function ProjectCard({ title, description, stack = [], links = {} }) {
  const { live, github, demo } = links
  return (
    <article className="card" role="listitem">
      <h3>{title}</h3>
      <p>{description}</p>
      {stack.length > 0 && (
        <p className="muted"><strong>Stack:</strong> {stack.join(', ')}</p>
      )}

      <div className="actions">
        {live && (
          <a className="modal-secondary btn-sm" href={live} target="_blank" rel="noopener noreferrer">
            Live
          </a>
        )}
        {github && (
          <a className="modal-secondary btn-sm" href={github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        )}
        {demo && (
          <a className="modal-secondary btn-sm" href={demo} target="_blank" rel="noopener noreferrer">
            Demo
          </a>
        )}
      </div>
    </article>
  )
}


