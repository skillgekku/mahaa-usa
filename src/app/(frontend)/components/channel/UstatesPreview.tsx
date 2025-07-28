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
  const itemWidth = 5 / itemsPerView; // Percentage width per item

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
    const duplicateCount = Math.max(2, Math.ceil(itemsPerView / states.length));
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
            setTimeout(() => setIsTransitioning(true), 50);
          }, 50);
          return prev;
        }
        
        return newTranslateX;
      });
    }, 500);

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
          setTimeout(() => setIsTransitioning(true), 50);
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
          setTimeout(() => setIsTransitioning(true), 50);
        }, 50);
        return prev;
      }
      
      return prev - itemWidth;
    });
  };

  const theme = {
    title: "text-gray-800",
    description: "text-gray-600",
    card: "bg-white shadow-md",
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

  // Updated rendering function with placeholder image
  const renderStateImage = (state: any): JSX.Element => {
    const imageUrl = state.image || getPlaceholderImage(state);

    return (
      <div className="w-full h-32 mb-3 overflow-hidden rounded-lg bg-gray-100">
        <img
          src={imageUrl}
          alt={`${state.name} placeholder`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            // Fallback to a colored div if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            if (target.nextElementSibling) {
              (target.nextElementSibling as HTMLElement).style.display = "flex";
            }
          }}
        />
        <div
          className="w-full h-full hidden items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-white font-bold text-2xl"
          style={{ display: "none" }}
        >
          {state.name.slice(0, 2).toUpperCase()}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto py-16 text-center text-gray-500">
        Loading states...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8 rounded-2xl">
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl text-white md:text-2xl font-bold">
            Happenings by State
          </h3>
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="bg-white/10 backdrop-blur-sm border border-white/20 p-3 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-white/20"
            aria-label={
              isAutoPlaying
                ? "Pause preview autoplay"
                : "Resume preview autoplay"
            }
          >
            {isAutoPlaying ? (
              <div className="w-4 h-4 flex items-center justify-center text-white">
                <div className="w-1 h-3 bg-current mr-0.5"></div>
                <div className="w-1 h-3 bg-current"></div>
              </div>
            ) : (
              <Play className="w-4 h-4 text-white" />
            )}
          </button>
        </div>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className={`flex gap-4 ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
            style={{
              transform: `translateX(-${translateX}%)`,
              width: `${(extendedStates.length / itemsPerView) * 100}%`,
            }}
          >
            {extendedStates.map((state, index) => (
              <button
                key={state.id}
                onClick={() => goToSlide(state.originalIndex)}
                className={`${theme.card} rounded-xl p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group flex-shrink-0 ${
                  state.originalIndex === currentIndex
                    ? "ring-2 ring-blue-500 ring-opacity-50"
                    : ""
                }`}
                style={{
                  width: `${100 / extendedStates.length}%`,
                }}
              >
                <div className="text-center">
                  {renderStateImage(state)}
                  <h4 className={`${theme.title} font-semibold text-sm mb-1 line-clamp-2`}>
                    {state.name}
                  </h4>
                 
                 
                </div>
              </button>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110 z-10 -ml-2"
            aria-label="Previous preview items"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110 z-10 -mr-2"
            aria-label="Next preview items"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Pagination dots - only show if we have more than itemsPerView states */}
        {states.length > itemsPerView && (
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: Math.min(5, Math.ceil(states.length / itemsPerView)) }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  goToSlide(index * itemsPerView);
                  setTimeout(() => setIsAutoPlaying(true), 10000);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / itemsPerView) === index
                    ? "bg-white scale-125 shadow-lg"
                    : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default USStatesPreview;
