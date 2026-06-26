import { Search, X } from 'lucide-react'
import { CATEGORIES } from '../../utils/categories'

export default function ExpenseFilters({ filters, setFilters }) {
  const hasActiveFilters = filters.search || filters.category !== 'All' || filters.from || filters.to

  const clear = () => setFilters({ search: '', category: 'All', from: '', to: '' })

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ledger-faint" />
        <input
          value={filters.search}
          onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
          placeholder="Search expenses by title or note…"
          className="w-full rounded-xl bg-ink-raised border border-ink-line pl-9 pr-3.5 py-2.5
            text-sm text-ledger-text focus-ring focus:border-sage/50 placeholder:text-ledger-faint"
        />
      </div>

      <select
        value={filters.category}
        onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
        className="rounded-xl bg-ink-raised border border-ink-line px-3.5 py-2.5 text-sm text-ledger-text
          focus-ring focus:border-sage/50 sm:w-44"
      >
        <option value="All">All categories</option>
        {CATEGORIES.map((c) => (
          <option key={c.id} value={c.id}>{c.label}</option>
        ))}
      </select>

      <input
        type="date"
        value={filters.from}
        onChange={(e) => setFilters((f) => ({ ...f, from: e.target.value }))}
        className="rounded-xl bg-ink-raised border border-ink-line px-3.5 py-2.5 text-sm text-ledger-text
          focus-ring focus:border-sage/50 sm:w-40"
        aria-label="From date"
      />
      <input
        type="date"
        value={filters.to}
        onChange={(e) => setFilters((f) => ({ ...f, to: e.target.value }))}
        className="rounded-xl bg-ink-raised border border-ink-line px-3.5 py-2.5 text-sm text-ledger-text
          focus-ring focus:border-sage/50 sm:w-40"
        aria-label="To date"
      />

      {hasActiveFilters && (
        <button
          onClick={clear}
          className="flex items-center gap-1.5 text-xs text-ledger-muted hover:text-coral px-2 shrink-0 focus-ring rounded-lg"
        >
          <X size={14} /> Clear
        </button>
      )}
    </div>
  )
}
