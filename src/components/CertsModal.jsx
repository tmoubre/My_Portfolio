// src/components/CertsModal.jsx

import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import { certs } from "../data/certs";
import "../styles/certs.css";

export default function CertsModal({ isOpen, onClose }) {
    const [selected, setSelected] = useState(null);
    const [filter, setFilter] = useState("all");

    const handleClose = () => {
        setSelected(null);
        setFilter("all");
        onClose?.();
    };

    const filteredCerts = useMemo(() => {
        if (filter === "professional") {
            return certs.filter((cert) => cert.category === "professional");
        }

        return certs;
    }, [filter]);

    const professionalCount = certs.filter(
        (cert) => cert.category === "professional"
    ).length;

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Certificates"
        >
            <div className="certs-wrap">
                {!selected ? (
                    <>
                        {/* Intro */}
                        <div className="certs-intro">
                            <p>
                                Professional credentials and continuous learning achievements.
                            </p>
                        </div>

                        {/* Filters */}
                        <div
                            className="certs-filters"
                            role="group"
                            aria-label="Filter certificates"
                        >
                            <button
                                type="button"
                                className={`certs-filter-btn ${filter === "all" ? "active" : ""
                                    }`}
                                onClick={() => setFilter("all")}
                            >
                                All Certificates
                                <span className="certs-count">{certs.length}</span>
                            </button>

                            <button
                                type="button"
                                className={`certs-filter-btn ${filter === "professional" ? "active" : ""
                                    }`}
                                onClick={() => setFilter("professional")}
                            >
                                Professional Certifications
                                <span className="certs-count">{professionalCount}</span>
                            </button>
                        </div>

                        {/* Certificate cards */}
                        <section
                            className="certs-grid"
                            aria-label="Certificates"
                        >
                            {filteredCerts.map((cert) => (
                                <article
                                    key={cert.id}
                                    className={`certs-card ${cert.category === "professional"
                                            ? "certs-card-professional"
                                            : ""
                                        }`}
                                >
                                    <button
                                        type="button"
                                        className="certs-card-btn"
                                        onClick={() => setSelected(cert)}
                                        aria-label={`Open ${cert.title}`}
                                    >
                                        <div className="certs-image-wrap">
                                            <img
                                                src={cert.thumbnail}
                                                alt={cert.alt || `${cert.title} thumbnail`}
                                                className={`certs-thumb ${cert.id === "cspo"
                                                        ? "certs-thumb-badge"
                                                        : ""
                                                    }`}
                                                loading="lazy"
                                            />
                                        </div>

                                        <div className="certs-card-body">
                                            <span className="certs-issuer">
                                                {cert.issuer}
                                            </span>

                                            <h3 className="certs-card-title">
                                                {cert.title}
                                            </h3>

                                            {cert.date && (
                                                <p className="certs-card-meta">
                                                    {cert.date}
                                                </p>
                                            )}

                                            <div className="certs-card-divider" />

                                            <p className="certs-card-desc">
                                                {cert.description}
                                            </p>

                                            <span className="certs-view-link">
                                                {cert.category === "professional"
                                                    ? "View Credential"
                                                    : "View Certificate"}
                                                <span aria-hidden="true"> →</span>
                                            </span>
                                        </div>
                                    </button>
                                </article>
                            ))}
                        </section>

                        <div className="certs-footer-message">
                            <span className="certs-footer-mark">
                                ◆
                            </span>

                            <span>
                                Always learning. Always building. Always delivering value.
                            </span>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Detail toolbar */}
                        <div className="certs-toolbar">
                            <button
                                type="button"
                                className="certs-btn"
                                onClick={() => setSelected(null)}
                                aria-label="Back to all certificates"
                            >
                                ← Back to certificates
                            </button>
                        </div>

                        {/* Detail view */}
                        <section
                            className="certs-view"
                            aria-live="polite"
                        >
                            <div className="certs-detail-heading">
                                <span className="certs-issuer">
                                    {selected.issuer}
                                </span>

                                <h3>
                                    {selected.title}
                                </h3>

                                {selected.date && (
                                    <p className="certs-card-meta">
                                        {selected.date}
                                    </p>
                                )}

                                <p>
                                    {selected.description}
                                </p>
                            </div>

                            <div
                                className={`certs-view-image-wrap ${selected.id === "cspo"
                                        ? "certs-badge-detail"
                                        : ""
                                    }`}
                            >
                                <img
                                    src={selected.image}
                                    alt={selected.alt || selected.title}
                                    className="certs-view-image"
                                />
                            </div>

                            <div className="certs-actions">
                                {selected.verifyUrl && (
                                    <a
                                        href={selected.verifyUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="certs-btn solid"
                                    >
                                        Verify Credential
                                    </a>
                                )}

                                {selected.allowDownload && (
                                    <a
                                        href={
                                            selected.downloadUrl ||
                                            selected.image
                                        }
                                        download
                                        className="certs-btn solid"
                                    >
                                        Download PDF
                                    </a>
                                )}

                                <a
                                    href={selected.image}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="certs-btn"
                                >
                                    View Full Size
                                </a>
                            </div>
                        </section>
                    </>
                )}
            </div>
        </Modal>
    );
}