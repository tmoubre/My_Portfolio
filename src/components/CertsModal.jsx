import React, { useMemo, useState } from 'react';
import Modal from './Modal';
import { certs } from '../data/certs';
import '../styles/certs.css';

const PROFESSIONAL = 'professional';

export default function CertsModal({ isOpen, onClose }) {
    const [selected, setSelected] = useState(null);
    const [filter, setFilter] = useState('all');

    const professionalCount = useMemo(
        () => certs.filter((cert) => cert.category === PROFESSIONAL).length,
        []
    );

    const filteredCerts = useMemo(
        () =>
            filter === PROFESSIONAL
                ? certs.filter((cert) => cert.category === PROFESSIONAL)
                : certs,
        [filter]
    );

    const handleClose = () => {
        setSelected(null);
        setFilter('all');
        onClose?.();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Certificates">
            <div className="certs-wrap">
                {selected ? (
                    <CertificateDetail
                        certificate={selected}
                        onBack={() => setSelected(null)}
                    />
                ) : (
                    <CertificateGallery
                        certificates={filteredCerts}
                        filter={filter}
                        professionalCount={professionalCount}
                        onFilterChange={setFilter}
                        onSelect={setSelected}
                    />
                )}
            </div>
        </Modal>
    );
}

function CertificateGallery({
    certificates,
    filter,
    professionalCount,
    onFilterChange,
    onSelect,
}) {
    return (
        <>
            <div className="certs-intro">
                <p>Professional credentials and continuous learning achievements.</p>
            </div>

            <div className="certs-filters" role="group" aria-label="Filter certificates">
                <FilterButton
                    active={filter === 'all'}
                    label="All Certificates"
                    count={certs.length}
                    onClick={() => onFilterChange('all')}
                />

                <FilterButton
                    active={filter === PROFESSIONAL}
                    label="Professional Certifications"
                    count={professionalCount}
                    onClick={() => onFilterChange(PROFESSIONAL)}
                />
            </div>

            <section className="certs-grid" aria-label="Certificates">
                {certificates.map((cert) => (
                    <CertificateCard
                        key={cert.id}
                        certificate={cert}
                        onSelect={onSelect}
                    />
                ))}
            </section>

            <div className="certs-footer-message">
                <span className="certs-footer-mark">◆</span>
                <span>Always learning. Always building. Always delivering value.</span>
            </div>
        </>
    );
}

function FilterButton({ active, label, count, onClick }) {
    return (
        <button
            type="button"
            className={`certs-filter-btn ${active ? 'active' : ''}`}
            onClick={onClick}
        >
            {label}
            <span className="certs-count">{count}</span>
        </button>
    );
}

function CertificateCard({ certificate, onSelect }) {
    const isProfessional = certificate.category === PROFESSIONAL;
    const isBadge = certificate.id === 'cspo';

    return (
        <article
            className={`certs-card ${isProfessional ? 'certs-card-professional' : ''}`}
        >
            <button
                type="button"
                className="certs-card-btn"
                onClick={() => onSelect(certificate)}
                aria-label={`Open ${certificate.title}`}
            >
                <div className="certs-image-wrap">
                    <img
                        src={certificate.thumbnail}
                        alt={certificate.alt || `${certificate.title} thumbnail`}
                        className={`certs-thumb ${isBadge ? 'certs-thumb-badge' : ''}`}
                        loading="lazy"
                    />
                </div>

                <div className="certs-card-body">
                    <span className="certs-issuer">{certificate.issuer}</span>
                    <h3 className="certs-card-title">{certificate.title}</h3>

                    {certificate.date && (
                        <p className="certs-card-meta">{certificate.date}</p>
                    )}

                    <div className="certs-card-divider" />
                    <p className="certs-card-desc">{certificate.description}</p>

                    <span className="certs-view-link">
                        {isProfessional ? 'View Credential' : 'View Certificate'}
                        <span aria-hidden="true"> →</span>
                    </span>
                </div>
            </button>
        </article>
    );
}

function CertificateDetail({ certificate, onBack }) {
    const isBadge = certificate.id === 'cspo';

    return (
        <>
            <div className="certs-toolbar">
                <button
                    type="button"
                    className="certs-btn"
                    onClick={onBack}
                    aria-label="Back to all certificates"
                >
                    ← Back to certificates
                </button>
            </div>

            <section className="certs-view" aria-live="polite">
                <div className="certs-detail-heading">
                    <span className="certs-issuer">{certificate.issuer}</span>
                    <h3>{certificate.title}</h3>

                    {certificate.date && (
                        <p className="certs-card-meta">{certificate.date}</p>
                    )}

                    <p>{certificate.description}</p>
                </div>

                <div
                    className={`certs-view-image-wrap ${isBadge ? 'certs-badge-detail' : ''}`}
                >
                    <img
                        src={certificate.image}
                        alt={certificate.alt || certificate.title}
                        className="certs-view-image"
                    />
                </div>

                <div className="certs-actions">
                    {certificate.verifyUrl && (
                        <a
                            href={certificate.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="certs-btn solid"
                        >
                            Verify Credential
                        </a>
                    )}

                    {certificate.allowDownload && (
                        <a
                            href={certificate.downloadUrl || certificate.image}
                            download
                            className="certs-btn solid"
                        >
                            Download PDF
                        </a>
                    )}

                    <a
                        href={certificate.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="certs-btn"
                    >
                        View Full Size
                    </a>
                </div>
            </section>
        </>
    );
}
