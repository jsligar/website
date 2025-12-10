'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LowStockAlerts() {
  const { user, isAdmin } = useAuth()
  const router = useRouter()

  const [lowStockItems, setLowStockItems] = useState([])
  const [summary, setSummary] = useState(null)
  const [poSuggestions, setPoSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState('items') // items, suggestions

  // Redirect if not admin
  if (!isAdmin) {
    router.push('/admin/login')
    return null
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      // Fetch low stock items
      const itemsRes = await fetch('/api/inventory/low-stock?type=items')
      const itemsData = await itemsRes.json()
      if (itemsData.success) {
        setLowStockItems(itemsData.data)
      }

      // Fetch summary
      const summaryRes = await fetch('/api/inventory/low-stock?type=summary')
      const summaryData = await summaryRes.json()
      if (summaryData.success) {
        setSummary(summaryData.data)
      }

      // Fetch PO suggestions
      const suggestionsRes = await fetch('/api/inventory/low-stock?type=suggestions')
      const suggestionsData = await suggestionsRes.json()
      if (suggestionsData.success) {
        setPoSuggestions(suggestionsData.data)
      }
    } catch (error) {
      console.error('Error fetching low stock data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (stockLevel) => {
    const colors = {
      OUT_OF_STOCK: 'bg-red-600',
      CRITICAL: 'bg-red-500',
      LOW: 'bg-orange-500',
      REORDER: 'bg-yellow-500',
      OK: 'bg-green-500'
    }

    return (
      <span className={`px-2 py-1 rounded text-xs font-bold text-white ${colors[stockLevel.status]}`}>
        {stockLevel.label}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-nerd-dark text-white">
      {/* Header */}
      <div className="bg-nerd-darker border-b border-nerd-gray">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Low Stock Alerts</h1>
            <p className="text-sm text-nerd-gray">Monitor inventory and create purchase orders</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/inventory"
              className="px-4 py-2 bg-nerd-gray hover:bg-gray-600 rounded"
            >
              Update Inventory
            </Link>
            <Link
              href="/admin/dashboard"
              className="px-4 py-2 bg-nerd-gray hover:bg-gray-600 rounded"
            >
              ← Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-nerd-darker border border-nerd-gray rounded-lg p-4">
              <div className="text-3xl font-bold text-nerd-red">{summary.total}</div>
              <div className="text-sm text-nerd-gray">Total Low Stock</div>
            </div>
            <div className="bg-nerd-darker border border-red-600 rounded-lg p-4">
              <div className="text-3xl font-bold text-red-500">{summary.outOfStock}</div>
              <div className="text-sm text-nerd-gray">Out of Stock</div>
            </div>
            <div className="bg-nerd-darker border border-red-500 rounded-lg p-4">
              <div className="text-3xl font-bold text-red-400">{summary.critical}</div>
              <div className="text-sm text-nerd-gray">Critical</div>
            </div>
            <div className="bg-nerd-darker border border-orange-500 rounded-lg p-4">
              <div className="text-3xl font-bold text-orange-400">{summary.low}</div>
              <div className="text-sm text-nerd-gray">Low</div>
            </div>
            <div className="bg-nerd-darker border border-yellow-500 rounded-lg p-4">
              <div className="text-3xl font-bold text-yellow-400">{summary.reorder}</div>
              <div className="text-sm text-nerd-gray">Reorder Soon</div>
            </div>
          </div>

          {/* Category Breakdown */}
          {summary.byCategory && Object.keys(summary.byCategory).length > 0 && (
            <div className="bg-nerd-darker border border-nerd-gray rounded-lg p-4 mb-6">
              <h3 className="font-bold mb-3">By Category:</h3>
              <div className="flex flex-wrap gap-3">
                {Object.entries(summary.byCategory).map(([category, count]) => (
                  <div key={category} className="px-3 py-1 bg-nerd-dark rounded">
                    <span className="font-bold text-nerd-red">{count}</span>
                    <span className="ml-2 text-nerd-gray">{category}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-2 border-b border-nerd-gray mb-6">
          <button
            onClick={() => setSelectedTab('items')}
            className={`px-6 py-3 font-bold border-b-2 ${
              selectedTab === 'items'
                ? 'border-nerd-red text-white'
                : 'border-transparent text-nerd-gray hover:text-white'
            }`}
          >
            Low Stock Items ({lowStockItems.length})
          </button>
          <button
            onClick={() => setSelectedTab('suggestions')}
            className={`px-6 py-3 font-bold border-b-2 ${
              selectedTab === 'suggestions'
                ? 'border-nerd-red text-white'
                : 'border-transparent text-nerd-gray hover:text-white'
            }`}
          >
            Purchase Order Suggestions ({poSuggestions.length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        {isLoading ? (
          <div className="text-center py-12 text-nerd-gray">Loading...</div>
        ) : (
          <>
            {/* Low Stock Items Tab */}
            {selectedTab === 'items' && (
              <div className="space-y-3">
                {lowStockItems.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">✅</div>
                    <h3 className="text-xl font-bold text-green-400">All Stock Levels Good!</h3>
                    <p className="text-nerd-gray mt-2">No items below reorder point</p>
                  </div>
                ) : (
                  lowStockItems.map((item) => (
                    <div key={item.id} className="bg-nerd-darker border border-nerd-gray rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {getStatusBadge(item.stockLevel)}
                            <span className="px-2 py-1 bg-nerd-dark rounded text-xs">{item.category}</span>
                            <h3 className="font-bold">{item.name}</h3>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-3">
                            <div>
                              <div className="text-nerd-gray">On Hand:</div>
                              <div className="font-bold text-lg">{item.onHand}g</div>
                            </div>
                            <div>
                              <div className="text-nerd-gray">Reorder Point:</div>
                              <div className="font-bold">{item.reorderPoint}g</div>
                            </div>
                            <div>
                              <div className="text-nerd-gray">Suggested Order:</div>
                              <div className="font-bold text-green-400">{item.suggestedOrderQty}g</div>
                            </div>
                            <div>
                              <div className="text-nerd-gray">Lead Time:</div>
                              <div className="font-bold">{item.leadTime} days</div>
                            </div>
                          </div>

                          {item.daysUntilOut && (
                            <div className="mt-3 text-sm text-orange-400">
                              ⚠️ Estimated {item.daysUntilOut} days until out of stock
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* PO Suggestions Tab */}
            {selectedTab === 'suggestions' && (
              <div className="space-y-4">
                {poSuggestions.length === 0 ? (
                  <div className="text-center py-12 text-nerd-gray">
                    No purchase orders needed
                  </div>
                ) : (
                  poSuggestions.map((suggestion, idx) => (
                    <div key={idx} className="bg-nerd-darker border border-nerd-gray rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold">{suggestion.category}</h3>
                          <p className="text-nerd-gray">Supplier: {suggestion.supplier}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-400">
                            ${suggestion.estimatedCost.toFixed(2)}
                          </div>
                          <div className="text-sm text-nerd-gray">
                            {suggestion.totalItems} items • {suggestion.leadTime} day lead time
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {suggestion.items.map((item, i) => (
                          <div key={i} className="flex items-center justify-between bg-nerd-dark rounded p-3 text-sm">
                            <div className="flex-1">
                              <div className="font-bold">{item.name}</div>
                              <div className="text-nerd-gray">
                                On hand: {item.onHand}g | Reorder at: {item.reorderPoint}g
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold">{item.suggestedQty}g</div>
                              <div className="text-green-400">${item.totalCost.toFixed(2)}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 flex justify-end">
                        <Link
                          href={`/admin/purchase-orders/new?category=${suggestion.category}`}
                          className="px-6 py-2 bg-nerd-red hover:bg-red-600 rounded font-bold"
                        >
                          Create Purchase Order
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
