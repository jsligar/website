'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      category: 'Ordering & Payment',
      questions: [
        {
          q: 'How do I place an order?',
          a: 'Browse our products, add items to your cart, and proceed to checkout. You\'ll need to provide your shipping information and payment details. We accept all major credit cards through our secure Stripe payment processor.'
        },
        {
          q: 'Do you accept returns or exchanges?',
          a: 'Due to the custom, made-to-order nature of our products, we only accept returns for defective, damaged, or incorrect items within 30 days of delivery. Please see our Terms of Service for full details.'
        },
        {
          q: 'Can I cancel my order?',
          a: 'Orders can be cancelled before production begins (typically within 24-48 hours of ordering). Once production starts, orders cannot be cancelled. Contact us immediately if you need to cancel.'
        },
        {
          q: 'Do you offer discounts or coupon codes?',
          a: 'We occasionally offer promotional codes. Sign up for our email newsletter to be notified of special offers and discounts.'
        }
      ]
    },
    {
      category: 'Products & Customization',
      questions: [
        {
          q: 'What are your products made of?',
          a: 'Our products are 3D printed using high-quality PLA, PETG, or ABS plastic, depending on the product. Each listing specifies the material used. All materials are durable and suitable for outdoor use with proper care.'
        },
        {
          q: 'Are your products compatible with my vehicle?',
          a: 'Each product listing includes compatibility information. We primarily make parts for Power Wheels and similar battery-powered ride-on vehicles. Check the product description or contact us if you\'re unsure about compatibility.'
        },
        {
          q: 'Can I request custom colors?',
          a: 'Standard products come in the colors shown. For custom color requests, please contact us before ordering. Custom colors may incur additional costs and production time.'
        },
        {
          q: 'Do you make custom designs?',
          a: 'We may be able to accommodate custom design requests. Contact us with your specifications for a quote. Custom designs require additional time and may have minimum order quantities.'
        }
      ]
    },
    {
      category: 'Shipping & Delivery',
      questions: [
        {
          q: 'How long will it take to receive my order?',
          a: 'Total delivery time is typically 2-3 weeks: 1-2 weeks for production (made-to-order) plus 3-5 business days for shipping. You\'ll receive tracking information when your order ships.'
        },
        {
          q: 'Do you offer expedited shipping?',
          a: 'Currently, we only offer standard USPS shipping. Rush production may be available for an additional fee - contact us before ordering to inquire.'
        },
        {
          q: 'Do you ship internationally?',
          a: 'We currently ship within the United States only. International shipping may be added in the future.'
        },
        {
          q: 'What if my package is lost or damaged in transit?',
          a: 'If your package is lost or arrives damaged, please contact us within 48 hours with photos. We\'ll work with the shipping carrier to file a claim and will send a replacement at no cost to you.'
        },
        {
          q: 'Can I track my order?',
          a: 'Yes! Use the "Track Order" link in the navigation menu. Enter your order number and email address to see your order status and tracking information once shipped.'
        }
      ]
    },
    {
      category: 'Installation & Support',
      questions: [
        {
          q: 'Are installation instructions included?',
          a: 'Yes, most products include basic installation instructions. Detailed videos and guides are available in our Resources section. If you need additional help, contact us.'
        },
        {
          q: 'Do I need special tools for installation?',
          a: 'Most installations require basic hand tools (screwdrivers, wrenches). Specific tool requirements are listed in product descriptions and installation guides.'
        },
        {
          q: 'What if the parts don\'t fit?',
          a: 'Our products are designed to fit the vehicles specified in the product listing. If you receive parts that don\'t fit and you ordered the correct product for your vehicle, contact us for assistance.'
        },
        {
          q: 'Do you offer technical support?',
          a: 'Yes! Contact us via email with your order number and questions. We\'ll respond within 1-2 business days. Check our Resources section for installation videos and guides.'
        }
      ]
    },
    {
      category: 'Warranty & Quality',
      questions: [
        {
          q: 'Do your products come with a warranty?',
          a: 'Yes, all products are covered by a 90-day warranty against defects in materials and workmanship. This does not cover damage from misuse, improper installation, or modifications.'
        },
        {
          q: 'What if my product breaks?',
          a: 'If a product breaks within the 90-day warranty period due to a manufacturing defect, contact us with photos and your order number. We\'ll send a replacement at no charge.'
        },
        {
          q: 'How durable are 3D printed parts?',
          a: '3D printed parts are very durable when used as intended. Our materials are selected for strength and durability. Proper installation and normal use should result in years of service.'
        },
        {
          q: 'Can I see examples of your work?',
          a: 'Yes! Check out our Projects section to see examples of installations and customer builds. Follow us on social media for more photos and videos.'
        }
      ]
    },
    {
      category: 'Account & Privacy',
      questions: [
        {
          q: 'Do I need an account to order?',
          a: 'No, you can checkout as a guest. However, we may add customer accounts in the future for easier order tracking and faster checkout.'
        },
        {
          q: 'How do you protect my information?',
          a: 'We take privacy seriously. Payment processing is handled securely through Stripe - we never see or store your credit card information. See our Privacy Policy for full details.'
        },
        {
          q: 'How can I track my past orders?',
          a: 'Use the "Track Order" page with your order number and email address. In the future, we plan to add customer accounts with order history.'
        },
        {
          q: 'Can I update my shipping address after ordering?',
          a: 'Contact us immediately if you need to change your shipping address. We can update it if production hasn\'t started. Once shipped, we cannot change the address.'
        }
      ]
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-nerd-dark py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-400 text-lg">
            Find answers to common questions about ordering, shipping, and our products
          </p>
        </div>

        {/* Quick Links */}
        <div className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {faqs.map((category, idx) => (
              <a
                key={idx}
                href={`#${category.category.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-nerd-red hover:text-red-400 transition"
              >
                → {category.category}
              </a>
            ))}
          </div>
        </div>

        {/* FAQ Categories */}
        {faqs.map((category, categoryIdx) => (
          <div key={categoryIdx} className="mb-12">
            <h2
              id={category.category.toLowerCase().replace(/\s+/g, '-')}
              className="text-2xl font-bold text-white mb-6 pb-2 border-b border-nerd-light-gray"
            >
              {category.category}
            </h2>

            <div className="space-y-4">
              {category.questions.map((faq, faqIdx) => {
                const uniqueIndex = `${categoryIdx}-${faqIdx}`
                const isOpen = openIndex === uniqueIndex

                return (
                  <div
                    key={faqIdx}
                    className="bg-nerd-gray border border-nerd-light-gray rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(uniqueIndex)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-nerd-light-gray transition"
                    >
                      <span className="text-white font-semibold pr-4">{faq.q}</span>
                      <svg
                        className={`w-5 h-5 text-nerd-red transition-transform flex-shrink-0 ${
                          isOpen ? 'transform rotate-180' : ''
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

                    {isOpen && (
                      <div className="px-6 pb-4 pt-2 bg-nerd-dark">
                        <p className="text-gray-300 leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* Still Have Questions */}
        <div className="bg-nerd-red/10 border-2 border-nerd-red rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Still Have Questions?</h2>
          <p className="text-gray-300 mb-6">
            Can't find the answer you're looking for? Our team is here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="btn-primary inline-block"
            >
              Contact Us
            </Link>
            <Link
              href="/track-order"
              className="bg-nerd-light-gray hover:bg-gray-600 text-white font-bold py-3 px-6 rounded transition inline-block"
            >
              Track Your Order
            </Link>
          </div>
        </div>

        {/* Resources */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/resources"
            className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6 hover:border-nerd-red transition text-center"
          >
            <h3 className="text-white font-semibold mb-2">Resources</h3>
            <p className="text-gray-400 text-sm">Installation guides and videos</p>
          </Link>

          <Link
            href="/privacy-policy"
            className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6 hover:border-nerd-red transition text-center"
          >
            <h3 className="text-white font-semibold mb-2">Privacy Policy</h3>
            <p className="text-gray-400 text-sm">How we protect your data</p>
          </Link>

          <Link
            href="/terms"
            className="bg-nerd-gray border border-nerd-light-gray rounded-lg p-6 hover:border-nerd-red transition text-center"
          >
            <h3 className="text-white font-semibold mb-2">Terms of Service</h3>
            <p className="text-gray-400 text-sm">Our policies and guidelines</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
