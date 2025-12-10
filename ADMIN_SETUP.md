# Admin User Setup Guide

This guide explains how to set up admin privileges for users in your NerdbillyFab Firebase project.

## Overview

The application uses Firebase Custom Claims to identify admin users. This is more secure than just checking if a user is authenticated, as it prevents any logged-in user from accessing admin features.

## Quick Start

You have 3 options to set admin claims:

1. **Firebase Console** (Easiest for first admin)
2. **Node.js Script** (Best for batch operations)
3. **Cloud Function** (Most secure, requires setup)

---

## Option 1: Firebase Console + Service Account (Recommended for First Admin)

### Step 1: Create a Service Account

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon → **Project Settings**
4. Go to **Service Accounts** tab
5. Click **Generate New Private Key**
6. Save the JSON file securely (NEVER commit to Git!)

### Step 2: Create Setup Script

Create a file `scripts/set-admin.js`:

```javascript
const admin = require('firebase-admin');
const serviceAccount = require('./path-to-your-service-account.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Set the admin claim
async function setAdminClaim(email) {
  try {
    // Get user by email
    const user = await admin.auth().getUserByEmail(email);

    // Set custom claim
    await admin.auth().setCustomUserClaims(user.uid, {
      admin: true
    });

    console.log(`✅ Admin claim set for ${email}`);
    console.log(`User must sign out and sign in again for changes to take effect.`);

    process.exit(0);
  } catch (error) {
    console.error('Error setting admin claim:', error);
    process.exit(1);
  }
}

// Get email from command line argument
const email = process.argv[2];

if (!email) {
  console.error('Usage: node set-admin.js <email>');
  process.exit(1);
}

setAdminClaim(email);
```

### Step 3: Install Dependencies

```bash
npm install firebase-admin
```

### Step 4: Run the Script

```bash
node scripts/set-admin.js your-admin-email@example.com
```

### Step 5: Sign Out and Back In

The user must:
1. Sign out of the application
2. Sign back in
3. Custom claims will now be active

---

## Option 2: Firebase CLI Extension

### Step 1: Install Firebase Tools

```bash
npm install -g firebase-tools
firebase login
```

### Step 2: Initialize Firebase Functions

```bash
firebase init functions
```

Select:
- JavaScript or TypeScript
- Install dependencies

### Step 3: Create Admin Function

In `functions/index.js`:

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Callable function to promote user to admin
// Only existing admins can call this
exports.promoteToAdmin = functions.https.onCall(async (data, context) => {
  // Check if caller is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Must be logged in to promote users.'
    );
  }

  // Check if caller is already an admin
  const callerToken = await admin.auth().getUser(context.auth.uid);
  if (!callerToken.customClaims?.admin) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Only admins can promote other users.'
    );
  }

  // Get email to promote
  const email = data.email;
  if (!email) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Email is required.'
    );
  }

  try {
    // Get user by email
    const user = await admin.auth().getUserByEmail(email);

    // Set admin claim
    await admin.auth().setCustomUserClaims(user.uid, {
      admin: true
    });

    return {
      success: true,
      message: `${email} is now an admin. They must sign out and sign in again.`
    };
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});

// Function to remove admin privileges
exports.revokeAdmin = functions.https.onCall(async (data, context) => {
  // Check if caller is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Must be logged in.'
    );
  }

  // Check if caller is admin
  const callerToken = await admin.auth().getUser(context.auth.uid);
  if (!callerToken.customClaims?.admin) {
    throw new functions.https.HttpsError(
      'permission-denied',
      'Only admins can revoke admin privileges.'
    );
  }

  const email = data.email;
  if (!email) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'Email is required.'
    );
  }

  try {
    const user = await admin.auth().getUserByEmail(email);

    // Remove admin claim
    await admin.auth().setCustomUserClaims(user.uid, {
      admin: false
    });

    return {
      success: true,
      message: `Admin privileges revoked for ${email}`
    };
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});
```

### Step 4: Deploy Functions

```bash
firebase deploy --only functions
```

### Step 5: Call from Frontend

In your admin panel, add:

```javascript
import { getFunctions, httpsCallable } from 'firebase/functions';

const functions = getFunctions();

