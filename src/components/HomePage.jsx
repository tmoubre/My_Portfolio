import React from 'react';
import {
    CheckCircle,
    Database,
    LayoutDashboard,
    Share2,
    Link as LinkIcon,
    Send,
    FileText,
    Folder,
    ArrowRight,
    Quote,
    ChevronDown,
} from 'lucide-react';
import { SiReact, SiJavascript, SiNodedotjs } from 'react-icons/si';
import { VscAzureDevops } from 'react-icons/vsc';

export default function HomePage({ onContact, onResume, onProjects, onCerts, onExperience }) {
    return (
        <div className="page-content">
            <main className="container">
                <section className="hero" id="home">
                    <div className="hero-frame">
                        <div className="hero-main-grid">
                            <div className="hero-primary">
                                <div className="hero-kicker">PRODUCT • TECHNOLOGY • DELIVERY</div>

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
                                        I build solutions at the intersection of business, data, and technology. As a
                                        functional lead and Product Owner, I translate complex operational needs into
                                        practical, scalable solutions while guiding delivery from requirements through
                                        testing, release, and production support.
                                    </p>

                                    <p>
                                        My background combines product ownership, enterprise applications, SQL and data
                                        analysis, Azure DevOps delivery governance, systems integration, UAT, process
                                        improvement, and hands-on software development.
                                    </p>
                                </div>

                                <div className="hero-capabilities" aria-label="Key capabilities">
                                    <span className="capability-pill">
                                        <span className="cap-icon icon-product-owner">
                                            <CheckCircle size={18} />
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
                                            <Database size={18} />
                                        </span>
                                        SQL
                                    </span>

                                    <span className="capability-pill">
                                        <span className="cap-icon icon-powerapps">
                                            <LayoutDashboard size={18} />
                                        </span>
                                        Power Apps
                                    </span>

                                    <span className="capability-pill">
                                        <span className="cap-icon icon-sharepoint">
                                            <Share2 size={18} />
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
                                            <LinkIcon size={18} />
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
                                        <span className="hero-cert-label">CERTIFIED</span>
                                        <h2>Certified Scrum Product Owner (CSPO)</h2>
                                        <strong>Scrum Alliance</strong>
                                        <p>
                                            Professional credential supporting Agile product leadership, prioritization,
                                            stakeholder alignment, and iterative delivery of user-focused value.
                                        </p>
                                    </div>

                                    <button type="button" className="hero-cert-link" onClick={onCerts}>
                                        View Certifications
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>

                            <aside className="hero-side">
                                <div className="identity-panel">
                                    <div className="identity-photo-wrap">
                                        <img src="/Image.png" alt="Troy Oubre" className="identity-photo" />
                                    </div>

                                    <span className="identity-eyebrow">TROY M. OUBRE</span>
                                    <h2>
                                        Product-minded.
                                        <br />
                                        Technically fluent.
                                    </h2>
                                    <p>Operations grounded.</p>
                                </div>

                                <div className="hero-action-panel">
                                    <button type="button" className="hero-action hero-action-primary" onClick={onContact}>
                                        <span className="hero-action-icon">
                                            <Send size={20} />
                                        </span>
                                        <span>Get in Touch</span>
                                        <ArrowRight className="hero-action-arrow" size={18} />
                                    </button>

                                    <button type="button" className="hero-action" onClick={onResume}>
                                        <span className="hero-action-icon">
                                            <FileText size={20} />
                                        </span>
                                        <span>View Resume</span>
                                        <ArrowRight className="hero-action-arrow" size={18} />
                                    </button>

                                    <button type="button" className="hero-action" onClick={onProjects}>
                                        <span className="hero-action-icon">
                                            <Folder size={20} />
                                        </span>
                                        <span>Technical Portfolio</span>
                                        <ArrowRight className="hero-action-arrow" size={18} />
                                    </button>
                                </div>

                                <div className="hero-quote">
                                    <Quote className="quote-icon" size={30} />
                                    <blockquote>
                                        Technology is most powerful when it solves real problems for real people.
                                    </blockquote>
                                    <cite>— Troy Oubre</cite>
                                </div>
                            </aside>
                        </div>

                        <button type="button" className="hero-scroll" onClick={onExperience}>
                            <span>EXPLORE EXPERIENCE</span>
                            <ChevronDown size={21} />
                        </button>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <div className="container footer-clean">
                    <div className="footer-brand">
                        <div className="footer-monogram">TO</div>

                        <div>
                            <strong className="footer-name">Troy M. Oubre</strong>
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

                    <div className="footer-built">Built with React + Vite</div>
                </div>
            </footer>
        </div>
    );
}
