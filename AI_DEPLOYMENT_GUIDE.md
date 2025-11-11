# AI Deployment Guide - Firebase Hosting for NerdbillyFab

This guide is designed for AI assistants to follow step-by-step to deploy the NerdbillyFab website to Firebase Hosting.

## Prerequisites Checklist

Before starting deployment, verify these are installed and configured:

- [ ] Node.js v18 or higher (`node --version`)
- [ ] npm (`npm --version`)
- [ ] Firebase CLI (`firebase --version`)
- [ ] Git (for version control)

## Step 1: Install Firebase CLI

If Firebase CLI is not installed:

```bash
npm install -g firebase-tools
```

Verify installation:

```bash
firebase --version
# Should show version 13.x.x or higher
```

## Step 2: Login to Firebase

```bash
firebase login
```

This will:
1. Open a browser window
2. Ask you to sign in with Google account
3. Authorize Firebase CLI

If in a headless environment:

```bash
firebase login --no-localhost
```

Then follow the URL provided.

## Step 3: Project Setup (First Time Only)

### 3a. Check if Firebase is Already Initialized

Look for these files in the project root:
- `firebase.json` ✅ (Already exists)
- `.firebaserc` ❌ (You need to create this)

### 3b. Create .firebaserc File

Copy the example file:

```bash
cp .firebaserc.example .firebaserc
```

Edit `.firebaserc` and replace `your-project-id` with your actual Firebase project ID:

```json
{
  "projects": {
    "default": "your-actual-firebase-project-id"
  }
}
```

**Finding your Firebase Project ID:**
1. Go to https://console.firebase.google.com/
2. Select your project
3. Click the gear icon (⚙️) → Project Settings
4. Copy the "Project ID" (NOT the project name)

### 3c. If You Don't Have a Firebase Project Yet

Create one:

```bash
firebase projects:create nerdbillyfab --display-name "NerdbillyFab"
```

Or create via web console:
1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Name it "NerdbillyFab"
4. Follow the wizard

## Step 4: Enable Firebase Services

Your project needs these services enabled:

### Via Firebase Console:

1. **Hosting** (required for deployment):
   - Go to Build → Hosting
   - Click "Get started"
   - Follow the wizard (ignore commands, we have config already)

2. **Authentication** (for admin panel):
   - Go to Build → Authentication
   - Click "Get started"
   - Enable "Email/Password" provider

3. **Firestore Database** (for products/orders):
   - Go to Build → Firestore Database
   - Click "Create database"
   - Start in production mode
   - Choose location (e.g., us-central1)

4. **Storage** (for product images):
   - Go to Build → Storage
   - Click "Get started"
   - Start in production mode

### Via CLI (Alternative):

```bash
# Enable Hosting
firebase init hosting

# Choose:
# - Use existing project
# - Select your project
# - Public directory: out
# - Single page app: No
# - Set up automatic builds: No
```

## Step 5: Configure Environment Variables

### 5a. Get Firebase Web App Config

1. Go to Firebase Console → Project Settings
2. Scroll to "Your apps"
3. Click Web icon (</>)
4. Register app: "NerdbillyFab Web"
5. Copy the `firebaseConfig` object

