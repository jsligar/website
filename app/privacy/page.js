export const metadata = {
  title: 'Privacy Policy | NerdbillyFab',
  description: 'Privacy Policy for NerdbillyFab - How we collect, use, and protect your personal information.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-nerd-dark text-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-nerd-red">Privacy Policy</h1>

        <p className="text-gray-300 mb-8">
          <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              We collect information you provide directly to us when you:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Place an order or make a purchase</li>
              <li>Create an account or log in</li>
              <li>Sign up for our newsletter</li>
              <li>Contact us for customer support</li>
              <li>Participate in surveys or promotions</li>
            </ul>
            <p className="mt-4">
              <strong>Personal Information:</strong> Name, email address, shipping address, billing address, phone number, and payment information.
            </p>
            <p className="mt-2">
              <strong>Automatically Collected Information:</strong> IP address, browser type, device information, pages visited, time spent on pages, and referring website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and shipping updates</li>
              <li>Provide customer support</li>
              <li>Communicate about products, services, and promotions</li>
              <li>Improve our website and user experience</li>
              <li>Detect and prevent fraud or security issues</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Information Sharing and Disclosure</h2>
            <p className="mb-4">
              We do not sell, rent, or trade your personal information to third parties. We may share your information with:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Service Providers:</strong> Third-party vendors who help us operate our business (e.g., payment processors like Stripe, shipping carriers, email service providers)</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong>Protection of Rights:</strong> To protect our rights, property, or safety, or that of our users</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Payment Processing</h2>
            <p>
              All payment transactions are processed securely through Stripe. We do not store your complete credit card information on our servers. Stripe maintains PCI-DSS compliance and uses industry-standard encryption to protect your payment data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Cookies and Tracking Technologies</h2>
            <p className="mb-4">
              We use cookies and similar tracking technologies to:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Remember your preferences and shopping cart</li>
              <li>Understand how you use our website</li>
              <li>Analyze website traffic and performance</li>
              <li>Provide personalized content and ads</li>
            </ul>
            <p className="mt-4">
              You can control cookies through your browser settings. However, disabling cookies may affect your ability to use certain features of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Data Security</h2>
            <p>
              We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. This includes:
            </p>
            <ul className="list-disc ml-6 mt-4 space-y-2">
              <li>SSL/TLS encryption for data transmission</li>
              <li>Secure Firebase authentication and database storage</li>
              <li>Regular security updates and monitoring</li>
              <li>Limited employee access to personal data</li>
            </ul>
            <p className="mt-4">
              However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Order information is retained for tax and accounting purposes as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Your Rights and Choices</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal obligations)</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails at any time</li>
              <li><strong>Data Portability:</strong> Request your data in a portable format</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, please contact us at the information provided below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
            <p>
              Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. California Privacy Rights (CCPA)</h2>
            <p className="mb-4">
              If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Right to know what personal information is collected, used, shared, or sold</li>
              <li>Right to delete personal information</li>
              <li>Right to opt-out of the sale of personal information (we do not sell your information)</li>
              <li>Right to non-discrimination for exercising your rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. International Users</h2>
            <p>
              Our website is operated in the United States. If you are accessing our website from outside the US, your information may be transferred to, stored, and processed in the United States where our servers and databases are located.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">13. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on this page and updating the "Last Updated" date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">14. Contact Us</h2>
            <p className="mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-nerd-darker p-6 rounded-lg border border-gray-700">
              <p className="mb-2"><strong>NerdbillyFab</strong></p>
              <p className="mb-2">Email: privacy@nerdbillyfab.com</p>
              <p className="mb-2">Phone: (Available upon request)</p>
              <p>Address: (Business address to be provided)</p>
            </div>
          </section>

          <section className="mt-12 pt-8 border-t border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">Consent</h2>
            <p>
              By using our website and services, you acknowledge that you have read and understood this Privacy Policy and consent to the collection, use, and disclosure of your information as described herein.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
