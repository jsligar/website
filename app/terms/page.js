export const metadata = {
  title: 'Terms of Service | NerdbillyFab',
  description: 'Terms of Service for NerdbillyFab - User agreement and conditions for using our website and purchasing our products.',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-nerd-dark text-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-nerd-red">Terms of Service</h1>

        <p className="text-gray-300 mb-8">
          <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              Welcome to NerdbillyFab ("we," "our," or "us"). By accessing or using our website at nerdbillyfab.com (the "Site") and purchasing our products, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Site or services.
            </p>
            <p className="mt-4">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of the Site after changes are posted constitutes your acceptance of the modified Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Eligibility</h2>
            <p>
              You must be at least 18 years old to use our Site and make purchases. By using our Site, you represent and warrant that you are at least 18 years of age and have the legal capacity to enter into these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Products and Services</h2>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">3.1 Product Descriptions</h3>
            <p>
              We strive to provide accurate product descriptions, images, and specifications. However, we do not warrant that product descriptions, images, pricing, or other content on the Site is accurate, complete, reliable, current, or error-free.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">3.2 Made-to-Order Products</h3>
            <p>
              Many of our products are made-to-order with a typical processing time of 1-2 weeks before shipment. Processing times may vary based on order volume and product availability. Pre-order items will ship when they become available.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">3.3 Pricing</h3>
            <p>
              All prices are in US Dollars (USD) and are subject to change without notice. We reserve the right to modify prices at any time. The price charged for a product will be the price in effect at the time the order is placed, subject to acceptance of your order.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">3.4 Product Availability</h3>
            <p>
              We make reasonable efforts to accurately display stock availability. However, we do not guarantee that all products shown as available will remain in stock. We reserve the right to limit quantities, discontinue products, or refuse orders at our discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Orders and Payment</h2>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">4.1 Order Acceptance</h3>
            <p>
              Your receipt of an order confirmation does not constitute our acceptance of your order. We reserve the right to accept or decline your order for any reason, including but not limited to product availability, errors in pricing or product information, or suspected fraudulent activity.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">4.2 Payment</h3>
            <p>
              Payment is required at the time of order placement. We accept payment through Stripe, which supports major credit cards and other payment methods. By providing payment information, you represent that you are authorized to use the payment method.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">4.3 Order Modifications and Cancellations</h3>
            <p>
              Once an order is placed, modifications or cancellations may not be possible, especially for made-to-order items. Please contact us immediately if you need to modify or cancel an order. We will do our best to accommodate your request if the order has not yet entered production.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Shipping and Delivery</h2>
            <p className="mb-4">
              We currently ship to addresses in the United States and Canada. Shipping costs are calculated at checkout based on the delivery address and order weight.
            </p>
            <p className="mb-4">
              Delivery times are estimates and not guaranteed. We are not responsible for delays caused by shipping carriers, customs, weather, or other factors beyond our control.
            </p>
            <p>
              Risk of loss and title for products pass to you upon delivery to the carrier. We are not responsible for lost, stolen, or damaged packages after they have been delivered by the carrier.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Returns, Refunds, and Exchanges</h2>
            <p className="mb-4">
              Please refer to our Returns & Exchanges policy available on the Policies page for detailed information about returns, refunds, and exchanges.
            </p>
            <p className="mb-4">
              <strong>Key Points:</strong>
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Returns must be requested within 30 days of delivery</li>
              <li>Products must be unused and in original packaging</li>
              <li>Custom or made-to-order items may not be eligible for return</li>
              <li>Refunds will be processed to the original payment method</li>
              <li>Customer is responsible for return shipping costs unless the product is defective</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Product Use and Safety</h2>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">7.1 Intended Use</h3>
            <p>
              Our products are performance upgrades for ride-on toys (Peg Perego, Power Wheels, etc.). Products must be used in accordance with manufacturer guidelines and safety recommendations.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">7.2 Adult Supervision Required</h3>
            <p>
              All modified ride-on toys must be operated under adult supervision. Performance upgrades may increase speed and performance characteristics. Users must assess whether modifications are appropriate for the child's age, skill level, and safety.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">7.3 Installation</h3>
            <p>
              Installation of our products requires mechanical knowledge and appropriate tools. Improper installation may result in product damage, personal injury, or death. If you are not comfortable performing the installation, seek professional assistance.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">7.4 Disclaimers</h3>
            <p>
              Installing aftermarket performance parts may void manufacturer warranties on the base vehicle. We are not responsible for any warranty issues with the original equipment manufacturer (OEM).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
            <p className="mb-4">
              TO THE FULLEST EXTENT PERMITTED BY LAW, NERDBILLYFAB AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Your use or inability to use our products or services</li>
              <li>Unauthorized access to or alteration of your data</li>
              <li>Product defects, malfunctions, or failures</li>
              <li>Personal injury or property damage resulting from product use</li>
              <li>Any other matter relating to our products or services</li>
            </ul>
            <p className="mt-4">
              OUR TOTAL LIABILITY TO YOU FOR ANY CLAIM ARISING OUT OF OR RELATING TO THESE TERMS OR OUR PRODUCTS SHALL NOT EXCEED THE AMOUNT YOU PAID FOR THE PRODUCT GIVING RISE TO THE CLAIM.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Warranty Disclaimer</h2>
            <p>
              OUR PRODUCTS ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
            <p className="mt-4">
              We do not warrant that our products will meet your requirements, be uninterrupted, timely, secure, or error-free, or that defects will be corrected.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless NerdbillyFab and its officers, directors, employees, contractors, agents, and affiliates from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to:
            </p>
            <ul className="list-disc ml-6 mt-4 space-y-2">
              <li>Your violation of these Terms</li>
              <li>Your use of our products</li>
              <li>Your violation of any rights of another party</li>
              <li>Your negligence or willful misconduct</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Intellectual Property</h2>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">11.1 Ownership</h3>
            <p>
              All content on the Site, including but not limited to text, graphics, logos, images, videos, software, and design, is the property of NerdbillyFab or its licensors and is protected by copyright, trademark, and other intellectual property laws.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">11.2 Limited License</h3>
            <p>
              We grant you a limited, non-exclusive, non-transferable license to access and use the Site for personal, non-commercial purposes. You may not reproduce, distribute, modify, create derivative works, publicly display, or otherwise use any content without our prior written consent.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">11.3 Trademarks</h3>
            <p>
              "NerdbillyFab" and associated logos are trademarks of NerdbillyFab. Other product and company names mentioned on the Site may be trademarks of their respective owners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. User Conduct</h2>
            <p className="mb-4">You agree not to:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Use the Site for any unlawful purpose or in violation of these Terms</li>
              <li>Attempt to gain unauthorized access to any portion of the Site</li>
              <li>Interfere with or disrupt the Site or servers</li>
              <li>Transmit viruses, malware, or other harmful code</li>
              <li>Engage in automated data collection (scraping, bots, etc.) without permission</li>
              <li>Impersonate any person or entity</li>
              <li>Post or transmit offensive, defamatory, or illegal content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">13. Third-Party Links and Services</h2>
            <p>
              The Site may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of third-party sites. Your use of third-party sites is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">14. Dispute Resolution and Governing Law</h2>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">14.1 Governing Law</h3>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the United States and the state in which NerdbillyFab is registered, without regard to conflict of law principles.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">14.2 Arbitration</h3>
            <p>
              Any dispute, controversy, or claim arising out of or relating to these Terms or the breach thereof shall be settled by binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall take place in the state where NerdbillyFab is registered.
            </p>

            <h3 className="text-xl font-semibold text-white mt-6 mb-3">14.3 Class Action Waiver</h3>
            <p>
              You agree that any arbitration or proceeding shall be limited to the dispute between you and NerdbillyFab individually. You waive any right to participate in a class action lawsuit or class-wide arbitration.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">15. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your access to the Site at any time, with or without cause or notice, including for violation of these Terms. Upon termination, your right to use the Site will immediately cease.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">16. Severability</h2>
            <p>
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">17. Entire Agreement</h2>
            <p>
              These Terms, together with our Privacy Policy and any other policies referenced herein, constitute the entire agreement between you and NerdbillyFab regarding your use of the Site and supersede all prior agreements and understandings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">18. Contact Information</h2>
            <p className="mb-4">
              If you have any questions or concerns about these Terms of Service, please contact us:
            </p>
            <div className="bg-nerd-darker p-6 rounded-lg border border-gray-700">
              <p className="mb-2"><strong>NerdbillyFab</strong></p>
              <p className="mb-2">Email: support@nerdbillyfab.com</p>
              <p className="mb-2">Phone: (Available upon request)</p>
              <p>Address: (Business address to be provided)</p>
            </div>
          </section>

          <section className="mt-12 pt-8 border-t border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">Acknowledgment</h2>
            <p>
              BY USING OUR SITE AND PURCHASING OUR PRODUCTS, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE, UNDERSTAND THEM, AND AGREE TO BE BOUND BY THEM.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
