import { LayoutGrid, Receipt, Wallet, LogOut } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { id: 'expenses', label: 'Expenses', icon: Receipt },
]

export default function AppShell({ view, setView, children }) {
  const { user, signOut } = useAuth()

  return (
    <div className="min-h-screen bg-ink bg-grain flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 flex-col border-r border-ink-line bg-ink-soft/60 shrink-0">
        <div className="flex items-center gap-2.5 px-6 py-6">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-sage/15 border border-sage/30 text-sage-bright">
            <Wallet size={18} />
          </div>
          <span className="font-display text-xl text-ledger-text">Ledger</span>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors focus-ring
                ${view === item.id
                  ? 'bg-sage/15 text-sage-bright border border-sage/30'
                  : 'text-ledger-muted hover:text-ledger-text hover:bg-white/5 border border-transparent'}`}
            >
              <item.icon size={17} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-ink-line">
          <div className="flex items-center gap-3 px-2">
            <Avatar user={user} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-ledger-text truncate">{user?.displayName || 'Account'}</p>
              <p className="text-xs text-ledger-faint truncate">{user?.email}</p>
            </div>
            <button
              onClick={signOut}
              aria-label="Sign out"
              className="text-ledger-muted hover:text-coral p-1.5 rounded-lg hover:bg-coral/10 focus-ring"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Mobile top bar */}
        <header className="md:hidden flex items-center justify-between px-4 py-4 border-b border-ink-line bg-ink-soft/60 sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-sage/15 border border-sage/30 text-sage-bright">
              <Wallet size={15} />
            </div>
            <span className="font-display text-lg text-ledger-text">Ledger</span>
          </div>
          <button onClick={signOut} aria-label="Sign out" className="text-ledger-muted hover:text-coral p-2 rounded-lg focus-ring">
            <LogOut size={17} />
          </button>
        </header>

        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 pb-24 md:pb-10 max-w-7xl w-full mx-auto">
          {children}
        </main>

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 border-t border-ink-line bg-ink-soft/95 backdrop-blur">
          <div className="flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-xs font-medium focus-ring
                  ${view === item.id ? 'text-sage-bright' : 'text-ledger-muted'}`}
              >
                <item.icon size={19} />
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}

function Avatar({ user }) {
  if (user?.photoURL) {
    return <img src={user.photoURL} alt="" className="h-8 w-8 rounded-full border border-ink-line" />
  }
  const initial = (user?.displayName || user?.email || '?').charAt(0).toUpperCase()
  return (
    <div className="h-8 w-8 rounded-full bg-ink-raised border border-ink-line grid place-items-center text-xs font-semibold text-sage-bright">
      {initial}
    </div>
  )
}
