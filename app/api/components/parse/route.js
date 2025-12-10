import { NextResponse } from 'next/server'

/**
 * Smart Text Parser for Inventory Updates
 * Parses natural language like: "1000g blue bambu pla 15.99"
 */

/**
 * POST /api/components/parse
 * Parse natural language inventory text and return structured component data
 */
export async function POST(request) {
  try {
    const { text } = await request.json()

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request: text required' },
        { status: 400 }
      )
    }

    const lines = text.split('\n').filter(line => line.trim())
    const parsed = []
    const errors = []

    for (const line of lines) {
      try {
        const result = parseInventoryLine(line)
        if (result) {
          parsed.push(result)
        }
      } catch (error) {
        errors.push({ line, error: error.message })
      }
    }

    return NextResponse.json({
      success: true,
      parsed,
      errors,
      count: parsed.length
    })
  } catch (error) {
    console.error('API Error parsing inventory:', error)
    return NextResponse.json(
      { error: 'Failed to parse inventory', details: error.message },
      { status: 500 }
    )
  }
}

/**
 * Parse a single inventory line into structured component data
 * Examples:
 *   "1000g blue bambu pla 15.99" → Blue PLA, 1000g on hand, $1.60/100g
 *   "800g purple bambu pla 15.99" → Purple PLA (partial spool), $1.60/100g
 *   "500g support material 25.99" → Support material, $5.20/100g
 *   "200g abs-gf red 15.99" → ABS-GF Red, $1.60/100g (but actually 1kg spool)
 */
function parseInventoryLine(line) {
  // Normalize the line
  line = line.trim().toLowerCase()

  // Extract weight (1000g, 1kg, 800g, etc.)
  const weightMatch = line.match(/(\d+)\s*(g|kg|grams?)/)
  if (!weightMatch) {
    throw new Error('Could not find weight (e.g., 1000g, 1kg)')
  }

  let weightInGrams = parseInt(weightMatch[1])
  if (weightMatch[2].startsWith('kg')) {
    weightInGrams *= 1000
  }

  // Extract price ($15.99, 15.99, etc.)
  const priceMatch = line.match(/\$?(\d+\.?\d*)/)
  if (!priceMatch) {
    throw new Error('Could not find price (e.g., 15.99)')
  }
  const price = parseFloat(priceMatch[1])

  // Remove weight and price from line to get material description
  let description = line
    .replace(weightMatch[0], '')
    .replace(priceMatch[0], '')
    .trim()

  // Parse material type and color
  const { type, color, category, name, spoolSize } = parseMaterialDescription(description, weightInGrams, price)

  // Calculate cost per 100g based on full spool size
  const costPer100g = (price / spoolSize) * 100

  // Generate component ID
  const id = generateComponentId(type, color)

  // Determine notes
  const notes = weightInGrams === spoolSize
    ? `${spoolSize}g spool @ $${price.toFixed(2)} (full spool)`
    : `${spoolSize}g spool @ $${price.toFixed(2)} (${weightInGrams}g remaining)`

  return {
    id,
    name,
    type,
    color,
    category,
    cost: parseFloat(costPer100g.toFixed(2)),
    unit: 'per 100g',
    onHand: weightInGrams,
    notes,
    purchasePrice: price,
    spoolSize
  }
}

/**
 * Parse material description to extract type, color, etc.
 */
function parseMaterialDescription(description, onHand, price) {
  // Common patterns
  const patterns = {
    // PLA patterns
    pla: /(?:pla|bambu.*pla)\s+(blue|purple|orange|red|green|white|black|yellow)/,
    // PETG patterns
    petg: /petg\s+(black|blue|red|green|white|clear|natural)/,
    // TPU patterns
    tpu: /tpu\s+(black|blue|red|green|white|clear)/,
    // ABS-GF patterns
    absGf: /(?:abs[-\s]?gf|abs[-\s]?glass[-\s]?filled?)\s+(red|blue|green|yellow|black|white|bambu)/,
    // Support material
    support: /support\s*(?:material)?/
  }

  // Check each pattern
  for (const [key, regex] of Object.entries(patterns)) {
    const match = description.match(regex)
    if (match) {
      switch (key) {
        case 'pla': {
          const color = capitalize(match[1])
          // Determine if it's Bambu Lab or generic
          const isBambu = description.includes('bambu')
          const prefix = isBambu ? 'Bambu' : ''
          return {
            type: 'PLA',
            color,
            category: 'Filament',
            name: `PLA ${prefix ? prefix + ' ' : ''}${color} (100g)`,
            spoolSize: guessSpoolSize(onHand, price, 'PLA')
          }
        }
        case 'petg': {
          const color = capitalize(match[1])
          return {
            type: 'PETG',
            color,
            category: 'Filament',
            name: `PETG ${color} (100g)`,
            spoolSize: guessSpoolSize(onHand, price, 'PETG')
          }
        }
        case 'tpu': {
          const color = capitalize(match[1])
          return {
            type: 'TPU',
            color,
            category: 'Filament',
            name: `TPU ${color} (100g)`,
            spoolSize: guessSpoolSize(onHand, price, 'TPU')
          }
        }
        case 'absGf': {
          const color = capitalize(match[1])
          return {
            type: 'ABS-GF',
            color,
            category: 'Filament',
            name: `ABS-GF ${color} (100g)`,
            spoolSize: guessSpoolSize(onHand, price, 'ABS-GF')
          }
        }
        case 'support': {
          return {
            type: 'Support',
            color: 'Natural',
            category: 'Filament',
            name: 'Support Material Bambu (100g)',
            spoolSize: guessSpoolSize(onHand, price, 'Support')
          }
        }
      }
    }
  }

  // Fallback - couldn't identify material
  throw new Error(`Could not identify material type from: "${description}"`)
}

/**
 * Guess the full spool size based on onHand quantity and price
 * Most Bambu Lab spools are 1kg, support is 500g
 */
function guessSpoolSize(onHand, price, type) {
  // If support material, usually 500g spools
  if (type === 'Support') {
    return 500
  }

  // If price is ~$16-20, likely 1kg spool
  if (price >= 14 && price <= 25) {
    return 1000
  }

  // If on hand is close to common sizes, use that
  if (onHand >= 900) return 1000  // Full or nearly full 1kg
  if (onHand >= 400 && onHand <= 600) return 500  // 500g spool
  if (onHand >= 200 && onHand <= 300) return 250  // Small spool

  // Default: assume 1kg spool if we have partial
  if (onHand < 1000) return 1000

  // Otherwise use onHand as spool size (full spool)
  return onHand
}

/**
 * Generate component ID from type and color
 */
function generateComponentId(type, color) {
  const typeSlug = type.toLowerCase().replace(/[-\s]/g, '-')
  const colorSlug = color.toLowerCase().replace(/\s+/g, '-')

  // Special handling for Bambu Lab
  if (colorSlug.includes('bambu')) {
    return `${typeSlug}-bambu-${colorSlug.replace('bambu-', '')}-100g`
  }

  return `${typeSlug}-${colorSlug}-100g`
}

/**
 * Capitalize first letter
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
