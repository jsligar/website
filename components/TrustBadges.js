export default function TrustBadges() {
  return (
    <div className="bg-nerd-gray rounded-lg p-6">
      <h3 className="text-white font-bold text-center mb-4">Shop with Confidence</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Secure Checkout */}
        <div className="text-center">
          <div className="bg-nerd-dark rounded-lg p-4 mb-2">
            <svg
              className="w-12 h-12 mx-auto text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <p className="text-white text-sm font-semibold">Secure Checkout</p>
          <p className="text-gray-400 text-xs">SSL Encrypted</p>
        </div>

        {/* Made in USA */}
        <div className="text-center">
          <div className="bg-nerd-dark rounded-lg p-4 mb-2">
            <svg
              className="w-12 h-12 mx-auto text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
              />
            </svg>
          </div>
          <p className="text-white text-sm font-semibold">Made in USA</p>
          <p className="text-gray-400 text-xs">Missouri, USA</p>
        </div>

        {/* Quality Tested */}
        <div className="text-center">
          <div className="bg-nerd-dark rounded-lg p-4 mb-2">
            <svg
              className="w-12 h-12 mx-auto text-nerd-red"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-white text-sm font-semibold">Quality Tested</p>
          <p className="text-gray-400 text-xs">Field Proven</p>
        </div>

        {/* Fast Shipping */}
        <div className="text-center">
          <div className="bg-nerd-dark rounded-lg p-4 mb-2">
            <svg
              className="w-12 h-12 mx-auto text-yellow-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <p className="text-white text-sm font-semibold">Fast Processing</p>
          <p className="text-gray-400 text-xs">1-2 Week Lead Time</p>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mt-6 pt-6 border-t border-nerd-light-gray">
        <p className="text-center text-gray-400 text-sm mb-3">We Accept</p>
        <div className="flex justify-center items-center gap-4 flex-wrap">
          <div className="bg-white rounded px-3 py-2">
            <svg className="h-6" viewBox="0 0 38 24" fill="none">
              <rect width="38" height="24" rx="3" fill="white"/>
              <path d="M14 8h10v8H14z" fill="#FF5F00"/>
              <path d="M15 12a5 5 0 0 1 2-4 5 5 0 1 0 0 8 5 5 0 0 1-2-4z" fill="#EB001B"/>
              <path d="M25 12a5 5 0 0 1-8 4 5 5 0 0 0 0-8 5 5 0 0 1 8 4z" fill="#F79E1B"/>
            </svg>
          </div>
          <div className="bg-white rounded px-3 py-2">
            <svg className="h-6" viewBox="0 0 38 24" fill="none">
              <rect width="38" height="24" rx="3" fill="white"/>
              <path d="M17 8l-3 8h2l3-8h-2zm6 0l-2.5 5.5L18 8h-2l4 8h2l3-8h-2z" fill="#1434CB"/>
            </svg>
          </div>
          <div className="bg-white rounded px-3 py-2 flex items-center">
            <span className="text-xs font-bold text-gray-700">Stripe</span>
          </div>
        </div>
      </div>
    </div>
  )
}
