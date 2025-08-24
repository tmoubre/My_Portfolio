import React, { useState, useEffect, useRef } from 'react'
import ProjectCard from './components/ProjectCard.jsx'
import Modal from './components/Modal.jsx'
import Resume from './components/Resume.jsx'
import projects from './data/projects.js'

// ======== YOUR PERSONAL LINKS ========
const EMAIL = 'oubre1@att.net'
const GITHUB = 'https://github.com/tmoubre'
const LINKEDIN = 'https://www.linkedin.com/in/troy-oubre-32170a32/'
const RESUME_PDF = '/Troy-Oubre-Resume.pdf'
const MEDIUM = 'https://medium.com/@scinetbr'
const X = 'https://x.com/troydevelops'

// Trello boards to show
const TRELLO_BOARDS = [
  {
    title: 'Collaboration & Project Management',
    url: 'https://trello.com/b/jfGLe2w5/collaboration-project-management',
  },
  {
    title: 'Full-Stack Developer Course',
    url: 'https://trello.com/b/l1ARiGia/full-stack-developer-corse',
  },
]

// Contact endpoint: Netlify Function in prod, Formspree direct in dev
const CONTACT_URL = import.meta.env.PROD
  ? '/.netlify/functions/contact'
  : 'https://formspree.io/f/xblkvnzg'

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isChoiceOpen, setIsChoiceOpen] = useState(false)
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const [formStatus, setFormStatus] = useState({ state: 'idle', msg: '' })

  // --- Toast ---
  const [toast, setToast] = useState({ visible: false, msg: '', type: 'success' })
  const toastTimerRef = useRef(null)
  const showToast = (message, type = 'success', duration = 3500) => {
    setToast({ visible: true, msg: message, type })
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    toastTimerRef.current = setTimeout(() => {
      setToast(t => ({ ...t, visible: false }))
    }, duration)
  }

  useEffect(() => {
    if (window.location.hash === '#contact') setIsFormOpen(true)
    return () => { if (toastTimerRef.current) clearTimeout(toastTimerRef.current) } // cleanup timer
  }, [])

  const openFormModal = () => setIsFormOpen(true)
  const closeFormModal = () => {
    setIsFormOpen(false)
    setFormStatus({ state: 'idle', msg: '' })
  }

  const openChoiceModal = () => setIsChoiceOpen(true)
  const closeChoiceModal = () => setIsChoiceOpen(false)

  const openResumeModal = () => setIsResumeOpen(true)
  const closeResumeModal = () => setIsResumeOpen(false)

  const handleEmailClient = () => {
    window.location.href = `mailto:${EMAIL}`
    closeChoiceModal()
  }
  const handleUseForm = () => {
    closeChoiceModal()
    openFormModal()
  }

  // Submit via Netlify Function (prod) or Formspree (dev)
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setFormStatus({ state: 'sending', msg: '' })

    try {
      const form = e.currentTarget
      const data = Object.fromEntries(new FormData(form).entries())

      const res = await fetch(CONTACT_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        let msg = 'Something went wrong. Please try again or email me directly.'
        try {
          const json = await res.json()
          if (json?.errors?.length) msg = json.errors.map(er => er.message).join(', ')
        } catch {}
        setFormStatus({ state: 'error', msg })
        return
      }

      // Success: reset, close modal, and show toast
      setFormStatus({ state: 'success', msg: 'Thanks! Your message has been sent.' })
      form.reset()
      closeFormModal()
      showToast('Thanks! Your message was sent.', 'success', 3500)

    } catch {
      setFormStatus({
        state: 'error',
        msg: 'Network error. Please try again or email me directly.',
      })
    }
  }

  return (
    <div>
      {/* Header */}
      <header className="nav">
        <div className="container">
          <div className="brand">
            <div className="brand-name">Troy Michael Oubre</div>
            <a
              className="brand-phone"
              href="tel:+15047150645"
              aria-label="Call Troy at 504 715 0645"
            >
              (504) 715-0645
            </a>
          </div>
          <nav>
            {/* All nav items share the same style */}
            <button className="modal-secondary btn-sm" href="#boards">Trello Boards</button>
            <button type="button" className="modal-secondary btn-sm" onClick={openResumeModal}>
              Resume
            </button>
            <button className="modal-secondary btn-sm" type="button" onClick={openFormModal}>
              Get in touch
            </button>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="container">
        {/* Hero */}
        <section className="hero" id="home">
          <div className="hero-wrap">
            <div>
              <h1 className="title">Operations Controller ➜ Full-Stack Developer</h1>
              <p className="subtitle">
                Graduate of a full-stack immersion building seven production-style apps: a responsive portfolio,
                a JavaScript API app, a Node/Express REST API with MongoDB, a React SPA, a serverless PWA
                built with a test-driven approach, a React Native chat app, and an Angular client.
              </p>
              <div className="tags" aria-label="Skills">
                <span className="tag">React</span>
                <span className="tag">Node/Express</span>
                <span className="tag">MongoDB</span>
                <span className="tag">React Native</span>
                <span className="tag">Angular (basics)</span>
                <span className="tag">Testing (Jest/RTL/Cucumber)</span>
              </div>
              <a className="pill" href="#projects" aria-label="Skip to projects">View projects ↓</a>
            </div>

            <div className="card" aria-label="About Troy">
              <h2>About</h2>
              <p>
                I’m Troy, an Ops Controller transitioning into software engineering. Through a hands-on full-stack
                program, I practiced accessible UI, API design, authentication, routing &amp; state management,
                data visualization, offline-first PWAs, and mobile development. I like clear interfaces, reliable
                tests, and maintainable backends.
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

        {/* Process & Trello Boards */}
        <section id="boards" className="card">
          <h2>Process & Trello Boards</h2>
          <p className="muted">
            I used Trello during the program to familiarize myself with Kanban and simple workflow tracking. Because
            the curriculum outlined the specific steps for each project, these boards were kept lightweight and used
            when required—more as practice tools than full project management artifacts.
          </p>

          <div className="grid" role="list" style={{ marginTop: 10 }}>
            {TRELLO_BOARDS.map((b) => (
              <article key={b.title} className="card project" role="listitem"> {/* <-- add project */}
                <div className="proj-title">
                  <h3>{b.title}</h3>
                  <div className="proj-links">
                    <a href={b.url} target="_blank" rel="noopener">View Board</a>
                  </div>
                </div>
                <p className="proj-desc">
                  Snapshot of tasks and steps I tracked while following the curriculum for this build.
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="card">
          <h2>Contact</h2>
          <p className="muted">Prefer email or LinkedIn, or use the “Get in touch” button to open the form.</p>

          <div className="contact" role="list" style={{ marginTop: '6px' }}>
            <button type="button" onClick={openChoiceModal}>Email Me</button>
            <a className='modal-secondary btn-sm' role="listitem" href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className='modal-secondary btn-sm' role="listitem" href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>
            <a className='modal-secondary btn-sm' role="listitem" href={X} download>X</a>
            <a className='modal-secondary btn-sm' role="listitem" href={MEDIUM} download>Medium</a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-actions">
          <small>© {new Date().getFullYear()} Troy. Built with React + Vite.</small>

          <div className="actions">
            <button
              type="button"
              className="modal-secondary btn-sm"
              onClick={openResumeModal}
            >
              Resume
            </button>

            <button
              className="modal-secondary btn-sm"
              type="button"
              onClick={openFormModal}
            >
              Get in touch
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <Modal isOpen={isFormOpen} onClose={closeFormModal} title="Get in touch">
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="name">Your Name:</label>
          <input id="name" type="text" name="name" required />

          <label htmlFor="email" style={{ marginTop: 10 }}>Your Email:</label>
          <input id="email" type="email" name="email" required />

          <label htmlFor="message" style={{ marginTop: 10 }}>Message:</label>
          <textarea id="message" name="message" rows="5" required />

          {/* honeypot */}
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

      <Modal isOpen={isChoiceOpen} onClose={closeChoiceModal} title="Contact options">
        <p className="muted" style={{ marginBottom: 14 }}>How would you like to get in touch?</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button type="button" className="pill" onClick={handleEmailClient}>Open Email Client</button>
          <button type="button" className="modal-secondary" onClick={handleUseForm}>Use Contact Form</button>
        </div>
      </Modal>

      {/* Resume in a modal with side gutters */}
      <Modal isOpen={isResumeOpen} onClose={closeResumeModal} title="Resume">
        <div style={{ maxHeight: '70vh', overflow: 'auto', padding: '0 16px' }}>
          <Resume inModal />
        </div>
      </Modal>

      {/* Toast */}
      <div
        className={`toast ${toast.visible ? 'show' : ''} ${toast.type}`}
        role="status"
        aria-live="polite"
        style={{
          // inline fallback so it still shows even if CSS is missing
          position: 'fixed',
          right: 20,
          bottom: 20,
          zIndex: 2000,
          opacity: toast.visible ? 1 : 0,
          transition: 'opacity .2s ease',
        }}
      >
        {toast.msg}
      </div>
    </div>
  )
}
