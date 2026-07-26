/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        paper: '#F2F3F5',
        ink: '#121417',
        quiet: '#5A616B',
        line: '#D5D8DE',
        panel: '#FFFFFF',
        forest: '#0F5C4C',
        forestSoft: '#E6F2EE',
      },
      maxWidth: {
        sheet: '1180px',
      },
    },
  },
  plugins: [],
};
