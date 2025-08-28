// src/components/CertsNavButton.jsx
import React from "react";

export default function CertsNavButton({ className = "modal-secondary btn-sm", onOpen }) {
  return (
    <button
      type="button"
      className={className}
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-expanded="false"
      aria-controls="certs-dialog"
    >
      Certs
    </button>
  );
}


