import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        wall: {
          DEFAULT: '#17161b',
          deep: '#0d0c10',
          raised: '#1f1d24',
          soft: '#25232c',
          edge: '#34313c',
        },
        bone: '#efece4',
        ash: '#a8a4a0',
        tape: '#ffd400',
        marker: '#ff2d4a',
        chalk: '#dad6cc',
        /** propagated by ColorWall — falls back to tape yellow when no swatch is active */
        accent: 'var(--accent, #ffd400)',
        'accent-ink': 'var(--accent-ink, #0e0d10)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Impact', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      animation: {
        'spray-reveal': 'sprayReveal 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both',
        'spray-blob': 'sprayBlob 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.05s both',
        'drip': 'drip 0.7s cubic-bezier(0.34, 1.4, 0.64, 1) 0.5s both',
        'rise': 'rise 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'marquee': 'marquee 28s linear infinite',
      },
      keyframes: {
        sprayReveal: {
          /**
           * Negative top/bottom insets keep háčky (Ě/Š/Č/Ř/Ý) and descenders
           * visible — tight display line-heights (0.82–0.86) make the box
           * shorter than the font's ascender, so `inset(0 0 0 0)` would clip
           * diacritics off the top.
           */
          '0%': {
            clipPath: 'inset(-35% 100% -20% 0)',
            transform: 'translateX(-8px)',
            opacity: '0.4',
          },
          '60%': { opacity: '1' },
          '100%': {
            clipPath: 'inset(-35% 0 -20% 0)',
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        sprayBlob: {
          '0%': { transform: 'translateX(-30%) scale(0.6)', opacity: '0' },
          '15%': { opacity: '1' },
          '85%': { opacity: '1' },
          '100%': { transform: 'translateX(110%) scale(1.1)', opacity: '0' },
        },
        drip: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '70%': { transform: 'scaleY(1.08)', transformOrigin: 'top' },
          '100%': { transform: 'scaleY(1)', transformOrigin: 'top' },
        },
        rise: {
          '0%': { transform: 'translateY(18px)', opacity: '0', filter: 'blur(4px)' },
          '60%': { filter: 'blur(0)' },
          '100%': { transform: 'translateY(0)', opacity: '1', filter: 'blur(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
