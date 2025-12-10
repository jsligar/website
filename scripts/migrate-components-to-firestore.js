#!/usr/bin/env node

/**
 * Migration Script: components.js → Firestore
 *
 * This script migrates all components from the static data/components.js file
 * to Firestore database for live inventory management.
 *
 * Usage:
 *   node scripts/migrate-components-to-firestore.js
 *
 * IMPORTANT: Run this only once! It will overwrite existing Firestore data.
 */

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, setDoc, getDocs } from 'firebase/firestore'
import { components } from '../data/components.js'

// Firebase config (from environment or hardcoded for script)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const COLLECTION_NAME = 'components'

async function migrateComponents() {
  console.log('🚀 Starting component migration to Firestore...\n')

  // Check if components collection already exists
  const existingDocs = await getDocs(collection(db, COLLECTION_NAME))
  if (!existingDocs.empty) {
    console.log(`⚠️  WARNING: Found ${existingDocs.size} existing documents in '${COLLECTION_NAME}' collection`)
    console.log('This script will overwrite them.')
    console.log('\nPress Ctrl+C to cancel, or wait 5 seconds to continue...\n')
    await new Promise(resolve => setTimeout(resolve, 5000))
  }

  console.log(`📦 Migrating ${components.length} components...\n`)

  let successCount = 0
  let errorCount = 0

  for (const component of components) {
    try {
      const docRef = doc(db, COLLECTION_NAME, component.id)

      const firestoreData = {
        ...component,
        lastUpdated: new Date(),
        updatedBy: 'migration-script',
        migratedAt: new Date().toISOString()
      }

      await setDoc(docRef, firestoreData)

      successCount++
      console.log(`✓ ${component.id.padEnd(40)} ${component.name}`)
    } catch (error) {
      errorCount++
      console.error(`✗ ${component.id.padEnd(40)} ERROR: ${error.message}`)
    }
  }

  console.log(`\n${'='.repeat(80)}`)
  console.log(`✅ Migration complete!`)
  console.log(`   Success: ${successCount}`)
  console.log(`   Errors:  ${errorCount}`)
  console.log(`${'='.repeat(80)}\n`)

  if (errorCount === 0) {
    console.log('🎉 All components successfully migrated to Firestore!')
    console.log('\nNext steps:')
    console.log('  1. Test the admin inventory page at /admin/inventory')
    console.log('  2. Verify data in Firebase Console')
    console.log('  3. Keep data/components.js as backup\n')
  } else {
    console.log('⚠️  Some components failed to migrate. Check errors above.')
  }

  process.exit(0)
}

// Run migration
migrateComponents().catch(error => {
  console.error('❌ Migration failed:', error)
  process.exit(1)
})
