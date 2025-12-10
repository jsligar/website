import { NextResponse } from 'next/server'
import { getLowStockItems, getLowStockSummary, generatePOSuggestions } from '@/lib/inventory-alerts'

/**
 * GET /api/inventory/low-stock
 * Get low stock items and statistics
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'items' // items, summary, or suggestions

    let data

    switch (type) {
      case 'summary':
        data = await getLowStockSummary()
        break
      case 'suggestions':
        data = await generatePOSuggestions()
        break
      case 'items':
      default:
        data = await getLowStockItems()
        break
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('API Error fetching low stock:', error)
    return NextResponse.json(
      { error: 'Failed to fetch low stock data', details: error.message },
      { status: 500 }
    )
  }
}
