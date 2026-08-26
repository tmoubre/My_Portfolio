// src/App.jsx

import React, { useEffect, useRef, useState } from 'react';

import {
    Home,
    Folder,
    Award,
    FileText,
    Mail,
    CheckCircle,
    GitBranch,
    Database,
    LayoutDashboard,
    Share2,
    Code2,
    Circle,
    Link as LinkIcon,
    Send,
    ArrowRight,
    Quote,
    ChevronDown,
} from 'lucide-react';

import ProjectCard from './components/ProjectCard.jsx';
import Modal from './components/Modal.jsx';
import Resume from './components/Resume.jsx';
import projects from './data/projects.js';
import CertsModal from './components/CertsModal.jsx';


// ============================================================
// PERSONAL LINKS
// ============================================================

const EMAIL = 'oubre1@att.net';
const GITHUB = 'https://github.com/tmoubre';
const LINKEDIN =
    'https://www.linkedin.com/in/troy-oubre-32170a32/';
const MEDIUM = 'https://medium.com/@scinetbr';
const X = 'https://x.com/troydevelops';


// ============================================================
// PROJECT HIGHLIGHTS
// ============================================================

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


// ============================================================
// CONTACT ENDPOINT
// ============================================================

const IS_PROD =
    typeof import.meta !== 'undefined' &&
    import.meta.env?.PROD === true;

const CONTACT_URL = IS_PROD
    ? '/.netlify/functions/contact'
    : 'https://formspree.io/f/xblkvnzg';


// ============================================================
// APP
// ============================================================

export default function App() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isChoiceOpen, setIsChoiceOpen] = useState(false);
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const [certsOpen, setCertsOpen] = useState(false);
    const [portfolioOpen, setPortfolioOpen] = useState(false);

    const [formStatus, setFormStatus] = useState({
        state: 'idle',
        msg: '',
    });

    const [toast, setToast] = useState({
        visible: false,
        msg: '',
        type: 'success',
    });

    const toastTimerRef = useRef(null);


    // ==========================================================
    // TOAST
    // ==========================================================

    const showToast = (
        message,
        type = 'success',
        duration = 3500
    ) => {
        setToast({
            visible: true,
            msg: message,
            type,
        });

        if (toastTimerRef.current) {
            clearTimeout(toastTimerRef.current);
        }

        toastTimerRef.current = setTimeout(() => {
            setToast((current) => ({
                ...current,
                visible: false,
            }));
        }, duration);
    };


    // ==========================================================
    // INITIAL LOAD
    // ==========================================================

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


    // ==========================================================
    // NAVIGATION
    // ==========================================================

    const scrollHome = () => {
        document
            .getElementById('home')
            ?.scrollIntoView({
                behavior: 'smooth',
            });
    };

    const scrollExpertise = () => {
        document
            .getElementById('expertise')
            ?.scrollIntoView({
                behavior: 'smooth',
            });
    };


    // ==========================================================
    // MODALS
    // ==========================================================

    const openPortfolioModal = () => {
        setPortfolioOpen(true);
    };

    const closePortfolioModal = () => {
        setPortfolioOpen(false);
    };

    const openResumeModal = () => {
        setIsResumeOpen(true);
    };

    const closeResumeModal = () => {
        setIsResumeOpen(false);
    };

    const openFormModal = () => {
        setIsFormOpen(true);
    };

    const closeFormModal = () => {
        setIsFormOpen(false);

        setFormStatus({
            state: 'idle',
            msg: '',
        });
    };

    const openChoiceModal = () => {
        setIsChoiceOpen(true);
    };

    const closeChoiceModal = () => {
        setIsChoiceOpen(false);
    };


    // ==========================================================
    // CONTACT
    // ==========================================================

    const handleEmailClient = () => {
        window.location.href = `mailto:${EMAIL}`;
        closeChoiceModal();
    };

    const handleUseForm = () => {
        closeChoiceModal();
        openFormModal();
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        setFormStatus({
            state: 'sending',
            msg: '',
        });

        try {
            const form = event.currentTarget;

            const data = Object.fromEntries(
                new FormData(form).entries()
            );

            const response = await fetch(CONTACT_URL, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                let msg =
                    'Something went wrong. Please try again or email me directly.';

                try {
                    const json = await response.json();

                    if (json?.errors?.length) {
                        msg = json.errors
                            .map((error) => error.message)
                            .join(', ');
                    }
                } catch {
                    // Keep fallback
                }

                setFormStatus({
                    state: 'error',
                    msg,
                });

                return;
            }

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


    // ==========================================================
    // RENDER
    // ==========================================================

    return (
        <div className="site-shell">

            {/* =====================================================
          DESKTOP LEFT NAV
          ===================================================== */}

            <aside className="side-nav">

                <div className="side-nav-main">

                    <button
                        type="button"
                        className="side-nav-item active"
                        onClick={scrollHome}
                    >
                        <span className="side-nav-icon">
                            <Home size={24} />
                        </span>

                        <span className="side-nav-label">
                            Home
                        </span>
                    </button>


                    <button
                        type="button"
                        className="side-nav-item"
                        onClick={openPortfolioModal}
                    >
                        <span className="side-nav-icon">
                            <Folder size={24} />
                        </span>

                        <span className="side-nav-label">
                            Projects
                        </span>
                    </button>


                    <button
                        type="button"
                        className="side-nav-item"
                        onClick={() => setCertsOpen(true)}
                    >
                        <span className="side-nav-icon">
                            <Award size={24} />
                        </span>

                        <span className="side-nav-label">
                            Certs
                        </span>
                    </button>


                    <button
                        type="button"
                        className="side-nav-item"
                        onClick={openResumeModal}
                    >
                        <span className="side-nav-icon">
                            <FileText size={24} />
                        </span>

                        <span className="side-nav-label">
                            Resume
                        </span>
                    </button>


                    <button
                        type="button"
                        className="side-nav-item"
                        onClick={openFormModal}
                    >
                        <span className="side-nav-icon">
                            <Mail size={24} />
                        </span>

                        <span className="side-nav-label">
                            Contact
                        </span>
                    </button>

                </div>


                {/* SOCIAL LINKS */}

                <div className="side-social">

                    <a
                        href={GITHUB}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                    >
                        GH
                    </a>

                    <a
                        href={LINKEDIN}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                    >
                        in
                    </a>

                    <a
                        href={MEDIUM}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Medium"
                    >
                        M
                    </a>

                    <a
                        href={X}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="X"
                    >
                        X
                    </a>

                </div>

            </aside>


            {/* =====================================================
          HEADER
          ===================================================== */}

            <header className="nav">

                <div className="container nav-inner">

                    <div className="brand-lockup">

                        <div className="brand-monogram">
                            TO
                        </div>

                        <div className="brand-copy">

                            <div className="brand-name">
                                Troy M. Oubre
                            </div>

                            <div className="brand-tagline">
                                <span>BUILD</span>
                                <span>•</span>
                                <span>IMPROVE</span>
                                <span>•</span>
                                <span>DELIVER</span>
                            </div>

                        </div>

                    </div>


                    <nav className="mobile-nav">

                        <button
                            type="button"
                            className="mobile-nav-link"
                            onClick={scrollHome}
                        >
                            <Home size={18} />
                        </button>

                        <button
                            type="button"
                            className="mobile-nav-link"
                            onClick={openPortfolioModal}
                        >
                            <Folder size={18} />
                        </button>

                        <button
                            type="button"
                            className="mobile-nav-link"
                            onClick={() => setCertsOpen(true)}
                        >
                            <Award size={18} />
                        </button>

                        <button
                            type="button"
                            className="mobile-nav-link"
                            onClick={openResumeModal}
                        >
                            <FileText size={18} />
                        </button>

                        <button
                            type="button"
                            className="mobile-nav-link"
                            onClick={openFormModal}
                        >
                            <Mail size={18} />
                        </button>

                    </nav>

                </div>

            </header>


            {/* =====================================================
          CONTENT
          ===================================================== */}

            <div className="page-content">

                <main className="container">

                    {/* =================================================
              HERO
              ================================================= */}

                    <section
                        className="hero"
                        id="home"
                    >

                        <div className="hero-frame">

                            <div className="hero-main-grid">

                                <div className="hero-primary">

                                    <div className="hero-kicker">
                                        PRODUCT • TECHNOLOGY • DELIVERY
                                    </div>

                                    <h1 className="hero-title">
                                        Senior Analyst,
                                        <br />
                                        Digital Products
                                    </h1>

                                    <div className="hero-role">
                                        Product Owner
                                        <span>•</span>
                                        Technology Leader
                                        <span>•</span>
                                        Full-Stack Developer
                                    </div>

                                    <div className="hero-divider">
                                        <span />
                                    </div>

                                    <div className="hero-summary">

                                        <p>
                                            I build solutions at the intersection of business,
                                            data, and technology. As a functional lead and
                                            Product Owner, I translate complex operational needs
                                            into practical, scalable solutions while guiding
                                            delivery from requirements through testing, release,
                                            and production support.
                                        </p>

                                        <p>
                                            My background combines product ownership,
                                            enterprise applications, SQL and data analysis,
                                            Azure DevOps delivery governance, systems integration,
                                            UAT, process improvement, and hands-on software
                                            development.
                                        </p>

                                    </div>


                                    {/* CAPABILITY PILLS */}

                                    <div className="hero-capabilities">

                                        <span className="capability-pill">
                                            <span className="cap-icon">
                                                <CheckCircle size={18} />
                                            </span>
                                            Product Owner
                                        </span>

                                        <span className="capability-pill">
                                            <span className="cap-icon">
                                                <GitBranch size={18} />
                                            </span>
                                            Azure DevOps
                                        </span>

                                        <span className="capability-pill">
                                            <span className="cap-icon">
                                                <Database size={18} />
                                            </span>
                                            SQL
                                        </span>

                                        <span className="capability-pill">
                                            <span className="cap-icon">
                                                <LayoutDashboard size={18} />
                                            </span>
                                            Power Apps
                                        </span>

                                        <span className="capability-pill">
                                            <span className="cap-icon">
                                                <Share2 size={18} />
                                            </span>
                                            SharePoint
                                        </span>

                                        <span className="capability-pill">
                                            <span className="cap-icon">
                                                <Code2 size={18} />
                                            </span>
                                            JavaScript
                                        </span>

                                        <span className="capability-pill">
                                            <span className="cap-icon">
                                                <Circle size={18} />
                                            </span>
                                            React
                                        </span>

                                        <span className="capability-pill">
                                            <span className="cap-icon">
                                                <LinkIcon size={18} />
                                            </span>
                                            API Integration
                                        </span>

                                    </div>


                                    {/* CSPO */}

                                    <div className="hero-cert-card">

                                        <div className="hero-cert-image-wrap">

                                            <img
                                                src="/certs/CSPO.png"
                                                alt="Certified Scrum Product Owner CSPO badge"
                                                className="hero-cert-image"
                                            />

                                        </div>


                                        <div className="hero-cert-divider" />


                                        <div className="hero-cert-copy">

                                            <span className="hero-cert-label">
                                                CERTIFIED
                                            </span>

                                            <h2>
                                                Certified Scrum Product Owner (CSPO)
                                            </h2>

                                            <strong>
                                                Scrum Alliance
                                            </strong>

                                            <p>
                                                Professional credential supporting Agile product
                                                leadership, prioritization, stakeholder alignment,
                                                and iterative delivery of user-focused value.
                                            </p>

                                        </div>


                                        <button
                                            type="button"
                                            className="hero-cert-link"
                                            onClick={() => setCertsOpen(true)}
                                        >
                                            View Certifications
                                            <ArrowRight size={16} />
                                        </button>

                                    </div>

                                </div>


                                {/* RIGHT SIDE */}

                                <aside className="hero-side">

                                    <div className="identity-panel">

                                        <div className="identity-mark">
                                            TO
                                        </div>

                                        <span className="identity-eyebrow">
                                            TROY M. OUBRE
                                        </span>

                                        <h2>
                                            Product-minded.
                                            <br />
                                            Technically fluent.
                                        </h2>

                                        <p>
                                            Operations grounded.
                                        </p>

                                    </div>


                                    <div className="hero-action-panel">

                                        <button
                                            type="button"
                                            className="hero-action hero-action-primary"
                                            onClick={openFormModal}
                                        >
                                            <span className="hero-action-icon">
                                                <Send size={20} />
                                            </span>

                                            <span>
                                                Get in Touch
                                            </span>

                                            <ArrowRight
                                                className="hero-action-arrow"
                                                size={18}
                                            />
                                        </button>


                                        <button
                                            type="button"
                                            className="hero-action"
                                            onClick={openResumeModal}
                                        >
                                            <span className="hero-action-icon">
                                                <FileText size={20} />
                                            </span>

                                            <span>
                                                View Resume
                                            </span>

                                            <ArrowRight
                                                className="hero-action-arrow"
                                                size={18}
                                            />
                                        </button>


                                        <button
                                            type="button"
                                            className="hero-action"
                                            onClick={openPortfolioModal}
                                        >
                                            <span className="hero-action-icon">
                                                <Folder size={20} />
                                            </span>

                                            <span>
                                                Technical Portfolio
                                            </span>

                                            <ArrowRight
                                                className="hero-action-arrow"
                                                size={18}
                                            />
                                        </button>

                                    </div>


                                    <div className="hero-quote">

                                        <Quote
                                            className="quote-icon"
                                            size={30}
                                        />

                                        <blockquote>
                                            Technology is most powerful when it solves
                                            real problems for real people.
                                        </blockquote>

                                        <cite>
                                            — Troy Oubre
                                        </cite>

                                    </div>

                                </aside>

                            </div>


                            <button
                                type="button"
                                className="hero-scroll"
                                onClick={scrollExpertise}
                            >
                                <span>
                                    SCROLL TO EXPLORE
                                </span>

                                <ChevronDown size={21} />
                            </button>

                        </div>

                    </section>


                    {/* =================================================
              EXPERTISE
              ================================================= */}

                    <section
                        className="card expertise-section"
                        id="expertise"
                    >

                        <div className="section-kicker">
                            CAPABILITY
                        </div>

                        <h2>
                            Product & Technology Expertise
                        </h2>

                        <p className="muted">
                            My experience sits at the intersection of business operations,
                            enterprise technology, product delivery,
                            and software development.
                        </p>


                        <div className="grid">

                            <article className="card project">
                                <h3>Product Ownership</h3>

                                <p className="proj-desc">
                                    Requirements definition, backlog refinement,
                                    prioritization, stakeholder alignment, roadmap support,
                                    user feedback, enhancement planning,
                                    and product governance.
                                </p>
                            </article>


                            <article className="card project">
                                <h3>Enterprise Applications</h3>

                                <p className="proj-desc">
                                    Functional ownership, production support,
                                    systems integration, application enhancements,
                                    business process improvement, issue analysis,
                                    and cross-functional delivery.
                                </p>
                            </article>


                            <article className="card project">
                                <h3>Data & SQL</h3>

                                <p className="proj-desc">
                                    SQL investigation, data validation, reconciliation,
                                    reporting, root-cause analysis,
                                    production troubleshooting, and decision support.
                                </p>
                            </article>


                            <article className="card project">
                                <h3>UAT & Release Delivery</h3>

                                <p className="proj-desc">
                                    Test planning, QA validation, UAT coordination,
                                    defect triage, release readiness,
                                    stakeholder communication, deployment governance,
                                    and post-release validation.
                                </p>
                            </article>


                            <article className="card project">
                                <h3>Full-Stack Development</h3>

                                <p className="proj-desc">
                                    React, JavaScript, Node.js, Express, MongoDB,
                                    APIs, authentication, responsive interfaces,
                                    testing, serverless applications,
                                    and mobile development.
                                </p>
                            </article>


                            <article className="card project">
                                <h3>Business & Technology Bridge</h3>

                                <p className="proj-desc">
                                    Translating business requirements into technical
                                    direction while helping developers, users,
                                    operations teams, and leadership stay aligned
                                    throughout delivery.
                                </p>
                            </article>

                        </div>

                    </section>


                    {/* =================================================
              PROFESSIONAL IMPACT
              ================================================= */}

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
                                From requirements and data investigation to UAT,
                                release governance, production support, and user adoption,
                                I work across the full product lifecycle.
                            </p>

                        </div>


                        <div className="impact-pill-row">

                            <span className="impact-pill">
                                Product Ownership
                            </span>

                            <span className="impact-pill">
                                Enterprise Systems
                            </span>

                            <span className="impact-pill">
                                Cross-Functional Leadership
                            </span>

                            <span className="impact-pill">
                                ADO & Agile Delivery
                            </span>

                        </div>


                        <div className="impact-grid">

                            <article className="impact-card">
                                <span className="impact-number">01</span>

                                <h3>
                                    Enterprise Product Ownership
                                </h3>

                                <p>
                                    Own and guide the evolution of a business-critical
                                    enterprise platform, translating operational needs into
                                    requirements, backlog priorities, enhancements,
                                    testing strategies, and production releases.
                                </p>
                            </article>


                            <article className="impact-card">
                                <span className="impact-number">02</span>

                                <h3>
                                    Product Governance & Delivery Management
                                </h3>

                                <p>
                                    Own the Azure DevOps delivery process for the product,
                                    managing work from intake and refinement through
                                    development, QA, UAT, change governance,
                                    release readiness, deployment,
                                    and post-release validation.
                                </p>
                            </article>


                            <article className="impact-card">
                                <span className="impact-number">03</span>

                                <h3>
                                    User Council & UAT Program
                                </h3>

                                <p>
                                    Created a formal user council and UAT framework that
                                    brings business users directly into product development
                                    through structured testing, feedback,
                                    release readiness, and continuous improvement.
                                </p>
                            </article>


                            <article className="impact-card">
                                <span className="impact-number">04</span>

                                <h3>
                                    Enterprise Data & System Mapping
                                </h3>

                                <p>
                                    Conduct deep SQL and data analysis across interconnected
                                    enterprise systems to map business processes,
                                    trace transactions, reconcile data,
                                    investigate production issues,
                                    and support technical solution design.
                                </p>
                            </article>


                            <article className="impact-card">
                                <span className="impact-number">05</span>

                                <h3>
                                    Systems Integration & Process Modernization
                                </h3>

                                <p>
                                    Partner with development, operations, finance,
                                    and other stakeholders on integrations and workflow
                                    improvements that connect enterprise platforms
                                    and reduce operational friction.
                                </p>
                            </article>


                            <article className="impact-card">
                                <span className="impact-number">06</span>

                                <h3>
                                    Knowledge & Digital Experience
                                </h3>

                                <p>
                                    Designed centralized digital workspaces,
                                    documentation experiences, release communications,
                                    training resources, and self-service content
                                    to improve product adoption and give users
                                    better access to information.
                                </p>
                            </article>

                        </div>


                        <div className="impact-portfolio-cta">

                            <div>

                                <span className="impact-portfolio-label">
                                    HANDS-ON TECHNICAL FOUNDATION
                                </span>

                                <h3>
                                    Software Development Portfolio
                                </h3>

                                <p>
                                    Explore the applications and development projects
                                    behind my full-stack technical foundation.
                                </p>

                            </div>


                            <button
                                type="button"
                                className="hero-action impact-portfolio-button"
                                onClick={openPortfolioModal}
                            >
                                <Folder size={18} />

                                <span>
                                    View Technical Portfolio
                                </span>

                                <ArrowRight size={18} />
                            </button>

                        </div>

                    </section>


                    {/* =================================================
              CONTACT
              ================================================= */}

                    <section
                        id="contact"
                        className="card contact-section"
                    >

                        <div className="section-kicker">
                            CONNECT
                        </div>

                        <h2>
                            Let’s Connect
                        </h2>

                        <p className="muted">
                            Interested in product leadership, enterprise technology,
                            digital transformation, or software development?
                            I’d be happy to connect.
                        </p>


                        <div className="contact">

                            <button
                                className="modal-secondary btn-sm"
                                type="button"
                                onClick={openChoiceModal}
                            >
                                Email Me
                            </button>

                            <a
                                className="modal-secondary btn-sm"
                                href={LINKEDIN}
                                target="_blank"
                                rel="noreferrer"
                            >
                                LinkedIn
                            </a>

                            <a
                                className="modal-secondary btn-sm"
                                href={GITHUB}
                                target="_blank"
                                rel="noreferrer"
                            >
                                GitHub
                            </a>

                            <a
                                className="modal-secondary btn-sm"
                                href={X}
                                target="_blank"
                                rel="noreferrer"
                            >
                                X
                            </a>

                            <a
                                className="modal-secondary btn-sm"
                                href={MEDIUM}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Medium
                            </a>

                        </div>

                    </section>

                </main>


                {/* ===================================================
            FOOTER
            =================================================== */}

                <footer className="footer">

                    <div className="container footer-actions">

                        <div>

                            <strong className="footer-name">
                                Troy M. Oubre
                            </strong>

                            <small>
                                © {new Date().getFullYear()} • Built with React + Vite
                            </small>

                        </div>


                        <div className="actions">

                            <button
                                type="button"
                                className="modal-secondary btn-sm"
                                onClick={openPortfolioModal}
                            >
                                Technical Portfolio
                            </button>

                            <button
                                type="button"
                                className="modal-secondary btn-sm"
                                onClick={openResumeModal}
                            >
                                Resume
                            </button>

                            <button
                                type="button"
                                className="modal-secondary btn-sm"
                                onClick={openFormModal}
                            >
                                Get in touch
                            </button>

                        </div>

                    </div>

                </footer>

            </div>


            {/* =====================================================
          TECHNICAL PORTFOLIO
          ===================================================== */}

            <Modal
                isOpen={portfolioOpen}
                onClose={closePortfolioModal}
                title="Technical Portfolio"
            >

                <div className="portfolio-modal-wrap">

                    <div className="portfolio-modal-intro">

                        <span className="portfolio-modal-eyebrow">
                            SOFTWARE DEVELOPMENT
                        </span>

                        <p>
                            These projects demonstrate the hands-on software development
                            foundation that complements my product ownership and enterprise
                            technology work.
                        </p>

                    </div>


                    <div className="portfolio-modal-grid">

                        {projects.map((project) => (
                            <ProjectCard
                                key={project.title}
                                {...project}
                                highlights={
                                    PROJECT_HIGHLIGHTS[project.title]
                                }
                            />
                        ))}

                    </div>


                    <div className="portfolio-modal-footer">

                        <p>
                            Additional source code and development work are
                            available through GitHub.
                        </p>

                        <a
                            href={GITHUB}
                            target="_blank"
                            rel="noreferrer"
                            className="modal-secondary"
                        >
                            Visit GitHub
                        </a>

                    </div>

                </div>

            </Modal>


            {/* =====================================================
          CONTACT FORM
          ===================================================== */}

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


                    <label htmlFor="email">
                        Your Email:
                    </label>

                    <input
                        id="email"
                        type="email"
                        name="email"
                        required
                    />


                    <label htmlFor="message">
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


                    <div className="form-actions">

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
                        <p className="muted form-status">
                            {formStatus.msg}
                        </p>
                    )}

                </form>

            </Modal>


            {/* =====================================================
          CONTACT OPTIONS
          ===================================================== */}

            <Modal
                isOpen={isChoiceOpen}
                onClose={closeChoiceModal}
                title="Contact options"
            >

                <p className="muted">
                    How would you like to get in touch?
                </p>


                <div className="form-actions">

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


            {/* =====================================================
          RESUME
          ===================================================== */}

            <Modal
                isOpen={isResumeOpen}
                onClose={closeResumeModal}
                title="Resume"
            >

                <div className="resume-modal-scroll">
                    <Resume inModal />
                </div>

            </Modal>


            {/* =====================================================
          CERTIFICATIONS
          ===================================================== */}

            <CertsModal
                isOpen={certsOpen}
                onClose={() => setCertsOpen(false)}
            />


            {/* =====================================================
          TOAST
          ===================================================== */}

            <div
                className={`toast ${toast.visible ? 'show' : ''
                    } ${toast.type}`}
                role="status"
                aria-live="polite"
            >
                {toast.msg}
            </div>

        </div>
    );
}