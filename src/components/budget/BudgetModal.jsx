import { useState } from 'react'
import Modal from '../common/Modal'
import Button from '../common/Button'

export default function BudgetModal({ open, onClose, currentBudget, onSave }) {
  const [value, setValue] = useState(currentBudget || '')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const num = Number(value)
    if (!value || Number.isNaN(num) || num <= 0) {
      setError('Enter a budget amount greater than 0.')
      return
    }
    setSaving(true)
    try {
      await onSave(num)
      onClose()
    } catch {
      setError('Could not save your budget. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Set monthly budget">
      <form onSubmit={handleSubmit}>
        <label className="block text-xs font-medium text-ledger-muted mb-1.5" htmlFor="budget-amount">
          Budget amount for this month
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ledger-muted font-mono">₹</span>
          <input
            id="budget-amount"
            type="number"
            inputMode="decimal"
            min="0"
            step="100"
            autoFocus
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              setError('')
            }}
            placeholder="25000"
            className="w-full rounded-xl bg-ink-raised border border-ink-line pl-8 pr-3.5 py-2.5
              text-ledger-text font-mono tabular focus-ring focus:border-sage/50"
          />
        </div>
        {error && <p className="mt-2 text-xs text-coral">{error}</p>}
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose} type="button">Cancel</Button>
          <Button variant="primary" type="submit" disabled={saving}>
            {saving ? 'Saving…' : 'Save budget'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
