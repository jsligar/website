# Firebase Deployment Guide - NerdbillyFab Website

Complete instructions for deploying the NerdbillyFab e-commerce website to Firebase Hosting with admin dashboard.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Admin Dashboard Setup](#admin-dashboard-setup)
- [Deployment Workflow](#deployment-workflow)
- [Custom Domain Setup](#custom-domain-setup)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before starting, ensure you have:

1. **Node.js v18 or higher** – verify with `node --version`
2. **Firebase CLI** – install via `npm install -g firebase-tools`
3. **Firebase Account** – register at [firebase.google.com](https://firebase.google.com) and create a new project
4. **Domain** (optional) – for custom domain setup (e.g., nerdbillyfab.com)

---

## Initial Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Name it `nerdbillyfab` (or your preference)
4. Optionally disable Google Analytics (not needed for static hosting)
5. Enable these services:
   - **Firebase Hosting**: Click "Get started" under Hosting

### 2. Install Firebase CLI

If not already installed:

```bash
npm install -g firebase-tools
```

### 3. Login to Firebase

```bash
firebase login
```

This will open a browser for authentication.

### 4. Initialize Firebase in Your Project

From your website directory (`/home/user/website`):

```bash
firebase init
```

**Select these options:**
- **What do you want to use?** → Select **Hosting** (use spacebar to select)
- **Use an existing project** → Select your `nerdbillyfab` project
- **What do you want to use as your public directory?** → Enter `.next` (Next.js build output)
- **Configure as a single-page app?** → **No** (Next.js handles routing)
- **Set up automatic builds with GitHub?** → **No** (manual deployment for now)
- **File .next/index.html already exists. Overwrite?** → **No**

This creates:
- `firebase.json` - Firebase configuration
- `.firebaserc` - Project aliases

### 5. Update Firebase Configuration

Edit `firebase.json` to use Next.js properly:

```json
{
  "hosting": {
    "public": ".next",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp|js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

---

## Admin Dashboard Setup

Your website includes a complete admin dashboard for managing products. Follow these steps to enable it.

### 1. Enable Firebase Services

In the [Firebase Console](https://console.firebase.google.com/), enable these services for your project:

#### Authentication
1. Go to **Build → Authentication**
2. Click **"Get Started"**
3. Enable **"Email/Password"** sign-in provider
4. Click **"Save"**

#### Firestore Database
1. Go to **Build → Firestore Database**
2. Click **"Create database"**
3. Select **"Start in production mode"** (we'll add rules next)
4. Choose a location (e.g., `us-central1`)
5. Click **"Enable"**

#### Storage
1. Go to **Build → Storage**
2. Click **"Get Started"**
3. Select **"Start in production mode"**
4. Use the same location as Firestore
5. Click **"Done"**

### 2. Configure Firebase Security Rules

#### Firestore Rules

Go to **Firestore Database → Rules** and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

Click **"Publish"**

#### Storage Rules

Go to **Storage → Rules** and paste:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Click **"Publish"**

### 3. Get Firebase Configuration

1. Go to **Project Settings** (gear icon) → **General**
2. Scroll to **"Your apps"**
3. Click **"Web"** (</> icon)
4. Register app name: `NerdbillyFab`
5. Copy the `firebaseConfig` values

### 4. Create Environment Variables

Create `.env.local` file in your project root:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Firebase values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=nerdbillyfab.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=nerdbillyfab
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=nerdbillyfab.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 5. Create Admin User

Using Firebase CLI:

```bash
firebase auth:create --email admin@nerdbillyfab.com --password YourSecurePassword123
```

Or via Firebase Console:
1. Go to **Authentication → Users**
2. Click **"Add user"**
3. Enter email and password
4. Click **"Add user"**

### 6. Test Admin Access

Start development server:

```bash
npm run dev
```

Visit `http://localhost:3000/admin/login` and log in with your admin credentials.

### 7. Migrate Products to Firestore

1. After logging in, go to the Dashboard
2. Click **"Manage Products"**
3. You'll see a migration prompt
4. Click **"Migrate X Products"** to copy your products to Firestore
5. Do this only once

**Note**: See `ADMIN_GUIDE.md` for detailed admin panel documentation.

---

## Deployment Workflow

### Quick Deploy (Recommended)

Deploy everything with one command:

```bash
npm run deploy
```

This automatically:
1. Syncs products from Firestore to code
2. Builds the Next.js static site
3. Deploys to Firebase Hosting

**Use this after editing products in the admin panel!**

### Manual Deployment (Step by Step)

If you prefer manual control:

#### Step 1: Install Dependencies

```bash
npm install
```

#### Step 2: Sync Products from Firestore (if using admin panel)

```bash
npm run sync-products
```

This updates `data/products.js` with your latest Firestore data.

**Skip this step if you haven't edited products in the admin panel.**

#### Step 3: Build the Website

```bash
npm run build
```

This creates an optimized production build in `out/` directory.

**Expected output:**
```
✓ Compiled successfully
✓ Generating static pages (18/18)
```

#### Step 4: Test Build Locally (Optional)

```bash
npx serve out
```

Visit `http://localhost:3000` to verify the production build works.

#### Step 5: Deploy to Firebase

```bash
firebase deploy --only hosting
```

**Expected output:**
```
✔  Deploy complete!

Hosting URL: https://nerdbillyfab.web.app
```

### Step 5: Verify Deployment

1. Visit your hosting URL: `https://your-project-id.web.app`
2. Test all pages:
   - Homepage: `/`
   - Shop: `/shop`
   - Product pages: `/products/peg-perego-front-rear-wheel-kit`
   - Cart: `/cart`
   - About: `/about`

---

## Quick Deployment Commands

After initial setup, deploying updates is simple:

```bash
# Build and deploy in one go
npm run build && firebase deploy --only hosting
```

Or create a deployment script:

```bash
# Add to package.json scripts:
"deploy": "npm run build && firebase deploy --only hosting"
```

Then just run:

```bash
npm run deploy
```

---

## Custom Domain Setup

### Option 1: Use Firebase Domain

Your site is automatically available at:
- `https://your-project-id.web.app`
- `https://your-project-id.firebaseapp.com`

### Option 2: Add Custom Domain (e.g., nerdbillyfab.com)

1. Go to Firebase Console → Hosting
2. Click **"Add custom domain"**
3. Enter your domain: `nerdbillyfab.com`
4. Follow verification steps:
   - Add TXT record to your domain DNS
   - Add A records pointing to Firebase IPs
5. Firebase automatically provisions SSL certificate
6. Wait 24-48 hours for DNS propagation

**DNS Records (example):**
```
Type: A
Name: @
Value: 151.101.1.195

Type: A
Name: @
Value: 151.101.65.195

Type: A
Name: www
Value: 151.101.1.195
```

Firebase will provide exact IPs during setup.

---

## Environment Variables

For production environment variables (Stripe keys, etc.):

### 1. Create `.env.local` (local development)

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

### 2. For Firebase Hosting

Firebase Hosting doesn't support server-side environment variables for static sites. You have two options:

**Option A: Client-side public variables**
- Prefix with `NEXT_PUBLIC_`
- These are bundled into the build
- Rebuild and redeploy to update

**Option B: Add Firebase Functions (future)**
- Set up Cloud Functions for server-side logic
- Use `firebase functions:config:set` for secrets
- Keep Stripe secret keys server-side

---

## Monitoring and Updates

### View Deployment History

```bash
firebase hosting:channel:list
```

### Roll Back to Previous Version

In Firebase Console → Hosting → View history → Click "Rollback"

### View Logs

```bash
firebase hosting:channel:open
```

---

## Troubleshooting

### Build Fails

**Problem:** `npm run build` fails

**Solution:**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### 404 Errors on Routes

**Problem:** Direct navigation to `/shop` returns 404

**Solution:** Verify `firebase.json` rewrites are set correctly (see Step 5 above)

### Images Not Loading

**Problem:** Product images show broken

**Solution:**
1. Ensure images are in `public/images/products/`
2. Rebuild: `npm run build`
3. Redeploy: `firebase deploy --only hosting`

### Deployment Permissions Error

**Problem:** `Permission denied` during deploy

**Solution:**
```bash
firebase login --reauth
firebase use --add
```

---

## Next Steps After Deployment

1. **Add Product Images**
   - Upload to `public/images/products/`
   - Rebuild and redeploy

2. **Set Up Stripe Payments**
   - Get Stripe API keys
   - Add to environment variables
   - Implement checkout flow

3. **Add Analytics** (optional)
   ```bash
   firebase init analytics
   ```

4. **Set Up Functions** (for order processing)
   ```bash
   firebase init functions
   ```

5. **Configure Firestore** (for order storage)
   ```bash
   firebase init firestore
   ```

---

## Cost Estimate

Firebase Hosting - **Free Tier Includes:**
- 10 GB storage
- 360 MB/day transfer
- Free SSL certificate
- Custom domain

**Typical Monthly Cost for NerdbillyFab:**
- Under 1000 visitors/month: **$0** (free tier)
- 1000-10000 visitors: **$0-5/month**
- 10000+ visitors: **$5-25/month**

---

## Useful Commands Reference

```bash
# Login/Setup
firebase login
firebase init hosting
firebase use --add

# Build & Deploy
npm run build
firebase deploy --only hosting

# Testing
npm run dev              # Local development
npm start                # Test production build
firebase serve           # Test with Firebase locally

# Management
firebase hosting:channel:list     # View deployments
firebase hosting:channel:delete   # Delete preview
firebase projects:list            # List all projects

# Debugging
firebase hosting:channel:open     # Open hosting dashboard
npm run build -- --debug          # Verbose build output
```

---

## Support

- **Firebase Documentation:** https://firebase.google.com/docs/hosting
- **Next.js on Firebase:** https://firebase.google.com/docs/hosting/nextjs
- **Firebase Console:** https://console.firebase.google.com

---

**Ready to deploy?** Run: `npm run build && firebase deploy --only hosting` 🚀
