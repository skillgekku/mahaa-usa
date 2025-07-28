"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, ExternalLink } from "lucide-react";

interface NewsItem {
  id: number;
  text: string;
  bgGradient: string;
  link?: string;
  isExternal?: boolean;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    text: "IT Serve Synergy Conference 2025 at Puerto Rico - December 4th-5th, 2025",
    bgGradient: "from-blue-600 to-purple-600",
    link: "https://events.itserve.org/synergy/",
    isExternal: true,
  },
  {
    id: 2,
    text: "TTA Mega Convention @ Charlotte, NC - July 17th-19th, 2026",
    bgGradient: "from-orange-600 to-red-600",
    link: "https://mytelanganaus.org/",
    isExternal: true,
  },
  {
    id: 3,
    text: "Exclusive Interview with TANA's New President ~ Dr. Naren Kodali",
    bgGradient: "from-green-600 to-teal-600",
    link: "https://youtu.be/hgikPt6EoNI?feature=shared",
    isExternal: true,
  },
  {
    id: 4,
    text: "Exclusive Interview with TTA's President ~ Naveen Reddy Mallipeddi",
    bgGradient: "from-purple-600 to-pink-600",
    link: "https://youtu.be/RcIX4xjTkf0?feature=shared",
    isExternal: true,
  },
  {
    id: 5,
    text: "Registrations Open for Miss Telugu USA 2026 - Apply Now!",
    bgGradient: "from-pink-600 to-rose-600",
    link: "https://www.missteluguusa.com/index.php",
    isExternal: true,
  },
];

const NewsTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Autoplay logic
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
    }, 1000); // Increased to 6 seconds for better readability
    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered]);

  // Navigation functions
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + newsItems.length) % newsItems.length,
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touchStartX = e.touches[0].clientX;
    (e.currentTarget as HTMLElement).dataset.touchStartX =
      touchStartX.toString();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchStartX = Number(
      (e.currentTarget as HTMLElement).dataset.touchStartX,
    );
    const touchCurrentX = e.touches[0].clientX;
    const deltaX = touchStartX - touchCurrentX;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) nextSlide();
      else prevSlide();
      (e.currentTarget as HTMLElement).dataset.touchStartX = "";
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    (e.currentTarget as HTMLElement).dataset.touchStartX = "";
  };

  // Handle link navigation
  const handleReadMore = (news: NewsItem) => {
    if (news.link) {
      if (news.isExternal) {
        window.open(news.link, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = news.link;
      }
    } else {
      alert(`View details for: ${news.text}`);
    }
  };

  // Current news item
  const currentNews = newsItems[currentIndex];

  return (
    <div
      className="relative flex-1 overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ticker Container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {newsItems.map((news) => (
          <div
            key={news.id}
            className="w-full flex-shrink-0 px-4 py-12 bg-gray-900 text-white"
          >
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-base xl:text-3xl mb-6 animate-pulse font-bold uppercase tracking-wider bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Breaking News
              </p>

              <div className="overflow-hidden justify-center mb-6">
                <p
                  className="text-sm md:text-xl lg:text-2xl font-semibold text-center mx-auto leading-relaxed"
                  style={{
                    maxWidth: "800px",
                  }}
                >
                  {news.text}
                </p>
              </div>

              <button
                onClick={() => handleReadMore(news)}
                className={`bg-gradient-to-r ${news.bgGradient} hover:opacity-90 text-white px-4 md:px-8 py-3 md:py-4 rounded-lg flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mx-auto`}
              >
                {news.isExternal ? (
                  <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                ) : (
                  <Play className="w-4 h-4 md:w-5 md:h-5" />
                )}
                <span className="font-semibold text-sm md:text-base">
                  {news.link ? 'Visit Link' : 'Read More'}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 z-40"
        aria-label="Previous news"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 z-40"
        aria-label="Next news"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Autoplay Toggle */}
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

      {/* Progress Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-40">
        {newsItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? `bg-gradient-to-r ${currentNews.bgGradient}` 
                : 'bg-white bg-opacity-50 hover:bg-opacity-70'
            }`}
            aria-label={`Go to news ${index + 1}`}
          />
        ))}
      </div>

    
    </div>
  );
};

export default NewsTicker;