'use client'

export default function OrderStatusTimeline({ status, tracking, statusHistory }) {
  // Define the order status flow
  const statuses = [
    { key: 'pending', label: 'Order Placed', icon: '📦' },
    { key: 'paid', label: 'Payment Confirmed', icon: '💳' },
    { key: 'processing', label: 'Processing', icon: '⚙️' },
    { key: 'printing', label: 'Printing', icon: '🖨️' },
    { key: 'printed', label: 'Printed', icon: '✅' },
    { key: 'packing', label: 'Packing', icon: '📦' },
    { key: 'shipped', label: 'Shipped', icon: '🚚' },
    { key: 'delivered', label: 'Delivered', icon: '🎉' },
  ]

  // Handle cancelled status separately
  if (status === 'cancelled') {
    return (
      <div className="bg-red-900/20 border border-red-500 rounded-lg p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-2xl">
            ❌
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Order Cancelled</h3>
            <p className="text-red-300 text-sm">This order has been cancelled.</p>
          </div>
        </div>
      </div>
    )
  }

  // Find current status index
  const currentIndex = statuses.findIndex(s => s.key === status)

  return (
    <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-6">Order Status</h3>

      {/* Timeline */}
      <div className="space-y-4">
        {statuses.map((s, index) => {
          const isCompleted = index <= currentIndex
          const isCurrent = index === currentIndex
          const isPast = index < currentIndex

          return (
            <div key={s.key} className="flex items-start gap-4">
              {/* Status Icon */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition ${
                    isCompleted
                      ? 'bg-nerd-red'
                      : 'bg-nerd-light-gray'
                  }`}
                >
                  {s.icon}
                </div>
                {index < statuses.length - 1 && (
                  <div
                    className={`w-1 h-8 transition ${
                      isPast ? 'bg-nerd-red' : 'bg-nerd-light-gray'
                    }`}
                  />
                )}
              </div>

              {/* Status Info */}
              <div className="flex-1 pb-4">
                <h4 className={`font-semibold ${isCompleted ? 'text-white' : 'text-gray-500'}`}>
                  {s.label}
                </h4>

                {/* Show timestamp if available in status history */}
                {statusHistory && statusHistory.length > 0 && (
                  <>
                    {statusHistory.filter(h => h.status === s.key).map((history, idx) => (
                      <div key={idx} className="mt-1">
                        <p className="text-gray-400 text-sm">
                          {new Date(history.timestamp).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                          })}
                        </p>
                        {history.notes && (
                          <p className="text-gray-400 text-sm mt-1">{history.notes}</p>
                        )}
                      </div>
                    ))}
                  </>
                )}

                {/* Show current status indicator */}
                {isCurrent && (
                  <div className="mt-2">
                    <span className="inline-block bg-nerd-red/20 text-nerd-red text-xs font-semibold px-2 py-1 rounded">
                      Current Status
                    </span>
                  </div>
                )}

                {/* Show tracking info when shipped */}
                {s.key === 'shipped' && isCompleted && tracking && (
                  <div className="mt-2 bg-nerd-dark p-3 rounded">
                    <p className="text-sm text-gray-300">
                      <strong className="text-white">Tracking Number:</strong>{' '}
                      <span className="font-mono">{tracking.number}</span>
                    </p>
                    <p className="text-sm text-gray-300 mt-1">
                      <strong className="text-white">Carrier:</strong> {tracking.carrier}
                    </p>
                    {tracking.carrier === 'USPS' && (
                      <a
                        href={`https://tools.usps.com/go/TrackConfirmAction?tLabels=${tracking.number}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-nerd-red hover:text-red-400 text-sm font-semibold"
                      >
                        Track with USPS →
                      </a>
                    )}
                    {tracking.carrier === 'UPS' && (
                      <a
                        href={`https://www.ups.com/track?tracknum=${tracking.number}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-nerd-red hover:text-red-400 text-sm font-semibold"
                      >
                        Track with UPS →
                      </a>
                    )}
                    {tracking.carrier === 'FedEx' && (
                      <a
                        href={`https://www.fedex.com/fedextrack/?trknbr=${tracking.number}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-nerd-red hover:text-red-400 text-sm font-semibold"
                      >
                        Track with FedEx →
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
