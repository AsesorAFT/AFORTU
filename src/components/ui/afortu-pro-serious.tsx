'use client';

import { useEffect, useState } from 'react';

interface AfortuProSeriousProps {
  className?: string;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark' | 'gold';
}

export default function AfortuProSerious({ 
  className = '', 
  animated = true, 
  size = 'md',
  variant = 'dark'
}: AfortuProSeriousProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sizeClasses = {
    sm: 'h-8 w-40',
    md: 'h-12 w-48',
    lg: 'h-16 w-64'
  };

  const variants = {
    light: {
      primary: '#0a1931',
      secondary: '#185adb',
      accent: '#f7c873',
      text: '#0a1931',
      subtext: '#6b7280'
    },
    dark: {
      primary: '#ffffff',
      secondary: '#f7c873',
      accent: '#ffd700',
      text: '#ffffff',
      subtext: '#d1d5db'
    },
    gold: {
      primary: '#ffd700',
      secondary: '#f7c873',
      accent: '#0a1931',
      text: '#0a1931',
      subtext: '#4b5563'
    }
  };

  const colors = variants[variant];

  return (
    <div className={`relative ${className}`}>
      {/* CSS Styles */}
      <style jsx>{`
        @keyframes logoGlow {
          0%, 100% { filter: drop-shadow(0 0 8px ${colors.accent}40); }
          50% { filter: drop-shadow(0 0 16px ${colors.accent}60); }
        }
        
        @keyframes symbolRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes symbolPulse {
          0%, 100% { opacity: 0.9; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
        }
        
        @keyframes proShine {
          0%, 100% { background-position: -200% 0; }
          50% { background-position: 200% 0; }
        }
        
        .logo-container {
          ${animated ? `animation: logoGlow 4s ease-in-out infinite;` : ''}
        }
        
        .symbol-rotate {
          ${animated ? `animation: symbolRotate 20s linear infinite;` : ''}
        }
        
        .symbol-pulse {
          ${animated ? `animation: symbolPulse 3s ease-in-out infinite;` : ''}
        }
        
        .pro-shine {
          ${animated ? `
            background: linear-gradient(90deg, ${colors.accent} 0%, ${colors.secondary} 50%, ${colors.accent} 100%);
            background-size: 200% 100%;
            animation: proShine 3s ease-in-out infinite;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          ` : `
            background: linear-gradient(90deg, ${colors.accent} 0%, ${colors.secondary} 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          `}
        }
      `}</style>

      {/* Main Logo Container */}
      <div className={`logo-container relative ${sizeClasses[size]} flex items-center`}>
        
        {/* Symbol */}
        <div className="relative flex-shrink-0 mr-3">
          <svg 
            className="w-12 h-12" 
            viewBox="0 0 80 80" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={`goldGradient-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colors.secondary} />
                <stop offset="50%" stopColor={colors.accent} />
                <stop offset="100%" stopColor={colors.secondary} />
              </linearGradient>
              
              <linearGradient id={`darkGradient-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colors.primary} />
                <stop offset="100%" stopColor={colors.primary} opacity="0.8" />
              </linearGradient>
            </defs>

            {/* Outer Ring */}
            <circle 
              cx="40" 
              cy="40" 
              r="35" 
              fill="none" 
              stroke={colors.primary} 
              strokeWidth="1.5" 
              opacity="0.3"
              className={animated ? "symbol-pulse" : ""}
            />
            
            {/* Rotating outer elements */}
            <g className={animated ? "symbol-rotate" : ""} style={{ transformOrigin: '40px 40px' }}>
              {/* Top arc */}
              <path 
                d="M 20 25 A 20 20 0 0 1 60 25" 
                fill="none" 
                stroke={`url(#goldGradient-${variant})`} 
                strokeWidth="2" 
                strokeLinecap="round"
                opacity="0.8"
              />
              {/* Bottom arc */}
              <path 
                d="M 20 55 A 20 20 0 0 0 60 55" 
                fill="none" 
                stroke={`url(#goldGradient-${variant})`} 
                strokeWidth="2" 
                strokeLinecap="round"
                opacity="0.6"
              />
            </g>

            {/* Central Diamond Pattern */}
            <g transform="translate(40, 40)">
              {/* Main diamond */}
              <rect 
                x="-8" 
                y="-8" 
                width="16" 
                height="16" 
                fill={`url(#goldGradient-${variant})`} 
                transform="rotate(45)" 
                rx="1"
              />
              
              {/* Inner diamond */}
              <rect 
                x="-5" 
                y="-5" 
                width="10" 
                height="10" 
                fill={colors.primary} 
                transform="rotate(45)" 
                rx="0.5"
              />
              
              {/* Center point */}
              <circle 
                cx="0" 
                cy="0" 
                r="2" 
                fill={`url(#goldGradient-${variant})`}
              />
              
              {/* Corner accents */}
              <circle cx="-12" cy="0" r="1.5" fill={colors.accent} opacity="0.7"/>
              <circle cx="12" cy="0" r="1.5" fill={colors.accent} opacity="0.7"/>
              <circle cx="0" cy="-12" r="1.5" fill={colors.accent} opacity="0.7"/>
              <circle cx="0" cy="12" r="1.5" fill={colors.accent} opacity="0.7"/>
            </g>
          </svg>
        </div>

        {/* Text Content */}
        <div className="flex flex-col">
          {/* AFORTU */}
          <div className="flex items-baseline gap-2">
            <h1 
              className="font-bold tracking-tight leading-none"
              style={{ 
                fontSize: size === 'sm' ? '18px' : size === 'md' ? '24px' : '32px',
                color: colors.text,
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 700
              }}
            >
              AFORTU
            </h1>
            
            {/* PRO Badge */}
            <span 
              className="pro-shine font-bold px-2 py-0.5 rounded text-xs border"
              style={{ 
                borderColor: colors.accent + '40',
                fontSize: size === 'sm' ? '10px' : size === 'md' ? '11px' : '12px',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                letterSpacing: '0.5px'
              }}
            >
              PRO
            </span>
          </div>
          
          {/* Asset Management */}
          <p 
            className="font-medium tracking-wide"
            style={{ 
              fontSize: size === 'sm' ? '10px' : size === 'md' ? '12px' : '14px',
              color: colors.subtext,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}
          >
            Asset Management
          </p>
        </div>
      </div>
    </div>
  );
}
