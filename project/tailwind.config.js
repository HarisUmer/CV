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
        bg: '#0C0D0F',
        surface: '#15171B',
        fg: '#E8EAED',
        quiet: '#8B919A',
        line: '#2A2D33',
        accent: '#3DDBA0',
        accentDim: '#16352C',
      },
      maxWidth: {
        sheet: '1180px',
      },
    },
  },
  plugins: [],
};
