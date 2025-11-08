import './globals.css'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export const metadata = {
  title: 'NerdbillyFab | Performance Ride-On Upgrades',
  description: 'Garage-built performance upgrades for Peg Perego and Power Wheels. From simple bolt-on wheel kits to advanced electronic systems.',
  keywords: 'Peg Perego upgrades, Power Wheels mods, ride-on toy upgrades, Razors-Edge, wheel adapters, battery upgrades',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
