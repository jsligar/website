// Check what products are in Firestore
const { initializeApp } = require('firebase/app')
const { getFirestore, collection, getDocs } = require('firebase/firestore')

async function checkProducts() {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  }

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)

  try {
    console.log('\n🔍 Checking Firestore for products...\n')

    const productsRef = collection(db, 'products')
    const snapshot = await getDocs(productsRef)

    if (snapshot.empty) {
      console.log('❌ No products found in Firestore!')
      console.log('\n💡 To restore your products:')
      console.log('   1. Go to http://localhost:3000/admin/products')
      console.log('   2. Log in with your admin account')
      console.log('   3. Click "Migrate Products" button')
      console.log('   4. This will copy all products from data/products.js to Firestore\n')
    } else {
      console.log(`✅ Found ${snapshot.size} products in Firestore:\n`)
      snapshot.forEach(doc => {
        const data = doc.data()
        console.log(`   • ${data.name || doc.id}`)
      })
      console.log('')
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

checkProducts()
