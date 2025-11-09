import { loadStripe } from '@stripe/stripe-js'

// Load Stripe publishable key
let stripePromise
const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

    if (!publishableKey) {
      console.warn('Stripe publishable key not configured')
      return null
    }

    stripePromise = loadStripe(publishableKey)
  }
  return stripePromise
}

export default getStripe
