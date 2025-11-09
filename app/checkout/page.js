'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '../../context/CartContext'
import getStripe from '../../lib/stripe'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, getSubtotal, getDiscount, getTotal, couponCode, discount } = useCart()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    phone: '',
  })

  useEffect(() => {
    if (cart.length === 0) {
      router.push('/cart')
    }
  }, [cart, router])

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // TODO: Create Stripe checkout session
      // This requires a backend endpoint
      alert('Checkout integration coming soon! For now, orders can be placed via Etsy.')

      // Placeholder for Stripe integration:
      /*
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart,
          customer: formData,
          couponCode,
        }),
      })

      const { sessionId } = await response.json()
      const stripe = await getStripe()
      await stripe.redirectToCheckout({ sessionId })
      */

    } catch (error) {
      console.error('Checkout error:', error)
      alert('Checkout failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-nerd-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">Checkout</h1>

        {/* Coming Soon Notice */}
        <div className="bg-yellow-900/20 border border-yellow-500 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-yellow-400 font-bold mb-2">Direct Checkout Coming Soon</h3>
              <p className="text-gray-300 mb-2">
                We're setting up secure payment processing. For now, you can purchase these products on our Etsy shop.
              </p>
              <a
                href="https://www.etsy.com/shop/NerdbillyFab"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-4 py-2 rounded transition"
              >
                Shop on Etsy →
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-semibold mb-2">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red"
                        placeholder="John"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Shipping Address</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Address *</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red"
                      placeholder="123 Main St"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-semibold mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red"
                        placeholder="Springfield"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">State *</label>
                      <input
                        type="text"
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red"
                        placeholder="MO"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-semibold mb-2">ZIP Code *</label>
                      <input
                        type="text"
                        name="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red"
                        placeholder="65801"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">Country *</label>
                      <select
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red"
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded font-bold text-lg transition ${
                  loading
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'btn-primary'
                }`}
              >
                {loading ? 'Processing...' : 'Continue to Payment'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-white mb-4">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-nerd-dark rounded flex items-center justify-center flex-shrink-0">
                      {item.product.images?.[0] ? (
                        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover rounded" />
                      ) : (
                        <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm">{item.product.name}</p>
                      <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                      <p className="text-nerd-red font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-nerd-light-gray pt-4 space-y-2">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>${getSubtotal().toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount ({couponCode})</span>
                    <span>-${getDiscount().toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span className="text-green-400 font-semibold">FREE</span>
                </div>

                <div className="flex justify-between text-white text-xl font-bold pt-2 border-t border-nerd-light-gray">
                  <span>Total</span>
                  <span className="text-nerd-red">${getTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
