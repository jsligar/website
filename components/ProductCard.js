import Link from 'next/link'
import Image from 'next/image'

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.slug}`} className="card group">
      {/* Image */}
      <div className="relative aspect-square bg-nerd-light-gray overflow-hidden">
        {product.thumbnail ? (
          <Image
            src={product.thumbnail}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />
        ) : product.images && product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />
        ) : (
          <Image
            src="/images/coming-soon.svg"
            alt="Coming Soon"
            fill
            className="object-contain p-8"
          />
        )}
        
        {/* 3D Model Badge */}
        {product.model3D && (
          <div className="absolute top-2 left-2 bg-nerd-red text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2L2 6v8l8 4 8-4V6l-8-4zm0 2.5L15.5 7 10 9.5 4.5 7 10 4.5zM4 8.5l5.5 2.75v5.5L4 14v-5.5zm7.5 8.25v-5.5L17 8.5V14l-5.5 2.75z"/>
            </svg>
            3D
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {product.discount > 0 && (
            <span className="bg-nerd-red text-white text-xs font-bold px-2 py-1 rounded">
              -{product.discount}%
            </span>
          )}
          {product.preOrder && (
            <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
              PRE-ORDER
            </span>
          )}
          {!product.inStock && !product.preOrder && (
            <span className="bg-gray-600 text-white text-xs font-bold px-2 py-1 rounded">
              OUT OF STOCK
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-nerd-red transition">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-nerd-red text-xl font-bold">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-gray-500 text-sm line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Description */}
        {product.description && (
          <p className="text-gray-400 text-sm line-clamp-2 mb-3">
            {product.description}
          </p>
        )}

        {/* Free Shipping Badge */}
        {product.freeShipping && (
          <div className="flex items-center text-green-400 text-xs">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Free Shipping
          </div>
        )}
      </div>
    </Link>
  )
}
