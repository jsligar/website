'use client'

import { useState } from 'react'
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'

export default function NewsletterSignup({ inline = false }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }

    try {
      // Check if email already exists
      const subscribersRef = collection(db, 'newsletter_subscribers')
      const q = query(subscribersRef, where('email', '==', email.toLowerCase()))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        setStatus('error')
        setMessage('This email is already subscribed!')
        return
      }

      // Add new subscriber
      await addDoc(subscribersRef, {
        email: email.toLowerCase(),
        subscribedAt: serverTimestamp(),
        source: inline ? 'inline_form' : 'footer_form',
        active: true,
      })

      setStatus('success')
      setMessage('Thanks for subscribing! Check your email for confirmation.')
      setEmail('')

      // Reset after 5 seconds
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
    } catch (error) {
      console.error('Newsletter signup error:', error)
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  if (inline) {
    return (
      <div className="bg-nerd-gray rounded-lg p-8">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-3">Stay Updated</h3>
          <p className="text-gray-300 mb-6">
            Get exclusive deals, new product announcements, and performance tips delivered to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={status === 'loading'}
              className="flex-1 px-4 py-3 bg-nerd-dark text-white rounded border border-nerd-light-gray focus:border-nerd-red focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary px-8 py-3 whitespace-nowrap disabled:opacity-50"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {message && (
            <p
              className={`mt-4 text-sm ${
                status === 'success' ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {message}
            </p>
          )}
          <p className="text-xs text-gray-400 mt-3">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h4 className="text-lg font-bold text-white mb-3">Newsletter</h4>
      <p className="text-gray-400 text-sm mb-4">
        Get updates on new products and exclusive deals.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          disabled={status === 'loading'}
          className="w-full px-4 py-2 bg-nerd-light-gray text-white rounded border border-nerd-gray focus:border-nerd-red focus:outline-none text-sm disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full btn-primary py-2 text-sm disabled:opacity-50"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {message && (
        <p
          className={`mt-2 text-xs ${
            status === 'success' ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  )
}
