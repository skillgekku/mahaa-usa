'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play, Youtube, Calendar, Users, Clock } from 'lucide-react';
import { ChannelConfig } from '@/app/lib/types';
import { useTheme } from '@/app/hooks/useTheme';
import { THEME_CLASSES } from '@/app/lib/constants';

interface ConferenceCarouselProps {
  conferences: ChannelConfig[];
  onConferenceSelect: (conference: ChannelConfig) => void;
}

export default function ConferenceCarousel({ conferences, onConferenceSelect }: ConferenceCarouselProps) {
  const { isDarkMode } = useTheme();
  const theme = THEME_CLASSES[isDarkMode ? 'dark' : 'light'];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % conferences.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, isHovered, conferences.length]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % conferences.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + conferences.length) % conferences.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Get conference images mapping
  const getConferenceImage = (conferenceId: string) => {
    const imageMap = {
      'tana-conference': 'https://raw.githubusercontent.com/skillgekku/media-assets/refs/heads/main/tana-banner.png',
      'nats-conference': 'https://raw.githubusercontent.com/skillgekku/media-assets/refs/heads/main/NATS.jpeg',
      'political-events': 'https://raw.githubusercontent.com/skillgekku/media-assets/refs/heads/main/political-banner.png',
      'entertainment-events': 'https://raw.githubusercontent.com/skillgekku/media-assets/refs/heads/main/entertainment-banner.png',
      'awards-ceremonies': 'https://raw.githubusercontent.com/skillgekku/media-assets/refs/heads/main/AGFT%20logoTag.png'
    };
    return imageMap[conferenceId as keyof typeof imageMap] || 'https://raw.githubusercontent.com/skillgekku/media-assets/refs/heads/main/MAHAA%20USA%20PNG.png';
  };

  // Get fallback image based on conference type
  const getFallbackImage = (conferenceId: string) => {
    const fallbackMap = {
      'tana-conference': '🏛️',
      'nats-conference': '🌟',
      'political-events': '🏛️',
      'entertainment-events': '🎬',
      'awards-ceremonies': '🏆'
    };
    return fallbackMap[conferenceId as keyof typeof fallbackMap] || '📺';
  };

  const currentConference = conferences[currentIndex];

  return (
    <div className="w-full max-w-6xl mx-auto mb-12">
      {/* Carousel Header */}
      <div className="text-center mb-8">
        <h2 className={`text-3xl md:text-4xl font-bold ${theme.title} mb-4`}>
          Telugu Community Events & Conferences
        </h2>
        <p className={`${theme.subtitle} text-lg mb-6`}>
          Watch exclusive coverage of major Telugu events across North America
        </p>
      </div>

      {/* Main Carousel */}
      <div 
        className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Carousel Container */}
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {conferences.map((conference, index) => (
            <div key={conference.id} className="w-full flex-shrink-0 relative">
              {/* Hero Image */}
              <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  {/* Fallback content with emoji */}
                  <div className="text-center text-white">
                    <div className="text-8xl md:text-9xl mb-4 opacity-20">
                      {getFallbackImage(conference.id)}
                    </div>
                    <div className="text-2xl md:text-3xl font-bold opacity-40">
                      {conference.name}
                    </div>
                  </div>
                </div>
                
                <Image
                  src={getConferenceImage(conference.id)}
                  alt={conference.name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105 z-10"
                  priority={index === currentIndex}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-20"></div>
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-30">
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl md:text-3xl">{conference.icon}</span>
                        <div className="flex items-center space-x-2">
                          <Youtube className="w-5 h-5 text-red-500" />
                          <span className="text-red-400 text-sm font-medium">YOUTUBE PLAYLIST</span>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl md:text-4xl font-bold mb-2">
                        {conference.name}
                      </h3>
                      
                      <p className="text-gray-200 text-base md:text-lg mb-3">
                        {conference.description}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{conference.youtubePlaylist?.length || 0} Videos</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>Community Event</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-red-400">Available Now</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Watch Button */}
                    <button
                      onClick={() => onConferenceSelect(conference)}
                      className={`bg-gradient-to-r ${conference.bgGradient} hover:opacity-90 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl flex items-center space-x-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl min-w-max`}
                    >
                      <Play className="w-5 h-5 md:w-6 md:h-6" />
                      <span className="font-semibold text-base md:text-lg">Watch Now</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 z-40"
          aria-label="Previous conference"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 z-40"
          aria-label="Next conference"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Autoplay Pause/Resume Button */}
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-300 z-40"
          aria-label={isAutoPlaying ? "Pause autoplay" : "Resume autoplay"}
        >
          {isAutoPlaying ? (
            <div className="w-4 h-4 flex items-center justify-center">
              <div className="w-1 h-3 bg-white mr-0.5"></div>
              <div className="w-1 h-3 bg-white"></div>
            </div>
          ) : (
            <Play className="w-4 h-4" />
          )}
        </button>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-30 z-40">
          <div 
            className={`h-full bg-gradient-to-r ${currentConference.bgGradient} transition-all duration-500`}
            style={{ width: `${((currentIndex + 1) / conferences.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        {conferences.map((conference, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? `bg-gradient-to-r ${conference.bgGradient} scale-125 shadow-lg`
                : 'bg-gray-400 hover:bg-gray-300'
            }`}
            aria-label={`Go to ${conference.name}`}
          />
        ))}
      </div>

      {/* Conference Cards Preview */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {conferences.map((conference, index) => (
          <button
            key={conference.id}
            onClick={() => {
              goToSlide(index);
            }}
            className={`${theme.card} rounded-xl p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border-2 group ${
              index === currentIndex 
                ? `border-opacity-100 shadow-lg` 
                : 'border-transparent hover:border-gray-300'
            }`}
            style={{
              borderColor: index === currentIndex ? conference.color === 'blue' ? '#3b82f6' : 
                           conference.color === 'green' ? '#10b981' :
                           conference.color === 'red' ? '#ef4444' :
                           conference.color === 'purple' ? '#8b5cf6' :
                           conference.color === 'yellow' ? '#f59e0b' : '#6b7280' : 'transparent'
            }}
          >
            <div className="text-center">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {conference.icon}
              </div>
              <h4 className={`${theme.title} font-semibold text-sm mb-1 line-clamp-2`}>
                {conference.name}
              </h4>
              <p className={`${theme.description} text-xs mb-2`}>
                {conference.youtubePlaylist?.length || 0} videos
              </p>
              <div className="flex items-center justify-center space-x-1">
                <Youtube className="w-3 h-3 text-red-500" />
                <Clock className="w-3 h-3 text-gray-400" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-8 text-center">
        <button
          onClick={() => onConferenceSelect(currentConference)}
          className={`bg-gradient-to-r ${currentConference.bgGradient} hover:opacity-90 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center space-x-3`}
        >
          <Play className="w-6 h-6" />
          <span>Explore {currentConference.name}</span>
          <Calendar className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}