### 5b. Create .env.local File

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your actual values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123def456
```

**IMPORTANT:** Never commit `.env.local` to git (it's in `.gitignore`)

## Step 6: Install Dependencies

```bash
npm install
```

This installs all required packages including:
- Next.js
- React
- Firebase SDK
- Tailwind CSS
- Stripe (for future use)

## Step 7: Build the Website

### 7a. Sync Products from Firestore (if applicable)

If you've added products via admin panel:

```bash
npm run sync-products
```

**Skip this if:**
- You haven't set up Firebase yet
- You haven't added products to Firestore
- This is your first deployment

### 7b. Build Static Site

```bash
npm run build
```

**Expected output:**
```
✓ Compiled successfully
✓ Generating static pages (18/18)
✓ Finalizing page optimization
```

**Build creates:**
- `/out` directory with static HTML/CSS/JS
- All pages pre-rendered
- All assets optimized

### Common Build Errors:

**Error: "generateStaticParams is required"**
- Already fixed in current code
- If you see this, pull latest changes

**Error: "Module not found"**
- Run `npm install` again
- Delete `node_modules` and `.next`, then reinstall

**Error: Firebase not configured**
- Check `.env.local` exists and has correct values
- Sync-products will skip if Firebase not configured (this is OK)

## Step 8: Test Build Locally (Optional)

```bash
npx serve out
```

Visit http://localhost:3000 to verify the build works.

Press Ctrl+C to stop the server.

## Step 9: Deploy to Firebase

### Quick Deploy (Recommended):

```bash
npm run deploy
```

This runs:
1. `npm run sync-products` (syncs Firestore → code)
2. `npm run build` (builds static site)
3. `firebase deploy --only hosting` (uploads to Firebase)

### Manual Deploy:

```bash
firebase deploy --only hosting
```

### Expected Output:

```
=== Deploying to 'your-project-id'...

i  deploying hosting
i  hosting[your-project-id]: beginning deploy...
i  hosting[your-project-id]: found X files in out
✔  hosting[your-project-id]: file upload complete
i  hosting[your-project-id]: finalizing version...
✔  hosting[your-project-id]: version finalized
i  hosting[your-project-id]: releasing new version...
✔  hosting[your-project-id]: release complete

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/your-project-id/overview
Hosting URL: https://your-project-id.web.app
```

## Step 10: Verify Deployment

1. **Visit your site:**
   - https://your-project-id.web.app
   - https://your-project-id.firebaseapp.com

2. **Check these pages:**
   - Homepage: `/`
   - Shop: `/shop`
   - Product page: `/products/peg-perego-front-rear-wheel-kit`
   - Admin login: `/admin/login`
   - Cart: `/cart`

3. **Test functionality:**
   - Add product to cart
   - Navigate between pages
   - Check images load

## Troubleshooting Common Issues

### Issue: "Firebase command not found"

**Solution:**
```bash
npm install -g firebase-tools
# Or
npx firebase-tools --version
```

### Issue: "Project not found"

**Solution:**
- Check `.firebaserc` has correct project ID
- Run `firebase projects:list` to see available projects
- Make sure you're logged in: `firebase login`

### Issue: "Permission denied"

**Solution:**
- Verify you're logged into correct Google account
- Check you have Owner/Editor role on Firebase project
- Try `firebase login --reauth`

### Issue: "Build failed"

**Solution:**
```bash
# Clean everything
rm -rf node_modules .next out
npm install
npm run build
```

### Issue: "Deployment hangs or fails"

**Solution:**
```bash
# Check Firebase status
firebase status

