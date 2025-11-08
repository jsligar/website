'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('nerdbilly-cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('nerdbilly-cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)

      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }

      return [...prevCart, { ...product, quantity }]
    })
  }

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
    setCouponCode('')
    setDiscount(0)
  }

  const applyCoupon = (code) => {
    // Basic coupon system - expand this as needed
    const coupons = {
      'WELCOME10': 0.10,  // 10% off
      'SAVE15': 0.15,     // 15% off
      'FIRSTORDER': 0.20, // 20% off
    }

    const discountAmount = coupons[code.toUpperCase()]
    if (discountAmount) {
      setCouponCode(code.toUpperCase())
      setDiscount(discountAmount)
      return true
    }
    return false
  }

  const removeCoupon = () => {
    setCouponCode('')
    setDiscount(0)
  }

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getDiscount = () => {
    return getSubtotal() * discount
  }

  const getTotal = () => {
    return getSubtotal() - getDiscount()
  }

  const getItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    couponCode,
    discount,
    getSubtotal,
    getDiscount,
    getTotal,
    getItemCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
