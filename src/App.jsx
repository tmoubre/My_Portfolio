import React, { useEffect, useRef, useState } from 'react';

import {
    Home,
    Briefcase,
    Folder,
    Award,
    FileText,
    Mail,
    CheckCircle,
    Database,
    LayoutDashboard,
    Share2,
    Link as LinkIcon,
    Send,
    ArrowRight,
    Quote,
    ChevronDown,
} from 'lucide-react';

import {
    FaGithub,
    FaLinkedinIn,
    FaMedium,
    FaXTwitter,
} from 'react-icons/fa6';

import {
    SiReact,
    SiJavascript,
    SiNodedotjs,
} from 'react-icons/si';

import {
    VscAzureDevops,
} from 'react-icons/vsc';

import ProjectCard from './components/ProjectCard.jsx';
import Modal from './components/Modal.jsx';
import Resume from './components/Resume.jsx';
import CertsModal from './components/CertsModal.jsx';
import ExperienceModal from './components/ExperienceModal.jsx';

import projects from './data/projects.js';

const GITHUB = 'https://github.com/tmoubre';

const LINKEDIN =
    'https://www.linkedin.com/in/troy-oubre-32170a32/';

const MEDIUM =
    'https://medium.com/@scinetbr';

const X =
    'https://x.com/troydevelops';


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


const IS_PROD =
    typeof import.meta !== 'undefined' &&
    import.meta.env?.PROD === true;


const CONTACT_URL = IS_PROD
    ? '/.netlify/functions/contact'
    : 'https://formspree.io/f/xblkvnzg';


