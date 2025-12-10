import { db } from './firebase'
import { collection, addDoc } from 'firebase/firestore'

/**
 * Email service for NerdbillyFab
 *
 * This uses the Firebase Trigger Email Extension which monitors the 'mail' collection
 * and automatically sends emails based on documents added to it.
 *
 * Setup required:
 * 1. Install Firebase Trigger Email Extension from Firebase Console
 * 2. Configure SMTP settings (or use a provider like SendGrid, Mailgun, etc.)
 * 3. The extension will automatically process documents in the 'mail' collection
 */

// Email templates
export const EMAIL_TEMPLATES = {
  ORDER_CONFIRMATION: 'order-confirmation',
  ORDER_SHIPPED: 'order-shipped',
  ORDER_DELIVERED: 'order-delivered',
  ORDER_CANCELLED: 'order-cancelled',
}

/**
 * Send order confirmation email
 */
export async function sendOrderConfirmationEmail(order) {
  try {
    const mailData = {
      to: order.customer.email,
      from: 'orders@nerdbillyfab.com', // Update with your actual email
      replyTo: 'support@nerdbillyfab.com',
      template: {
        name: EMAIL_TEMPLATES.ORDER_CONFIRMATION,
        data: {
          customerName: `${order.customer.firstName} ${order.customer.lastName}`,
          orderNumber: order.orderNumber,
          orderDate: new Date(order.createdAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }),
          items: order.items,
          subtotal: order.subtotal.toFixed(2),
          discount: order.discount.toFixed(2),
          total: order.total.toFixed(2),
          shippingAddress: order.shippingAddress,
          trackOrderUrl: `https://nerdbillyfab.com/track-order`, // Update with your actual domain
        },
      },
      message: {
        subject: `Order Confirmation - ${order.orderNumber}`,
        html: generateOrderConfirmationHTML(order),
        text: generateOrderConfirmationText(order),
      },
    }

    // Add to Firestore 'mail' collection - Firebase Extension will process it
    const mailRef = collection(db, 'mail')
    await addDoc(mailRef, mailData)

    console.log('Order confirmation email queued for:', order.customer.email)
    return true
  } catch (error) {
    console.error('Error sending order confirmation email:', error)
    throw error
  }
}

/**
 * Send shipping notification email
 */
export async function sendShippingNotificationEmail(order) {
  try {
    const trackingUrl = getTrackingUrl(order.tracking.carrier, order.tracking.number)

    const mailData = {
      to: order.customer.email,
      from: 'orders@nerdbillyfab.com',
      replyTo: 'support@nerdbillyfab.com',
      template: {
        name: EMAIL_TEMPLATES.ORDER_SHIPPED,
        data: {
          customerName: `${order.customer.firstName} ${order.customer.lastName}`,
          orderNumber: order.orderNumber,
          trackingNumber: order.tracking.number,
          carrier: order.tracking.carrier,
          trackingUrl,
          items: order.items,
          shippingAddress: order.shippingAddress,
        },
      },
      message: {
        subject: `Your Order Has Shipped! - ${order.orderNumber}`,
        html: generateShippingNotificationHTML(order, trackingUrl),
        text: generateShippingNotificationText(order, trackingUrl),
      },
    }

    const mailRef = collection(db, 'mail')
    await addDoc(mailRef, mailData)

    console.log('Shipping notification email queued for:', order.customer.email)
    return true
  } catch (error) {
    console.error('Error sending shipping notification email:', error)
    throw error
  }
}

/**
 * Send order delivered email
 */
export async function sendDeliveredNotificationEmail(order) {
  try {
    const mailData = {
      to: order.customer.email,
      from: 'orders@nerdbillyfab.com',
      replyTo: 'support@nerdbillyfab.com',
      message: {
        subject: `Order Delivered - ${order.orderNumber}`,
        html: generateDeliveredNotificationHTML(order),
        text: generateDeliveredNotificationText(order),
      },
    }

    const mailRef = collection(db, 'mail')
    await addDoc(mailRef, mailData)

    console.log('Delivery notification email queued for:', order.customer.email)
    return true
  } catch (error) {
    console.error('Error sending delivery notification email:', error)
    throw error
  }
}

// Helper function to get tracking URL
function getTrackingUrl(carrier, trackingNumber) {
  const carriers = {
    USPS: `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNumber}`,
    UPS: `https://www.ups.com/track?tracknum=${trackingNumber}`,
    FedEx: `https://www.fedex.com/fedextrack/?trknbr=${trackingNumber}`,
  }
  return carriers[carrier] || '#'
}

