import { useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ToastProvider } from './components/common/Toast'
import Login from './components/auth/Login'
import AppShell from './components/layout/AppShell'
import Dashboard from './components/dashboard/Dashboard'
import ExpensesPage from './components/expenses/ExpensesPage'
import Spinner from './components/common/Spinner'

function AppContent() {
  const { user, loading } = useAuth()
  const [view, setView] = useState('dashboard')

  if (loading) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center text-sage-bright">
        <Spinner size={28} />
      </div>
    )
  }

  if (!user) return <Login />

  return (
    <AppShell view={view} setView={setView}>
      {view === 'dashboard' ? <Dashboard /> : <ExpensesPage />}
    </AppShell>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AuthProvider>
  )
}
