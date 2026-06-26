export default function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      {Icon && (
        <div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-ink-raised border border-ink-line text-sage">
          <Icon size={22} />
        </div>
      )}
      <h3 className="font-display text-base text-ledger-text">{title}</h3>
      {message && <p className="mt-1.5 text-sm text-ledger-muted max-w-xs">{message}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
