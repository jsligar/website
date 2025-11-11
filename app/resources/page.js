'use client'

import { useState, useEffect } from 'react'
import { getAllVideos } from '../../lib/videos'

export default function ResourcesPage() {
  const [videos, setVideos] = useState([])
  const [videosLoading, setVideosLoading] = useState(true)

  useEffect(() => {
    loadVideos()
  }, [])

  const loadVideos = async () => {
    try {
      const videosList = await getAllVideos()
      setVideos(videosList)
    } catch (error) {
      console.error('Error loading videos:', error)
    } finally {
      setVideosLoading(false)
    }
  }

  return (
    <div className="bg-nerd-dark min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Resources</h1>
          <p className="text-gray-400 text-lg">
            How-to videos, installation guides, compatibility charts, and answers to common questions
          </p>
        </div>

        {/* Installation Guides */}
        <section id="guides" className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Installation Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card p-6">
              <div className="w-12 h-12 bg-nerd-red rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Wheel Adapter Installation</h3>
              <p className="text-gray-400 mb-4">
                Step-by-step guide for installing ABS-GF wheel adapters on Peg Perego and Power Wheels models.
              </p>
              <div className="flex items-center text-gray-500 text-sm mb-3">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                30-45 minutes
              </div>
              <button className="text-nerd-red hover:text-red-400 font-semibold">
                View Guide →
              </button>
            </div>

            <div className="card p-6">
              <div className="w-12 h-12 bg-nerd-red rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">DeWalt Battery Adapter</h3>
              <p className="text-gray-400 mb-4">
                Simple drop-in installation guide for the DeWalt battery adapter plate with low voltage protection.
              </p>
              <div className="flex items-center text-gray-500 text-sm mb-3">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                15-20 minutes
              </div>
              <button className="text-nerd-red hover:text-red-400 font-semibold">
                View Guide →
              </button>
            </div>

            <div className="card p-6">
              <div className="w-12 h-12 bg-nerd-red rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Razors-Edge System</h3>
              <p className="text-gray-400 mb-4">
                Complete installation documentation for the Razors-Edge electronic transmission system.
              </p>
              <div className="flex items-center text-gray-500 text-sm mb-3">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                4-6 hours
              </div>
              <button className="text-nerd-red hover:text-red-400 font-semibold">
                View Documentation →
              </button>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Detailed installation instructions are included with every order. Need help? <a href="/about#contact" className="text-nerd-red hover:text-red-400">Contact us</a>.
            </p>
          </div>
        </section>

        {/* How-To Videos */}
        <section id="videos" className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">How-To Videos</h2>
          <p className="text-gray-400 mb-8">
            Watch step-by-step video guides for installation, troubleshooting, and product demos. New videos added regularly.
          </p>

          {videosLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nerd-red mx-auto mb-4"></div>
              <p className="text-gray-400">Loading videos...</p>
            </div>
          ) : videos.length === 0 ? (
            <div className="bg-nerd-gray rounded-lg p-12 text-center">
              <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-bold text-white mb-2">Videos Coming Soon</h3>
              <p className="text-gray-400">
                We're working on video tutorials to help you with installation and troubleshooting. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((video) => (
                <div key={video.id} className="bg-nerd-gray rounded-lg overflow-hidden group">
                  <div className="aspect-video bg-nerd-light-gray relative">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white mb-2">{video.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{video.description}</p>
                    {video.duration && (
                      <div className="flex items-center text-gray-500 text-sm">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {video.duration}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 bg-nerd-gray rounded-lg p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-nerd-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-white font-semibold mb-2">Video Tutorial Requests</h3>
                <p className="text-gray-400 text-sm">
                  Have a specific installation question or want a video on a particular topic? <a href="/about#contact" className="text-nerd-red hover:text-red-400">Let us know</a> and we'll add it to our production schedule.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Compatibility Chart */}
        <section id="compatibility" className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Compatibility Chart</h2>
          <div className="bg-nerd-gray rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-nerd-light-gray">
                  <tr>
                    <th className="px-6 py-4 text-left text-white font-semibold">Product</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Compatible Models</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Bolt Pattern</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-nerd-light-gray">
                  <tr>
                    <td className="px-6 py-4 text-white font-medium">7R Adapter Kit</td>
                    <td className="px-6 py-4 text-gray-300">Peg Perego Polaris, Power Wheels select models</td>
                    <td className="px-6 py-4 text-gray-300">3-bolt, 145/70-6</td>
                  </tr>
                  <tr className="bg-nerd-light-gray">
                    <td className="px-6 py-4 text-white font-medium">Gator XUV Adapters</td>
                    <td className="px-6 py-4 text-gray-300">Peg Perego Gator XUV (all years)</td>
                    <td className="px-6 py-4 text-gray-300">10" & 13" Harbor Freight</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-white font-medium">Front & Rear Wheel Kit</td>
                    <td className="px-6 py-4 text-gray-300">Peg Perego Gator, Polaris RZR</td>
                    <td className="px-6 py-4 text-gray-300">2x10" / 2x13"</td>
                  </tr>
                  <tr className="bg-nerd-light-gray">
                    <td className="px-6 py-4 text-white font-medium">DeWalt Battery Adapter</td>
                    <td className="px-6 py-4 text-gray-300">Peg Perego (all 12V models)</td>
                    <td className="px-6 py-4 text-gray-300">N/A (electrical)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-white font-medium">13" Steel Wheel Kit</td>
                    <td className="px-6 py-4 text-gray-300">Peg Perego Gator XUV, RZR</td>
                    <td className="px-6 py-4 text-gray-300">Universal w/ adapters</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-6 bg-nerd-gray rounded p-4">
            <p className="text-gray-300 text-sm">
              <strong className="text-white">Not sure if a part fits your model?</strong> Contact us with your ride-on's make, model, and year. We'll confirm compatibility before you order.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section id="faq" className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="card p-6 group">
              <summary className="text-xl font-semibold text-white cursor-pointer flex items-center justify-between">
                How long does shipping take?
                <svg className="w-5 h-5 text-nerd-red group-open:rotate-180 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-gray-300 mt-4">
                All orders ship free via USPS. Processing time is 1-2 weeks as each order is made to order. Shipping within the US typically takes 3-5 business days after processing.
              </p>
            </details>

            <details className="card p-6 group">
              <summary className="text-xl font-semibold text-white cursor-pointer flex items-center justify-between">
                Do I need a 3D printer to install these parts?
                <svg className="w-5 h-5 text-nerd-red group-open:rotate-180 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-gray-300 mt-4">
                No. Every part is plug-and-play. No 3D printer required, no custom fabrication needed. If it's not ready to install out of the box, I don't ship it.
              </p>
            </details>

            <details className="card p-6 group">
              <summary className="text-xl font-semibold text-white cursor-pointer flex items-center justify-between">
                What tools do I need for installation?
                <svg className="w-5 h-5 text-nerd-red group-open:rotate-180 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-gray-300 mt-4">
                Most installations require basic hand tools: socket set, screwdrivers, and pliers. Specific tool requirements are listed in each product's installation guide.
              </p>
            </details>

            <details className="card p-6 group">
              <summary className="text-xl font-semibold text-white cursor-pointer flex items-center justify-between">
                Are these parts tested?
                <svg className="w-5 h-5 text-nerd-red group-open:rotate-180 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-gray-300 mt-4">
                Yes. Every part runs on my kids' machines before it ships to customers. If it doesn't survive real-world testing in my backyard, it doesn't get sold.
              </p>
            </details>

            <details className="card p-6 group">
              <summary className="text-xl font-semibold text-white cursor-pointer flex items-center justify-between">
                What's your return policy?
                <svg className="w-5 h-5 text-nerd-red group-open:rotate-180 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-gray-300 mt-4">
                If a part doesn't fit or doesn't work as described, contact us within 30 days for a return or exchange. Custom orders and electronics may have different terms—see our full return policy for details.
              </p>
            </details>

            <details className="card p-6 group">
              <summary className="text-xl font-semibold text-white cursor-pointer flex items-center justify-between">
                Can I request custom parts or modifications?
                <svg className="w-5 h-5 text-nerd-red group-open:rotate-180 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-gray-300 mt-4">
                Absolutely. Customer feedback drives what I build next. Use the <a href="https://forms.gle/BBXzHonQPv5wgvoN7" className="text-nerd-red hover:text-red-400" target="_blank" rel="noopener noreferrer">feedback survey</a> to suggest new products, or contact us directly for custom requests.
              </p>
            </details>

            <details className="card p-6 group">
              <summary className="text-xl font-semibold text-white cursor-pointer flex items-center justify-between">
                Is Razors-Edge available now?
                <svg className="w-5 h-5 text-nerd-red group-open:rotate-180 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-gray-300 mt-4">
                Razors-Edge is currently in pre-order status. Code is complete and ready for hardware testing. Expected availability: early 2026. Sign up for updates or take the feedback survey to express interest.
              </p>
            </details>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-nerd-gray rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Still Have Questions?</h2>
          <p className="text-gray-300 mb-6">
            We're here to help. Reach out anytime.
          </p>
          <a href="/about#contact" className="btn-primary inline-block">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}
