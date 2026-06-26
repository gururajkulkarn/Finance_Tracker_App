import { Receipt } from 'lucide-react'
import { getCategory } from '../../utils/categories'
import { formatCurrency, formatDate } from '../../utils/formatters'
import EmptyState from '../common/EmptyState'

export default function RecentTransactions({ expenses }) {
  const recent = expenses.slice(0, 6)

  if (recent.length === 0) {
    return <EmptyState icon={Receipt} title="No transactions yet" message="Expenses you add will show up here." />
  }

  return (
    <ul className="divide-y divide-ink-line">
      {recent.map((exp) => {
        const cat = getCategory(exp.category)
        const Icon = cat.icon
        return (
          <li key={exp.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
            <div
              className="grid h-9 w-9 place-items-center rounded-lg shrink-0"
              style={{ backgroundColor: `${cat.color}1A`, color: cat.color }}
            >
              <Icon size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-ledger-text truncate">{exp.title}</p>
              <p className="text-xs text-ledger-faint">{cat.label} · {formatDate(exp.date)}</p>
            </div>
            <p className="font-mono tabular text-sm text-ledger-text shrink-0">{formatCurrency(exp.amount)}</p>
          </li>
        )
      })}
    </ul>
  )
}
