import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    // Exclude Payload admin to avoid conflicts
    '!./src/app/(payload)/**',
    '!./app/(payload)/**',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
