import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="bg-nerd-dark min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Built in the Garage</h1>
          <p className="text-gray-400 text-xl">
            Quality upgrades engineered, tested, and shipped from my workspace
          </p>
        </div>

        {/* Main Story */}
        <div className="prose prose-invert max-w-none">
          <div className="bg-nerd-gray rounded-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">The Story</h2>
            <p className="text-gray-300 text-lg mb-4">
              NerdbillyFab started the way a lot of good ideas do: out of necessity. I needed stronger wheels and adapters for my kids' Peg Perego tractor after the stock parts wore out. The plastic wheels couldn't handle the abuse, and I wasn't about to buy another $300 toy just to get replacement parts.
            </p>
            <p className="text-gray-300 text-lg mb-4">
              So I designed my own. Glass-filled ABS adapters. Real rubber tires. Steel wheels. Parts that could actually take a beating. I tested them on my kids' machines—if they survived my backyard, they'd survive anywhere.
            </p>
            <p className="text-gray-300 text-lg">
              Friends saw what I built and started asking for the same upgrades. Then friends of friends. Before long, I was running a small operation out of my garage. That's NerdbillyFab.
            </p>
          </div>

          {/* Philosophy */}
          <div className="bg-nerd-gray rounded-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">How I Work</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-nerd-red rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Prototype & Test</h3>
                  <p className="text-gray-300">
                    Every part I sell runs on my kids' tractors first. If it doesn't hold up in my backyard, it doesn't ship.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-nerd-red rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Plug-and-Play</h3>
                  <p className="text-gray-300">
                    If it's not plug-and-play, I don't ship it. You shouldn't need a 3D printer or custom modifications to install my parts.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-nerd-red rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Customer-Driven R&D</h3>
                  <p className="text-gray-300">
                    You tell me what you need. I build it, test it, and ship it. Simple feedback loop.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-nerd-red rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Quality Over Volume</h3>
                  <p className="text-gray-300">
                    I'm not trying to be Amazon. I make quality parts in small batches. Processing time is 1-2 weeks because I'm building each order myself.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-nerd-gray rounded-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">What's Next</h2>
            <p className="text-gray-300 text-lg mb-4">
              I'm not stopping at wheel adapters. I'm working on advanced electronics systems like <strong className="text-white">Razors-Edge</strong>—a 6-speed electronic transmission with GPS geofencing and WiFi telemetry. It's the kind of upgrade that transforms a toy into a legitimate electric vehicle.
            </p>
            <p className="text-gray-300 text-lg mb-6">
              Beyond ride-ons, I'm developing <strong className="text-white">Gatemesh</strong> (IoT sensor networks) and <strong className="text-white">Forman Systems</strong> (agricultural automation). Innovation doesn't stop.
            </p>
            <Link href="/projects" className="btn-primary inline-block">
              View R&D Projects
            </Link>
          </div>

          {/* Contact Section */}
          <div id="contact" className="bg-nerd-light-gray rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
            <p className="text-gray-300 text-lg mb-6">
              Have questions about a product? Need help with compatibility? Want to suggest a new upgrade? Reach out.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-white font-semibold mb-3">Email</h3>
                <a href="mailto:hello@nerdbillyfab.com" className="text-nerd-red hover:text-red-400 text-lg">
                  hello@nerdbillyfab.com
                </a>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-3">Etsy Shop</h3>
                <a
                  href="https://www.etsy.com/shop/NerdbillyFab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-nerd-red hover:text-red-400 text-lg"
                >
                  Visit our Etsy Store
                </a>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-3">GitHub</h3>
                <a
                  href="https://github.com/jsligar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-nerd-red hover:text-red-400 text-lg"
                >
                  @jsligar
                </a>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-3">Feedback Survey</h3>
                <a
                  href="https://forms.gle/BBXzHonQPv5wgvoN7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-nerd-red hover:text-red-400 text-lg"
                >
                  Help Shape Our Roadmap
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-nerd-gray">
              <p className="text-gray-400 text-sm">
                <strong>Processing Time:</strong> 1-2 weeks. All orders ship free via USPS.
              </p>
            </div>
          </div>
        </div>

        {/* Back to Shop */}
        <div className="text-center mt-12">
          <Link href="/shop" className="btn-secondary inline-block">
            Shop Upgrades
          </Link>
        </div>
      </div>
    </div>
  )
}
