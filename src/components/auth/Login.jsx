import { useState } from 'react'
import { Wallet, ArrowRight } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import Button from '../common/Button'
import Spinner from '../common/Spinner'

export default function Login() {
  const { signInWithGoogle } = useAuth()
  const [busy, setBusy] = useState(false)
  const [localError, setLocalError] = useState('')

  const handleSignIn = async () => {
    setBusy(true)
    setLocalError('')
    try {
      await signInWithGoogle()
    } catch {
      setLocalError('Sign-in did not go through. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4 bg-grain">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-sage/15 border border-sage/30 text-sage-bright mb-5">
            <Wallet size={26} strokeWidth={2} />
          </div>
          <h1 className="font-display text-3xl text-ledger-text">Ledger</h1>
          <p className="mt-2 text-sm text-ledger-muted leading-relaxed">
            Keep your household budget, every line of it, in one calm place.
          </p>
        </div>

        <div className="ticket-edge rounded-ticket bg-ink-soft border border-ink-line shadow-card px-6 py-8">
          <Button
            variant="primary"
            className="w-full py-3"
            onClick={handleSignIn}
            disabled={busy}
          >
            {busy ? (
              <Spinner size={18} />
            ) : (
              <>
                <GoogleMark />
                Continue with Google
              </>
            )}
          </Button>
          {localError && (
            <p className="mt-3 text-xs text-coral text-center">{localError}</p>
          )}
          <p className="mt-5 text-xs text-ledger-faint text-center leading-relaxed">
            Your data stays private to your account, synced securely with Firebase.
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-ledger-faint">
          <span>Track. Compare. Stay under budget.</span>
          <ArrowRight size={12} />
        </div>
      </div>
    </div>
  )
}

function GoogleMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.94l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
    </svg>
  )
}
