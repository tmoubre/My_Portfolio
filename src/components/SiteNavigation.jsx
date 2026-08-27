import React from 'react';
import { Home, FileText, Briefcase, Folder, Award, Mail } from 'lucide-react';
import { FaGithub, FaLinkedinIn, FaMedium, FaXTwitter } from 'react-icons/fa6';
import { GITHUB, LINKEDIN, MEDIUM, X } from '../data/siteConfig.js';

const NAV_ITEMS = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Folder },
    { id: 'certs', label: 'Certs', ariaLabel: 'Certifications', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail },
];

const SOCIAL_LINKS = [
    { label: 'GitHub', href: GITHUB, className: 'social-github', icon: FaGithub },
    { label: 'LinkedIn', href: LINKEDIN, className: 'social-linkedin', icon: FaLinkedinIn },
    { label: 'Medium', href: MEDIUM, className: 'social-medium', icon: FaMedium },
    { label: 'X', href: X, className: 'social-x', icon: FaXTwitter },
];

export default function SiteNavigation({ activeNav, onNavigate }) {
    return (
        <>
            <aside className="side-nav">
                <div className="side-nav-main">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.id}
                                type="button"
                                className={`side-nav-item ${activeNav === item.id ? 'active' : ''}`}
                                onClick={() => onNavigate(item.id)}
                                aria-label={item.ariaLabel ?? item.label}
                            >
                                <span className="side-nav-icon">
                                    <Icon size={24} />
                                </span>
                                <span className="side-nav-label">{item.label}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="side-social">
                    {SOCIAL_LINKS.map((item) => {
                        const Icon = item.icon;

                        return (
                            <a
                                key={item.label}
                                href={item.href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={item.label}
                                title={item.label}
                                className={item.className}
                            >
                                <Icon />
                            </a>
                        );
                    })}
                </div>
            </aside>

            <header className="nav">
                <div className="container nav-inner">
                    <div className="brand-lockup">
                        <div className="brand-monogram">TO</div>

                        <div className="brand-copy">
                            <div className="brand-name">Troy M. Oubre</div>
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
                        {NAV_ITEMS.map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    className="mobile-nav-link"
                                    onClick={() => onNavigate(item.id)}
                                    aria-label={item.ariaLabel ?? item.label}
                                >
                                    <Icon size={18} />
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </header>
        </>
    );
}
