'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface AdBanner {
  logo: string;
  title: string;
  subtitle: string;
}

interface RotatingBannerProps {
  ads: AdBanner[];
  interval?: number;
}

interface LogoAdBannerProps {
  className?: string;
}

const RotatingBanner: React.FC<RotatingBannerProps> = ({ 
  ads, 
  interval = 3000 
}) => {
  const [currentAd, setCurrentAd] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, ads.length]);

  const currentAdData = ads[currentAd];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 shadow-sm h-full flex flex-col">
      <div className="text-center flex-1 flex flex-col justify-center">
        <div className="mb-3 flex-1 flex items-center justify-center min-h-0">
          <Image
            src={currentAdData.logo}
            alt={currentAdData.title}
            width={200}
            height={150}
            className="mx-auto object-contain w-full h-full max-w-full max-h-full"
            style={{ maxHeight: '120px' }}
            unoptimized={true}
          />
        </div>
        <div className="mt-auto">
          <h3 className="text-xs md:text-sm font-semibold text-gray-800 mb-1">
            {currentAdData.title}
          </h3>
          <p className="text-xs text-gray-600 leading-tight">
            {currentAdData.subtitle}
          </p>
        </div>
      </div>
      
      {/* Indicator dots */}
      <div className="flex justify-center mt-3 space-x-1">
        {ads.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
              index === currentAd ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const LogoAdBanner: React.FC<LogoAdBannerProps> = ({ 
  className = "" 
}) => {
  // Your logo ads data
  const adBanners: AdBanner[] = [
    {
      logo: "https://raw.githubusercontent.com/skillgekku/media-assets/refs/heads/main/AGFT%20logoTag.png",
      title: "AG FinTax",
      subtitle: "Financial & Tax Services"
    },
    {
      logo: "https://raw.githubusercontent.com/skillgekku/media-assets/refs/heads/main/RealOne.jpg",
      title: "తెలుగు సంఘం",
      subtitle: "July 04th - 06th 2025, Tampa FL"
    },
    {
      logo: "https://raw.githubusercontent.com/skillgekku/media-assets/refs/heads/main/NATS.jpeg",
      title: "NATS",
      subtitle: "North America Telugu Society"
    }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex lg:w-48 xl:w-64 bg-gray-50 border-r border-gray-200 flex-shrink-0 ${className}`}>
        <div className="w-full p-4 flex flex-col h-full">
          <div className="flex-1 min-h-0">
            <RotatingBanner ads={adBanners} interval={4000} />
          </div>
          
          <div className="text-center mt-4">
            <div className="text-xs text-gray-500 font-medium">
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Banner */}
      <div className="lg:hidden bg-gray-50 border-b border-gray-200 p-3">
        <div className="max-w-md mx-auto">
          <div className="h-32 sm:h-36">
            <RotatingBanner ads={adBanners} interval={4000} />
          </div>
          <div className="text-center mt-2">
            
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoAdBanner;