/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {  animation: {
      vote: 'vote 1s ease-in-out',
      'waving-hand': 'wave 1s linear',
      'fade-in': 'fadeIn 2s',
      warp: 'warp ease-out 1s'
  },
  keyframes: {
      vote: {
          '0%, 100%': {
              transform: 'rotate(-30deg)'
          },
          '50%': {
              transform: 'rotate(30deg)'
          },
      },
      wave: {
        '0%': { transform: 'rotate(0.0deg)' },
        '10%': { transform: 'rotate(14deg)' },
        '20%': { transform: 'rotate(-8deg)' },
        '30%': { transform: 'rotate(14deg)' },
        '40%': { transform: 'rotate(-4deg)' },
        '50%': { transform: 'rotate(10.0deg)' },
        '60%': { transform: 'rotate(0.0deg)' },
        '100%': { transform: 'rotate(0.0deg)' },
      },
      fadeIn: {
        '0%': { opacity: 0.1 },
        '100%': { opacity: 1 },
      },
      warp: {
        '0%': { transform: 'scale(1)' },
        '100%': { transform: 'scale(0.05)' },
      }
  },},
  },
  plugins: [],
}
