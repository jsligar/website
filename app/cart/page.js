'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '../../context/CartContext'

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    couponCode,
    discount,
    getSubtotal,
    getDiscount,
    getTotal,
  } = useCart()

  const [couponInput, setCouponInput] = useState('')
  const [couponError, setCouponError] = useState('')

  const handleApplyCoupon = () => {
    if (applyCoupon(couponInput)) {
      setCouponError('')
      setCouponInput('')
    } else {
      setCouponError('Invalid coupon code')
    }
  }

  return (
    <div className="bg-nerd-dark min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
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
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 bg-nerd-light-gray p-4 rounded-lg">
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-nerd-gray rounded flex-shrink-0">
                        {item.images && item.images[0] ? (
                          <Image
                            src={item.images[0]}
                            alt={item.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover rounded"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-600">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <Link href={`/products/${item.slug}`} className="text-white font-semibold hover:text-nerd-red line-clamp-2">
                          {item.name}
                        </Link>
                        <p className="text-nerd-red font-bold mt-1">${item.price.toFixed(2)}</p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-nerd-gray hover:bg-nerd-red text-white rounded transition"
                          >
                            -
                          </button>
                          <span className="text-white font-semibold w-12 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-nerd-gray hover:bg-nerd-red text-white rounded transition"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Item Total & Remove */}
                      <div className="text-right">
                        <p className="text-white font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-300 text-sm mt-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-20">
                <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

                {/* Coupon Code */}
                <div className="mb-6">
                  <label className="text-white text-sm font-semibold mb-2 block">Coupon Code</label>
                  {couponCode ? (
                    <div className="flex items-center justify-between bg-green-900/30 border border-green-500 rounded p-3">
                      <span className="text-green-400 font-semibold">{couponCode}</span>
                      <button
                        onClick={removeCoupon}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                          placeholder="Enter code"
                          className="flex-1 px-4 py-2 bg-nerd-gray text-white rounded border border-nerd-light-gray focus:border-nerd-red focus:outline-none"
                        />
                        <button
                          onClick={handleApplyCoupon}
                          className="btn-secondary px-4"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-red-400 text-sm mt-1">{couponError}</p>
                      )}
                      <p className="text-gray-500 text-xs mt-2">
                        Try: WELCOME10, SAVE15, FIRSTORDER
                      </p>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>${getSubtotal().toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Discount ({(discount * 100).toFixed(0)}%)</span>
                      <span>-${getDiscount().toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-green-400">
                    <span>Shipping</span>
                    <span>FREE</span>
                  </div>
                  <div className="border-t border-nerd-light-gray pt-3 flex justify-between text-white font-bold text-xl">
                    <span>Total</span>
                    <span>${getTotal().toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/checkout" className="btn-primary w-full block text-center mb-4">
                  Proceed to Checkout
                </Link>
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
