'use client'
import { SocialIcon } from 'react-social-icons'

// Star positions data for cleaner management
const starPositions = [
  // Top row stars
  { top: '0.5rem', left: '2rem', size: 'text-lg', delay: '0s' },
  { top: '0.25rem', left: '5rem', size: 'text-sm', delay: '0.5s' },
  { top: '0.75rem', left: '8rem', size: 'text-lg', delay: '1s' },
  { top: '0.25rem', left: '11rem', size: 'text-sm', delay: '1.5s' },
  { top: '0.5rem', left: '14rem', size: 'text-lg', delay: '2s' },
  { top: '0.75rem', left: '17rem', size: 'text-sm', delay: '0.3s' },
  { top: '0.25rem', left: '20rem', size: 'text-lg', delay: '0.8s' },
  { top: '0.5rem', left: '24rem', size: 'text-sm', delay: '1.3s' },
  { top: '0.75rem', right: '24rem', size: 'text-lg', delay: '1.8s' },
  { top: '0.25rem', right: '20rem', size: 'text-sm', delay: '0.2s' },
  { top: '0.5rem', right: '17rem', size: 'text-lg', delay: '0.7s' },
  { top: '0.75rem', right: '14rem', size: 'text-sm', delay: '1.2s' },
  { top: '0.25rem', right: '11rem', size: 'text-lg', delay: '1.7s' },
  { top: '0.5rem', right: '8rem', size: 'text-sm', delay: '0.4s' },
  { top: '0.75rem', right: '5rem', size: 'text-lg', delay: '0.9s' },
  { top: '0.25rem', right: '2rem', size: 'text-sm', delay: '1.4s' },
  
  // Bottom row stars
  { bottom: '0.5rem', left: '3rem', size: 'text-sm', delay: '0.6s' },
  { bottom: '0.25rem', left: '6rem', size: 'text-lg', delay: '1.1s' },
  { bottom: '0.75rem', left: '9rem', size: 'text-sm', delay: '1.6s' },
  { bottom: '0.25rem', left: '12rem', size: 'text-lg', delay: '0.1s' },
  { bottom: '0.5rem', left: '15rem', size: 'text-sm', delay: '0.5s' },
  { bottom: '0.75rem', left: '18rem', size: 'text-lg', delay: '1.0s' },
  { bottom: '0.25rem', left: '21rem', size: 'text-sm', delay: '1.5s' },
  { bottom: '0.5rem', right: '21rem', size: 'text-lg', delay: '2.0s' },
  { bottom: '0.75rem', right: '18rem', size: 'text-sm', delay: '0.3s' },
  { bottom: '0.25rem', right: '15rem', size: 'text-lg', delay: '0.8s' },
  { bottom: '0.5rem', right: '12rem', size: 'text-sm', delay: '1.3s' },
  { bottom: '0.75rem', right: '9rem', size: 'text-lg', delay: '1.8s' },
  { bottom: '0.25rem', right: '6rem', size: 'text-sm', delay: '0.2s' },
  { bottom: '0.5rem', right: '3rem', size: 'text-lg', delay: '0.7s' }
]

const socialLinks = [
  {
    url: "https://www.youtube.com/@mahaanewsusa",
    platform: "youtube"
  },
  {
    url: "https://www.instagram.com/mahaausa/",
    platform: "instagram"
  }
]

const StarField = () => (
  <div className="absolute inset-0 opacity-30 pointer-events-none">
    {starPositions.map((star, index) => (
      <div
        key={index}
        className={`absolute text-white ${star.size} animate-pulse`}
        style={{
          top: star.top,
          bottom: star.bottom,
          left: star.left,
          right: star.right,
          animationDelay: star.delay,
          animationDuration: '2s',
        }}
      >
        ★
      </div>
    ))}
  </div>
)

const Logo = () => (
  <h1 
    className="text-3xl font-bold tracking-widest uppercase text-white relative z-10"
    style={{
      fontFamily: "sans-serif",
      fontWeight: 600,
      letterSpacing: '3px',
      textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 0 12px rgba(255,255,255,0.2)',
      animation: 'subtleGlow 3s ease-in-out infinite alternate',
    }}
  >
    Mahaa NEWS USA
  </h1>
)

const SocialIcons = () => (
  <div className="flex items-center space-x-3 relative z-10">
    {socialLinks.map((social, index) => (
      <SocialIcon
        key={index}
        url={social.url}
        style={{ height: 32, width: 32 }}
        className="hover:scale-110 transition-transform duration-200 hover:drop-shadow-lg"
        target="_blank"
        rel="noopener noreferrer"
      />
    ))}
  </div>
)

export default function Header() {
  return (
    <>
      <style jsx>{`

        @keyframes subtleGlow {
          from {
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 8px rgba(255, 255, 255, 0.1);
          }
          to {
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4), 0 0 16px rgba(255, 255, 255, 0.3);
          }
        }
      `}</style>

      <nav
        className="relative overflow-hidden text-white py-1 px-4 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #002868 0%, #1e3a8a 25%, #bf0a30 50%, #dc2626 75%, #002868 100%)',
        }}
      >
        <StarField />
        
        <div className="container mx-auto flex items-center justify-between relative z-10">
          <Logo />
          <SocialIcons />
        </div>
      </nav>
    </>
  )
}