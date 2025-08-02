"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Organization {
  id: string;
  name: string;
  color: string;
  type: string;
  website?: string;
  logo?: string;
}

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

const AppleTVCard: React.FC<{ org: Organization; isSelected: boolean }> = ({ org, isSelected }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setMousePosition({
      x: (x - centerX) / centerX,
      y: (y - centerY) / centerY,
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const getAcronym = (name: string) => {
    const words = name
      .split(" ")
      .filter(
        (word) =>
          !["of", "and", "the", "in", "for", "to", "at", "by", "from", "with", "&"].includes(
            word.toLowerCase()
          )
      );
    return words
      .slice(0, 3)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const colorMap: Record<string, string> = {
    blue: "from-blue-500 via-blue-600 to-blue-700",
    red: "from-red-500 via-red-600 to-red-700",
    green: "from-green-500 via-green-600 to-green-700",
    purple: "from-purple-500 via-purple-600 to-purple-700",
    orange: "from-orange-500 via-orange-600 to-orange-700",
  };

  const gradient = colorMap[org.color] || "from-gray-500 via-gray-600 to-gray-700";

  const cardTransform = isHovering
    ? `perspective(1000px) rotateX(${mousePosition.y * -10}deg) rotateY(${mousePosition.x * 10}deg) translateZ(50px) scale(1.1)`
    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';

  const imageTransform = isHovering
    ? `translateX(${mousePosition.x * 10}px) translateY(${mousePosition.y * 10}px) scale(1.05)`
    : 'translateX(0px) translateY(0px) scale(1)';

  const shadowIntensity = isHovering ? 0.4 : 0.1;

  return (
    <div className="apple-tv-card-container p-2">
      <a
        href={org.website}
        className="block"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          ref={cardRef}
          className="apple-tv-card relative w-full aspect-[16/10] cursor-pointer overflow-hidden"
          style={{
            transform: cardTransform,
            transition: 'transform 0.2s ease-out',
            transformStyle: 'preserve-3d',
            boxShadow: `0 ${isHovering ? 25 : 8}px ${isHovering ? 50 : 25}px rgba(0, 0, 0, ${shadowIntensity})`,
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Card Background with Gradient */}
          <div 
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {/* Content Container */}
            <div 
              className="relative w-full h-full p-4 flex flex-col"
              style={{
                transform: imageTransform,
                transition: 'transform 0.2s ease-out',
              }}
            >
              {/* Logo/Image Container */}
              <div className="flex-1 flex items-center justify-center mb-3">
                {org.logo ? (
                  <img
                    src={org.logo}
                    alt={`${org.name} logo`}
                    className="max-w-full max-h-full object-contain"
                    style={{
                      filter: isHovering ? 'brightness(1.1) contrast(1.1)' : 'brightness(1) contrast(1)',
                      transition: 'filter 0.2s ease-out',
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const container = target.parentElement;
                      if (container) {
                        container.innerHTML = `
                          <div class="w-20 h-20 rounded-xl flex items-center justify-center bg-gradient-to-br ${gradient} text-white font-bold text-lg shadow-lg">
                            ${getAcronym(org.name)}
                          </div>
                        `;
                      }
                    }}
                  />
                ) : (
                  <div className={`w-20 h-20 rounded-xl flex items-center justify-center bg-gradient-to-br ${gradient} text-white font-bold text-lg shadow-lg`}>
                    {getAcronym(org.name)}
                  </div>
                )}
              </div>

              {/* Title */}
              <div className="text-center">
                <h3 
                  className="text-white font-semibold text-sm leading-tight line-clamp-2"
                  style={{
                    textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                    filter: isHovering ? 'brightness(1.2)' : 'brightness(1)',
                    transition: 'filter 0.2s ease-out',
                  }}
                >
                  {org.name}
                </h3>
              </div>
            </div>

            {/* Selection Indicator */}
            {isSelected && (
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  border: '3px solid rgba(255,255,255,0.8)',
                  boxShadow: '0 0 20px rgba(255,255,255,0.3), inset 0 0 20px rgba(255,255,255,0.1)',
                }}
              />
            )}

            {/* Hover Glow Effect */}
            {isHovering && (
              <div 
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                  boxShadow: 'inset 0 0 30px rgba(255,255,255,0.2)',
                }}
              />
            )}
          </div>
        </div>
      </a>
    </div>
  );
};

const AppleTVOrganizationsShelf: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const itemsPerView = 5;

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const res = await fetch("/api/organizations?limit=100");
        const data = await res.json();
        if (data && data.docs) {
          setOrganizations(data.docs);
        } else {
          setOrganizations(sampleOrganizations);
        }
      } catch (error) {
        console.error("Error fetching organizations, using sample data:", error);
        setOrganizations(sampleOrganizations);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  // Auto-focus navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (organizations.length === 0) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(0, prev - 1));
          break;
        case 'ArrowRight':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(organizations.length - 1, prev + 1));
          break;
        case 'Enter':
          e.preventDefault();
          if (organizations[selectedIndex]?.website) {
            window.open(organizations[selectedIndex].website, '_blank');
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [organizations, selectedIndex]);

  const nextSlide = () => {
    if (currentIndex < organizations.length - itemsPerView) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading organizations...</div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen text-white relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
      }}
    >
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 px-8 py-16">
          <h1 className="text-5xl font-light mb-2 tracking-wide">Organizations</h1>

        {/* Navigation Instructions */}
        <div className="mb-8 text-gray-500 text-sm">
          Use arrow keys to navigate • Press Enter to visit
        </div>

        {/* Shelf Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          {currentIndex > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-lg border border-white/10 p-3 rounded-full hover:bg-black/70 transition-all duration-300 -translate-x-4"
              style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          )}

          {currentIndex < organizations.length - itemsPerView && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 backdrop-blur-lg border border-white/10 p-3 rounded-full hover:bg-black/70 transition-all duration-300 translate-x-4"
              style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          )}

          {/* Cards Grid */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                width: `${(organizations.length / itemsPerView) * 100}%`,
              }}
            >
              {organizations.map((org, index) => (
                <div 
                  key={org.id}
                  className="flex-shrink-0"
                  style={{ width: `${100 / itemsPerView}%` }}
                  onClick={() => setSelectedIndex(index)}
                >
                  <AppleTVCard 
                    org={org} 
                    isSelected={selectedIndex === index}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Page Indicators */}
        {organizations.length > itemsPerView && (
          <div className="flex justify-center mt-12 space-x-2">
            {Array.from({ 
              length: Math.ceil((organizations.length - itemsPerView + 1)) 
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-white shadow-lg shadow-white/30"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppleTVOrganizationsShelf;