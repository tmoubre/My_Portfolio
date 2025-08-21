import React, { useEffect, useRef } from 'react'

export default function Modal({ isOpen, onClose, title, children }) {
  const backdropRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose?.()
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll(
          'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const list = Array.from(focusables)
        if (list.length === 0) return
        const first = list[0]
        const last = list[list.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus()
        }
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', onKeyDown)
      document.body.style.overflow = 'hidden'
      // initial focus
      setTimeout(() => {
        const first = panelRef.current?.querySelector(
          'input, textarea, button, a, [tabindex]:not([tabindex="-1"])'
        )
        ;(first || panelRef.current)?.focus()
      }, 0)
    }
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleBackdropMouseDown = (e) => {
    if (e.target === backdropRef.current) onClose?.()
  }

  const titleId = 'modal-title'
  const bodyId = 'modal-body'

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
          {title && <h3 id={titleId} className="modal-title">{title}</h3>}
          <button className="modal-close" aria-label="Close dialog" onClick={onClose}>✕</button>
        </div>
        <div id={bodyId} className="modal-body">
          {children}
        </div>
      </div>
      <button className="modal-sr-exit" aria-hidden="true" onClick={onClose} />
    </div>
  )
}
