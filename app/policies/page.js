export default function PoliciesPage() {
  return (
    <div className="bg-nerd-dark min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">Policies</h1>

        {/* Shipping Policy */}
        <section id="shipping" className="mb-12 bg-nerd-gray rounded-lg p-8">
          <h2 className="text-3xl font-bold text-white mb-6">Shipping Policy</h2>

          <div className="space-y-4 text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Free Shipping</h3>
              <p>All orders ship free via USPS. No minimum purchase required. No exceptions.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Processing Time</h3>
              <p>Orders are made to order. Processing time is typically 1-2 weeks. You'll receive a shipping confirmation email when your order ships.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Delivery Time</h3>
              <p>After processing, USPS delivery within the continental US typically takes 3-5 business days. Alaska, Hawaii, and international orders may take longer.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Tracking</h3>
              <p>You'll receive a tracking number via email when your order ships. Use this to monitor your delivery status.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">International Shipping</h3>
              <p>Currently, we primarily ship within the United States. For international orders, please contact us directly for shipping quotes and availability.</p>
            </div>
          </div>
        </section>

        {/* Returns & Exchanges */}
        <section id="returns" className="mb-12 bg-nerd-gray rounded-lg p-8">
          <h2 className="text-3xl font-bold text-white mb-6">Returns & Exchanges</h2>

          <div className="space-y-4 text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">30-Day Return Window</h3>
              <p>If you're not satisfied with your purchase, contact us within 30 days of delivery to initiate a return or exchange.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Eligible Returns</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Parts that don't fit as described</li>
                <li>Defective or damaged items</li>
                <li>Incorrect items shipped</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Return Conditions</h3>
              <p>Items must be unused and in original packaging. Custom orders and electronic systems may have different terms—contact us for details.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Refund Process</h3>
              <p>Once we receive and inspect the returned item, we'll process your refund within 5-7 business days. Refunds will be issued to your original payment method.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Exchanges</h3>
              <p>Need a different size or model? Contact us to arrange an exchange. We'll ship the replacement once we receive the original item.</p>
            </div>

            <div className="bg-nerd-light-gray p-4 rounded mt-6">
              <p className="text-sm">
                <strong className="text-white">Questions about returns?</strong> Email us at hello@nerdbillyfab.com before sending anything back. We're here to help.
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Policy */}
        <section id="privacy" className="mb-12 bg-nerd-gray rounded-lg p-8">
          <h2 className="text-3xl font-bold text-white mb-6">Privacy Policy</h2>

          <div className="space-y-4 text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Information We Collect</h3>
              <p>When you place an order, we collect:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>Name and shipping address</li>
                <li>Email address for order updates</li>
                <li>Payment information (processed securely via Stripe)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">How We Use Your Information</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Process and fulfill your orders</li>
                <li>Send shipping confirmations and tracking info</li>
                <li>Respond to customer service inquiries</li>
                <li>Send occasional product updates (you can opt out anytime)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Data Security</h3>
              <p>We use industry-standard encryption and secure payment processing via Stripe. We never store your credit card information on our servers.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Third-Party Sharing</h3>
              <p>We don't sell or share your personal information with third parties, except as required to fulfill your order (e.g., shipping carriers) or comply with legal requirements.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Cookies & Analytics</h3>
              <p>We may use cookies and basic analytics to understand how visitors use our site and improve the shopping experience. No personal information is collected through analytics.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Your Rights</h3>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>Request access to your personal data</li>
                <li>Request correction or deletion of your data</li>
                <li>Opt out of marketing emails</li>
              </ul>
              <p className="mt-2">Contact us at hello@nerdbillyfab.com to exercise these rights.</p>
            </div>

            <div className="bg-nerd-light-gray p-4 rounded mt-6">
              <p className="text-sm">
                <strong className="text-white">Questions about privacy?</strong> We're a small operation and take your privacy seriously. Email us anytime at hello@nerdbillyfab.com.
              </p>
            </div>
          </div>
        </section>

        {/* Terms of Service */}
        <section id="terms" className="mb-12 bg-nerd-gray rounded-lg p-8">
          <h2 className="text-3xl font-bold text-white mb-6">Terms of Service</h2>

          <div className="space-y-4 text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Product Use</h3>
              <p>Our products are designed for use on Peg Perego, Power Wheels, and compatible ride-on toys. Use at your own risk. Adult supervision is required for all ride-on toy operation.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Warranty Disclaimer</h3>
              <p>All parts are tested before shipping, but we make no warranties beyond our 30-day return policy. Installation and use of aftermarket parts may void manufacturer warranties on ride-on toys.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Razors-Edge Specific Terms</h3>
              <div className="bg-red-900/30 border border-red-500 rounded p-4 mt-2">
                <p className="text-sm">
                  <strong className="text-red-400">WARNING:</strong> Razors-Edge operates at 60V with Li-ion batteries. Installation and operation require electrical and mechanical expertise. Only qualified individuals should attempt installation. Improper installation or use can result in serious injury or death. By purchasing, you acknowledge all risks and assume full responsibility.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Liability</h3>
              <p>We're not liable for any damages, injuries, or losses resulting from the use or misuse of our products. Use common sense and supervise children at all times.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Order Acceptance</h3>
              <p>We reserve the right to refuse or cancel any order for any reason, including product availability, errors in product or pricing information, or suspected fraud.</p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <div className="text-center bg-nerd-light-gray rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Have Questions?</h2>
          <p className="text-gray-300 mb-6">
            These policies are straightforward, but if you need clarification on anything, just ask.
          </p>
          <a href="/about#contact" className="btn-primary inline-block">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}
