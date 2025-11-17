# Production Setup Guide

Complete checklist for deploying NerdbillyFab to production.

## ✅ Status: What's Already Built

### Frontend Features (Complete)
- ✅ Privacy Policy & Terms of Service
- ✅ SEO (sitemap, robots.txt, schema markup)
- ✅ Customer reviews system
- ✅ Newsletter signup
- ✅ Contact form
- ✅ FAQ page with search
- ✅ Trust badges
- ✅ Google Analytics integration
- ✅ Error boundaries
- ✅ Security headers

### Backend Infrastructure (Ready to Deploy)
- ✅ Firebase Cloud Functions written
- ✅ Email notification system
- ✅ Firestore security rules
- ✅ Webhook handlers
- ✅ Input validation

---

## 🚀 Deployment Checklist

### 1. Firebase Firestore Security Rules

**Current Status:** Using permissive development rules
**Action Required:** Update to production rules

```bash
# Copy the production rules
cat FIRESTORE_RULES_UPDATED.txt

# Then:
# 1. Go to Firebase Console → Firestore Database → Rules
# 2. Paste the rules from FIRESTORE_RULES_UPDATED.txt
# 3. Click "Publish"
```

**Important:** Set admin custom claims for your admin user:
```javascript
// In Firebase Console → Functions, create a one-time function or use Firebase CLI:
const admin = require('firebase-admin');
admin.auth().setCustomUserClaims('YOUR_ADMIN_UID', { admin: true });
```

---

### 2. Firebase Cloud Functions

**Current Status:** Functions code ready, not deployed
**Action Required:** Deploy functions for email notifications

```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Go to functions directory
cd functions

# Install dependencies
npm install

# Configure email credentials
firebase functions:config:set \
  email.user="your-email@gmail.com" \
  email.password="your-gmail-app-password" \
  admin.email="admin@nerdbillyfab.com"

# Deploy functions
cd ..
firebase deploy --only functions
```

**Gmail App Password Setup:**
1. Go to Google Account → Security
2. Enable 2-Step Verification
3. Go to App Passwords
4. Generate password for "Mail"
5. Use that password (not your regular password)

**Alternative:** Use SendGrid (recommended for production)
- Better deliverability
- Higher sending limits
- Better analytics
- See `functions/README.md` for setup

**Cost:** Firebase Cloud Functions requires Blaze (pay-as-you-go) plan
- Free tier: 2M invocations/month (more than enough to start)
- After free tier: $0.40 per million invocations

---

### 3. Environment Variables

**Current Status:** `.env.example` created
**Action Required:** Create `.env.local` with real values

```bash
# Copy the example file
cp .env.example .env.local

# Edit with your actual values
nano .env.local
```

**Required Variables:**
```env
# Firebase (from Firebase Console → Project Settings)
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef

# Stripe (from Stripe Dashboard)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_real_key

# Google Analytics (from Google Analytics)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

### 4. Build and Deploy Website

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

**Verify deployment:**
- Visit your live URL
- Check all pages load
- Test form submissions
- Verify emails are sent

---

### 5. Test Email Notifications

After deploying Cloud Functions, test each trigger:

**Test Order Confirmation:**
1. Place a test order on your site
2. Check customer email for order confirmation
3. Check admin email for new order notification

**Test Review Submission:**
1. Submit a review on a product page
2. Check admin email for approval notification

**Test Contact Form:**
1. Submit contact form
2. Check admin email for message
3. Check customer email for auto-reply

**Test Newsletter:**
1. Sign up for newsletter
2. Check subscriber email for welcome message
3. Check admin email for new subscriber notification

**Check logs:**
```bash
firebase functions:log
```

---

### 6. Stripe Payment Configuration

**Current Status:** Single-product Stripe Payment Links working
**Known Limitation:** Multi-product cart needs full Stripe Checkout integration

**For full multi-product cart support:**

Option A: Use Stripe Checkout Sessions (recommended)
```bash
# Create server-side endpoint in Cloud Functions
# See: https://stripe.com/docs/payments/checkout
```

Option B: Use Stripe Elements with Payment Intents
```bash
# Requires more frontend work
# See: https://stripe.com/docs/payments/accept-a-payment
```

**Immediate workaround:** Customers can checkout one product at a time

---

### 7. Google Analytics Setup

1. Create GA4 property at analytics.google.com
2. Get Measurement ID (starts with G-)
3. Add to `.env.local` as `NEXT_PUBLIC_GA_MEASUREMENT_ID`
4. Deploy site
5. Verify tracking in Google Analytics Real-Time view

**Events tracked automatically:**
- Page views
- Button clicks
- Form submissions
- Scroll depth (via GA4 defaults)

---

### 8. SEO Final Steps

**Submit sitemap to Google:**
1. Go to Google Search Console
2. Add property for your domain
3. Submit sitemap: `https://yourdomain.com/sitemap.xml`

**Verify robots.txt:**
```
https://yourdomain.com/robots.txt
```

**Test rich snippets:**
1. Go to https://search.google.com/test/rich-results
2. Test product pages
3. Verify Product schema shows up

---

### 9. Security Checklist

- ✅ Firebase security rules updated
- ✅ HTTPS enabled (automatic with Firebase Hosting)
- ✅ Security headers configured
- ✅ Input validation on forms
- ✅ Email verification
- ⚠️ Consider adding reCAPTCHA to forms (prevents spam)
- ⚠️ Consider Firebase App Check (prevents API abuse)

