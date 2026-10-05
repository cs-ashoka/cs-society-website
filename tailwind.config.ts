import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'rgb(var(--c-primary) / <alpha-value>)',
        'on-primary': 'rgb(var(--c-on-primary) / <alpha-value>)',
        'secondary': 'rgb(var(--c-secondary) / <alpha-value>)',
        'background': 'rgb(var(--c-background) / <alpha-value>)',
        'surface': 'rgb(var(--c-surface) / <alpha-value>)',
        'surface-container': 'rgb(var(--c-surface-container) / <alpha-value>)',
        'surface-container-low': 'rgb(var(--c-surface-container-low) / <alpha-value>)',
        'on-surface': 'rgb(var(--c-on-surface) / <alpha-value>)',
        'on-surface-variant': 'rgb(var(--c-on-surface-variant) / <alpha-value>)',
        'tertiary': 'rgb(var(--c-tertiary) / <alpha-value>)',
        'border': 'rgb(var(--c-border) / <alpha-value>)',
        'inverse-surface': 'rgb(var(--c-inverse-surface) / <alpha-value>)',
        'hero-tint': 'rgb(var(--c-hero-tint) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-jetbrains-mono)'],
      },
    },
  },
  plugins: [],
};
export default config;