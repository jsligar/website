const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const fs = require('fs')
const path = require('path')

// This script syncs products from Firestore to data/products.js before building
// Run: node scripts/sync-products.js

async function syncProducts() {
  try {
    console.log('🔄 Syncing products from Firestore...')

    // Check if Firebase is configured
    if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      console.log('⚠️  Firebase not configured. Skipping sync.')
      console.log('💡 To enable sync, add Firebase environment variables')
      return
    }

    // Initialize Firebase Admin
    const app = initializeApp({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    })

    const db = getFirestore(app)

    // Fetch all products from Firestore
    const productsSnapshot = await db.collection('products').get()

    if (productsSnapshot.empty) {
      console.log('⚠️  No products found in Firestore. Keeping existing products.js')
      return
    }

    // Convert to array
    const products = []
    productsSnapshot.forEach(doc => {
      const data = doc.data()
      products.push({
        id: doc.id,
        ...data,
      })
    })

    console.log(`✅ Found ${products.length} products in Firestore`)

    // Generate JavaScript file content
    const fileContent = `// This file is auto-generated from Firestore
// Last synced: ${new Date().toISOString()}
// To update: Run 'npm run sync-products' after editing products in admin panel

export const products = ${JSON.stringify(products, null, 2)}

export function getProductBySlug(slug) {
  return products.find(product => product.slug === slug)
}

export function getProductsByCategory(category) {
  if (!category) return products
  return products.filter(product => product.category === category)
}

export function getAllCategories() {
  return [...new Set(products.map(p => p.category))]
}
`

    // Write to file
    const filePath = path.join(__dirname, '..', 'data', 'products.js')
    fs.writeFileSync(filePath, fileContent, 'utf8')

    console.log('✅ Successfully synced products to data/products.js')
    console.log('💡 Products will be included in the next build')

  } catch (error) {
    console.error('❌ Error syncing products:', error.message)
    console.log('⚠️  Keeping existing products.js')
  }
}

syncProducts()
