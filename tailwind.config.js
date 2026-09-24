/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#090B0E',
          900: '#0D0F12',
          850: '#12161A',
          800: '#181E24',
          700: '#232B34',
        },
        cream: {
          50: '#FFFAF0',
          100: '#FFF3CD',
          200: '#F5E6C8',
          300: '#EBD4A8',
          400: '#E6C280',
          500: '#D4AF37',
        },
        custard: {
          light: '#FFF9E6',
          DEFAULT: '#FFF3CD',
          dark: '#E6C280',
        },
        surface: {
          card: 'rgba(18, 22, 26, 0.7)',
          hover: 'rgba(26, 32, 38, 0.85)',
          border: 'rgba(245, 230, 200, 0.12)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'Plus Jakarta Sans', 'sans-serif'],
        serif: ['Playfair Display', 'Cormorant Garamond', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'glow-cream': '0 0 25px rgba(245, 230, 200, 0.18)',
        'glow-gold': '0 0 35px rgba(230, 194, 128, 0.25)',
      }
    }
  },
  plugins: [],
}
