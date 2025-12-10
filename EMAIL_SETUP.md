# Email Notifications Setup Guide

This guide will help you set up automated email notifications for your NerdbillyFab store using Firebase.

## Overview

The email system is already integrated into the codebase and will automatically send emails when:

- ✅ **Order Confirmation** - When a customer completes payment
- ✅ **Order Shipped** - When you add tracking information to an order
- ✅ **Order Delivered** - When you mark an order as delivered

## Setup Options

You have two options for sending emails with Firebase:

### Option 1: Firebase Trigger Email Extension (Recommended)

The easiest Firebase-native solution. No code required.

### Option 2: Cloud Functions with Custom Email Provider

More control but requires additional setup and coding.

---

## Option 1: Firebase Trigger Email Extension (Recommended)

### Step 1: Install the Extension

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click **Extensions** in the left sidebar
4. Click **Explore Extensions** or **Install Extension**
5. Search for **"Trigger Email"** or **"Trigger Email from Firestore"**
6. Click **Install**

### Step 2: Configure the Extension

During installation, you'll be prompted to configure:

#### **1. Cloud Firestore collection path**
```
mail
```
This is the collection where email documents will be written.

#### **2. Email documents collection for failures** (optional)
```
mail_failures
```
This stores failed email attempts for debugging.

#### **3. SMTP connection URI**

Choose your email provider and enter the SMTP URI:

**For Gmail:**
```
smtps://your-email@gmail.com:your-app-password@smtp.gmail.com:465
```

**For SendGrid:**
```
smtps://apikey:YOUR_SENDGRID_API_KEY@smtp.sendgrid.net:465
```

**For Mailgun:**
```
smtps://postmaster@your-domain.mailgun.org:your-password@smtp.mailgun.org:465
```

**For AWS SES:**
```
smtps://your-smtp-username:your-smtp-password@email-smtp.us-east-1.amazonaws.com:465
```

#### **4. Email from address**
```
orders@nerdbillyfab.com
```
This should match your domain or verified email address.

#### **5. Reply-to address** (optional)
```
support@nerdbillyfab.com
```

### Step 3: Set Up Email Provider

#### Using Gmail (Quick Testing)

1. Enable 2-factor authentication on your Google account
2. Go to: https://myaccount.google.com/apppasswords
3. Generate an **App Password** for "Mail"
4. Use this app password in your SMTP URI (not your regular password)

⚠️ **Warning:** Gmail has sending limits (500 emails/day). Only use for testing.

#### Using SendGrid (Recommended for Production)