// Promote user to admin
async function promoteUser(email) {
  const promoteToAdmin = httpsCallable(functions, 'promoteToAdmin');

  try {
    const result = await promoteToAdmin({ email });
    console.log(result.data.message);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Revoke admin
async function revokeUser(email) {
  const revokeAdmin = httpsCallable(functions, 'revokeAdmin');

  try {
    const result = await revokeAdmin({ email });
    console.log(result.data.message);
  } catch (error) {
    console.error('Error:', error.message);
  }
}
```

---

## Option 3: Direct Firebase Admin SDK (For Bootstrap)

If you need to set the FIRST admin before you have any admins:

### Create `scripts/bootstrap-admin.js`:

```javascript
const admin = require('firebase-admin');

// Initialize with service account
const serviceAccount = require('./service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function bootstrapFirstAdmin() {
  // Replace with your email
  const ADMIN_EMAIL = 'your-email@example.com';

  try {
    // Get user
    const user = await admin.auth().getUserByEmail(ADMIN_EMAIL);

    // Set admin claim
    await admin.auth().setCustomUserClaims(user.uid, {
      admin: true
    });

    console.log('✅ First admin created successfully!');
    console.log('Email:', ADMIN_EMAIL);
    console.log('UID:', user.uid);
    console.log('');
    console.log('⚠️  User must sign out and sign in again for changes to take effect');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);

    if (error.code === 'auth/user-not-found') {
      console.log('');
      console.log('💡 Solution: Create this user in Firebase Authentication first:');
      console.log('   1. Go to Firebase Console → Authentication');
      console.log('   2. Click "Add User"');
      console.log('   3. Enter email and password');
      console.log('   4. Run this script again');
    }

    process.exit(1);
  }
}

bootstrapFirstAdmin();
```

Run it:
```bash
node scripts/bootstrap-admin.js
```

---

## Verifying Admin Status

### Method 1: Check in Firebase Console

1. Go to Firebase Console → Authentication
2. Find the user
3. Click on the user
4. Look for **Custom claims** section
5. Should show: `{"admin":true}`

### Method 2: Check in Application

Add this to your code:

```javascript
import { getAuth } from 'firebase/auth';

async function checkAdminStatus() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    // Force token refresh
    const idTokenResult = await user.getIdTokenResult(true);
    console.log('Custom claims:', idTokenResult.claims);
    console.log('Is admin:', idTokenResult.claims.admin === true);
  }
}
```

### Method 3: Backend Verification

```javascript
const admin = require('firebase-admin');

async function verifyAdmin(uid) {
  const user = await admin.auth().getUser(uid);
  console.log('Custom claims:', user.customClaims);
  return user.customClaims?.admin === true;
}
```

---

## Security Best Practices

### 1. Limit Admin Count
- Only create admins for users who absolutely need it
- Regular users should never have admin privileges

### 2. Use Separate Admin Accounts
- Don't use personal email for admin
- Create dedicated admin accounts like `admin@nerdbillyfab.com`

### 3. Enable 2FA
- Require two-factor authentication for all admin accounts
- Go to Firebase Console → Authentication → Sign-in method → Multi-factor authentication

### 4. Monitor Admin Actions
- Log all admin operations
- Review logs regularly for suspicious activity

### 5. Rotate Service Account Keys
- Regenerate service account keys periodically
- Delete old keys after rotation

### 6. Use Environment Variables
- Never commit service account JSON to Git
- Add `service-account*.json` to `.gitignore`
- Use environment variables in production

---

## Troubleshooting

### "Permission Denied" After Setting Claim

**Problem:** User still gets permission denied after setting admin claim.

**Solution:**
1. User must sign out completely
2. Sign back in
3. Token will refresh with new claims

Force refresh in code:
```javascript
const user = auth.currentUser;
await user.getIdToken(true); // Force refresh
```

### "Admin Claim Not Found"

**Problem:** Custom claim doesn't appear in token.

**Causes:**
1. Claim wasn't set successfully - check logs
2. User hasn't refreshed their token - sign out/in
3. Using wrong UID - verify user ID matches

**Solution:**
```javascript
// Verify claim was set
const admin = require('firebase-admin');
const user = await admin.auth().getUser(uid);
console.log(user.customClaims);
```

### "Only Admins Can Access" for Actual Admin

**Problem:** Admin user can't access admin panel.

**Check:**
1. Is `authContext.js` checking `user.customClaims.admin`?
2. Has user signed out and back in since claim was set?
3. Is Firestore rule checking `request.auth.token.admin`?

---

## Production Checklist

Before launching:

- [ ] At least 2 admin users created (backup admin)
- [ ] All admin users have 2FA enabled
- [ ] Service account keys secured (not in Git)
- [ ] Firestore rules updated and published
- [ ] Admin panel tested with admin user
- [ ] Admin panel tested with regular user (should be denied)
- [ ] Custom claims visible in Firebase Console
- [ ] Cloud Functions deployed (if using Option 2)
- [ ] Backup contact info for all admins documented

---

## Emergency Access Recovery

If you lose access to all admin accounts:

1. Create new service account key (if old one lost)
2. Run bootstrap script with new admin email
3. Deploy new security rules if needed
4. Create multiple backup admins

Store emergency recovery script securely outside of Git repository.

---

## Next Steps

After setting up your first admin:

1. Test admin panel access
2. Deploy updated Firestore rules
3. Set up additional backup admins
4. Enable 2FA for all admin accounts
5. Document admin user management procedures
