'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { decrementInventory } from '../../lib/orders'
import { useCart } from '../../context/CartContext'

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { clearCart } = useCart()
  const [processing, setProcessing] = useState(true)
  const [success, setSuccess] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    processPayment()
  }, [])

  const processPayment = async () => {
    try {
      // Get order ID from URL or sessionStorage
      const orderIdFromUrl = searchParams.get('orderId')
      const orderIdFromSession = sessionStorage.getItem('pendingOrderId')
      const finalOrderId = orderIdFromUrl || orderIdFromSession

      if (!finalOrderId) {
        setError('No order found. Please contact support if you completed payment.')
        setProcessing(false)
        return
      }

      setOrderId(finalOrderId)

      // Get order data from sessionStorage
      const orderDataStr = sessionStorage.getItem('pendingOrderData')
      const orderData = orderDataStr ? JSON.parse(orderDataStr) : null

      // Update order status to paid
      const orderRef = doc(db, 'orders', finalOrderId)
      await updateDoc(orderRef, {
        paymentStatus: 'paid',
        paidAt: new Date().toISOString(),
        status: 'processing',
        notes: 'Payment completed via Stripe',
        updatedAt: new Date().toISOString(),
      })

      // Decrement inventory if we have the cart data
      if (orderData && orderData.cartItems) {
        for (const item of orderData.cartItems) {
          await decrementInventory(item.slug, item.quantity)
        }
      }

      // Clear cart and sessionStorage
      clearCart()
      sessionStorage.removeItem('pendingOrderId')
      sessionStorage.removeItem('pendingOrderData')

      setSuccess(true)
      setProcessing(false)

    } catch (err) {
      console.error('Error processing payment:', err)
      setError('There was an error processing your payment. Please contact support with your order details.')
      setProcessing(false)
    }
  }

  if (processing) {
    return (
      <div className="min-h-screen bg-nerd-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-nerd-red mx-auto mb-4"></div>
          <p className="text-white text-lg font-semibold mb-2">Processing your payment...</p>
          <p className="text-gray-400">Please wait, do not close this page</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-nerd-dark py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-nerd-gray rounded-lg p-8 text-center border-2 border-red-500">
            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-3xl font-bold text-white mb-4">Payment Issue</h1>
            <p className="text-gray-300 mb-6">{error}</p>
            {orderId && (
              <p className="text-gray-400 text-sm mb-6">
                Order ID: <span className="text-white font-mono">{orderId}</span>
              </p>
            )}
            <div className="space-x-4">
              <Link href="/about#contact" className="btn-primary inline-block">
                Contact Support
              </Link>
              <Link href="/" className="btn-secondary inline-block">
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-nerd-dark py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-nerd-gray rounded-lg p-8 text-center border-2 border-green-500">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-4xl font-bold text-white mb-4">Payment Successful!</h1>
            <p className="text-gray-300 text-lg mb-6">
              Thank you for your purchase. Your order has been confirmed.
            </p>

            {orderId && (
              <div className="bg-nerd-dark rounded p-4 mb-6">
                <p className="text-gray-400 text-sm mb-1">Your order number:</p>
                <p className="text-white text-2xl font-bold font-mono">{orderId}</p>
              </div>
            )}

            <div className="bg-nerd-light-gray rounded-lg p-6 mb-6 text-left">
              <h3 className="text-white font-semibold mb-3">What's Next?</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  You'll receive an order confirmation email shortly
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Your order will be processed within 1-2 weeks (made to order)
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free shipping via USPS (3-5 business days after processing)
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  You'll receive tracking information once your order ships
                </li>
              </ul>
            </div>

            <div className="space-x-4">
              <Link href="/" className="btn-primary inline-block">
                Continue Shopping
              </Link>
              <Link href="/about#contact" className="btn-secondary inline-block">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-nerd-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-nerd-red mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}
