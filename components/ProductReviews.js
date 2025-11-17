'use client'

import { useState, useEffect } from 'react'
import { collection, addDoc, query, where, orderBy, getDocs, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'

export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    title: '',
    comment: '',
  })

  // Fetch reviews on mount
  useEffect(() => {
    fetchReviews()
  }, [productId])

  const fetchReviews = async () => {
    try {
      const reviewsQuery = query(
        collection(db, 'reviews'),
        where('productId', '==', productId),
        where('approved', '==', true),
        orderBy('createdAt', 'desc')
      )
      const snapshot = await getDocs(reviewsQuery)
      const reviewsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      }))
      setReviews(reviewsData)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      await addDoc(collection(db, 'reviews'), {
        productId,
        name: formData.name,
        email: formData.email,
        rating: parseInt(formData.rating),
        title: formData.title,
        comment: formData.comment,
        approved: false, // Requires admin approval
        createdAt: serverTimestamp(),
      })

      alert('Thank you for your review! It will be published after approval.')
      setFormData({
        name: '',
        email: '',
        rating: 5,
        title: '',
        comment: '',
      })
      setShowForm(false)
    } catch (error) {
      console.error('Error submitting review:', error)
      alert('Failed to submit review. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    return (sum / reviews.length).toFixed(1)
  }

  const renderStars = (rating, size = 'sm') => {
    const stars = []
    const sizeClass = size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`${sizeClass} ${
            i <= rating ? 'text-yellow-400' : 'text-gray-600'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    }
    return stars
  }

  const avgRating = calculateAverageRating()

  return (
    <div className="border-t border-nerd-gray pt-8 mt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Customer Reviews</h2>
          {reviews.length > 0 && (
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {renderStars(Math.round(avgRating), 'lg')}
              </div>
              <span className="text-2xl font-bold text-white">{avgRating}</span>
              <span className="text-gray-400">({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})</span>
            </div>
          )}
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary px-6 py-2 text-sm"
        >
          Write a Review
        </button>
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="bg-nerd-gray rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Write Your Review</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-white font-semibold mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-nerd-dark text-white rounded border border-nerd-light-gray focus:border-nerd-red focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Email * (not published)</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-nerd-dark text-white rounded border border-nerd-light-gray focus:border-nerd-red focus:outline-none"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">Rating *</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="transition hover:scale-110"
                  >
                    <svg
                      className={`w-8 h-8 ${
                        star <= formData.rating ? 'text-yellow-400' : 'text-gray-600'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">Review Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-nerd-dark text-white rounded border border-nerd-light-gray focus:border-nerd-red focus:outline-none"
                placeholder="Sum up your experience"
              />
            </div>

            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">Your Review *</label>
              <textarea
                required
                rows={5}
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                className="w-full px-4 py-2 bg-nerd-dark text-white rounded border border-nerd-light-gray focus:border-nerd-red focus:outline-none"
                placeholder="Tell us about your experience with this product"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary px-6 py-2"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 bg-nerd-light-gray hover:bg-nerd-gray text-white rounded transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      {loading ? (
        <div className="text-center py-8 text-gray-400">Loading reviews...</div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p>No reviews yet. Be the first to review this product!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-nerd-gray rounded-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {renderStars(review.rating)}
                  </div>
                  <h4 className="text-lg font-bold text-white">{review.title}</h4>
                </div>
                <div className="text-sm text-gray-400">
                  {review.createdAt.toLocaleDateString()}
                </div>
              </div>
              <p className="text-gray-300 mb-3">{review.comment}</p>
              <p className="text-sm text-gray-400">
                <span className="font-semibold text-white">{review.name}</span> - Verified Purchase
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
