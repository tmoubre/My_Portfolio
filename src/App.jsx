// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import ProjectCard from './components/ProjectCard.jsx';
import Modal from './components/Modal.jsx';
import Resume from './components/Resume.jsx';
import projects from './data/projects.js';
import CertsNavButton from './components/CertsNavButton.jsx';
import CertsModal from './components/CertsModal.jsx';

// ======== PERSONAL LINKS ========
const EMAIL = 'oubre1@att.net';
const GITHUB = 'https://github.com/tmoubre';
const LINKEDIN = 'https://www.linkedin.com/in/troy-oubre-32170a32/';
const MEDIUM = 'https://medium.com/@scinetbr';
const X = 'https://x.com/troydevelops';

// ---- Impact bullets without touching your data file ----
const PROJECT_HIGHLIGHTS = {
    'Responsive Portfolio Website': [
        'Semantic, accessible, mobile-first layout with modal contact form',
        'Deployed to Netlify with resume, certifications, and responsive navigation',
    ],
    'myFlix — REST API (Backend)': [
        'JWT authentication, CRUD endpoints for movies, genres, and directors',
        'MongoDB persistence, CORS, validation, and documented API routes',
    ],
    'myFlix — React Client (Frontend)': [
        'Protected routes, favorites management, and profile updates',
        'Responsive SPA with routing, search, and Netlify deployment',
    ],
    'Meet App — Serverless PWA': [
        'Serverless authentication flow with Google Calendar API and offline support',
        'Data visualization for city and genre with test-driven development',
    ],
    'React Native Chat App (Expo)': [
        'Image and location messaging with offline Firestore synchronization',
        'Mobile chat experience built with React Native and Gifted Chat',
    ],
    'myFlix — Angular Client': [
        'Angular Material UI with authentication and movie detail views',
        'Typed services, reusable components, and technical documentation',
    ],
};

// Contact endpoint: Netlify Function in prod, Formspree direct in dev
const IS_PROD =
    typeof import.meta !== 'undefined' &&
  /** @type {any} */ (import.meta).env?.PROD === true;

const CONTACT_URL = IS_PROD
    ? '/.netlify/functions/contact'
    : 'https://formspree.io/f/xblkvnzg';

