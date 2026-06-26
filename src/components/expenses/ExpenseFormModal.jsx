import { useEffect, useState } from 'react'
import Modal from '../common/Modal'
import Button from '../common/Button'
import { CATEGORIES } from '../../utils/categories'

const emptyForm = {
  title: '',
  amount: '',
  category: 'Food',
  date: new Date().toISOString().slice(0, 10),
  notes: '',
}

export default function ExpenseFormModal({ open, onClose, onSave, initialExpense }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (open) {
      setForm(
        initialExpense
          ? {
              title: initialExpense.title || '',
              amount: initialExpense.amount ?? '',
              category: initialExpense.category || 'Food',
              date: initialExpense.date || new Date().toISOString().slice(0, 10),
              notes: initialExpense.notes || '',
            }
          : emptyForm
      )
      setErrors({})
    }
  }, [open, initialExpense])

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    setErrors((er) => ({ ...er, [field]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!form.title.trim()) next.title = 'Give this expense a title.'
    const amt = Number(form.amount)
    if (!form.amount || Number.isNaN(amt) || amt <= 0) next.amount = 'Enter an amount greater than 0.'
    if (!form.date) next.date = 'Pick a date.'
    if (!form.category) next.category = 'Choose a category.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSaving(true)
    try {
      await onSave({ ...form, title: form.title.trim(), notes: form.notes.trim() })
      onClose()
    } catch {
      setErrors((er) => ({ ...er, submit: 'Could not save this expense. Please try again.' }))
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={initialExpense ? 'Edit expense' : 'Add expense'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Title" error={errors.title}>
          <input
            autoFocus
            value={form.title}
            onChange={update('title')}
            placeholder="Weekly groceries"
            className={inputClass(errors.title)}
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Amount" error={errors.amount}>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ledger-muted font-mono text-sm">₹</span>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="1"
                value={form.amount}
                onChange={update('amount')}
                placeholder="1200"
                className={`${inputClass(errors.amount)} pl-7 font-mono tabular`}
              />
            </div>
          </Field>
          <Field label="Date" error={errors.date}>
            <input
              type="date"
              value={form.date}
              onChange={update('date')}
              className={inputClass(errors.date)}
            />
          </Field>
        </div>

        <Field label="Category" error={errors.category}>
          <select value={form.category} onChange={update('category')} className={inputClass(errors.category)}>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </Field>

        <Field label="Notes (optional)">
          <textarea
            value={form.notes}
            onChange={update('notes')}
            placeholder="Anything worth remembering about this one"
            rows={2}
            className={`${inputClass()} resize-none`}
          />
        </Field>

        {errors.submit && <p className="text-xs text-coral">{errors.submit}</p>}

        <div className="flex justify-end gap-2 pt-1">
          <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
          <Button variant="primary" type="submit" disabled={saving}>
            {saving ? 'Saving…' : initialExpense ? 'Save changes' : 'Add expense'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-ledger-muted mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-coral">{error}</p>}
    </div>
  )
}

function inputClass(error) {
  return `w-full rounded-xl bg-ink-raised border px-3.5 py-2.5 text-sm text-ledger-text
    focus-ring focus:border-sage/50 placeholder:text-ledger-faint
    ${error ? 'border-coral/50' : 'border-ink-line'}`
}
