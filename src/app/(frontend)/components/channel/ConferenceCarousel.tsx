"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChannelConfig } from "@/app/(frontend)/lib/types";
import { useTheme } from "@/app/(frontend)/hooks/useTheme";
import { THEME_CLASSES } from "@/app/(frontend)/lib/constants";
import USStatesPreview from "@/app/(frontend)/components/channel/UstatesPreview";
import Organisations from "@/app/(frontend)/components/channel/Organisations";
import Image from "next/image";
import NewsTicker from "@/app/(frontend)/components/channel/NewsTicker";
import NewsSection from "@/app/(frontend)/components/channel/Articles"
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
    <NewsSection></NewsSection>
        </div>

      
      </div>
    </div>
  );
}
