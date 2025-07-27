"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import Image from "next/image";
interface Conference {
  id: string;
  name: string;
  color: string;
  youtubePlaylist?: string | null;
  image?: {
    id: string;
    url?: string;
    alt?: string;
  };
  events?: number;
  isActive?: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface Theme {
  card: string;
  title: string;
  description: string;
}

interface ConferenceCarouselProps {
  theme: Theme;
  itemsPerView?: number;
  collectionSlug?: string;
}

const ConferenceCarousel: React.FC<ConferenceCarouselProps> = ({
  theme,
  itemsPerView = 2,
  collectionSlug = "organisations",
}) => {
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [isPreviewAutoPlaying, setIsPreviewAutoPlaying] =
    useState<boolean>(true);
  const [isPreviewHovered, setIsPreviewHovered] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch conferences from Payload CMS
  useEffect(() => {
    const fetchConferences = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/${collectionSlug}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch conferences: ${response.statusText}`,
          );
        }

        const data = await response.json();
        setConferences(data.docs || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching conferences:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConferences();
  }, [collectionSlug]);

  // Auto-play effect
  useEffect(() => {
    if (!isPreviewAutoPlaying || isPreviewHovered || conferences.length === 0)
      return;

    const interval = setInterval(() => {
      setPreviewIndex((prev) =>
        prev >= conferences.length - itemsPerView ? 0 : prev + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [
    isPreviewAutoPlaying,
    isPreviewHovered,
    conferences.length,
    itemsPerView,
  ]);

  const goToSlide = (index: number): void => {
    setIsPreviewAutoPlaying(false);
    setPreviewIndex(index);
    setCurrentIndex(index);
    setTimeout(() => setIsPreviewAutoPlaying(true), 10000);
  };

  const prevPreviewSlide = (): void => {
    setIsPreviewAutoPlaying(false);
    setPreviewIndex((prev) =>
      prev === 0 ? conferences.length - itemsPerView : prev - 1,
    );
    setTimeout(() => setIsPreviewAutoPlaying(true), 10000);
  };

  const nextPreviewSlide = (): void => {
    setIsPreviewAutoPlaying(false);
    setPreviewIndex((prev) =>
      prev >= conferences.length - itemsPerView ? 0 : prev + 1,
    );
    setTimeout(() => setIsPreviewAutoPlaying(true), 10000);
  };

  const getBorderColor = (color: string, isActive: boolean): string => {
    if (!isActive) return "transparent";
    const colors: Record<string, string> = {
      blue: "#3b82f6",
      green: "#10b981",
      red: "#ef4444",
      purple: "#8b5cf6",
      yellow: "#f59e0b",
      forest: "#065f46",
      orange: "#f97316",
      cyan: "#22d3ee",
      teal: "#14b8a6",
      indigo: "#4f46e5",
      amber: "#d97706",
      rose: "#e11d48",
      gray: "#6b7280",
    };
    return colors[color.toLowerCase()] || "#6b7280";
  };

  // Render loading state
  if (loading) {
    return (
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-xl md:text-2xl font-bold">
            Indian Organizations
          </h3>
        </div>
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-xl md:text-2xl font-bold">
            Indian Organizations
          </h3>
        </div>
        <div className="flex justify-center items-center h-48">
          <p className="text-red-500">Error loading organizations: {error}</p>
        </div>
      </div>
    );
  }

  if (conferences.length === 0) {
    return (
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-xl md:text-2xl font-bold">
            Indian Organizations
          </h3>
        </div>
        <div className="flex justify-center items-center h-48">
          <p className="text-gray-400">No organizations found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-xl md:text-2xl font-bold">
          Indian Organizations
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPreviewAutoPlaying(!isPreviewAutoPlaying)}
            className={`${theme.card} p-2 rounded-lg transition-all duration-300 hover:scale-105`}
            aria-label={
              isPreviewAutoPlaying
                ? "Pause preview autoplay"
                : "Resume preview autoplay"
            }
          >
            {isPreviewAutoPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPreviewHovered(true)}
        onMouseLeave={() => setIsPreviewHovered(false)}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out gap-4"
          style={{
            transform: `translateX(-${previewIndex * (100 / itemsPerView)}%)`,
            width: `${(conferences.length / itemsPerView) * 100}%`,
          }}
        >
          {conferences.map((conference, index) => (
            <button
              key={conference.id}
              onClick={() => goToSlide(index)}
              className={`${theme.card} rounded-xl p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border-2 group flex-shrink-0`}
              style={{
                width: `${100 / itemsPerView}%`,
                borderColor: getBorderColor(
                  conference.color,
                  index === currentIndex,
                ),
              }}
            >
              <div className="text-center">
                <div className="mb-2 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  {conference.image && conference.image.url ? (
                    <Image
                      src={conference.image.url}
                      alt={conference.image.alt || conference.name}
                      className="w-16 h-16 object-cover rounded-full"
                    />
                  ) : (
                    <Image
                      src="/images/default-organisation.jpg"
                      alt="Default Organisation Image"
                      className="w-16 h-16 object-cover rounded-full"
                    />
                  )}
                </div>
                <h4
                  className={`${theme.title} font-semibold text-sm md:text-md mb-1 line-clamp-2`}
                >
                  {conference.name}
                </h4>
                <p className={`${theme.description} text-xs md:text-sm mb-2`}>
                  {conference.youtubePlaylist?.length || 0} videos
                </p>
                <div className="flex items-center justify-center space-x-2">
                  <img
                    src="/images/youtube-logo.jpg"
                    alt="YouTube"
                    className="w-4 h-4 object-contain"
                  />
                  <img
                    src="/images/clock-icon.png"
                    alt="Time"
                    className="w-4 h-4 object-contain"
                  />
                </div>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => prevPreviewSlide()}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 ${theme.card} hover:shadow-lg p-2 rounded-full transition-all duration-300 hover:scale-110 z-10 -ml-2`}
          aria-label="Previous preview items"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => nextPreviewSlide()}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 ${theme.card} hover:shadow-lg p-2 rounded-full transition-all duration-300 hover:scale-110 z-10 -mr-2`}
          aria-label="Next preview items"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({
          length: Math.max(1, conferences.length - itemsPerView + 1),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === previewIndex
                ? "bg-blue-500 scale-125"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to preview page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ConferenceCarousel;