# Use specific hosting target
firebase deploy --only hosting --debug
```

### Issue: "Site shows old content"

**Solution:**
- Firebase CDN caching (wait 5-10 minutes)
- Hard refresh browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Try incognito mode

### Issue: "404 on page refresh"

**Solution:**
- Already fixed in `firebase.json` with rewrites
- If still happens, check `firebase.json` has:
```json
{
  "hosting": {
    "public": "out",
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### Issue: "Images not loading"

**Solution:**
- Check image paths are absolute (start with `/`)
- Verify images are in `/public` folder
- Check `next.config.js` has `images: { unoptimized: true }`

### Issue: "Environment variables not working"

**Solution:**
- `.env.local` is for local dev only
- Firebase Hosting doesn't support server-side env vars (static site)
- All Firebase config must use `NEXT_PUBLIC_` prefix
- Rebuild after changing env vars: `npm run build`

## Post-Deployment Setup

### 1. Set Up Custom Domain (Optional)

```bash
firebase hosting:channel:deploy production --expires 30d
```

Or via console:
1. Go to Hosting → Add custom domain
2. Follow DNS configuration steps

### 2. Create Admin User

```bash
firebase auth:create --email admin@nerdbillyfab.com --password YourSecurePassword123
```

Or via Firebase Console:
1. Go to Authentication → Users
2. Click "Add user"
3. Enter email and password

### 3. Configure Firestore Security Rules

In Firebase Console → Firestore → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    match /orders/{orderId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    match /customers/{customerId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

Click "Publish"

### 4. Configure Storage Security Rules

In Firebase Console → Storage → Rules:

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

Click "Publish"

## Deployment Workflow (After First Deploy)

Every time you need to deploy updates:

### If you edited code only:

```bash
npm run build
firebase deploy --only hosting
```

### If you edited products in admin panel:

```bash
npm run deploy
```

This syncs products from Firestore before building.

### Quick commands:

```bash
# Full deploy with sync
npm run deploy

# Just hosting (no sync)
npm run build && firebase deploy --only hosting

# Deploy to preview channel
firebase hosting:channel:deploy preview

# View deployment history
firebase hosting:channel:list
```

## File Structure Reference

```
/home/user/website/
├── .env.local              # Your Firebase config (DO NOT COMMIT)
├── .env.local.example      # Template for env vars
├── .firebaserc            # Firebase project config (create from example)
├── .firebaserc.example    # Template
├── firebase.json          # Firebase hosting config (already configured)
├── next.config.js         # Next.js config (static export enabled)
├── package.json           # Dependencies and scripts
├── /out                   # Build output (created by npm run build)
├── /app                   # Next.js pages
├── /components            # React components
├── /lib                   # Utility functions (Firebase, orders)
├── /data                  # Static data (products.js)
└── /public                # Static assets (images, etc.)
```

## Key Commands Summary

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run build` | Build static site |
| `npm run sync-products` | Sync Firestore → code |
| `npm run deploy` | Sync + build + deploy |
| `firebase login` | Authenticate Firebase CLI |
| `firebase projects:list` | List your Firebase projects |
| `firebase deploy --only hosting` | Deploy to hosting |
| `firebase hosting:channel:deploy preview` | Deploy to preview channel |

## Success Checklist

After deployment, verify:

- [ ] Site loads at Firebase URL
- [ ] Homepage displays correctly
- [ ] Shop page shows products
- [ ] Product pages load
- [ ] Admin login page accessible
- [ ] Cart functionality works
- [ ] Images load (or placeholders show)
- [ ] Navigation works
- [ ] No console errors

## Getting Help

If deployment still fails:

1. **Check Firebase Status**: https://status.firebase.google.com/
2. **View logs**: `firebase deploy --debug`
3. **Check build output**: Look for errors in `npm run build`
4. **Verify project**: `firebase projects:list`
5. **Check permissions**: Firebase Console → IAM & Admin

## Quick Troubleshooting Decision Tree

```
Deployment fails?
├── Build fails?
│   ├── Missing dependencies? → npm install
│   ├── Syntax errors? → Check error message, fix code
│   └── Firebase config? → Check .env.local
├── Deploy command fails?
│   ├── Not logged in? → firebase login
│   ├── Wrong project? → Check .firebaserc
│   └── Permission denied? → Check Firebase Console permissions
└── Site deployed but broken?
    ├── 404 errors? → Check firebase.json rewrites
    ├── Blank page? → Check browser console for errors
    └── Old content? → Clear cache, wait for CDN
```

## Notes for AI Assistants

- Always verify each step completes successfully before proceeding
- If a command fails, read the error message carefully
- Check file paths are correct (no typos)
- Verify project ID matches in multiple places (.firebaserc, env vars)
- Don't skip the build step - deploy only works if build succeeds
- Remember: This is a static site - server-side features won't work in production without Firebase Functions

## Emergency Rollback

If deployment breaks the site:

```bash
# View recent deployments
firebase hosting:channel:list

# Rollback to previous version
firebase hosting:rollback

# Or deploy a specific older version from hosting console
```

---

**Last Updated:** Based on commit `297d3ed` - "Complete order management system with checkout and inventory"

**Project:** NerdbillyFab E-commerce Website
**Stack:** Next.js 16 (Static Export), Firebase Hosting, Firestore, Authentication, Storage
**Branch:** `claude/nerdbillyfab-website-011CUvXhAr6Vf4UVALeWg4ET`
