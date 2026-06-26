import { formatCurrency } from '../../utils/formatters'

export default function CategoryBreakdown({ data, total }) {
  if (data.length === 0) {
    return <p className="text-sm text-ledger-faint">Nothing to break down yet.</p>
  }
  return (
    <ul className="space-y-2.5">
      {data.map((c) => {
        const pct = total > 0 ? (c.value / total) * 100 : 0
        return (
          <li key={c.name} className="ledger-row text-sm">
            <span className="flex items-center gap-2 text-ledger-muted">
              <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
              {c.name}
            </span>
            <span className="leader" />
            <span className="text-ledger-faint text-xs tabular w-10 text-right">{pct.toFixed(0)}%</span>
            <span className="font-mono tabular text-ledger-text w-20 text-right">{formatCurrency(c.value)}</span>
          </li>
        )
      })}
    </ul>
  )
}
