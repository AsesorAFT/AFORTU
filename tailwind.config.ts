import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        xs: 'var(--font-size-xs)',
        sm: 'var(--font-size-sm)',
        base: 'var(--font-size-base)',
        md: 'var(--font-size-md)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Custom AFORTU colors
        surface: 'hsl(var(--ds-surface))',
        content: 'hsl(var(--ds-content))',
        positive: 'hsl(var(--semantic-positive))',
        negative: 'hsl(var(--semantic-negative))',
        warning: 'hsl(var(--semantic-warning))',
        info: 'hsl(var(--semantic-info))',
        // AFORTU Premium colors - Refined Palette
        fortune: {
          gold: '#C9A961',
          'dark-gold': '#A68B4A',
          'light-gold': '#D4B76E',
          champagne: '#E8DCC8',
          charcoal: '#2C3E50',
          platinum: '#E8E9EB',
          silver: '#C0C3C7',
          pearl: '#F8F9FA',
          emerald: '#059669',
          ruby: '#DC2626',
          sapphire: '#2563EB',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        glass: 'var(--glass-radius)',
      },
      boxShadow: {
        elevate: 'var(--elevate-1)',
        glow: 'var(--elevate-glow)',
        'gold-glow': '0 8px 32px rgba(201, 169, 97, 0.12)',
        'gold-glow-hover': '0 12px 48px rgba(201, 169, 97, 0.2)',
        'luxury-card': '0 20px 60px rgba(44, 62, 80, 0.08)',
        'premium': '0 25px 50px -12px rgba(44, 62, 80, 0.15)',
        'soft': '0 2px 8px rgba(0, 0, 0, 0.04)',
      },
      backdropBlur: {
        glass: 'var(--glass-blur)',
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'gold-glow': 'goldGlow 3s ease-in-out infinite',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        goldGlow: {
          '0%, 100%': { boxShadow: '0 8px 32px rgba(201, 169, 97, 0.12)' },
          '50%': { boxShadow: '0 12px 48px rgba(201, 169, 97, 0.2)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;