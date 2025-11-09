# Admin Dashboard Guide

## Overview

Your NerdbillyFab website now has a complete admin dashboard for managing products. This guide explains how to use it.

## Features

- 🔐 **Secure Login** - Firebase Authentication protects your admin panel
- 📦 **Product Management** - Add, edit, and delete products
- 🖼️ **Image Upload** - Upload product images directly to Firebase Storage
- 💾 **Cloud Database** - All products stored in Firestore
- 🔄 **Auto-Sync** - Products sync to your website before deployment

## Getting Started

### 1. Set Up Firebase

Before using the admin panel, you need to configure Firebase:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing project
3. Enable these services:
   - **Authentication** (Email/Password provider)
   - **Firestore Database**
   - **Storage**
   - **Hosting**

### 2. Configure Environment Variables

Create a `.env.local` file in your project root (copy from `.env.local.example`):

```bash
cp .env.local.example .env.local
```

Fill in your Firebase credentials from the Firebase Console:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Create Your Admin Account

Using Firebase CLI:

```bash
firebase auth:create --email admin@nerdbillyfab.com --password YOUR_SECURE_PASSWORD
```

Or use the Firebase Console:
1. Go to Authentication > Users
2. Click "Add User"
3. Enter your email and password

### 4. Access the Admin Panel

1. Start your development server: `npm run dev`
2. Navigate to: `http://localhost:3000/admin/login`
3. Log in with your admin credentials
4. You'll be redirected to the dashboard

## Using the Admin Dashboard

### Dashboard Overview

The dashboard shows:
- Total number of products
- Products in stock
- Pre-order products
- Quick action buttons

### Managing Products

#### Migrating Existing Products

On first login, you'll see a migration prompt:

1. Click **"Migrate X Products"** button
2. This copies all products from your code to Firestore
3. You only need to do this once

#### Adding a New Product

1. Click **"+ Add Product"** or navigate to Products → Add New
2. Fill in the form:
   - **Basic Info**: Name, slug, category, description
   - **Pricing**: Price, original price, discount
   - **Inventory**: Stock status, pre-order, shipping
   - **Features**: One feature per line
   - **Specifications**: JSON format (see example in form)
   - **Images**: Upload product photos
   - **Safety**: Optional disclaimer for high-voltage products

3. Click **"Create Product"**

#### Editing a Product

1. Go to **Products** page
2. Find the product you want to edit
3. Click **"Edit"**
4. Make your changes
5. Click **"Update Product"**

#### Deleting a Product

1. Go to **Products** page
2. Find the product you want to delete
3. Click **"Delete"**
4. Confirm the deletion

### Uploading Images

When adding or editing a product:

1. Scroll to the **"Product Images"** section
2. Click **"Choose File"** and select an image
3. Preview will appear
4. Click **"Upload Image"**
5. Image is uploaded to Firebase Storage
6. URL is automatically added to the product

**Supported formats**: JPG, PNG, GIF, WebP

### Searching Products

Use the search bar on the Products page to find products by:
- Product name
- Category

## Publishing Changes

**Important**: Your website is statically generated. Changes in the admin panel won't appear on the live site until you rebuild and deploy.

### Workflow

1. **Edit** products in the admin panel
2. **Sync** products from Firestore to your code
3. **Build** the static site
4. **Deploy** to Firebase Hosting

### Deploy Command

Run this single command to do all steps:

```bash
npm run deploy
```

This will:
1. Sync products from Firestore → `data/products.js`
2. Build the Next.js static site
3. Deploy to Firebase Hosting

### Manual Sync (Optional)

To sync products without deploying:

```bash
npm run sync-products
```

This updates `data/products.js` with your latest Firestore data.

## Firestore Structure

Products are stored in Firestore with this structure:

```
products (collection)
  └── product-slug (document)
      ├── id: "product-slug"
      ├── name: "Product Name"
      ├── slug: "product-slug"
      ├── category: "wheels"
      ├── price: 59.99
      ├── originalPrice: 69.99
      ├── discount: 15
      ├── description: "Product description..."
      ├── features: ["Feature 1", "Feature 2"]
      ├── specifications: { "Key": "Value" }
      ├── inStock: true
      ├── preOrder: false
      ├── freeShipping: true
      ├── images: ["https://..."]
      ├── requiresDisclaimer: false
      ├── disclaimerText: ""
      ├── createdAt: "2025-01-15T..."
      └── updatedAt: "2025-01-15T..."
```

## Troubleshooting

### Can't Login

**Issue**: "Invalid credentials" error

**Solutions**:
- Verify your Firebase project has Authentication enabled
- Check that Email/Password provider is enabled
- Ensure your admin user exists in Firebase Authentication
- Verify `.env.local` has correct Firebase credentials

### Products Not Showing in Admin

**Issue**: Products page is empty

**Solutions**:
- Click the migration button to import existing products
- Check Firestore rules allow authenticated users to read/write
- Verify Firebase configuration is correct

### Images Not Uploading

**Issue**: Image upload fails

**Solutions**:
- Ensure Firebase Storage is enabled in your project
- Check Storage rules allow authenticated users to write
- Verify image file size is under 5MB
- Check image format is supported (JPG, PNG, GIF, WebP)

### Changes Not Appearing on Live Site

**Issue**: Edited products don't show on deployed site

**Solution**:
- Remember to run `npm run deploy` after making changes
- The admin panel edits Firestore, but the live site uses static data
- You must rebuild and redeploy for changes to appear

## Security Best Practices

1. **Strong Passwords**: Use a strong, unique password for your admin account
2. **Environment Variables**: Never commit `.env.local` to git
3. **Firestore Rules**: Set up proper security rules (see Firebase docs)
4. **HTTPS Only**: Always access admin panel over HTTPS in production
5. **Regular Backups**: Export your Firestore data regularly

## Firestore Security Rules

Add these rules in Firebase Console → Firestore → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products - authenticated users can read/write
    match /products/{productId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}
```

## Storage Security Rules

Add these rules in Firebase Console → Storage → Rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;  // Public read for product images
      allow write: if request.auth != null;  // Only authenticated users can upload
    }
  }
}
```

## Support

For issues or questions:
- Check this guide first
- Review Firebase documentation
- Check browser console for errors
- Verify all environment variables are set correctly

## Quick Reference

| Task | Command |
|------|---------|
| Start dev server | `npm run dev` |
| Access admin | `http://localhost:3000/admin/login` |
| Sync products | `npm run sync-products` |
| Build site | `npm run build` |
| Deploy everything | `npm run deploy` |

## Admin URLs

- **Login**: `/admin/login`
- **Dashboard**: `/admin/dashboard`
- **Products**: `/admin/products`
- **Add Product**: `/admin/products/new`
- **Edit Product**: `/admin/products/[id]/edit`
