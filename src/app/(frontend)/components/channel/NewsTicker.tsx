// components/NewsTicker.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

interface NewsItem {
  id: number;
  text: string;
  bgGradient: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    text: "Global Markets Surge as New Economic Policies Announced",
    bgGradient: "from-red-600 to-orange-600",
  },
  {
    id: 2,
    text: "Major Breakthrough in Renewable Energy Technology Unveiled",
    bgGradient: "from-blue-600 to-teal-600",
  },
  {
    id: 3,
    text: "International Summit Addresses Climate Change Solutions",
    bgGradient: "from-green-600 to-lime-600",
  },
];

const NewsTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Autoplay logic
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

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
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-base xl:text-3xl mb-6 animate-pulse font-bold uppercase tracking-wider">
                Breaking News
              </p>

              <div className="overflow-hidden justify-center">
                <p
                  className="text-xs md:text-xl font-semibold text-center mx-auto line-clamp-3"
                  style={{
                    maxWidth: "600px", // Adjusted to encourage wrapping into three lines
                  }}
                >
                  {news.text}
                </p>
              </div>

              <button
                onClick={() => alert(`View details for: ${news.text}`)}
                className={`bg-gradient-to-r ${news.bgGradient} hover:opacity-90 text-white px-2 md:px-6 py-2 md:py-3 rounded-sm flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mx-auto mt-4`}
              >
                <Play className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-semibold text-sm md:text-base">
                  Read More
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

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-30 z-40">
        <div
          className={`h-full bg-gradient-to-r ${currentNews.bgGradient} transition-all duration-500`}
          style={{ width: `${((currentIndex + 1) / newsItems.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default NewsTicker;
