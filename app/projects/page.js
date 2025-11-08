import Link from 'next/link'

export default function ProjectsPage() {
  return (
    <div className="bg-nerd-dark min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">R&D Projects</h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Innovation never stops. Here's what we're building next—advanced systems for IoT, agriculture, and beyond.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Gatemesh */}
          <div className="card p-8">
            <div className="flex items-center mb-6">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-2">Gatemesh</h2>
                <div className="flex items-center gap-2">
                  <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded">
                    IN DEVELOPMENT
                  </span>
                </div>
              </div>
              <div className="w-16 h-16 bg-nerd-red rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
            </div>

            <p className="text-gray-300 text-lg mb-6">
              IoT sensor gateway with mesh networking capabilities. Built on ESP32-S3 hardware with Python orchestration, Gatemesh creates a distributed sensor network with custom display interfaces for environmental monitoring and data visualization.
            </p>

            <div className="bg-nerd-light-gray rounded p-4 mb-6">
              <h3 className="text-white font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-nerd-red mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  ESP32-S3 based with SenseCAP Indicator hardware
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-nerd-red mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Mesh network architecture for distributed sensors
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-nerd-red mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Custom InkHUD applets for data visualization
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-nerd-red mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Python backend for sensor orchestration
                </li>
              </ul>
            </div>

            <div className="flex gap-3">
              <a
                href="https://github.com/jsligar/Gatemesh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 btn-secondary text-center"
              >
                View on GitHub
              </a>
              <button disabled className="flex-1 bg-nerd-light-gray text-gray-500 font-bold py-3 px-6 rounded cursor-not-allowed">
                Website Coming Soon
              </button>
            </div>
          </div>

          {/* Forman Systems */}
          <div className="card p-8">
            <div className="flex items-center mb-6">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-2">Forman Systems</h2>
                <div className="flex items-center gap-2">
                  <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded">
                    IN DEVELOPMENT
                  </span>
                </div>
              </div>
              <div className="w-16 h-16 bg-nerd-red rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <p className="text-gray-300 text-lg mb-6">
              Agricultural automation and monitoring platform. ESP32-powered sensor systems for precision farming and environmental control. Real-time data collection and analysis for optimized crop management.
            </p>

            <div className="bg-nerd-light-gray rounded p-4 mb-6">
              <h3 className="text-white font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-nerd-red mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  SEEED Xiao ESP32-S3 microcontroller platform
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-nerd-red mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Environmental sensor monitoring (soil, temperature, humidity)
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-nerd-red mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Automated irrigation and climate control systems
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-nerd-red mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Data logging and analytics for precision agriculture
                </li>
              </ul>
            </div>

            <div className="flex gap-3">
              <a
                href="https://github.com/jsligar/SEEED-Farmer-VII-v1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 btn-secondary text-center"
              >
                View on GitHub
              </a>
              <button disabled className="flex-1 bg-nerd-light-gray text-gray-500 font-bold py-3 px-6 rounded cursor-not-allowed">
                Website Coming Soon
              </button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-nerd-gray rounded-lg p-8 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Want to Shape What We Build Next?</h2>
          <p className="text-gray-300 mb-6">
            Your feedback drives our R&D. Take our quick survey to vote on the next products and features.
          </p>
          <a
            href="https://forms.gle/BBXzHonQPv5wgvoN7"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block"
          >
            Take the Survey
          </a>
        </div>

        {/* Back to Shop */}
        <div className="text-center mt-12">
          <Link href="/shop" className="text-nerd-red hover:text-red-400 font-semibold text-lg">
            ← Back to Shop
          </Link>
        </div>
      </div>
    </div>
  )
}
