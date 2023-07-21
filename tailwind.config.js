/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
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
        textColDim: "hsl(233, 14%, 35%)",
        brBlue: "hsl(220, 98%, 61%)",
        lineCol: "hsl(237, 14%, 26%)",
        mainBgLight: "hsl(236, 33%, 92%)",
        cardBgLight: " hsl(0, 0%, 98%)",
        lineColLight: 'hsl(234, 39%, 85%)',
        textColLight: "hsl(237, 14%, 26%)",
        textColDimLight: "hsl(236, 9%, 61%)"
      },

      screens: {
        sm: { max: "350px" },
      },
    },
  },
  plugins: [],
};
