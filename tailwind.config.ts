import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Inter', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          50: 'hsl(var(--brand-primary-50))',
          100: 'hsl(var(--brand-primary-100))',
          200: 'hsl(var(--brand-primary-200))',
          300: 'hsl(var(--brand-primary-300))',
          400: 'hsl(var(--brand-primary-400))',
          500: 'hsl(var(--brand-primary-500))',
          600: 'hsl(var(--brand-primary-600))',
          700: 'hsl(var(--brand-primary-700))',
          800: 'hsl(var(--brand-primary-800))',
          900: 'hsl(var(--brand-primary-900))',
          950: 'hsl(var(--brand-primary-950))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          50: 'hsl(var(--brand-secondary-50))',
          100: 'hsl(var(--brand-secondary-100))',
          200: 'hsl(var(--brand-secondary-200))',
          300: 'hsl(var(--brand-secondary-300))',
          400: 'hsl(var(--brand-secondary-400))',
          500: 'hsl(var(--brand-secondary-500))',
          600: 'hsl(var(--brand-secondary-600))',
          700: 'hsl(var(--brand-secondary-700))',
          800: 'hsl(var(--brand-secondary-800))',
          900: 'hsl(var(--brand-secondary-900))',
          950: 'hsl(var(--brand-secondary-950))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        // Brand color extensions
        surface: {
          background: 'hsl(var(--surface-background))',
          primary: 'hsl(var(--surface-primary))',
          elevated: 'hsl(var(--surface-elevated))',
        },
        text: {
          primary: 'hsl(var(--text-primary))',
          secondary: 'hsl(var(--text-secondary))',
          muted: 'hsl(var(--text-muted))',
          inverse: 'hsl(var(--text-inverse))',
        },
        success: {
          DEFAULT: 'hsl(var(--brand-success-500))',
          50: 'hsl(var(--brand-success-50))',
          100: 'hsl(var(--brand-success-100))',
          200: 'hsl(var(--brand-success-200))',
          300: 'hsl(var(--brand-success-300))',
          400: 'hsl(var(--brand-success-400))',
          500: 'hsl(var(--brand-success-500))',
          600: 'hsl(var(--brand-success-600))',
          700: 'hsl(var(--brand-success-700))',
          800: 'hsl(var(--brand-success-800))',
          900: 'hsl(var(--brand-success-900))',
          950: 'hsl(var(--brand-success-950))',
        },
        warning: {
          DEFAULT: 'hsl(var(--brand-warning-500))',
          50: 'hsl(var(--brand-warning-50))',
          100: 'hsl(var(--brand-warning-100))',
          200: 'hsl(var(--brand-warning-200))',
          300: 'hsl(var(--brand-warning-300))',
          400: 'hsl(var(--brand-warning-400))',
          500: 'hsl(var(--brand-warning-500))',
          600: 'hsl(var(--brand-warning-600))',
          700: 'hsl(var(--brand-warning-700))',
          800: 'hsl(var(--brand-warning-800))',
          900: 'hsl(var(--brand-warning-900))',
          950: 'hsl(var(--brand-warning-950))',
        },
        error: {
          DEFAULT: 'hsl(var(--brand-error-500))',
          50: 'hsl(var(--brand-error-50))',
          100: 'hsl(var(--brand-error-100))',
          200: 'hsl(var(--brand-error-200))',
          300: 'hsl(var(--brand-error-300))',
          400: 'hsl(var(--brand-error-400))',
          500: 'hsl(var(--brand-error-500))',
          600: 'hsl(var(--brand-error-600))',
          700: 'hsl(var(--brand-error-700))',
          800: 'hsl(var(--brand-error-800))',
          900: 'hsl(var(--brand-error-900))',
          950: 'hsl(var(--brand-error-950))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'fade-in': {
          from: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

    