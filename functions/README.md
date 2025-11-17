# NerdbillyFab Cloud Functions

Backend functions for email notifications, webhooks, and automated tasks.

## Setup

1. **Install dependencies:**
   ```bash
   cd functions
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   firebase functions:config:set email.user="your-email@gmail.com"
   firebase functions:config:set email.password="your-app-password"
   firebase functions:config:set admin.email="admin@nerdbillyfab.com"
   ```

   For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833):
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use that password (not your regular Gmail password)

3. **Deploy functions:**
   ```bash
   firebase deploy --only functions
   ```

## Functions Overview

### Automated Email Triggers

1. **onOrderCreated**
   - Triggers when a new order is created
   - Sends order confirmation to customer
   - Sends notification to admin

2. **onReviewSubmitted**
   - Triggers when a customer submits a review
   - Sends approval request to admin

3. **onContactFormSubmitted**
   - Triggers when contact form is submitted
   - Sends message to admin
   - Sends auto-reply to customer

4. **onNewsletterSubscribe**
   - Triggers when someone subscribes to newsletter
   - Sends welcome email to subscriber
   - Notifies admin

### HTTP Functions

1. **stripeWebhook**
   - Handles Stripe payment webhooks
   - Verifies payment and updates order status
   - URL: `https://us-central1-{project-id}.cloudfunctions.net/stripeWebhook`

### Scheduled Functions

1. **sendAbandonedCartEmails** (Optional)
   - Runs every 24 hours
   - Sends reminder emails for abandoned carts

## Email Service Alternatives

Instead of Gmail, you can use:

### SendGrid (Recommended for production)
```bash
npm install @sendgrid/mail
```
```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(functions.config().sendgrid.key);
```

### Mailgun
```bash
npm install mailgun.js
```

### AWS SES
```bash
npm install @aws-sdk/client-ses
```

## Testing Locally

```bash
# Start emulators
firebase emulators:start

# Test functions
firebase functions:shell
```

## Monitoring

View logs:
```bash
firebase functions:log
```

Or in Firebase Console → Functions → Logs

## Security Notes

- Email credentials are stored in Firebase Functions config (encrypted)
- Never commit credentials to git
- Use App Passwords for Gmail (not your main password)
- For production, use a dedicated email service like SendGrid
- Set up proper error handling and retry logic for email delivery

## Cost Considerations

Firebase Cloud Functions pricing:
- Free tier: 2M invocations/month
- After free tier: $0.40 per million invocations

For high volume, consider:
- Batching notifications
- Using Cloud Tasks for rate limiting
- Dedicated email service with better rates

## Troubleshooting

**Emails not sending?**
- Check Firebase Functions logs
- Verify email credentials with `firebase functions:config:get`
- Check spam folder
- Verify Gmail App Password is correct

**Functions not deploying?**
- Check Node.js version (must be 18)
- Run `npm install` in functions directory
- Check Firebase billing is enabled (Functions require Blaze plan)

**Firestore triggers not firing?**
- Verify Firestore rules allow the write operation
- Check function is deployed: `firebase functions:list`
- View logs for errors: `firebase functions:log`
