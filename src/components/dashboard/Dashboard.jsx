import { useMemo, useState } from 'react'
import { Wallet, TrendingDown, PiggyBank } from 'lucide-react'
import StatCard from './StatCard'
import BudgetProgress from './BudgetProgress'
import RecentTransactions from './RecentTransactions'
import CategoryBreakdown from './CategoryBreakdown'
import CategoryPieChart from '../charts/CategoryPieChart'
import MonthlyTrendChart from '../charts/MonthlyTrendChart'
import BudgetModal from '../budget/BudgetModal'
import Spinner from '../common/Spinner'
import { useExpenses } from '../../hooks/useExpenses'
import { useBudget } from '../../hooks/useBudget'
import { useToast } from '../common/Toast'
import { CATEGORIES } from '../../utils/categories'
import { currentMonthKey, monthKeyFromDate, formatMonthLabel, formatCurrency } from '../../utils/formatters'

export default function Dashboard() {
  const monthKey = currentMonthKey()
  const { expenses, loading: expensesLoading, error: expensesError } = useExpenses()
  const { budget, loading: budgetLoading, setMonthlyBudget } = useBudget(monthKey)
  const toast = useToast()
  const [budgetModalOpen, setBudgetModalOpen] = useState(false)

  const monthExpenses = useMemo(
    () => expenses.filter((e) => monthKeyFromDate(e.date) === monthKey),
    [expenses, monthKey]
  )

  const totalSpent = useMemo(
    () => monthExpenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0),
    [monthExpenses]
  )

  const categoryData = useMemo(() => {
    const totals = {}
    monthExpenses.forEach((e) => {
      totals[e.category] = (totals[e.category] || 0) + (Number(e.amount) || 0)
    })
    return CATEGORIES.map((c) => ({ name: c.label, value: totals[c.id] || 0, color: c.color }))
      .filter((c) => c.value > 0)
      .sort((a, b) => b.value - a.value)
  }, [monthExpenses])

  const trendData = useMemo(() => {
    const months = []
    const now = new Date()
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`)
    }
    const totals = {}
    expenses.forEach((e) => {
      const key = monthKeyFromDate(e.date)
      totals[key] = (totals[key] || 0) + (Number(e.amount) || 0)
    })
    return months.map((m) => ({ month: formatMonthLabel(m), total: totals[m] || 0 }))
  }, [expenses])

  const topCategory = categoryData[0]
  const remaining = budget - totalSpent

  if (expensesLoading || budgetLoading) {
    return (
      <div className="flex justify-center py-24 text-ledger-muted">
        <Spinner size={26} />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl text-ledger-text">Dashboard</h1>
        <p className="text-sm text-ledger-muted mt-0.5">A look at where this month&rsquo;s money is going.</p>
      </div>

      {expensesError && (
        <p className="mb-5 text-sm text-coral bg-coral/10 border border-coral/30 rounded-xl px-4 py-3">{expensesError}</p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Budget ticket */}
        <div className="lg:col-span-1">
          <BudgetProgress budget={budget} spent={totalSpent} onEditBudget={() => setBudgetModalOpen(true)} />
        </div>

        {/* Stat cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Total spent" value={formatCurrency(totalSpent)} icon={TrendingDown} />
          <StatCard
            label="Remaining balance"
            value={formatCurrency(Math.abs(remaining))}
            icon={PiggyBank}
            tone={remaining < 0 ? 'danger' : 'sage'}
            sub={remaining < 0 ? 'over budget' : 'left to spend'}
          />
          <StatCard
            label="Top category"
            value={topCategory ? topCategory.name : '—'}
            icon={Wallet}
            sub={topCategory ? formatCurrency(topCategory.value) : 'No spending yet'}
          />

          <div className="sm:col-span-3 rounded-ticket border border-ink-line bg-ink-soft p-5 shadow-card">
            <h3 className="font-display text-base text-ledger-text mb-1">Monthly trend</h3>
            <p className="text-xs text-ledger-muted mb-2">Spending over the last 6 months</p>
            <MonthlyTrendChart data={trendData} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
        <div className="rounded-ticket border border-ink-line bg-ink-soft p-5 shadow-card">
          <h3 className="font-display text-base text-ledger-text mb-1">Category breakdown</h3>
          <p className="text-xs text-ledger-muted mb-3">Where this month&rsquo;s spending went</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <CategoryPieChart data={categoryData} />
            <CategoryBreakdown data={categoryData} total={totalSpent} />
          </div>
        </div>

        <div className="rounded-ticket border border-ink-line bg-ink-soft p-5 shadow-card">
          <h3 className="font-display text-base text-ledger-text mb-1">Recent transactions</h3>
          <p className="text-xs text-ledger-muted mb-3">Your last few entries</p>
          <RecentTransactions expenses={monthExpenses} />
        </div>
      </div>

      <BudgetModal
        open={budgetModalOpen}
        onClose={() => setBudgetModalOpen(false)}
        currentBudget={budget}
        onSave={async (amount) => {
          await setMonthlyBudget(amount)
          toast.success('Budget saved.')
        }}
      />
    </div>
  )
}
