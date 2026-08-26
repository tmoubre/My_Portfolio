import React from 'react';
import './resume.css';

const PDF_PATH = '/Troy-Oubre-Resume.pdf';

export default function Resume({ inModal = false }) {
    return (
        <div
            className={`resume-root ${inModal ? 'resume-in-modal' : ''}`}
            aria-label="Resume"
        >
            {/* Toolbar */}
            <div className="resume-toolbar no-print">
                <a
                    className="modal-secondary"
                    href={PDF_PATH}
                    download
                >
                    Download PDF
                </a>

                <a
                    className="modal-secondary"
                    href={PDF_PATH}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Open PDF
                </a>
            </div>

            <article className="resume-sheet">

                {/* =====================================================
            HEADER
            ===================================================== */}
                <header className="resume-header">
                    <h1 className="name">
                        Troy Oubre
                    </h1>

                    <div className="meta">
                        <span>Baton Rouge, LA</span>
                        <span>•</span>

                        <a href="tel:+15047150645">
                            (504) 715-0645
                        </a>

                        <span>•</span>

                        <a href="mailto:oubre1@att.net">
                            oubre1@att.net
                        </a>

                        <span>•</span>

                        <a
                            href="https://troyoubre.com"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Portfolio
                        </a>

                        <span>•</span>

                        <a
                            href="https://github.com/tmoubre"
                            target="_blank"
                            rel="noreferrer"
                        >
                            GitHub
                        </a>

                        <span>•</span>

                        <a
                            href="https://www.linkedin.com/in/troy-oubre-32170a32/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            LinkedIn
                        </a>
                    </div>
                </header>

                {/* =====================================================
            PROFESSIONAL SUMMARY
            ===================================================== */}
                <section>
                    <h2>
                        Professional Summary
                    </h2>

                    <p>
                        Senior Analyst, Digital Products and Certified Scrum Product
                        Owner with extensive experience bridging business operations,
                        enterprise technology, product ownership, and software delivery.
                        Lead the functional evolution of business-critical applications
                        by translating operational needs into requirements, backlog
                        priorities, technical direction, testing strategies, release
                        plans, and production support.
                    </p>

                    <p>
                        Experienced in Azure DevOps delivery governance, business
                        analysis, SQL and enterprise data investigation, system and
                        process mapping, UAT and QA coordination, systems integration,
                        stakeholder communication, user enablement, and release
                        management. Full-stack development training provides additional
                        technical depth across React, JavaScript, Node.js, APIs,
                        databases, testing, and application architecture.
                    </p>
                </section>

                {/* =====================================================
            CORE STRENGTHS
            ===================================================== */}
                <section>
                    <h2>
                        Core Strengths
                    </h2>

                    <ul className="cols avoid-break">
                        <li>Product Ownership & Product Governance</li>
                        <li>Azure DevOps Backlog & Delivery Management</li>

                        <li>Business Analysis & Requirements Definition</li>
                        <li>Enterprise Application Ownership</li>

                        <li>SQL, Data Analysis & Reconciliation</li>
                        <li>Enterprise System & Process Mapping</li>

                        <li>UAT, QA & Test Coordination</li>
                        <li>Release & Change Management</li>

                        <li>Systems Integration</li>
                        <li>Production Support & Root-Cause Analysis</li>

                        <li>Stakeholder & Cross-Functional Leadership</li>
                        <li>User Adoption, Training & Documentation</li>

                        <li>Process Improvement & Digital Transformation</li>
                        <li>Full-Stack Software Development</li>
                    </ul>
                </section>

                <div
                    className="page-break"
                    aria-hidden="true"
                />

                {/* =====================================================
            EXPERIENCE
            ===================================================== */}
                <section>
                    <h2>
                        Professional Experience
                    </h2>

                    {/* Senior Analyst */}
                    <div className="role avoid-break">
                        <div className="role-head">
                            <h3>
                                Senior Analyst, Digital Products
                            </h3>

                            <div className="right">
                                <div>BrandSafway, LLC</div>
                                <div>Feb 2026 – Present</div>
                            </div>
                        </div>

                        <ul>
                            <li>
                                Serve as functional product owner for a business-critical
                                enterprise platform supporting operational, billing,
                                inventory, financial, and business processes across multiple
                                organizational locations.
                            </li>

                            <li>
                                Translate business needs, production issues, audit
                                requirements, and enhancement requests into refined
                                requirements, acceptance criteria, priorities, test plans,
                                and implementation direction.
                            </li>

                            <li>
                                Own the Azure DevOps delivery process for the product,
                                maintaining backlog structure, workflow visibility,
                                prioritization, refinement, development coordination, QA,
                                UAT, change governance, release readiness, and post-release
                                validation.
                            </li>

                            <li>
                                Partner directly with developers and technical teams to
                                analyze application behavior, clarify functional logic,
                                evaluate solution options, and guide enhancements from
                                discovery through production.
                            </li>

                            <li>
                                Perform extensive SQL investigation and enterprise data
                                analysis to trace transactions, reconcile discrepancies,
                                identify business rules, map application relationships,
                                support root-cause analysis, and validate production results.
                            </li>

                            <li>
                                Map complex legacy application processes and interconnected
                                systems to improve understanding of data flows, integrations,
                                operational dependencies, and technical requirements.
                            </li>

                            <li>
                                Coordinate QA and user acceptance testing, including test
                                scenarios, business testers, evidence requirements, defect
                                triage, release readiness, and stakeholder communication.
                            </li>

                            <li>
                                Established a formal product User Council to create a
                                structured channel for business feedback, UAT participation,
                                product communication, enhancement discussion, and user
                                involvement in product evolution.
                            </li>

                            <li>
                                Lead release and change-management activities across
                                development, business, operations, finance, and other
                                stakeholders, including readiness reviews, deployment
                                communications, validation, and follow-up.
                            </li>

                            <li>
                                Support enterprise integrations and modernization
                                initiatives involving operational systems, tax services,
                                financial platforms, reporting, and related
                                business workflows.
                            </li>

                            <li>
                                Design and maintain centralized digital workspaces,
                                documentation libraries, release communications, training
                                resources, user guides, and self-service support experiences
                                to improve adoption and product transparency.
                            </li>

                            <li>
                                Provide ongoing production support and functional leadership,
                                balancing issue resolution, user needs, technical
                                constraints, product stability, and longer-term product
                                improvement.
                            </li>
                        </ul>
                    </div>

                    {/* Operations Controller */}
                    <div className="role avoid-break">
                        <div className="role-head">
                            <h3>
                                Operations Controller
                            </h3>

                            <div className="right">
                                <div>BrandSafway, LLC — Boutte, LA</div>
                                <div>Mar 2021 – Feb 2026</div>
                            </div>
                        </div>

                        <ul>
                            <li>
                                Directed financial and operational control for a
                                multimillion-dollar business operation, including budgeting,
                                forecasting, cost reporting, financial analysis, and
                                performance management.
                            </li>

                            <li>
                                Performed monthly and quarterly balance-sheet reviews,
                                variance analysis, account reconciliation, and operational
                                financial reporting.
                            </li>

                            <li>
                                Partnered with branch, regional, project, and operational
                                leadership to identify performance gaps, investigate
                                financial drivers, and implement corrective actions.
                            </li>

                            <li>
                                Led job-cost and margin reviews with project managers,
                                estimators, and operations teams to strengthen cost control
                                and financial visibility.
                            </li>

                            <li>
                                Owned month-end accounting activities including journals,
                                accruals, capital expenditure tracking, intercompany
                                accounting, and financial close support.
                            </li>

                            <li>
                                Developed reporting tools, KPI analysis, and management
                                information used for operational reviews and executive
                                decision support.
                            </li>

                            <li>
                                Supported and evaluated enterprise systems used for
                                timekeeping, job tracking, billing, purchasing, and
                                operational processes, building the functional and technical
                                experience that led to transition into Digital Products.
                            </li>
                        </ul>
                    </div>

                    {/* Division Resource Manager / Office Manager */}
                    <div className="role avoid-break">
                        <div className="role-head">
                            <h3>
                                Division Resource Manager / Office Manager
                            </h3>

                            <div className="right">
                                <div>BrandSafway, LLC — Boutte, LA</div>
                                <div>Aug 2018 – Mar 2021</div>
                            </div>
                        </div>

                        <ul>
                            <li>
                                Directed divisional billing, procurement, office operations,
                                inventory management, and resource allocation.
                            </li>

                            <li>
                                Built reporting tools that improved visibility into project,
                                inventory, and operational performance.
                            </li>

                            <li>
                                Administered inventory controls for approximately
                                $30M–$100M in physical assets.
                            </li>

                            <li>
                                Supervised a multifunctional team and standardized processes
                                across operational and administrative departments.
                            </li>

                            <li>
                                Negotiated supplier agreements and supported purchasing and
                                cost-control initiatives.
                            </li>
                        </ul>
                    </div>

                    {/* Division Resource Manager */}
                    <div className="role avoid-break">
                        <div className="role-head">
                            <h3>
                                Division Resource Manager
                            </h3>

                            <div className="right">
                                <div>
                                    Brand Energy & Infrastructure Services — LaPlace, LA
                                </div>
                                <div>2015 – 2018</div>
                            </div>
                        </div>

                        <ul>
                            <li>
                                Directed inventory, logistics, equipment movement, and
                                resource coordination across multiple operating locations.
                            </li>

                            <li>
                                Managed more than $50M in physical assets and maintained
                                inventory accountability across complex operational
                                environments.
                            </li>

                            <li>
                                Led a team of approximately 10–20 employees, improving
                                planning, workflow efficiency, and on-time delivery.
                            </li>

                            <li>
                                Evaluated vendor relationships, purchasing arrangements, and
                                cost-reduction opportunities.
                            </li>
                        </ul>
                    </div>

                    {/* EHS */}
                    <div className="role avoid-break">
                        <div className="role-head">
                            <h3>
                                Environmental Health & Safety Specialist
                            </h3>

                            <div className="right">
                                <div>Brand — Various Sites</div>
                                <div>2011 – 2015</div>
                            </div>
                        </div>

                        <ul>
                            <li>
                                Coordinated regulatory compliance, safety programs, field
                                audits, and operational risk-management activities.
                            </li>

                            <li>
                                Produced root-cause investigation reports and supported
                                corrective-action and risk-mitigation efforts.
                            </li>

                            <li>
                                Monitored performance metrics and recommended process and
                                site-level improvements.
                            </li>
                        </ul>
                    </div>

                    {/* Sci-Net */}
                    <div className="role avoid-break">
                        <div className="role-head">
                            <h3>
                                Field Supervisor
                            </h3>

                            <div className="right">
                                <div>Sci-Net, LLC — Baton Rouge, LA</div>
                                <div>Jun 2007 – Jul 2010</div>
                            </div>
                        </div>

                        <ul>
                            <li>
                                Managed field operations, inventory allocation, reporting,
                                workforce performance, and customer support.
                            </li>

                            <li>
                                Conducted employee performance reviews and maintained service
                                quality and customer satisfaction.
                            </li>

                            <li>
                                Supported database and server infrastructure performance and
                                availability.
                            </li>
                        </ul>
                    </div>

                    {/* Cox */}
                    <div className="role avoid-break">
                        <div className="role-head">
                            <h3>
                                Systems Support Specialist II
                            </h3>

                            <div className="right">
                                <div>Cox Communications — Baton Rouge, LA</div>
                                <div>Jun 2001 – Jul 2007</div>
                            </div>
                        </div>

                        <ul>
                            <li>
                                Helped build support operations for emerging broadband,
                                high-speed internet, and voice-over-IP services.
                            </li>

                            <li>
                                Developed escalation and resolution procedures and provided
                                technical troubleshooting, ticket analysis, and user
                                training.
                            </li>

                            <li>
                                Contributed end-user and support expertise to system and
                                application development initiatives.
                            </li>
                        </ul>
                    </div>
                </section>

                <div
                    className="page-break"
                    aria-hidden="true"
                />

                {/* =====================================================
            TECHNOLOGY
            ===================================================== */}
                <section>
                    <h2>
                        Technology & Product Tools
                    </h2>

                    <ul className="cols avoid-break">
                        <li>Azure DevOps</li>
                        <li>SQL Server / SSMS</li>

                        <li>SharePoint</li>
                        <li>Power Apps</li>

                        <li>Git / GitHub</li>
                        <li>Visual Studio</li>

                        <li>React</li>
                        <li>JavaScript</li>

                        <li>Node.js / Express</li>
                        <li>REST APIs</li>

                        <li>MongoDB</li>
                        <li>Relational Databases</li>

                        <li>HTML / CSS</li>
                        <li>Responsive Web Development</li>
                    </ul>
                </section>

                {/* =====================================================
            EDUCATION & CERTIFICATIONS
            ===================================================== */}
                <section>
                    <h2>
                        Education & Certifications
                    </h2>

                    <ul className="flat avoid-break">
                        <li>
                            <strong>
                                Certified Scrum Product Owner (CSPO)
                            </strong>
                            {' — '}
                            Scrum Alliance
                        </li>

                        <li>
                            <strong>
                                Full-Stack Immersion
                            </strong>
                            {' — '}
                            CareerFoundry, completed Sep 2025
                        </li>

                        <li>
                            <strong>
                                Intro to Frontend Development
                            </strong>
                            {' — '}
                            CareerFoundry
                        </li>

                        <li>
                            <strong>
                                Associate of Science, Computer Information Systems
                            </strong>
                            {' — '}
                            ITI Technical College, Baton Rouge, LA
                        </li>

                        <li>
                            <strong>
                                Associate of Science, Computer Information Systems
                            </strong>
                            {' — '}
                            Remington College, Baton Rouge, LA
                        </li>
                    </ul>

                    <p className="muted avoid-break">
                        Additional training and credentials include CSST, CSS,
                        NCCER Safety, OSHA-10, OSHA-30, and First Aid/CPR.
                    </p>
                </section>

                {/* =====================================================
            DEVELOPMENT BACKGROUND
            ===================================================== */}
                <section>
                    <h2>
                        Software Development Background
                    </h2>

                    <p>
                        Completed intensive full-stack development training covering
                        advanced JavaScript, modern frontend frameworks, Node.js and
                        server-side programming, relational and non-relational
                        databases, data visualization, application security,
                        test-driven development, documentation, and collaborative
                        software delivery.
                    </p>

                    <p>
                        Built hands-on applications using React, Angular, React Native,
                        Node.js, Express, MongoDB, Firebase, serverless services, REST
                        APIs, authentication, responsive interfaces, and progressive web
                        application patterns. Development work is available through the
                        portfolio and GitHub links above.
                    </p>
                </section>

            </article>
        </div>
    );
}