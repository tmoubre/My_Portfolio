// src/components/CertsModal.jsx
import React, { useState } from "react";
import Modal from "./Modal";
import { certs } from "../data/certs";
import "../styles/certs.css";

export default function CertsModal({ isOpen, onClose }) {
  const [selected, setSelected] = useState(null);

  const handleClose = () => {
    setSelected(null);
    onClose?.();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Certificates">
      {/* Keep this container simple and TOP-aligned */}
      <div className="certs-wrap">
        {!selected ? (
          /* GRID view: thumbnails start at the top */
          <section className="certs-grid" aria-label="Certificates">
            {certs.map((c) => (
              <article key={c.id} className="certs-card">
                <button
                  type="button"
                  className="certs-card-btn"
                  onClick={() => setSelected(c)}
                  aria-label={`Open ${c.title}`}
                >
                  <img
                    src={c.thumbnail}
                    alt={c.alt || `${c.title} thumbnail`}
                    className="certs-thumb"
                    loading="lazy"
                  />
                  <div className="certs-card-body">
                    <h3 className="certs-card-title">{c.title}</h3>
                    <p className="certs-card-meta">
                      {c.issuer}{c.date ? ` • ${c.date}` : ""}
                    </p>
                    <p className="certs-card-desc">{c.description}</p>
                  </div>
                </button>
              </article>
            ))}
          </section>
        ) : (
          <>
            <div className="certs-toolbar">
              <button
                type="button"
                className="certs-btn"
                onClick={() => setSelected(null)}
                aria-label="Back to all certificates"
              >
                ← Back
              </button>
            </div>

            <section className="certs-view" aria-live="polite">
              <div className="certs-view-image-wrap">
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
                    Verify
                  </a>
                )}
                {selected.allowDownload && (
                  <a
                    href={selected.downloadUrl || selected.image}
                    download
                    className="certs-btn"
                  >
                    Download
                  </a>
                )}
                <a
                  href={selected.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="certs-btn"
                >
                  View full size
                </a>
              </div>
            </section>
          </>
        )}
      </div>
    </Modal>
  );
}
