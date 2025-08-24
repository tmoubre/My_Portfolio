import React from 'react'

/**
 * @param {{
 *  title: string,
 *  description: string,
 *  stack?: string[],
 *  links?: { live?: string, github?: string, demo?: string },
 *  highlights?: string[]
 * }} props
 */
export default function ProjectCard({ title, description, stack = [], links = {}, highlights = [] }) {
  const { live, github, demo } = links || {}

  return (
    <article className="card project" role="listitem">
      <div className="proj-title">
        <h3>{title}</h3>
        <div className="proj-links">
          {github && <a href={github} target="_blank" rel="noopener">GitHub</a>}
          {live && <a href={live} target="_blank" rel="noopener">Live</a>}
          {demo && <a href={demo} target="_blank" rel="noopener">Demo</a>}
        </div>
      </div>

      <p className="proj-desc">{description}</p>

      {Array.isArray(highlights) && highlights.length > 0 && (
        <ul className="proj-bullets">
          {highlights.slice(0, 2).map((h, i) => <li key={i}>{h}</li>)}
        </ul>
      )}

      {Array.isArray(stack) && stack.length > 0 && (
        <div className="tags" aria-label="Tech stack">
          {stack.map(s => <span key={s} className="tag">{s}</span>)}
        </div>
      )}
    </article>
  )
}