export default function App() {

    const [experienceOpen, setExperienceOpen] =
        useState(false);

    const [experienceTab, setExperienceTab] =
        useState('expertise');

    const [portfolioOpen, setPortfolioOpen] =
        useState(false);

    const [certsOpen, setCertsOpen] =
        useState(false);

    const [isResumeOpen, setIsResumeOpen] =
        useState(false);

    const [isFormOpen, setIsFormOpen] =
        useState(false);

    const [activeNav, setActiveNav] =
        useState('home');


    const [formStatus, setFormStatus] =
        useState({
            state: 'idle',
            msg: '',
        });


    const [toast, setToast] =
        useState({
            visible: false,
            msg: '',
            type: 'success',
        });


    const toastTimerRef =
        useRef(null);


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


        toastTimerRef.current =
            setTimeout(() => {

                setToast((current) => ({
                    ...current,
                    visible: false,
                }));

            }, duration);
    };


    useEffect(() => {

        if (window.location.hash === '#contact') {

            setIsFormOpen(true);
            setActiveNav('contact');
        }


        return () => {

            if (toastTimerRef.current) {
                clearTimeout(toastTimerRef.current);
            }
        };

    }, []);


    const scrollHome = () => {

        setActiveNav('home');

        document
            .getElementById('home')
            ?.scrollIntoView({
                behavior: 'smooth',
            });
    };


    const openExperienceModal = (
        tab = 'expertise'
    ) => {

        setExperienceTab(tab);
        setActiveNav('experience');
        setExperienceOpen(true);
    };


    const closeExperienceModal = () => {

        setExperienceOpen(false);
        setActiveNav('home');
    };


    const openPortfolioModal = () => {

        setActiveNav('projects');
        setPortfolioOpen(true);
    };


    const closePortfolioModal = () => {

        setPortfolioOpen(false);
        setActiveNav('home');
    };


    const openCertsModal = () => {

        setActiveNav('certs');
        setCertsOpen(true);
    };


    const closeCertsModal = () => {

        setCertsOpen(false);
        setActiveNav('home');
    };


    const openResumeModal = () => {

        setActiveNav('resume');
        setIsResumeOpen(true);
    };


    const closeResumeModal = () => {

        setIsResumeOpen(false);
        setActiveNav('home');
    };


    const openFormModal = () => {

        setActiveNav('contact');
        setIsFormOpen(true);
    };


    const closeFormModal = () => {

        setIsFormOpen(false);
        setActiveNav('home');

        setFormStatus({
            state: 'idle',
            msg: '',
        });
    };


    const handleFormSubmit = async (
        event
    ) => {

        event.preventDefault();


        setFormStatus({
            state: 'sending',
            msg: '',
        });


        try {

            const form =
                event.currentTarget;


            const data =
                Object.fromEntries(
                    new FormData(form).entries()
                );


            const response =
                await fetch(
                    CONTACT_URL,
                    {
                        method: 'POST',

                        headers: {
                            Accept:
                                'application/json',

                            'Content-Type':
                                'application/json',
                        },

                        body:
                            JSON.stringify(data),
                    }
                );


            if (!response.ok) {

                let msg =
                    'Something went wrong. Please try again or email me directly.';


                try {

                    const json =
                        await response.json();


                    if (json?.errors?.length) {

                        msg =
                            json.errors
                                .map(
                                    (error) =>
                                        error.message
                                )
                                .join(', ');
                    }

                } catch {

                    // Keep fallback message.
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
                msg:
                    'Network error. Please try again or email me directly.',
            });
        }
    };


    return (

        <div className="site-shell">


            {/* =====================================================
                SIDEBAR
                ===================================================== */}

            <aside className="side-nav">


                <div className="side-nav-main">


                    <button
                        type="button"
                        className={`side-nav-item ${activeNav === 'home'
                                ? 'active'
                                : ''
                            }`}
                        onClick={scrollHome}
                        aria-label="Home"
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
                        className={`side-nav-item ${activeNav === 'experience'
                                ? 'active'
                                : ''
                            }`}
                        onClick={() =>
                            openExperienceModal(
                                'expertise'
                            )
                        }
                        aria-label="Experience"
                    >

                        <span className="side-nav-icon">
                            <Briefcase size={24} />
                        </span>

                        <span className="side-nav-label">
                            Experience
                        </span>

                    </button>


                    <button
                        type="button"
                        className={`side-nav-item ${activeNav === 'projects'
                                ? 'active'
                                : ''
                            }`}
                        onClick={openPortfolioModal}
                        aria-label="Projects"
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
                        className={`side-nav-item ${activeNav === 'certs'
                                ? 'active'
                                : ''
                            }`}
                        onClick={openCertsModal}
                        aria-label="Certifications"
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
                        className={`side-nav-item ${activeNav === 'resume'
                                ? 'active'
                                : ''
                            }`}
                        onClick={openResumeModal}
                        aria-label="Resume"
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
                        className={`side-nav-item ${activeNav === 'contact'
                                ? 'active'
                                : ''
                            }`}
                        onClick={openFormModal}
                        aria-label="Contact"
                    >

                        <span className="side-nav-icon">
                            <Mail size={24} />
                        </span>

                        <span className="side-nav-label">
                            Contact
                        </span>

                    </button>


                </div>


                <div className="side-social">


                    <a
                        href={GITHUB}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                        title="GitHub"
                        className="social-github"
                    >
                        <FaGithub />
                    </a>


                    <a
                        href={LINKEDIN}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                        title="LinkedIn"
                        className="social-linkedin"
                    >
                        <FaLinkedinIn />
                    </a>


                    <a
                        href={MEDIUM}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Medium"
                        title="Medium"
                        className="social-medium"
                    >
                        <FaMedium />
                    </a>


                    <a
                        href={X}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="X"
                        title="X"
                        className="social-x"
                    >
                        <FaXTwitter />
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
                            aria-label="Home"
                        >
                            <Home size={18} />
                        </button>


                        <button
                            type="button"
                            className="mobile-nav-link"
                            onClick={() =>
                                openExperienceModal(
                                    'expertise'
                                )
                            }
                            aria-label="Experience"
                        >
                            <Briefcase size={18} />
                        </button>


                        <button
                            type="button"
                            className="mobile-nav-link"
                            onClick={openPortfolioModal}
                            aria-label="Projects"
                        >
                            <Folder size={18} />
                        </button>


                        <button
                            type="button"
                            className="mobile-nav-link"
                            onClick={openCertsModal}
                            aria-label="Certifications"
                        >
                            <Award size={18} />
                        </button>


                        <button
                            type="button"
                            className="mobile-nav-link"
                            onClick={openResumeModal}
                            aria-label="Resume"
                        >
                            <FileText size={18} />
                        </button>


                        <button
                            type="button"
                            className="mobile-nav-link"
                            onClick={openFormModal}
                            aria-label="Contact"
                        >
                            <Mail size={18} />
                        </button>


                    </nav>


                </div>


            </header>


            {/* =====================================================
                HOME
                ===================================================== */}

            <div className="page-content">


                <main className="container">


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
                                            I build solutions at
                                            the intersection of
                                            business, data, and
                                            technology. As a
                                            functional lead and
                                            Product Owner, I
                                            translate complex
                                            operational needs into
                                            practical, scalable
                                            solutions while guiding
                                            delivery from
                                            requirements through
                                            testing, release, and
                                            production support.
                                        </p>


                                        <p>
                                            My background combines
                                            product ownership,
                                            enterprise applications,
                                            SQL and data analysis,
                                            Azure DevOps delivery
                                            governance, systems
                                            integration, UAT,
                                            process improvement,
                                            and hands-on software
                                            development.
                                        </p>


                                    </div>


                                    <div
                                        className="hero-capabilities"
                                        aria-label="Key capabilities"
                                    >


                                        <span className="capability-pill">

                                            <span className="cap-icon icon-product-owner">
                                                <CheckCircle
                                                    size={18}
                                                />
                                            </span>

                                            Product Owner

                                        </span>


                                        <span className="capability-pill">

                                            <span className="cap-icon brand-icon icon-azure-devops">
                                                <VscAzureDevops />
                                            </span>

                                            Azure DevOps

                                        </span>


                                        <span className="capability-pill">

                                            <span className="cap-icon icon-sql">
                                                <Database
                                                    size={18}
                                                />
                                            </span>

                                            SQL

                                        </span>


                                        <span className="capability-pill">

                                            <span className="cap-icon icon-powerapps">
                                                <LayoutDashboard
                                                    size={18}
                                                />
                                            </span>

                                            Power Apps

                                        </span>


                                        <span className="capability-pill">

                                            <span className="cap-icon icon-sharepoint">
                                                <Share2
                                                    size={18}
                                                />
                                            </span>

                                            SharePoint

                                        </span>


                                        <span className="capability-pill">

                                            <span className="cap-icon brand-icon icon-javascript">
                                                <SiJavascript />
                                            </span>

                                            JavaScript

                                        </span>


                                        <span className="capability-pill">

                                            <span className="cap-icon brand-icon icon-react">
                                                <SiReact />
                                            </span>

                                            React

                                        </span>


                                        <span className="capability-pill">

                                            <span className="cap-icon brand-icon icon-node">
                                                <SiNodedotjs />
                                            </span>

                                            Node.js

                                        </span>


                                        <span className="capability-pill">

                                            <span className="cap-icon icon-api">
                                                <LinkIcon
                                                    size={18}
                                                />
                                            </span>

                                            API Integration

                                        </span>


                                    </div>


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
                                                Certified Scrum
                                                Product Owner
                                                (CSPO)
                                            </h2>


                                            <strong>
                                                Scrum Alliance
                                            </strong>


                                            <p>
                                                Professional
                                                credential
                                                supporting Agile
                                                product leadership,
                                                prioritization,
                                                stakeholder
                                                alignment, and
                                                iterative delivery
                                                of user-focused
                                                value.
                                            </p>


                                        </div>


                                        <button
                                            type="button"
                                            className="hero-cert-link"
                                            onClick={
                                                openCertsModal
                                            }
                                        >

                                            View Certifications

                                            <ArrowRight
                                                size={16}
                                            />

                                        </button>


                                    </div>


                                </div>


                                <aside className="hero-side">


                                    <div className="identity-panel">


                                        <div className="identity-photo-wrap">

                                            <img
                                                src="/Image.png"
                                                alt="Troy Oubre"
                                                className="identity-photo"
                                            />

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
                                            onClick={
                                                openFormModal
                                            }
                                        >

                                            <span className="hero-action-icon">
                                                <Send
                                                    size={20}
                                                />
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
                                            onClick={
                                                openResumeModal
                                            }
                                        >

                                            <span className="hero-action-icon">
                                                <FileText
                                                    size={20}
                                                />
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
                                            onClick={
                                                openPortfolioModal
                                            }
                                        >

                                            <span className="hero-action-icon">
                                                <Folder
                                                    size={20}
                                                />
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
                                            Technology is most
                                            powerful when it solves
                                            real problems for real
                                            people.
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
                                onClick={() =>
                                    openExperienceModal(
                                        'expertise'
                                    )
                                }
                            >

                                <span>
                                    EXPLORE EXPERIENCE
                                </span>

                                <ChevronDown
                                    size={21}
                                />

                            </button>


                        </div>


                    </section>


                </main>


                {/* =================================================
                    FOOTER
                    ================================================= */}

                <footer className="footer">


                    <div className="container footer-clean">


                        <div className="footer-brand">


                            <div className="footer-monogram">
                                TO
                            </div>


                            <div>


                                <strong className="footer-name">
                                    Troy M. Oubre
                                </strong>


                                <div className="footer-meta">

                                    © {new Date().getFullYear()}

                                    <span>•</span>

                                    Product

                                    <span>•</span>

                                    Technology

                                    <span>•</span>

                                    Delivery

                                </div>


                            </div>


                        </div>


                        <div className="footer-built">
                            Built with React + Vite
                        </div>


                    </div>


                </footer>


            </div>


            {/* =====================================================
                EXPERIENCE
                ===================================================== */}

            <ExperienceModal
                isOpen={experienceOpen}
                onClose={closeExperienceModal}
                activeTab={experienceTab}
                onTabChange={setExperienceTab}
            />


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
                            These projects demonstrate
                            the hands-on software
                            development foundation that
                            complements my product
                            ownership and enterprise
                            technology work.
                        </p>


                    </div>


                    <div
                        className="portfolio-modal-grid"
                        role="list"
                    >


                        {projects.map((project) => (

                            <ProjectCard
                                key={project.title}
                                {...project}
                                highlights={
                                    PROJECT_HIGHLIGHTS[
                                    project.title
                                    ]
                                }
                            />

                        ))}


                    </div>


                    <div className="portfolio-modal-footer">


                        <p>
                            Additional source code and
                            development work are
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
                CONTACT
                ===================================================== */}

            <Modal
                isOpen={isFormOpen}
                onClose={closeFormModal}
                title="Get in touch"
            >


                <form
                    onSubmit={
                        handleFormSubmit
                    }
                >


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
                        style={{
                            display: 'none',
                        }}
                        tabIndex={-1}
                        autoComplete="off"
                    />


                    <div className="form-actions">


                        <button
                            type="submit"
                            className="pill"
                            disabled={
                                formStatus.state ===
                                'sending'
                            }
                        >
                            {
                                formStatus.state ===
                                    'sending'
                                    ? 'Sending…'
                                    : 'Send Message'
                            }
                        </button>


                        <button
                            type="button"
                            className="modal-secondary"
                            onClick={
                                closeFormModal
                            }
                        >
                            Cancel
                        </button>


                    </div>


                    {
                        formStatus.state !==
                        'idle' && (

                            <p className="muted form-status">
                                {
                                    formStatus.msg
                                }
                            </p>

                        )
                    }


                </form>


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
                onClose={closeCertsModal}
            />


            {/* =====================================================
                TOAST
                ===================================================== */}

            <div
                className={`toast ${toast.visible
                        ? 'show'
                        : ''
                    } ${toast.type}`}
                role="status"
                aria-live="polite"
            >
                {toast.msg}
            </div>


        </div>
    );
}