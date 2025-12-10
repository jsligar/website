# Stripe Webhook Setup Guide

This guide explains how to set up Stripe webhooks for secure payment verification.

## Why Webhooks Are Critical

**SECURITY:** Never trust client-side payment confirmation alone!

- Client-side code can be manipulated
- Users can fake payment success
- Network issues can cause false confirmations
- Webhooks provide server-side verification from Stripe directly

## Quick Setup

### Step 1: Install Stripe SDK

```bash
npm install stripe
```

### Step 2: Add Environment Variables

Add to `.env.local`:

```bash
# Stripe Secret Key (from Stripe Dashboard)
STRIPE_SECRET_KEY=sk_test_...your_secret_key...

# Stripe Webhook Secret (you'll get this in Step 4)
STRIPE_WEBHOOK_SECRET=whsec_...your_webhook_secret...
```

**IMPORTANT:**
- Never commit `.env.local` to Git
- Add `.env.local` to `.gitignore`
- Use different keys for test/production

### Step 3: Deploy Your Application

The webhook endpoint must be publicly accessible:

```
https://your domain.com/api/webhooks/stripe
```

Deploy to:
- Vercel (recommended for Next.js)
- Firebase Hosting
- Your own server

**For local testing:**
```bash
# Install Stripe CLI
brew install stripe/stripe-brew/stripe

# Login
stripe login

# Forward webhooks to local
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### Step 4: Configure Webhook in Stripe Dashboard

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Click **Developers** → **Webhooks**
3. Click **Add endpoint**

**Configuration:**
```
Endpoint URL: https://yourdomain.com/api/webhooks/stripe
Description: NerdbillyFab Order Processing
Events to send: Select these events:
  ☑ checkout.session.completed
  ☑ payment_intent.succeeded
  ☑ payment_intent.payment_failed
  ☑ charge.refunded
```

4. Click **Add endpoint**
5. Click **Reveal** under "Signing secret"
6. Copy the webhook secret (starts with `whsec_`)
7. Add to `.env.local` as `STRIPE_WEBHOOK_SECRET`

### Step 5: Update Stripe Checkout to Include Metadata

When creating Stripe Checkout sessions or Payment Intents, include order ID in metadata:

```javascript
// Example with Stripe Checkout
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [...],
  mode: 'payment',
  success_url: `${process.env.NEXT_PUBLIC_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout`,
  metadata: {
    orderId: order.id, // ← CRITICAL: Include order ID
  },
});
```

### Step 6: Test the Webhook

**Using Stripe CLI (Local Testing):**

```bash
# Start Next.js dev server
npm run dev

# In another terminal, forward webhooks
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Trigger test events
stripe trigger checkout.session.completed
stripe trigger payment_intent.succeeded
stripe trigger payment_intent.payment_failed
```

**Using Stripe Dashboard:**

1. Go to **Developers** → **Webhooks**
2. Click on your webhook endpoint
3. Click **Send test webhook**
4. Select event type
5. Click **Send test webhook**
6. Check logs in your application

## Event Flow

Here's what happens when a customer pays:

```
1. Customer clicks "Pay" on your site
   ↓
2. Redirected to Stripe Checkout
   ↓
3. Customer enters payment details
   ↓
4. Stripe processes payment
   ↓
5. Stripe sends webhook to your server ← CRITICAL STEP
   ↓
6. Your webhook handler verifies signature
   ↓
7. Updates order status in Firestore
   ↓
8. Sends confirmation email to customer
   ↓
9. Customer redirected to success page
```

**Without webhooks:** Steps 5-8 don't happen server-side = INSECURE

## Webhook Events Handled

### `checkout.session.completed`
**When:** Stripe Checkout session completes successfully
**Action:**
- Mark order as paid
- Update status to "processing"
- Send confirmation email
- Record Stripe session ID

### `payment_intent.succeeded`
**When:** Payment Intent succeeds (direct API usage)
**Action:**
- Mark order as paid
- Update status to "processing"
- Record payment intent ID

### `payment_intent.payment_failed`
**When:** Payment fails
**Action:**
- Mark order as failed
- Update status to "cancelled"
- Log error message

### `charge.refunded`
**When:** Admin issues refund
**Action:**
- Log refund (you may want to update order status)

## Security Best Practices

### 1. Always Verify Webhook Signature

```javascript
// GOOD ✅
const event = stripe.webhooks.constructEvent(
  body,
  signature,
  webhookSecret
);

