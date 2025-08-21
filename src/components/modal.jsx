import React, { useEffect } from 'react'

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose?.()
    }
    if (isOpen) {
      document.addEventListener('keydown', onKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleBackdrop = (e) => {
    // close when clicking outside modal panel
    if (e.target.classList.contains('modal-backdrop')) onClose?.()
  }

  return (
    <div className="modal-backdrop" onMouseDown={handleBackdrop} role="dialog" aria-modal="true" aria-label={title || 'Dialog'}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-header">
          {title && <h3 className="modal-title">{title}</h3>}
          <button className="modal-close" aria-label="Close dialog" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
      <button className="modal-sr-exit" aria-hidden="true" onClick={onClose} />
    </div>
  )
}