1. Sign up at [SendGrid](https://sendgrid.com/)
2. Free tier: 100 emails/day
3. Create an API key:
   - Dashboard → Settings → API Keys
   - Create API Key with "Full Access"
4. Verify your sender email or domain:
   - Settings → Sender Authentication
   - Verify Single Sender OR Authenticate Your Domain
5. Use the API key in your SMTP URI

#### Using Mailgun

1. Sign up at [Mailgun](https://www.mailgun.com/)
2. Free tier: 100 emails/day for 3 months
3. Add and verify your domain
4. Get SMTP credentials from Dashboard → Sending → Domain Settings
5. Use credentials in SMTP URI

### Step 4: Update Email Addresses in Code

Update the email addresses in `/lib/emails.js`:

```javascript
from: 'orders@nerdbillyfab.com',  // Your verified sender email
replyTo: 'support@nerdbillyfab.com',  // Your support email
```

And update the domain in the tracking URL:
```javascript
trackOrderUrl: `https://nerdbillyfab.com/track-order`,  // Your actual domain
```

### Step 5: Test the Email System

1. Make a test order through your store
2. Complete the payment process
3. Check your email inbox for the order confirmation
4. Check Firebase Console → Firestore → `mail` collection to see the email document
5. Check Firebase Console → Extensions → Trigger Email → Logs for delivery status

---

## Option 2: Cloud Functions with Custom Email Provider

If you prefer more control over the email sending process:

### Step 1: Initialize Cloud Functions

```bash
npm install -g firebase-tools
firebase init functions
```

### Step 2: Install Email Provider SDK

Choose your provider and install:

```bash
# For SendGrid
cd functions
npm install @sendgrid/mail

# For Resend
npm install resend

# For Nodemailer (any SMTP)
npm install nodemailer
```

### Step 3: Create Email Cloud Function

Create `functions/src/emails.js`:

```javascript
const functions = require('firebase-functions')
const sgMail = require('@sendgrid/mail')  // or your chosen provider

sgMail.setApiKey(functions.config().sendgrid.key)

exports.sendOrderEmail = functions.firestore
  .document('mail/{mailId}')
  .onCreate(async (snap, context) => {
    const mailData = snap.data()

    const msg = {
      to: mailData.to,
      from: mailData.from,
      subject: mailData.message.subject,
      html: mailData.message.html,
      text: mailData.message.text,
    }

    try {
      await sgMail.send(msg)
      console.log('Email sent to:', mailData.to)

      // Mark as delivered
      await snap.ref.update({ delivery: { state: 'SUCCESS', endTime: new Date() } })
    } catch (error) {
      console.error('Email error:', error)
      await snap.ref.update({ delivery: { state: 'ERROR', error: error.message } })
    }
  })
```

### Step 4: Deploy Functions

```bash
firebase deploy --only functions
```

---

## Firestore Security Rules

Add rules to protect the `mail` collection:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // ... your existing rules ...

    // Mail collection - only server/functions can write
    match /mail/{mailId} {
      allow read: if false;  // No client reads
      allow write: if request.auth != null;  // Only authenticated users (admin)
    }
  }
}
```

---

## Email Templates

The email templates are located in `/lib/emails.js`. Each template includes:

### Order Confirmation Email
- Professional HTML email with dark theme
- Order number prominently displayed
- Order items with pricing
- Shipping address
- "Track Order" button
- Plain text fallback

### Shipping Notification Email
- Tracking number with carrier information
- Direct link to carrier tracking
- Order items being shipped
- Shipping address
- Plain text fallback

### Delivered Notification Email
- Delivery confirmation
- Thank you message
- Encouragement to share project photos
- Plain text fallback

All templates use your brand colors (red #dc2626 for NerdbillyFab) and match the dark theme of your website.

---

## Customizing Email Templates

To customize the email templates, edit `/lib/emails.js`:

```javascript
// HTML template function
function generateOrderConfirmationHTML(order) {
  return `
    <!DOCTYPE html>
    <html>
    <!-- Customize your HTML email here -->
    </html>
  `
}

// Plain text template function
function generateOrderConfirmationText(order) {
  return `
    Your plain text email content here...
  `
}
```

---

## Troubleshooting

### Emails Not Sending

1. **Check Firestore `mail` collection:**
   - Firebase Console → Firestore Database → `mail`
   - Documents should appear here when emails are triggered
   - Check for `delivery.state` field: `SUCCESS`, `ERROR`, or `PENDING`

2. **Check Extension Logs:**
   - Firebase Console → Extensions → Trigger Email → Logs
   - Look for error messages

3. **Verify SMTP Credentials:**
   - Test your SMTP URI with a tool like [SMTP Tester](https://www.smtper.net/)
   - Ensure your password/API key is correct

4. **Check Email Provider Limits:**
   - Gmail: 500/day limit
   - SendGrid Free: 100/day limit
   - Verify you haven't hit your limit

### Emails Going to Spam

1. **Set up SPF and DKIM records:**
   - Required for production use
   - Configure through your email provider's documentation

2. **Verify Sender Domain:**
   - Use a verified domain email (not @gmail.com)
   - SendGrid and Mailgun provide domain verification

3. **Test with Mail Tester:**
   - https://www.mail-tester.com/
   - Scores your email deliverability

### Email Formatting Issues

1. **Test in multiple email clients:**
   - Gmail, Outlook, Apple Mail, etc.
   - Use [Litmus](https://litmus.com/) or [Email on Acid](https://www.emailonacid.com/) for comprehensive testing

2. **Ensure plain text fallback:**
   - Every email has both HTML and plain text versions
   - Located in `/lib/emails.js`

---

## Testing Email Flow

### Test 1: Order Confirmation Email

1. Create a test order as a customer
2. Complete the payment process
3. Check your email for order confirmation
4. Verify all details are correct:
   - Order number
   - Items and pricing
   - Shipping address
   - "Track Order" link works

### Test 2: Shipping Notification Email

1. Go to Admin → Orders
2. Select a test order
3. Click "Add Tracking"
4. Enter tracking number and carrier
5. Check email for shipping notification
6. Verify:
   - Tracking number is correct
   - Carrier link works
   - Order details are accurate

### Test 3: Delivered Notification Email

1. Go to Admin → Orders
2. Change order status to "Delivered"
3. Check email for delivery confirmation
4. Verify message displays correctly

---

## Production Checklist

Before going live with email notifications:

- [ ] Email provider configured and verified
- [ ] Sender email/domain verified with provider
- [ ] SPF and DKIM records configured
- [ ] Email addresses updated in `/lib/emails.js`
- [ ] Test all three email types (confirmation, shipped, delivered)
- [ ] Check emails in multiple clients (Gmail, Outlook, etc.)
- [ ] Verify "Track Order" links use production domain
- [ ] Set up email delivery monitoring
- [ ] Configure email sending limits for your plan
- [ ] Test unsubscribe functionality (if required)

---

## Monitoring Email Delivery

### Via Firebase Console

1. Firestore `mail` collection:
   - Documents with `delivery.state: 'SUCCESS'` were delivered
   - Documents with `delivery.state: 'ERROR'` failed
   - Check `delivery.error` for error details

2. Extension Logs:
   - Firebase Console → Extensions → Trigger Email → View in Logs Explorer
   - Filter by severity: Error, Warning

### Via Email Provider Dashboard

- **SendGrid:** Dashboard → Activity → Email Activity
- **Mailgun:** Dashboard → Logs
- **Gmail:** Check Sent folder

---

## Cost Estimates

### Firebase Trigger Email Extension
- **Extension:** Free
- **Firestore Writes:** ~$0.06 per 50,000 writes
- **Cloud Functions:** Included in Blaze (pay-as-you-go) plan

### Email Providers
- **Gmail:** Free (500/day limit) - Testing only
- **SendGrid:**
  - Free: 100 emails/day forever
  - Essentials: $19.95/mo for 50,000 emails
- **Mailgun:**
  - Free trial: 100 emails/day for 3 months
  - Foundation: $35/mo for 50,000 emails
- **AWS SES:** $0.10 per 1,000 emails (very cheap at scale)

---

## Support

For issues or questions:

1. Check Firebase Extension logs
2. Review email provider documentation
3. Test SMTP connection independently
4. Check Firestore security rules
5. Verify email templates in `/lib/emails.js`

Need help? Contact: your-email@example.com

---

## Next Steps (Phase 3 - Future Enhancements)

- [ ] Customer accounts with order history
- [ ] PDF receipt generation
- [ ] "Printing started" notification email
- [ ] SMS notifications via Twilio
- [ ] Email unsubscribe management
- [ ] Newsletter integration
- [ ] Automated review request emails
