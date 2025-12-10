import { db } from './firebase'
import { collection, addDoc, doc, updateDoc, getDoc, getDocs, query, where, orderBy, increment, arrayUnion } from 'firebase/firestore'

// Create a new order
export async function createOrder(orderData) {
  try {
    const ordersRef = collection(db, 'orders')

    // Generate order number
    const orderNumber = `NF-${Date.now()}`

    const order = {
      orderNumber,
      status: 'pending', // pending, paid, processing, shipped, delivered, cancelled
      ...orderData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const docRef = await addDoc(ordersRef, order)

    return { id: docRef.id, ...order }
  } catch (error) {
    console.error('Error creating order:', error)
    throw error
  }
}

// Update order status
export async function updateOrderStatus(orderId, status, notes = '') {
  try {
    const orderRef = doc(db, 'orders', orderId)

    await updateDoc(orderRef, {
      status,
      updatedAt: new Date().toISOString(),
      statusHistory: arrayUnion({
        status,
        notes,
        timestamp: new Date().toISOString(),
      }),
    })

    return true
  } catch (error) {
    console.error('Error updating order status:', error)
    throw error
  }
}

// Get order by ID
export async function getOrder(orderId) {
  try {
    const orderRef = doc(db, 'orders', orderId)
    const orderSnap = await getDoc(orderRef)

    if (orderSnap.exists()) {
      return { id: orderSnap.id, ...orderSnap.data() }
    }

    return null
  } catch (error) {
    console.error('Error getting order:', error)
    throw error
  }
}

// Get all orders
export async function getAllOrders() {
  try {
    const ordersRef = collection(db, 'orders')
    const q = query(ordersRef, orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)

    const orders = []
    snapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() })
    })

    return orders
  } catch (error) {
    console.error('Error getting orders:', error)
    return []
  }
}

// Get orders by customer email
export async function getOrdersByCustomer(email) {
  try {
    const ordersRef = collection(db, 'orders')
    const q = query(
      ordersRef,
      where('customer.email', '==', email),
      orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(q)

    const orders = []
    snapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() })
    })

    return orders
  } catch (error) {
    console.error('Error getting customer orders:', error)
    return []
  }
}

// Get order by order number and email (for customer tracking)
export async function getOrderByNumberAndEmail(orderNumber, email) {
  try {
    const ordersRef = collection(db, 'orders')
    const q = query(
      ordersRef,
      where('orderNumber', '==', orderNumber),
      where('customer.email', '==', email)
    )
    const snapshot = await getDocs(q)

    if (!snapshot.empty) {
      const doc = snapshot.docs[0]
      return { id: doc.id, ...doc.data() }
    }

    return null
  } catch (error) {
    console.error('Error getting order by number and email:', error)
    throw error
  }
}

// Decrement product inventory
export async function decrementInventory(productId, quantity) {
  try {
    const productRef = doc(db, 'products', productId)

    await updateDoc(productRef, {
      quantity: increment(-quantity),
      updatedAt: new Date().toISOString(),
    })

    return true
  } catch (error) {
    console.error('Error decrementing inventory:', error)
    throw error
  }
}

// Add tracking number to order
export async function addTrackingNumber(orderId, trackingNumber, carrier = 'USPS') {
  try {
    const orderRef = doc(db, 'orders', orderId)

    await updateDoc(orderRef, {
      tracking: {
        number: trackingNumber,
        carrier,
        addedAt: new Date().toISOString(),
      },
      status: 'shipped',
      updatedAt: new Date().toISOString(),
    })

    return true
  } catch (error) {
    console.error('Error adding tracking number:', error)
    throw error
  }
}

// Get customer or create if doesn't exist
export async function getOrCreateCustomer(customerData) {
  try {
    // Normalize email for consistent lookups
    const normalizedEmail = customerData.email.trim().toLowerCase()

    const customersRef = collection(db, 'customers')
    const q = query(customersRef, where('email', '==', normalizedEmail))
    const snapshot = await getDocs(q)

    if (!snapshot.empty) {
      // Customer exists
      const doc = snapshot.docs[0]
      return { id: doc.id, ...doc.data() }
    }

    // Create new customer
    const newCustomer = {
      ...customerData,
      email: normalizedEmail, // Ensure email is normalized
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      orderCount: 0,
      totalSpent: 0,
    }

    const docRef = await addDoc(customersRef, newCustomer)

    return { id: docRef.id, ...newCustomer }
  } catch (error) {
    console.error('Error getting/creating customer:', error)
    throw error
  }
}
