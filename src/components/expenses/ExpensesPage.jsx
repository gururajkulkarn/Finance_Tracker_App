import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import Button from '../common/Button'
import ExpenseFilters from './ExpenseFilters'
import ExpenseList from './ExpenseList'
import ExpenseFormModal from './ExpenseFormModal'
import Spinner from '../common/Spinner'
import { useExpenses } from '../../hooks/useExpenses'
import { useToast } from '../common/Toast'

export default function ExpensesPage() {
  const { expenses, loading, error, addExpense, updateExpense, deleteExpense } = useExpenses()
  const toast = useToast()
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [filters, setFilters] = useState({ search: '', category: 'All', from: '', to: '' })

  const filtered = useMemo(() => {
    return expenses.filter((exp) => {
      if (filters.category !== 'All' && exp.category !== filters.category) return false
      if (filters.from && exp.date < filters.from) return false
      if (filters.to && exp.date > filters.to) return false
      if (filters.search) {
        const q = filters.search.toLowerCase()
        const hit = exp.title?.toLowerCase().includes(q) || exp.notes?.toLowerCase().includes(q)
        if (!hit) return false
      }
      return true
    })
  }, [expenses, filters])

  const openAdd = () => {
    setEditing(null)
    setFormOpen(true)
  }
  const openEdit = (exp) => {
    setEditing(exp)
    setFormOpen(true)
  }

  const handleSave = async (data) => {
    if (editing) {
      await updateExpense(editing.id, data)
      toast.success('Expense updated.')
    } else {
      await addExpense(data)
      toast.success('Expense added.')
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id)
      toast.success('Expense deleted.')
    } catch {
      toast.error('Could not delete this expense.')
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 gap-3">
        <div>
          <h1 className="font-display text-2xl text-ledger-text">Expenses</h1>
          <p className="text-sm text-ledger-muted mt-0.5">
            {filtered.length} of {expenses.length} expense{expenses.length === 1 ? '' : 's'}
          </p>
        </div>
        <Button icon={Plus} onClick={openAdd}>Add expense</Button>
      </div>

      <div className="mb-5">
        <ExpenseFilters filters={filters} setFilters={setFilters} />
      </div>

      {error && (
        <p className="mb-4 text-sm text-coral bg-coral/10 border border-coral/30 rounded-xl px-4 py-3">{error}</p>
      )}

      {loading ? (
        <div className="flex justify-center py-16 text-ledger-muted">
          <Spinner size={24} />
        </div>
      ) : (
        <ExpenseList expenses={filtered} onEdit={openEdit} onDelete={handleDelete} />
      )}

      <ExpenseFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSave={handleSave}
        initialExpense={editing}
      />
    </div>
  )
}
