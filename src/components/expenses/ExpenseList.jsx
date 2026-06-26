import { useState } from 'react'
import { Pencil, Trash2, Receipt } from 'lucide-react'
import { getCategory } from '../../utils/categories'
import { formatCurrency, formatDate } from '../../utils/formatters'
import EmptyState from '../common/EmptyState'
import ConfirmDialog from '../common/ConfirmDialog'

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  const [pendingDelete, setPendingDelete] = useState(null)

  if (expenses.length === 0) {
    return (
      <EmptyState
        icon={Receipt}
        title="No expenses found"
        message="Nothing matches your filters yet — try clearing them, or add a new expense to get started."
      />
    )
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-hidden rounded-ticket border border-ink-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-ink-raised text-left text-xs text-ledger-muted uppercase tracking-wide">
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium text-right">Amount</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp, idx) => {
              const cat = getCategory(exp.category)
              return (
                <tr
                  key={exp.id}
                  className={`border-t border-ink-line hover:bg-white/[0.02] ${idx % 2 === 1 ? 'bg-white/[0.01]' : ''}`}
                >
                  <td className="px-4 py-3">
                    <p className="text-ledger-text">{exp.title}</p>
                    {exp.notes && <p className="text-xs text-ledger-faint mt-0.5 truncate max-w-xs">{exp.notes}</p>}
                  </td>
                  <td className="px-4 py-3">
                    <CategoryBadge category={cat} />
                  </td>
                  <td className="px-4 py-3 text-ledger-muted">{formatDate(exp.date)}</td>
                  <td className="px-4 py-3 text-right font-mono tabular text-ledger-text">
                    {formatCurrency(exp.amount)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => onEdit(exp)}
                        className="p-1.5 rounded-lg text-ledger-muted hover:text-sage-bright hover:bg-sage/10 focus-ring"
                        aria-label={`Edit ${exp.title}`}
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => setPendingDelete(exp)}
                        className="p-1.5 rounded-lg text-ledger-muted hover:text-coral hover:bg-coral/10 focus-ring"
                        aria-label={`Delete ${exp.title}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-2.5">
        {expenses.map((exp) => {
          const cat = getCategory(exp.category)
          return (
            <div key={exp.id} className="rounded-xl border border-ink-line bg-ink-soft p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-ledger-text font-medium truncate">{exp.title}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <CategoryBadge category={cat} />
                    <span className="text-xs text-ledger-faint">{formatDate(exp.date)}</span>
                  </div>
                  {exp.notes && <p className="text-xs text-ledger-faint mt-1.5">{exp.notes}</p>}
                </div>
                <p className="font-mono tabular text-ledger-text shrink-0">{formatCurrency(exp.amount)}</p>
              </div>
              <div className="mt-3 flex gap-2 pt-3 border-t border-ink-line">
                <button
                  onClick={() => onEdit(exp)}
                  className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium text-ledger-muted
                    hover:text-sage-bright py-1.5 rounded-lg hover:bg-sage/10 focus-ring"
                >
                  <Pencil size={13} /> Edit
                </button>
                <button
                  onClick={() => setPendingDelete(exp)}
                  className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium text-ledger-muted
                    hover:text-coral py-1.5 rounded-lg hover:bg-coral/10 focus-ring"
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <ConfirmDialog
        open={!!pendingDelete}
        onClose={() => setPendingDelete(null)}
        onConfirm={() => onDelete(pendingDelete.id)}
        title="Delete this expense?"
        message={`"${pendingDelete?.title}" for ${pendingDelete ? formatCurrency(pendingDelete.amount) : ''} will be removed permanently. This can't be undone.`}
      />
    </>
  )
}

function CategoryBadge({ category }) {
  const Icon = category.icon
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ backgroundColor: `${category.color}1A`, color: category.color }}
    >
      <Icon size={12} />
      {category.label}
    </span>
  )
}