// ============================================================================
// HTML EMAIL TEMPLATES
// ============================================================================

function generateOrderConfirmationHTML(order) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #1a1a1a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #2a2a2a; border-radius: 8px; overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color: #dc2626; padding: 30px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px;">NerdbillyFab</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px;">Order Confirmation</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">

              <!-- Greeting -->
              <p style="color: #e5e5e5; font-size: 16px; margin: 0 0 20px 0;">
                Hi ${order.customer.firstName},
              </p>

              <p style="color: #e5e5e5; font-size: 16px; margin: 0 0 30px 0;">
                Thank you for your order! We've received your order and will begin processing it soon.
              </p>

              <!-- Order Number Box -->
              <div style="background-color: #dc2626; border: 2px solid #dc2626; border-radius: 8px; padding: 20px; margin: 0 0 30px 0; text-align: center;">
                <p style="color: #ffffff; font-size: 14px; margin: 0 0 10px 0; font-weight: bold;">YOUR ORDER NUMBER</p>
                <p style="color: #ffffff; font-size: 24px; margin: 0; font-family: 'Courier New', monospace; letter-spacing: 2px;">${order.orderNumber}</p>
              </div>

              <p style="color: #a3a3a3; font-size: 14px; margin: 0 0 30px 0; text-align: center;">
                Save this order number to track your order status
              </p>

              <!-- Order Details -->
              <h2 style="color: #ffffff; font-size: 20px; margin: 0 0 20px 0; border-bottom: 2px solid #404040; padding-bottom: 10px;">
                Order Details
              </h2>

              ${order.items.map(item => `
                <div style="background-color: #1a1a1a; border-radius: 6px; padding: 15px; margin: 0 0 10px 0;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="color: #ffffff; font-weight: bold; font-size: 15px;">${item.productName}</td>
                      <td align="right" style="color: #dc2626; font-weight: bold; font-size: 15px;">$${item.total.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colspan="2" style="color: #a3a3a3; font-size: 13px; padding-top: 5px;">Quantity: ${item.quantity}</td>
                    </tr>
                  </table>
                </div>
              `).join('')}

              <!-- Order Summary -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0; border-top: 2px solid #404040; padding-top: 20px;">
                <tr>
                  <td style="color: #a3a3a3; padding: 5px 0;">Subtotal</td>
                  <td align="right" style="color: #a3a3a3; padding: 5px 0;">$${order.subtotal.toFixed(2)}</td>
                </tr>
                ${order.discount > 0 ? `
                <tr>
                  <td style="color: #22c55e; padding: 5px 0;">Discount ${order.couponCode ? `(${order.couponCode})` : ''}</td>
                  <td align="right" style="color: #22c55e; padding: 5px 0;">-$${order.discount.toFixed(2)}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="color: #a3a3a3; padding: 5px 0;">Shipping</td>
                  <td align="right" style="color: #22c55e; font-weight: bold; padding: 5px 0;">FREE</td>
                </tr>
                <tr style="border-top: 2px solid #404040;">
                  <td style="color: #ffffff; font-weight: bold; font-size: 18px; padding: 15px 0 0 0;">Total</td>
                  <td align="right" style="color: #dc2626; font-weight: bold; font-size: 18px; padding: 15px 0 0 0;">$${order.total.toFixed(2)}</td>
                </tr>
              </table>

              <!-- Shipping Address -->
              <h2 style="color: #ffffff; font-size: 20px; margin: 30px 0 20px 0; border-bottom: 2px solid #404040; padding-bottom: 10px;">
                Shipping Address
              </h2>

              <div style="background-color: #1a1a1a; border-radius: 6px; padding: 15px;">
                <p style="color: #ffffff; margin: 0 0 5px 0;">${order.customer.firstName} ${order.customer.lastName}</p>
                <p style="color: #a3a3a3; margin: 0; line-height: 1.6;">
                  ${order.shippingAddress.address}<br>
                  ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}<br>
                  ${order.shippingAddress.country}
                </p>
              </div>

              <!-- What's Next -->
              <h2 style="color: #ffffff; font-size: 20px; margin: 30px 0 20px 0; border-bottom: 2px solid #404040; padding-bottom: 10px;">
                What's Next?
              </h2>

              <ul style="color: #a3a3a3; line-height: 1.8; padding-left: 20px;">
                <li>Your order will be processed within 1-2 weeks (made to order)</li>
                <li>Free shipping via USPS (3-5 business days after processing)</li>
                <li>You'll receive tracking information once your order ships</li>
              </ul>

              <!-- Track Order Button -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://nerdbillyfab.com/track-order" style="display: inline-block; background-color: #dc2626; color: #ffffff; text-decoration: none; padding: 15px 40px; border-radius: 6px; font-weight: bold; font-size: 16px;">
                  Track Your Order
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1a1a1a; padding: 30px; text-align: center; border-top: 1px solid #404040;">
              <p style="color: #737373; font-size: 14px; margin: 0 0 10px 0;">
                Questions? Contact us at <a href="mailto:support@nerdbillyfab.com" style="color: #dc2626; text-decoration: none;">support@nerdbillyfab.com</a>
              </p>
              <p style="color: #525252; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} NerdbillyFab. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

function generateShippingNotificationHTML(order, trackingUrl) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Shipped</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #1a1a1a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #2a2a2a; border-radius: 8px; overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color: #22c55e; padding: 30px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px;">📦 Order Shipped!</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">

              <p style="color: #e5e5e5; font-size: 16px; margin: 0 0 20px 0;">
                Hi ${order.customer.firstName},
              </p>

              <p style="color: #e5e5e5; font-size: 16px; margin: 0 0 30px 0;">
                Great news! Your order <strong>${order.orderNumber}</strong> has been shipped and is on its way to you.
              </p>

              <!-- Tracking Info -->
              <div style="background-color: #1a1a1a; border: 2px solid #22c55e; border-radius: 8px; padding: 20px; margin: 0 0 30px 0;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="color: #a3a3a3; font-size: 14px; padding-bottom: 10px;">Tracking Number</td>
                  </tr>
                  <tr>
                    <td style="color: #ffffff; font-size: 20px; font-family: 'Courier New', monospace; padding-bottom: 15px;">${order.tracking.number}</td>
                  </tr>
                  <tr>
                    <td style="color: #a3a3a3; font-size: 14px; padding-bottom: 5px;">Carrier</td>
                  </tr>
                  <tr>
                    <td style="color: #ffffff; font-size: 16px; padding-bottom: 20px;">${order.tracking.carrier}</td>
                  </tr>
                  <tr>
                    <td align="center">
                      <a href="${trackingUrl}" style="display: inline-block; background-color: #22c55e; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: bold; font-size: 14px;">
                        Track Package
                      </a>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Order Items -->
              <h2 style="color: #ffffff; font-size: 20px; margin: 30px 0 20px 0; border-bottom: 2px solid #404040; padding-bottom: 10px;">
                Items in This Shipment
              </h2>

              ${order.items.map(item => `
                <div style="background-color: #1a1a1a; border-radius: 6px; padding: 15px; margin: 0 0 10px 0;">
                  <p style="color: #ffffff; font-weight: bold; margin: 0 0 5px 0;">${item.productName}</p>
                  <p style="color: #a3a3a3; font-size: 13px; margin: 0;">Quantity: ${item.quantity}</p>
                </div>
              `).join('')}

              <!-- Shipping Address -->
              <h2 style="color: #ffffff; font-size: 20px; margin: 30px 0 20px 0; border-bottom: 2px solid #404040; padding-bottom: 10px;">
                Shipping To
              </h2>

              <div style="background-color: #1a1a1a; border-radius: 6px; padding: 15px;">
                <p style="color: #ffffff; margin: 0 0 5px 0;">${order.customer.firstName} ${order.customer.lastName}</p>
                <p style="color: #a3a3a3; margin: 0; line-height: 1.6;">
                  ${order.shippingAddress.address}<br>
                  ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}<br>
                  ${order.shippingAddress.country}
                </p>
              </div>

              <p style="color: #a3a3a3; font-size: 14px; margin: 30px 0 0 0; line-height: 1.6;">
                Your package should arrive in 3-5 business days. You can track your shipment using the link above.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1a1a1a; padding: 30px; text-align: center; border-top: 1px solid #404040;">
              <p style="color: #737373; font-size: 14px; margin: 0 0 10px 0;">
                Questions? Contact us at <a href="mailto:support@nerdbillyfab.com" style="color: #dc2626; text-decoration: none;">support@nerdbillyfab.com</a>
              </p>
              <p style="color: #525252; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} NerdbillyFab. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

function generateDeliveredNotificationHTML(order) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Delivered</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #1a1a1a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #2a2a2a; border-radius: 8px; overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="background-color: #22c55e; padding: 30px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px;">🎉 Order Delivered!</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">

              <p style="color: #e5e5e5; font-size: 16px; margin: 0 0 20px 0;">
                Hi ${order.customer.firstName},
              </p>

              <p style="color: #e5e5e5; font-size: 16px; margin: 0 0 30px 0;">
                Your order <strong>${order.orderNumber}</strong> has been delivered! We hope you love your new parts.
              </p>

              <div style="background-color: #1a1a1a; border: 2px solid #22c55e; border-radius: 8px; padding: 20px; margin: 0 0 30px 0; text-align: center;">
                <p style="color: #22c55e; font-size: 48px; margin: 0;">✓</p>
                <p style="color: #ffffff; font-size: 18px; margin: 10px 0 0 0;">Delivery Confirmed</p>
              </div>

              <p style="color: #e5e5e5; font-size: 16px; margin: 0 0 20px 0;">
                We'd love to see your build! Tag us on social media or share photos of your project.
              </p>

              <p style="color: #a3a3a3; font-size: 14px; margin: 30px 0 0 0; line-height: 1.6;">
                If you have any questions or concerns about your order, please don't hesitate to reach out to us.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1a1a1a; padding: 30px; text-align: center; border-top: 1px solid #404040;">
              <p style="color: #737373; font-size: 14px; margin: 0 0 10px 0;">
                Questions? Contact us at <a href="mailto:support@nerdbillyfab.com" style="color: #dc2626; text-decoration: none;">support@nerdbillyfab.com</a>
              </p>
              <p style="color: #525252; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} NerdbillyFab. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

// ============================================================================
// PLAIN TEXT EMAIL TEMPLATES (fallback)
// ============================================================================

function generateOrderConfirmationText(order) {
  return `
Order Confirmation - NerdbillyFab

Hi ${order.customer.firstName},

Thank you for your order! We've received your order and will begin processing it soon.

YOUR ORDER NUMBER: ${order.orderNumber}
Save this order number to track your order status

Order Details:
${order.items.map(item => `- ${item.productName} (Qty: ${item.quantity}): $${item.total.toFixed(2)}`).join('\n')}

Order Summary:
Subtotal: $${order.subtotal.toFixed(2)}
${order.discount > 0 ? `Discount ${order.couponCode ? `(${order.couponCode})` : ''}: -$${order.discount.toFixed(2)}\n` : ''}Shipping: FREE
Total: $${order.total.toFixed(2)}

Shipping Address:
${order.customer.firstName} ${order.customer.lastName}
${order.shippingAddress.address}
${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}
${order.shippingAddress.country}

What's Next?
- Your order will be processed within 1-2 weeks (made to order)
- Free shipping via USPS (3-5 business days after processing)
- You'll receive tracking information once your order ships

Track your order: https://nerdbillyfab.com/track-order

Questions? Contact us at support@nerdbillyfab.com

© ${new Date().getFullYear()} NerdbillyFab. All rights reserved.
  `.trim()
}

function generateShippingNotificationText(order, trackingUrl) {
  return `
Order Shipped - NerdbillyFab

Hi ${order.customer.firstName},

Great news! Your order ${order.orderNumber} has been shipped and is on its way to you.

Tracking Information:
Tracking Number: ${order.tracking.number}
Carrier: ${order.tracking.carrier}
Track Package: ${trackingUrl}

Items in This Shipment:
${order.items.map(item => `- ${item.productName} (Qty: ${item.quantity})`).join('\n')}

Shipping To:
${order.customer.firstName} ${order.customer.lastName}
${order.shippingAddress.address}
${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}
${order.shippingAddress.country}

Your package should arrive in 3-5 business days.

Questions? Contact us at support@nerdbillyfab.com

© ${new Date().getFullYear()} NerdbillyFab. All rights reserved.
  `.trim()
}

function generateDeliveredNotificationText(order) {
  return `
Order Delivered - NerdbillyFab

Hi ${order.customer.firstName},

Your order ${order.orderNumber} has been delivered! We hope you love your new parts.

We'd love to see your build! Tag us on social media or share photos of your project.

If you have any questions or concerns about your order, please don't hesitate to reach out to us.

Questions? Contact us at support@nerdbillyfab.com

© ${new Date().getFullYear()} NerdbillyFab. All rights reserved.
  `.trim()
}
