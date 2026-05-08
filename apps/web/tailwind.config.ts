import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ============================================
        // PUBLIC SITE — Sanflait brand palette
        // Verde escuro + Dourado · preto e branco como contraste
        // ============================================
        cream: '#FFFFFF',
        'off-white': '#F4F9F6',
        beige: '#D4E8DD',
        sand: '#EEEEEE',
        charcoal: '#0D3829',
        'charcoal-deep': '#061E14',
        gold: '#C4A040',
        'gold-soft': '#D4B250',
        'warm-gray': '#2A3E35',
        'warm-gray-light': '#8CA898',

        // ============================================
        // ADMIN — Dark Power BI palette (inalterado)
        // ============================================
        ink: {
          0: '#0E0E10',
          1: '#161618',
          2: '#1C1C1F',
          3: '#242428',
          4: '#2C2C31',
          5: '#34343A',
        },
        line: {
          DEFAULT: '#2E2E34',
          strong: '#3A3A42',
          subtle: '#222226',
        },
        'ink-text': {
          1: '#F2F2F5',
          2: '#A8A8B3',
          3: '#6B6B78',
          4: '#4A4A55',
        },
        accent: {
          blue: '#3B82F6',
          'blue-dim': '#1E3A5F',
          purple: '#8B5CF6',
          'purple-dim': '#2D1B69',
          teal: '#14B8A6',
          'teal-dim': '#0D3D38',
          amber: '#F59E0B',
          'amber-dim': '#4A2E00',
          red: '#EF4444',
          'red-dim': '#4A1515',
          green: '#22C55E',
          'green-dim': '#0D3D1F',
          pink: '#EC4899',
          'pink-dim': '#4A1538',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        editorial: '0.18em',
        widest: '0.25em',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slideDown 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        shimmer: 'shimmer 2.4s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
