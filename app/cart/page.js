'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CartPage() {
  // For now, this is a simple cart placeholder
  // In production, you'd integrate with Stripe or a cart management system
  const [cartItems, setCartItems] = useState([])

  return (
    <div className="bg-nerd-dark min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-24 h-24 text-gray-600 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">
              Add some performance upgrades to get started
            </p>
            <Link href="/shop" className="btn-primary inline-block">
              Shop Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="card p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Cart Items</h2>
                {/* Cart items would be mapped here */}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-20">
                <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-green-400">
                    <span>Shipping</span>
                    <span>FREE</span>
                  </div>
                  <div className="border-t border-nerd-light-gray pt-3 flex justify-between text-white font-bold text-xl">
                    <span>Total</span>
                    <span>$0.00</span>
                  </div>
                </div>
                <button className="btn-primary w-full mb-4">
                  Proceed to Checkout
                </button>
                <p className="text-gray-400 text-sm text-center">
                  Processing time: 1-2 weeks<br />
                  Free shipping on all orders
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-nerd-red rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Free Shipping</h3>
            <p className="text-gray-400 text-sm">Every order. No minimum.</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-nerd-red rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Tested Quality</h3>
            <p className="text-gray-400 text-sm">Every part tested on real machines</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-nerd-red rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">30-Day Returns</h3>
            <p className="text-gray-400 text-sm">Not satisfied? We'll make it right</p>
          </div>
        </div>
      </div>
    </div>
  )
}
