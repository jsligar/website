// Component and material costs for COGS calculations
// Prices updated to reflect bulk purchasing (100+ quantity) from suppliers like Fastenal, McMaster-Carr
// Last updated: 2025-12-10

export const components = [
  // ============================================================================
  // FILAMENTS (standardized to 100g units)
  // ============================================================================
  // Stored with type and color metadata for BOM calculations

  // Basic PLA
  { id: 'pla-white-100g', name: 'PLA White (100g)', type: 'PLA', color: 'White', category: 'Filament', cost: 1.40, unit: 'per 100g', onHand: 0 },
  { id: 'pla-black-100g', name: 'PLA Black (100g)', type: 'PLA', color: 'Black', category: 'Filament', cost: 1.40, unit: 'per 100g', onHand: 0 },
  { id: 'pla-red-100g', name: 'PLA Red (100g)', type: 'PLA', color: 'Red', category: 'Filament', cost: 1.50, unit: 'per 100g', onHand: 0 },

  // Bambu Lab PLA (actual purchase prices)
  { id: 'pla-bambu-blue-100g', name: 'PLA Bambu Blue (100g)', type: 'PLA', color: 'Blue', category: 'Filament', cost: 1.60, unit: 'per 100g', onHand: 1000, notes: '1000g spool @ $15.99' },
  { id: 'pla-bambu-purple-100g', name: 'PLA Bambu Purple (100g)', type: 'PLA', color: 'Purple', category: 'Filament', cost: 2.00, unit: 'per 100g', onHand: 800, notes: '800g spool @ $15.99' },
  { id: 'pla-bambu-orange-100g', name: 'PLA Bambu Orange (100g)', type: 'PLA', color: 'Orange', category: 'Filament', cost: 8.00, unit: 'per 100g', onHand: 200, notes: '200g spool @ $15.99 (small spool premium)' },
  { id: 'pla-bambu-red-100g', name: 'PLA Bambu Red (100g)', type: 'PLA', color: 'Red', category: 'Filament', cost: 2.00, unit: 'per 100g', onHand: 800, notes: '800g spool @ $15.99' },
  { id: 'pla-bambu-green-100g', name: 'PLA Bambu Green (100g)', type: 'PLA', color: 'Green', category: 'Filament', cost: 2.00, unit: 'per 100g', onHand: 800, notes: '800g spool @ $15.99' },
  { id: 'pla-bambu-white-100g', name: 'PLA Bambu White (100g)', type: 'PLA', color: 'White', category: 'Filament', cost: 2.00, unit: 'per 100g', onHand: 800, notes: '800g spool @ $15.99' },

  // Support Material
  { id: 'support-bambu-100g', name: 'Support Material Bambu (100g)', type: 'Support', color: 'Natural', category: 'Filament', cost: 5.20, unit: 'per 100g', onHand: 500, notes: '500g spool @ $25.99' },

  // PETG
  { id: 'petg-black-100g', name: 'PETG Black (100g)', type: 'PETG', color: 'Black', category: 'Filament', cost: 2.10, unit: 'per 100g', onHand: 0 },

  // TPU
  { id: 'tpu-black-100g', name: 'TPU Black (100g)', type: 'TPU', color: 'Black', category: 'Filament', cost: 2.40, unit: 'per 100g', onHand: 0 },

  // ABS-GF
  { id: 'abs-gf-bambu-100g', name: 'ABS-GF Bambu (100g)', type: 'ABS-GF', color: 'Bambu', category: 'Filament', cost: 2.40, unit: 'per 100g', onHand: 0 },
  { id: 'abs-gf-red-100g', name: 'ABS-GF Red (100g)', type: 'ABS-GF', color: 'Red', category: 'Filament', cost: 2.39, unit: 'per 100g', onHand: 2000 },
  { id: 'abs-gf-blue-100g', name: 'ABS-GF Blue (100g)', type: 'ABS-GF', color: 'Blue', category: 'Filament', cost: 2.39, unit: 'per 100g', onHand: 2000 },
  { id: 'abs-gf-yellow-100g', name: 'ABS-GF Yellow (100g)', type: 'ABS-GF', color: 'Yellow', category: 'Filament', cost: 2.39, unit: 'per 100g', onHand: 2000 },
  { id: 'abs-gf-green-100g', name: 'ABS-GF Green (100g)', type: 'ABS-GF', color: 'Green', category: 'Filament', cost: 2.39, unit: 'per 100g', onHand: 2000 },

  // ============================================================================
  // HARDWARE (BULK PRICING - 100+ quantity from Fastenal/McMaster)
  // ============================================================================
  // Previous retail prices shown in comments for reference

  { id: 'hex-bolt-m8x30', name: 'Hex Bolt M8x30', category: 'Hardware', cost: 0.15, unit: 'each', onHand: 0 }, // was $0.35
  { id: 'hex-bolt-m8x40', name: 'Hex Bolt M8x40', category: 'Hardware', cost: 0.18, unit: 'each', onHand: 0 }, // was $0.40
  { id: 'hex-bolt-m10x40', name: 'Hex Bolt M10x40', category: 'Hardware', cost: 0.25, unit: 'each', onHand: 0 }, // was $0.50
  { id: 'nut-m8-nylock', name: 'M8 Nylock Nut', category: 'Hardware', cost: 0.05, unit: 'each', onHand: 0 }, // was $0.15
  { id: 'nut-m10-nylock', name: 'M10 Nylock Nut', category: 'Hardware', cost: 0.08, unit: 'each', onHand: 0 }, // was $0.20
  { id: 'washer-m8-flat', name: 'M8 Flat Washer', category: 'Hardware', cost: 0.03, unit: 'each', onHand: 0 }, // was $0.08
  { id: 'washer-m8-lock', name: 'M8 Lock Washer', category: 'Hardware', cost: 0.04, unit: 'each', onHand: 0 }, // was $0.10
  { id: 'bearing-608zz', name: 'Bearing 608ZZ', category: 'Hardware', cost: 1.25, unit: 'each', onHand: 0 },
  { id: 'bearing-6001zz', name: 'Bearing 6001ZZ', category: 'Hardware', cost: 2.50, unit: 'each', onHand: 0 },
  { id: 'm8-socket-head-cap-screws-40mm', name: 'M8-1.25 x 40MM Socket Head Cap Screws, Allen Socket Drive, Stainless Steel 18-8 (304), Full Thread', category: 'Hardware', cost: 0.30, unit: 'each', onHand: 0 }, // was $0.849 - bulk stainless pricing

  // ============================================================================
  // TIRES & WHEELS
  // ============================================================================

  { id: 'tire-12inch-rubber', name: '12" Rubber Tire', category: 'Tires', cost: 18.00, unit: 'each', onHand: 0 },
  { id: 'tire-10inch-rubber', name: '10" Rubber Tire', category: 'Tires', cost: 14.00, unit: 'each', onHand: 0 },
  { id: 'tire-foam-filled', name: 'Foam-Filled Tire', category: 'Tires', cost: 22.00, unit: 'each', onHand: 0 },
  { id: 'inner-tube-12inch', name: '12" Inner Tube', category: 'Tires', cost: 4.50, unit: 'each', onHand: 0 },
  { id: '10in-pneu-tire-steel-hub', name: '10IN PNEU TIRE STEEL HUB', category: 'Tires', cost: 8.99, unit: 'each', onHand: 0 },
  { id: '13in-pneu-tire-steel-hub', name: '13IN PNEU TIRE STEEL HUB', category: 'Tires', cost: 14.99, unit: 'each', onHand: 0 },
  { id: '4pk-atv-go-kart-tires-145-70-6', name: 'Set Of 4 ATV Go Kart Tires 145/70-6 With 6 inch Wheels Rims', category: 'Tires', cost: 177.39, unit: 'set', onHand: 0, notes: 'CRITICAL: Find cheaper supplier - target $120-140/set for healthy margins' },

  // ============================================================================
  // BATTERY ADAPTERS & ELECTRONICS
  // ============================================================================

  { id: 'dewalt-connector', name: 'DeWalt Battery Connector', category: 'Electronics', cost: 8.50, unit: 'each', onHand: 0 },
  { id: 'milwaukee-connector', name: 'Milwaukee Battery Connector', category: 'Electronics', cost: 8.50, unit: 'each', onHand: 0 },
  { id: 'makita-connector', name: 'Makita Battery Connector', category: 'Electronics', cost: 7.50, unit: 'each', onHand: 0 },
  { id: 'wire-12awg-red-1ft', name: '12 AWG Wire Red (1ft)', category: 'Electronics', cost: 0.50, unit: 'per foot', onHand: 0 },
  { id: 'wire-12awg-black-1ft', name: '12 AWG Wire Black (1ft)', category: 'Electronics', cost: 0.50, unit: 'per foot', onHand: 0 },
  { id: 'anderson-connector', name: 'Anderson Powerpole 30A', category: 'Electronics', cost: 2.25, unit: 'pair', onHand: 0 },
  { id: 'xt60-connector', name: 'XT60 Connector', category: 'Electronics', cost: 1.50, unit: 'pair', onHand: 0 },

  // ============================================================================
  // PACKAGING
  // ============================================================================

  { id: 'box-small', name: 'Small Shipping Box (8x6x4)', category: 'Packaging', cost: 1.25, unit: 'each', onHand: 0 },
  { id: 'box-medium', name: 'Medium Shipping Box (12x10x6)', category: 'Packaging', cost: 2.00, unit: 'each', onHand: 0 },
  { id: 'box-large', name: 'Large Shipping Box (18x14x10)', category: 'Packaging', cost: 3.50, unit: 'each', onHand: 0 },
  { id: 'bubble-wrap', name: 'Bubble Wrap', category: 'Packaging', cost: 0.75, unit: 'per order', onHand: 0 },
  { id: 'packing-peanuts', name: 'Packing Peanuts', category: 'Packaging', cost: 0.50, unit: 'per order', onHand: 0 },
  { id: 'thank-you-card', name: 'Thank You Card', category: 'Packaging', cost: 0.25, unit: 'each', onHand: 0 },

  // ============================================================================
  // LABOR & OVERHEAD (UPDATED TO REALISTIC RATES)
  // ============================================================================
  // Labor valued at $20/hour base rate
  // Previous unrealistic rates shown in comments

  { id: 'print-time-1hr', name: 'Print Time (1 hour)', category: 'Labor', cost: 4.00, unit: 'per hour', onHand: 0, notes: 'Includes machine depreciation, maintenance, and overhead' }, // was $2.00
  { id: 'assembly-time-15min', name: 'Assembly (15 min)', category: 'Labor', cost: 5.00, unit: 'per unit', onHand: 0, notes: 'Based on $20/hr labor rate' }, // was $3.00
  { id: 'assembly-time-30min', name: 'Assembly (30 min)', category: 'Labor', cost: 10.00, unit: 'per unit', onHand: 0, notes: 'Based on $20/hr labor rate' }, // was $6.00
  { id: 'quality-check', name: 'Quality Check', category: 'Labor', cost: 3.00, unit: 'per unit', onHand: 0, notes: 'Critical for customer satisfaction' }, // was $1.00
  { id: 'electricity-per-print', name: 'Electricity (per print)', category: 'Overhead', cost: 0.50, unit: 'per print', onHand: 0 },
]

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get component by ID
 */
