import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import { auth, googleProvider } from '../firebase/config'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const signInWithGoogle = async () => {
    setError('')
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (err) {
      setError(mapAuthError(err))
      throw err
    }
  }

// 

  const signOut = async () => {
    setError('')
    try {
      await firebaseSignOut(auth)
    } catch (err) {
      setError(mapAuthError(err))
      throw err
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

function mapAuthError(err) {
  switch (err?.code) {
    case 'auth/popup-closed-by-user':
      return 'Sign-in was cancelled before it finished.'
    case 'auth/network-request-failed':
      return 'Network error. Check your connection and try again.'
    case 'auth/unauthorized-domain':
      return 'This domain is not authorized for sign-in. Add it in the Firebase console.'
    default:
      return 'Something went wrong while signing in. Please try again.'
  }
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
