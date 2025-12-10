import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-nerd-gray border-t border-nerd-light-gray mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">
              Nerd<span className="text-nerd-red">billy</span>Fab
            </h3>
            <p className="text-gray-400 text-sm">
              Garage-built performance upgrades. Engineered for quality, tested on real machines.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-white text-sm transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop?category=wheels" className="text-gray-400 hover:text-white text-sm transition">
                  Wheel Kits
                </Link>
              </li>
              <li>
                <Link href="/shop?category=adapters" className="text-gray-400 hover:text-white text-sm transition">
                  Adapters
                </Link>
              </li>
              <li>
                <Link href="/shop?category=battery" className="text-gray-400 hover:text-white text-sm transition">
                  Battery Systems
                </Link>
              </li>
              <li>
                <Link href="/products/razors-edge" className="text-gray-400 hover:text-nerd-red text-sm transition font-semibold">
                  Razors-Edge
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/resources#videos" className="text-gray-400 hover:text-white text-sm transition">
                  How-To Videos
                </Link>
              </li>
              <li>
                <Link href="/resources#guides" className="text-gray-400 hover:text-white text-sm transition">
                  Installation Guides
                </Link>
              </li>
              <li>
                <Link href="/resources#compatibility" className="text-gray-400 hover:text-white text-sm transition">
                  Compatibility Chart
                </Link>
              </li>
              <li>
                <Link href="/resources#faq" className="text-gray-400 hover:text-white text-sm transition">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-400 hover:text-white text-sm transition">
                  R&D Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white text-sm transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/about#contact" className="text-gray-400 hover:text-white text-sm transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-gray-400 hover:text-nerd-red text-sm transition font-semibold">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/policies#shipping" className="text-gray-400 hover:text-white text-sm transition">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/policies#returns" className="text-gray-400 hover:text-white text-sm transition">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/policies#privacy" className="text-gray-400 hover:text-white text-sm transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-gray-500 hover:text-nerd-red text-sm transition">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-nerd-light-gray mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} NerdbillyFab. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://github.com/jsligar" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
              <span className="sr-only">GitHub</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://www.etsy.com/shop/NerdbillyFab" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
              <span className="sr-only">Etsy</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.9 10.4V8.6h8.2v1.8H7.9zm12.2-7.6c.5 0 .9.4.9.9v15.4c0 .5-.4.9-.9.9H3.9c-.5 0-.9-.4-.9-.9V3.7c0-.5.4-.9.9-.9h16.2zm-8.3 13.5h4.4v1.5h-4.4v-1.5zm0-2.6h4.4v1.5h-4.4v-1.5z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
