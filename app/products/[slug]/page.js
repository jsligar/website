import { getProductBySlug, products } from '../../../data/products'
import ProductPageClient from './ProductPageClient'

// Generate static paths for all products at build time
export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

// Generate metadata for SEO
export function generateMetadata({ params }) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    return {
      title: 'Product Not Found | NerdbillyFab',
    }
  }

  return {
    title: `${product.name} | NerdbillyFab`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images || [],
      type: 'product',
    },
  }
}

export default function ProductPage({ params }) {
  const product = getProductBySlug(params.slug)

  // Generate JSON-LD structured data for SEO
  const productSchema = product ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images || [],
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'NerdbillyFab',
    },
    offers: {
      '@type': 'Offer',
      url: `https://nerdbillyfab.com/products/${product.slug}`,
      priceCurrency: 'USD',
      price: product.price,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : product.preOrder
        ? 'https://schema.org/PreOrder'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'NerdbillyFab',
      },
    },
  } : null

  return (
    <>
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      <ProductPageClient product={product} />
    </>
  )
}
