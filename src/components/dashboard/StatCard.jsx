export default function StatCard({ label, value, icon: Icon, tone = 'default', sub }) {
  const toneClasses = {
    default: 'text-ledger-text',
    danger: 'text-coral',
    sage: 'text-sage-bright',
  }
  return (
    <div className="rounded-ticket border border-ink-line bg-ink-soft p-5 shadow-card">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-ledger-muted uppercase tracking-wide">{label}</span>
        {Icon && (
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-ink-raised text-ledger-muted">
            <Icon size={15} />
          </div>
        )}
      </div>
      <p className={`mt-3 font-display text-2xl sm:text-3xl tabular ${toneClasses[tone]}`}>{value}</p>
      {sub && <p className="mt-1 text-xs text-ledger-faint">{sub}</p>}
    </div>
  )
}
