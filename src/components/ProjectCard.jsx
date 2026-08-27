import React from 'react';

export default function ProjectCard({
    title,
    description,
    stack = [],
    links = {},
    highlights = [],
}) {
    const { live, github, demo } = links;
    const visibleHighlights = highlights.slice(0, 2);

    return (
        <article className="card project" role="listitem">
            <div className="proj-title">
                <h3>{title}</h3>

                <div className="proj-links">
                    {github && (
                        <a href={github} target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                    )}

                    {live && (
                        <a href={live} target="_blank" rel="noopener noreferrer">
                            Live
                        </a>
                    )}

                    {demo && (
                        <a href={demo} target="_blank" rel="noopener noreferrer">
                            Demo
                        </a>
                    )}
                </div>
            </div>

            <p className="proj-desc">{description}</p>

            {visibleHighlights.length > 0 && (
                <ul className="proj-bullets">
                    {visibleHighlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                    ))}
                </ul>
            )}

            {stack.length > 0 && (
                <div className="tags" aria-label="Tech stack">
                    {stack.map((technology) => (
                        <span key={technology} className="tag">
                            {technology}
                        </span>
                    ))}
                </div>
            )}
        </article>
    );
}
