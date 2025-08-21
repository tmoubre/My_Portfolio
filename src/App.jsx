import React, { useState } from 'react'
import ProjectCard from './components/ProjectCard.jsx'
import Modal from './components/Modal.jsx'
import projects from './data/projects.js'

/** 🔧 Use your real links (or keep what you already have) */
const EMAIL = 'oubre1@att.net'
const LINKEDIN = 'https://www.linkedin.com/in/troy-oubre-32170a32/'
const GITHUB = 'https://github.com/tmoubre'

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isChoiceOpen, setIsChoiceOpen] = useState(false)

  const openFormModal = () => setIsFormOpen(true)
  const closeFormModal = () => setIsFormOpen(false)

  const openChoiceModal = () => setIsChoiceOpen(true)
  const closeChoiceModal = () => setIsChoiceOpen(false)

  const handleEmailClient = () => {
    window.location.href = `mailto:${EMAIL}`
    closeChoiceModal()
  }
  const handleUseForm = () => {
    closeChoiceModal()
    openFormModal()
  }

  return (
    <div>
      <header className="nav">
        <div className="container">
          <div className="brand">Troy</div>
          <nav>
            {/* Button now opens modal instead of only scrolling */}
            <button className="pill" type="button" onClick={openFormModal}>
              Get in touch
            </button>
          </nav>
        </div>
      </header>

      <main className="container">
        {/* Hero */}
        <section className="hero" id="home">
          <div className="hero-wrap">
            <div>
              <h1 className="title">Operations Controller ➜ Full-Stack Developer</h1>
              <p className="subtitle">
                I build clean, reliable web apps with React, Node, and Angular. Here are a few projects and the problems they solve.
              </p>
              <div className="tags" aria-label="Skills">
                <span className="tag">React</span>
                <span className="tag">Node/Express</span>
                <span className="tag">SQL / Snowflake</span>
                <span className="tag">Jest & RTL</span>
                <span className="tag">Expo / React Native</span>
              </div>
              <a className="pill" href="#projects" aria-label="Skip to projects">View projects ↓</a>
            </div>

            <div className="card" aria-label="About Troy">
              <h2>About</h2>
              <p>
                I’m Troy, an Ops Controller transitioning into software engineering. I focus on practical solutions—clean UI,
                solid tests, and maintainable backends. Currently exploring React Native and Firebase.
              </p>
              <p className="muted">Open to junior full-stack / frontend roles (remote-friendly).</p>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects">
          <h2>Projects</h2>
          <div className="grid" role="list">
            {projects.map((p) => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </div>
        </section>

        {/* Skills / Highlights */}
        <section>
          <div className="twocol">
            <div className="card">
              <h2>Skills</h2>
              <ul>
                <li>Frontend: React, React Native, HTML, CSS</li>
                <li>Backend: Node, Express, REST APIs</li>
                <li>Database: SQL Server, Snowflake, MongoDB</li>
                <li>Testing: Jest, React Testing Library, Cucumber</li>
                <li>Tools: Git/GitHub, Netlify, Heroku</li>
              </ul>
            </div>
            <div className="card">
              <h2>Highlights</h2>
              <ul>
                <li>Implemented event filtering and chart visualizations in a React app</li>
                <li>Wrote unit & integration tests raising coverage and reliability</li>
                <li>Migrated backend to hosted environment with CI-friendly setup</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact (links remain here; form lives in modal) */}
        <section id="contact" className="card">
          <h2>Contact</h2>
          <p className="muted">Prefer email or LinkedIn. Or use the “Get in touch” button to open the form.</p>

          <div className="contact" role="list" style={{ marginTop: '6px' }}>
            <button type="button" onClick={openChoiceModal}>
              Email Me
            </button>
            <a role="listitem" href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
            <a role="listitem" href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </section>
      </main>

      <footer className="footer container">
        <small>© {new Date().getFullYear()} Troy. Built with React + Vite.</small>
      </footer>

      {/* Contact Form Modal */}
      <Modal isOpen={isFormOpen} onClose={closeFormModal} title="Get in touch">
        <form
          action="https://formspree.io/f/xblkvnzg"  // ← your Formspree URL
          method="POST"
        >
          <label htmlFor="name">Your Name:</label>
          <input id="name" type="text" name="name" required />

          <label htmlFor="email" style={{ marginTop: 10 }}>Your Email:</label>
          <input id="email" type="email" name="email" required />

          <label htmlFor="message" style={{ marginTop: 10 }}>Message:</label>
          <textarea id="message" name="message" rows="5" required></textarea>

          <input type="hidden" name="_subject" value="New message from Troy's portfolio" />

          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
            <button type="submit" className="pill">Send Message</button>
            <button type="button" className="modal-secondary" onClick={closeFormModal}>Cancel</button>
          </div>
        </form>
      </Modal>

      {/* Choice Modal for Email vs Form */}
      <Modal isOpen={isChoiceOpen} onClose={closeChoiceModal} title="Contact options">
        <p className="muted" style={{ marginBottom: 14 }}>
          How would you like to get in touch?
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button type="button" className="pill" onClick={handleEmailClient}>
            Open Email Client
          </button>
          <button type="button" className="modal-secondary" onClick={handleUseForm}>
            Use Contact Form
          </button>
        </div>
      </Modal>
    </div>
  )
}


