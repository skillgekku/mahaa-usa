"use client";

import React, { useState, useEffect, JSX } from "react";
import { Play, ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";

// Organization interface matching Payload collection structure
interface Organization {
  id: string;
  name: string;
  color: string;
  type: string;
  website?: string;
  logo?: string;
}

// Sample organizations data based on your list
const sampleOrganizations: Organization[] = [
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
  {
    id: "7",
    name: "NATS World",
    color: "green",
    type: "organization",
    website: "https://www.natsworld.org/",
    logo: "https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/NATS.png",
  },
  {
    id: "8",
    name: "American Telugu Association",
    color: "orange",
    type: "organization",
    website: "https://americanteluguassociation.org/",
    logo: "https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/ATA.webp",
  },
];

// Component starts
const TeluguOrganizationsPreview: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [translateX, setTranslateX] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  
  const itemsPerView = 6;
  const itemWidth = 50 / itemsPerView; // Percentage width per item

  // Fetch organization data from Payload CMS API or use sample data
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const res = await fetch("/api/organizations?limit=100");
        const data = await res.json();
        if (data && data.docs) {
          setOrganizations(data.docs);
        } else {
          // Fallback to sample data if API is not available
          setOrganizations(sampleOrganizations);
        }
      } catch (error) {
        console.error(
          "Error fetching organizations, using sample data:",
          error,
        );
        // Use sample data as fallback
        setOrganizations(sampleOrganizations);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  // Create extended array for infinite scroll
  const extendedOrganizations = React.useMemo(() => {
    if (organizations.length === 0) return [];
    
    // Create enough duplicates to ensure smooth infinite scrolling
    const duplicateCount = Math.max(2, Math.ceil(itemsPerView / organizations.length));
    const extended = [];
    
    for (let i = 0; i < duplicateCount; i++) {
      extended.push(...organizations.map((org, index) => ({
        ...org,
        id: `${org.id}-${i}-${index}`, // Unique ID for React keys
        originalIndex: index
      })));
    }
    
    return extended;
  }, [organizations, itemsPerView]);

  // Auto-play functionality with infinite loop
  useEffect(() => {
    if (!isAutoPlaying || isHovered || organizations.length === 0) return;

    const interval = setInterval(() => {
      setTranslateX(prev => {
        const newTranslateX = prev + itemWidth;
        
        // Reset position when we've scrolled through one complete set
        if (newTranslateX >= organizations.length * itemWidth) {
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
    }, 1000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, organizations.length, itemWidth]);

  const goToSlide = (index: number): void => {
    setCurrentIndex(index);
    setTranslateX(index * itemWidth);
  };

  const nextSlide = (): void => {
    setTranslateX(prev => {
      const newTranslateX = prev + itemWidth;
      
      if (newTranslateX >= organizations.length * itemWidth) {
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
        const lastPosition = (organizations.length - itemsPerView) * itemWidth;
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

  const getBorderColor = (org: any, isSelected: boolean): string => {
    if (!isSelected) return "transparent";
    const colorMap: Record<string, string> = {
      blue: "#3b82f6",
      red: "#ef4444",
      green: "#10b981",
      purple: "#8b5cf6",
      yellow: "#f59e0b",
      forest: "#228B22",
      orange: "#FF8C00",
      cyan: "#00CED1",
      teal: "#008B8B",
      indigo: "#4B0082",
      amber: "#FFBF00",
      rose: "#FF69B4",
      gray: "#708090",
    };
    return colorMap[org.color] || "#6b7280";
  };

  // Enhanced organization logo rendering with actual logos or color-coded backgrounds
  const renderOrganizationLogo = (
    org: any,
    size: "medium" | "large" = "medium",
  ): JSX.Element => {
    const colorMap: Record<string, string> = {
      blue: "from-blue-400 to-blue-600",
      red: "from-red-400 to-red-600",
      green: "from-green-400 to-green-600",
      purple: "from-purple-400 to-purple-600",
      yellow: "from-yellow-400 to-yellow-600",
      forest: "from-green-600 to-green-800",
      orange: "from-orange-400 to-orange-600",
      cyan: "from-cyan-400 to-cyan-600",
      teal: "from-teal-400 to-teal-600",
      indigo: "from-indigo-400 to-indigo-600",
      amber: "from-amber-400 to-amber-600",
      rose: "from-rose-400 to-rose-600",
      gray: "from-gray-400 to-gray-600",
    };

    const gradient = colorMap[org.color] || "from-gray-300 to-gray-400";
    const sizeClass = size === "large" ? "w-12 h-12" : "w-8 h-8";

    // Get acronym from organization name
    const getAcronym = (name: string) => {
      const words = name
        .split(" ")
        .filter(
          (word) =>
            ![
              "of",
              "and",
              "the",
              "in",
              "for",
              "to",
              "at",
              "by",
              "from",
              "with",
              "&",
            ].includes(word.toLowerCase()),
        );
      return words
        .slice(0, 3)
        .map((word) => word[0])
        .join("")
        .toUpperCase();
    };

    // If organization has a logo, try to use it, otherwise fall back to acronym
    if (org.logo) {
      return (
        <div
          className={`${sizeClass} rounded-full flex items-center justify-center bg-white shadow-lg border-2 border-white/20 overflow-hidden`}
        >
          <img
            src={org.logo}
            alt={`${org.name} logo`}
            className="w-full h-full object-contain p-1"
            onError={(e) => {
              // Fallback to acronym if image fails to load
              const target = e.target as HTMLImageElement;
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `<div class="w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br ${gradient} text-white font-bold text-${size === "large" ? "lg" : "sm"}">${getAcronym(org.name)}</div>`;
              }
            }}
          />
        </div>
      );
    }

    // Fallback to acronym with gradient background
    return (
      <div
        className={`${sizeClass} rounded-full flex items-center justify-center bg-gradient-to-br ${gradient} text-white font-bold shadow-lg text-${size === "large" ? "lg" : "sm"}`}
      >
        {getAcronym(org.name)}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto py-16 text-center text-gray-500">
        <div className="animate-pulse">Loading organizations...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 rounded-xl">
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Organizations
            </h3>
          </div>
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
              <div className="w-5 h-5 flex items-center justify-center text-white">
                <div className="w-1.5 h-4 bg-current mr-1"></div>
                <div className="w-1.5 h-4 bg-current"></div>
              </div>
            ) : (
              <Play className="w-5 h-5 text-white" />
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
              width: `${(extendedOrganizations.length / itemsPerView) * 100}%`,
            }}
          >
            {extendedOrganizations.map((org, index) => (
              <button
                key={org.id}
                onClick={() => goToSlide(org.originalIndex)}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-5 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-2 group flex-shrink-0 hover:bg-white/20"
                style={{
                  width: `${100 / extendedOrganizations.length}%`,
                  borderColor: getBorderColor(org, org.originalIndex === currentIndex),
                }}
              >
                <div className="text-center">
                  <div className="mb-3 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                    {renderOrganizationLogo(org, "large")}
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
                    {org.name}
                  </h4>

                  <div className="flex items-center justify-center space-x-2">
                    <div className="flex items-center space-x-1">
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110 z-10 -ml-2"
            aria-label="Previous items"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110 z-10 -mr-2"
            aria-label="Next items"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Pagination dots - only show if we have more than itemsPerView organizations */}
        {organizations.length > itemsPerView && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: Math.min(5, Math.ceil(organizations.length / itemsPerView)) }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  goToSlide(index * itemsPerView);
                  setTimeout(() => setIsAutoPlaying(true), 10000);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
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

export default TeluguOrganizationsPreview;