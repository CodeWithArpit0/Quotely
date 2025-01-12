/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#424BF6",
        primaryDark: "#3D3DCB",
        error: "#D32F2F",
      },
    },
  },
  plugins: [],
};
