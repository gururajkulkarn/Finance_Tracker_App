import { Pencil } from 'lucide-react'
import { formatCurrency, clampPercent } from '../../utils/formatters'
import Button from '../common/Button'

export default function BudgetProgress({ budget, spent, onEditBudget }) {
  const remaining = budget - spent
  const percent = budget > 0 ? clampPercent((spent / budget) * 100) : 0
  const over = remaining < 0

  const barColor = over ? '#E07856' : percent >= 85 ? '#D9A656' : '#79A88A'

  return (
    <div className="ticket-edge rounded-ticket bg-ink-soft border border-ink-line shadow-card px-6 py-7">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-ledger-muted uppercase tracking-wide">This month&rsquo;s budget</p>
          <p className="mt-1.5 font-display text-3xl text-ledger-text tabular">{formatCurrency(budget)}</p>
        </div>
        <Button variant="subtle" icon={Pencil} onClick={onEditBudget}>
          {budget > 0 ? 'Update' : 'Set budget'}
        </Button>
      </div>

      <div className="mt-6">
        <div className="h-3 w-full rounded-full bg-ink-raised border border-ink-line overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${percent}%`, backgroundColor: barColor }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-ledger-faint">
          <span>{percent.toFixed(0)}% used</span>
          <span>{formatCurrency(budget)} total</span>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-dotted border-ink-line space-y-2.5">
        <div className="ledger-row text-sm">
          <span className="text-ledger-muted">Spent so far</span>
          <span className="leader" />
          <span className="font-mono tabular text-ledger-text">{formatCurrency(spent)}</span>
        </div>
        <div className="ledger-row text-sm">
          <span className="text-ledger-muted">{over ? 'Over budget by' : 'Remaining'}</span>
          <span className="leader" />
          <span className={`font-mono tabular ${over ? 'text-coral' : 'text-sage-bright'}`}>
            {formatCurrency(Math.abs(remaining))}
          </span>
        </div>
      </div>
    </div>
  )
}
