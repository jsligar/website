'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '../../../context/AuthContext'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '../../../components/ProtectedRoute'
import { db } from '../../../lib/firebase'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'

function DashboardContent() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalProducts: 0,
    inStockProducts: 0,
    preOrderProducts: 0,
  })
  const [orderStats, setOrderStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    paidOrders: 0,
    shippedOrders: 0,
    totalRevenue: 0,
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      // Load product stats
      const productsRef = collection(db, 'products')
      const snapshot = await getDocs(productsRef)

      let inStock = 0
      let preOrder = 0

      snapshot.forEach((doc) => {
        const product = doc.data()
        if (product.inStock) inStock++
        if (product.preOrder) preOrder++
      })

      setStats({
        totalProducts: snapshot.size,
        inStockProducts: inStock,
        preOrderProducts: preOrder,
      })

      // Load order stats
      const ordersRef = collection(db, 'orders')
      const ordersSnapshot = await getDocs(ordersRef)

      let pending = 0
      let paid = 0
      let shipped = 0
      let revenue = 0

      const ordersData = []
      ordersSnapshot.forEach((doc) => {
        const order = { id: doc.id, ...doc.data() }
        ordersData.push(order)

        if (order.status === 'pending') pending++
        if (['paid', 'printing', 'printed', 'packing'].includes(order.status)) paid++
        if (['shipped', 'delivered'].includes(order.status)) shipped++
        if (['paid', 'printing', 'printed', 'packing', 'shipped', 'delivered'].includes(order.status)) {
          revenue += order.total || 0
        }
      })

      // Sort by date and get most recent
      ordersData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      setRecentOrders(ordersData.slice(0, 5))

      setOrderStats({
        totalOrders: ordersSnapshot.size,
        pendingOrders: pending,
        paidOrders: paid,
        shippedOrders: shipped,
        totalRevenue: revenue,
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-nerd-dark">
      {/* Header */}
      <div className="bg-nerd-gray border-b border-nerd-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Admin Dashboard
              </h1>
              <p className="text-gray-400 mt-1">Welcome back, {user?.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-400 hover:text-white transition">
                View Site
              </Link>
              <button
                onClick={handleSignOut}
                className="bg-nerd-light-gray hover:bg-nerd-red text-white px-4 py-2 rounded transition"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Revenue & Order Stats */}
        <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">💰 Sales Overview</h2>
            <Link href="/admin/orders" className="text-nerd-red hover:text-white text-sm">
              View all orders →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-nerd-dark border border-nerd-light-gray rounded-lg p-4">
              <p className="text-gray-400 text-xs uppercase">Revenue</p>
              <p className="text-2xl font-bold text-green-400">
                ${loading ? '...' : orderStats.totalRevenue.toFixed(2)}
              </p>
            </div>
            <div className="bg-nerd-dark border border-nerd-light-gray rounded-lg p-4">
              <p className="text-gray-400 text-xs uppercase">Orders</p>
              <p className="text-2xl font-bold text-white">
                {loading ? '...' : orderStats.totalOrders}
              </p>
            </div>
            <div className="bg-nerd-dark border border-nerd-light-gray rounded-lg p-4">
              <p className="text-gray-400 text-xs uppercase">Pending</p>
              <p className="text-2xl font-bold text-yellow-400">
                {loading ? '...' : orderStats.pendingOrders}
              </p>
            </div>
            <div className="bg-nerd-dark border border-nerd-light-gray rounded-lg p-4">
              <p className="text-gray-400 text-xs uppercase">Processing</p>
              <p className="text-2xl font-bold text-blue-400">
                {loading ? '...' : orderStats.paidOrders}
              </p>
            </div>
            <div className="bg-nerd-dark border border-nerd-light-gray rounded-lg p-4">
              <p className="text-gray-400 text-xs uppercase">Shipped</p>
              <p className="text-2xl font-bold text-green-400">
                {loading ? '...' : orderStats.shippedOrders}
              </p>
            </div>
          </div>
        </div>

        {/* Product Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-semibold">Total Products</p>
                <p className="text-4xl font-bold text-white mt-2">
                  {loading ? '...' : stats.totalProducts}
                </p>
              </div>
              <div className="bg-nerd-red/20 p-3 rounded-lg">
                <svg className="w-8 h-8 text-nerd-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-semibold">In Stock</p>
                <p className="text-4xl font-bold text-white mt-2">
                  {loading ? '...' : stats.inStockProducts}
                </p>
              </div>
              <div className="bg-green-500/20 p-3 rounded-lg">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-semibold">Pre-Orders</p>
                <p className="text-4xl font-bold text-white mt-2">
                  {loading ? '...' : stats.preOrderProducts}
                </p>
              </div>
              <div className="bg-yellow-500/20 p-3 rounded-lg">
                <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Link
              href="/admin/orders"
              className="bg-nerd-dark hover:bg-nerd-light-gray border border-nerd-light-gray rounded-lg p-4 transition group"
            >
              <div className="flex items-center">
                <div className="bg-green-500/20 p-2 rounded group-hover:bg-green-500/30 transition">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-white font-semibold">Orders</p>
                  <p className="text-gray-400 text-sm">Fulfillment workflow</p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/products"
              className="bg-nerd-dark hover:bg-nerd-light-gray border border-nerd-light-gray rounded-lg p-4 transition group"
            >
              <div className="flex items-center">
                <div className="bg-nerd-red/20 p-2 rounded group-hover:bg-nerd-red/30 transition">
                  <svg className="w-6 h-6 text-nerd-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-white font-semibold">Products</p>
                  <p className="text-gray-400 text-sm">Add, edit, or delete</p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/products/new"
              className="bg-nerd-dark hover:bg-nerd-light-gray border border-nerd-light-gray rounded-lg p-4 transition group"
            >
              <div className="flex items-center">
                <div className="bg-blue-500/20 p-2 rounded group-hover:bg-blue-500/30 transition">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-white font-semibold">Add Product</p>
                  <p className="text-gray-400 text-sm">Create new listing</p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/videos"
              className="bg-nerd-dark hover:bg-nerd-light-gray border border-nerd-light-gray rounded-lg p-4 transition group"
            >
              <div className="flex items-center">
                <div className="bg-purple-500/20 p-2 rounded group-hover:bg-purple-500/30 transition">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-white font-semibold">Manage Videos</p>
                  <p className="text-gray-400 text-sm">Add how-to tutorials</p>
                </div>
              </div>
            </Link>

            <button
              onClick={loadStats}
              className="bg-nerd-dark hover:bg-nerd-light-gray border border-nerd-light-gray rounded-lg p-4 transition group text-left"
            >
              <div className="flex items-center">
                <div className="bg-yellow-500/20 p-2 rounded group-hover:bg-yellow-500/30 transition">
                  <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-white font-semibold">Refresh</p>
                  <p className="text-gray-400 text-sm">Update stats</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Orders */}
        {recentOrders.length > 0 && (
          <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">📦 Recent Orders</h2>
              <Link href="/admin/orders" className="text-nerd-red hover:text-white text-sm">
                View all →
              </Link>
            </div>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="bg-nerd-dark border border-nerd-light-gray rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p className="text-white font-semibold">{order.orderNumber}</p>
                    <p className="text-gray-400 text-sm">
                      {order.customer?.firstName} {order.customer?.lastName} • {order.items?.length || 0} items
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-nerd-red font-bold">${order.total?.toFixed(2)}</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      order.status === 'pending' ? 'bg-yellow-500 text-black' :
                      order.status === 'paid' ? 'bg-blue-500 text-white' :
                      order.status === 'shipped' ? 'bg-green-500 text-white' :
                      'bg-gray-500 text-white'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity / Instructions */}
        <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Getting Started</h2>
          <div className="space-y-4 text-gray-300">
            <div className="flex items-start">
              <div className="bg-nerd-red text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                1
              </div>
              <div className="ml-3">
                <p className="font-semibold text-white">Migrate existing products to Firestore</p>
                <p className="text-sm text-gray-400">
                  Go to <Link href="/admin/products" className="text-nerd-red hover:underline">Products</Link> and use the migration tool to import your current products
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-nerd-red text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                2
              </div>
              <div className="ml-3">
                <p className="font-semibold text-white">Add or edit products</p>
                <p className="text-sm text-gray-400">
                  Use the product management interface to update listings, prices, and inventory
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-nerd-red text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                3
              </div>
              <div className="ml-3">
                <p className="font-semibold text-white">Upload product images</p>
                <p className="text-sm text-gray-400">
                  When editing products, you can upload images directly to Firebase Storage
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