export function getComponentById(id) {
  return components.find(c => c.id === id)
}

/**
 * Get components by category
 */
export function getComponentsByCategory(category) {
  return components.filter(c => c.category === category)
}

/**
 * Calculate total cost for a list of components
 * @param {Array} items - Array of {id, quantity} objects
 * @returns {number} Total cost
 */
export function calculateComponentCost(items) {
  return items.reduce((total, item) => {
    const component = getComponentById(item.id)
    if (!component) {
      console.warn(`Component not found: ${item.id}`)
      return total
    }
    return total + (component.cost * item.quantity)
  }, 0)
}

/**
 * Get all filament types
 */
export function getFilamentTypes() {
  return [...new Set(components
    .filter(c => c.category === 'Filament')
    .map(c => c.type)
  )]
}

/**
 * Get filaments by type
 */
export function getFilamentsByType(type) {
  return components.filter(c => c.category === 'Filament' && c.type === type)
}

// ============================================================================
// BULK PRICING NOTES
// ============================================================================
/*
HARDWARE BULK PURCHASING RECOMMENDATIONS:

Fastenal Bulk Pricing (100+ quantity):
- M8 Hex Bolts: ~$0.15-$0.20 each
- M8 Nylock Nuts: ~$0.05-$0.07 each
- M8 Washers: ~$0.03-$0.04 each
- Stainless Steel adds 20-30% to cost

McMaster-Carr Alternative:
- Similar pricing for 100+ quantity
- Faster shipping but slightly higher prices
- Better for smaller bulk orders (25-100)

Recommendations:
1. Order hardware in 100-500 quantity batches
2. Keep 2-3 months inventory on hand
3. Reorder when stock drops below 1 month supply
4. Consider local Fastenal branch for will-call pickup to save shipping

TIRE SOURCING - CRITICAL:
- Current ATV tire cost ($177.39/set) is too high
- Target: Find supplier at $120-140/set for 50%+ margins
- Options to explore:
  * Direct import from Alibaba (MOQ 50-100 sets)
  * Wholesale tire distributors
  * Negotiate volume pricing with current supplier

LABOR RATE JUSTIFICATION:
- $20/hour base rate is minimum for skilled assembly work
- Accounts for:
  * Direct labor time
  * Setup and cleanup
  * Rework/corrections
  * Training time
- Print time at $4/hr includes:
  * Machine depreciation ($1.50/hr)
  * Maintenance reserve ($1.00/hr)
  * Facility overhead ($1.00/hr)
  * Failed prints allowance ($0.50/hr)
*/
