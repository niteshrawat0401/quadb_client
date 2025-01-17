/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  "paths": {
      "@/components/*": ["src/components/*"]
    },
  theme: {
    extend: {},
  },
  plugins: [],
}