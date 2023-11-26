/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      royal: "#03256C",
      persian: "#2541B2",
      aero: "#06BEE1",
      "green-blue": "#1768AC",
      white: "#FFFFFF",
      grey: "#808080",
      pastelRed: "#FF6961",
      darkRed: "#600f0b",
      pastelGreen: "#aae198",
      darkGreen: "#82dfab",
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
