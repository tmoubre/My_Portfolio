import React from 'react';
import { X, Boxes, Code2, Target, ArrowRight } from 'lucide-react';
import {
    EXPERTISE,
    PROFESSIONAL_IMPACT,
    SUMMARY_ITEMS,
    IMPACT_TAGS,
} from '../data/experienceData.js';
import '../styles/experience-modal.css';

function SummaryGrid() {
    return (
        <div className="experience-summary-grid">
            {SUMMARY_ITEMS.map((item) => {
                const Icon = item.icon;

                return (
                    <div className="experience-summary-card" key={item.label}>
                        <span className="experience-summary-icon">
                            <Icon size={19} />
                        </span>
                        <div>
                            <span className="experience-summary-label">{item.label}</span>
                            <strong>{item.value}</strong>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function ExperienceTabs({ activeTab, onTabChange }) {
    const tabs = [
        { id: 'expertise', label: 'Product & Technology', icon: Boxes },
        { id: 'impact', label: 'Professional Impact', icon: Target },
    ];

    return (
        <div className="experience-tab-bar" role="tablist" aria-label="Experience sections">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                    <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        className={`experience-nav-tab ${isActive ? 'active' : ''}`}
                        onClick={() => onTabChange(tab.id)}
                    >
                        <Icon size={18} />
                        <span>{tab.label}</span>
                    </button>
                );
            })}
        </div>
    );
}

function ExpertiseContent() {
    return (
        <section className="experience-content">
            <div className="experience-section-heading">
                <div>
                    <span>CAPABILITY</span>
                    <h3>Product & Technology Expertise</h3>
                </div>
                <p>
                    The disciplines I use to connect business needs, enterprise platforms, product delivery, data, and
                    software development.
                </p>
            </div>

            <div className="experience-capability-grid">
                {EXPERTISE.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <article className="experience-capability-card" key={item.title}>
                            <div className="experience-card-top">
                                <span className="experience-card-icon">
                                    <Icon size={22} />
                                </span>
                                <span className="experience-card-index">0{index + 1}</span>
                            </div>
                            <h4>{item.title}</h4>
                            <p>{item.text}</p>
                        </article>
                    );
                })}
            </div>

            <div className="experience-foundation">
                <div className="experience-foundation-icon">
                    <Code2 size={25} />
                </div>
                <div>
                    <span>TECHNICAL FOUNDATION</span>
                    <h4>Software development strengthens how I lead products.</h4>
                    <p>
                        Hands-on development experience gives me additional perspective when working with architecture,
                        APIs, integrations, databases, testing, deployment, and technical tradeoffs.
                    </p>
                </div>
            </div>
        </section>
    );
}

function ImpactContent() {
    return (
        <section className="experience-content">
            <div className="experience-section-heading">
                <div>
                    <span>PRODUCT LEADERSHIP IN PRACTICE</span>
                    <h3>Professional Impact</h3>
                </div>
                <p>
                    Examples of how product ownership, governance, analysis, delivery, systems thinking, and user
                    enablement come together in my current work.
                </p>
            </div>

            <div className="experience-impact-tags">
                {IMPACT_TAGS.map((tag) => (
                    <span key={tag}>{tag}</span>
                ))}
            </div>

            <div className="experience-impact-grid">
                {PROFESSIONAL_IMPACT.map((item) => {
                    const Icon = item.icon;

                    return (
                        <article className="experience-impact-card" key={item.number}>
                            <div className="experience-impact-number">{item.number}</div>
                            <div className="experience-impact-icon">
                                <Icon size={22} />
                            </div>
                            <div className="experience-impact-copy">
                                <span className="experience-impact-tag">{item.tag}</span>
                                <h4>{item.title}</h4>
                                <p>{item.text}</p>
                            </div>
                        </article>
                    );
                })}
            </div>

            <div className="experience-bottom-message">
                <div>
                    <span>HOW I WORK</span>
                    <strong>
                        Understand the problem. Map the system. Align the people. Deliver the solution.
                    </strong>
                </div>
                <ArrowRight size={24} />
            </div>
        </section>
    );
}

export default function ExperienceModal({ isOpen, onClose, activeTab, onTabChange }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="experience-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="experience-title"
        >
            <div className="experience-shell">
                <header className="experience-header">
                    <div>
                        <span className="experience-header-kicker">PRODUCT • TECHNOLOGY • DELIVERY</span>
                        <h2 id="experience-title">Experience</h2>
                    </div>

                    <button
                        type="button"
                        className="experience-close"
                        onClick={onClose}
                        aria-label="Close experience"
                    >
                        <X size={21} />
                    </button>
                </header>

                <div className="experience-body">
                    <section className="experience-dashboard">
                        <div className="experience-dashboard-copy">
                            <span className="experience-dashboard-label">CURRENT FOCUS</span>
                            <h3>Product leadership backed by hands-on technical depth.</h3>
                            <p>
                                I work across the full product lifecycle — translating operational needs into
                                requirements, guiding development and testing, governing releases, investigating data and
                                production issues, and helping users successfully adopt the solutions delivered.
                            </p>
                        </div>

                        <SummaryGrid />
                    </section>

                    <ExperienceTabs activeTab={activeTab} onTabChange={onTabChange} />
                    {activeTab === 'expertise' && <ExpertiseContent />}
                    {activeTab === 'impact' && <ImpactContent />}
                </div>
            </div>
        </div>
    );
}
