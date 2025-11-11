// Server component wrapper for dynamic route
export async function generateStaticParams() {
  // Return empty array - admin pages work client-side with Firebase
  return []
}

export default function ProductIdLayout({ children }) {
  return children
}
