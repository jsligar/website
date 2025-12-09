import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-nerd-dark flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-9xl font-extrabold text-nerd-red mb-4">404</h1>
        <h2 className="text-4xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-xl text-gray-400 mb-8">
          Looks like this part didn't make it into the catalog. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
          <Link href="/shop" className="btn-secondary">
            Shop Products
          </Link>
        </div>
      </div>
    </div>
  )
}
