'use client'

import { useState } from 'react'
import {ViewMode } from './lib/types'
import { useTheme } from './hooks/useTheme'
import { THEME_CLASSES } from './lib/constants'
import Header from './components/ui/Header'
import Footer from './components/ui/Footer'
import LandingPage from './pages/LandingPage'

export default function HomePage() {
  const { isDarkMode } = useTheme()
  const theme = THEME_CLASSES[isDarkMode ? 'dark' : 'light']

  const handleConferenceSelect = () => {
   
  }



  return (
    <div className={`flex flex-col min-h-screen ${theme.body}`}>
      <Header />
      
      <main className="flex-grow px-6 py-8">
        <div className="container mx-auto max-w-7xl">
          <LandingPage
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}