**Optional: Add reCAPTCHA**
```bash
# Install reCAPTCHA
npm install react-google-recaptcha

# Add to contact form and review submissions
# Get keys from: https://www.google.com/recaptcha/admin
```

---

### 10. Monitoring & Maintenance

**Set up monitoring:**
1. Enable Firebase Performance Monitoring
2. Enable Firebase Crashlytics (for mobile apps)
3. Set up Google Analytics alerts
4. Monitor Cloud Functions logs

**Regular tasks:**
- Review and approve customer reviews (weekly)
- Respond to contact form messages (daily)
- Check order notifications are working (daily)
- Monitor analytics for issues (weekly)
- Update products and inventory (as needed)

**Health checks:**
```bash
# Check website is up
curl -I https://yourdomain.com

# Check Firebase Functions
firebase functions:log --limit 10

# Check Firestore operations
# Go to Firebase Console → Firestore → Usage
```

---

## 🎯 What Happens After Deployment

### Customer Experience

1. **Browsing:**
   - SEO-optimized pages appear in Google search
   - Fast loading with cached static assets
   - Mobile-responsive on all devices

2. **Shopping:**
   - Add products to cart
   - Apply coupon codes
   - See trust badges at checkout

3. **Checkout:**
   - Fill out shipping information
   - Redirect to Stripe for payment
   - Receive order confirmation email immediately

4. **Post-Purchase:**
   - Can submit product reviews (requires approval)
   - Can contact support via form (gets auto-reply)
   - Receives shipping notifications (when you update order status)

### Admin Experience

1. **Order Management:**
   - Receive email for every new order
   - Update order status in Firebase Console or admin panel
   - Customer automatically gets shipping notification

2. **Review Moderation:**
   - Receive email when review is submitted
   - Approve/reject in Firebase Console
   - Approved reviews appear on product pages

3. **Customer Support:**
   - Receive contact form messages via email
   - Respond directly to customer's email
   - View message history in Firestore

4. **Marketing:**
   - Growing newsletter subscriber list
   - Can export emails from Firestore
   - Send campaigns via email service

---

## 📊 Cost Estimate

**Monthly costs for moderate traffic (1000 visitors, 50 orders):**

| Service | Free Tier | Likely Cost |
|---------|-----------|-------------|
| Firebase Hosting | 10GB/month | $0 |
| Firestore | 50K reads/day | $0-5 |
| Cloud Functions | 2M invocations | $0-10 |
| Cloud Storage | 5GB | $0 |
| Stripe | Per transaction | 2.9% + $0.30 |
| **Total** | | **~$0-15/month** |

**As you scale (10K visitors, 500 orders):**
- Firebase: ~$50-100/month
- Stripe fees scale with revenue
- Consider SendGrid for email: $15-20/month

---

## 🚨 Common Issues & Solutions

### Emails Not Sending

**Problem:** Orders placed but no emails received

**Solutions:**
1. Check Cloud Functions are deployed: `firebase functions:list`
2. View logs: `firebase functions:log`
3. Verify email config: `firebase functions:config:get`
4. Check spam folder
5. Verify Gmail App Password is correct
6. Check Firebase billing is enabled (Blaze plan required)

### Firestore Permission Denied

**Problem:** "Missing or insufficient permissions" error

**Solutions:**
1. Check Firestore rules are published
2. Verify admin user has custom claims
3. Check browser console for exact error
4. Test with Firebase emulators locally

### Reviews Not Showing

**Problem:** Reviews submitted but not appearing

**Solution:**
1. Reviews require admin approval
2. Go to Firestore Console → reviews collection
3. Set `approved: true` on the review document

### Build Errors

**Problem:** `npm run build` fails

**Solutions:**
1. Delete node_modules and reinstall: `rm -rf node_modules && npm install`
2. Clear Next.js cache: `rm -rf .next`
3. Check for syntax errors in new files
4. Verify all environment variables are set

---

## 🎓 Next Steps (Optional Enhancements)

Once core features are working, consider:

1. **Customer Accounts**
   - User registration and login
   - Order history
   - Saved addresses
   - Wishlist

2. **Enhanced Admin Panel**
   - Review approval interface
   - Order management dashboard
   - Inventory tracking
   - Sales analytics

3. **Marketing Automation**
   - Abandoned cart recovery
   - Post-purchase follow-up emails
   - Birthday/anniversary discounts
   - Win-back campaigns for inactive customers

4. **Advanced Features**
   - Live chat support
   - Product recommendations
   - Multi-currency support
   - International shipping
   - Subscription products

5. **Performance Optimization**
   - Image CDN (Cloudinary, Imgix)
   - Server-side rendering for dynamic content
   - Redis caching for product data
   - Progressive Web App (PWA)

---

## 📞 Support Resources

- **Firebase Docs:** https://firebase.google.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Stripe Docs:** https://stripe.com/docs
- **Firebase Support:** https://firebase.google.com/support

**Your Implementation:**
- Frontend code: Committed and pushed ✅
- Backend functions: Ready to deploy ✅
- Security rules: Ready to apply ✅
- Documentation: Complete ✅

---

**You're ready to launch! 🚀**

Start with step 1 (Firestore rules) and work your way down. Each step is independent, so you can deploy incrementally.
