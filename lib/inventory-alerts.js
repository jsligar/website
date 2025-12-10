import { getComponents, updateComponentInventory } from './components-service'

/**
 * Low Stock & Reordering System
 * Detects inventory below reorder points and suggests purchase orders
 */

// Default reorder points by category (in grams for filament, quantity for others)
const DEFAULT_REORDER_POINTS = {
  Filament: 500,    // Reorder when < 500g remaining
  Hardware: 20,      // Reorder when < 20 pieces
  Tires: 2,          // Reorder when < 2 tires
  Electronics: 5,    // Reorder when < 5 pieces
  Packaging: 10,     // Reorder when < 10 boxes
  Labor: 0,          // Don't reorder labor
  Overhead: 0        // Don't reorder overhead
}

// Default reorder quantities
const DEFAULT_REORDER_QUANTITIES = {
  Filament: 3000,    // Order 3 spools (3kg)
  Hardware: 100,     // Order 100 pieces
  Tires: 4,          // Order 4 tires
  Electronics: 10,   // Order 10 pieces
  Packaging: 25      // Order 25 boxes
}

// Supplier lead times (days)
const DEFAULT_LEAD_TIMES = {
  Filament: 7,       // Bambu Lab ships in ~1 week
  Hardware: 3,       // Fastenal local pickup
  Tires: 5,          // Harbor Freight or online
  Electronics: 7,    // Amazon/online
  Packaging: 3       // Local supplier
}

/**
 * Get all items with low stock
 * @returns {Promise<Array>} Array of low stock items
 */
export async function getLowStockItems() {
  try {
    const components = await getComponents()
    const lowStockItems = []

    for (const component of components) {
      const reorderPoint = component.reorderPoint || DEFAULT_REORDER_POINTS[component.category] || 0

      // Skip categories that don't need reordering
      if (reorderPoint === 0) continue

      // Check if below reorder point
      if (component.onHand <= reorderPoint) {
        const reorderQty = component.reorderQuantity || DEFAULT_REORDER_QUANTITIES[component.category] || 0
        const leadTime = component.leadTime || DEFAULT_LEAD_TIMES[component.category] || 7

        lowStockItems.push({
          ...component,
          reorderPoint,
          reorderQuantity: reorderQty,
          leadTime,
          stockLevel: calculateStockLevel(component.onHand, reorderPoint),
          daysUntilOut: estimateDaysUntilOut(component),
          suggestedOrderQty: calculateSuggestedOrderQty(component, reorderQty)
        })
      }
    }

    // Sort by urgency (lowest stock first)
    lowStockItems.sort((a, b) => a.onHand - b.onHand)

    return lowStockItems
  } catch (error) {
    console.error('Error fetching low stock items:', error)
    throw error
  }
}

/**
 * Calculate stock level status
 */
function calculateStockLevel(onHand, reorderPoint) {
  const percentage = (onHand / reorderPoint) * 100

  if (onHand === 0) return { status: 'OUT_OF_STOCK', label: 'Out of Stock', color: 'red' }
  if (percentage <= 25) return { status: 'CRITICAL', label: 'Critical', color: 'red' }
  if (percentage <= 50) return { status: 'LOW', label: 'Low', color: 'orange' }
  if (percentage <= 100) return { status: 'REORDER', label: 'Reorder', color: 'yellow' }
  return { status: 'OK', label: 'OK', color: 'green' }
}

/**
 * Estimate days until out of stock based on usage
 * @param {Object} component - Component with usage data
 * @returns {number|null} Days until out, or null if no usage data
 */
function estimateDaysUntilOut(component) {
  // If we have usage rate data, calculate
  if (component.avgDailyUsage && component.avgDailyUsage > 0) {
    return Math.floor(component.onHand / component.avgDailyUsage)
  }

  // Otherwise, return null (no estimate)
  return null
}

/**
 * Calculate suggested order quantity
 * Considers: reorder qty, current stock, lead time, usage rate
 */
