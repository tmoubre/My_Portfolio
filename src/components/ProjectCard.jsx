import React from 'react'

export default function ProjectCard({ title, description, stack, links }) {
  return (
    <article className="card project" role="listitem">
      <div className="proj-title">
        <h3>{title}</h3>
        <div className="proj-links">
          {links?.live && <a href={links.live} target="_blank" rel="noreferrer" aria-label="Live app">Live</a>}
          {links?.demo && <a href={links.demo} target="_blank" rel="noreferrer" aria-label="Screenshots or demo">Screens</a>}
          {links?.github && <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub repo">GitHub</a>}
        </div>
      </div>
      <p className="proj-desc">{description}</p>
      <p className="proj-desc"><strong>Stack:</strong> {stack.join(', ')}</p>
    </article>
  )
}
