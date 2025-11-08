'use client'

import { useState } from 'react'
import ProductCard from '../../components/ProductCard'
import { products, getAllCategories } from '../../data/products'

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const categories = getAllCategories()

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory)

  return (
    <div className="bg-nerd-dark min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Shop All Products</h1>
          <p className="text-gray-400 text-lg">Performance upgrades for your ride-on toys</p>
        </div>

        {/* Filters */}
        <div className="mb-8">
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
