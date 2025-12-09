'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ProtectedRoute from '../../../components/ProtectedRoute'
import { getAllOrders, updateOrderStatus, addTrackingNumber } from '../../../lib/orders'

const ORDER_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-500' },
  { value: 'paid', label: 'Paid', color: 'bg-blue-500' },
  { value: 'printing', label: 'Printing', color: 'bg-purple-500' },
  { value: 'printed', label: 'Printed', color: 'bg-indigo-500' },
  { value: 'packing', label: 'Packing', color: 'bg-orange-500' },
  { value: 'shipped', label: 'Shipped', color: 'bg-green-500' },
  { value: 'delivered', label: 'Delivered', color: 'bg-green-700' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-500' },
]

function OrdersContent() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [updatingStatus, setUpdatingStatus] = useState(false)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      const allOrders = await getAllOrders()
      setOrders(allOrders)
    } catch (error) {
      console.error('Error loading orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId, newStatus, notes = '') => {
    setUpdatingStatus(true)
    try {
      await updateOrderStatus(orderId, newStatus, notes)
      await loadOrders()
      alert(`Order status updated to ${newStatus}`)
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Failed to update status: ' + error.message)
    } finally {
      setUpdatingStatus(false)
    }
  }

  const handleAddTracking = async (orderId) => {
    const trackingNumber = prompt('Enter tracking number:')
    if (!trackingNumber) return

    const carrier = prompt('Enter carrier (default: USPS):', 'USPS') || 'USPS'

    try {
      await addTrackingNumber(orderId, trackingNumber, carrier)
      await loadOrders()
      alert('Tracking number added successfully')
    } catch (error) {
      console.error('Error adding tracking:', error)
      alert('Failed to add tracking: ' + error.message)
    }
  }

  const handleQuickAction = async (orderId, action) => {
    const actionMap = {
      'mark-paid': { status: 'paid', notes: 'Payment confirmed' },
      'start-printing': { status: 'printing', notes: 'Started printing' },
      'done-printing': { status: 'printed', notes: 'Printing complete' },
      'start-packing': { status: 'packing', notes: 'Packing order' },
      'mark-shipped': { status: 'shipped', notes: 'Order shipped' },
      'mark-delivered': { status: 'delivered', notes: 'Order delivered' },
      'cancel': { status: 'cancelled', notes: 'Order cancelled' },
    }

    const actionData = actionMap[action]
    if (actionData) {
      await handleStatusChange(orderId, actionData.status, actionData.notes)
    }
  }

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(o => o.status === filterStatus)

  const getStatusBadge = (status) => {
    const statusConfig = ORDER_STATUSES.find(s => s.value === status) || { label: status, color: 'bg-gray-500' }
    return (
      <span className={`${statusConfig.color} text-white text-xs font-semibold px-2 py-1 rounded`}>
        {statusConfig.label}
      </span>
    )
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '—'
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Calculate real revenue from paid orders
  const financialSummary = orders.reduce((acc, order) => {
    if (['paid', 'printing', 'printed', 'packing', 'shipped', 'delivered'].includes(order.status)) {
      acc.totalRevenue += order.total || 0
      acc.paidOrders += 1
    }
    if (order.status === 'pending') {
      acc.pendingRevenue += order.total || 0
      acc.pendingOrders += 1
    }
    if (order.status === 'cancelled') {
      acc.cancelledOrders += 1
    }
    return acc
  }, { totalRevenue: 0, pendingRevenue: 0, paidOrders: 0, pendingOrders: 0, cancelledOrders: 0 })

  return (
    <div className="min-h-screen bg-nerd-dark">
      {/* Header */}
      <div className="bg-nerd-gray border-b border-nerd-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/admin/dashboard" className="text-gray-400 hover:text-white text-sm mb-2 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-white">Order Management</h1>
              <p className="text-gray-400 mt-1">{orders.length} total orders</p>
            </div>
            <button
              onClick={loadOrders}
              className="px-4 py-2 bg-nerd-light-gray hover:bg-gray-600 text-white rounded font-semibold transition"
            >
              🔄 Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Financial Summary */}
        {!loading && orders.length > 0 && (
          <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-5 mb-6">
            <h2 className="text-lg font-bold text-white mb-4">💰 Revenue Summary (Real Sales)</h2>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="bg-nerd-dark border border-nerd-light-gray rounded-lg p-4">
                <p className="text-xs text-gray-400 uppercase tracking-wider">Confirmed Revenue</p>
                <p className="text-2xl font-bold text-green-400">${financialSummary.totalRevenue.toFixed(2)}</p>
                <p className="text-xs text-gray-500 mt-1">{financialSummary.paidOrders} paid orders</p>
              </div>
              <div className="bg-nerd-dark border border-nerd-light-gray rounded-lg p-4">
                <p className="text-xs text-gray-400 uppercase tracking-wider">Pending Revenue</p>
                <p className="text-2xl font-bold text-yellow-400">${financialSummary.pendingRevenue.toFixed(2)}</p>
                <p className="text-xs text-gray-500 mt-1">{financialSummary.pendingOrders} pending orders</p>
              </div>
              <div className="bg-nerd-dark border border-nerd-light-gray rounded-lg p-4">
                <p className="text-xs text-gray-400 uppercase tracking-wider">Total Orders</p>
                <p className="text-2xl font-bold text-white">{orders.length}</p>
              </div>
              <div className="bg-nerd-dark border border-nerd-light-gray rounded-lg p-4">
                <p className="text-xs text-gray-400 uppercase tracking-wider">Cancelled</p>
                <p className="text-2xl font-bold text-red-400">{financialSummary.cancelledOrders}</p>
              </div>
            </div>
          </div>
        )}

        {/* Workflow Pipeline */}
        {!loading && orders.length > 0 && (
          <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-5 mb-6">
            <h2 className="text-lg font-bold text-white mb-4">📦 Fulfillment Pipeline</h2>
            <div className="flex flex-wrap gap-2">
              {ORDER_STATUSES.map((status) => {
                const count = orders.filter(o => o.status === status.value).length
                return (
                  <button
                    key={status.value}
                    onClick={() => setFilterStatus(status.value)}
                    className={`px-4 py-2 rounded font-semibold transition flex items-center gap-2 ${
                      filterStatus === status.value
                        ? `${status.color} text-white`
                        : 'bg-nerd-dark text-gray-400 hover:text-white border border-nerd-light-gray'
                    }`}
                  >
                    {status.label}
                    <span className="bg-black/30 px-2 py-0.5 rounded text-xs">{count}</span>
                  </button>
                )
              })}
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded font-semibold transition ${
                  filterStatus === 'all'
                    ? 'bg-nerd-red text-white'
                    : 'bg-nerd-dark text-gray-400 hover:text-white border border-nerd-light-gray'
                }`}
              >
                All
              </button>
            </div>
          </div>
        )}

        {/* Orders List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nerd-red mx-auto mb-4"></div>
            <p className="text-gray-400">Loading orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-12 text-center">
            <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-xl font-bold text-white mb-2">No Orders Found</h3>
            <p className="text-gray-400">
              {filterStatus !== 'all' ? `No orders with status "${filterStatus}"` : 'Orders will appear here when customers make purchases'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-nerd-gray border border-nerd-light-gray rounded-lg overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-4 border-b border-nerd-light-gray flex flex-wrap justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-white font-bold text-lg">{order.orderNumber}</p>
                      <p className="text-gray-400 text-sm">{formatDate(order.createdAt)}</p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                  <div className="text-right">
                    <p className="text-nerd-red font-bold text-xl">${order.total?.toFixed(2) || '0.00'}</p>
                    <p className="text-gray-400 text-sm">{order.items?.length || 0} items</p>
                  </div>
                </div>

                {/* Order Details */}
                <div className="p-4 grid md:grid-cols-3 gap-4">
                  {/* Customer Info */}
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Customer</p>
                    <p className="text-white font-semibold">
                      {order.customer?.firstName} {order.customer?.lastName}
                    </p>
                    <p className="text-gray-300 text-sm">{order.customer?.email}</p>
                    {order.shippingAddress && (
                      <div className="text-gray-400 text-sm mt-2">
                        <p>{order.shippingAddress.address}</p>
                        <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                      </div>
                    )}
                  </div>

                  {/* Order Items */}
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Items</p>
                    <div className="space-y-1">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="text-sm">
                          <span className="text-white">{item.quantity}×</span>{' '}
                          <span className="text-gray-300">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tracking & Actions */}
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Tracking</p>
                    {order.tracking ? (
                      <div className="bg-nerd-dark p-2 rounded text-sm">
                        <p className="text-white font-mono">{order.tracking.number}</p>
                        <p className="text-gray-400 text-xs">{order.tracking.carrier}</p>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddTracking(order.id)}
                        className="text-nerd-red hover:text-white text-sm"
                      >
                        + Add tracking number
                      </button>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="p-4 bg-nerd-dark border-t border-nerd-light-gray">
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Quick Actions</p>
                  <div className="flex flex-wrap gap-2">
                    {order.status === 'pending' && (
                      <button
                        onClick={() => handleQuickAction(order.id, 'mark-paid')}
                        disabled={updatingStatus}
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition"
                      >
                        ✓ Mark Paid
                      </button>
                    )}
                    {order.status === 'paid' && (
                      <button
                        onClick={() => handleQuickAction(order.id, 'start-printing')}
                        disabled={updatingStatus}
                        className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded transition"
                      >
                        🖨️ Start Printing
                      </button>
                    )}
                    {order.status === 'printing' && (
                      <button
                        onClick={() => handleQuickAction(order.id, 'done-printing')}
                        disabled={updatingStatus}
                        className="px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white text-sm rounded transition"
                      >
                        ✓ Done Printing
                      </button>
                    )}
                    {order.status === 'printed' && (
                      <button
                        onClick={() => handleQuickAction(order.id, 'start-packing')}
                        disabled={updatingStatus}
                        className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded transition"
                      >
                        📦 Start Packing
                      </button>
                    )}
                    {(order.status === 'packing' || order.status === 'printed') && (
                      <button
                        onClick={() => handleAddTracking(order.id)}
                        disabled={updatingStatus}
                        className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded transition"
                      >
                        🚚 Add Tracking & Ship
                      </button>
                    )}
                    {order.status === 'shipped' && (
                      <button
                        onClick={() => handleQuickAction(order.id, 'mark-delivered')}
                        disabled={updatingStatus}
                        className="px-3 py-1 bg-green-700 hover:bg-green-800 text-white text-sm rounded transition"
                      >
                        ✓ Mark Delivered
                      </button>
                    )}
                    {!['cancelled', 'delivered'].includes(order.status) && (
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to cancel this order?')) {
                            handleQuickAction(order.id, 'cancel')
                          }
                        }}
                        disabled={updatingStatus}
                        className="px-3 py-1 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white text-sm rounded transition border border-red-500"
                      >
                        ✕ Cancel
                      </button>
                    )}
                  </div>
                </div>

                {/* Status History */}
                {order.statusHistory && order.statusHistory.length > 0 && (
                  <div className="p-4 border-t border-nerd-light-gray">
                    <details className="cursor-pointer">
                      <summary className="text-gray-400 text-xs uppercase tracking-wider">
                        Status History ({order.statusHistory.length})
                      </summary>
                      <div className="mt-2 space-y-1">
                        {order.statusHistory.map((entry, idx) => (
                          <div key={idx} className="text-sm flex gap-2">
                            <span className="text-gray-500">{formatDate(entry.timestamp)}</span>
                            <span className="text-white">{entry.status}</span>
                            {entry.notes && <span className="text-gray-400">— {entry.notes}</span>}
                          </div>
                        ))}
                      </div>
                    </details>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function AdminOrdersPage() {
  return (
    <ProtectedRoute>
      <OrdersContent />
    </ProtectedRoute>
  )
}
