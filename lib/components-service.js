import { db } from './firebase'
import { collection, doc, getDocs, getDoc, setDoc, updateDoc, deleteDoc, query, orderBy, Timestamp } from 'firebase/firestore'

/**
 * Components Service - Firestore operations for inventory management
 * Replaces static components.js file with live database
 */

const COLLECTION_NAME = 'components'

/**
 * Get all components from Firestore
 * @returns {Promise<Array>} Array of component objects
 */
export async function getComponents() {
  try {
    const componentsRef = collection(db, COLLECTION_NAME)
    const q = query(componentsRef, orderBy('category'), orderBy('name'))
    const snapshot = await getDocs(q)

    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }))
  } catch (error) {
    console.error('Error fetching components:', error)
    throw error
  }
}

/**
 * Get component by ID
 * @param {string} id - Component ID
 * @returns {Promise<Object|null>} Component object or null
 */
export async function getComponentById(id) {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        ...docSnap.data(),
        id: docSnap.id
      }
    }
    return null
  } catch (error) {
    console.error('Error fetching component:', error)
    throw error
  }
}

/**
 * Get components by category
 * @param {string} category - Component category
 * @returns {Promise<Array>} Array of component objects
 */
export async function getComponentsByCategory(category) {
  try {
    const components = await getComponents()
    return components.filter(c => c.category === category)
  } catch (error) {
    console.error('Error fetching components by category:', error)
    throw error
  }
}

/**
 * Create or update a component
 * @param {string} id - Component ID
 * @param {Object} data - Component data
 * @param {string} updatedBy - Email of user making the update
 * @returns {Promise<void>}
 */
export async function saveComponent(id, data, updatedBy = 'system') {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    const componentData = {
      ...data,
      lastUpdated: Timestamp.now(),
      updatedBy
    }

    await setDoc(docRef, componentData, { merge: true })
    return componentData
  } catch (error) {
    console.error('Error saving component:', error)
    throw error
  }
}

/**
 * Update component inventory (onHand quantity)
 * @param {string} id - Component ID
 * @param {number} newQuantity - New quantity on hand
 * @param {string} updatedBy - Email of user making the update
 * @returns {Promise<void>}
 */
export async function updateComponentInventory(id, newQuantity, updatedBy = 'system') {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    await updateDoc(docRef, {
      onHand: newQuantity,
      lastUpdated: Timestamp.now(),
      updatedBy
    })
  } catch (error) {
    console.error('Error updating component inventory:', error)
    throw error
  }
}

/**
 * Delete a component
 * @param {string} id - Component ID
 * @returns {Promise<void>}
 */
export async function deleteComponent(id) {
  try {
    const docRef = doc(db, COLLECTION_NAME, id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error('Error deleting component:', error)
    throw error
  }
}

/**
 * Calculate total cost for a list of components (BOM calculation)
 * @param {Array} items - Array of {id, quantity} objects
 * @returns {Promise<number>} Total cost
 */
export async function calculateComponentCost(items) {
  try {
    let total = 0

    for (const item of items) {
      const component = await getComponentById(item.id)
      if (!component) {
        console.warn(`Component not found: ${item.id}`)
        continue
      }
      total += component.cost * item.quantity
    }

    return total
  } catch (error) {
    console.error('Error calculating component cost:', error)
    throw error
  }
}

/**
 * Get all filament types
 * @returns {Promise<Array>} Array of unique filament types
 */
export async function getFilamentTypes() {
  try {
    const filaments = await getComponentsByCategory('Filament')
    const types = [...new Set(filaments.map(f => f.type))]
    return types
  } catch (error) {
    console.error('Error fetching filament types:', error)
    throw error
  }
}

/**
 * Get filaments by type
 * @param {string} type - Filament type (PLA, PETG, etc.)
 * @returns {Promise<Array>} Array of filament objects
 */
export async function getFilamentsByType(type) {
  try {
    const filaments = await getComponentsByCategory('Filament')
    return filaments.filter(f => f.type === type)
  } catch (error) {
    console.error('Error fetching filaments by type:', error)
    throw error
  }
}

/**
 * Batch save multiple components (for bulk imports)
 * @param {Array} components - Array of component objects
 * @param {string} updatedBy - Email of user making the update
 * @returns {Promise<Array>} Array of results
 */
export async function batchSaveComponents(components, updatedBy = 'system') {
  try {
    const results = []

    for (const component of components) {
      try {
        await saveComponent(component.id, component, updatedBy)
        results.push({ id: component.id, success: true })
      } catch (error) {
        results.push({ id: component.id, success: false, error: error.message })
      }
    }

    return results
  } catch (error) {
    console.error('Error batch saving components:', error)
    throw error
  }
}
