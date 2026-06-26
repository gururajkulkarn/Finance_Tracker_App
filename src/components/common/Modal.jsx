import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children, maxWidth = 'max-w-md' }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className={`w-full ${maxWidth} rounded-ticket border border-ink-line bg-ink-soft shadow-card
          max-h-[90vh] overflow-y-auto animate-[fadeIn_.15s_ease-out]`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-ink-line sticky top-0 bg-ink-soft">
          <h2 className="font-display text-lg text-ledger-text">{title}</h2>
          <button
            onClick={onClose}
            className="text-ledger-muted hover:text-ledger-text rounded-lg p-1.5 hover:bg-ink-raised focus-ring"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}