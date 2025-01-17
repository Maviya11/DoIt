/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Ubuntu: ["Ubuntu", "serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            textarea: {
              fontSize: "1.5rem", // 2xl equivalent
            },
          },
        },
      },
    },
  },
  plugins: [],
};
