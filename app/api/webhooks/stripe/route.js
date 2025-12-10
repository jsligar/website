import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { db } from '../../../../lib/firebase'
import { doc, updateDoc, getDoc, arrayUnion } from 'firebase/firestore'
import { sendOrderConfirmationEmail } from '../../../../lib/emails'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

/**
 * Stripe Webhook Handler
 *
 * This endpoint handles Stripe webhook events for payment verification.
 * It's called by Stripe when payment events occur (payment success, failure, etc.)
 *
 * CRITICAL: This is the only truly secure way to verify payments
 * Client-side verification can be spoofed!
 */
export async function POST(request) {
  try {
    const body = await request.text()
    const headersList = headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      console.error('No Stripe signature found')
      return NextResponse.json(
        { error: 'No signature' },
        { status: 400 }
      )
    }

    // Verify webhook signature
    let event
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message)
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      )
    }

    // Handle the event
    console.log(`Received Stripe event: ${event.type}`)

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object)
        break

      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object)
        break

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object)
        break

      case 'charge.refunded':
        await handleChargeRefunded(event.data.object)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    // Return 200 to acknowledge receipt
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

// Handle successful checkout session
async function handleCheckoutSessionCompleted(session) {
  try {
    console.log('Processing checkout session:', session.id)

    // Get order ID from metadata
    const orderId = session.metadata?.orderId
    if (!orderId) {
      console.error('No order ID in session metadata')
      return
    }

    // Get order from Firestore
    const orderRef = doc(db, 'orders', orderId)
    const orderSnap = await getDoc(orderRef)

    if (!orderSnap.exists()) {
      console.error(`Order ${orderId} not found`)
      return
    }

    const order = { id: orderSnap.id, ...orderSnap.data() }

    // Update order status
    await updateDoc(orderRef, {
      paymentStatus: 'paid',
      paidAt: new Date().toISOString(),
      status: 'processing',
      stripeSessionId: session.id,
      stripePaymentIntent: session.payment_intent,
      updatedAt: new Date().toISOString(),
      statusHistory: arrayUnion({
        status: 'paid',
        notes: 'Payment completed via Stripe Checkout',
        timestamp: new Date().toISOString(),
      }),
    })

    // Send order confirmation email
    try {
      const updatedOrder = { ...order, status: 'processing', paymentStatus: 'paid' }
      await sendOrderConfirmationEmail(updatedOrder)
      console.log('Order confirmation email sent')
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError)
      // Don't fail the webhook if email fails
    }

    console.log(`Order ${orderId} marked as paid`)
  } catch (error) {
    console.error('Error handling checkout session:', error)
    throw error
  }
}

// Handle successful payment intent
async function handlePaymentIntentSucceeded(paymentIntent) {
  try {
    console.log('Payment succeeded:', paymentIntent.id)

    // Get order ID from metadata
    const orderId = paymentIntent.metadata?.orderId
    if (!orderId) {
      console.log('No order ID in payment intent metadata')
      return
    }

    // Get order
    const orderRef = doc(db, 'orders', orderId)
    const orderSnap = await getDoc(orderRef)

    if (!orderSnap.exists()) {
      console.error(`Order ${orderId} not found`)
      return
    }

    // Update order
    await updateDoc(orderRef, {
      paymentStatus: 'paid',
      paidAt: new Date().toISOString(),
      status: 'processing',
      stripePaymentIntent: paymentIntent.id,
      updatedAt: new Date().toISOString(),
      statusHistory: arrayUnion({
        status: 'paid',
        notes: 'Payment completed',
        timestamp: new Date().toISOString(),
      }),
    })

    console.log(`Order ${orderId} payment confirmed`)
  } catch (error) {
    console.error('Error handling payment intent:', error)
    throw error
  }
}

// Handle failed payment
async function handlePaymentIntentFailed(paymentIntent) {
  try {
    console.log('Payment failed:', paymentIntent.id)

    const orderId = paymentIntent.metadata?.orderId
    if (!orderId) {
      return
    }

    const orderRef = doc(db, 'orders', orderId)
    const orderSnap = await getDoc(orderRef)

    if (!orderSnap.exists()) {
      console.error(`Order ${orderId} not found`)
      return
    }

    // Update order to mark payment failed
    await updateDoc(orderRef, {
      paymentStatus: 'failed',
      paymentFailedAt: new Date().toISOString(),
      status: 'cancelled',
      stripePaymentIntent: paymentIntent.id,
      updatedAt: new Date().toISOString(),
      statusHistory: arrayUnion({
        status: 'cancelled',
        notes: `Payment failed: ${paymentIntent.last_payment_error?.message || 'Unknown error'}`,
        timestamp: new Date().toISOString(),
      }),
    })

    console.log(`Order ${orderId} marked as failed`)
  } catch (error) {
    console.error('Error handling failed payment:', error)
    throw error
  }
}

// Handle refund
async function handleChargeRefunded(charge) {
  try {
    console.log('Charge refunded:', charge.id)

    // Get payment intent
    const paymentIntent = charge.payment_intent
    if (!paymentIntent) {
      return
    }

    // You might need to look up the order by payment intent ID
    // For now, log it
    console.log('Refund processed for payment intent:', paymentIntent)

    // TODO: Update order status to 'refunded' if you have the order ID
    // This might require querying Firestore for orders with this payment intent
  } catch (error) {
    console.error('Error handling refund:', error)
    throw error
  }
}

// Disable body parsing, need raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
}
