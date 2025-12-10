'use client'

import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { validateEmail, validateName } from '../../lib/validation'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    orderNumber: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Name validation
    const nameResult = validateName(formData.name)
    if (!nameResult.valid) {
      newErrors.name = nameResult.error
    }

    // Email validation
    const emailResult = validateEmail(formData.email)
    if (!emailResult.valid) {
      newErrors.email = emailResult.error
    }

    // Message validation
    if (!formData.message || formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setSubmitting(true)

    try {
      // Save contact form submission to Firestore
      await addDoc(collection(db, 'contact_submissions'), {
        ...formData,
        submittedAt: new Date().toISOString(),
        status: 'new'
      })

      // Optionally send email notification
      // You can trigger an email via Firebase Functions or Email Extension

      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        subject: 'general',
        orderNumber: '',
        message: ''
      })
    } catch (error) {
      console.error('Error submitting contact form:', error)
      setErrors({ submit: 'Failed to submit form. Please try again or email us directly.' })
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-nerd-dark flex items-center justify-center py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">Message Sent!</h1>
          <p className="text-gray-300 text-lg mb-8">
            Thank you for contacting us. We've received your message and will respond within 1-2 business days.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setSubmitted(false)}
              className="bg-nerd-light-gray hover:bg-gray-600 text-white font-bold py-3 px-6 rounded transition"
            >
              Send Another Message
            </button>
            <a
              href="/"
              className="btn-primary inline-block text-center"
            >
              Return Home
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-nerd-dark py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-gray-400 text-lg">
            Have a question? We're here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-white mb-4">Get In Touch</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center">
                    <svg className="w-5 h-5 text-nerd-red mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </h3>
                  <p className="text-gray-300 text-sm ml-7">
                    <a href="mailto:support@nerdbillyfab.com" className="text-nerd-red hover:text-red-400">
                      support@nerdbillyfab.com
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center">
                    <svg className="w-5 h-5 text-nerd-red mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Response Time
                  </h3>
                  <p className="text-gray-300 text-sm ml-7">
                    We typically respond within 1-2 business days
                  </p>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center">
                    <svg className="w-5 h-5 text-nerd-red mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Track Order
                  </h3>
                  <p className="text-gray-300 text-sm ml-7">
                    <a href="/track-order" className="text-nerd-red hover:text-red-400">
                      Track your order status
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Before You Contact Us</h2>
              <p className="text-gray-300 text-sm mb-4">
                Check if your question is answered in our FAQ:
              </p>
              <a
                href="/faq"
                className="btn-primary block text-center"
              >
                View FAQ
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-white font-semibold mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-nerd-dark border rounded text-white focus:outline-none focus:ring-2 ${
                      errors.name ? 'border-red-500 focus:ring-red-500' : 'border-nerd-light-gray focus:ring-nerd-red'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-white font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-nerd-dark border rounded text-white focus:outline-none focus:ring-2 ${
                      errors.email ? 'border-red-500 focus:ring-red-500' : 'border-nerd-light-gray focus:ring-nerd-red'
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-white font-semibold mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-nerd-dark border border-nerd-light-gray rounded text-white focus:outline-none focus:ring-2 focus:ring-nerd-red"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Question</option>
                    <option value="technical">Technical Support</option>
                    <option value="shipping">Shipping Issue</option>
                    <option value="return">Return/Refund</option>
                    <option value="product">Product Question</option>
                    <option value="custom">Custom Order Request</option>
                  </select>
                </div>

                {/* Order Number (optional) */}
                <div>
                  <label htmlFor="orderNumber" className="block text-white font-semibold mb-2">
                    Order Number <span className="text-gray-400 font-normal">(if applicable)</span>
                  </label>
                  <input
                    type="text"
                    id="orderNumber"
                    name="orderNumber"
                    value={formData.orderNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-nerd-dark border border-nerd-light-gray rounded text-white focus:outline-none focus:ring-2 focus:ring-nerd-red"
                    placeholder="NF-1234567890123"
                  />
                  <p className="text-gray-500 text-sm mt-1">
                    Found in your order confirmation email
                  </p>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-white font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className={`w-full px-4 py-3 bg-nerd-dark border rounded text-white focus:outline-none focus:ring-2 ${
                      errors.message ? 'border-red-500 focus:ring-red-500' : 'border-nerd-light-gray focus:ring-nerd-red'
                    }`}
                    placeholder="Please provide as much detail as possible..."
                  />
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
                    <p className="text-red-300 text-sm">{errors.submit}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>

                <p className="text-gray-400 text-sm text-center">
                  * Required fields
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
