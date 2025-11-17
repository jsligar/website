'use client'

import { useState } from 'react'

export const metadata = {
  title: 'FAQ | NerdbillyFab',
  description: 'Frequently Asked Questions about NerdbillyFab products, shipping, installation, and more.',
}

const faqData = [
  {
    category: 'Products & Compatibility',
    questions: [
      {
        q: 'What brands are your products compatible with?',
        a: 'Our products are designed primarily for Peg Perego and Power Wheels ride-on vehicles, including models like the John Deere Gator XUV, Case IH, and similar vehicles. Check the product specifications for exact compatibility details.',
      },
      {
        q: 'Are your products made in the USA?',
        a: 'Yes! All our products are designed, manufactured, and shipped from Missouri, USA. We take pride in our garage-built, quality-tested performance upgrades.',
      },
      {
        q: 'What materials are used in your adapters?',
        a: 'We use ABS-GF (glass-filled ABS) for our adapters, which is significantly stronger and more durable than stock plastic parts. This material provides superior weight support and longevity.',
      },
      {
        q: 'Can I install these products myself?',
        a: 'Most of our products are designed for DIY installation with basic hand tools. Installation difficulty varies by product (typically "Moderate" difficulty). Detailed instructions are included, and installation videos are available in our Resources section.',
      },
    ],
  },
  {
    category: 'Ordering & Shipping',
    questions: [
      {
        q: 'How long does processing take?',
        a: 'Most of our products are made-to-order with a processing time of 1-2 weeks before shipping. Pre-order items will ship when they become available (check the product page for availability dates).',
      },
      {
        q: 'Do you offer free shipping?',
        a: 'Many of our products include free shipping! Look for the "FREE SHIPPING" badge on product pages. Shipping costs for other items are calculated at checkout based on weight and destination.',
      },
      {
        q: 'What countries do you ship to?',
        a: 'We currently ship to the United States and Canada. International expansion is planned for the future.',
      },
      {
        q: 'Can I track my order?',
        a: 'Yes! Once your order ships, you will receive a tracking number via email. You can use this to track your package with the shipping carrier.',
      },
    ],
  },
  {
    category: 'Returns & Refunds',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We accept returns within 30 days of delivery for unused products in original packaging. Custom or made-to-order items may have different return policies. Please see our Policies page for complete details.',
      },
      {
        q: 'How do I request a return or exchange?',
        a: 'Contact our support team at support@nerdbillyfab.com with your order number and reason for return. We will provide return instructions and a return authorization if eligible.',
      },
      {
        q: 'Who pays for return shipping?',
        a: 'Customers are responsible for return shipping costs unless the product is defective or we made an error. We recommend using a trackable shipping method for returns.',
      },
      {
        q: 'How long do refunds take?',
        a: 'Refunds are processed within 5-7 business days after we receive and inspect your returned item. The refund will be issued to your original payment method.',
      },
    ],
  },
  {
    category: 'Installation & Support',
    questions: [
      {
        q: 'What tools do I need for installation?',
        a: 'Most installations require basic hand tools such as wrenches, screwdrivers, and socket sets. Specific tool requirements are listed in the product specifications and installation guides.',
      },
      {
        q: 'Do you have installation videos?',
        a: 'Yes! Check our Resources page for step-by-step installation videos for various products. We regularly add new how-to content.',
      },
      {
        q: 'What if I have trouble installing a product?',
        a: 'Contact us at support@nerdbillyfab.com with details about your issue. We are happy to provide installation support and troubleshooting assistance.',
      },
      {
        q: 'Will installing your products void my vehicle warranty?',
        a: 'Installing aftermarket performance parts may void the manufacturer warranty on your ride-on vehicle. We recommend checking your warranty terms before installation.',
      },
    ],
  },
  {
    category: 'Payment & Security',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover) and other payment methods through our secure Stripe payment processor.',
      },
      {
        q: 'Is my payment information secure?',
        a: 'Absolutely. All payments are processed through Stripe, which is PCI-DSS compliant and uses industry-standard encryption. We do not store your complete credit card information on our servers.',
      },
      {
        q: 'Can I use a coupon code?',
        a: 'Yes! Enter your coupon code at checkout to apply discounts. Watch for promotional emails and social media for special offers.',
      },
    ],
  },
  {
    category: 'Product Performance',
    questions: [
      {
        q: 'How much faster will my vehicle go with your upgrades?',
        a: 'Performance improvements vary by product and base vehicle. Wheel upgrades typically improve traction and ride quality rather than speed. Electronic upgrades (like Razors-Edge) can significantly enhance performance. Check individual product descriptions for details.',
      },
      {
        q: 'Are your products safe for children?',
        a: 'Our products are designed with safety in mind, but performance upgrades can increase speed and capabilities. Adult supervision is always required, and you should assess whether modifications are appropriate for your child's age and skill level.',
      },
      {
        q: 'How durable are your wheel adapters?',
        a: 'Our ABS-GF adapters are significantly more durable than stock plastic parts and are designed to handle increased weight and performance demands. They have been tested extensively in real-world conditions.',
      },
    ],
  },
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedItems, setExpandedItems] = useState({})

  const toggleItem = (category, index) => {
    const key = `${category}-${index}`
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const filteredFAQs = faqData.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (item) =>
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-nerd-dark text-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-nerd-red">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-300 text-lg">
            Find answers to common questions about our products, shipping, installation, and more.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 bg-nerd-gray text-white rounded-lg border border-nerd-light-gray focus:border-nerd-red focus:outline-none pl-12"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* FAQ Categories */}
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p>No FAQs found matching your search.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredFAQs.map((category) => (
              <div key={category.category}>
                <h2 className="text-2xl font-bold text-white mb-4">{category.category}</h2>
                <div className="space-y-3">
                  {category.questions.map((item, index) => {
                    const key = `${category.category}-${index}`
                    const isExpanded = expandedItems[key]

                    return (
                      <div
                        key={index}
                        className="bg-nerd-gray rounded-lg overflow-hidden border border-nerd-light-gray"
                      >
                        <button
                          onClick={() => toggleItem(category.category, index)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-nerd-light-gray transition"
                        >
                          <span className="font-semibold text-white pr-4">{item.q}</span>
                          <svg
                            className={`w-5 h-5 text-nerd-red flex-shrink-0 transition-transform ${
                              isExpanded ? 'transform rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                        {isExpanded && (
                          <div className="px-6 pb-4 text-gray-300">
                            <p>{item.a}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-12 bg-nerd-gray rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
          <p className="text-gray-300 mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <a
            href="mailto:support@nerdbillyfab.com"
            className="btn-primary inline-block px-8 py-3"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}
