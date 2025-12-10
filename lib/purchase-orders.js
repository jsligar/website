import { db } from './firebase'
import { collection, doc, getDocs, getDoc, setDoc, updateDoc, query, where, orderBy, Timestamp } from 'firebase/firestore'

/**
 * Purchase Order Management System
 * Create, track, and fulfill purchase orders for inventory restocking
 */

const COLLECTION_NAME = 'purchase_orders'

export const PO_STATUS = {
  DRAFT: 'draft',
  PENDING: 'pending',
  ORDERED: 'ordered',
  RECEIVED: 'received',
  CANCELLED: 'cancelled'
}

/**
 * Create a new purchase order
 * @param {Object} poData - Purchase order data
 * @param {string} createdBy - User email
 * @returns {Promise<string>} PO ID
 */
export async function createPurchaseOrder(poData, createdBy) {
  try {
    const poRef = doc(collection(db, COLLECTION_NAME))
    const poNumber = generatePONumber()

    const po = {
      poNumber,
      status: PO_STATUS.DRAFT,
      supplier: poData.supplier,
      items: poData.items,
      subtotal: calculateSubtotal(poData.items),
      shipping: poData.shipping || 0,
      tax: poData.tax || 0,
      total: 0, // Calculated below
      notes: poData.notes || '',
      expectedDelivery: poData.expectedDelivery || null,
      createdAt: Timestamp.now(),
      createdBy,
      updatedAt: Timestamp.now(),
      updatedBy: createdBy,
      orderedAt: null,
      receivedAt: null
    }

    // Calculate total
    po.total = po.subtotal + po.shipping + po.tax

    await setDoc(poRef, po)

    return poRef.id
  } catch (error) {
    console.error('Error creating purchase order:', error)
    throw error
  }
}

/**
 * Get all purchase orders
 * @param {Object} filters - Optional filters { status, supplier }
 * @returns {Promise<Array>} Array of purchase orders
 */
export async function getPurchaseOrders(filters = {}) {
  try {
    let q = collection(db, COLLECTION_NAME)

    // Apply filters
    if (filters.status) {
      q = query(q, where('status', '==', filters.status))
    }
    if (filters.supplier) {
      q = query(q, where('supplier', '==', filters.supplier))
    }

    // Order by created date (newest first)
    q = query(q, orderBy('createdAt', 'desc'))

    const snapshot = await getDocs(q)

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
      orderedAt: doc.data().orderedAt?.toDate(),
      receivedAt: doc.data().receivedAt?.toDate()
    }))
  } catch (error) {
    console.error('Error fetching purchase orders:', error)
    throw error
  }
}

/**
 * Get purchase order by ID
 * @param {string} poId - PO ID
 * @returns {Promise<Object|null>} Purchase order or null
 */
export async function getPurchaseOrderById(poId) {
  try {
    const docRef = doc(db, COLLECTION_NAME, poId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data()
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
        orderedAt: data.orderedAt?.toDate(),
        receivedAt: data.receivedAt?.toDate()
      }
    }

    return null
  } catch (error) {
    console.error('Error fetching purchase order:', error)
    throw error
  }
}

/**
 * Update purchase order status
 * @param {string} poId - PO ID
 * @param {string} status - New status
 * @param {string} updatedBy - User email
 * @returns {Promise<void>}
 */
export async function updatePOStatus(poId, status, updatedBy) {
  try {
    const docRef = doc(db, COLLECTION_NAME, poId)
    const update = {
      status,
      updatedAt: Timestamp.now(),
      updatedBy
    }

    // Set timestamp for status changes
    if (status === PO_STATUS.ORDERED) {
      update.orderedAt = Timestamp.now()
    } else if (status === PO_STATUS.RECEIVED) {
      update.receivedAt = Timestamp.now()
    }

    await updateDoc(docRef, update)
  } catch (error) {
    console.error('Error updating PO status:', error)
    throw error
  }
}

