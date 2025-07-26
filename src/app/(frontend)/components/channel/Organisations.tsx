'use client'

import React, { useState, useEffect, JSX } from 'react'
import { Play, ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react'

// Organization interface matching Payload collection structure
interface Organization {
  id: string
  name: string
  color: string
  events: number
  type: string
  website?: string
  logo?: string
}

// Sample organizations data based on your list
const sampleOrganizations: Organization[] = [
  { 
    id: '1', 
    name: 'Telugu Association of North America (TANA)', 
    color: 'blue', 
    events: 147, 
    type: 'organization',
    website: 'https://www.tana.org/',
    logo: 'https://www.tana.org/assets/images/logo.png'
  },
  { 
    id: '2', 
    name: 'North America Telugu Society (NATS)', 
    color: 'green', 
    events: 203, 
    type: 'organization',
    website: 'https://www.natsworld.org/',
    logo: 'https://natsworld.org/Content/User/images/logo.png'
  },
  { 
    id: '3', 
    name: 'Telangana American Telugu Association', 
    color: 'purple', 
    events: 89, 
    type: 'organization',
    website: 'https://mytelanganaus.org/',
    logo: 'https://mytelanganaus.org/assets/images/logo.png'
  },
  { 
    id: '4', 
    name: 'American Telugu Association (ATA)', 
    color: 'orange', 
    events: 134, 
    type: 'organization',
    website: 'https://americanteluguassociation.org/',
    logo: 'https://americanteluguassociation.org/images/logo.png'
  },
  { 
    id: '5', 
    name: 'American Andhra Association (AAA)', 
    color: 'red', 
    events: 76, 
    type: 'organization',
    website: 'https://www.theaaa.org/Global/index',
    logo: 'https://www.theaaa.org/images/logo.png'
  },
  { 
    id: '6', 
    name: 'Telugu Literary & Cultural Association', 
    color: 'cyan', 
    events: 92, 
    type: 'organization'
  },
  { 
    id: '7', 
    name: 'North American Telugu Foundation', 
    color: 'teal', 
    events: 68, 
    type: 'organization'
  },
  { 
    id: '8', 
    name: 'Telugu Youth Association', 
    color: 'indigo', 
    events: 45, 
    type: 'organization'
  },
  { 
    id: '9', 
    name: 'Telugu Cultural Society', 
    color: 'amber', 
    events: 87, 
    type: 'organization'
  },
  { 
    id: '10', 
    name: 'Telugu Professionals Network', 
    color: 'rose', 
    events: 156, 
    type: 'organization'
  },
  { 
    id: '11', 
    name: 'Telugu Arts & Heritage Society', 
    color: 'yellow', 
    events: 54, 
    type: 'organization'
  },
  { 
    id: '12', 
    name: 'Telugu Educational Foundation', 
    color: 'forest', 
    events: 78, 
    type: 'organization'
  },
]

// Component starts
const TeluguOrganizationsPreview: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [previewIndex, setPreviewIndex] = useState<number>(0)
  const [isPreviewAutoPlaying, setIsPreviewAutoPlaying] = useState<boolean>(true)
  const [isPreviewHovered, setIsPreviewHovered] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const itemsPerView = 6

  // Fetch organization data from Payload CMS API or use sample data
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const res = await fetch('/api/organizations?limit=100')
        const data = await res.json()
        if (data && data.docs) {
          setOrganizations(data.docs)
        } else {
          // Fallback to sample data if API is not available
          setOrganizations(sampleOrganizations)
        }
      } catch (error) {
        console.error('Error fetching organizations, using sample data:', error)
        // Use sample data as fallback
        setOrganizations(sampleOrganizations)
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrganizations()
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (!isPreviewAutoPlaying || isPreviewHovered || organizations.length <= itemsPerView) return

    const interval = setInterval(() => {
      setPreviewIndex((prev) => (prev >= Math.max(0, organizations.length - itemsPerView) ? 0 : prev + 1))
    }, 3000)

    return () => clearInterval(interval)
  }, [isPreviewAutoPlaying, isPreviewHovered, organizations.length])

  const goToSlide = (index: number): void => setCurrentIndex(index)
  const nextPreviewSlide = (): void =>
    setPreviewIndex((prev) => (prev >= Math.max(0, organizations.length - itemsPerView) ? 0 : prev + 1))
  const prevPreviewSlide = (): void =>
    setPreviewIndex((prev) => (prev <= 0 ? Math.max(0, organizations.length - itemsPerView) : prev - 1))

  const theme = {
    title: 'text-gray-800',
    description: 'text-gray-600',
    card: 'bg-white shadow-md',
  }

  const getBorderColor = (org: Organization, isSelected: boolean): string => {
    if (!isSelected) return 'transparent'
    const colorMap: Record<string, string> = {
      blue: '#3b82f6',
      red: '#ef4444',
      green: '#10b981',
      purple: '#8b5cf6',
      yellow: '#f59e0b',
      forest: '#228B22',
      orange: '#FF8C00',
      cyan: '#00CED1',
      teal: '#008B8B',
      indigo: '#4B0082',
      amber: '#FFBF00',
      rose: '#FF69B4',
      gray: '#708090',
    }
    return colorMap[org.color] || '#6b7280'
  }

  // Enhanced organization logo rendering with actual logos or color-coded backgrounds
  const renderOrganizationLogo = (org: Organization, size: 'medium' | 'large' = 'medium'): JSX.Element => {
    const colorMap: Record<string, string> = {
      blue: 'from-blue-400 to-blue-600',
      red: 'from-red-400 to-red-600',
      green: 'from-green-400 to-green-600',
      purple: 'from-purple-400 to-purple-600',
      yellow: 'from-yellow-400 to-yellow-600',
      forest: 'from-green-600 to-green-800',
      orange: 'from-orange-400 to-orange-600',
      cyan: 'from-cyan-400 to-cyan-600',
      teal: 'from-teal-400 to-teal-600',
      indigo: 'from-indigo-400 to-indigo-600',
      amber: 'from-amber-400 to-amber-600',
      rose: 'from-rose-400 to-rose-600',
      gray: 'from-gray-400 to-gray-600',
    }
    
    const gradient = colorMap[org.color] || 'from-gray-300 to-gray-400'
    const sizeClass = size === 'large' ? 'w-12 h-12' : 'w-8 h-8'
    
    // Get acronym from organization name
    const getAcronym = (name: string) => {
      const words = name.split(' ').filter(word => 
        !['of', 'and', 'the', 'in', 'for', 'to', 'at', 'by', 'from', 'with', '&'].includes(word.toLowerCase())
      )
      return words.slice(0, 3).map(word => word[0]).join('').toUpperCase()
    }
    
    // If organization has a logo, try to use it, otherwise fall back to acronym
    if (org.logo) {
      return (
        <div className={`${sizeClass} rounded-full flex items-center justify-center bg-white shadow-lg border-2 border-white/20 overflow-hidden`}>
          <img
            src={org.logo}
            alt={`${org.name} logo`}
            className="w-full h-full object-contain p-1"
            onError={(e) => {
              // Fallback to acronym if image fails to load
              const target = e.target as HTMLImageElement;
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `<div class="w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br ${gradient} text-white font-bold text-${size === 'large' ? 'lg' : 'sm'}">${getAcronym(org.name)}</div>`;
              }
            }}
          />
        </div>
      )
    }
    
    // Fallback to acronym with gradient background
    return (
      <div className={`${sizeClass} rounded-full flex items-center justify-center bg-gradient-to-br ${gradient} text-white font-bold shadow-lg text-${size === 'large' ? 'lg' : 'sm'}`}>
        {getAcronym(org.name)}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto py-16 text-center text-gray-500">
        <div className="animate-pulse">Loading organizations...</div>
      </div>
    )
  }

  const maxPreviewIndex = Math.max(0, organizations.length - itemsPerView)

  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl">
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Telugu Organizations</h3>
          </div>
          <button
            onClick={() => setIsPreviewAutoPlaying(!isPreviewAutoPlaying)}
            className="bg-white/10 backdrop-blur-sm border border-white/20 p-3 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-white/20"
            aria-label={isPreviewAutoPlaying ? 'Pause preview autoplay' : 'Resume preview autoplay'}
          >
            {isPreviewAutoPlaying ? (
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
          onMouseEnter={() => setIsPreviewHovered(true)}
          onMouseLeave={() => setIsPreviewHovered(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out gap-4"
            style={{
              transform: `translateX(-${previewIndex * (100 / itemsPerView)}%)`,
              width: `${(organizations.length / itemsPerView) * 100}%`,
            }}
          >
            {organizations.map((org, index) => (
              <button
                key={org.id}
                onClick={() => goToSlide(index)}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-5 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-2 group flex-shrink-0 hover:bg-white/20"
                style={{
                  width: `${100 / organizations.length}%`,
                  borderColor: getBorderColor(org, index === currentIndex),
                }}
              >
                <div className="text-center">
                  <div className="mb-3 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                    {renderOrganizationLogo(org, 'large')}
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
                    {org.name}
                  </h4>
                  <p className="text-slate-300 text-xs mb-3 font-medium">{org.events} events</p>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-blue-400" />
                      <span className="text-xs text-slate-400">{org.type}</span>
                    </div>
                    <Clock className="w-3 h-3 text-slate-400" />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation arrows */}
          {maxPreviewIndex > 0 && (
            <>
              <button
                onClick={prevPreviewSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110 z-10 -ml-2"
                aria-label="Previous preview items"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={nextPreviewSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110 z-10 -mr-2"
                aria-label="Next preview items"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </>
          )}
        </div>

        {/* Pagination dots */}
        {maxPreviewIndex > 0 && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: maxPreviewIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsPreviewAutoPlaying(false)
                  setPreviewIndex(index)
                  setTimeout(() => setIsPreviewAutoPlaying(true), 10000)
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === previewIndex 
                    ? 'bg-white scale-125 shadow-lg' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to preview page ${index + 1}`}
              />
            ))}
          </div>
        )}

      
      </div>
    </div>
  )
}

export default TeluguOrganizationsPreview