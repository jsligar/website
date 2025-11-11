'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ProtectedRoute from '../../../../components/ProtectedRoute'
import ProductForm from '../../../../components/admin/ProductForm'
import { db } from '../../../../lib/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

function EditProductContent({ productId }) {
  const router = useRouter()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProduct()
  }, [productId])

  const loadProduct = async () => {
    try {
      const productRef = doc(db, 'products', productId)
      const productSnap = await getDoc(productRef)

      if (productSnap.exists()) {
        setProduct({ id: productSnap.id, ...productSnap.data() })
      } else {
        alert('Product not found')
        router.push('/admin/products')
      }
    } catch (error) {
      console.error('Error loading product:', error)
      alert('Failed to load product')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (productData) => {
    try {
      const productRef = doc(db, 'products', productId)
      await updateDoc(productRef, {
        ...productData,
        updatedAt: new Date().toISOString(),
      })

      alert('Product updated successfully!')
      router.push('/admin/products')
    } catch (error) {
      console.error('Error updating product:', error)
      throw error
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-nerd-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-nerd-red mx-auto mb-4"></div>
          <p className="text-gray-400">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return null
  }

  return (
    <div className="min-h-screen bg-nerd-dark">
      {/* Header */}
      <div className="bg-nerd-gray border-b border-nerd-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/admin/products" className="text-gray-400 hover:text-white text-sm mb-2 inline-block">
            ← Back to Products
          </Link>
          <h1 className="text-3xl font-bold text-white">Edit Product</h1>
          <p className="text-gray-400 mt-1">{product.name}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductForm
          initialData={product}
          onSubmit={handleSubmit}
          submitText="Update Product"
        />
      </div>
    </div>
  )
}

export default function EditProductClient({ productId }) {
  return (
    <ProtectedRoute>
      <EditProductContent productId={productId} />
    </ProtectedRoute>
  )
}
