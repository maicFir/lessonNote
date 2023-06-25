/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/app/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        pc: {
          min: "1025px",
        },
        phone: {
          max: "1024px",
        },
      },
      keyframes: {
        "opacity-in-bounce": {
          "0%": {
            opacity: 0.3,
            color: "red",
            transform: "translateY(-25%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            opacity: 0.5,
            color: "green",
            transform: " translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
          "100%": {
            opacity: 1,
            color: "blue",
            transform: "translateY(-25%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
        },
      },
      animation: {
        "customer_opacity-in-bounce": "opacity-in-bounce 5s infinite ease",
      },
    },
  },
  plugins: [],
};