/**
 * Mark purchase order as received and update inventory
 * @param {string} poId - PO ID
 * @param {string} updatedBy - User email
 * @returns {Promise<Object>} Result with updated inventory
 */
export async function receivePurchaseOrder(poId, updatedBy) {
  const { updateComponentInventory, getComponentById } = await import('./components-service')

  try {
    const po = await getPurchaseOrderById(poId)

    if (!po) {
      throw new Error(`Purchase order not found: ${poId}`)
    }

    if (po.status === PO_STATUS.RECEIVED) {
      throw new Error('Purchase order already received')
    }

    const inventoryUpdates = []

    // Update inventory for each item
    for (const item of po.items) {
      try {
        const component = await getComponentById(item.componentId)

        if (component) {
          const newQuantity = component.onHand + item.quantity

          await updateComponentInventory(item.componentId, newQuantity, updatedBy)

          inventoryUpdates.push({
            componentId: item.componentId,
            name: item.name,
            oldQuantity: component.onHand,
            addedQuantity: item.quantity,
            newQuantity,
            success: true
          })
        } else {
          inventoryUpdates.push({
            componentId: item.componentId,
            name: item.name,
            success: false,
            error: 'Component not found'
          })
        }
      } catch (error) {
        inventoryUpdates.push({
          componentId: item.componentId,
          name: item.name,
          success: false,
          error: error.message
        })
      }
    }

    // Mark PO as received
    await updatePOStatus(poId, PO_STATUS.RECEIVED, updatedBy)

    return {
      success: true,
      poId,
      poNumber: po.poNumber,
      inventoryUpdates
    }
  } catch (error) {
    console.error('Error receiving purchase order:', error)
    throw error
  }
}

/**
 * Get purchase order statistics
 * @returns {Promise<Object>} Stats object
 */
export async function getPOStats() {
  try {
    const pos = await getPurchaseOrders()

    const stats = {
      total: pos.length,
      draft: pos.filter(po => po.status === PO_STATUS.DRAFT).length,
      pending: pos.filter(po => po.status === PO_STATUS.PENDING).length,
      ordered: pos.filter(po => po.status === PO_STATUS.ORDERED).length,
      received: pos.filter(po => po.status === PO_STATUS.RECEIVED).length,
      totalValue: pos.reduce((sum, po) => sum + (po.total || 0), 0),
      pendingValue: pos
        .filter(po => po.status === PO_STATUS.PENDING || po.status === PO_STATUS.ORDERED)
        .reduce((sum, po) => sum + (po.total || 0), 0)
    }

    return stats
  } catch (error) {
    console.error('Error fetching PO stats:', error)
    throw error
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Generate PO number
 * Format: PO-YYYYMMDD-XXX
 */
function generatePONumber() {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const random = String(Math.floor(Math.random() * 1000)).padStart(3, '0')

  return `PO-${year}${month}${day}-${random}`
}

/**
 * Calculate subtotal from items
 */
function calculateSubtotal(items) {
  return items.reduce((sum, item) => {
    return sum + (item.quantity * item.unitCost)
  }, 0)
}

/**
 * Validate purchase order data
 */
export function validatePOData(poData) {
  const errors = []

  if (!poData.supplier || !poData.supplier.trim()) {
    errors.push('Supplier is required')
  }

  if (!poData.items || poData.items.length === 0) {
    errors.push('At least one item is required')
  }

  if (poData.items) {
    poData.items.forEach((item, index) => {
      if (!item.componentId) {
        errors.push(`Item ${index + 1}: Component ID is required`)
      }
      if (!item.quantity || item.quantity <= 0) {
        errors.push(`Item ${index + 1}: Valid quantity is required`)
      }
      if (!item.unitCost || item.unitCost <= 0) {
        errors.push(`Item ${index + 1}: Valid unit cost is required`)
      }
    })
  }

  return {
    valid: errors.length === 0,
    errors
  }
}
