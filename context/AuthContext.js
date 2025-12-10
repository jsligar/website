'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from '../lib/firebase'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [customClaims, setCustomClaims] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)

      // Get custom claims from ID token
      if (user) {
        try {
          const idTokenResult = await user.getIdTokenResult()
          setCustomClaims(idTokenResult.claims)
        } catch (error) {
          console.error('Error getting custom claims:', error)
          setCustomClaims(null)
        }
      } else {
        setCustomClaims(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)

      // Get custom claims after sign in
      const idTokenResult = await result.user.getIdTokenResult()
      setCustomClaims(idTokenResult.claims)

      return { success: true, user: result.user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
      setCustomClaims(null)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Force refresh of ID token and custom claims
  const refreshClaims = async () => {
    if (user) {
      try {
        const idTokenResult = await user.getIdTokenResult(true) // Force refresh
        setCustomClaims(idTokenResult.claims)
        return idTokenResult.claims
      } catch (error) {
        console.error('Error refreshing claims:', error)
        return null
      }
    }
    return null
  }

  const value = {
    user,
    loading,
    signIn,
    signOut,
    refreshClaims,
    customClaims,
    isAdmin: !!user && customClaims?.admin === true, // Check custom claim
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
