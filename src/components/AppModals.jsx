import React from 'react';
import Modal from './Modal.jsx';
import Resume from './Resume.jsx';
import CertsModal from './CertsModal.jsx';
import ExperienceModal from './ExperienceModal.jsx';
import ProjectCard from './ProjectCard.jsx';
import projects from '../data/projects.js';
import { GITHUB, PROJECT_HIGHLIGHTS } from '../data/siteConfig.js';

export default function AppModals({
    activeModal,
    experienceTab,
    onExperienceTabChange,
    onClose,
    onContactSubmit,
    formStatus,
}) {
    return (
        <>
            <ExperienceModal
                isOpen={activeModal === 'experience'}
                onClose={onClose}
                activeTab={experienceTab}
                onTabChange={onExperienceTabChange}
            />

            <Modal isOpen={activeModal === 'projects'} onClose={onClose} title="Technical Portfolio">
                <div className="portfolio-modal-wrap">
                    <div className="portfolio-modal-intro">
                        <span className="portfolio-modal-eyebrow">SOFTWARE DEVELOPMENT</span>
                        <p>
                            These projects demonstrate the hands-on software development foundation that complements my
                            product ownership and enterprise technology work.
                        </p>
                    </div>

                    <div className="portfolio-modal-grid" role="list">
                        {projects.map((project) => (
                            <ProjectCard
                                key={project.title}
                                {...project}
                                highlights={PROJECT_HIGHLIGHTS[project.title]}
                            />
                        ))}
                    </div>

                    <div className="portfolio-modal-footer">
                        <p>Additional source code and development work are available through GitHub.</p>
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

            <Modal isOpen={activeModal === 'contact'} onClose={onClose} title="Get in touch">
                <form onSubmit={onContactSubmit}>
                    <label htmlFor="name">Your Name:</label>
                    <input id="name" type="text" name="name" required />

                    <label htmlFor="email">Your Email:</label>
                    <input id="email" type="email" name="email" required />

                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" rows="5" required />

                    <input
                        type="text"
                        name="_gotcha"
                        style={{ display: 'none' }}
                        tabIndex={-1}
                        autoComplete="off"
                    />

                    <div className="form-actions">
                        <button type="submit" className="pill" disabled={formStatus.state === 'sending'}>
                            {formStatus.state === 'sending' ? 'Sending…' : 'Send Message'}
                        </button>

                        <button type="button" className="modal-secondary" onClick={onClose}>
                            Cancel
                        </button>
                    </div>

                    {formStatus.state !== 'idle' && (
                        <p className="muted form-status">{formStatus.msg}</p>
                    )}
                </form>
            </Modal>

            <Modal isOpen={activeModal === 'resume'} onClose={onClose} title="Resume">
                <div className="resume-modal-scroll">
                    <Resume inModal />
                </div>
            </Modal>

            <CertsModal isOpen={activeModal === 'certs'} onClose={onClose} />
        </>
    );
}
