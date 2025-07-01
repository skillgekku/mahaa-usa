'use client';

import { useState } from 'react';
import { ChannelConfig, ViewMode } from './lib/types';
import { useTheme } from './hooks/useTheme';
import { THEME_CLASSES, CONFERENCES, MAHAA_NEWS_CHANNEL } from './lib/constants';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import VideoPlayer from './components/channel/VideoPlayer';
import ConferencePlaylist from './components/channel/ConferencePlaylist';
import ConferenceCarousel from './components/channel/ConferenceCarousel';
import { Play, Calendar, Youtube, Users, Tv, Clock, Star } from 'lucide-react';

export default function HomePage() {
  const { isDarkMode } = useTheme();
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedChannel, setSelectedChannel] = useState<ChannelConfig | null>(null);
  const [isPiPActive, setIsPiPActive] = useState(false);
  const [selectedYouTubeVideoId, setSelectedYouTubeVideoId] = useState<string | null>(null);

  const theme = THEME_CLASSES[isDarkMode ? 'dark' : 'light'];

  const handleConferenceSelect = (conference: ChannelConfig) => {
    setSelectedChannel(conference);
    setCurrentView('usa-playlist');
  };

  const handlePlayMahaaNews = () => {
    setSelectedChannel(MAHAA_NEWS_CHANNEL);
    setCurrentView('player');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedChannel(null);
    setSelectedYouTubeVideoId(null);
  };

  const handleClosePlayer = () => {
    setSelectedChannel(null);
    setSelectedYouTubeVideoId(null);
    setCurrentView('home');
    setIsPiPActive(false);
  };

  const handlePlayYouTubeVideo = (videoId: string) => {
    setSelectedYouTubeVideoId(videoId);
    setCurrentView('player');
  };

  // Create a modified channel for YouTube video playback
  const getModifiedChannel = (): ChannelConfig | null => {
    if (!selectedChannel) return null;
    
    if (selectedChannel.isYoutube && selectedYouTubeVideoId) {
      return {
        ...selectedChannel,
        youtubeVideoId: selectedYouTubeVideoId
      };
    }
    
    return selectedChannel;
  };

  if (currentView === 'usa-playlist') {
    return (
      <ConferencePlaylist
        conference={selectedChannel!}
        onBack={handleBackToHome}
        onPlayVideo={handlePlayYouTubeVideo}
      />
    );
  }

  return (
    <div className={`flex flex-col min-h-screen ${theme.body}`}>
      <Header 
        onScheduleClick={() => setCurrentView('schedule')} 
        isPiPActive={isPiPActive} 
      />

      <main className="flex-grow px-6 py-8">
        <div className="container mx-auto max-w-7xl">
          
 

          {/* Conference Carousel Section */}
          <ConferenceCarousel 
            conferences={CONFERENCES}
            onConferenceSelect={handleConferenceSelect}
          />

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className={`${theme.card} rounded-xl p-6 text-center border transition-all duration-300 hover:shadow-lg hover:scale-105`}>
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Tv className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className={`${theme.title} font-bold text-lg mb-2`}>
                Live News
              </h3>
              <p className={`${theme.description} text-sm`}>
                24/7 Telugu news coverage with breaking news alerts
              </p>
            </div>

            <div className={`${theme.card} rounded-xl p-6 text-center border transition-all duration-300 hover:shadow-lg hover:scale-105`}>
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Youtube className="w-8 h-8 text-red-600" />
              </div>
              <h3 className={`${theme.title} font-bold text-lg mb-2`}>
                Conference Coverage
              </h3>
              <p className={`${theme.description} text-sm`}>
                Exclusive coverage of TANA, NATS, and community events
              </p>
            </div>

            <div className={`${theme.card} rounded-xl p-6 text-center border transition-all duration-300 hover:shadow-lg hover:scale-105`}>
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className={`${theme.title} font-bold text-lg mb-2`}>
                Community Events
              </h3>
              <p className={`${theme.description} text-sm`}>
                Political discussions, cultural programs, and entertainment
              </p>
            </div>

            <div className={`${theme.card} rounded-xl p-6 text-center border transition-all duration-300 hover:shadow-lg hover:scale-105`}>
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                <Calendar className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className={`${theme.title} font-bold text-lg mb-2`}>
                On-Demand
              </h3>
              <p className={`${theme.description} text-sm`}>
                Watch previous conferences and events anytime
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Connecting Telugu Communities Worldwide
              </h2>
              <p className="text-gray-300 text-lg">
                Your trusted source for Telugu news and community events
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-red-400 mb-2">24/7</div>
                <div className="text-gray-300">Live Coverage</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-blue-400 mb-2">50+</div>
                <div className="text-gray-300">Conference Videos</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-green-400 mb-2">100K+</div>
                <div className="text-gray-300">Viewers</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-yellow-400 mb-2">5+</div>
                <div className="text-gray-300">Major Events</div>
              </div>
            </div>
          </div>
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
  );
}