
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'banner' : "url('./assets/bg-banner.jpg')",
      },
      animation: {
          'color-change': 'colorChange 5s infinite linear',
        },
        keyframes: {
          colorChange: {
            '0%': { color: 'hsl(220, 100%, 60%)' },  // blue
            '50%': { color: 'hsl(0, 100%, 60%)' },   // red
            // '100%': { color: 'hsl(120, 100%, 50%)' },// green
        },
      },
    },
  },
  plugins: [],
}

