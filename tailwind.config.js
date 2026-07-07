/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#05070F',
        navy: '#0B1638',
        royal: '#1E3A8A',
        royaldeep: '#152B66',
        sky: '#38BDF8',
        skydeep: '#0EA5E9',
        slate: '#94A3B8',
      },
      fontFamily: {
        display: ['Rajdhani', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      clipPath: {
        panel: 'polygon(0 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%)',
      },
    },
  },
  plugins: [],
}
