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
];

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

    // --- Toast ---
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

    const goToBoards = () => {
        const el = document.getElementById('boards');

        if (el) {
            el.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });

            if (typeof history !== 'undefined') {
                history.replaceState(null, '', '#boards');
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

    // Submit via Netlify Function (prod) or Formspree (dev)
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
                            onClick={goToBoards}
                        >
                            Trello Boards
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

                        {/* Hero introduction */}
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

                            {/* Primary hero actions */}
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

                            {/* Expertise tags */}
                            <div
                                className="tags"
                                aria-label="Professional expertise"
                                style={{
                                    marginTop: 24,
                                }}
                            >
                                <span className="tag">
                                    Product Ownership
                                </span>

                                <span className="tag">
                                    Business Analysis
                                </span>

                                <span className="tag">
                                    Agile Delivery
                                </span>

                                <span className="tag">
                                    SQL & Data Analysis
                                </span>

                                <span className="tag">
                                    UAT & QA
                                </span>

                                <span className="tag">
                                    Release Management
                                </span>

                                <span className="tag">
                                    Systems Integration
                                </span>

                                <span className="tag">
                                    React
                                </span>

                                <span className="tag">
                                    Node / Express
                                </span>
                            </div>
                        </div>

                        {/* About card */}
                        <div
                            className="card"
                            aria-label="About Troy"
                        >
                            <h2>
                                About
                            </h2>

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
                        </div>

                    </div>
                </section>

                {/* Professional Focus */}
                <section
                    className="card"
                    id="expertise"
                >
                    <h2>
                        Product & Technology Expertise
                    </h2>

                    <p className="muted">
                        My experience sits at the intersection of business operations,
                        enterprise technology, product delivery, and software
                        development.
                    </p>

                    <div
                        className="grid"
                        role="list"
                        style={{
                            marginTop: 16,
                        }}
                    >

                        <article
                            className="card project"
                            role="listitem"
                        >
                            <h3>
                                Product Ownership
                            </h3>

                            <p className="proj-desc">
                                Requirements definition, backlog refinement, prioritization,
                                stakeholder alignment, roadmap support, user feedback,
                                enhancement planning, and product governance.
                            </p>
                        </article>

                        <article
                            className="card project"
                            role="listitem"
                        >
                            <h3>
                                Enterprise Applications
                            </h3>

                            <p className="proj-desc">
                                Functional ownership, production support, systems
                                integration, application enhancements, business process
                                improvement, issue analysis, and cross-functional delivery.
                            </p>
                        </article>

                        <article
                            className="card project"
                            role="listitem"
                        >
                            <h3>
                                Data & SQL
                            </h3>

                            <p className="proj-desc">
                                SQL investigation, data validation, reconciliation,
                                reporting, root-cause analysis, production troubleshooting,
                                and decision support.
                            </p>
                        </article>

                        <article
                            className="card project"
                            role="listitem"
                        >
                            <h3>
                                UAT & Release Delivery
                            </h3>

                            <p className="proj-desc">
                                Test planning, QA validation, UAT coordination, defect
                                triage, release readiness, stakeholder communication,
                                deployment governance, and post-release validation.
                            </p>
                        </article>

                        <article
                            className="card project"
                            role="listitem"
                        >
                            <h3>
                                Full-Stack Development
                            </h3>

                            <p className="proj-desc">
                                React, JavaScript, Node.js, Express, MongoDB, APIs,
                                authentication, responsive interfaces, testing,
                                serverless applications, and mobile development.
                            </p>
                        </article>

                        <article
                            className="card project"
                            role="listitem"
                        >
                            <h3>
                                Business & Technology Bridge
                            </h3>

                            <p className="proj-desc">
                                Translating business requirements into technical direction
                                while helping developers, users, operations teams, and
                                leadership stay aligned throughout delivery.
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
                        foundation that complements my product and enterprise technology
                        work.
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

                {/* Process & Trello Boards */}
                <section
                    id="boards"
                    className="card"
                    tabIndex={-1}
                >
                    <h2>
                        Development Process & Trello Boards
                    </h2>

                    <p className="muted">
                        These boards were created during my full-stack development
                        program to practice Kanban-style workflow management and
                        organize project tasks. They remain here as examples of my
                        development learning process.
                    </p>

                    <div
                        className="grid"
                        role="list"
                        style={{
                            marginTop: 10,
                        }}
                    >
                        {TRELLO_BOARDS.map((b) => (
                            <article
                                key={b.title}
                                className="card project"
                                role="listitem"
                            >
                                <div className="proj-title">

                                    <h3>
                                        {b.title}
                                    </h3>

                                    <div className="proj-links">
                                        <a
                                            href={b.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            View Board
                                        </a>
                                    </div>

                                </div>

                                <p className="proj-desc">
                                    Project workflow and task tracking used while completing
                                    software development coursework and hands-on application
                                    builds.
                                </p>
                            </article>
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
                        digital transformation, or software development? I’d be happy
                        to connect.
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
                        style={{
                            marginTop: 10,
                        }}
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
                        style={{
                            marginTop: 10,
                        }}
                    >
                        Message:
                    </label>

                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        required
                    />

                    {/* Honeypot */}
                    <input
                        type="text"
                        name="_gotcha"
                        style={{
                            display: 'none',
                        }}
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
                            style={{
                                marginTop: 10,
                            }}
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
                    style={{
                        marginBottom: 14,
                    }}
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