"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Youtube,
  Calendar,
  Users,
  Clock,
} from "lucide-react";
import { ChannelConfig } from "@/app/(frontend)/lib/types";
import { useTheme } from "@/app/(frontend)/hooks/useTheme";
import { THEME_CLASSES } from "@/app/(frontend)/lib/constants";
import USStatesPreview from "@/app/(frontend)/components/channel/UstatesPreview";
import Organisations from "@/app/(frontend)/components/channel/Organisations";
import Image from "next/image";
import NewsTicker from "@/app/(frontend)/components/channel/NewsTicker";
interface ConferenceCarouselProps {
  conferences: ChannelConfig[];
  onConferenceSelect: (conference: ChannelConfig) => void;
}

export default function ConferenceCarousel({
  conferences,
  onConferenceSelect,
}: ConferenceCarouselProps) {
  const { isDarkMode } = useTheme();
  const theme = THEME_CLASSES[isDarkMode ? "dark" : "light"];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Preview carousel state
  const [previewIndex, setPreviewIndex] = useState(0);
  const [isPreviewAutoPlaying, setIsPreviewAutoPlaying] = useState(true);
  const [isPreviewHovered, setIsPreviewHovered] = useState(false);
  const previewIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // CTA carousel state
  const [ctaIndex, setCtaIndex] = useState(0);
  const [isCtaAutoPlaying, setIsCtaAutoPlaying] = useState(true);
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  const ctaIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Helper function to render logo or icon
  const renderConferenceLogo = (
    conference: ChannelConfig,
    size: "small" | "medium" | "large" | "xlarge" = "medium",
  ) => {
    const sizeClasses = {
      small: "w-6 h-6",
      medium: "w-8 h-8",
      large: "w-12 h-12",
      xlarge: "w-16 h-16",
    };

    const textSizes = {
      small: "text-2xl",
      medium: "text-3xl",
      large: "text-4xl",
      xlarge: "text-5xl md:text-6xl",
    };

    if (conference.logo) {
      return (
        <img
          src={conference.logo}
          alt={`${conference.name} logo`}
          className={`${sizeClasses[size]} object-contain`}
          onError={(e) => {
            // Fallback to icon if logo fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            if (target.nextElementSibling) {
              (target.nextElementSibling as HTMLElement).style.display =
                "inline-block";
            }
          }}
        />
      );
    }

    return <span className={textSizes[size]}>{conference.icon}</span>;
  };

  // Calculate items per view for different screen sizes
  const getItemsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 5; // lg
      if (window.innerWidth >= 768) return 3; // md
      return 2; // sm
    }
    return 5;
  };

  const [itemsPerView, setItemsPerView] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Main carousel auto-play functionality
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

  // Preview carousel auto-play functionality
  useEffect(() => {
    if (isPreviewAutoPlaying && !isPreviewHovered) {
      previewIntervalRef.current = setInterval(() => {
        setPreviewIndex((prev) => {
          const maxIndex = Math.max(0, conferences.length - itemsPerView);
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, 3000);
    }

    return () => {
      if (previewIntervalRef.current) {
        clearInterval(previewIntervalRef.current);
      }
    };
  }, [
    isPreviewAutoPlaying,
    isPreviewHovered,
    conferences.length,
    itemsPerView,
  ]);

  // CTA carousel auto-play functionality
  useEffect(() => {
    if (isCtaAutoPlaying && !isCtaHovered) {
      ctaIntervalRef.current = setInterval(() => {
        setCtaIndex((prev) => (prev + 1) % conferences.length);
      }, 4000);
    }

    return () => {
      if (ctaIntervalRef.current) {
        clearInterval(ctaIntervalRef.current);
      }
    };
  }, [isCtaAutoPlaying, isCtaHovered, conferences.length]);

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
    setCurrentIndex(
      (prev) => (prev - 1 + conferences.length) % conferences.length,
    );
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Preview carousel navigation
  const nextPreviewSlide = () => {
    setIsPreviewAutoPlaying(false);
    setPreviewIndex((prev) => {
      const maxIndex = Math.max(0, conferences.length - itemsPerView);
      return prev >= maxIndex ? 0 : prev + 1;
    });
    setTimeout(() => setIsPreviewAutoPlaying(true), 10000);
  };

  const prevPreviewSlide = () => {
    setIsPreviewAutoPlaying(false);
    setPreviewIndex((prev) => {
      const maxIndex = Math.max(0, conferences.length - itemsPerView);
      return prev <= 0 ? maxIndex : prev - 1;
    });
    setTimeout(() => setIsPreviewAutoPlaying(true), 10000);
  };

  // CTA carousel navigation
  const nextCtaSlide = () => {
    setIsCtaAutoPlaying(false);
    setCtaIndex((prev) => (prev + 1) % conferences.length);
    setTimeout(() => setIsCtaAutoPlaying(true), 10000);
  };

  const prevCtaSlide = () => {
    setIsCtaAutoPlaying(false);
    setCtaIndex((prev) => (prev - 1 + conferences.length) % conferences.length);
    setTimeout(() => setIsCtaAutoPlaying(true), 10000);
  };

  const currentConference = conferences[currentIndex];

  return (
    <div className="w-full max-w-6xl mx-auto mb-12">
      {/* Carousel Header */}

      {/* Main Carousel */}
      <div className="flex items-stretch gap-4">
        {/* Left Ad Banner */}
        <div className="hidden lg:flex w-48 bg-white text-white rounded-2xl shadow-2xl p-4 items-center justify-center">
          <Image
            src="https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/Adverts/AGFT.png"
            alt="Banner advertisement"
            width={192} // Matches the w-48 (48 * 4 = 192px, assuming 1rem = 16px)
            height={192} // Adjust based on image's aspect ratio
            className="object-contain w-full h-auto rounded-xl"
          />
        </div>
        {/* Main Carousel */}
        <NewsTicker></NewsTicker>
        {/* Right Ad Banner */}
        <div className="hidden lg:flex w-48 bg-white text-white rounded-2xl shadow-2xl p-4 items-center justify-center text-center">
          <Image
            src="https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/Adverts/mypursu.png"
            alt="Banner advertisement"
            width={192} // Matches the w-48 (48 * 4 = 192px, assuming 1rem = 16px)
            height={192} // Adjust based on image's aspect ratio
            className="object-contain w-full h-auto rounded-xl"
          />
        </div>
      </div>

      {/* Carousel Indicators */}
     

      <Organisations></Organisations>

      <USStatesPreview></USStatesPreview>

      {/* Call to Action Carousel */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-xl md:text-2xl font-bold ${theme.title}`}>
            Sponsored Posts
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsCtaAutoPlaying(!isCtaAutoPlaying)}
              className={`${theme.card} p-2 rounded-lg transition-all duration-300 hover:scale-105`}
              aria-label={
                isCtaAutoPlaying ? "Pause CTA autoplay" : "Resume CTA autoplay"
              }
            >
              {isCtaAutoPlaying ? (
                <div className="w-4 h-4 flex items-center justify-center">
                  <div className="w-1 h-3 bg-current mr-0.5"></div>
                  <div className="w-1 h-3 bg-current"></div>
                </div>
              ) : (
                <Play className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div
          className="relative overflow-hidden rounded-xl"
          onMouseEnter={() => setIsCtaHovered(true)}
          onMouseLeave={() => setIsCtaHovered(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${ctaIndex * 100}%)` }}
          >
            {conferences.map((conference, index) => (
              <div key={conference.id} className="w-full flex-shrink-0">
                <div
                  className={`${theme.card} rounded-xl p-6 md:p-8 text-center relative overflow-hidden`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-400"></div>
                    <div className="absolute top-4 left-4 text-6xl opacity-20">
                      {conference.logo ? (
                        <img
                          src={conference.logo}
                          alt=""
                          className="w-16 h-16 object-contain opacity-20"
                        />
                      ) : (
                        conference.icon
                      )}
                    </div>
                    <div className="absolute bottom-4 right-4 text-6xl opacity-20">
                      {conference.logo ? (
                        <img
                          src={conference.logo}
                          alt=""
                          className="w-16 h-16 object-contain opacity-20"
                        />
                      ) : (
                        conference.icon
                      )}
                    </div>
                  </div>

                  <div className="relative z-10">
                    <div className="mb-4 animate-pulse flex justify-center">
                      {renderConferenceLogo(conference, "xlarge")}
                    </div>
                    <h3
                      className={`text-2xl md:text-3xl font-bold ${theme.title} mb-3`}
                    ></h3>
                    <p
                      className={`${theme.description} text-base md:text-lg mb-6 max-w-2xl mx-auto`}
                    >
                      {conference.description} - Experience the highlights and
                      exclusive moments from this premier Telugu community
                      event.
                    </p>

                    <div className="flex flex-wrap justify-center items-center gap-4 mb-6 text-sm">
                      <div className="flex items-center space-x-2 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full">
                        <Youtube className="w-4 h-4 text-red-500" />
                        <span className="text-red-600 dark:text-red-400 font-medium">
                          {conference.youtubePlaylist?.length || 0} Exclusive
                          Videos
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          Available Now
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onConferenceSelect(conference)}
                      className={`bg-gradient-to-r ${conference.bgGradient} hover:opacity-90 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center space-x-3`}
                    >
                      <Play className="w-6 h-6" />
                      <span>Explore {conference.name}</span>
                      <Calendar className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Navigation Arrows */}
          <button
            onClick={prevCtaSlide}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${theme.card} hover:shadow-lg p-3 rounded-full transition-all duration-300 hover:scale-110 z-20`}
            aria-label="Previous featured event"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextCtaSlide}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${theme.card} hover:shadow-lg p-3 rounded-full transition-all duration-300 hover:scale-110 z-20`}
            aria-label="Next featured event"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* CTA Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {conferences.map((conference, index) => (
            <button
              key={index}
              onClick={() => {
                setIsCtaAutoPlaying(false);
                setCtaIndex(index);
                setTimeout(() => setIsCtaAutoPlaying(true), 10000);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === ctaIndex
                  ? `bg-gradient-to-r ${conference.bgGradient} scale-125 shadow-lg`
                  : "bg-gray-400 hover:bg-gray-300"
              }`}
              aria-label={`Feature ${conference.name}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
