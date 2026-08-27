import React, { useEffect, useRef, useState } from 'react';
import SiteNavigation from './components/SiteNavigation.jsx';
import HomePage from './components/HomePage.jsx';
import AppModals from './components/AppModals.jsx';
import { CONTACT_URL } from './data/siteConfig.js';

const INITIAL_FORM_STATUS = {
    state: 'idle',
    msg: '',
};

export default function App() {
    const [activeModal, setActiveModal] = useState(null);
    const [experienceTab, setExperienceTab] = useState('expertise');
    const [activeNav, setActiveNav] = useState('home');
    const [formStatus, setFormStatus] = useState(INITIAL_FORM_STATUS);
    const [toast, setToast] = useState({
        visible: false,
        msg: '',
        type: 'success',
    });

    const toastTimerRef = useRef(null);

    const showToast = (message, type = 'success', duration = 3500) => {
        setToast({ visible: true, msg: message, type });

        if (toastTimerRef.current) {
            clearTimeout(toastTimerRef.current);
        }

        toastTimerRef.current = setTimeout(() => {
            setToast((current) => ({ ...current, visible: false }));
        }, duration);
    };

    useEffect(() => {
        if (window.location.hash === '#contact') {
            setActiveModal('contact');
            setActiveNav('contact');
        }

        return () => {
            if (toastTimerRef.current) {
                clearTimeout(toastTimerRef.current);
            }
        };
    }, []);

    const closeModal = () => {
        setActiveModal(null);
        setActiveNav('home');
        setFormStatus(INITIAL_FORM_STATUS);
    };

    const openModal = (modal, options = {}) => {
        if (modal === 'experience') {
            setExperienceTab(options.tab ?? 'expertise');
        }

        setActiveModal(modal);
        setActiveNav(modal);
    };

    const scrollHome = () => {
        setActiveModal(null);
        setActiveNav('home');
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleNavigation = (destination) => {
        if (destination === 'home') {
            scrollHome();
            return;
        }

        openModal(destination, destination === 'experience' ? { tab: 'expertise' } : undefined);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setFormStatus({ state: 'sending', msg: '' });

        try {
            const form = event.currentTarget;
            const data = Object.fromEntries(new FormData(form).entries());
            const response = await fetch(CONTACT_URL, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                let msg = 'Something went wrong. Please try again or email me directly.';

                try {
                    const json = await response.json();
                    if (json?.errors?.length) {
                        msg = json.errors.map((error) => error.message).join(', ');
                    }
                } catch {
                    // Keep the fallback message when the response is not JSON.
                }

                setFormStatus({ state: 'error', msg });
                return;
            }

            form.reset();
            closeModal();
            showToast('Thanks! Your message was sent.');
        } catch {
            setFormStatus({
                state: 'error',
                msg: 'Network error. Please try again or email me directly.',
            });
        }
    };

    return (
        <div className="site-shell">
            <SiteNavigation activeNav={activeNav} onNavigate={handleNavigation} />

            <HomePage
                onContact={() => openModal('contact')}
                onResume={() => openModal('resume')}
                onProjects={() => openModal('projects')}
                onCerts={() => openModal('certs')}
                onExperience={() => openModal('experience', { tab: 'expertise' })}
            />

            <AppModals
                activeModal={activeModal}
                experienceTab={experienceTab}
                onExperienceTabChange={setExperienceTab}
                onClose={closeModal}
                onContactSubmit={handleFormSubmit}
                formStatus={formStatus}
            />

            <div
                className={`toast ${toast.visible ? 'show' : ''} ${toast.type}`}
                role="status"
                aria-live="polite"
            >
                {toast.msg}
            </div>
        </div>
    );
}
