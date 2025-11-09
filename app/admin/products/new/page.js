'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ProtectedRoute from '../../../../components/ProtectedRoute'
import ProductForm from '../../../../components/admin/ProductForm'
import { db } from '../../../../lib/firebase'
import { doc, setDoc } from 'firebase/firestore'

function NewProductContent() {
  const router = useRouter()

  const handleSubmit = async (productData) => {
    try {
      const productRef = doc(db, 'products', productData.slug)
      await setDoc(productRef, {
        ...productData,
        id: productData.slug,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })

      alert('Product created successfully!')
      router.push('/admin/products')
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    }
  }

  return (
    <div className="min-h-screen bg-nerd-dark">
      {/* Header */}
      <div className="bg-nerd-gray border-b border-nerd-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/admin/products" className="text-gray-400 hover:text-white text-sm mb-2 inline-block">
            ← Back to Products
          </Link>
          <h1 className="text-3xl font-bold text-white">Add New Product</h1>
          <p className="text-gray-400 mt-1">Create a new product listing</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductForm onSubmit={handleSubmit} submitText="Create Product" />
      </div>
    </div>
  )
}

export default function NewProductPage() {
  return (
    <ProtectedRoute>
      <NewProductContent />
    </ProtectedRoute>
  )
}
