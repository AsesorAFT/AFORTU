import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
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
        background: 'hsl(var(--ds-bg))',
        surface: 'hsl(var(--ds-surface))',
        border: 'hsl(var(--ds-border))',
        content: 'hsl(var(--ds-content))',
        accent: {
          50: 'var(--accent-50)',
          100: 'var(--accent-100)',
          200: 'var(--accent-200)',
          300: 'var(--accent-300)',
          400: 'var(--accent-400)',
          500: 'var(--accent-500)',
          600: 'var(--accent-600)',
          700: 'var(--accent-700)',
          800: 'var(--accent-800)',
          900: 'var(--accent-900)',
        },
        positive: 'hsl(var(--semantic-positive))',
        negative: 'hsl(var(--semantic-negative))',
        warning: 'hsl(var(--semantic-warning))',
        info: 'hsl(var(--semantic-info))',
      },
      boxShadow: {
        elevate: 'var(--elevate-1)',
        glow: 'var(--elevate-glow)',
      },
      borderRadius: {
        glass: 'var(--glass-radius)',
      },
      backdropBlur: {
        glass: 'var(--glass-blur)',
      },
    },
  },
  plugins: [],
};

export default config;