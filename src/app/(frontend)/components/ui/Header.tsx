'use client'

import { useTheme } from '@/app/(frontend)/hooks/useTheme'
import { SocialIcon } from 'react-social-icons'

interface HeaderProps {
  onScheduleClick: () => void
  isPiPActive?: boolean
}

export default function Header({ onScheduleClick, isPiPActive }: HeaderProps) {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@700&family=Michroma:wght@400&display=swap');

        .futuristic-glow {
          animation: subtleGlow 3s ease-in-out infinite alternate;
        }

        .star-twinkle {
          animation: twinkle 2s ease-in-out infinite alternate;
        }

        @keyframes twinkle {
          from {
            opacity: 0.3;
            transform: scale(1);
          }
          to {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }

        @keyframes subtleGlow {
          from {
            text-shadow:
              0 2px 4px rgba(0, 0, 0, 0.3),
              0 0 8px rgba(255, 255, 255, 0.1);
          }
          to {
            text-shadow:
              0 2px 8px rgba(0, 0, 0, 0.4),
              0 0 12px rgba(255, 255, 255, 0.2);
          }
        }
      `}</style>

      <nav
        className="text-white py-4 px-8 shadow-2xl relative overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, #002868 0%, #1e3a8a 25%, #bf0a30 50%, #dc2626 75%, #002868 100%)',
        }}
      >
        {/* Stars pattern overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-2 left-8 text-white text-lg star-twinkle">★</div>
          <div
            className="absolute top-1 left-20 text-white text-sm star-twinkle"
            style={{ animationDelay: '0.5s' }}
          >
            ★
          </div>
          <div
            className="absolute top-3 left-32 text-white text-lg star-twinkle"
            style={{ animationDelay: '1s' }}
          >
            ★
          </div>
          <div
            className="absolute top-1 left-44 text-white text-sm star-twinkle"
            style={{ animationDelay: '1.5s' }}
          >
            ★
          </div>
          <div
            className="absolute top-2 left-56 text-white text-lg star-twinkle"
            style={{ animationDelay: '2s' }}
          >
            ★
          </div>
          <div
            className="absolute top-3 left-68 text-white text-sm star-twinkle"
            style={{ animationDelay: '0.3s' }}
          >
            ★
          </div>
          <div
            className="absolute top-1 left-80 text-white text-lg star-twinkle"
            style={{ animationDelay: '0.8s' }}
          >
            ★
          </div>
          <div
            className="absolute top-2 left-96 text-white text-sm star-twinkle"
            style={{ animationDelay: '1.3s' }}
          >
            ★
          </div>
          <div
            className="absolute top-3 right-96 text-white text-lg star-twinkle"
            style={{ animationDelay: '1.8s' }}
          >
            ★
          </div>
          <div
            className="absolute top-1 right-80 text-white text-sm star-twinkle"
            style={{ animationDelay: '0.2s' }}
          >
            ★
          </div>
          <div
            className="absolute top-2 right-68 text-white text-lg star-twinkle"
            style={{ animationDelay: '0.7s' }}
          >
            ★
          </div>
          <div
            className="absolute top-3 right-56 text-white text-sm star-twinkle"
            style={{ animationDelay: '1.2s' }}
          >
            ★
          </div>
          <div
            className="absolute top-1 right-44 text-white text-lg star-twinkle"
            style={{ animationDelay: '1.7s' }}
          >
            ★
          </div>
          <div
            className="absolute top-2 right-32 text-white text-sm star-twinkle"
            style={{ animationDelay: '0.4s' }}
          >
            ★
          </div>
          <div
            className="absolute top-3 right-20 text-white text-lg star-twinkle"
            style={{ animationDelay: '0.9s' }}
          >
            ★
          </div>
          <div
            className="absolute top-1 right-8 text-white text-sm star-twinkle"
            style={{ animationDelay: '1.4s' }}
          >
            ★
          </div>

          {/* Second row of stars */}
          <div
            className="absolute bottom-2 left-12 text-white text-sm star-twinkle"
            style={{ animationDelay: '0.6s' }}
          >
            ★
          </div>
          <div
            className="absolute bottom-1 left-24 text-white text-lg star-twinkle"
            style={{ animationDelay: '1.1s' }}
          >
            ★
          </div>
          <div
            className="absolute bottom-3 left-36 text-white text-sm star-twinkle"
            style={{ animationDelay: '1.6s' }}
          >
            ★
          </div>
          <div
            className="absolute bottom-1 left-48 text-white text-lg star-twinkle"
            style={{ animationDelay: '0.1s' }}
          >
            ★
          </div>
          <div
            className="absolute bottom-2 left-60 text-white text-sm star-twinkle"
            style={{ animationDelay: '0.5s' }}
          >
            ★
          </div>
          <div
            className="absolute bottom-3 left-72 text-white text-lg star-twinkle"
            style={{ animationDelay: '1.0s' }}
          >
            ★
          </div>
          <div
            className="absolute bottom-1 left-84 text-white text-sm star-twinkle"
            style={{ animationDelay: '1.5s' }}
          >
            ★
          </div>
          <div
            className="absolute bottom-2 right-84 text-white text-lg star-twinkle"
            style={{ animationDelay: '2.0s' }}
          >
            ★
          </div>
          <div
            className="absolute bottom-3 right-72 text-white text-sm star-twinkle"
            style={{ animationDelay: '0.3s' }}
          >
            ★
          </div>
          <div
            className="absolute bottom-1 right-60 text-white text-lg star-twinkle"
            style={{ animationDelay: '0.8s' }}
          >
            ★
          </div>
          <div
            className="absolute bottom-2 right-48 text-white text-sm star-twinkle"
            style={{ animationDelay: '1.3s' }}
          >
            ★
          </div>
          <div
            className="absolute bottom-3 right-36 text-white text-lg star-twinkle"
            style={{ animationDelay: '1.8s' }}
          >
            ★
          </div>
          <div
            className="absolute bottom-1 right-24 text-white text-sm star-twinkle"
            style={{ animationDelay: '0.2s' }}
          >
            ★
          </div>
          <div
            className="absolute bottom-2 right-12 text-white text-lg star-twinkle"
            style={{ animationDelay: '0.7s' }}
          >
            ★
          </div>
        </div>

        <div className="container mx-auto flex items-center justify-between relative z-10">
          <h1
            className="text-3xl font-bold tracking-wide futuristic-glow"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '2.5rem',
              fontWeight: 700,
              letterSpacing: '4px',
              color: '#ffffff',
              textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 0 8px rgba(255,255,255,0.1)',
              textTransform: 'uppercase',
              fontStretch: 'condensed',
            }}
          >
            Mahaa NEWS USA
          </h1>
          <div className="flex items-center space-x-4">
            {isPiPActive && (
              <div className="flex items-center space-x-2 bg-blue-600 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium">PiP Active</span>
              </div>
            )}

            <div className="flex items-center space-x-2">
              {/* Contact & Social */}
             <div className="text-center md:text-right">
  <div className="flex justify-center md:justify-end items-center space-x-3 mb-3">
    <SocialIcon
      url="https://www.youtube.com/@mahaanewsusa"
      style={{ height: 32, width: 32 }}
      className="hover:scale-110 transition-transform"
      target="_blank"
      rel="noopener noreferrer"
    />
    <SocialIcon
      url="https://www.instagram.com/mahaausa/"
      style={{ height: 32, width: 32 }}
      className="hover:scale-110 transition-transform"
      target="_blank"
      rel="noopener noreferrer"
    />
  </div>
</div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
