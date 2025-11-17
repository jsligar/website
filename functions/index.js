const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Email transporter configuration
// TODO: Configure with your email service (Gmail, SendGrid, etc.)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().email?.user || 'your-email@gmail.com',
    pass: functions.config().email?.password || 'your-app-password',
  },
});

// Email templates
const emailTemplates = {
  orderConfirmation: (orderData) => ({
    subject: `Order Confirmation - ${orderData.orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #DC2626;">Order Confirmation</h1>
        <p>Hi ${orderData.customer.firstName},</p>
        <p>Thank you for your order! We've received your order and will begin processing it soon.</p>

        <h2>Order Details</h2>
        <p><strong>Order Number:</strong> ${orderData.orderNumber}</p>
        <p><strong>Order Date:</strong> ${new Date(orderData.createdAt).toLocaleDateString()}</p>

        <h3>Items</h3>
        <ul>
          ${orderData.items.map(item => `
            <li>
              ${item.productName} - Qty: ${item.quantity} - $${item.total.toFixed(2)}
            </li>
          `).join('')}
        </ul>

        <h3>Order Summary</h3>
        <p><strong>Subtotal:</strong> $${orderData.subtotal.toFixed(2)}</p>
        ${orderData.discount ? `<p><strong>Discount:</strong> -$${orderData.discount.toFixed(2)}</p>` : ''}
        <p><strong>Shipping:</strong> ${orderData.shippingCost === 0 ? 'FREE' : '$' + orderData.shippingCost.toFixed(2)}</p>
        <p><strong>Total:</strong> $${orderData.total.toFixed(2)}</p>

        <h3>Shipping Address</h3>
        <p>
          ${orderData.shippingAddress.address}<br>
          ${orderData.shippingAddress.city}, ${orderData.shippingAddress.state} ${orderData.shippingAddress.zipCode}<br>
          ${orderData.shippingAddress.country}
        </p>

        <p>Processing typically takes 1-2 weeks. You'll receive a shipping notification when your order ships.</p>

        <p>
          Best regards,<br>
          <strong>NerdbillyFab Team</strong><br>
          <a href="https://nerdbillyfab.com">nerdbillyfab.com</a>
        </p>
      </div>
    `,
  }),

  reviewSubmitted: (reviewData) => ({
    subject: 'New Review Submitted for Approval',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>New Review Submitted</h1>
        <p>A customer has submitted a new review that requires approval.</p>

        <h2>Review Details</h2>
        <p><strong>Product:</strong> ${reviewData.productId}</p>
        <p><strong>Rating:</strong> ${'★'.repeat(reviewData.rating)}${'☆'.repeat(5 - reviewData.rating)}</p>
        <p><strong>Title:</strong> ${reviewData.title}</p>
        <p><strong>Comment:</strong> ${reviewData.comment}</p>
        <p><strong>Customer:</strong> ${reviewData.name} (${reviewData.email})</p>

        <p><a href="https://console.firebase.google.com">Approve in Firebase Console</a></p>
      </div>
    `,
  }),

  contactFormSubmission: (messageData) => ({
    subject: `Contact Form: ${messageData.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>New Contact Form Submission</h1>

        <p><strong>From:</strong> ${messageData.name} (${messageData.email})</p>
        <p><strong>Subject:</strong> ${messageData.subject}</p>

        <h2>Message</h2>
        <p>${messageData.message.replace(/\n/g, '<br>')}</p>

        <p><strong>Reply to:</strong> <a href="mailto:${messageData.email}">${messageData.email}</a></p>
      </div>
    `,
  }),

  newsletterWelcome: (subscriberData) => ({
    subject: 'Welcome to NerdbillyFab Newsletter!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #DC2626;">Welcome to NerdbillyFab!</h1>
        <p>Thanks for subscribing to our newsletter!</p>
        <p>You'll be the first to know about:</p>
        <ul>
          <li>New product launches</li>
          <li>Exclusive discounts and promotions</li>
          <li>Installation tips and how-to guides</li>
          <li>R&D updates on upcoming products</li>
        </ul>

        <p>Stay tuned for garage-built excellence!</p>

        <p>
          Best regards,<br>
          <strong>NerdbillyFab Team</strong>
        </p>

        <p style="font-size: 12px; color: #666;">
          Don't want these emails? <a href="https://nerdbillyfab.com">Unsubscribe</a>
        </p>
      </div>
    `,
  }),
};

// Send email helper
async function sendEmail(to, template) {
  try {
    await transporter.sendMail({
      from: '"NerdbillyFab" <noreply@nerdbillyfab.com>',
      to,
      subject: template.subject,
      html: template.html,
    });
    console.log('Email sent to:', to);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// Trigger: When a new order is created
exports.onOrderCreated = functions.firestore
  .document('orders/{orderId}')
  .onCreate(async (snap, context) => {
    const orderData = snap.data();

    // Send order confirmation email to customer
    await sendEmail(
      orderData.customer.email,
      emailTemplates.orderConfirmation(orderData)
    );

    // Send notification to admin
    const adminEmail = functions.config().admin?.email || 'admin@nerdbillyfab.com';
    await sendEmail(
      adminEmail,
      {
        subject: `New Order: ${orderData.orderNumber}`,
        html: `
          <h1>New Order Received</h1>
          <p>Order: ${orderData.orderNumber}</p>
          <p>Customer: ${orderData.customer.firstName} ${orderData.customer.lastName}</p>
          <p>Total: $${orderData.total.toFixed(2)}</p>
          <p><a href="https://console.firebase.google.com">View in Firebase Console</a></p>
        `,
      }
    );

    return null;
  });

// Trigger: When a review is submitted
exports.onReviewSubmitted = functions.firestore
  .document('reviews/{reviewId}')
  .onCreate(async (snap, context) => {
    const reviewData = snap.data();

    // Send email to admin for approval
    const adminEmail = functions.config().admin?.email || 'admin@nerdbillyfab.com';
    await sendEmail(
      adminEmail,
      emailTemplates.reviewSubmitted(reviewData)
    );

    return null;
  });

// Trigger: When a contact form is submitted
exports.onContactFormSubmitted = functions.firestore
  .document('contact_messages/{messageId}')
  .onCreate(async (snap, context) => {
    const messageData = snap.data();

    // Send email to admin
    const adminEmail = functions.config().admin?.email || 'admin@nerdbillyfab.com';
    await sendEmail(
      adminEmail,
      emailTemplates.contactFormSubmission(messageData)
    );

    // Send auto-reply to customer
    await sendEmail(
      messageData.email,
      {
        subject: 'We received your message - NerdbillyFab',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1>Thanks for contacting us!</h1>
            <p>Hi ${messageData.name},</p>
            <p>We've received your message and will get back to you within 24-48 hours.</p>

            <h2>Your Message</h2>
            <p><strong>Subject:</strong> ${messageData.subject}</p>
            <p>${messageData.message.replace(/\n/g, '<br>')}</p>

            <p>
              Best regards,<br>
              <strong>NerdbillyFab Team</strong>
            </p>
          </div>
        `,
      }
    );

    return null;
  });

// Trigger: When someone subscribes to newsletter
exports.onNewsletterSubscribe = functions.firestore
  .document('newsletter_subscribers/{subscriberId}')
  .onCreate(async (snap, context) => {
    const subscriberData = snap.data();

    // Send welcome email
    await sendEmail(
      subscriberData.email,
      emailTemplates.newsletterWelcome(subscriberData)
    );

    // Notify admin
    const adminEmail = functions.config().admin?.email || 'admin@nerdbillyfab.com';
    await sendEmail(
      adminEmail,
      {
        subject: 'New Newsletter Subscriber',
        html: `
          <h1>New Newsletter Subscriber</h1>
          <p>Email: ${subscriberData.email}</p>
          <p>Subscribed: ${new Date(subscriberData.subscribedAt?.toDate()).toLocaleDateString()}</p>
        `,
      }
    );

    return null;
  });

// HTTP Function: Verify payment (webhook from Stripe)
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  // TODO: Implement Stripe webhook verification
  // This would handle payment confirmations and update order status

  const sig = req.headers['stripe-signature'];
  // Verify webhook signature
  // Update order payment status
  // Send shipping notification

  res.json({ received: true });
});

// Scheduled Function: Send abandoned cart emails (if implementing cart persistence)
exports.sendAbandonedCartEmails = functions.pubsub
  .schedule('every 24 hours')
  .onRun(async (context) => {
    // TODO: Implement abandoned cart recovery
    // Query for carts that haven't been checked out in 24 hours
    // Send reminder emails

    console.log('Abandoned cart emails sent');
    return null;
  });