// BAD ❌ - Don't just trust the payload!
const event = JSON.parse(body);
```

### 2. Use HTTPS in Production

```
✅ https://yourdomain.com/api/webhooks/stripe
❌ http://yourdomain.com/api/webhooks/stripe
```

HTTP webhooks are insecure!

### 3. Keep Webhook Secret Secure

```bash
# ✅ GOOD - In environment variable
STRIPE_WEBHOOK_SECRET=whsec_...

# ❌ BAD - Hard-coded
const secret = "whsec_abc123..."
```

### 4. Handle Idempotency

Stripe may send the same webhook multiple times. Handle it:

```javascript
// Check if already processed
const order = await getOrder(orderId);
if (order.paymentStatus === 'paid') {
  console.log('Already processed, skipping');
  return;
}

// Process...
```

### 5. Return 200 Quickly

```javascript
// ✅ GOOD
return NextResponse.json({ received: true });

// ❌ BAD - Don't make Stripe wait for slow operations
await sendEmailToEntireCustomerList(); // Too slow!
return NextResponse.json({ received: true });
```

Stripe expects a 200 response within seconds.

## Troubleshooting

### "Webhook signature verification failed"

**Causes:**
1. Wrong webhook secret
2. Body was parsed before verification (must use raw body)
3. Secret from different endpoint (test vs production)

**Solutions:**
- Verify `STRIPE_WEBHOOK_SECRET` matches dashboard
- Check raw body is being used
- Ensure using correct secret for environment

### "No signature header"

**Causes:**
- Request not from Stripe
- Local testing without Stripe CLI
- Missing `stripe-signature` header

**Solutions:**
- Use Stripe CLI for local testing
- Verify endpoint URL is correct
- Check Stripe Dashboard logs

### Order not updating

**Checks:**
1. Is webhook endpoint receiving requests? (check logs)
2. Is order ID in metadata?
3. Is Firestore connection working?
4. Are there permission errors?

**Debug:**
```javascript
console.log('Event type:', event.type);
console.log('Order ID:', event.data.object.metadata?.orderId);
console.log('Session ID:', event.data.object.id);
```

### Webhook timeout

**Problem:** Webhook takes too long, Stripe retries

**Solutions:**
- Keep webhook handler fast (< 5 seconds)
- Use background jobs for slow operations
- Return 200 immediately, process async

## Monitoring

### Check Webhook Logs in Stripe

1. Go to **Developers** → **Webhooks**
2. Click on your endpoint
3. View **Webhook attempts**
4. See success/failure status

### Check Your Application Logs

Look for:
```
✅ "Received Stripe event: checkout.session.completed"
✅ "Order ABC123 marked as paid"
✅ "Order confirmation email sent"

❌ "Webhook signature verification failed"
❌ "Order not found"
❌ "Error updating order"
```

### Set Up Alerts

Consider adding:
- Sentry for error tracking
- Email notifications for failed webhooks
- Slack integration for critical events

## Testing Checklist

Before going live:

- [ ] Webhook endpoint deployed and accessible
- [ ] STRIPE_SECRET_KEY configured
- [ ] STRIPE_WEBHOOK_SECRET configured
- [ ] Test mode webhooks working
- [ ] Production mode webhooks configured (different secret!)
- [ ] Signature verification working
- [ ] Order updates working
- [ ] Email confirmation sending
- [ ] Failed payment handling working
- [ ] Refund handling working
- [ ] Logs being recorded
- [ ] 200 response being returned quickly

## Production Deployment

When switching from test to production:

1. **Get production keys:**
   - Production Secret Key: `sk_live_...`
   - Create production webhook endpoint
   - Get production Webhook Secret: `whsec_...`

2. **Update environment variables:**
   ```bash
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

3. **Test in production:**
   - Make a small real payment
   - Verify webhook triggers
   - Confirm order updates
   - Check email sends

4. **Monitor closely:**
   - Watch webhook logs first week
   - Check for any failures
   - Verify all events handled correctly

## Advanced: Webhook Retry Logic

Stripe automatically retries failed webhooks:
- Immediately
- After 5 minutes
- After 30 minutes
- After 2 hours
- After 12 hours
- After 3 days

If all retries fail, you'll get an email.

**Best practice:** Implement idempotency to handle retries safely.

## Support

If webhooks aren't working:

1. Check Stripe Dashboard webhook logs
2. Check your application logs
3. Verify signature manually
4. Test with Stripe CLI
5. Contact Stripe Support if needed

---

## Next Steps

- [ ] Set up webhook endpoint
- [ ] Configure in Stripe Dashboard
- [ ] Test with Stripe CLI
- [ ] Deploy to production
- [ ] Monitor webhook logs
- [ ] Set up error alerts
