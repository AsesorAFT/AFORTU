'use client';

import { useEffect, useState } from 'react';

interface AfortuProLogoProps {
  className?: string;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function AfortuProLogo({ 
  className = '', 
  animated = true, 
  size = 'md' 
}: AfortuProLogoProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sizeClasses = {
    sm: 'h-8 w-32',
    md: 'h-10 w-40',
    lg: 'h-16 w-64'
  };

  const logoStyles = animated ? {
    animation: `
      logoFloat 6s ease-in-out infinite,
      logoGlow 3s ease-in-out infinite alternate
    `,
  } : {};

  return (
    <div className={`relative ${className}`}>
      {/* CSS Animation Styles */}
      <style jsx>{`
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-2px) scale(1.02); }
        }
        
        @keyframes logoGlow {
          0% { filter: drop-shadow(0 0 5px rgba(247, 200, 115, 0.3)); }
          100% { filter: drop-shadow(0 0 15px rgba(247, 200, 115, 0.6)); }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }
        
        .sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
        
        .sparkle:nth-child(2) { animation-delay: 0.5s; }
        .sparkle:nth-child(3) { animation-delay: 1s; }
        .sparkle:nth-child(4) { animation-delay: 1.5s; }
        
        .pro-pulse {
          animation: proPulse 2s ease-in-out infinite;
        }
        
        @keyframes proPulse {
          0%, 100% { 
            background: linear-gradient(135deg, #ffd700 0%, #f7c873 50%, #ffd700 100%);
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
          }
          50% { 
            background: linear-gradient(135deg, #f7c873 0%, #ffd700 50%, #f7c873 100%);
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
          }
        }
      `}</style>

      {/* Main Logo Container */}
      <div 
        className={`relative ${sizeClasses[size]} transition-all duration-300`}
        style={mounted && animated ? logoStyles : {}}
      >
        {/* Background glow effect */}
        {animated && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#f7c873]/20 to-[#ffd700]/20 rounded-lg blur-md opacity-75 animate-pulse" />
        )}

        {/* Main SVG Logo */}
        <svg 
          className="relative z-10 w-full h-full" 
          viewBox="0 0 300 80" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f7c873" />
              <stop offset="50%" stopColor="#ffd700" />
              <stop offset="100%" stopColor="#e6b85c" />
            </linearGradient>
            
            <linearGradient id="navyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0a1931" />
              <stop offset="50%" stopColor="#1a2f47" />
              <stop offset="100%" stopColor="#0a1931" />
            </linearGradient>
            
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#185adb" />
              <stop offset="50%" stopColor="#2970ff" />
              <stop offset="100%" stopColor="#1549b8" />
            </linearGradient>
            
            <linearGradient id="grayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b949e" />
              <stop offset="50%" stopColor="#6e7681" />
              <stop offset="100%" stopColor="#8b949e" />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <filter id="dropshadow">
              <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#0a1931" floodOpacity="0.3"/>
            </filter>
          </defs>

          {/* Symbol Section */}
          <g transform="translate(40, 40)">
            {/* Outer circle */}
            <circle 
              cx="0" 
              cy="0" 
              r="30" 
              fill="none" 
              stroke="url(#navyGradient)" 
              strokeWidth="2" 
              opacity="0.8"
            >
              {animated && (
                <>
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/>
                  <animate attributeName="r" values="28;32;28" dur="4s" repeatCount="indefinite"/>
                </>
              )}
            </circle>
            
            {/* Rotating elements */}
            <g>
              {animated && (
                <animateTransform 
                  attributeName="transform" 
                  type="rotate" 
                  values="0;360" 
                  dur="8s" 
                  repeatCount="indefinite"
                />
              )}
              <path d="M -20 -15 A 20 20 0 0 1 5 -25" fill="none" stroke="url(#blueGradient)" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M 20 -15 A 20 20 0 0 1 -5 -25" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" strokeLinecap="round"/>
            </g>
            
            {/* Central pattern */}
            <rect x="-12" y="-12" width="8" height="8" fill="url(#goldGradient)" transform="rotate(45)" rx="1">
              {animated && <animateTransform attributeName="transform" type="rotate" values="45;405" dur="4s" repeatCount="indefinite"/>}
            </rect>
            <rect x="4" y="-12" width="8" height="8" fill="url(#navyGradient)" transform="rotate(45)" rx="1">
              {animated && <animateTransform attributeName="transform" type="rotate" values="45;405" dur="4s" begin="0.5s" repeatCount="indefinite"/>}
            </rect>
            <rect x="-12" y="4" width="8" height="8" fill="url(#blueGradient)" transform="rotate(45)" rx="1">
              {animated && <animateTransform attributeName="transform" type="rotate" values="45;405" dur="4s" begin="1s" repeatCount="indefinite"/>}
            </rect>
            <rect x="4" y="4" width="8" height="8" fill="url(#grayGradient)" transform="rotate(45)" rx="1" opacity="0.8">
              {animated && <animateTransform attributeName="transform" type="rotate" values="45;405" dur="4s" begin="1.5s" repeatCount="indefinite"/>}
            </rect>
            
            {/* Center point */}
            <circle cx="0" cy="0" r="3" fill="url(#goldGradient)" filter="url(#glow)">
              {animated && <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite"/>}
            </circle>
            <circle cx="0" cy="0" r="1.5" fill="url(#navyGradient)">
              {animated && <animate attributeName="r" values="1;2;1" dur="2s" repeatCount="indefinite"/>}
            </circle>
          </g>

          {/* AFORTU Text */}
          <text 
            x="95" 
            y="45" 
            fontFamily="'Poppins', sans-serif" 
            fontSize="28" 
            fontWeight="800" 
            fill="url(#navyGradient)" 
            filter="url(#dropshadow)"
          >
            AFORTU
            {animated && <animate attributeName="opacity" values="0.8;1;0.8" dur="4s" repeatCount="indefinite"/>}
          </text>
          
          {/* Subtitle */}
          <text 
            x="95" 
            y="60" 
            fontFamily="'Inter', sans-serif" 
            fontSize="10" 
            fontWeight="400" 
            fill="url(#grayGradient)" 
            letterSpacing="1px"
          >
            ASSET MANAGEMENT
          </text>
        </svg>

        {/* PRO Badge - Separate element for better styling */}
        <div 
          className={`absolute top-1/2 -translate-y-1/2 right-4 px-3 py-1 rounded-full ${
            animated ? 'pro-pulse' : 'bg-gradient-to-r from-[#ffd700] to-[#f7c873]'
          } shadow-lg`}
          style={{ 
            background: 'linear-gradient(135deg, #ffd700 0%, #f7c873 50%, #ffd700 100%)',
            boxShadow: '0 0 15px rgba(255, 215, 0, 0.4)'
          }}
        >
          <span className="text-white font-bold text-xs tracking-wider drop-shadow-sm">
            PRO
          </span>
        </div>

        {/* Sparkle Effects */}
        {animated && mounted && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="sparkle absolute top-2 right-8 w-1 h-1 bg-white rounded-full"></div>
            <div className="sparkle absolute bottom-3 right-12 w-0.5 h-0.5 bg-[#ffd700] rounded-full"></div>
            <div className="sparkle absolute top-1/2 right-2 w-1.5 h-1.5 bg-white rounded-full"></div>
            <div className="sparkle absolute bottom-1 right-6 w-0.5 h-0.5 bg-[#f7c873] rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
}
