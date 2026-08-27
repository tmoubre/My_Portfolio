import React from 'react';
import {
    Home,
    FileText,
    Briefcase,
    Folder,
    Award,
    Mail,
} from 'lucide-react';
import {
    FaGithub,
    FaLinkedinIn,
    FaMedium,
    FaXTwitter,
} from 'react-icons/fa6';

const SOCIAL_LINKS = [
    {
        label: 'GitHub',
        href: 'https://github.com/tmoubre',
        className: 'social-github',
        icon: FaGithub,
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/troy-oubre-32170a32/',
        className: 'social-linkedin',
        icon: FaLinkedinIn,
    },
    {
        label: 'Medium',
        href: 'https://medium.com/@scinetbr',
        className: 'social-medium',
        icon: FaMedium,
    },
    {
        label: 'X',
        href: 'https://x.com/troydevelops',
        className: 'social-x',
        icon: FaXTwitter,
    },
];

export default function SiteNavigation({
    activeNav,
    onHome,
    onResume,
    onExperience,
    onProjects,
    onCerts,
    onContact,
}) {
    const navItems = [
        { id: 'home', label: 'Home', icon: Home, action: onHome },
        { id: 'resume', label: 'Resume', icon: FileText, action: onResume },
        { id: 'experience', label: 'Experience', icon: Briefcase, action: onExperience },
        { id: 'projects', label: 'Projects', icon: Folder, action: onProjects },
        { id: 'certs', label: 'Certs', ariaLabel: 'Certifications', icon: Award, action: onCerts },
        { id: 'contact', label: 'Contact', icon: Mail, action: onContact },
    ];

    return (
        <>
            <aside className="side-nav">
                <div className="side-nav-main">
                    {navItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.id}
                                type="button"
                                className={`side-nav-item ${activeNav === item.id ? 'active' : ''}`}
                                onClick={item.action}
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
                        {navItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    className="mobile-nav-link"
                                    onClick={item.action}
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
