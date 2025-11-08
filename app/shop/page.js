'use client'

import { useState } from 'react'
import ProductCard from '../../components/ProductCard'
import { products, getAllCategories } from '../../data/products'

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const categories = getAllCategories()

  // Filter by category and search
  let filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory)

  // Search functionality
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  // Sort functionality
  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
  } else if (sortBy === 'name') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name))
  }

  return (
    <div className="bg-nerd-dark min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Shop All Products</h1>
          <p className="text-gray-400 text-lg">Performance upgrades for your ride-on toys</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 bg-nerd-gray text-white rounded-lg border border-nerd-light-gray focus:border-nerd-red focus:outline-none"
            />
            <svg className="absolute right-4 top-4 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded font-semibold transition ${
                selectedCategory === 'all'
                  ? 'bg-nerd-red text-white'
                  : 'bg-nerd-gray text-gray-300 hover:bg-nerd-light-gray'
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => setSelectedCategory('wheels')}
              className={`px-6 py-2 rounded font-semibold transition ${
                selectedCategory === 'wheels'
                  ? 'bg-nerd-red text-white'
                  : 'bg-nerd-gray text-gray-300 hover:bg-nerd-light-gray'
              }`}
            >
              Wheel Kits
            </button>
            <button
              onClick={() => setSelectedCategory('adapters')}
              className={`px-6 py-2 rounded font-semibold transition ${
                selectedCategory === 'adapters'
                  ? 'bg-nerd-red text-white'
                  : 'bg-nerd-gray text-gray-300 hover:bg-nerd-light-gray'
              }`}
            >
              Adapters
            </button>
            <button
              onClick={() => setSelectedCategory('battery')}
              className={`px-6 py-2 rounded font-semibold transition ${
                selectedCategory === 'battery'
                  ? 'bg-nerd-red text-white'
                  : 'bg-nerd-gray text-gray-300 hover:bg-nerd-light-gray'
              }`}
            >
              Battery Systems
            </button>
            <button
              onClick={() => setSelectedCategory('electronics')}
              className={`px-6 py-2 rounded font-semibold transition ${
                selectedCategory === 'electronics'
                  ? 'bg-nerd-red text-white'
                  : 'bg-nerd-gray text-gray-300 hover:bg-nerd-light-gray'
              }`}
            >
              Electronics
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <label htmlFor="sort" className="text-gray-400 text-sm">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-nerd-gray text-white px-4 py-2 rounded border border-nerd-light-gray focus:border-nerd-red focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Product Count */}
        <div className="mb-6">
          <p className="text-gray-400 text-center">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
