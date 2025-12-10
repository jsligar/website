'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function InventoryManagement() {
  const { user, isAdmin } = useAuth()
  const router = useRouter()

  const [inputText, setInputText] = useState('')
  const [parsedComponents, setParsedComponents] = useState([])
  const [parseErrors, setParseErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [saveMessage, setSaveMessage] = useState(null)

  // Redirect if not admin
  if (!isAdmin) {
    router.push('/admin/login')
    return null
  }

  // Parse inventory text
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

  // Save to Firestore
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
        // Clear input after successful save
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

  return (
    <div className="min-h-screen bg-nerd-dark text-white">
      {/* Header */}
      <div className="bg-nerd-darker border-b border-nerd-gray">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Inventory Management</h1>
            <p className="text-sm text-nerd-gray">Smart text parser for bulk updates</p>
          </div>
          <Link
            href="/admin/dashboard"
            className="px-4 py-2 bg-nerd-gray hover:bg-gray-600 rounded"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">

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
    </div>
  )
}
