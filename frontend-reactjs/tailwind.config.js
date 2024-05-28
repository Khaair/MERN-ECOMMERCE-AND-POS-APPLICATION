/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container:{
      padding:{
        DEFAULT:"15px",
        sm:"30px",
        lg:"30px",
        "2md":"30px",
        xl:"30px",
        "2lg":"30px",
        "2xl":"30px",
        "3xl":"30px"
      }
    },
    screens: {
      sm: "640px",
      md: "768px",
      "2md":"991px",
      lg: "1024px",
      "2lg":"1200px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {

    },
  },
  plugins: [],
}

