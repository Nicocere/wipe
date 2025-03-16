/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "!./src/app/**/node_modules", // Excluir node_modules en subdirectorios
    "./src/components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'encode-sans': ['var(--font-encode-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}