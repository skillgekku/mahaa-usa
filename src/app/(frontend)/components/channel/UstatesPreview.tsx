"use client";

import React, { useState, useEffect, JSX } from "react";
import { Play, ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";

// State interface matching Payload collection structure
interface State {
  id: string;
  name: string;
  color: string;
  events: number;
  type: string;
  image?: string;
}

const sampleStates: State[] = [
  {
    id: "1",
    name: "Texas",
    color: "red",
    events: 147,
    type: "state",
    image:
      "https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/states/Texas.png",
  },
  {
    id: "2",
    name: "California",
    color: "blue",
    events: 203,
    type: "state",
    image:
      "https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/states/California.png",
  },
  {
    id: "3",
    name: "Michigan",
    color: "purple",
    events: 89,
    type: "state",
    image:
      "https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/states/Michigan.png",
  },
  {
    id: "4",
    name: "Washington",
    color: "green",
    events: 134,
    type: "state",
    image:
      "https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/states/Washington.png",
  },
  {
    id: "5",
    name: "Arizona",
    color: "orange",
    events: 76,
    type: "state",
    image:
      "https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/states/Arizona.png",
  },
  {
    id: "6",
    name: "Florida",
    color: "cyan",
    events: 192,
    type: "state",
    image:
      "https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/states/Florida.png",
  },
  {
    id: "7",
    name: "North Carolina",
    color: "teal",
    events: 98,
    type: "state",
    image:
      "https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/states/North%20Carolina.png",
  },
  {
    id: "8",
    name: "Illinois",
    color: "indigo",
    events: 156,
    type: "state",
    image:
      "https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/states/Illinois.png",
  },
  {
    id: "9",
    name: "New Jersey",
    color: "amber",
    events: 87,
    type: "state",
    image:
      "https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/states/New%20Jersey.png",
  },
  {
    id: "10",
    name: "New York",
    color: "rose",
    events: 234,
    type: "state",
    image:
      "https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/states/New%20York.png",
  },
  {
    id: "11",
    name: "Kansas",
    color: "yellow",
    events: 54,
    type: "state",
    image:
      "https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/states/Kansas.png",
  },
  {
    id: "12",
    name: "Georgia",
    color: "forest",
    events: 112,
    type: "state",
    image:
      "https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/states/Georgia.png",
  },
  {
    id: "13",
    name: "Ohio",
    color: "gray",
    events: 78,
    type: "state",
    image:
      "https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/states/Ohio.png",
  },
  {
    id: "14",
    name: "Pennsylvania",
    color: "blue",
    events: 145,
    type: "state",
    image:
      "https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/states/Pennsylvania.png",
  },
  {
    id: "15",
    name: "Virginia",
    color: "purple",
    events: 92,
    type: "state",
    image:
      "https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/states/Virginia.png",
  },
  {
    id: "16",
    name: "Others",
    color: "green",
    events: 103,
    type: "state",
    image:
      "https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/states/Colorado.png",
  },
];

// Component starts
const USStatesPreview: React.FC = () => {
  const [states, setStates] = useState<State[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [translateX, setTranslateX] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  
  const itemsPerView = 4;
  const itemWidth = 100 / itemsPerView; // Percentage width per item

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

  // Create extended array for infinite scroll
  const extendedStates = React.useMemo(() => {
    if (states.length === 0) return [];
    
    // Create enough duplicates to ensure smooth infinite scrolling
    const duplicateCount = Math.max(3, Math.ceil(itemsPerView * 2 / states.length));
    const extended = [];
    
    for (let i = 0; i < duplicateCount; i++) {
      extended.push(...states.map((state, index) => ({
        ...state,
        id: `${state.id}-${i}-${index}`, // Unique ID for React keys
        originalIndex: index
      })));
    }
    
    return extended;
  }, [states, itemsPerView]);

  // Auto-play functionality with infinite loop
  useEffect(() => {
    if (!isAutoPlaying || isHovered || states.length === 0) return;

    const interval = setInterval(() => {
      setTranslateX(prev => {
        const newTranslateX = prev + itemWidth;
        
        // Reset position when we've scrolled through one complete set
        if (newTranslateX >= states.length * itemWidth) {
          // Temporarily disable transition for seamless reset
          setIsTransitioning(false);
          setTimeout(() => {
            setTranslateX(0);
            setTimeout(() => setIsTransitioning(true), 100);
          }, 50);
          return prev;
        }
        
        return newTranslateX;
      });
    }, 2000); // Slower auto-scroll for better UX

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, states.length, itemWidth]);

  const goToSlide = (index: number): void => {
    setCurrentIndex(index);
    setTranslateX(index * itemWidth);
  };

  const nextSlide = (): void => {
    setTranslateX(prev => {
      const newTranslateX = prev + itemWidth;
      
      if (newTranslateX >= states.length * itemWidth) {
        setIsTransitioning(false);
        setTimeout(() => {
          setTranslateX(0);
          setTimeout(() => setIsTransitioning(true), 100);
        }, 300);
        return prev;
      }
      
      return newTranslateX;
    });
  };

  const prevSlide = (): void => {
    setTranslateX(prev => {
      if (prev <= 0) {
        const lastPosition = (states.length - itemsPerView) * itemWidth;
        setIsTransitioning(false);
        setTimeout(() => {
          setTranslateX(lastPosition);
          setTimeout(() => setIsTransitioning(true), 100);
        }, 50);
        return prev;
      }
      
      return prev - itemWidth;
    });
  };

  // Generate placeholder image URL
  const getPlaceholderImage = (state: any): string => {
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

  // Color mapping for event badges
  const getEventBadgeColor = (eventCount: number): string => {
    if (eventCount >= 200) return "bg-red-500";
    if (eventCount >= 150) return "bg-orange-500";
    if (eventCount >= 100) return "bg-yellow-500";
    if (eventCount >= 50) return "bg-green-500";
    return "bg-blue-500";
  };

  // Updated rendering function with placeholder image
  const renderStateImage = (state: any): JSX.Element => {
    const imageUrl = state.image || getPlaceholderImage(state);

    return (
      <div className="relative w-full h-40 mb-4 overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner">
        <img
          src={imageUrl}
          alt={`${state.name} placeholder`}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            if (target.nextElementSibling) {
              (target.nextElementSibling as HTMLElement).style.display = "flex";
            }
          }}
        />
        <div
          className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white font-bold text-3xl tracking-wider"
          style={{ display: "none" }}
        >
          {state.name.slice(0, 2).toUpperCase()}
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Event count badge */}
        <div className={`absolute top-3 right-3 ${getEventBadgeColor(state.events)} text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg backdrop-blur-sm`}>
          {state.events}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        <div className="inline-flex items-center justify-center space-x-2 text-white">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          <span className="ml-3 text-lg font-medium">Loading states...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-7xl mx-auto">
      

        {/* Main Preview Section */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                  Happenings by State
                </h3>
               
              </div>
            </div>
            
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="group bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:border-white/30 shadow-lg"
              aria-label={
                isAutoPlaying
                  ? "Pause preview autoplay"
                  : "Resume preview autoplay"
              }
            >
              {isAutoPlaying ? (
                <div className="w-5 h-5 flex items-center justify-center text-white">
                  <div className="w-1.5 h-4 bg-current mr-1 rounded-sm group-hover:bg-blue-300 transition-colors"></div>
                  <div className="w-1.5 h-4 bg-current rounded-sm group-hover:bg-blue-300 transition-colors"></div>
                </div>
              ) : (
                <Play className="w-5 h-5 text-white group-hover:text-blue-300 transition-colors" />
              )}
            </button>
          </div>

          <div
            className="relative overflow-hidden rounded-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className={`flex gap-6 ${isTransitioning ? 'transition-transform duration-700 ease-out' : ''}`}
              style={{
                transform: `translateX(-${translateX}%)`,
                width: `${(extendedStates.length / itemsPerView) * 100}%`,
              }}
            >
              {extendedStates.map((state, index) => (
                <button
                  key={state.id}
                  onClick={() => goToSlide(state.originalIndex)}
                  className={`group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:bg-white/20 hover:border-white/30 flex-shrink-0 ${
                    state.originalIndex === currentIndex
                      ? "ring-2 ring-blue-400 ring-opacity-70 shadow-lg shadow-blue-500/25"
                      : ""
                  }`}
                  style={{
                    width: `calc(${100 / extendedStates.length}% - 1.5rem)`,
                    minWidth: '280px'
                  }}
                >
                  <div className="text-center">
                    {renderStateImage(state)}
                    
                    <div className="space-y-3">
                      <h4 className="text-white font-bold text-lg leading-tight group-hover:text-blue-300 transition-colors duration-300">
                        {state.name}
                      </h4>
                      
                     
                      
                      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-full ${getEventBadgeColor(state.events)} transition-all duration-500 rounded-full`}
                          style={{ width: `${Math.min((state.events / 250) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Enhanced Navigation arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/25 hover:border-white/40 p-4 rounded-full transition-all duration-300 hover:scale-110 z-10 shadow-xl group"
              aria-label="Previous preview items"
            >
              <ChevronLeft className="w-5 h-5 text-white group-hover:text-blue-300 transition-colors" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/25 hover:border-white/40 p-4 rounded-full transition-all duration-300 hover:scale-110 z-10 shadow-xl group"
              aria-label="Next preview items"
            >
              <ChevronRight className="w-5 h-5 text-white group-hover:text-blue-300 transition-colors" />
            </button>
          </div>

          {/* Enhanced Pagination dots */}
          {states.length > itemsPerView && (
            <div className="flex justify-center mt-8 space-x-3">
              {Array.from({ length: Math.min(5, Math.ceil(states.length / itemsPerView)) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    goToSlide(index * itemsPerView);
                    setTimeout(() => setIsAutoPlaying(true), 10000);
                  }}
                  className={`transition-all duration-400 rounded-full ${
                    Math.floor(currentIndex / itemsPerView) === index
                      ? "w-8 h-3 bg-white shadow-lg shadow-white/25"
                      : "w-3 h-3 bg-white/40 hover:bg-white/70 hover:scale-125"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

      
      </div>
    </div>
  );
};

export default USStatesPreview;