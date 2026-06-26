const VARIANTS = {
  primary: 'bg-sage text-white hover:bg-sage-dim active:bg-sage-bright shadow-card',
  ghost: 'bg-white text-ledger-text hover:bg-ink-raised border border-ink-line',
  danger: 'bg-coral text-white hover:bg-coral-dim shadow-card',
  subtle: 'bg-ink-raised text-ledger-text hover:bg-ink-line border border-ink-line',
}

export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  className = '',
  icon: Icon,
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold
        transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed
        focus-ring ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={16} strokeWidth={2.25} />}
      {children}
    </button>
  )
}