function calculateSuggestedOrderQty(component, defaultReorderQty) {
  // For filament, round to full spools
  if (component.category === 'Filament') {
    const spoolSize = 1000 // Standard 1kg spool
    const neededToRestock = Math.max(0, defaultReorderQty - component.onHand)
    const spoolsNeeded = Math.ceil(neededToRestock / spoolSize)
    return Math.max(1, spoolsNeeded) * spoolSize // At least 1 spool
  }

  // For hardware, round to pack sizes (100)
  if (component.category === 'Hardware') {
    const packSize = 100
    const neededToRestock = Math.max(0, defaultReorderQty - component.onHand)
    const packsNeeded = Math.ceil(neededToRestock / packSize)
    return Math.max(1, packsNeeded) * packSize
  }

  // For other categories, use default reorder qty
  return defaultReorderQty
}

/**
 * Get low stock summary statistics
 * @returns {Promise<Object>} Summary stats
 */
export async function getLowStockSummary() {
  try {
    const lowStockItems = await getLowStockItems()

    const summary = {
      total: lowStockItems.length,
      outOfStock: lowStockItems.filter(item => item.onHand === 0).length,
      critical: lowStockItems.filter(item => item.stockLevel.status === 'CRITICAL').length,
      low: lowStockItems.filter(item => item.stockLevel.status === 'LOW').length,
      reorder: lowStockItems.filter(item => item.stockLevel.status === 'REORDER').length,
      byCategory: {}
    }

    // Group by category
    for (const item of lowStockItems) {
      if (!summary.byCategory[item.category]) {
        summary.byCategory[item.category] = 0
      }
      summary.byCategory[item.category]++
    }

    return summary
  } catch (error) {
    console.error('Error fetching low stock summary:', error)
    throw error
  }
}

/**
 * Generate purchase order suggestions
 * Groups items by category/supplier for efficient ordering
 * @returns {Promise<Array>} Array of PO suggestions
 */
export async function generatePOSuggestions() {
  try {
    const lowStockItems = await getLowStockItems()

    // Group by category (assuming same supplier per category)
    const suggestions = {}

    for (const item of lowStockItems) {
      const category = item.category

      if (!suggestions[category]) {
        suggestions[category] = {
          category,
          supplier: getSuggestedSupplier(category),
          items: [],
          totalItems: 0,
          estimatedCost: 0,
          leadTime: item.leadTime
        }
      }

      const itemCost = calculateItemOrderCost(item)

      suggestions[category].items.push({
        id: item.id,
        name: item.name,
        onHand: item.onHand,
        reorderPoint: item.reorderPoint,
        suggestedQty: item.suggestedOrderQty,
        unitCost: item.cost,
        totalCost: itemCost
      })

      suggestions[category].totalItems++
      suggestions[category].estimatedCost += itemCost
    }

    return Object.values(suggestions)
  } catch (error) {
    console.error('Error generating PO suggestions:', error)
    throw error
  }
}

/**
 * Get suggested supplier for a category
 */
function getSuggestedSupplier(category) {
  const suppliers = {
    Filament: 'Bambu Lab Store',
    Hardware: 'Fastenal (Local)',
    Tires: 'Harbor Freight',
    Electronics: 'Amazon',
    Packaging: 'Uline'
  }
  return suppliers[category] || 'TBD'
}

/**
 * Calculate cost to order an item
 */
function calculateItemOrderCost(item) {
  if (item.category === 'Filament') {
    // Filament: cost per 100g * suggested qty / 100
    return (item.cost * item.suggestedOrderQty) / 100
  }

  // Other items: cost per unit * qty
  return item.cost * item.suggestedOrderQty
}

/**
 * Update component reorder settings
 * @param {string} id - Component ID
 * @param {Object} settings - { reorderPoint, reorderQuantity, leadTime }
 * @param {string} updatedBy - User email
 */
export async function updateReorderSettings(id, settings, updatedBy) {
  const { saveComponent, getComponentById } = await import('./components-service')

  try {
    const component = await getComponentById(id)
    if (!component) {
      throw new Error(`Component not found: ${id}`)
    }

    const updatedComponent = {
      ...component,
      reorderPoint: settings.reorderPoint,
      reorderQuantity: settings.reorderQuantity,
      leadTime: settings.leadTime,
      supplier: settings.supplier
    }

    await saveComponent(id, updatedComponent, updatedBy)
  } catch (error) {
    console.error('Error updating reorder settings:', error)
    throw error
  }
}
