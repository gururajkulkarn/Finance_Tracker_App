import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Firebase config is read from environment variables (see .env.example).
// Create a `.env` file in the project root with your own Firebase project's
// credentials before running the app.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// TEMPORARY DEBUG — remove once auth/invalid-api-key is resolved
// console.log('--- FIREBASE CONFIG DEBUG ---')
// console.log('apiKey:', firebaseConfig.apiKey)
// console.log('authDomain:', firebaseConfig.authDomain)
// console.log('projectId:', firebaseConfig.projectId)
// console.log('appId:', firebaseConfig.appId)
// console.log('-----------------------------')


export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()

