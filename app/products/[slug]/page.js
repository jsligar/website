import { getProductBySlug, products } from '../../../data/products'
import ProductPageClient from './ProductPageClient'

// Generate static paths for all products at build time
export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({ params }) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  return <ProductPageClient product={product} />
}
