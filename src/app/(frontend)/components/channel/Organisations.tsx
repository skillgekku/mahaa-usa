"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal, Pause, Play } from "lucide-react";

interface Organization {
  id: string;
  name: string;
  color: string;
  type: string;
  website?: string;
  logo?: string;
}

const SAMPLE_ORGANIZATIONS: Organization[] = [
  {
    id: "1",
    name: "TANA",
    color: "blue",
    type: "organization",
    website: "https://www.tana.org/",
    logo: "https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/TANA.png",
  },
  {
    id: "2",
    name: "NATS",
    color: "green",
    type: "organization",
    website: "https://www.natsworld.org/",
    logo: "https://natsworld.org/Content/User/images/logo.png",
  },
  {
    id: "3",
    name: "TTA",
    color: "purple",
    type: "organization",
    website: "https://mytelanganaus.org/",
    logo: "https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/TTA2.png",
  },
  {
    id: "4",
    name: "ATA",
    color: "orange",
    type: "organization",
    website: "https://americanteluguassociation.org/",
    logo: "https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/ATA.webp",
  },
  {
    id: "5",
    name: "AAA",
    color: "red",
    type: "organization",
    website: "https://www.theaaa.org/Global/index",
    logo: "https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/AndhraAmericanAssociation.png",
  },
  {
    id: "6",
    name: "Miss Telugu USA",
    color: "purple",
    type: "organization",
    website: "https://www.missteluguusa.com/",
    logo: "https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/Miss%20Telugu%202.png",
  },
];

const AppleTVOrganizationsShelf: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(5);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const CARD_WIDTH = 260;
  const CARD_GAP = 20;
  const AUTO_SCROLL_INTERVAL = 1000; // 3 seconds

  // Create extended array for infinite scroll effect
  const extendedOrganizations = organizations.length > 0 
    ? [...organizations, ...organizations, ...organizations] 
    : [];
  
  const originalLength = organizations.length;
  const startIndex = originalLength; // Start from the middle copy

  // Fetch organizations
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const res = await fetch("/api/organizations?limit=100");
        const data = await res.json();
        
        if (data?.docs) {
          setOrganizations(SAMPLE_ORGANIZATIONS);
        } else {
          setOrganizations(SAMPLE_ORGANIZATIONS);
        }
      } catch (error) {
        console.error("Error fetching organizations, using sample data:", error);
        setOrganizations(SAMPLE_ORGANIZATIONS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  // Initialize starting position
  useEffect(() => {
    if (organizations.length > 0 && currentIndex === 0) {
      setCurrentIndex(startIndex);
    }
  }, [organizations.length, startIndex]);

  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width > 1200) setItemsPerView(5);
      else if (width > 900) setItemsPerView(4);
      else if (width > 600) setItemsPerView(3);
      else setItemsPerView(2);
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoScrolling || isPaused || organizations.length === 0) {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
      return;
    }

    autoScrollRef.current = setInterval(() => {
      handleNext();
    }, AUTO_SCROLL_INTERVAL);

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isAutoScrolling, isPaused, organizations.length]);

  // Handle infinite scroll reset
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    
    // Reset to middle section if we're at the boundaries
    if (currentIndex >= originalLength * 2) {
      setCurrentIndex(currentIndex - originalLength);
    } else if (currentIndex < originalLength) {
      setCurrentIndex(currentIndex + originalLength);
    }
    
    // Re-enable transitions after a brief delay
    setTimeout(() => setIsTransitioning(true), 50);
  };

  // Pause auto-scroll on hover
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handlePrevious = () => {
    if (originalLength === 0) return;
    
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
  };

  const handleNext = () => {
    if (originalLength === 0) return;
    
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  };

  const toggleAutoScroll = () => {
    setIsAutoScrolling(!isAutoScrolling);
  };

const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: 'white',
      green: 'white',
      purple: 'white',
      orange: 'white',
      red: 'white',
    };
    return colorMap[color] || 'white';
};

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading organizations...</div>
      </div>
    );
  }

  return (
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <h2 className="text-3xl font-bold mr-4">
              Organizations
            </h2>
            <ChevronRight className="w-6 h-6 text-gray-400" />
          </div>
          
          {/* Auto-scroll toggle */}
          <button
            onClick={toggleAutoScroll}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            {isAutoScrolling ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="text-sm">{isAutoScrolling ? 'Pause' : 'Play'}</span>
          </button>
        </div>

        {/* Shelf Container */}
        <div 
          className="relative"
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            disabled={originalLength === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 bg-black/60 hover:bg-black/80 text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ marginLeft: '-24px' }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            disabled={originalLength === 0}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 bg-black/60 hover:bg-black/80 text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ marginRight: '-24px' }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Organizations Grid - Infinite Scroll */}
          <div className="overflow-hidden">
            <div 
              className={`flex gap-4 lg:gap-5 ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
              style={{
                transform: `translateX(-${currentIndex * (CARD_WIDTH + CARD_GAP)}px)`,
                width: `${extendedOrganizations.length * (CARD_WIDTH + CARD_GAP)}px`
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedOrganizations.map((org, index) => (
                <div
                  key={`${org.id}-${index}`}
                  className="relative group cursor-pointer flex-shrink-0"
                  style={{ width: `${CARD_WIDTH}px` }}
                  onClick={() => org.website && window.open(org.website, '_blank')}
                >
                  {/* Organization Card */}
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${getColorClass(org.color)} opacity-90`} />
                    
                    {/* Logo */}
                    {org.logo ? (
                      <div className="absolute inset-0 flex items-center justify-center p-4">
                        <img
                          src={org.logo}
                          alt={org.name}
                          className="max-w-full max-h-full object-contain filter brightness-110 transition-all duration-500 group-hover:scale-110"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-xl font-bold">
                          {org.name.charAt(0)}
                        </span>
                      </div>
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Options Menu */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button className="w-7 h-7 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center">
                        <MoreHorizontal className="w-4 h-4 text-white" />
                      </button>
                    </div>

                    {/* Website indicator */}
                    {org.website && (
                      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="bg-black/60 text-white text-xs px-2 py-1 rounded">
                          Visit Site
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Organization Info */}
                  <div className="mt-3">
                    <h3 className="text-white font-semibold text-sm lg:text-base leading-tight mb-1">
                      {org.name}
                    </h3>
                    <div className="text-gray-400 text-xs lg:text-sm">
                      <span className="capitalize">{org.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress indicator - shows position within original array */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: originalLength }).map((_, index) => {
              const adjustedCurrentIndex = ((currentIndex % originalLength) + originalLength) % originalLength;
              const isActive = adjustedCurrentIndex === index;
              return (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(startIndex + index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    isActive ? 'bg-white scale-125' : 'bg-gray-600 hover:bg-gray-400'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
  );
};

export default AppleTVOrganizationsShelf;