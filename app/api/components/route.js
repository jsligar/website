import { NextResponse } from 'next/server'
import { getComponents, saveComponent, batchSaveComponents } from '@/lib/components-service'

/**
 * GET /api/components
 * Fetch all components from Firestore
 */
export async function GET() {
  try {
    const components = await getComponents()
    return NextResponse.json({ components })
  } catch (error) {
    console.error('API Error fetching components:', error)
    return NextResponse.json(
      { error: 'Failed to fetch components' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/components
 * Save single component or batch import from smart text parser
 */
export async function POST(request) {
  try {
    const body = await request.json()
    const { components, updatedBy } = body

    if (!components || !Array.isArray(components)) {
      return NextResponse.json(
        { error: 'Invalid request: components array required' },
        { status: 400 }
      )
    }

    // Batch save all components
    const results = await batchSaveComponents(components, updatedBy || 'admin')

    const successCount = results.filter(r => r.success).length
    const failureCount = results.filter(r => !r.success).length

    return NextResponse.json({
      success: true,
      message: `Saved ${successCount} components${failureCount > 0 ? `, ${failureCount} failed` : ''}`,
      results
    })
  } catch (error) {
    console.error('API Error saving components:', error)
    return NextResponse.json(
      { error: 'Failed to save components', details: error.message },
      { status: 500 }
    )
  }
}
