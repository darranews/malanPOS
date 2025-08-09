/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#A78BFA", // tím nhạt
          green: "#4ADE80",  // xanh lá
          gray: "#6B7280",   // xám
        }
      }
    },
  },
  plugins: [],
}