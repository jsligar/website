'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '../../../context/CartContext'
import ProductReviews from '../../../components/ProductReviews'

export default function ProductPageClient({ product }) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('overview')
  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-nerd-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Product Not Found</h1>
          <Link href="/shop" className="btn-primary">
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-nerd-dark min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-gray-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-white">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{product.name}</span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square bg-nerd-gray rounded-lg overflow-hidden mb-4">
              {product.images && product.images[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  <div className="text-center">
                    <svg className="w-32 h-32 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm">Product image coming soon</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.discount > 0 && (
                <span className="bg-nerd-red text-white text-sm font-bold px-3 py-1 rounded">
                  Save {product.discount}%
                </span>
              )}
              {product.preOrder && (
                <span className="bg-yellow-500 text-black text-sm font-bold px-3 py-1 rounded">
                  PRE-ORDER
                </span>
              )}
              {product.freeShipping && (
                <span className="bg-green-600 text-white text-sm font-bold px-3 py-1 rounded">
                  FREE SHIPPING
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{product.name}</h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl font-bold text-nerd-red">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-2xl text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-300 text-lg mb-6">{product.description}</p>

            {/* Stock Status */}
            <div className="mb-6">
              {product.inStock ? (
                <div className="flex items-center text-green-400">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  In Stock - Ships in 1-2 weeks
                </div>
              ) : product.preOrder ? (
                <div className="flex items-center text-yellow-400">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {product.availableDate}
                </div>
              ) : (
                <div className="flex items-center text-gray-400">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Out of Stock
                </div>
              )}
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-white font-semibold mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-nerd-gray hover:bg-nerd-light-gray text-white rounded transition"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 h-10 bg-nerd-gray text-white text-center rounded border border-nerd-light-gray"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 bg-nerd-gray hover:bg-nerd-light-gray text-white rounded transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Disclaimer for Razors-Edge */}
            {product.requiresDisclaimer && (
              <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <h4 className="text-red-400 font-bold mb-2">SAFETY WARNING</h4>
                    <p className="text-gray-300 text-sm">{product.disclaimerText}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock && !product.preOrder}
              className={`w-full py-4 rounded font-bold text-lg transition ${
                product.inStock || product.preOrder
                  ? addedToCart
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'btn-primary'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {addedToCart ? (
                <span className="flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Added to Cart!
                </span>
              ) : (
                product.preOrder ? 'Pre-Order Now' : product.inStock ? 'Add to Cart' : 'Out of Stock'
              )}
            </button>

            {/* Features List */}
            {product.features && product.features.length > 0 && (
              <div className="mt-8 bg-nerd-gray rounded-lg p-6">
                <h3 className="text-white font-bold mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-300">
                      <svg className="w-5 h-5 text-nerd-red mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Tabs Section */}
        <div className="border-t border-nerd-gray pt-8">
          {/* Tab Navigation */}
          <div className="flex border-b border-nerd-gray mb-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 font-semibold whitespace-nowrap transition ${
                activeTab === 'overview'
                  ? 'text-white border-b-2 border-nerd-red'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`px-6 py-3 font-semibold whitespace-nowrap transition ${
                activeTab === 'specifications'
                  ? 'text-white border-b-2 border-nerd-red'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('installation')}
              className={`px-6 py-3 font-semibold whitespace-nowrap transition ${
                activeTab === 'installation'
                  ? 'text-white border-b-2 border-nerd-red'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Installation
            </button>
          </div>

          {/* Tab Content */}
          <div className="text-gray-300">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Product Overview</h3>
                <p className="mb-4">{product.description}</p>
                {product.features && (
                  <div className="mt-6">
                    <h4 className="text-xl font-bold text-white mb-3">What's Included</h4>
                    <ul className="list-disc list-inside space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Technical Specifications</h3>
                {product.specifications && (
                  <div className="bg-nerd-gray rounded-lg overflow-hidden">
                    <table className="w-full">
                      <tbody>
                        {Object.entries(product.specifications).map(([key, value], index) => (
                          <tr key={key} className={index % 2 === 0 ? 'bg-nerd-light-gray' : ''}>
                            <td className="px-6 py-3 font-semibold text-white">{key}</td>
                            <td className="px-6 py-3 text-gray-300">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'installation' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Installation Guide</h3>
                <div className="bg-nerd-gray rounded-lg p-6 mb-4">
                  <div className="flex items-center mb-4">
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">Difficulty Level</h4>
                      <p className="text-gray-400">{product.specifications?.Difficulty || 'Moderate'}</p>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">Estimated Time</h4>
                      <p className="text-gray-400">{product.specifications?.['Installation Time'] || '30-45 minutes'}</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">
                  Detailed installation instructions will be included with your order. Basic hand tools required.
                </p>
                <Link href="/resources#guides" className="text-nerd-red hover:text-red-400 font-semibold">
                  View Installation Resources →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <ProductReviews productId={product.id} />
      </div>
    </div>
  )
}
