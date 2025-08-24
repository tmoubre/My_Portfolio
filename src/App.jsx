import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import Modal from "./components/Modal.jsx";
import Resume from "./components/Resume.jsx"; // keep your existing Resume component
import projects from "./data/projects";

export default function App() {
  // --- Modals ---
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const openFormModal = () => setIsContactOpen(true);
  const closeFormModal = () => setIsContactOpen(false);

  const openResumeModal = () => setIsResumeOpen(true);
  const closeResumeModal = () => setIsResumeOpen(false);

  // --- Toast ---
  const [toast, setToast] = useState({ message: "", type: "success", visible: false });
  const toastTimerRef = useRef(null);

  const showToast = (message, type = "success", duration = 3500) => {
    setToast({ message, type, visible: true });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }));
    }, duration);
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  // --- Contact submit handler (Formspree) ---
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xblkvnzg", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (res.ok) {
        form.reset();
        closeFormModal();
        showToast("Thanks! Your message was sent.", "success", 3500);
      } else {
        showToast("Something went wrong. Please email me directly.", "error", 5000);
      }
    } catch {
      showToast("Network error. Please email me directly.", "error", 5000);
    }
  };

  return (
    <>
      {/* Accessibility skip link */}
      <a className="skip-link" href="#content">Skip to content</a>

      {/* Header / Nav */}
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
            {/* Make both buttons identical styling */}
            <button type="button" className="pill btn-sm" onClick={openResumeModal}>
              Resume
            </button>
            <button className="pill btn-sm" type="button" onClick={openFormModal}>
              Get in touch
            </button>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main id="content">
        {/* Hero */}
        <section className="hero">
          <div className="container hero-wrap">
            <div>
              <h1 className="title">Operations Controller & Full-Stack Developer</h1>
              <p className="subtitle">
                I streamline operations with clean data, clear reporting, and production-quality apps.
              </p>

              <div className="tags">
                <span className="tag">React</span>
                <span className="tag">Node/Express</span>
                <span className="tag">MongoDB</span>
                <span className="tag">Angular</span>
                <span className="tag">Serverless</span>
              </div>

              <div className="actions">
                <a className="pill" href="/Troy-Oubre-Resume.pdf?v=1" target="_blank" rel="noopener">
                  Download CV
                </a>
                <button className="pill" type="button" onClick={openFormModal}>
                  Get in touch
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section>
          <div className="container">
            <h2>Projects</h2>
            <div className="grid">
              {projects.map((p, idx) => (
                <article key={idx} className="card project">
                  <div className="proj-title">
                    <h3>{p.title}</h3>
                    <div className="proj-links">
                      {p.links.github && (
                        <a href={p.links.github} target="_blank" rel="noopener">GitHub</a>
                      )}
                      {/* Live/demo buttons get the simple bordered look, not pill */}
                      {p.links.live && (
                        <a href={p.links.live} target="_blank" rel="noopener">Live</a>
                      )}
                      {p.links.demo && (
                        <a href={p.links.demo} target="_blank" rel="noopener">Demo</a>
                      )}
                    </div>
                  </div>
                  <p className="proj-desc">{p.description}</p>
                  <div className="tags">
                    {p.stack.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact section (footer links) */}
        <section>
          <div className="container">
            <h2>Contact</h2>
            <p className="muted">Prefer email? Or message me right here.</p>
            <div className="contact">
              <a href="mailto:oubre1@att.net">Email</a>
              <a href="https://www.linkedin.com/in/troy-oubre/" target="_blank" rel="noopener">LinkedIn</a>
              <a href="https://github.com/tmoubre" target="_blank" rel="noopener">GitHub</a>
              <a href="/Troy-Oubre-Resume.pdf?v=1" target="_blank" rel="noopener">Resume (PDF)</a>
              <button type="button" onClick={openFormModal}>Open form</button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="muted">© {new Date().getFullYear()} Troy Oubre</div>
          </div>
        </footer>
      </main>

      {/* Contact Modal */}
      <Modal open={isContactOpen} onClose={closeFormModal} title="Get in touch">
        <form onSubmit={handleContactSubmit} noValidate>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required placeholder="Your name" />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required placeholder="you@example.com" />

          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="5" required placeholder="Tell me a bit about your project…" />

          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button className="pill" type="submit">Send message</button>
            <button className="modal-secondary" type="button" onClick={closeFormModal}>Cancel</button>
          </div>
        </form>
      </Modal>

      {/* Resume Modal (uses your existing component) */}
      <Modal open={isResumeOpen} onClose={closeResumeModal} title="Resume">
        {/* In your Resume.jsx, the toolbar has "Download PDF" and "Open PDF" */}
        <Resume inModal />
      </Modal>

      {/* Toast */}
      <div
        className={`toast ${toast.visible ? "show" : ""} ${toast.type}`}
        role="status"
        aria-live="polite"
      >
        {toast.message}
      </div>
    </>
  );
}

