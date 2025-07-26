'use client'

import React, { useState, useEffect, JSX } from 'react'
import { Play, ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react'

// State interface matching Payload collection structure
interface SponsorPosts {
  id: string
  name: string
  color: string
  events: number
  type: string
}

const sampleStates: SponsorPosts[] = [
  { id: '1', name: 'Texas', color: 'red', events: 147, type: 'state' },
  { id: '2', name: 'California', color: 'blue', events: 203, type: 'state' },
  { id: '3', name: 'Michigan', color: 'purple', events: 89, type: 'state' },
  { id: '4', name: 'Washington', color: 'green', events: 134, type: 'state' },
  { id: '5', name: 'Arizona', color: 'orange', events: 76, type: 'state' },
  { id: '6', name: 'Florida', color: 'cyan', events: 192, type: 'state' },
  { id: '7', name: 'North Carolina', color: 'teal', events: 98, type: 'state' },
  { id: '8', name: 'Illinois', color: 'indigo', events: 156, type: 'state' },
  { id: '9', name: 'New Jersey', color: 'amber', events: 87, type: 'state' },
  { id: '10', name: 'New York', color: 'rose', events: 234, type: 'state' },
  { id: '11', name: 'Kansas', color: 'yellow', events: 54, type: 'state' },
  { id: '12', name: 'Georgia', color: 'forest', events: 112, type: 'state' },
  { id: '13', name: 'Ohio', color: 'gray', events: 78, type: 'state' },
  { id: '14', name: 'Pennsylvania', color: 'blue', events: 145, type: 'state' },
  { id: '15', name: 'Virginia', color: 'purple', events: 92, type: 'state' },
  { id: '16', name: 'Colorado', color: 'green', events: 103, type: 'state' },
]

// Component starts
const USStatesPreview: React.FC = () => {
  const [states, setStates] = useState<SponsorPosts[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [previewIndex, setPreviewIndex] = useState<number>(0)
  const [isPreviewAutoPlaying, setIsPreviewAutoPlaying] = useState<boolean>(true)
  const [isPreviewHovered, setIsPreviewHovered] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const itemsPerView = 4

  // Fetch state data from Payload CMS API
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await fetch('/api/states?limit=100')
        const data = await res.json()
        if (data && data.docs) {
          setStates(data.docs.length > 0 ? data.docs : sampleStates)
        } else {
          setStates(sampleStates)
        }
      } catch (error) {
        console.error('Error fetching states:', error)
        setStates(sampleStates)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStates()
  }, [])

  // Auto-play functionality for infinite loop
  useEffect(() => {
    if (!isPreviewAutoPlaying || isPreviewHovered || states.length === 0) return

    const interval = setInterval(() => {
      setPreviewIndex((prev) => prev + 1)
    }, 3000)

    return () => clearInterval(interval)
  }, [isPreviewAutoPlaying, isPreviewHovered, states.length])

  const goToSlide = (index: number): void => setCurrentIndex(index)
  const nextPreviewSlide = (): void => setPreviewIndex((prev) => prev + 1)
  const prevPreviewSlide = (): void => setPreviewIndex((prev) => prev - 1)

  // Create infinite loop by duplicating states
  const getVisibleStates = () => {
    if (states.length === 0) return []
    
    // Create enough duplicates to ensure smooth infinite scrolling
    const duplicateCount = Math.ceil(itemsPerView * 3 / states.length)
    const duplicatedStates = Array(duplicateCount).fill(states).flat()
    return duplicatedStates
  }

  const visibleStates = getVisibleStates()
  
  // Calculate the actual translate position for infinite loop
  const getTranslateX = () => {
    if (states.length === 0) return 0
    const stateWidth = 100 / itemsPerView
    return (previewIndex * stateWidth) % (states.length * stateWidth)
  }

  const theme = {
    title: 'text-gray-800',
    description: 'text-gray-600',
    card: 'bg-white shadow-md',
  }

  // Dummy rendering function placeholder
  const renderStateLogo = (state: State, size: 'medium' | 'large' = 'medium'): JSX.Element => {
    return (
      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400 text-white text-lg font-bold">
        {state.name[0]}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto py-16 text-center text-gray-500">Loading states...</div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-xl text-white md:text-2xl font-bold ${theme.title}`}>Happenings by State</h3>
          <button
            onClick={() => setIsPreviewAutoPlaying(!isPreviewAutoPlaying)}
            className={`${theme.card} p-2 rounded-lg transition-all duration-300 hover:scale-105`}
            aria-label={isPreviewAutoPlaying ? 'Pause preview autoplay' : 'Resume preview autoplay'}
          >
            {isPreviewAutoPlaying ? (
              <div className="w-4 h-4 flex items-center justify-center">
                <div className="w-1 h-3 bg-current mr-0.5"></div>
                <div className="w-1 h-3 bg-current"></div>
              </div>
            ) : (
              <Play className="w-4 h-4" />
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
              transform: `translateX(-${getTranslateX()}%)`,
            }}
          >
            {visibleStates.map((state, index) => (
              <button
                key={`${state.id}-${Math.floor(index / states.length)}`}
                onClick={() => goToSlide(index % states.length)}
                className={`${theme.card} rounded-xl p-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group flex-shrink-0 ${
                  (index % states.length) === currentIndex ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                }`}
                style={{
                  minWidth: `${100 / itemsPerView}%`,
                }}
              >
                <div className="text-center">
                  <div className="mb-2 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                    {renderStateLogo(state, 'large')}
                  </div>
                  <h4 className={`${theme.title} font-semibold text-sm mb-1 line-clamp-2`}>
                    {state.name}
                  </h4>
                  <p className={`${theme.description} text-xs mb-2`}>{state.events} events</p>
                  <div className="flex items-center justify-center space-x-1">
                    <MapPin className="w-3 h-3 text-blue-500" />
                    <Clock className="w-3 h-3 text-gray-400" />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevPreviewSlide}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 ${theme.card} hover:shadow-lg p-2 rounded-full transition-all duration-300 hover:scale-110 z-10 -ml-2`}
            aria-label="Previous preview items"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextPreviewSlide}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 ${theme.card} hover:shadow-lg p-2 rounded-full transition-all duration-300 hover:scale-110 z-10 -mr-2`}
            aria-label="Next preview items"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-4 space-x-2">
          {states.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsPreviewAutoPlaying(false)
                setCurrentIndex(index)
                setPreviewIndex(index)
                setTimeout(() => setIsPreviewAutoPlaying(true), 10000)
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-blue-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to ${states[index]?.name}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
export default USStatesPreview
