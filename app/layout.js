import './globals.css'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { CartProvider } from '../context/CartContext'
import { AuthProvider } from '../context/AuthContext'

export const metadata = {
  title: 'NerdbillyFab | Performance Ride-On Upgrades',
  description: 'Garage-built performance upgrades for Peg Perego and Power Wheels. From simple bolt-on wheel kits to advanced electronic systems.',
  keywords: 'Peg Perego upgrades, Power Wheels mods, ride-on toy upgrades, Razors-Edge, wheel adapters, battery upgrades, John Deere Gator upgrades, kids tractor wheels, 3D printed adapters, ride-on modifications',
  authors: [{ name: 'NerdbillyFab' }],
  creator: 'NerdbillyFab',
  publisher: 'NerdbillyFab',
  metadataBase: new URL('https://nerdbillyfab.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'NerdbillyFab | Performance Ride-On Upgrades',
    description: 'Garage-built performance upgrades for Peg Perego and Power Wheels. From simple bolt-on wheel kits to advanced electronic systems.',
    url: 'https://nerdbillyfab.com',
    siteName: 'NerdbillyFab',
    images: [
      {
        url: '/images/coming-soon.svg',
        width: 800,
        height: 800,
        alt: 'NerdbillyFab',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code-here', // You'll add this after verifying in Search Console
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#dc2626" />
      </head>
      <body>
        <AuthProvider>
          <CartProvider>
            <Navigation />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
