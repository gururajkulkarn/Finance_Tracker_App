import { useEffect, useMemo, useState } from 'react'
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuth } from '../contexts/AuthContext'

export function useExpenses() {
  const { user } = useAuth()
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const expensesRef = useMemo(() => {
    if (!user) return null
    return collection(db, 'users', user.uid, 'expenses')
  }, [user])

  useEffect(() => {
    if (!expensesRef) {
      setExpenses([])
      setLoading(false)
      return
    }
    setLoading(true)
    const q = query(expensesRef, orderBy('date', 'desc'))
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
        setExpenses(items)
        setLoading(false)
        setError('')
      },
      (err) => {
        console.error(err)
        setError('Could not load expenses. Check your connection and try again.')
        setLoading(false)
      }
    )
    return unsubscribe
  }, [expensesRef])

  const addExpense = async (expense) => {
    if (!expensesRef) throw new Error('Not signed in')
    await addDoc(expensesRef, {
      ...expense,
      amount: Number(expense.amount),
      createdAt: serverTimestamp(),
    })
  }

  const updateExpense = async (id, expense) => {
    if (!user) throw new Error('Not signed in')
    const ref = doc(db, 'users', user.uid, 'expenses', id)
    await updateDoc(ref, {
      ...expense,
      amount: Number(expense.amount),
      updatedAt: serverTimestamp(),
    })
  }

  const deleteExpense = async (id) => {
    if (!user) throw new Error('Not signed in')
    const ref = doc(db, 'users', user.uid, 'expenses', id)
    await deleteDoc(ref)
  }

  return { expenses, loading, error, addExpense, updateExpense, deleteExpense }
}
