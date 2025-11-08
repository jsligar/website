'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { getItemCount } = useCart()
  const itemCount = getItemCount()

  return (
    <nav className="bg-nerd-gray border-b border-nerd-light-gray sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">
              Nerd<span className="text-nerd-red">billy</span>Fab
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <Link href="/shop" className="text-gray-300 hover:text-white transition">
                Shop
              </Link>
            </div>

            <Link href="/resources" className="text-gray-300 hover:text-white transition">
              Resources
            </Link>

            <Link href="/projects" className="text-gray-300 hover:text-white transition">
              Projects
            </Link>

            <Link href="/about" className="text-gray-300 hover:text-white transition">
              About
            </Link>

            <Link href="/cart" className="text-gray-300 hover:text-nerd-red transition relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-nerd-red text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link href="/shop" className="block text-gray-300 hover:text-white py-2">
              Shop
            </Link>
            <Link href="/resources" className="block text-gray-300 hover:text-white py-2">
              Resources
            </Link>
            <Link href="/projects" className="block text-gray-300 hover:text-white py-2">
              Projects
            </Link>
            <Link href="/about" className="block text-gray-300 hover:text-white py-2">
              About
            </Link>
            <Link href="/cart" className="block text-gray-300 hover:text-white py-2">
              Cart
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
