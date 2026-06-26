/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#F4F7FB',
          soft: '#FFFFFF',
          raised: '#F0F4F9',
          line: '#E3E8EF',
        },
        paper: {
          DEFAULT: '#F4F1E8',
          dim: '#E7E3D6',
        },
        sage: {
          DEFAULT: '#2563EB',
          dim: '#1D4ED8',
          bright: '#1E40AF',
        },
        gold: {
          DEFAULT: '#D97706',
          dim: '#B45309',
        },
        coral: {
          DEFAULT: '#DC2626',
          dim: '#B91C1C',
        },
        ledger: {
          text: '#16213A',
          muted: '#5B6B82',
          faint: '#94A3B8',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Sora', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(16,24,40,0.04), 0 6px 20px -6px rgba(16,24,40,0.10)',
      },
      borderRadius: {
        ticket: '14px',
      },
    },
  },
  plugins: [],
}