"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { sampleStates } from "../../lib/constants";

// State interface matching Payload collection structure
interface State {
  id: string;
  name: string;
  color: string;
  events: number;
  type: string;
  image?: string;
}

const AppleTVStatesShelf: React.FC = () => {
  const [states, setStates] = useState<State[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(5);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const CARD_WIDTH = 260;
  const CARD_GAP = 20;
  const AUTO_SCROLL_INTERVAL = 3000; // 3 seconds

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

  // Fetch state data from Payload CMS API
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await fetch("/api/states?limit=100");
        const data = await res.json();
        if (data && data.docs) {
          setStates(data.docs.length > 0 ? data.docs : sampleStates);
        } else {
          setStates(sampleStates);
        }
      } catch (error) {
        console.error("Error fetching states:", error);
        setStates(sampleStates);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStates();
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoScrolling || isPaused || states.length === 0) {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
      return;
    }

    autoScrollRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => {
        // If we're at the end, loop back to the beginning
        if (prevIndex >= states.length - itemsPerView) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, AUTO_SCROLL_INTERVAL);

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isAutoScrolling, isPaused, states.length, itemsPerView]);


  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const canGoLeft = currentIndex > 0;
  const canGoRight = currentIndex < states.length - itemsPerView;

  const handlePrevious = () => {
    if (canGoLeft) {
      setCurrentIndex(prev => Math.max(0, prev - 1));
    } else {
      // If at the beginning, go to the end
      setCurrentIndex(states.length - itemsPerView);
    }
  };

  const handleNext = () => {
    if (canGoRight) {
      setCurrentIndex(prev => Math.min(states.length - itemsPerView, prev + 1));
    } else {
      // If at the end, go to the beginning
      setCurrentIndex(0);
    }
  };

  const toggleAutoScroll = () => {
    setIsAutoScrolling(!isAutoScrolling);
  };

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      red: 'from-red-600 to-red-800',
      blue: 'from-blue-600 to-blue-800',
      purple: 'from-purple-600 to-purple-800',
      green: 'from-green-600 to-green-800',
      orange: 'from-orange-600 to-orange-800',
      cyan: 'from-cyan-600 to-cyan-800',
      teal: 'from-teal-600 to-teal-800',
      indigo: 'from-indigo-600 to-indigo-800',
      amber: 'from-amber-600 to-amber-800',
      rose: 'from-rose-600 to-rose-800',
      yellow: 'from-yellow-600 to-yellow-800',
      forest: 'from-emerald-600 to-emerald-800',
      gray: 'from-gray-600 to-gray-800',
    };
    return colorMap[color] || 'from-gray-600 to-gray-800';
  };

  const getEventBadgeColor = (eventCount: number): string => {
    if (eventCount >= 200) return "bg-red-500";
    if (eventCount >= 150) return "bg-orange-500";
    if (eventCount >= 100) return "bg-yellow-500";
    if (eventCount >= 50) return "bg-green-500";
    return "bg-blue-500";
  };

  const getPlaceholderImage = (state: State): string => {
    const colors = [
      "FF6B6B",
      "4ECDC4",
      "45B7D1",
      "FFA07A",
      "98D8C8",
      "FDCB6E",
      "E17055",
      "74B9FF",
      "A29BFE",
      "FD79A8",
    ];
    const colorIndex = state.name.length % colors.length;
    const color = colors[colorIndex];
    return `https://via.placeholder.com/400x250/${color}/FFFFFF?text=${encodeURIComponent(state.name)}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading states...</div>
      </div>
    );
  }

  return (
    <div className="text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <h2 className="text-3xl font-bold mr-4">
              Happenings by State
            </h2>
            <ChevronRight className="w-6 h-6 text-gray-400" />
          </div>
         
         
        </div>

        {/* Shelf Container */}
        <div 
          className="relative"
          ref={containerRef}
          onMouseLeave={handleMouseLeave}
        >
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 bg-black/60 hover:bg-black/80 text-white cursor-pointer"
            style={{ marginLeft: '-24px' }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 bg-black/60 hover:bg-black/80 text-white cursor-pointer"
            style={{ marginRight: '-24px' }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Auto-scroll indicator */}
          {isAutoScrolling && !isPaused && (
            <div className="absolute top-0 right-0 z-20">
            
            </div>
          )}

          {/* States Single Row Scroll */}
          <div className="overflow-hidden">
            <div 
              className="flex gap-4 lg:gap-5 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (CARD_WIDTH + CARD_GAP)}px)`,
                width: `${states.length * (CARD_WIDTH + CARD_GAP)}px`
              }}
            >
              {states.map((state, index) => (
                <div
                  key={state.id}
                  className="relative group cursor-pointer flex-shrink-0"
                  style={{ width: `${CARD_WIDTH}px` }}
                  onClick={() => {
                    // Handle state click - could navigate to state page
                    console.log('Clicked state:', state.name);
                  }}
                >
                  {/* State Card */}
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    {/* State Image or Placeholder */}
                    {state.image ? (
                      <div className="absolute inset-0">
                        <img
                          src={state.image}
                          alt={state.name}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = target.parentElement?.querySelector('.fallback-bg');
                            if (fallback) {
                              (fallback as HTMLElement).style.display = 'flex';
                            }
                          }}
                        />
                        <div className={`absolute inset-0 hidden items-center justify-center bg-gradient-to-br ${getColorClass(state.color)} text-white font-bold text-3xl tracking-wider fallback-bg`}>
                          {state.name.slice(0, 2).toUpperCase()}
                        </div>
                      </div>
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${getColorClass(state.color)} flex items-center justify-center`}>
                        <span className="text-white text-2xl font-bold">
                          {state.name.slice(0, 2).toUpperCase()}
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

                    {/* Rank Badge */}
                    <div className="absolute top-2 left-2">
                      <div className="w-8 h-8 bg-black/80 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                    </div>

                    {/* Event Count Badge */}
                    <div className={`absolute top-2 right-12 ${getEventBadgeColor(state.events)} text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                      {state.events} events
                    </div>
                  </div>

                  {/* State Info */}
                  <div className="mt-3">
                    <h3 className="text-white font-semibold text-sm lg:text-base leading-tight mb-1">
                      {state.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress indicator */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: Math.ceil(states.length / itemsPerView) }).map((_, index) => {
              const isActive = Math.floor(currentIndex / itemsPerView) === index;
              return (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * itemsPerView)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    isActive ? 'bg-white scale-125' : 'bg-gray-600 hover:bg-gray-400'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppleTVStatesShelf;