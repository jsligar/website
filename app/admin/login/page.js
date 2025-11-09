'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../context/AuthContext'
import Link from 'next/link'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, user } = useAuth()
  const router = useRouter()

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push('/admin/dashboard')
    }
  }, [user, router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await signIn(email, password)

    if (result.success) {
      router.push('/admin/dashboard')
    } else {
      setError(result.error || 'Failed to sign in. Please check your credentials.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-nerd-dark flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold text-white mb-2">
              Nerdbilly<span className="text-nerd-red">Fab</span>
            </h1>
          </Link>
          <h2 className="text-2xl font-bold text-gray-300">Admin Login</h2>
          <p className="text-gray-400 mt-2">Sign in to manage your store</p>
        </div>

        {/* Login Form */}
        <div className="bg-nerd-gray rounded-lg p-8 shadow-lg border border-nerd-light-gray">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-900/30 border border-red-500 rounded p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-white font-semibold mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red transition"
                placeholder="admin@nerdbillyfab.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-white font-semibold mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red transition"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded font-bold transition ${
                loading
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'btn-primary'
              }`}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Back to Site Link */}
          <div className="mt-6 text-center">
            <Link href="/" className="text-gray-400 hover:text-white text-sm transition">
              ← Back to Site
            </Link>
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="mt-6 bg-nerd-gray rounded-lg p-6 border border-nerd-light-gray">
          <h3 className="text-white font-bold mb-2">First Time Setup</h3>
          <p className="text-gray-400 text-sm mb-3">
            To create your admin account, run this command in your terminal:
          </p>
          <code className="block bg-nerd-dark text-green-400 p-3 rounded text-xs overflow-x-auto">
            firebase auth:create --email admin@nerdbillyfab.com --password YOUR_PASSWORD
          </code>
          <p className="text-gray-400 text-xs mt-3">
            Or use the Firebase Console to create a user manually.
          </p>
        </div>
      </div>
    </div>
  )
}
