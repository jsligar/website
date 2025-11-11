'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getOrder } from '../../lib/orders'

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (orderId) {
      loadOrder()
    }
  }, [orderId])

  const loadOrder = async () => {
    try {
      const orderData = await getOrder(orderId)
      setOrder(orderData)
    } catch (error) {
      console.error('Error loading order:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-nerd-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-nerd-red mx-auto mb-4"></div>
          <p className="text-gray-400">Loading order...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-nerd-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Order Not Found</h1>
          <Link href="/" className="btn-primary">
            Return Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-nerd-dark py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Order Placed!</h1>
          <p className="text-gray-400 text-lg">Thank you for your order.</p>
        </div>

        {/* Order Details Card */}
        <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-gray-400 text-sm mb-1">Order Number</p>
              <p className="text-white font-bold text-xl">{order.orderNumber}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Order Total</p>
              <p className="text-nerd-red font-bold text-xl">${order.total.toFixed(2)}</p>
            </div>
          </div>

          {/* Status Notice */}
          <div className="bg-blue-900/20 border border-blue-500 rounded-lg p-4 mb-6">
            <p className="text-blue-300 text-sm">
              <strong>Payment Pending:</strong> Your order has been created but payment processing is being configured.
              You'll receive a payment link via email shortly.
            </p>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-4">Order Items</h2>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-nerd-dark p-3 rounded">
                  <div className="flex gap-3 items-center flex-1">
                    {item.image && (
                      <img src={item.image} alt={item.productName} className="w-12 h-12 object-cover rounded" />
                    )}
                    <div>
                      <p className="text-white font-semibold">{item.productName}</p>
                      <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-nerd-red font-bold">${item.total.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-3">Shipping Address</h2>
            <div className="bg-nerd-dark p-4 rounded">
              <p className="text-white">{order.customer.firstName} {order.customer.lastName}</p>
              <p className="text-gray-300">{order.shippingAddress.address}</p>
              <p className="text-gray-300">
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </p>
              <p className="text-gray-300">{order.shippingAddress.country}</p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t border-nerd-light-gray pt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Discount</span>
                  <span>-${order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span className="text-green-400 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between text-white text-xl font-bold pt-2 border-t border-nerd-light-gray">
                <span>Total</span>
                <span className="text-nerd-red">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary text-center">
            Continue Shopping
          </Link>
          <Link href="/shop" className="bg-nerd-light-gray hover:bg-gray-600 text-white font-bold py-3 px-6 rounded transition text-center">
            Browse Products
          </Link>
        </div>

        {/* Email Notice */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            A confirmation email will be sent to <span className="text-white font-semibold">{order.customer.email}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-nerd-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-nerd-red mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  )
}
