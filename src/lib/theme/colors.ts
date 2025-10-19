/**
 * AFORTU Premium Color System
 * Sistema de colores de lujo inspirado en la identidad de marca
 * Elegancia, confianza y sofisticación
 */

export const fortuneColors = {
  // Colores Primarios - Oro Refinado (del logo)
  primary: {
    gold: '#C9A961',           // Oro refinado del logo AFORTU
    darkGold: '#A68B4A',       // Oro oscuro para hover/active
    champagne: '#E8DCC8',      // Champagne claro
    bronze: '#B8956A',         // Bronce suave
    lightGold: '#D4B76E',      // Oro brillante para highlights
  },

  // Colores de Lujo - Plateado y Neutros Elegantes
  luxury: {
    platinum: '#E8E9EB',       // Platino del logo (fondos claros)
    silver: '#C0C3C7',         // Plata elegante
    charcoal: '#2C3E50',       // Carbón sofisticado (textos principales)
    slate: '#475569',          // Gris pizarra (textos secundarios)
    pearl: '#F8F9FA',          // Perla (fondos sutiles)
    midnight: '#1A202C',       // Navy muy oscuro para contraste
  },

  // Acentos - Piedras preciosas
  accent: {
    emerald: '#059669',        // Esmeralda (éxito, crecimiento)
    ruby: '#DC2626',           // Rubí (alertas, negativos)
    sapphire: '#2563EB',       // Zafiro (información)
    amethyst: '#7C3AED',       // Amatista (premium features)
    topaz: '#F59E0B',          // Topacio (advertencias)
  },

  // Neutrales Premium
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  // Gradientes Premium
  gradients: {
    goldShine: 'linear-gradient(135deg, #C9A961 0%, #D4B76E 50%, #C9A961 100%)',
    luxuryDark: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)',
    wealth: 'linear-gradient(135deg, #2C3E50 0%, #C9A961 100%)',
    goldGlow: 'linear-gradient(135deg, rgba(201, 169, 97, 0.1) 0%, rgba(212, 183, 110, 0.05) 100%)',
    premiumCard: 'linear-gradient(135deg, rgba(201, 169, 97, 0.08) 0%, rgba(255, 255, 255, 0.98) 100%)',
    silverShine: 'linear-gradient(135deg, #E8E9EB 0%, #F8F9FA 50%, #E8E9EB 100%)',
    elegant: 'linear-gradient(135deg, #F8F9FA 0%, #E8DCC8 100%)',
  },

  // Efectos y Sombras
  shadows: {
    goldGlow: '0 8px 32px rgba(201, 169, 97, 0.12)',
    goldGlowHover: '0 12px 48px rgba(201, 169, 97, 0.2)',
    luxuryCard: '0 20px 60px rgba(44, 62, 80, 0.08)',
    elevated: '0 4px 16px rgba(0, 0, 0, 0.06)',
    premium: '0 25px 50px -12px rgba(44, 62, 80, 0.15)',
    soft: '0 2px 8px rgba(0, 0, 0, 0.04)',
  },

  // Estados Semánticos
  semantic: {
    success: '#059669',
    error: '#DC2626',
    warning: '#F59E0B',
    info: '#2563EB',
    successLight: '#D1FAE5',
    errorLight: '#FEE2E2',
    warningLight: '#FEF3C7',
    infoLight: '#DBEAFE',
  },

  // Glassmorphism
  glass: {
    white: 'rgba(255, 255, 255, 0.95)',
    gold: 'rgba(201, 169, 97, 0.08)',
    platinum: 'rgba(232, 233, 235, 0.7)',
    dark: 'rgba(44, 62, 80, 0.85)',
    blur: 'blur(24px)',
  },

  // Colores de Marca AFORTU
  brand: {
    primary: '#C9A961',        // Oro del logo
    secondary: '#E8E9EB',      // Platino del logo
    charcoal: '#2C3E50',       // Texto principal
    background: '#F8F9FA',     // Fondo principal
  },
};

/**
 * Utilidades de color
 */
export const colorUtils = {
  /**
   * Convierte un color hex a rgba con opacidad
   */
  hexToRgba: (hex: string, alpha: number = 1): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  },

  /**
   * Obtiene el color según el estado (positivo/negativo)
   */
  getValueColor: (value: number): string => {
    return value >= 0 ? fortuneColors.accent.emerald : fortuneColors.accent.ruby;
  },
};

/**
 * Configuración de tema para CSS variables
 */
export const cssVariables = {
  light: {
    '--fortune-gold': fortuneColors.primary.gold,
    '--fortune-dark-gold': fortuneColors.primary.darkGold,
    '--fortune-charcoal': fortuneColors.luxury.charcoal,
    '--fortune-platinum': fortuneColors.luxury.platinum,
    '--fortune-pearl': fortuneColors.luxury.pearl,
    '--fortune-emerald': fortuneColors.accent.emerald,
    '--fortune-ruby': fortuneColors.accent.ruby,
    '--fortune-sapphire': fortuneColors.accent.sapphire,
  },
  dark: {
    '--fortune-gold': fortuneColors.primary.lightGold,
    '--fortune-dark-gold': fortuneColors.primary.gold,
    '--fortune-charcoal': fortuneColors.luxury.midnight,
    '--fortune-platinum': fortuneColors.luxury.charcoal,
    '--fortune-pearl': fortuneColors.neutral[900],
    '--fortune-emerald': '#10B981',
    '--fortune-ruby': '#EF4444',
    '--fortune-sapphire': '#3B82F6',
  },
};

export default fortuneColors;
