/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        serif: ["-apple-system-ui-serif", "ui-serif", "serif"],
        mono: ["ui-monospace", "mono"],
      },
    },
  },
  plugins: [],
}
