'use client'
import Header from './components/ui/Header'
import Footer from './components/ui/Footer'
import LandingPage from './pages/LandingPage'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Header />
      
      <main className="flex-grow px-6 py-8">
        <div className="container mx-auto max-w-7xl">
          <LandingPage />
        </div>
      </main>

      <Footer />
    </div>
  )
}