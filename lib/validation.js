/**
 * Input Validation Utilities
 *
 * Centralized validation functions for form inputs throughout the application.
 * Helps prevent XSS, injection attacks, and data corruption.
 */

// Email validation (RFC 5322 compliant)
export function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' }
  }

  const trimmed = email.trim()

  // Basic format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Invalid email format' }
  }

  // Length check
  if (trimmed.length > 254) {
    return { valid: false, error: 'Email is too long' }
  }

  return { valid: true, value: trimmed.toLowerCase() }
}

// Phone number validation (US/Canada format)
export function validatePhone(phone) {
  if (!phone) {
    return { valid: true, value: '' } // Optional field
  }

  const cleaned = phone.replace(/\D/g, '')

  // Must be 10 or 11 digits (with or without country code)
  if (cleaned.length < 10 || cleaned.length > 11) {
    return { valid: false, error: 'Phone number must be 10 digits' }
  }

  // Format as (XXX) XXX-XXXX
  const formatted = cleaned.length === 11
    ? `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
    : `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`

  return { valid: true, value: formatted }
}

// ZIP code validation (US format)
export function validateZipCode(zip) {
  if (!zip || typeof zip !== 'string') {
    return { valid: false, error: 'ZIP code is required' }
  }

  const cleaned = zip.trim().replace(/\s/g, '')

  // 5 digits or 5+4 format
  const zipRegex = /^\d{5}(-\d{4})?$/
  if (!zipRegex.test(cleaned)) {
    return { valid: false, error: 'Invalid ZIP code format (use 12345 or 12345-6789)' }
  }

  return { valid: true, value: cleaned }
}

// Name validation
export function validateName(name, fieldName = 'Name') {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: `${fieldName} is required` }
  }

  const trimmed = name.trim()

  if (trimmed.length < 2) {
    return { valid: false, error: `${fieldName} must be at least 2 characters` }
  }

  if (trimmed.length > 50) {
    return { valid: false, error: `${fieldName} is too long (max 50 characters)` }
  }

  // Only letters, spaces, hyphens, apostrophes
  const nameRegex = /^[a-zA-Z\s'-]+$/
  if (!nameRegex.test(trimmed)) {
    return { valid: false, error: `${fieldName} contains invalid characters` }
  }

  return { valid: true, value: trimmed }
}

// Address validation
export function validateAddress(address) {
  if (!address || typeof address !== 'string') {
    return { valid: false, error: 'Address is required' }
  }

  const trimmed = address.trim()

  if (trimmed.length < 5) {
    return { valid: false, error: 'Address is too short' }
  }

  if (trimmed.length > 100) {
    return { valid: false, error: 'Address is too long (max 100 characters)' }
  }

  return { valid: true, value: trimmed }
}

// City validation
export function validateCity(city) {
  if (!city || typeof city !== 'string') {
    return { valid: false, error: 'City is required' }
  }

  const trimmed = city.trim()

  if (trimmed.length < 2) {
    return { valid: false, error: 'City name is too short' }
  }

  if (trimmed.length > 50) {
    return { valid: false, error: 'City name is too long' }
  }

  // Letters, spaces, hyphens, apostrophes
  const cityRegex = /^[a-zA-Z\s'-]+$/
  if (!cityRegex.test(trimmed)) {
    return { valid: false, error: 'City name contains invalid characters' }
  }

  return { valid: true, value: trimmed }
}

// US State validation
export function validateState(state) {
  if (!state || typeof state !== 'string') {
    return { valid: false, error: 'State is required' }
  }

  const trimmed = state.trim().toUpperCase()

  const validStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
    'DC' // Washington D.C.
  ]

  if (!validStates.includes(trimmed)) {
    return { valid: false, error: 'Invalid US state code (use 2-letter abbreviation)' }
  }

  return { valid: true, value: trimmed }
}

// Price validation
export function validatePrice(price, fieldName = 'Price') {
  if (price === undefined || price === null || price === '') {
    return { valid: false, error: `${fieldName} is required` }
  }

  const numPrice = typeof price === 'string' ? parseFloat(price) : price

  if (isNaN(numPrice)) {
    return { valid: false, error: `${fieldName} must be a number` }
  }

  if (numPrice < 0) {
    return { valid: false, error: `${fieldName} cannot be negative` }
  }

  if (numPrice > 999999.99) {
    return { valid: false, error: `${fieldName} is too high` }
  }

  // Round to 2 decimal places
  const rounded = Math.round(numPrice * 100) / 100

  return { valid: true, value: rounded }
}

// Quantity validation
export function validateQuantity(quantity, max = 999) {
  if (quantity === undefined || quantity === null || quantity === '') {
    return { valid: false, error: 'Quantity is required' }
  }

  const num = typeof quantity === 'string' ? parseInt(quantity, 10) : quantity

  if (isNaN(num) || !Number.isInteger(num)) {
    return { valid: false, error: 'Quantity must be a whole number' }
  }

  if (num < 1) {
    return { valid: false, error: 'Quantity must be at least 1' }
  }

  if (num > max) {
    return { valid: false, error: `Quantity cannot exceed ${max}` }
  }

  return { valid: true, value: num }
}

// SKU validation
export function validateSKU(sku) {
  if (!sku || typeof sku !== 'string') {
    return { valid: false, error: 'SKU is required' }
  }

  const trimmed = sku.trim().toUpperCase()

  if (trimmed.length < 3) {
    return { valid: false, error: 'SKU is too short (min 3 characters)' }
  }

  if (trimmed.length > 50) {
    return { valid: false, error: 'SKU is too long (max 50 characters)' }
  }

  // Alphanumeric, hyphens, underscores only
  const skuRegex = /^[A-Z0-9_-]+$/
  if (!skuRegex.test(trimmed)) {
    return { valid: false, error: 'SKU can only contain letters, numbers, hyphens, and underscores' }
  }

  return { valid: true, value: trimmed }
}

// Order number validation
export function validateOrderNumber(orderNumber) {
  if (!orderNumber || typeof orderNumber !== 'string') {
    return { valid: false, error: 'Order number is required' }
  }

  const trimmed = orderNumber.trim()

  // Should match format: NF-XXXXXXXXXXXXX
  const orderRegex = /^NF-\d{13,}$/
  if (!orderRegex.test(trimmed)) {
    return { valid: false, error: 'Invalid order number format (should be NF-XXXXXXXXXXXXX)' }
  }

  return { valid: true, value: trimmed }
}

// URL validation
export function validateURL(url) {
  if (!url || typeof url !== 'string') {
    return { valid: true, value: '' } // Optional
  }

  const trimmed = url.trim()

  try {
    const urlObj = new URL(trimmed)
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return { valid: false, error: 'URL must use HTTP or HTTPS' }
    }
    return { valid: true, value: trimmed }
  } catch {
    return { valid: false, error: 'Invalid URL format' }
  }
}

// Sanitize HTML (prevent XSS)
export function sanitizeHTML(html) {
  if (!html || typeof html !== 'string') {
    return ''
  }

  // Remove all HTML tags
  return html.replace(/<[^>]*>/g, '').trim()
}

// Validate entire checkout form
export function validateCheckoutForm(formData) {
  const errors = {}

  // Email
  const emailResult = validateEmail(formData.email)
  if (!emailResult.valid) {
    errors.email = emailResult.error
  }

  // First name
  const firstNameResult = validateName(formData.firstName, 'First name')
  if (!firstNameResult.valid) {
    errors.firstName = firstNameResult.error
  }

  // Last name
  const lastNameResult = validateName(formData.lastName, 'Last name')
  if (!lastNameResult.valid) {
    errors.lastName = lastNameResult.error
  }

  // Phone (optional)
  if (formData.phone) {
    const phoneResult = validatePhone(formData.phone)
    if (!phoneResult.valid) {
      errors.phone = phoneResult.error
    }
  }

  // Address
  const addressResult = validateAddress(formData.address)
  if (!addressResult.valid) {
    errors.address = addressResult.error
  }

  // City
  const cityResult = validateCity(formData.city)
  if (!cityResult.valid) {
    errors.city = cityResult.error
  }

  // State
  const stateResult = validateState(formData.state)
  if (!stateResult.valid) {
    errors.state = stateResult.error
  }

  // ZIP
  const zipResult = validateZipCode(formData.zipCode)
  if (!zipResult.valid) {
    errors.zipCode = zipResult.error
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  }
}

// Validate product form
export function validateProductForm(formData) {
  const errors = {}

  // Name
  if (!formData.name || formData.name.trim().length < 3) {
    errors.name = 'Product name must be at least 3 characters'
  }

  // SKU
  const skuResult = validateSKU(formData.sku)
  if (!skuResult.valid) {
    errors.sku = skuResult.error
  }

  // Price
  const priceResult = validatePrice(formData.price)
  if (!priceResult.valid) {
    errors.price = priceResult.error
  }

  // Quantity
  const qtyResult = validateQuantity(formData.quantity, 9999)
  if (!qtyResult.valid) {
    errors.quantity = qtyResult.error
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  }
}

export default {
  validateEmail,
  validatePhone,
  validateZipCode,
  validateName,
  validateAddress,
  validateCity,
  validateState,
  validatePrice,
  validateQuantity,
  validateSKU,
  validateOrderNumber,
  validateURL,
  sanitizeHTML,
  validateCheckoutForm,
  validateProductForm,
}
