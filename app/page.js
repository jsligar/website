import Link from 'next/link'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

export default function Home() {
  const featuredProducts = products.filter(p =>
    ['gator-xuv-heavy-duty-wheel-kit', 'dewalt-battery-adapter-plate', 'razors-edge', '7r-wheel-kit-complete'].includes(p.slug)
  )

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-nerd-dark py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-nerd-gray via-nerd-dark to-nerd-dark opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6">
              Upgrade Your Kid's Ride
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-4">
              Performance upgrades engineered in my garage, tested on my kids' machines
            </p>
            <p className="text-lg text-gray-400 mb-10 max-w-3xl mx-auto">
              From bolt-on wheel kits to advanced electronic systems. No compromises on quality. Built tough. Tested real.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop" className="btn-primary text-center">
                Shop Upgrades
              </Link>
              <Link href="/products/razors-edge-complete" className="btn-secondary text-center">
                Discover Razors-Edge
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nerd-red to-transparent"></div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-nerd-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Featured Products</h2>
            <p className="text-gray-400 text-lg">Performance upgrades that make a difference</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/shop" className="btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 bg-nerd-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-nerd-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Engineered for Performance</h3>
              <p className="text-gray-400">Precision-designed parts that handle real-world abuse</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-nerd-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Tested on Real Machines</h3>
              <p className="text-gray-400">Every part runs on my kids' tractors before it ships</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-nerd-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Plug-and-Play Design</h3>
              <p className="text-gray-400">No 3D printer needed. No modifications. Just install.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-nerd-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Free Shipping Always</h3>
              <p className="text-gray-400">Every order ships free. No minimum. No exceptions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Razors-Edge Showcase */}
      <section className="py-20 bg-nerd-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-nerd-red/10 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-nerd-red text-white text-sm font-bold px-4 py-1 rounded mb-4">
                COMING SOON
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                Razors-Edge
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                Transform your ride-on into an advanced electric vehicle with professional-grade electronics and safety systems.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-nerd-gray p-4 rounded">
                  <div className="text-nerd-red font-bold text-sm mb-1">6-Speed</div>
                  <div className="text-white text-xs">Electronic Transmission</div>
                </div>
                <div className="bg-nerd-gray p-4 rounded">
                  <div className="text-nerd-red font-bold text-sm mb-1">GPS</div>
                  <div className="text-white text-xs">Geofencing & Speed Control</div>
                </div>
                <div className="bg-nerd-gray p-4 rounded">
                  <div className="text-nerd-red font-bold text-sm mb-1">60V</div>
                  <div className="text-white text-xs">Li-ion Power System</div>
                </div>
                <div className="bg-nerd-gray p-4 rounded">
                  <div className="text-nerd-red font-bold text-sm mb-1">WiFi</div>
                  <div className="text-white text-xs">Remote Telemetry</div>
                </div>
              </div>
              <Link href="/products/razors-edge-complete" className="btn-primary inline-block">
                Learn More
              </Link>
            </div>
            <div className="bg-nerd-gray p-8 rounded-lg">
              <div className="aspect-square bg-nerd-light-gray rounded flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                  <p className="text-sm">Product image coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* R&D Projects Teaser */}
      <section className="py-16 bg-nerd-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">What We're Building Next</h2>
            <p className="text-gray-400 text-lg">Innovation never stops</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <h3 className="text-2xl font-bold text-white">Gatemesh</h3>
                <span className="ml-auto bg-nerd-light-gray text-gray-400 text-xs px-3 py-1 rounded">In Development</span>
              </div>
              <p className="text-gray-400 mb-4">
                IoT sensor gateway with mesh networking capabilities. Monitor and visualize environmental data across multiple nodes with custom ESP32-based displays.
              </p>
              <a href="/projects" className="text-nerd-red hover:text-red-400 font-semibold transition">
                Learn More →
              </a>
            </div>

            <div className="card p-6">
              <div className="flex items-center mb-4">
                <h3 className="text-2xl font-bold text-white">Forman Systems</h3>
                <span className="ml-auto bg-nerd-light-gray text-gray-400 text-xs px-3 py-1 rounded">In Development</span>
              </div>
              <p className="text-gray-400 mb-4">
                Agricultural automation and monitoring platform. ESP32-powered sensor systems for precision farming and environmental control.
              </p>
              <a href="/projects" className="text-nerd-red hover:text-red-400 font-semibold transition">
                Learn More →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Snippet */}
      <section className="py-16 bg-nerd-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-title">Built in the Garage</h2>
          <p className="text-lg text-gray-300 mb-6">
            NerdbillyFab started when I needed stronger wheels and adapters for my kids' Peg Perego tractor after the stock parts wore out. Friends kept asking for the same upgrades, so I started sharing designs.
          </p>
          <p className="text-lg text-gray-300 mb-8">
            I prototype, print, and test every part myself. If it's not plug-and-play, I don't ship it. Simple as that.
          </p>
          <Link href="/about" className="btn-secondary">
            Read More About Us
          </Link>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-nerd-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Customer Reviews</h2>
            <div className="flex items-center justify-center mb-4">
              <div className="flex text-nerd-red">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-white font-semibold">5.0 out of 5 stars</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6">
              <div className="flex text-nerd-red mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 mb-3">"Justin is awesome! Answered all questions in a timely manner."</p>
              <p className="text-gray-500 text-sm">- Jeffrey, July 2025</p>
            </div>

            <div className="card p-6">
              <div className="flex text-nerd-red mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 mb-3">"Great product, service, and communication"</p>
              <p className="text-gray-500 text-sm">- Jeremy, October 2025</p>
            </div>

            <div className="card p-6">
              <div className="flex text-nerd-red mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 mb-3">"Excellent product! Very excited to use!"</p>
              <p className="text-gray-500 text-sm">- Justin, October 2025</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
