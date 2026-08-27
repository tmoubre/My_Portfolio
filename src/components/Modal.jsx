import React, { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR =
    'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function Modal({ isOpen, onClose, title, children }) {
    const backdropRef = useRef(null);
    const panelRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return undefined;

        const previousOverflow = document.body.style.overflow;

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose?.();
                return;
            }

            if (event.key !== 'Tab' || !panelRef.current) return;

            const focusableElements = Array.from(
                panelRef.current.querySelectorAll(FOCUSABLE_SELECTOR)
            );

            if (focusableElements.length === 0) return;

            const first = focusableElements[0];
            const last = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        const focusTimer = window.setTimeout(() => {
            const firstFocusable = panelRef.current?.querySelector(FOCUSABLE_SELECTOR);
            (firstFocusable || panelRef.current)?.focus();
        }, 0);

        return () => {
            window.clearTimeout(focusTimer);
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleBackdropMouseDown = (event) => {
        if (event.target === backdropRef.current) {
            onClose?.();
        }
    };

    const titleId = 'modal-title';
    const bodyId = 'modal-body';

    return (
        <div
            ref={backdropRef}
            className="modal-backdrop"
            onMouseDown={handleBackdropMouseDown}
        >
            <div
                ref={panelRef}
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? titleId : undefined}
                aria-describedby={bodyId}
                tabIndex={-1}
            >
                <div className="modal-header">
                    {title && (
                        <h3 id={titleId} className="modal-title">
                            {title}
                        </h3>
                    )}

                    <button
                        type="button"
                        className="modal-close"
                        aria-label="Close dialog"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                <div id={bodyId} className="modal-body">
                    {children}
                </div>
            </div>

            <button
                type="button"
                className="modal-sr-exit"
                aria-hidden="true"
                tabIndex={-1}
                onClick={onClose}
            />
        </div>
    );
}
