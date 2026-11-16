import { site } from './src/config/site.js';

/** Colours and fonts come from src/config/site.js. */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: { xs: '420px', sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' },
    extend: {
      colors: {
        ...site.colors,
        // Tints derived from the brand palette for surfaces, borders and states.
        'adobe-2': '#E8DDC9',
        'adobe-3': '#DCCEB4',
        'chaparral-2': '#22302A',
        'poppy-soft': '#FBD9C6',
        line: '#CBBDA3',
        alert: '#A3260F',
      },
      fontFamily: {
        display: [`"${site.fonts.display}"`, 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: [`"${site.fonts.body}"`, 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: { frame: '84rem', prose: '42rem' },
      letterSpacing: { label: '0.14em' },
      borderRadius: { arch: '999px 999px 1.5rem 1.5rem', blob: '2.5rem' },
      keyframes: {
        rise: { from: { opacity: '0', transform: 'translateY(14px)' }, to: { opacity: '1', transform: 'none' } },
        fade: { from: { opacity: '0' }, to: { opacity: '1' } },
        spin: { to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        rise: 'rise 0.6s cubic-bezier(0.2,0.8,0.2,1) both',
        fade: 'fade 0.25s ease-out both',
        'spin-slow': 'spin 40s linear infinite',
      },
    },
  },
  plugins: [],
};
