/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Warm Ubuntu-GNOME-inspired palette. Every token is backed by a CSS
        // variable defined in src/index.css (:root = light, .dark = dark),
        // so a single class works in both themes — no `dark:` duplicates.
        base: 'rgb(var(--base) / <alpha-value>)',
        sidebar: 'rgb(var(--sidebar) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        elevated: 'rgb(var(--elevated) / <alpha-value>)',
        code: 'rgb(var(--code) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        faint: 'rgb(var(--faint) / <alpha-value>)',
        line: 'rgb(var(--line) / 0.09)',
        accent: {
          400: 'rgb(var(--accent-400) / <alpha-value>)',
          500: 'rgb(var(--accent-500) / <alpha-value>)',
          600: 'rgb(var(--accent-600) / <alpha-value>)',
          700: 'rgb(var(--accent-700) / <alpha-value>)',
        },
        'accent-soft': 'rgb(var(--accent-500) / 0.12)',
        brand: {
          50: 'rgb(var(--brand-50) / <alpha-value>)',
          500: 'rgb(var(--brand) / <alpha-value>)',
          600: 'rgb(var(--brand-600) / <alpha-value>)',
          700: 'rgb(var(--brand-700) / <alpha-value>)',
        },
        success: 'rgb(var(--success) / <alpha-value>)',
        'success-soft': 'rgb(var(--success) / 0.12)',
        danger: 'rgb(var(--danger) / <alpha-value>)',
        'danger-soft': 'rgb(var(--danger) / 0.12)',
        warning: 'rgb(var(--warning) / <alpha-value>)',
        'warning-soft': 'rgb(var(--warning) / 0.12)',
        // Codecademy-style progress yellow: the % pill and the hatched
        // progress fill accent. Backed by --pill-yellow in index.css.
        'pill-yellow': 'rgb(var(--pill-yellow) / <alpha-value>)',
        'pill-yellow-ink': 'rgb(var(--pill-yellow-ink) / <alpha-value>)',
      },
      fontFamily: {
        // Inter first when installed; otherwise the system UI stack.
        // No webfont is fetched at runtime — the app works fully offline.
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Ubuntu', 'Cantarell', 'Noto Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'Liberation Mono', 'monospace'],
      },
      transitionDuration: {
        200: '200ms',
      },
    },
  },
  plugins: [],
};
