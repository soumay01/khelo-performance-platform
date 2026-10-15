/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4fa', 100: '#dce5f2', 200: '#b9cbe5', 300: '#8aa8d2',
          400: '#5b82bb', 500: '#3a64a0', 600: '#2b4f85', 700: '#1f3d6b',
          800: '#16305a', 900: '#0e2244', 950: '#081630',
        },
        saffron: {
          50: '#fff8eb', 100: '#ffefc6', 200: '#ffdc85', 300: '#ffc443',
          400: '#ffab1a', 500: '#f79009', 600: '#dc6d04', 700: '#b64c07',
          800: '#943b0d', 900: '#7a330f',
        },
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: { fadeUp: 'fadeUp 0.5s ease-out both' },
    },
  },
  plugins: [],
};
