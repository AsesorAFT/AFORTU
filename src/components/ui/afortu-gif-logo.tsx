'use client';

import { useEffect, useState } from 'react';

interface AfortuGifLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function AfortuGifLogo({ 
  className = '', 
  size = 'md' 
}: AfortuGifLogoProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sizeClasses = {
    sm: 'h-8 w-32',
    md: 'h-12 w-48',
    lg: 'h-20 w-80'
  };

  if (!mounted) return <div className={sizeClasses[size]} />; // Placeholder

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* CSS Animations for GIF-like effect */}
      <style jsx>{`
        @keyframes rotateClockwise {
          0% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(90deg) scale(1.05); }
          50% { transform: rotate(180deg) scale(1); }
          75% { transform: rotate(270deg) scale(1.05); }
          100% { transform: rotate(360deg) scale(1); }
        }
        
        @keyframes rotateCounterClockwise {
          0% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(-90deg) scale(0.95); }
          50% { transform: rotate(-180deg) scale(1); }
          75% { transform: rotate(-270deg) scale(0.95); }
          100% { transform: rotate(-360deg) scale(1); }
        }
        
        @keyframes pulseGlow {
          0%, 100% { 
            filter: drop-shadow(0 0 5px rgba(247, 200, 115, 0.6)) drop-shadow(0 0 10px rgba(255, 215, 0, 0.4)); 
            opacity: 0.8;
          }
          50% { 
            filter: drop-shadow(0 0 15px rgba(247, 200, 115, 1)) drop-shadow(0 0 25px rgba(255, 215, 0, 0.8)); 
            opacity: 1;
          }
        }
        
        @keyframes breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        
        @keyframes goldShimmer {
          0% { 
            background: linear-gradient(45deg, #f7c873 0%, #ffd700 25%, #e6b85c 50%, #ffd700 75%, #f7c873 100%);
            background-size: 200% 200%;
            background-position: 0% 0%;
          }
          50% {
            background: linear-gradient(45deg, #ffd700 0%, #f7c873 25%, #ffd700 50%, #e6b85c 75%, #ffd700 100%);
            background-size: 200% 200%;
            background-position: 100% 100%;
          }
          100% { 
            background: linear-gradient(45deg, #f7c873 0%, #ffd700 25%, #e6b85c 50%, #ffd700 75%, #f7c873 100%);
            background-size: 200% 200%;
            background-position: 0% 0%;
          }
        }
        
        @keyframes sparkleFloat {
          0%, 100% { opacity: 0; transform: translateY(0px) scale(0); }
          25% { opacity: 0.6; transform: translateY(-3px) scale(0.8); }
          50% { opacity: 1; transform: translateY(-6px) scale(1); }
          75% { opacity: 0.6; transform: translateY(-3px) scale(0.8); }
        }
        
        @keyframes letterGlow {
          0%, 100% { 
            text-shadow: 0 0 5px rgba(255, 215, 0, 0.8), 0 0 10px rgba(247, 200, 115, 0.6), 0 0 15px rgba(255, 215, 0, 0.4);
            transform: scale(1);
          }
          50% { 
            text-shadow: 0 0 10px rgba(255, 215, 0, 1), 0 0 20px rgba(247, 200, 115, 0.8), 0 0 30px rgba(255, 215, 0, 0.6);
            transform: scale(1.02);
          }
        }

        .gif-container {
          animation: breathe 4s ease-in-out infinite;
        }
        
        .rotating-element-1 {
          animation: rotateClockwise 6s linear infinite, pulseGlow 3s ease-in-out infinite;
        }
        
        .rotating-element-2 {
          animation: rotateCounterClockwise 4s linear infinite, pulseGlow 2s ease-in-out infinite 0.5s;
        }
        
        .gold-badge {
          animation: goldShimmer 3s ease-in-out infinite, breathe 2s ease-in-out infinite 0.2s;
        }
        
        .sparkle-1 {
          animation: sparkleFloat 2s ease-in-out infinite;
        }
        
        .sparkle-2 {
          animation: sparkleFloat 2s ease-in-out infinite 0.6s;
        }
        
        .sparkle-3 {
          animation: sparkleFloat 2s ease-in-out infinite 1.2s;
        }
        
        .sparkle-4 {
          animation: sparkleFloat 2s ease-in-out infinite 1.8s;
        }
        
        .pro-text {
          animation: letterGlow 2.5s ease-in-out infinite;
        }
        
        .main-text {
          animation: letterGlow 3s ease-in-out infinite 0.5s;
        }
      `}</style>

      <div className="gif-container w-full h-full flex items-center justify-between">
        {/* Symbol Section */}
        <div className="relative" style={{ width: '25%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Outer Circle */}
          <div className="absolute w-full h-full">
            <svg viewBox="0 0 80 80" className="w-full h-full">
              <defs>
                <linearGradient id="navyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0a1931" />
                  <stop offset="50%" stopColor="#1a2f47" />
                  <stop offset="100%" stopColor="#0a1931" />
                </linearGradient>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f7c873" />
                  <stop offset="50%" stopColor="#ffd700" />
                  <stop offset="100%" stopColor="#e6b85c" />
                </linearGradient>
                <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#185adb" />
                  <stop offset="50%" stopColor="#2970ff" />
                  <stop offset="100%" stopColor="#1549b8" />
                </linearGradient>
              </defs>
              
              <circle cx="40" cy="40" r="35" fill="none" stroke="url(#navyGrad)" strokeWidth="2" className="rotating-element-1" opacity="0.8"/>
              
              {/* Rotating Arcs */}
              <g className="rotating-element-1">
                <path d="M 20 25 A 20 20 0 0 1 45 15" fill="none" stroke="url(#blueGrad)" strokeWidth="2" strokeLinecap="round"/>
                <path d="M 60 25 A 20 20 0 0 1 35 15" fill="none" stroke="url(#goldGrad)" strokeWidth="2" strokeLinecap="round"/>
              </g>
              
              <g className="rotating-element-2">
                <path d="M 20 55 A 20 20 0 0 0 45 65" fill="none" stroke="url(#goldGrad)" strokeWidth="2" strokeLinecap="round"/>
                <path d="M 60 55 A 20 20 0 0 0 35 65" fill="none" stroke="url(#blueGrad)" strokeWidth="2" strokeLinecap="round"/>
              </g>
              
              {/* Central Geometric Pattern */}
              <g transform="translate(40, 40)" className="rotating-element-1">
                <rect x="-12" y="-12" width="8" height="8" fill="url(#goldGrad)" transform="rotate(45)" rx="1"/>
                <rect x="4" y="-12" width="8" height="8" fill="url(#navyGrad)" transform="rotate(45)" rx="1"/>
                <rect x="-12" y="4" width="8" height="8" fill="url(#blueGrad)" transform="rotate(45)" rx="1"/>
                <rect x="4" y="4" width="8" height="8" fill="#8b949e" transform="rotate(45)" rx="1" opacity="0.8"/>
              </g>
              
              {/* Center Point */}
              <circle cx="40" cy="40" r="4" fill="url(#goldGrad)" className="rotating-element-2"/>
              <circle cx="40" cy="40" r="2" fill="url(#navyGrad)"/>
            </svg>
          </div>
          
          {/* Floating Sparkles */}
          <div className="sparkle-1 absolute top-2 right-2 w-1 h-1 bg-yellow-300 rounded-full"></div>
          <div className="sparkle-2 absolute bottom-3 left-3 w-0.5 h-0.5 bg-yellow-400 rounded-full"></div>
          <div className="sparkle-3 absolute top-1/2 left-1 w-1.5 h-1.5 bg-yellow-200 rounded-full"></div>
          <div className="sparkle-4 absolute bottom-1 right-1 w-1 h-1 bg-yellow-500 rounded-full"></div>
        </div>

        {/* Text Section */}
        <div className="flex-1 flex items-center justify-center ml-4">
          <div className="text-center">
            {/* AFORTU Text */}
            <div 
              className="main-text font-bold text-[#0a1931]"
              style={{ 
                fontSize: size === 'lg' ? '2.5rem' : size === 'md' ? '1.8rem' : '1.2rem',
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: '0.02em'
              }}
            >
              AFORTU
            </div>
            
            {/* Subtitle */}
            <div 
              className="text-gray-600 font-medium"
              style={{ 
                fontSize: size === 'lg' ? '0.8rem' : size === 'md' ? '0.6rem' : '0.5rem',
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '0.1em',
                marginTop: '2px'
              }}
            >
              Asset Management
            </div>
          </div>
        </div>

        {/* PRO Badge */}
        <div className="relative ml-2">
          <div 
            className="gold-badge px-3 py-1 rounded-full shadow-lg"
            style={{ 
              background: 'linear-gradient(45deg, #f7c873 0%, #ffd700 50%, #e6b85c 100%)',
              boxShadow: '0 0 20px rgba(255, 215, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
            }}
          >
            <span 
              className="pro-text font-bold text-white"
              style={{ 
                fontSize: size === 'lg' ? '0.9rem' : size === 'md' ? '0.7rem' : '0.6rem',
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '0.1em',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
              }}
            >
              PRO
            </span>
          </div>
          
          {/* PRO Badge Sparkles */}
          <div className="sparkle-1 absolute -top-1 -right-1 w-1 h-1 bg-white rounded-full"></div>
          <div className="sparkle-3 absolute -bottom-1 -left-1 w-0.5 h-0.5 bg-yellow-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