export default function App() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isChoiceOpen, setIsChoiceOpen] = useState(false);
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const [certsOpen, setCertsOpen] = useState(false);

    const [formStatus, setFormStatus] = useState({
        state: 'idle',
        msg: '',
    });

    const [toast, setToast] = useState({
        visible: false,
        msg: '',
        type: 'success',
    });

    /** @type {React.MutableRefObject<ReturnType<typeof setTimeout> | null>} */
    const toastTimerRef = useRef(null);

    const showToast = (message, type = 'success', duration = 3500) => {
        setToast({
            visible: true,
            msg: message,
            type,
        });

        if (toastTimerRef.current) {
            clearTimeout(toastTimerRef.current);
        }

        toastTimerRef.current = setTimeout(() => {
            setToast((t) => ({
                ...t,
                visible: false,
            }));
        }, duration);
    };

    useEffect(() => {
        if (window.location.hash === '#contact') {
            setIsFormOpen(true);
        }

        return () => {
            if (toastTimerRef.current) {
                clearTimeout(toastTimerRef.current);
            }
        };
    }, []);

    const goToProjects = () => {
        const el = document.getElementById('projects');

        if (el) {
            el.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });

            if (typeof history !== 'undefined') {
                history.replaceState(null, '', '#projects');
            }

            setTimeout(() => {
                if (el.focus) {
                    el.focus({
                        preventScroll: true,
                    });
                }
            }, 300);
        }
    };

    const openFormModal = () => setIsFormOpen(true);

    const closeFormModal = () => {
        setIsFormOpen(false);
        setFormStatus({
            state: 'idle',
            msg: '',
        });
    };

    const openChoiceModal = () => setIsChoiceOpen(true);
    const closeChoiceModal = () => setIsChoiceOpen(false);

    const openResumeModal = () => setIsResumeOpen(true);
    const closeResumeModal = () => setIsResumeOpen(false);

    const handleEmailClient = () => {
        window.location.href = `mailto:${EMAIL}`;
        closeChoiceModal();
    };

    const handleUseForm = () => {
        closeChoiceModal();
        openFormModal();
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        setFormStatus({
            state: 'sending',
            msg: '',
        });

        try {
            const form = e.currentTarget;
            const data = Object.fromEntries(new FormData(form).entries());

            const res = await fetch(CONTACT_URL, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                let msg =
                    'Something went wrong. Please try again or email me directly.';

                try {
                    const json = await res.json();

                    if (json?.errors?.length) {
                        msg = json.errors
                            .map((er) => er.message)
                            .join(', ');
                    }
                } catch { }

                setFormStatus({
                    state: 'error',
                    msg,
                });

                return;
            }

            setFormStatus({
                state: 'success',
                msg: 'Thanks! Your message has been sent.',
            });

            form.reset();
            closeFormModal();

            showToast(
                'Thanks! Your message was sent.',
                'success',
                3500
            );
        } catch {
            setFormStatus({
                state: 'error',
                msg: 'Network error. Please try again or email me directly.',
            });
        }
    };

    return (
        <div>
            {/* Header */}
            <header className="nav">
                <div className="container">
                    <div className="brand">
                        <div className="brand-name">
                            Troy Michael Oubre
                        </div>

                        <a
                            className="brand-phone"
                            href="tel:+15047150645"
                            aria-label="Call Troy at 504 715 0645"
                        >
                            (504) 715-0645
                        </a>
                    </div>

                    <nav>
                        <button
                            type="button"
                            className="modal-secondary btn-sm"
                            onClick={goToProjects}
                        >
                            View Projects
                        </button>

                        <button
                            type="button"
                            className="modal-secondary btn-sm"
                            onClick={openResumeModal}
                        >
                            Resume
                        </button>

                        <CertsNavButton
                            className="modal-secondary btn-sm"
                            onOpen={() => setCertsOpen(true)}
                        />

                        <button
                            className="modal-secondary btn-sm"
                            type="button"
                            onClick={openFormModal}
                        >
                            Get in touch
                        </button>
                    </nav>
                </div>
            </header>

            {/* Main */}
            <main className="container">

                {/* Hero */}
                <section
                    className="hero"
                    id="home"
                >
                    <div className="hero-wrap">

                        <div className="hero-content">
                            <p className="hero-eyebrow">
                                DIGITAL PRODUCTS • PRODUCT OWNERSHIP • TECHNOLOGY
                            </p>

                            <h1 className="title">
                                Senior Analyst, Digital Products
                                <span className="title-accent">
                                    Product Owner • Technology Leader • Full-Stack Developer
                                </span>
                            </h1>

                            <p className="subtitle">
                                I bridge business operations and technology to improve
                                enterprise products, processes, and user experiences.
                                My background combines product ownership, business analysis,
                                Agile delivery, SQL and data analysis, UAT and release
                                management, systems integration, and full-stack software
                                development.
                            </p>

                            <div
                                className="hero-actions"
                                style={{
                                    display: 'flex',
                                    gap: 12,
                                    flexWrap: 'wrap',
                                    marginTop: 22,
                                }}
                            >
                                <button
                                    type="button"
                                    className="pill"
                                    onClick={goToProjects}
                                >
                                    Explore My Work
                                </button>

                                <button
                                    type="button"
                                    className="modal-secondary"
                                    onClick={openResumeModal}
                                >
                                    View Resume
                                </button>

                                <button
                                    type="button"
                                    className="modal-secondary"
                                    onClick={openFormModal}
                                >
                                    Connect With Me
                                </button>
                            </div>

                            <div
                                className="tags"
                                aria-label="Professional expertise"
                                style={{
                                    marginTop: 24,
                                }}
                            >
                                <span className="tag">Product Ownership</span>
                                <span className="tag">Business Analysis</span>
                                <span className="tag">Agile Delivery</span>
                                <span className="tag">SQL & Data Analysis</span>
                                <span className="tag">UAT & QA</span>
                                <span className="tag">Release Management</span>
                                <span className="tag">Systems Integration</span>
                                <span className="tag">React</span>
                                <span className="tag">Node / Express</span>
                            </div>
                        </div>

                        {/* About card */}
                        <div
                            className="card hero-about-card"
                            aria-label="About Troy"
                        >
                            <h2>About</h2>

                            <p>
                                I’m Troy, a Senior Analyst in Digital Products with a
                                background that spans operations, product ownership,
                                enterprise systems, business analysis, and software
                                development.
                            </p>

                            <p>
                                My work focuses on translating business needs into practical
                                technology solutions, guiding products from requirements
                                through development and testing, coordinating stakeholders,
                                improving processes, and helping teams deliver reliable tools
                                that users can actually work with.
                            </p>

                            <p>
                                My full-stack development background gives me an additional
                                technical perspective when working with developers,
                                integrations, APIs, databases, application architecture,
                                testing, and production support.
                            </p>

                            <p className="muted">
                                Product-minded. Technically fluent. Operations grounded.
                            </p>

                            {/* CSPO Professional Credential */}
                            <div className="hero-credential">
                                <div className="hero-credential-image-wrap">
                                    <img
                                        src="/certs/CSPO.png"
                                        alt="Certified Scrum Product Owner CSPO badge"
                                        className="hero-credential-image"
                                    />
                                </div>

                                <div className="hero-credential-content">
                                    <span className="hero-credential-label">
                                        PROFESSIONAL CERTIFICATION
                                    </span>

                                    <h3>
                                        Certified Scrum Product Owner (CSPO)
                                    </h3>

                                    <p className="hero-credential-issuer">
                                        Scrum Alliance
                                    </p>

                                    <p className="hero-credential-description">
                                        Professional credential supporting product ownership,
                                        prioritization, stakeholder collaboration, and Agile
                                        product delivery.
                                    </p>

                                    <button
                                        type="button"
                                        className="hero-credential-link"
                                        onClick={() => setCertsOpen(true)}
                                    >
                                        View Certifications →
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Product & Technology Expertise */}
                <section
                    className="card"
                    id="expertise"
                >
                    <h2>
                        Product & Technology Expertise
                    </h2>

                    <p className="muted">
                        My experience sits at the intersection of business operations,
                        enterprise technology, product delivery, and software development.
                    </p>

                    <div
                        className="grid"
                        role="list"
                        style={{
                            marginTop: 16,
                        }}
                    >
                        <article className="card project" role="listitem">
                            <h3>Product Ownership</h3>
                            <p className="proj-desc">
                                Requirements definition, backlog refinement, prioritization,
                                stakeholder alignment, roadmap support, user feedback,
                                enhancement planning, and product governance.
                            </p>
                        </article>

                        <article className="card project" role="listitem">
                            <h3>Enterprise Applications</h3>
                            <p className="proj-desc">
                                Functional ownership, production support, systems integration,
                                application enhancements, business process improvement,
                                issue analysis, and cross-functional delivery.
                            </p>
                        </article>

                        <article className="card project" role="listitem">
                            <h3>Data & SQL</h3>
                            <p className="proj-desc">
                                SQL investigation, data validation, reconciliation, reporting,
                                root-cause analysis, production troubleshooting, and decision support.
                            </p>
                        </article>

                        <article className="card project" role="listitem">
                            <h3>UAT & Release Delivery</h3>
                            <p className="proj-desc">
                                Test planning, QA validation, UAT coordination, defect triage,
                                release readiness, stakeholder communication, deployment governance,
                                and post-release validation.
                            </p>
                        </article>

                        <article className="card project" role="listitem">
                            <h3>Full-Stack Development</h3>
                            <p className="proj-desc">
                                React, JavaScript, Node.js, Express, MongoDB, APIs,
                                authentication, responsive interfaces, testing,
                                serverless applications, and mobile development.
                            </p>
                        </article>

                        <article className="card project" role="listitem">
                            <h3>Business & Technology Bridge</h3>
                            <p className="proj-desc">
                                Translating business requirements into technical direction
                                while helping developers, users, operations teams, and
                                leadership stay aligned throughout delivery.
                            </p>
                        </article>
                    </div>
                </section>

                {/* Professional Impact */}
                <section
                    className="professional-impact"
                    id="impact"
                >
                    <div className="impact-header">
                        <span className="impact-eyebrow">
                            PRODUCT LEADERSHIP IN PRACTICE
                        </span>

                        <h2>
                            Professional Impact
                        </h2>

                        <p>
                            From requirements and data investigation to UAT, release governance,
                            production support, and user adoption, I work across the full product lifecycle.
                        </p>
                    </div>

                    <div
                        className="impact-pill-row"
                        aria-label="Professional impact areas"
                    >
                        <span className="impact-pill">Product Ownership</span>
                        <span className="impact-pill">Enterprise Systems</span>
                        <span className="impact-pill">Cross-Functional Leadership</span>
                        <span className="impact-pill">ADO & Agile Delivery</span>
                    </div>

                    <div
                        className="impact-grid"
                        role="list"
                    >
                        <article className="impact-card" role="listitem">
                            <span className="impact-number">01</span>
                            <h3>Enterprise Product Ownership</h3>
                            <p>
                                Own and guide the evolution of a business-critical enterprise platform,
                                translating operational needs into requirements, backlog priorities,
                                enhancements, testing strategies, and production releases.
                            </p>
                        </article>

                        <article className="impact-card" role="listitem">
                            <span className="impact-number">02</span>
                            <h3>Product Governance & Delivery Management</h3>
                            <p>
                                Own the Azure DevOps delivery process for the product, managing work from
                                intake and refinement through development, QA, UAT, change governance,
                                release readiness, deployment, and post-release validation. Maintain
                                backlog structure, workflow visibility, priorities, and coordination
                                across development and business stakeholders.
                            </p>
                        </article>

                        <article className="impact-card" role="listitem">
                            <span className="impact-number">03</span>
                            <h3>User Council & UAT Program</h3>
                            <p>
                                Created a formal user council and UAT framework that brings business users
                                directly into product development through structured testing, feedback,
                                release readiness, and continuous improvement.
                            </p>
                        </article>

                        <article className="impact-card" role="listitem">
                            <span className="impact-number">04</span>
                            <h3>Enterprise Data & System Mapping</h3>
                            <p>
                                Conduct deep SQL and data analysis across interconnected enterprise systems
                                to map business processes, trace transactions, reconcile data,
                                investigate production issues, and support technical solution design.
                            </p>
                        </article>

                        <article className="impact-card" role="listitem">
                            <span className="impact-number">05</span>
                            <h3>Systems Integration & Process Modernization</h3>
                            <p>
                                Partner with development, operations, finance, and other stakeholders
                                on integrations and workflow improvements that connect enterprise platforms
                                and reduce operational friction.
                            </p>
                        </article>

                        <article className="impact-card" role="listitem">
                            <span className="impact-number">06</span>
                            <h3>Knowledge & Digital Experience</h3>
                            <p>
                                Designed centralized digital workspaces, documentation experiences,
                                release communications, training resources, and self-service content
                                to improve product adoption and give users better access to information.
                            </p>
                        </article>
                    </div>
                </section>

                {/* Projects */}
                <section
                    id="projects"
                    tabIndex={-1}
                >
                    <h2>
                        Development Portfolio
                    </h2>

                    <p className="muted">
                        These projects demonstrate the hands-on software development
                        foundation that complements my product and enterprise technology work.
                    </p>

                    <div
                        className="grid"
                        role="list"
                    >
                        {projects.map((p) => (
                            <ProjectCard
                                key={p.title}
                                {...p}
                                highlights={PROJECT_HIGHLIGHTS[p.title]}
                            />
                        ))}
                    </div>
                </section>

                {/* Contact */}
                <section
                    id="contact"
                    className="card"
                >
                    <h2>
                        Let’s Connect
                    </h2>

                    <p className="muted">
                        Interested in product leadership, enterprise technology,
                        digital transformation, or software development? I’d be happy to connect.
                    </p>

                    <div
                        className="contact"
                        role="list"
                        style={{
                            marginTop: '12px',
                        }}
                    >
                        <button
                            className="modal-secondary btn-sm"
                            type="button"
                            onClick={openChoiceModal}
                        >
                            Email Me
                        </button>

                        <a
                            className="modal-secondary btn-sm"
                            role="listitem"
                            href={LINKEDIN}
                            target="_blank"
                            rel="noreferrer"
                        >
                            LinkedIn
                        </a>

                        <a
                            className="modal-secondary btn-sm"
                            role="listitem"
                            href={GITHUB}
                            target="_blank"
                            rel="noreferrer"
                        >
                            GitHub
                        </a>

                        <a
                            className="modal-secondary btn-sm"
                            role="listitem"
                            href={X}
                            target="_blank"
                            rel="noreferrer"
                        >
                            X
                        </a>

                        <a
                            className="modal-secondary btn-sm"
                            role="listitem"
                            href={MEDIUM}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Medium
                        </a>
                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer className="footer">
                <div className="container footer-actions">
                    <small>
                        © {new Date().getFullYear()} Troy Michael Oubre.
                        Built with React + Vite.
                    </small>

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

            {/* Contact Form Modal */}
            <Modal
                isOpen={isFormOpen}
                onClose={closeFormModal}
                title="Get in touch"
            >
                <form onSubmit={handleFormSubmit}>
                    <label htmlFor="name">
                        Your Name:
                    </label>

                    <input
                        id="name"
                        type="text"
                        name="name"
                        required
                    />

                    <label
                        htmlFor="email"
                        style={{ marginTop: 10 }}
                    >
                        Your Email:
                    </label>

                    <input
                        id="email"
                        type="email"
                        name="email"
                        required
                    />

                    <label
                        htmlFor="message"
                        style={{ marginTop: 10 }}
                    >
                        Message:
                    </label>

                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        required
                    />

                    <input
                        type="text"
                        name="_gotcha"
                        style={{ display: 'none' }}
                        tabIndex={-1}
                        autoComplete="off"
                    />

                    <div
                        style={{
                            display: 'flex',
                            gap: 10,
                            marginTop: 14,
                        }}
                    >
                        <button
                            type="submit"
                            className="pill"
                            disabled={formStatus.state === 'sending'}
                        >
                            {formStatus.state === 'sending'
                                ? 'Sending…'
                                : 'Send Message'}
                        </button>

                        <button
                            type="button"
                            className="modal-secondary"
                            onClick={closeFormModal}
                        >
                            Cancel
                        </button>
                    </div>

                    {formStatus.state !== 'idle' && (
                        <p
                            className="muted"
                            style={{ marginTop: 10 }}
                        >
                            {formStatus.msg}
                        </p>
                    )}
                </form>
            </Modal>

            {/* Contact Choice Modal */}
            <Modal
                isOpen={isChoiceOpen}
                onClose={closeChoiceModal}
                title="Contact options"
            >
                <p
                    className="muted"
                    style={{ marginBottom: 14 }}
                >
                    How would you like to get in touch?
                </p>

                <div
                    style={{
                        display: 'flex',
                        gap: 10,
                        flexWrap: 'wrap',
                    }}
                >
                    <button
                        type="button"
                        className="pill"
                        onClick={handleEmailClient}
                    >
                        Open Email Client
                    </button>

                    <button
                        type="button"
                        className="modal-secondary"
                        onClick={handleUseForm}
                    >
                        Use Contact Form
                    </button>
                </div>
            </Modal>

            {/* Resume Modal */}
            <Modal
                isOpen={isResumeOpen}
                onClose={closeResumeModal}
                title="Resume"
            >
                <div
                    style={{
                        maxHeight: '70vh',
                        overflow: 'auto',
                        padding: '0 16px',
                    }}
                >
                    <Resume inModal />
                </div>
            </Modal>

            {/* Certifications Modal */}
            <CertsModal
                isOpen={certsOpen}
                onClose={() => setCertsOpen(false)}
            />

            {/* Toast */}
            <div
                className={`toast ${toast.visible ? 'show' : ''} ${toast.type}`}
                role="status"
                aria-live="polite"
                style={{
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
    );
}