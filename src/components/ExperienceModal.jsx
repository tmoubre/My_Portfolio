import React from 'react';

import {
    X,
    Boxes,
    Database,
    FlaskConical,
    Code2,
    Network,
    ClipboardCheck,
    Workflow,
    Users,
    BookOpen,
    Target,
    CalendarDays,
    Layers3,
    GitBranch,
    ArrowRight,
} from 'lucide-react';

import '../styles/experience-modal.css';


const EXPERTISE = [

    {
        icon: Target,
        title: 'Product Ownership',
        text:
            'Requirements definition, backlog refinement, prioritization, stakeholder alignment, roadmap support, user feedback, enhancement planning, and product governance.',
    },

    {
        icon: Boxes,
        title: 'Enterprise Applications',
        text:
            'Functional ownership, production support, systems integration, application enhancements, business process improvement, issue analysis, and cross-functional delivery.',
    },

    {
        icon: Database,
        title: 'Data & SQL',
        text:
            'SQL investigation, data validation, reconciliation, reporting, root-cause analysis, production troubleshooting, and decision support.',
    },

    {
        icon: FlaskConical,
        title: 'UAT & Release Delivery',
        text:
            'Test planning, QA validation, UAT coordination, defect triage, release readiness, stakeholder communication, deployment governance, and post-release validation.',
    },

    {
        icon: Code2,
        title: 'Full-Stack Development',
        text:
            'React, JavaScript, Node.js, Express, MongoDB, APIs, authentication, responsive interfaces, testing, serverless applications, and mobile development.',
    },

    {
        icon: Network,
        title: 'Business & Technology Bridge',
        text:
            'Translating business requirements into technical direction while helping developers, users, operations teams, and leadership stay aligned throughout delivery.',
    },

];


const PROFESSIONAL_IMPACT = [

    {
        number: '01',
        icon: Target,
        title:
            'Enterprise Product Ownership',
        text:
            'Own and guide the evolution of a business-critical enterprise platform, translating operational needs into requirements, backlog priorities, enhancements, testing strategies, and production releases.',
        tag:
            'Product Leadership',
    },

    {
        number: '02',
        icon: GitBranch,
        title:
            'Product Governance & Delivery Management',
        text:
            'Own the Azure DevOps delivery process for the product, managing work from intake and refinement through development, QA, UAT, change governance, release readiness, deployment, and post-release validation.',
        tag:
            'ADO Governance',
    },

    {
        number: '03',
        icon: Users,
        title:
            'User Council & UAT Program',
        text:
            'Created a formal user council and UAT framework that brings business users directly into product development through structured testing, feedback, release readiness, and continuous improvement.',
        tag:
            'User Enablement',
    },

    {
        number: '04',
        icon: Database,
        title:
            'Enterprise Data & System Mapping',
        text:
            'Conduct deep SQL and data analysis across interconnected enterprise systems to map business processes, trace transactions, reconcile data, investigate production issues, and support technical solution design.',
        tag:
            'Data & Systems',
    },

    {
        number: '05',
        icon: Workflow,
        title:
            'Systems Integration & Process Modernization',
        text:
            'Partner with development, operations, finance, and other stakeholders on integrations and workflow improvements that connect enterprise platforms and reduce operational friction.',
        tag:
            'Modernization',
    },

    {
        number: '06',
        icon: BookOpen,
        title:
            'Knowledge & Digital Experience',
        text:
            'Designed centralized digital workspaces, documentation experiences, release communications, training resources, and self-service content to improve product adoption and give users better access to information.',
        tag:
            'Digital Experience',
    },

];


const SUMMARY_ITEMS = [

    {
        icon: CalendarDays,
        label: 'Current Role',
        value: 'Since Feb 9, 2026',
    },

    {
        icon: Target,
        label: 'Primary Focus',
        value: 'Product Ownership',
    },

    {
        icon: Layers3,
        label: 'Delivery',
        value: 'End-to-End Lifecycle',
    },

    {
        icon: ClipboardCheck,
        label: 'Governance',
        value: 'ADO • QA • UAT',
    },

];


