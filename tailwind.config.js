/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Josefin Sans"],
      },
      colors: {
        mainBg: "hsl(235, 21%, 11%)",
        cardBg: "hsl(235, 24%, 19%)",
        textCol: "hsl(234, 39%, 85%)",
        textCol2: "hsl(234, 11%, 52%)",
        brBlue: "hsl(220, 98%, 61%)",
      },

      screens: {
        sm: { max: "350px" },
      },
    },
  },
  plugins: [],
};
