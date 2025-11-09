'use client'

import { useState } from 'react'
import { storage } from '../../lib/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export default function ProductForm({ initialData = {}, onSubmit, submitText = 'Save Product' }) {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    slug: initialData.slug || '',
    sku: initialData.sku || '',
    category: initialData.category || 'wheels',
    price: initialData.price || '',
    originalPrice: initialData.originalPrice || '',
    cost: initialData.cost || '',
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
    // Inventory & Shipping
    quantity: initialData.quantity !== undefined ? initialData.quantity : 10,
    lowStockThreshold: initialData.lowStockThreshold || 3,
    weight: initialData.weight || '',
    weightUnit: initialData.weightUnit || 'lb',
    length: initialData.length || '',
    width: initialData.width || '',
    height: initialData.height || '',
    dimensionUnit: initialData.dimensionUnit || 'in',
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
        cost: formData.cost ? parseFloat(formData.cost) : null,
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        discount: parseInt(formData.discount) || 0,
        features,
        specifications,
        // Inventory
        quantity: parseInt(formData.quantity) || 0,
        lowStockThreshold: parseInt(formData.lowStockThreshold) || 0,
        inStock: parseInt(formData.quantity) > 0, // Auto-set based on quantity
        // Shipping
        weight: formData.weight ? parseFloat(formData.weight) : null,
        length: formData.length ? parseFloat(formData.length) : null,
        width: formData.width ? parseFloat(formData.width) : null,
        height: formData.height ? parseFloat(formData.height) : null,
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
            <label className="block text-white font-semibold mb-2">SKU</label>
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red"
              placeholder="PPWK-001"
            />
            <p className="text-gray-400 text-xs mt-1">Stock Keeping Unit for inventory tracking</p>
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
        <h3 className="text-xl font-bold text-white mb-4">Pricing & Costs</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-white font-semibold mb-2">Selling Price *</label>
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
            <label className="block text-white font-semibold mb-2">Cost (COGS)</label>
            <input
              type="number"
              name="cost"
              step="0.01"
              value={formData.cost}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red"
              placeholder="25.00"
            />
            <p className="text-gray-400 text-xs mt-1">Your cost to make/buy (for profit tracking)</p>
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
            <p className="text-gray-400 text-xs mt-1">For showing strikethrough price</p>
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

        {/* Profit Margin Calculation */}
        {formData.price && formData.cost && (
          <div className="bg-nerd-dark rounded p-3 border border-nerd-light-gray">
            <p className="text-gray-400 text-sm mb-1">Profit Margin:</p>
            <p className="text-white text-lg font-bold">
              ${(parseFloat(formData.price) - parseFloat(formData.cost)).toFixed(2)}
              <span className="text-gray-400 text-sm ml-2">
                ({(((parseFloat(formData.price) - parseFloat(formData.cost)) / parseFloat(formData.price)) * 100).toFixed(1)}%)
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Inventory & Stock */}
      <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Inventory & Stock</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-white font-semibold mb-2">Quantity on Hand *</label>
            <input
              type="number"
              name="quantity"
              required
              min="0"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red"
              placeholder="10"
            />
            <p className="text-gray-400 text-xs mt-1">Current inventory count</p>
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Low Stock Alert</label>
            <input
              type="number"
              name="lowStockThreshold"
              min="0"
              value={formData.lowStockThreshold}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red"
              placeholder="3"
            />
            <p className="text-gray-400 text-xs mt-1">Alert when inventory falls below this number</p>
          </div>
        </div>

        {/* Stock Status Indicator */}
        <div className="bg-nerd-dark rounded p-3 border border-nerd-light-gray mb-4">
          <p className="text-gray-400 text-sm mb-1">Stock Status:</p>
          {formData.quantity > formData.lowStockThreshold ? (
            <p className="text-green-400 font-semibold flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              In Stock ({formData.quantity} units)
            </p>
          ) : formData.quantity > 0 ? (
            <p className="text-yellow-400 font-semibold flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Low Stock ({formData.quantity} units remaining)
            </p>
          ) : (
            <p className="text-red-400 font-semibold flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Out of Stock
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="preOrder"
              checked={formData.preOrder}
              onChange={handleChange}
              className="w-5 h-5 text-nerd-red bg-nerd-dark border-nerd-light-gray rounded focus:ring-nerd-red"
            />
            <span className="ml-3 text-white">Allow Pre-Orders (when out of stock)</span>
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

      {/* Shipping & Dimensions */}
      <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Shipping & Dimensions</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white font-semibold mb-2">Weight</label>
            <div className="flex gap-2">
              <input
                type="number"
                name="weight"
                step="0.01"
                value={formData.weight}
                onChange={handleChange}
                className="flex-1 px-4 py-2 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red"
                placeholder="2.5"
              />
              <select
                name="weightUnit"
                value={formData.weightUnit}
                onChange={handleChange}
                className="px-4 py-2 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red"
              >
                <option value="lb">lb</option>
                <option value="oz">oz</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
              </select>
            </div>
            <p className="text-gray-400 text-xs mt-1">For shipping calculations</p>
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Dimensions (L × W × H)</label>
            <div className="flex gap-2">
              <input
                type="number"
                name="length"
                step="0.1"
                value={formData.length}
                onChange={handleChange}
                className="w-1/3 px-2 py-2 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red text-center"
                placeholder="12"
              />
              <input
                type="number"
                name="width"
                step="0.1"
                value={formData.width}
                onChange={handleChange}
                className="w-1/3 px-2 py-2 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red text-center"
                placeholder="8"
              />
              <input
                type="number"
                name="height"
                step="0.1"
                value={formData.height}
                onChange={handleChange}
                className="w-1/3 px-2 py-2 bg-nerd-dark text-white border border-nerd-light-gray rounded focus:outline-none focus:border-nerd-red text-center"
                placeholder="4"
              />
            </div>
            <p className="text-gray-400 text-xs mt-1">In {formData.dimensionUnit} (for packaging)</p>
          </div>
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
