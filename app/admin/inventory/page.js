'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function InventoryManagement() {
  const { user, isAdmin } = useAuth()
  const router = useRouter()

  // Tab management
  const [activeTab, setActiveTab] = useState('update') // update, alerts, pos

  // Quick Update states
  const [inputText, setInputText] = useState('')
  const [parsedComponents, setParsedComponents] = useState([])
  const [parseErrors, setParseErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [saveMessage, setSaveMessage] = useState(null)

  // Low Stock states
  const [lowStockItems, setLowStockItems] = useState([])
  const [summary, setSummary] = useState(null)
  const [poSuggestions, setPoSuggestions] = useState([])
  const [alertsLoading, setAlertsLoading] = useState(false)

  // Redirect if not admin
  if (!isAdmin) {
    router.push('/admin/login')
    return null
  }

  // Load low stock data when switching to alerts tab
  useEffect(() => {
    if (activeTab === 'alerts' || activeTab === 'pos') {
      fetchLowStockData()
    }
  }, [activeTab])

  // ============================================================================
  // QUICK UPDATE TAB FUNCTIONS
  // ============================================================================

  const handleParse = async () => {
    if (!inputText.trim()) {
      alert('Please enter inventory data')
      return
    }

    setIsLoading(true)
    setSaveMessage(null)

    try {
      const response = await fetch('/api/components/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText })
      })

      const data = await response.json()

      if (data.success) {
        setParsedComponents(data.parsed)
        setParseErrors(data.errors)

        if (data.parsed.length === 0) {
          alert('No components parsed. Check your format.')
        }
      } else {
        alert(`Parse error: ${data.error}`)
      }
    } catch (error) {
      console.error('Parse error:', error)
      alert('Failed to parse inventory')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (parsedComponents.length === 0) {
      alert('No components to save. Parse first.')
      return
    }

    if (!confirm(`Save ${parsedComponents.length} components to Firestore?`)) {
      return
    }

    setIsLoading(true)
    setSaveMessage(null)

    try {
      const response = await fetch('/api/components', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          components: parsedComponents,
          updatedBy: user.email
        })
      })

      const data = await response.json()

      if (data.success) {
        setSaveMessage({ type: 'success', text: data.message })
        setInputText('')
        setParsedComponents([])
        setParseErrors([])
      } else {
        setSaveMessage({ type: 'error', text: data.error })
      }
    } catch (error) {
      console.error('Save error:', error)
      setSaveMessage({ type: 'error', text: 'Failed to save components' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    if (parsedComponents.length > 0) {
      if (!confirm('Clear parsed data and start over?')) {
        return
      }
    }
    setInputText('')
    setParsedComponents([])
    setParseErrors([])
    setSaveMessage(null)
  }

  // ============================================================================
  // LOW STOCK ALERTS TAB FUNCTIONS
  // ============================================================================

  const fetchLowStockData = async () => {
    setAlertsLoading(true)
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
      setAlertsLoading(false)
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

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="min-h-screen bg-nerd-dark text-white">
      {/* Header */}
      <div className="bg-nerd-darker border-b border-nerd-gray">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Inventory Management</h1>
            <p className="text-sm text-nerd-gray">Update stock, monitor alerts, and manage purchase orders</p>
          </div>
          <Link
            href="/admin/dashboard"
            className="px-4 py-2 bg-nerd-gray hover:bg-gray-600 rounded"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-nerd-darker border-b border-nerd-gray">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('update')}
              className={`px-6 py-3 font-bold border-b-2 transition ${
                activeTab === 'update'
                  ? 'border-nerd-red text-white'
                  : 'border-transparent text-nerd-gray hover:text-white'
              }`}
            >
              📦 Quick Update
            </button>
            <button
              onClick={() => setActiveTab('alerts')}
              className={`px-6 py-3 font-bold border-b-2 transition ${
                activeTab === 'alerts'
                  ? 'border-nerd-red text-white'
                  : 'border-transparent text-nerd-gray hover:text-white'
              }`}
            >
              ⚠️ Low Stock Alerts
              {summary && summary.total > 0 && (
                <span className="ml-2 px-2 py-1 bg-red-600 rounded-full text-xs">
                  {summary.total}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('pos')}
              className={`px-6 py-3 font-bold border-b-2 transition ${
                activeTab === 'pos'
                  ? 'border-nerd-red text-white'
                  : 'border-transparent text-nerd-gray hover:text-white'
              }`}
            >
              🛒 Purchase Orders
              {poSuggestions.length > 0 && (
                <span className="ml-2 px-2 py-1 bg-yellow-600 rounded-full text-xs">
                  {poSuggestions.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* QUICK UPDATE TAB */}
        {activeTab === 'update' && (
          <div>
            {/* Instructions */}
            <div className="bg-nerd-darker border border-nerd-gray rounded-lg p-6 mb-6">
              <h2 className="text-lg font-bold mb-3">How to Use:</h2>
              <ol className="list-decimal list-inside space-y-2 text-nerd-gray">
                <li>Paste your inventory updates below (one per line)</li>
                <li>Format: <code className="bg-nerd-dark px-2 py-1 rounded text-nerd-red">1000g blue bambu pla 15.99</code></li>
                <li>Click "Parse & Preview" to see what will be saved</li>
                <li>Review the preview and click "Save to Firestore"</li>
              </ol>

              <div className="mt-4 p-4 bg-nerd-dark rounded border-l-4 border-nerd-red">
                <p className="font-bold mb-2">Examples:</p>
                <pre className="text-sm text-nerd-gray space-y-1">
                  <div>1000g blue bambu pla 15.99</div>
                  <div>800g purple bambu pla 15.99</div>
                  <div>200g orange bambu pla 15.99</div>
                  <div>500g support material 25.99</div>
                  <div>1kg abs-gf red 15.99</div>
                </pre>
              </div>
            </div>

            {/* Input Section */}
            <div className="bg-nerd-darker border border-nerd-gray rounded-lg p-6 mb-6">
              <label className="block font-bold mb-2">Paste Inventory Data:</label>
              <textarea
                className="w-full h-48 bg-nerd-dark border border-nerd-gray rounded p-4 text-white font-mono text-sm focus:outline-none focus:border-nerd-red"
                placeholder="1000g blue bambu pla 15.99&#10;800g purple bambu pla 15.99&#10;200g orange bambu pla 15.99&#10;500g support material 25.99"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isLoading}
              />

              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleParse}
                  disabled={isLoading || !inputText.trim()}
                  className="px-6 py-2 bg-nerd-red hover:bg-red-600 rounded font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Parsing...' : 'Parse & Preview'}
                </button>
                <button
                  onClick={handleClear}
                  disabled={isLoading}
                  className="px-6 py-2 bg-nerd-gray hover:bg-gray-600 rounded disabled:opacity-50"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Save Message */}
            {saveMessage && (
              <div className={`p-4 rounded-lg mb-6 ${
                saveMessage.type === 'success'
                  ? 'bg-green-900 border border-green-700 text-green-100'
                  : 'bg-red-900 border border-red-700 text-red-100'
              }`}>
                {saveMessage.text}
              </div>
            )}

            {/* Parse Errors */}
            {parseErrors.length > 0 && (
              <div className="bg-red-900 border border-red-700 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-red-100 mb-2">Parse Errors:</h3>
                <ul className="space-y-1 text-sm text-red-200">
                  {parseErrors.map((err, i) => (
                    <li key={i}>
                      <code className="bg-red-950 px-2 py-1 rounded">{err.line}</code>
                      <span className="ml-2">- {err.error}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Preview Section */}
            {parsedComponents.length > 0 && (
              <div className="bg-nerd-darker border border-nerd-gray rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Preview ({parsedComponents.length} components)</h2>
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Saving...' : `💾 Save to Firestore`}
                  </button>
                </div>

                <div className="space-y-3">
                  {parsedComponents.map((comp, i) => (
                    <div key={i} className="bg-nerd-dark border border-nerd-gray rounded p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="px-2 py-1 bg-nerd-red rounded text-xs font-bold">
                              {comp.category}
                            </span>
                            <h3 className="font-bold text-lg">{comp.name}</h3>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-nerd-gray">ID:</span>
                              <code className="ml-2 text-white">{comp.id}</code>
                            </div>
                            <div>
                              <span className="text-nerd-gray">Type:</span>
                              <span className="ml-2 text-white">{comp.type}</span>
                            </div>
                            <div>
                              <span className="text-nerd-gray">Color:</span>
                              <span className="ml-2 text-white">{comp.color}</span>
                            </div>
                            <div>
                              <span className="text-nerd-gray">Cost:</span>
                              <span className="ml-2 text-green-400 font-bold">
                                ${comp.cost.toFixed(2)}/100g
                              </span>
                            </div>
                            <div>
                              <span className="text-nerd-gray">On Hand:</span>
                              <span className="ml-2 text-white font-bold">{comp.onHand}g</span>
                            </div>
                            <div>
                              <span className="text-nerd-gray">Purchase:</span>
                              <span className="ml-2 text-white">
                                ${comp.purchasePrice.toFixed(2)} ({comp.spoolSize}g spool)
                              </span>
                            </div>
                          </div>

                          {comp.notes && (
                            <div className="mt-2 text-sm text-nerd-gray">
                              <span className="font-bold">Notes:</span> {comp.notes}
                            </div>
                          )}
                        </div>

                        <div className="text-green-400 text-2xl ml-4">✓</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="px-8 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Saving...' : `💾 Save All ${parsedComponents.length} Components`}
                  </button>
                </div>
              </div>
            )}

            {/* Empty State */}
            {parsedComponents.length === 0 && !isLoading && (
              <div className="text-center py-12 text-nerd-gray">
                <p className="text-lg">Paste your inventory data above and click "Parse & Preview"</p>
              </div>
            )}
          </div>
        )}

        {/* LOW STOCK ALERTS TAB */}
        {activeTab === 'alerts' && (
          <div>
            {/* Summary Cards */}
            {summary && (
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
            )}

            {alertsLoading ? (
              <div className="text-center py-12 text-nerd-gray">Loading alerts...</div>
            ) : lowStockItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-green-400">All Stock Levels Good!</h3>
                <p className="text-nerd-gray mt-2">No items below reorder point</p>
              </div>
            ) : (
              <div className="space-y-3">
                {lowStockItems.map((item) => (
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
                ))}
              </div>
            )}
          </div>
        )}

        {/* PURCHASE ORDERS TAB */}
        {activeTab === 'pos' && (
          <div>
            {alertsLoading ? (
              <div className="text-center py-12 text-nerd-gray">Loading suggestions...</div>
            ) : poSuggestions.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-green-400">No Purchase Orders Needed</h3>
                <p className="text-nerd-gray mt-2">All inventory levels are healthy</p>
              </div>
            ) : (
              <div className="space-y-4">
                {poSuggestions.map((suggestion, idx) => (
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
                      <button
                        onClick={() => alert('PO creation coming soon!')}
                        className="px-6 py-2 bg-nerd-red hover:bg-red-600 rounded font-bold"
                      >
                        Create Purchase Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
