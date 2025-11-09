'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '../../../components/ProtectedRoute'
import { db } from '../../../lib/firebase'
import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore'
import { products as staticProducts } from '../../../data/products'

function ProductsContent() {
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [migrating, setMigrating] = useState(false)
  const [showMigration, setShowMigration] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const productsRef = collection(db, 'products')
      const snapshot = await getDocs(productsRef)

      const productsList = []
      snapshot.forEach((doc) => {
        productsList.push({ id: doc.id, ...doc.data() })
      })

      setProducts(productsList)
      setShowMigration(productsList.length === 0)
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMigrate = async () => {
    if (!confirm(`This will migrate ${staticProducts.length} products from your code to Firestore. Continue?`)) {
      return
    }

    setMigrating(true)
    try {
      for (const product of staticProducts) {
        const productRef = doc(db, 'products', product.slug)
        await setDoc(productRef, {
          ...product,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      }

      alert('Migration completed successfully!')
      await loadProducts()
      setShowMigration(false)
    } catch (error) {
      console.error('Error migrating products:', error)
      alert('Migration failed: ' + error.message)
    } finally {
      setMigrating(false)
    }
  }

  const handleDelete = async (productId, productName) => {
    if (!confirm(`Are you sure you want to delete "${productName}"? This cannot be undone.`)) {
      return
    }

    try {
      await deleteDoc(doc(db, 'products', productId))
      alert('Product deleted successfully')
      await loadProducts()
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Failed to delete product: ' + error.message)
    }
  }

  const filteredProducts = products.filter(p =>
    p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-nerd-dark">
      {/* Header */}
      <div className="bg-nerd-gray border-b border-nerd-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/admin/dashboard" className="text-gray-400 hover:text-white text-sm mb-2 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-white">Product Management</h1>
              <p className="text-gray-400 mt-1">{products.length} total products</p>
            </div>
            <Link href="/admin/products/new" className="btn-primary">
              + Add Product
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Migration Card */}
        {showMigration && (
          <div className="bg-yellow-900/20 border border-yellow-500 rounded-lg p-6 mb-6">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <h3 className="text-yellow-400 font-bold mb-2">No Products in Database</h3>
                <p className="text-gray-300 mb-4">
                  You have {staticProducts.length} products in your code. Would you like to migrate them to Firestore?
                </p>
                <button
                  onClick={handleMigrate}
                  disabled={migrating}
                  className={`px-4 py-2 rounded font-semibold transition ${
                    migrating
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-yellow-500 hover:bg-yellow-600 text-black'
                  }`}
                >
                  {migrating ? 'Migrating...' : `Migrate ${staticProducts.length} Products`}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-4 mb-6">
          <input
            type="text"
            placeholder="Search products by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red"
          />
        </div>

        {/* Products List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nerd-red mx-auto mb-4"></div>
            <p className="text-gray-400">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-12 text-center">
            <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="text-xl font-bold text-white mb-2">No Products Found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery ? 'Try adjusting your search query' : 'Get started by adding your first product'}
            </p>
            {!searchQuery && (
              <Link href="/admin/products/new" className="btn-primary inline-block">
                + Add Product
              </Link>
            )}
          </div>
        ) : (
          <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-nerd-dark border-b border-nerd-light-gray">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-nerd-light-gray">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-nerd-dark transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-nerd-dark rounded flex items-center justify-center flex-shrink-0">
                          {product.images?.[0] ? (
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover rounded" />
                          ) : (
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-white">{product.name}</div>
                          <div className="text-xs text-gray-400">{product.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-300 capitalize">{product.category || 'Uncategorized'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-white font-semibold">${product.price?.toFixed(2)}</div>
                      {product.originalPrice && (
                        <div className="text-xs text-gray-500 line-through">${product.originalPrice.toFixed(2)}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {product.inStock ? (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-green-900/30 text-green-400 border border-green-500">
                          In Stock
                        </span>
                      ) : product.preOrder ? (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-yellow-900/30 text-yellow-400 border border-yellow-500">
                          Pre-Order
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-gray-700 text-gray-400 border border-gray-600">
                          Out of Stock
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="text-nerd-red hover:text-red-400 mr-4"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <ProtectedRoute>
      <ProductsContent />
    </ProtectedRoute>
  )
}
