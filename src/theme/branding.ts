/**
 * AFORTU Brand Tokens
 * Corporate identity colors and gradients for the AFORTU platform
 */

// Brand Colors - Light and Dark theme support
export const brandColors = {
  // Primary brand colors
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe', 
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9', // Main brand blue
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49'
  },
  
  // Secondary accent colors
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617'
  },
  
  // Success/profit colors
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16'
  },
  
  // Warning/caution colors  
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03'
  },
  
  // Error/loss colors
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a'
  }
} as const;

// AI Gradient - Corporate identity gradient for AI features
export const gradientAI = {
  // CSS gradient strings
  light: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)',
  dark: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 50%, #0284c7 100%)',
  
  // Individual stops for programmatic use
  stops: {
    light: {
      from: '#0ea5e9', // primary-500
      via: '#0284c7',  // primary-600  
      to: '#0369a1'    // primary-700
    },
    dark: {
      from: '#38bdf8', // primary-400
      via: '#0ea5e9',  // primary-500
      to: '#0284c7'    // primary-600
    }
  }
} as const;

// Surface colors for cards and panels
export const surfaceColors = {
  light: {
    background: '#ffffff',
    surface: '#f8fafc',
    surfaceElevated: '#ffffff',
    border: '#e2e8f0',
    borderSubtle: '#f1f5f9'
  },
  dark: {
    background: '#0f172a',
    surface: '#1e293b', 
    surfaceElevated: '#334155',
    border: '#475569',
    borderSubtle: '#334155'
  }
} as const;

// Text colors
export const textColors = {
  light: {
    primary: '#0f172a',
    secondary: '#475569',
    muted: '#64748b',
    inverse: '#ffffff'
  },
  dark: {
    primary: '#f8fafc',
    secondary: '#cbd5e1', 
    muted: '#94a3b8',
    inverse: '#0f172a'
  }
} as const;

// Export default theme object
export const afortunTheme = {
  colors: brandColors,
  gradients: gradientAI,
  surfaces: surfaceColors,
  text: textColors
} as const;

export type BrandColors = typeof brandColors;
export type GradientAI = typeof gradientAI;
export type SurfaceColors = typeof surfaceColors;
export type TextColors = typeof textColors;