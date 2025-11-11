import EditProductClient from './EditProductClient'

// Required for static export with dynamic routes
export async function generateStaticParams() {
  // Return empty array since this is an auth-protected admin page
  // These pages are client-side only and don't need pre-rendering
  return []
}

export default function EditProductPage({ params }) {
  return <EditProductClient productId={params.id} />
}
