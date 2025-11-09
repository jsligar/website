'use client'

import { useState } from 'react'
import { storage } from '../../lib/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export default function ProductForm({ initialData = {}, onSubmit, submitText = 'Save Product' }) {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    slug: initialData.slug || '',
    category: initialData.category || 'wheels',
    price: initialData.price || '',
    originalPrice: initialData.originalPrice || '',
    discount: initialData.discount || 0,
    description: initialData.description || '',
    features: initialData.features?.join('\n') || '',
    specifications: JSON.stringify(initialData.specifications || {}, null, 2),
    inStock: initialData.inStock !== undefined ? initialData.inStock : true,
    preOrder: initialData.preOrder || false,
    availableDate: initialData.availableDate || '',
    freeShipping: initialData.freeShipping !== undefined ? initialData.freeShipping : true,
    requiresDisclaimer: initialData.requiresDisclaimer || false,
    disclaimerText: initialData.disclaimerText || '',
    images: initialData.images || [],
  })

  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Auto-generate slug from name if creating new product
    if (name === 'name' && !initialData.name) {
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setFormData(prev => ({ ...prev, slug }))
    }
  }

  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleImageUpload = async () => {
    if (!imageFile) return null

    setUploading(true)
    try {
      const timestamp = Date.now()
      const filename = `products/${formData.slug}-${timestamp}.${imageFile.name.split('.').pop()}`
      const storageRef = ref(storage, filename)

      await uploadBytes(storageRef, imageFile)
      const downloadURL = await getDownloadURL(storageRef)

      setFormData(prev => ({
        ...prev,
        images: [downloadURL, ...(prev.images || [])]
      }))

      setImageFile(null)
      setImagePreview(null)
      alert('Image uploaded successfully!')

      return downloadURL
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image: ' + error.message)
      return null
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Upload image if one is selected
      if (imageFile) {
        await handleImageUpload()
      }

      // Parse features and specifications
      const features = formData.features
        .split('\n')
        .map(f => f.trim())
        .filter(f => f.length > 0)

      let specifications = {}
      try {
        specifications = JSON.parse(formData.specifications)
      } catch (e) {
        alert('Invalid JSON in specifications')
        setSubmitting(false)
        return
      }

      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        discount: parseInt(formData.discount) || 0,
        features,
        specifications,
      }

      await onSubmit(productData)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to save product: ' + error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Basic Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-white font-semibold mb-2">Product Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red"
              placeholder="Peg Perego Front & Rear Wheel Kit"
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Slug (URL) *</label>
            <input
              type="text"
              name="slug"
              required
              value={formData.slug}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red"
              placeholder="peg-perego-front-rear-wheel-kit"
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Category *</label>
            <select
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red"
            >
              <option value="wheels">Wheels</option>
              <option value="adapters">Adapters</option>
              <option value="batteries">Batteries</option>
              <option value="electronics">Electronics</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-white font-semibold mb-2">Description *</label>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red"
              placeholder="Complete product description..."
            />
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Pricing</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-white font-semibold mb-2">Price *</label>
            <input
              type="number"
              name="price"
              required
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red"
              placeholder="59.99"
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Original Price (optional)</label>
            <input
              type="number"
              name="originalPrice"
              step="0.01"
              value={formData.originalPrice}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red"
              placeholder="69.99"
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Discount %</label>
            <input
              type="number"
              name="discount"
              min="0"
              max="100"
              value={formData.discount}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red"
              placeholder="15"
            />
          </div>
        </div>
      </div>

      {/* Inventory Status */}
      <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Inventory Status</h3>

        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="inStock"
              checked={formData.inStock}
              onChange={handleChange}
              className="w-5 h-5 text-nerd-red bg-nerd-dark border-nerd-light-gray rounded focus:ring-nerd-red"
            />
            <span className="ml-3 text-white">In Stock</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="preOrder"
              checked={formData.preOrder}
              onChange={handleChange}
              className="w-5 h-5 text-nerd-red bg-nerd-dark border-nerd-light-gray rounded focus:ring-nerd-red"
            />
            <span className="ml-3 text-white">Pre-Order</span>
          </label>

          {formData.preOrder && (
            <div>
              <label className="block text-white font-semibold mb-2">Available Date</label>
              <input
                type="text"
                name="availableDate"
                value={formData.availableDate}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red"
                placeholder="Coming Soon / Q1 2025"
              />
            </div>
          )}

          <label className="flex items-center">
            <input
              type="checkbox"
              name="freeShipping"
              checked={formData.freeShipping}
              onChange={handleChange}
              className="w-5 h-5 text-nerd-red bg-nerd-dark border-nerd-light-gray rounded focus:ring-nerd-red"
            />
            <span className="ml-3 text-white">Free Shipping</span>
          </label>
        </div>
      </div>

      {/* Features */}
      <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Features</h3>
        <p className="text-gray-400 text-sm mb-3">Enter one feature per line</p>
        <textarea
          name="features"
          value={formData.features}
          onChange={handleChange}
          rows={8}
          className="w-full px-4 py-2 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red font-mono text-sm"
          placeholder="Complete set: includes 2×10″ front and 2×13″ rear pneumatic tires&#10;Durable adapters: glass-filled ABS-GF outlast stock plastic&#10;Hardware included: each kit comes with bolts, nuts and washers"
        />
      </div>

      {/* Specifications */}
      <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Specifications</h3>
        <p className="text-gray-400 text-sm mb-3">Enter as JSON (key-value pairs)</p>
        <textarea
          name="specifications"
          value={formData.specifications}
          onChange={handleChange}
          rows={10}
          className="w-full px-4 py-2 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red font-mono text-sm"
          placeholder='{&#10;  "Front Tire Size": "10 inches",&#10;  "Rear Tire Size": "13 inches",&#10;  "Material": "ABS-GF"&#10;}'
        />
      </div>

      {/* Images */}
      <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Product Images</h3>

        {/* Current Images */}
        {formData.images && formData.images.length > 0 && (
          <div className="mb-4">
            <p className="text-gray-400 text-sm mb-3">Current Images:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img src={image} alt={`Product ${index + 1}`} className="w-full h-32 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload New Image */}
        <div>
          <p className="text-gray-400 text-sm mb-3">Add New Image:</p>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="text-gray-400 text-sm"
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded" />
            )}
            {imageFile && (
              <button
                type="button"
                onClick={handleImageUpload}
                disabled={uploading}
                className={`px-4 py-2 rounded font-semibold transition ${
                  uploading
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-nerd-red hover:bg-red-700 text-white'
                }`}
              >
                {uploading ? 'Uploading...' : 'Upload Image'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Safety Disclaimer */}
      <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Safety Disclaimer</h3>

        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            name="requiresDisclaimer"
            checked={formData.requiresDisclaimer}
            onChange={handleChange}
            className="w-5 h-5 text-nerd-red bg-nerd-dark border-nerd-light-gray rounded focus:ring-nerd-red"
          />
          <span className="ml-3 text-white">This product requires a safety warning</span>
        </label>

        {formData.requiresDisclaimer && (
          <textarea
            name="disclaimerText"
            value={formData.disclaimerText}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red"
            placeholder="Enter safety warning text..."
          />
        )}
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-nerd-light-gray hover:bg-gray-600 text-white rounded font-semibold transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting || uploading}
          className={`px-6 py-3 rounded font-semibold transition ${
            submitting || uploading
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'btn-primary'
          }`}
        >
          {submitting ? 'Saving...' : submitText}
        </button>
      </div>
    </form>
  )
}
