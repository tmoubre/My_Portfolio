import React, { useState, useEffect } from 'react'
import ProjectCard from './components/ProjectCard.jsx'
import Modal from './components/Modal.jsx'
import projects from './data/projects.js'

// 🔧 Replace with your actual details
const EMAIL = 'oubre1@att.net'
const LINKEDIN = 'https://www.linkedin.com/in/troy-oubre-32170a32/'
const GITHUB = 'https://github.com/tmoubre'

// Your Formspree form endpoint
const FORMSPREE_URL = 'https://formspree.io/f/xblkvnzg'

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isChoiceOpen, setIsChoiceOpen] = useState(false)
  const [formStatus, setFormStatus] = useState({ state: 'idle', msg: '' })

  useEffect(() => {
    // If someone hits /#contact, open the modal automatically
    if (window.location.hash === '#contact') {
      setIsFormOpen(true)
    }
  }, [])

  const openFormModal = () => setIsFormOpen(true)
  const closeFormModal = () => {
    setIsFormOpen(false)
    setFormStatus({ state: 'idle', msg: '' })
  }

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

  // Submit to Formspree via AJAX (no redirect)
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setFormStatus({ state: 'sending', msg: '' })

    try {
      const form = e.currentTarget
      const data = new FormData(form)
      // OPTIONAL: anti-spam honeypot. Formspree ignores unknown fields.
      // data.append('_gotcha', '')

      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: data
      })

      if (res.ok) {
        setFormStatus({ state: 'success', msg: 'Thanks! Your message has been sent.' })
        form.reset()
      } else {
        let msg = 'Something went wrong. Please try again or email me directly.'
        try {
          const result = await res.json()
          if (result?.errors?.length) {
            msg = result.errors.map(e => e.message).join(', ')
          }
        } catch {}
        setFormStatus({ state: 'error', msg })
      }
    } catch {
      setFormStatus({ state: 'error', msg: 'Network error. Please try again or email me directly.' })
    }
  }

  return (
    <div>
      <header className="nav">
        <div className="container">
          <div className="brand">Troy</div>
          <nav>
            <button className="pill" type="button" onClick={openFormModal}>Get in touch</button>
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
                I build clean, reliable web apps with React, Node, and SQL. Here are a few projects and the problems they solve.
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

        {/* Contact (links retained; form is in modal) */}
        <section id="contact" className="card">
          <h2>Contact</h2>
          <p className="muted">Prefer email or LinkedIn, or use the “Get in touch” button to open the form.</p>

          <div className="contact" role="list" style={{ marginTop: '6px' }}>
            <button type="button" onClick={openChoiceModal}>Email Me</button>
            <a role="listitem" href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
            <a role="listitem" href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </section>
      </main>

      <footer className="footer container">
        <small>© {new Date().getFullYear()} Troy. Built with React + Vite.</small>
      </footer>

      {/* Contact Form Modal (Formspree AJAX, no redirect) */}
      <Modal isOpen={isFormOpen} onClose={closeFormModal} title="Get in touch">
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="name">Your Name:</label>
          <input id="name" type="text" name="name" required />

          <label htmlFor="email" style={{ marginTop: 10 }}>Your Email:</label>
          <input id="email" type="email" name="email" required />

          <label htmlFor="message" style={{ marginTop: 10 }}>Message:</label>
          <textarea id="message" name="message" rows="5" required />

          {/* optional honeypot to reduce spam */}
          <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
            <button type="submit" className="pill" disabled={formStatus.state === 'sending'}>
              {formStatus.state === 'sending' ? 'Sending…' : 'Send Message'}
            </button>
            <button type="button" className="modal-secondary" onClick={closeFormModal}>Cancel</button>
          </div>

          {formStatus.state !== 'idle' && (
            <p className="muted" style={{ marginTop: 10 }}>{formStatus.msg}</p>
          )}
        </form>
      </Modal>

      {/* Choice Modal for Email vs Form */}
      <Modal isOpen={isChoiceOpen} onClose={closeChoiceModal} title="Contact options">
        <p className="muted" style={{ marginBottom: 14 }}>How would you like to get in touch?</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button type="button" className="pill" onClick={handleEmailClient}>Open Email Client</button>
          <button type="button" className="modal-secondary" onClick={handleUseForm}>Use Contact Form</button>
        </div>
      </Modal>
    </div>
  )
}
