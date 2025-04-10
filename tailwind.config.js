/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // Next.js 13 이상에서는 app 디렉토리도 필요
  ],
theme: {
  extend: {
    fontFamily: {
      sans: ['var(--font-noto-sans)', 'sans-serif'],
    },
  },
},

  plugins: [],
}

