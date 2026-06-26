import { useEffect, useState } from 'react'
import { doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuth } from '../contexts/AuthContext'
import { currentMonthKey } from '../utils/formatters'

export function useBudget(monthKey = currentMonthKey()) {
  const { user } = useAuth()
  const [budget, setBudget] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) {
      setBudget(0)
      setLoading(false)
      return
    }
    setLoading(true)
    const ref = doc(db, 'users', user.uid, 'budgets', monthKey)
    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        setBudget(snap.exists() ? Number(snap.data().amount) || 0 : 0)
        setLoading(false)
        setError('')
      },
      (err) => {
        console.error(err)
        setError('Could not load your budget. Check your connection and try again.')
        setLoading(false)
      }
    )
    return unsubscribe
  }, [user, monthKey])

  const setMonthlyBudget = async (amount) => {
    if (!user) throw new Error('Not signed in')
    const ref = doc(db, 'users', user.uid, 'budgets', monthKey)
    await setDoc(
      ref,
      { amount: Number(amount), updatedAt: serverTimestamp() },
      { merge: true }
    )
  }

  return { budget, loading, error, setMonthlyBudget }
}
