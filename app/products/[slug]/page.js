import { getProductBySlug, products } from '../../../data/products'
import ProductPageClient from './ProductPageClient'

// Generate static paths for all products at build time
export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default function ProductPage({ params }) {
  const product = getProductBySlug(params.slug)

  return <ProductPageClient product={product} />
}
