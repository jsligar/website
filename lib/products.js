import { db } from './firebase'
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore'

// Fallback to static products if Firestore is not configured or empty
import { products as staticProducts } from '../data/products'

export async function getAllProducts() {
  try {
    // Check if Firebase is configured
    if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      console.log('Firebase not configured, using static products')
      return staticProducts
    }

    const productsRef = collection(db, 'products')
    const snapshot = await getDocs(productsRef)

    if (snapshot.empty) {
      console.log('No products in Firestore, using static products')
      return staticProducts
    }

    const products = []
    snapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() })
    })

    return products
  } catch (error) {
    console.error('Error fetching products from Firestore:', error)
    console.log('Falling back to static products')
    return staticProducts
  }
}

export async function getProductBySlug(slug) {
  try {
    // Check if Firebase is configured
    if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      return staticProducts.find(p => p.slug === slug)
    }

    const productRef = doc(db, 'products', slug)
    const productSnap = await getDoc(productRef)

    if (productSnap.exists()) {
      return { id: productSnap.id, ...productSnap.data() }
    }

    // Fallback to static products
    return staticProducts.find(p => p.slug === slug)
  } catch (error) {
    console.error('Error fetching product from Firestore:', error)
    return staticProducts.find(p => p.slug === slug)
  }
}

export async function getProductsByCategory(category) {
  try {
    if (!category) return await getAllProducts()

    // Check if Firebase is configured
    if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      return staticProducts.filter(p => p.category === category)
    }

    const productsRef = collection(db, 'products')
    const q = query(productsRef, where('category', '==', category))
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      return staticProducts.filter(p => p.category === category)
    }

    const products = []
    snapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() })
    })

    return products
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return staticProducts.filter(p => p.category === category)
  }
}

export async function getAllCategories() {
  try {
    const products = await getAllProducts()
    return [...new Set(products.map(p => p.category).filter(Boolean))]
  } catch (error) {
    console.error('Error getting categories:', error)
    return [...new Set(staticProducts.map(p => p.category).filter(Boolean))]
  }
}
