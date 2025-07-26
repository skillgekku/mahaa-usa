'use client'

import { useState } from 'react'
import { ChannelConfig, ViewMode } from './lib/types'
import { useTheme } from './hooks/useTheme'
import { THEME_CLASSES, CONFERENCES, MAHAA_NEWS_CHANNEL } from './lib/constants'
import Header from './components/ui/Header'
import Footer from './components/ui/Footer'
import VideoPlayer from './components/channel/VideoPlayer'
import ConferencePlaylist from './components/channel/ConferencePlaylist'
import ConferenceCarousel from './components/channel/ConferenceCarousel'
import { Play, Calendar, Youtube, Users, Tv, Clock, Star } from 'lucide-react'

export default function HomePage() {
  const { isDarkMode } = useTheme()
  const [currentView, setCurrentView] = useState<ViewMode>('home')
  const [selectedChannel, setSelectedChannel] = useState<ChannelConfig | null>(null)
  const [isPiPActive, setIsPiPActive] = useState(false)
  const [selectedYouTubeVideoId, setSelectedYouTubeVideoId] = useState<string | null>(null)

  const theme = THEME_CLASSES[isDarkMode ? 'dark' : 'light']

  const handleConferenceSelect = (conference: ChannelConfig) => {
    setSelectedChannel(conference)
    setCurrentView('usa-playlist')
  }

  const handlePlayMahaaNews = () => {
    setSelectedChannel(MAHAA_NEWS_CHANNEL)
    setCurrentView('player')
  }

  const handleBackToHome = () => {
    setCurrentView('home')
    setSelectedChannel(null)
    setSelectedYouTubeVideoId(null)
  }

  const handleClosePlayer = () => {
    setSelectedChannel(null)
    setSelectedYouTubeVideoId(null)
    setCurrentView('home')
    setIsPiPActive(false)
  }

  const handlePlayYouTubeVideo = (videoId: string) => {
    setSelectedYouTubeVideoId(videoId)
    setCurrentView('player')
  }

  // Create a modified channel for YouTube video playback
  const getModifiedChannel = (): ChannelConfig | null => {
    if (!selectedChannel) return null

    if (selectedChannel.isYoutube && selectedYouTubeVideoId) {
      return {
        ...selectedChannel,
        youtubeVideoId: selectedYouTubeVideoId,
      }
    }

    return selectedChannel
  }

  if (currentView === 'usa-playlist') {
    return (
      <ConferencePlaylist
        conference={selectedChannel!}
        onBack={handleBackToHome}
        onPlayVideo={handlePlayYouTubeVideo}
      />
    )
  }

  return (
    <div className={`flex flex-col min-h-screen ${theme.body}`}>
      <Header onScheduleClick={() => setCurrentView('schedule')} isPiPActive={isPiPActive} />

      <main className="flex-grow px-6 py-8">
        <div className="container mx-auto max-w-7xl">
          {/* Conference Carousel Section */}
          <ConferenceCarousel
            conferences={CONFERENCES}
            onConferenceSelect={handleConferenceSelect}
          />
        </div>
      </main>

      <Footer />

      {selectedChannel && currentView === 'player' && (
        <VideoPlayer
          channel={getModifiedChannel()!}
          isOpen={currentView === 'player'}
          onClose={handleClosePlayer}
          onPiPChange={setIsPiPActive}
        />
      )}
    </div>
  )
}
