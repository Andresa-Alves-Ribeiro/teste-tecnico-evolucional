/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3B82F6',
          dark: '#60A5FA',
        },
        background: {
          light: '#f5f5f5',
          dark: '#111827',
        },
        text: {
          light: '#1F2937',
          dark: '#F9FAFB',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#1F2937',
        },
        border: {
          light: '#E5E7EB',
          dark: '#374151',
        },
      },
    },
  },
  plugins: [],
} 