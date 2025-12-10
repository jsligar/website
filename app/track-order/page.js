'use client'

import { useState } from 'react'
import Link from 'next/link'
import { getOrderByNumberAndEmail } from '../../lib/orders'
import OrderStatusTimeline from '../../components/OrderStatusTimeline'

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('')
  const [email, setEmail] = useState('')
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  const handleTrackOrder = async (e) => {
    e.preventDefault()
    setError('')
    setOrder(null)
    setLoading(true)
    setSearched(true)

    try {
      // Validate inputs
      if (!orderNumber.trim() || !email.trim()) {
        setError('Please enter both order number and email address.')
        setLoading(false)
        return
      }

      // Look up order
      const foundOrder = await getOrderByNumberAndEmail(orderNumber.trim(), email.trim().toLowerCase())

      if (foundOrder) {
        setOrder(foundOrder)
      } else {
        setError('Order not found. Please check your order number and email address.')
      }
    } catch (err) {
      console.error('Error tracking order:', err)
      setError('An error occurred while looking up your order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-nerd-dark py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-3">Track Your Order</h1>
          <p className="text-gray-400 text-lg">
            Enter your order number and email to view your order status
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-8 mb-8">
          <form onSubmit={handleTrackOrder} className="space-y-6">
            <div>
              <label htmlFor="orderNumber" className="block text-sm font-semibold text-gray-300 mb-2">
                Order Number
              </label>
              <input
                type="text"
                id="orderNumber"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="NF-1234567890123"
                className="w-full px-4 py-3 bg-nerd-dark border border-nerd-light-gray rounded text-white focus:outline-none focus:ring-2 focus:ring-nerd-red"
                disabled={loading}
              />
              <p className="text-gray-500 text-sm mt-1">
                Found in your order confirmation (format: NF-XXXXXXXXXXXXX)
              </p>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-nerd-dark border border-nerd-light-gray rounded text-white focus:outline-none focus:ring-2 focus:ring-nerd-red"
                disabled={loading}
              />
              <p className="text-gray-500 text-sm mt-1">
                The email address used during checkout
              </p>
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Tracking Order...
                </span>
              ) : (
                'Track Order'
              )}
            </button>
          </form>
        </div>

        {/* Order Details */}
        {order && (
          <div className="space-y-6">
            {/* Order Header */}
            <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Order {order.orderNumber}</h2>
                  <p className="text-gray-400">
                    Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-gray-400 text-sm mb-1">Order Total</p>
                  <p className="text-nerd-red font-bold text-2xl">${order.total.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Status Timeline */}
            <OrderStatusTimeline
              status={order.status}
              tracking={order.tracking}
              statusHistory={order.statusHistory}
            />

            {/* Order Items */}
            <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Order Items</h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center bg-nerd-dark p-4 rounded">
                    <div className="flex gap-4 items-center flex-1">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div>
                        <p className="text-white font-semibold">{item.productName}</p>
                        <p className="text-gray-400 text-sm">Quantity: {item.quantity}</p>
                        {item.sku && (
                          <p className="text-gray-500 text-xs">SKU: {item.sku}</p>
                        )}
                      </div>
                    </div>
                    <p className="text-nerd-red font-bold">${item.total.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Shipping Information</h3>
              <div className="bg-nerd-dark p-4 rounded">
                <p className="text-white font-semibold">
                  {order.customer.firstName} {order.customer.lastName}
                </p>
                <p className="text-gray-300 mt-1">{order.shippingAddress.address}</p>
                <p className="text-gray-300">
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p className="text-gray-300">{order.shippingAddress.country}</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount {order.couponCode && `(${order.couponCode})`}</span>
                    <span>-${order.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span className="text-green-400 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-white text-xl font-bold pt-3 border-t border-nerd-light-gray">
                  <span>Total</span>
                  <span className="text-nerd-red">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-blue-900/20 border border-blue-500 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-2">Need Help?</h3>
              <p className="text-blue-300 text-sm mb-3">
                If you have questions about your order, please contact us.
              </p>
              <Link href="/about#contact" className="text-nerd-red hover:text-red-400 font-semibold text-sm">
                Contact Support →
              </Link>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                onClick={() => {
                  setOrder(null)
                  setSearched(false)
                  setOrderNumber('')
                  setEmail('')
                }}
                className="bg-nerd-light-gray hover:bg-gray-600 text-white font-bold py-3 px-6 rounded transition text-center"
              >
                Track Another Order
              </button>
              <Link href="/shop" className="btn-primary text-center">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}

        {/* No results message */}
        {searched && !order && !loading && !error && (
          <div className="text-center py-8">
            <p className="text-gray-400">No order found. Please check your information and try again.</p>
          </div>
        )}

        {/* Help Info */}
        {!order && (
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm mb-2">
              Don't have an order number?
            </p>
            <p className="text-gray-500 text-sm">
              Your order number was provided on the order confirmation page after checkout.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
