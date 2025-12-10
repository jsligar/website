import { NextResponse } from 'next/server'
import {
  createPurchaseOrder,
  getPurchaseOrders,
  getPurchaseOrderById,
  updatePOStatus,
  receivePurchaseOrder,
  getPOStats,
  validatePOData
} from '@/lib/purchase-orders'

/**
 * GET /api/purchase-orders
 * Fetch purchase orders with optional filters
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const supplier = searchParams.get('supplier')
    const id = searchParams.get('id')
    const getStats = searchParams.get('stats') === 'true'

    // Get stats
    if (getStats) {
      const stats = await getPOStats()
      return NextResponse.json({ success: true, stats })
    }

    // Get single PO by ID
    if (id) {
      const po = await getPurchaseOrderById(id)
      if (!po) {
        return NextResponse.json(
          { error: 'Purchase order not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({ success: true, po })
    }

    // Get filtered list of POs
    const filters = {}
    if (status) filters.status = status
    if (supplier) filters.supplier = supplier

    const pos = await getPurchaseOrders(filters)

    return NextResponse.json({ success: true, pos })
  } catch (error) {
    console.error('API Error fetching purchase orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch purchase orders', details: error.message },
      { status: 500 }
    )
  }
}

/**
 * POST /api/purchase-orders
 * Create a new purchase order
 */
export async function POST(request) {
  try {
    const body = await request.json()
    const { poData, createdBy } = body

    // Validate
    const validation = validatePOData(poData)
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      )
    }

    // Create PO
    const poId = await createPurchaseOrder(poData, createdBy || 'admin')

    return NextResponse.json({
      success: true,
      message: 'Purchase order created',
      poId
    })
  } catch (error) {
    console.error('API Error creating purchase order:', error)
    return NextResponse.json(
      { error: 'Failed to create purchase order', details: error.message },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/purchase-orders
 * Update purchase order status or receive PO
 */
export async function PATCH(request) {
  try {
    const body = await request.json()
    const { poId, action, status, updatedBy } = body

    if (!poId) {
      return NextResponse.json(
        { error: 'PO ID required' },
        { status: 400 }
      )
    }

    // Handle receive action
    if (action === 'receive') {
      const result = await receivePurchaseOrder(poId, updatedBy || 'admin')
      return NextResponse.json({
        success: true,
        message: 'Purchase order received and inventory updated',
        result
      })
    }

    // Handle status update
    if (status) {
      await updatePOStatus(poId, status, updatedBy || 'admin')
      return NextResponse.json({
        success: true,
        message: `Purchase order status updated to ${status}`
      })
    }

    return NextResponse.json(
      { error: 'No action or status provided' },
      { status: 400 }
    )
  } catch (error) {
    console.error('API Error updating purchase order:', error)
    return NextResponse.json(
      { error: 'Failed to update purchase order', details: error.message },
      { status: 500 }
    )
  }
}