export default function ExperienceModal({
    isOpen,
    onClose,
    activeTab,
    onTabChange,
}) {

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


                {/* =============================================
                    HEADER
                    ============================================= */}

                <header className="experience-header">


                    <div>


                        <span className="experience-header-kicker">
                            PRODUCT • TECHNOLOGY • DELIVERY
                        </span>


                        <h2 id="experience-title">
                            Experience
                        </h2>


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


                {/* =============================================
                    SCROLLABLE BODY
                    ============================================= */}

                <div className="experience-body">


                    {/* =========================================
                        LEADERSHIP SUMMARY
                        ========================================= */}

                    <section className="experience-dashboard">


                        <div className="experience-dashboard-copy">


                            <span className="experience-dashboard-label">
                                CURRENT FOCUS
                            </span>


                            <h3>
                                Product leadership backed by
                                hands-on technical depth.
                            </h3>


                            <p>
                                I work across the full product
                                lifecycle — translating operational
                                needs into requirements, guiding
                                development and testing, governing
                                releases, investigating data and
                                production issues, and helping users
                                successfully adopt the solutions
                                delivered.
                            </p>


                        </div>


                        <div className="experience-summary-grid">


                            {SUMMARY_ITEMS.map(
                                (item) => {

                                    const Icon =
                                        item.icon;


                                    return (

                                        <div
                                            className="experience-summary-card"
                                            key={item.label}
                                        >


                                            <span className="experience-summary-icon">

                                                <Icon
                                                    size={19}
                                                />

                                            </span>


                                            <div>


                                                <span className="experience-summary-label">
                                                    {item.label}
                                                </span>


                                                <strong>
                                                    {item.value}
                                                </strong>


                                            </div>


                                        </div>

                                    );
                                }
                            )}


                        </div>


                    </section>


                    {/* =========================================
                        NAVIGATION
                        ========================================= */}

                    <div
                        className="experience-tab-bar"
                        role="tablist"
                        aria-label="Experience sections"
                    >


                        <button
                            type="button"
                            role="tab"
                            aria-selected={
                                activeTab ===
                                'expertise'
                            }
                            className={`experience-nav-tab ${
                                activeTab ===
                                'expertise'
                                    ? 'active'
                                    : ''
                            }`}
                            onClick={() =>
                                onTabChange(
                                    'expertise'
                                )
                            }
                        >

                            <Boxes size={18} />

                            <span>
                                Product & Technology
                            </span>

                        </button>


                        <button
                            type="button"
                            role="tab"
                            aria-selected={
                                activeTab ===
                                'impact'
                            }
                            className={`experience-nav-tab ${
                                activeTab ===
                                'impact'
                                    ? 'active'
                                    : ''
                            }`}
                            onClick={() =>
                                onTabChange(
                                    'impact'
                                )
                            }
                        >

                            <Target size={18} />

                            <span>
                                Professional Impact
                            </span>

                        </button>


                    </div>


                    {/* =========================================
                        EXPERTISE
                        ========================================= */}

                    {
                        activeTab ===
                        'expertise' && (

                            <section className="experience-content">


                                <div className="experience-section-heading">


                                    <div>


                                        <span>
                                            CAPABILITY
                                        </span>


                                        <h3>
                                            Product & Technology Expertise
                                        </h3>


                                    </div>


                                    <p>
                                        The disciplines I use to
                                        connect business needs,
                                        enterprise platforms,
                                        product delivery, data,
                                        and software development.
                                    </p>


                                </div>


                                <div className="experience-capability-grid">


                                    {
                                        EXPERTISE.map(
                                            (
                                                item,
                                                index
                                            ) => {

                                                const Icon =
                                                    item.icon;


                                                return (

                                                    <article
                                                        className="experience-capability-card"
                                                        key={
                                                            item.title
                                                        }
                                                    >


                                                        <div className="experience-card-top">


                                                            <span className="experience-card-icon">

                                                                <Icon
                                                                    size={22}
                                                                />

                                                            </span>


                                                            <span className="experience-card-index">
                                                                0{
                                                                    index +
                                                                    1
                                                                }
                                                            </span>


                                                        </div>


                                                        <h4>
                                                            {
                                                                item.title
                                                            }
                                                        </h4>


                                                        <p>
                                                            {
                                                                item.text
                                                            }
                                                        </p>


                                                    </article>

                                                );
                                            }
                                        )
                                    }


                                </div>


                                <div className="experience-foundation">


                                    <div className="experience-foundation-icon">

                                        <Code2
                                            size={25}
                                        />

                                    </div>


                                    <div>


                                        <span>
                                            TECHNICAL FOUNDATION
                                        </span>


                                        <h4>
                                            Software development strengthens
                                            how I lead products.
                                        </h4>


                                        <p>
                                            Hands-on development experience
                                            gives me additional perspective
                                            when working with architecture,
                                            APIs, integrations, databases,
                                            testing, deployment, and
                                            technical tradeoffs.
                                        </p>


                                    </div>


                                </div>


                            </section>

                        )
                    }


                    {/* =========================================
                        PROFESSIONAL IMPACT
                        ========================================= */}

                    {
                        activeTab ===
                        'impact' && (

                            <section className="experience-content">


                                <div className="experience-section-heading">


                                    <div>


                                        <span>
                                            PRODUCT LEADERSHIP IN PRACTICE
                                        </span>


                                        <h3>
                                            Professional Impact
                                        </h3>


                                    </div>


                                    <p>
                                        Examples of how product ownership,
                                        governance, analysis, delivery,
                                        systems thinking, and user
                                        enablement come together in my
                                        current work.
                                    </p>


                                </div>


                                <div className="experience-impact-tags">


                                    <span>
                                        Product Ownership
                                    </span>

                                    <span>
                                        Enterprise Systems
                                    </span>

                                    <span>
                                        Cross-Functional Leadership
                                    </span>

                                    <span>
                                        ADO & Agile Delivery
                                    </span>


                                </div>


                                <div className="experience-impact-grid">


                                    {
                                        PROFESSIONAL_IMPACT.map(
                                            (item) => {

                                                const Icon =
                                                    item.icon;


                                                return (

                                                    <article
                                                        className="experience-impact-card"
                                                        key={
                                                            item.number
                                                        }
                                                    >


                                                        <div className="experience-impact-number">
                                                            {
                                                                item.number
                                                            }
                                                        </div>


                                                        <div className="experience-impact-icon">

                                                            <Icon
                                                                size={22}
                                                            />

                                                        </div>


                                                        <div className="experience-impact-copy">


                                                            <span className="experience-impact-tag">
                                                                {
                                                                    item.tag
                                                                }
                                                            </span>


                                                            <h4>
                                                                {
                                                                    item.title
                                                                }
                                                            </h4>


                                                            <p>
                                                                {
                                                                    item.text
                                                                }
                                                            </p>


                                                        </div>


                                                    </article>

                                                );
                                            }
                                        )
                                    }


                                </div>


                                <div className="experience-bottom-message">


                                    <div>


                                        <span>
                                            HOW I WORK
                                        </span>


                                        <strong>
                                            Understand the problem.
                                            Map the system.
                                            Align the people.
                                            Deliver the solution.
                                        </strong>


                                    </div>


                                    <ArrowRight
                                        size={24}
                                    />


                                </div>


                            </section>

                        )
                    }


                </div>


            </div>


        </div>
    );
}