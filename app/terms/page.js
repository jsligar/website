export const metadata = {
  title: 'Terms of Service | NerdbillyFab',
  description: 'Terms of service and conditions for purchasing from NerdbillyFab',
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-nerd-dark py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Agreement to Terms</h2>
            <p className="text-gray-300 mb-4">
              By accessing and placing an order with NerdbillyFab, you confirm that you are in agreement with and bound by
              the terms and conditions contained in these Terms of Service. These terms apply to the entire website and any
              email or other type of communication between you and NerdbillyFab.
            </p>
            <p className="text-gray-300 mb-4">
              If you do not agree with these Terms of Service, you must not use this website or purchase products from us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Definitions</h2>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li><strong>"We," "Us," "Our":</strong> Refers to NerdbillyFab</li>
              <li><strong>"You," "Your," "Customer":</strong> Refers to the person accessing this website and purchasing products</li>
              <li><strong>"Products":</strong> Custom-made 3D printed parts, upgrades, and accessories for power wheels and similar vehicles</li>
              <li><strong>"Services":</strong> The e-commerce platform and customer support we provide</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Products and Services</h2>

            <h3 className="text-xl font-semibold text-white mb-3">Made-to-Order Products</h3>
            <p className="text-gray-300 mb-4">
              All products are custom-made to order. Production typically takes 1-2 weeks depending on order volume.
              Products are not pre-manufactured and cannot be exchanged for different products once production begins.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">Product Descriptions</h3>
            <p className="text-gray-300 mb-4">
              We strive to provide accurate product descriptions and images. However, we do not warrant that product
              descriptions, colors, or other content are accurate, complete, reliable, current, or error-free. Minor
              variations in color or appearance may occur due to manufacturing processes.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">Pricing</h3>
            <p className="text-gray-300 mb-4">
              All prices are in USD and are subject to change without notice. We reserve the right to modify prices at
              any time, though price changes will not affect orders already placed and confirmed.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Ordering and Payment</h2>

            <h3 className="text-xl font-semibold text-white mb-3">Order Acceptance</h3>
            <p className="text-gray-300 mb-4">
              Your order constitutes an offer to purchase products. We reserve the right to refuse or cancel any order for
              any reason, including but not limited to: product availability, errors in product or pricing information, or
              suspected fraud.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">Payment Processing</h3>
            <p className="text-gray-300 mb-4">
              Payment is processed securely through Stripe. We do not store credit card information on our servers.
              By providing payment information, you represent and warrant that you are authorized to use the payment method.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">Order Confirmation</h3>
            <p className="text-gray-300 mb-4">
              You will receive an email confirmation when your order is placed and when payment is received. This confirmation
              does not signify our acceptance of your order. Acceptance occurs when we begin production of your custom product.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Shipping and Delivery</h2>

            <h3 className="text-xl font-semibold text-white mb-3">Shipping</h3>
            <p className="text-gray-300 mb-4">
              We offer free shipping within the United States via USPS. Shipping typically takes 3-5 business days after
              your order is processed and shipped. You will receive tracking information via email when your order ships.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">Delivery Timeframes</h3>
            <p className="text-gray-300 mb-4">
              Total delivery time includes:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>Production: 1-2 weeks (made-to-order)</li>
              <li>Shipping: 3-5 business days after shipment</li>
              <li>Total: Approximately 2-3 weeks from order placement</li>
            </ul>
            <p className="text-gray-300 mb-4">
              These are estimates and not guarantees. We are not responsible for delays caused by shipping carriers.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">Risk of Loss</h3>
            <p className="text-gray-300 mb-4">
              Title and risk of loss pass to you upon our delivery to the shipping carrier. We are not responsible for
              lost, stolen, or damaged packages after shipment.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Returns and Refunds</h2>

            <h3 className="text-xl font-semibold text-white mb-3">Return Policy</h3>
            <p className="text-gray-300 mb-4">
              Due to the custom, made-to-order nature of our products, we accept returns only for:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>Defective products (manufacturing defects)</li>
              <li>Damaged products (shipping damage)</li>
              <li>Incorrect products (we sent the wrong item)</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">Return Window</h3>
            <p className="text-gray-300 mb-4">
              Returns must be requested within 30 days of delivery. To initiate a return, contact us with your order
              number and photos of the defect or damage.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">Non-Returnable Items</h3>
            <p className="text-gray-300 mb-4">
              We cannot accept returns for:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>Change of mind or buyer's remorse</li>
              <li>Incorrect measurements provided by customer</li>
              <li>Custom modifications made by customer</li>
              <li>Normal wear and tear</li>
              <li>Products damaged due to misuse or improper installation</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">Refund Process</h3>
            <p className="text-gray-300 mb-4">
              Approved returns will be refunded to the original payment method within 5-10 business days after we receive
              and inspect the returned item. Refunds will include the product cost. Shipping costs are non-refundable
              unless the return is due to our error.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Warranties and Disclaimers</h2>

            <h3 className="text-xl font-semibold text-white mb-3">Limited Warranty</h3>
            <p className="text-gray-300 mb-4">
              We warrant that our products are free from defects in materials and workmanship under normal use for 90 days
              from the date of delivery. This warranty does not cover damage caused by misuse, abuse, improper installation,
              or modifications.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">Disclaimer of Warranties</h3>
            <p className="text-gray-300 mb-4 uppercase font-semibold">
              TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT
              LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p className="text-gray-300 mb-4">
              Products are sold "as is" beyond the limited warranty period. We make no guarantees about product performance
              or suitability for specific purposes beyond our product descriptions.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">Use at Your Own Risk</h3>
            <p className="text-gray-300 mb-4">
              Our products are designed for use with power wheels and similar battery-powered ride-on vehicles. Use is at
              your own risk. We are not liable for injuries, property damage, or other losses resulting from product use.
              Always supervise children when using modified or upgraded vehicles.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
            <p className="text-gray-300 mb-4 uppercase font-semibold">
              TO THE FULLEST EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY TO YOU FOR ANY CLAIMS ARISING FROM OR RELATED
              TO YOUR USE OF OUR PRODUCTS OR SERVICES SHALL NOT EXCEED THE AMOUNT YOU PAID FOR THE PRODUCT.
            </p>
            <p className="text-gray-300 mb-4 uppercase font-semibold">
              WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING
              BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
            <p className="text-gray-300 mb-4">
              All content on this website, including but not limited to text, graphics, logos, images, product designs,
              and software, is the property of NerdbillyFab or its content suppliers and is protected by copyright,
              trademark, and other intellectual property laws.
            </p>
            <p className="text-gray-300 mb-4">
              You may not reproduce, distribute, modify, create derivative works, or otherwise exploit our content without
              our express written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">User Conduct</h2>
            <p className="text-gray-300 mb-4">You agree not to:</p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>Use the website for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the proper functioning of the website</li>
              <li>Transmit any viruses, malware, or harmful code</li>
              <li>Collect information about other users without consent</li>
              <li>Impersonate any person or entity</li>
              <li>Make fraudulent purchases or chargebacks</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Indemnification</h2>
            <p className="text-gray-300 mb-4">
              You agree to indemnify, defend, and hold harmless NerdbillyFab and its officers, directors, employees, and
              agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your
              use of products, violation of these terms, or infringement of any rights of another party.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Dispute Resolution</h2>

            <h3 className="text-xl font-semibold text-white mb-3">Governing Law</h3>
            <p className="text-gray-300 mb-4">
              These Terms shall be governed by and construed in accordance with the laws of [Your State], United States,
              without regard to its conflict of law provisions.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">Arbitration</h3>
            <p className="text-gray-300 mb-4">
              Any dispute arising from these Terms or your use of our products shall be resolved through binding arbitration
              in accordance with the American Arbitration Association's rules, rather than in court. The arbitration shall
              take place in [Your Location].
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">Class Action Waiver</h3>
            <p className="text-gray-300 mb-4">
              You agree that any arbitration or proceedings shall be conducted only on an individual basis and not in a
              class, consolidated, or representative action.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Modifications to Terms</h2>
            <p className="text-gray-300 mb-4">
              We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon
              posting to the website. Your continued use of the website after changes are posted constitutes acceptance of
              the modified terms.
            </p>
            <p className="text-gray-300 mb-4">
              Material changes will be communicated via email to registered customers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Severability</h2>
            <p className="text-gray-300 mb-4">
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or
              eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Entire Agreement</h2>
            <p className="text-gray-300 mb-4">
              These Terms of Service, together with our Privacy Policy and any other policies posted on the website,
              constitute the entire agreement between you and NerdbillyFab regarding your use of the website and purchase
              of products.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
            <p className="text-gray-300 mb-4">
              Questions about these Terms of Service should be directed to:
            </p>
            <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6">
              <p className="text-white font-semibold mb-2">NerdbillyFab</p>
              <p className="text-gray-300">Email: <a href="mailto:support@nerdbillyfab.com" className="text-nerd-red hover:text-red-400">support@nerdbillyfab.com</a></p>
            </div>
          </section>

          <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 mt-8">
            <p className="text-red-300 text-sm">
              <strong>Legal Notice:</strong> This terms of service is a template and must be reviewed and customized by
              a qualified attorney before use. You should customize sections marked with [Your State] and [Your Location],
              and ensure all terms comply with applicable laws in your jurisdiction. This template is provided for
              informational purposes only and does not constitute legal advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
