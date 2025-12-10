export const metadata = {
  title: 'Privacy Policy | NerdbillyFab',
  description: 'Privacy policy for NerdbillyFab - How we collect, use, and protect your information',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-nerd-dark py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
            <p className="text-gray-300 mb-4">
              NerdbillyFab ("we," "our," or "us") respects your privacy and is committed to protecting your personal information.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website
              or make a purchase from our store.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>

            <h3 className="text-xl font-semibold text-white mb-3">Personal Information</h3>
            <p className="text-gray-300 mb-4">When you place an order, we collect:</p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>Name (first and last)</li>
              <li>Email address</li>
              <li>Phone number (optional)</li>
              <li>Shipping address</li>
              <li>Payment information (processed securely through Stripe)</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">Automatically Collected Information</h3>
            <p className="text-gray-300 mb-4">When you visit our website, we automatically collect:</p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Pages visited and time spent</li>
              <li>Referring website</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
            <p className="text-gray-300 mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and shipping updates</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Improve our website and product offerings</li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal obligations</li>
              <li>Send marketing communications (with your consent)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Information Sharing and Disclosure</h2>
            <p className="text-gray-300 mb-4">We do not sell, trade, or rent your personal information to third parties. We may share your information with:</p>

            <h3 className="text-xl font-semibold text-white mb-3">Service Providers</h3>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li><strong>Stripe:</strong> Payment processing (see <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-nerd-red hover:text-red-400">Stripe Privacy Policy</a>)</li>
              <li><strong>Firebase/Google Cloud:</strong> Database and hosting (see <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className="text-nerd-red hover:text-red-400">Firebase Privacy Policy</a>)</li>
              <li><strong>Shipping Carriers:</strong> USPS, UPS, or FedEx for order delivery</li>
              <li><strong>Email Service Provider:</strong> For sending order confirmations and updates</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">Legal Requirements</h3>
            <p className="text-gray-300 mb-4">
              We may disclose your information if required by law, court order, or to protect our rights, property, or safety.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
            <p className="text-gray-300 mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information, including:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>SSL/TLS encryption for data transmission</li>
              <li>Secure Firebase database with access controls</li>
              <li>Payment data processed through PCI-compliant Stripe</li>
              <li>Regular security audits and updates</li>
              <li>Limited employee access to personal information</li>
            </ul>
            <p className="text-gray-300 mb-4">
              However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Cookies and Tracking</h2>
            <p className="text-gray-300 mb-4">
              We use cookies and similar tracking technologies to enhance your browsing experience:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for shopping cart and checkout functionality</li>
              <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
            </ul>
            <p className="text-gray-300 mb-4">
              You can control cookies through your browser settings, but disabling certain cookies may affect website functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
            <p className="text-gray-300 mb-4">Depending on your location, you may have the following rights:</p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Objection:</strong> Object to processing of your information</li>
              <li><strong>Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Withdraw Consent:</strong> Opt-out of marketing communications</li>
            </ul>
            <p className="text-gray-300 mb-4">
              To exercise these rights, please contact us at the email address below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Data Retention</h2>
            <p className="text-gray-300 mb-4">
              We retain your personal information for as long as necessary to:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>Fulfill the purposes outlined in this policy</li>
              <li>Comply with legal and accounting requirements (typically 7 years for transaction records)</li>
              <li>Resolve disputes and enforce our agreements</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Children's Privacy</h2>
            <p className="text-gray-300 mb-4">
              Our website is not intended for children under 13 years of age. We do not knowingly collect personal information
              from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">International Data Transfers</h2>
            <p className="text-gray-300 mb-4">
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate
              safeguards are in place to protect your information in accordance with this Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">California Privacy Rights (CCPA)</h2>
            <p className="text-gray-300 mb-4">
              If you are a California resident, you have specific rights under the California Consumer Privacy Act:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>Right to know what personal information is collected</li>
              <li>Right to know if personal information is sold or disclosed</li>
              <li>Right to opt-out of the sale of personal information (we do not sell information)</li>
              <li>Right to request deletion of personal information</li>
              <li>Right to non-discrimination for exercising your rights</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">European Privacy Rights (GDPR)</h2>
            <p className="text-gray-300 mb-4">
              If you are in the European Economic Area, you have rights under the General Data Protection Regulation:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>Right of access to your personal data</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to erasure ("right to be forgotten")</li>
              <li>Right to restriction of processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
              <li>Rights related to automated decision-making</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Changes to This Privacy Policy</h2>
            <p className="text-gray-300 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date. Significant changes will be communicated
              via email to registered users.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-gray-300 mb-4">
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6">
              <p className="text-white font-semibold mb-2">NerdbillyFab</p>
              <p className="text-gray-300">Email: <a href="mailto:privacy@nerdbillyfab.com" className="text-nerd-red hover:text-red-400">privacy@nerdbillyfab.com</a></p>
              <p className="text-gray-300 mt-2">
                <em className="text-sm">Please allow up to 30 days for us to respond to your request.</em>
              </p>
            </div>
          </section>

          <div className="bg-blue-900/20 border border-blue-500 rounded-lg p-6 mt-8">
            <p className="text-blue-300 text-sm">
              <strong>Note:</strong> This privacy policy is a template and should be reviewed by a legal professional
              before use. You may need to customize it based on your specific business practices, jurisdiction, and
              applicable laws. Consider consulting with a privacy attorney to ensure full compliance.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
