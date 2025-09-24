'use client';

import { useEffect, useState } from 'react';

interface AfortuProLogoProps {
  className?: string;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
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
    sm: 'h-12 w-32',
    md: 'h-16 w-40',
    lg: 'h-24 w-60',
    xl: 'h-32 w-80'
  };

  return (
    <div className={`relative ${className}`}>
      {/* Premium CSS Animation Styles */}
      <style jsx>{`
        @keyframes emblemaRotate {
          0% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(90deg) scale(1.02); }
          50% { transform: rotate(180deg) scale(1); }
          75% { transform: rotate(270deg) scale(1.02); }
          100% { transform: rotate(360deg) scale(1); }
        }
        
        @keyframes goldenPulse {
          0%, 100% { 
            filter: drop-shadow(0 0 10px rgba(218, 165, 32, 0.5)) brightness(1);
          }
          50% { 
            filter: drop-shadow(0 0 25px rgba(255, 215, 0, 0.8)) brightness(1.1);
          }
        }
        
        @keyframes pentagramGlow {
          0%, 100% { 
            stroke-width: 2;
            stroke: url(#premiumGold);
            filter: drop-shadow(0 0 8px rgba(218, 165, 32, 0.4));
          }
          50% { 
            stroke-width: 3;
            stroke: url(#brightGold);
            filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.7));
          }
        }
        
        @keyframes corporateFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes textShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes proGlow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(218, 165, 32, 0.6), inset 0 0 20px rgba(255, 215, 0, 0.3);
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 30px rgba(255, 215, 0, 0.9), inset 0 0 30px rgba(218, 165, 32, 0.5);
            transform: scale(1.05);
          }
        }
        
        .emblema-animate {
          animation: emblemaRotate 12s linear infinite;
        }
        
        .golden-pulse {
          animation: goldenPulse 4s ease-in-out infinite;
        }
        
        .pentagrama-glow {
          animation: pentagramGlow 3s ease-in-out infinite;
        }
        
        .corporate-float {
          animation: corporateFloat 6s ease-in-out infinite;
        }
        
        .text-shimmer {
          background: linear-gradient(90deg, #0a1931, #DAA520, #FFD700, #DAA520, #0a1931);
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textShimmer 3s linear infinite;
        }
        
        .pro-badge {
          background: linear-gradient(135deg, #DAA520, #FFD700, #FFA500, #FFD700, #DAA520);
          background-size: 200% 200%;
          animation: proGlow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Main Logo Container */}
      <div 
        className={`relative ${sizeClasses[size]} transition-all duration-500 ${
          animated && mounted ? 'corporate-float' : ''
        }`}
      >
        {/* Premium Background Glow */}
        {animated && (
          <div className="absolute inset-0 bg-gradient-radial from-[#DAA520]/30 via-[#FFD700]/20 to-transparent rounded-full blur-xl opacity-70 animate-pulse" />
        )}

        {/* Main SVG Logo */}
        <svg 
          className={`relative z-10 w-full h-full ${animated && mounted ? 'golden-pulse' : ''}`}
          viewBox="0 0 400 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Premium Gold Gradients */}
            <linearGradient id="premiumGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DAA520" />
              <stop offset="25%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#FFA500" />
              <stop offset="75%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#DAA520" />
            </linearGradient>
            
            <linearGradient id="brightGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#FFF8DC" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
            
            <linearGradient id="corporateNavy" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0a1931" />
              <stop offset="50%" stopColor="#1a2f47" />
              <stop offset="100%" stopColor="#0a1931" />
            </linearGradient>
            
            <linearGradient id="silverAccent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C0C0C0" />
              <stop offset="50%" stopColor="#E5E5E5" />
              <stop offset="100%" stopColor="#A8A8A8" />
            </linearGradient>

            {/* Premium Filters */}
            <filter id="premiumGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <filter id="corporateShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#0a1931" floodOpacity="0.4"/>
            </filter>

            <filter id="goldenRadiance" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
              <feColorMatrix in="coloredBlur" type="matrix" values="1 0.8 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Corporate Emblema - Golden Pentagrama Style */}
          <g transform="translate(60, 60)" className={animated && mounted ? 'emblema-animate' : ''}>
            {/* Outer Circle - Premium Frame */}
            <circle 
              cx="0" 
              cy="0" 
              r="45" 
              fill="none" 
              stroke="url(#premiumGold)" 
              strokeWidth="2"
              className={animated && mounted ? 'pentagrama-glow' : ''}
              filter="url(#premiumGlow)"
            />
            
            {/* Inner Circle - Luxury Border */}
            <circle 
              cx="0" 
              cy="0" 
              r="38" 
              fill="none" 
              stroke="url(#silverAccent)" 
              strokeWidth="1"
              opacity="0.6"
            />

            {/* Pentagrama/Star Pattern - Corporate Symbol */}
            <g filter="url(#goldenRadiance)">
              {/* Main Star Points */}
              <path d="M0,-30 L8.5,-9 L30,-9 L13,6 L21,28 L0,15 L-21,28 L-13,6 L-30,-9 L-8.5,-9 Z" 
                fill="url(#premiumGold)" 
                stroke="url(#brightGold)" 
                strokeWidth="1"/>
              
              {/* Inner Geometric Pattern */}
              <polygon points="0,-15 9,-5 9,5 0,15 -9,5 -9,-5" 
                fill="url(#corporateNavy)" 
                opacity="0.8"/>
              
              {/* Center Diamond */}
              <circle cx="0" cy="0" r="6" fill="url(#brightGold)"/>
              <circle cx="0" cy="0" r="3" fill="url(#corporateNavy)"/>
            </g>

            {/* Decorative Corner Elements */}
            <g opacity="0.7">
              <rect x="-35" y="-35" width="8" height="8" fill="url(#premiumGold)" transform="rotate(45)" rx="1"/>
              <rect x="27" y="-35" width="8" height="8" fill="url(#silverAccent)" transform="rotate(45)" rx="1"/>
              <rect x="27" y="27" width="8" height="8" fill="url(#premiumGold)" transform="rotate(45)" rx="1"/>
              <rect x="-35" y="27" width="8" height="8" fill="url(#silverAccent)" transform="rotate(45)" rx="1"/>
            </g>
          </g>

          {/* AFORTU Text - Corporate Typography */}
          <text 
            x="150" 
            y="45" 
            fontFamily="'Playfair Display', 'Times New Roman', serif" 
            fontSize="32" 
            fontWeight="800" 
            fill="url(#corporateNavy)" 
            filter="url(#corporateShadow)"
            className={animated && mounted ? 'text-shimmer' : ''}
          >
            AFORTU
          </text>

          {/* Asset Management - Elegant Subtitle */}
          <text 
            x="150" 
            y="65" 
            fontFamily="'Cormorant Garamond', 'Times New Roman', serif" 
            fontSize="14" 
            fontWeight="400" 
            fill="url(#silverAccent)" 
            fontStyle="italic"
            letterSpacing="2px"
          >
            Asset Management
          </text>

          {/* PRO Badge - Premium Indicator */}
          <g transform="translate(350, 30)">
            <rect 
              x="-25" 
              y="-12" 
              width="50" 
              height="24" 
              rx="12" 
              className={animated && mounted ? 'pro-badge' : ''}
              style={{
                background: 'linear-gradient(135deg, #DAA520, #FFD700, #FFA500)',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
              }}
              fill="url(#premiumGold)"
              filter="url(#premiumGlow)"
            />
            <text 
              x="0" 
              y="3" 
              textAnchor="middle" 
              fontFamily="'Montserrat', sans-serif" 
              fontSize="12" 
              fontWeight="900" 
              fill="white"
              filter="url(#corporateShadow)"
              letterSpacing="1px"
            >
              PRO
            </text>
          </g>

          {/* Decorative Elements - Luxury Accents */}
          {animated && mounted && (
            <g opacity="0.5">
              <circle cx="130" cy="20" r="2" fill="url(#premiumGold)">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="140" cy="80" r="1.5" fill="url(#brightGold)">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="380" cy="70" r="1" fill="url(#premiumGold)">
                <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite"/>
              </circle>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
