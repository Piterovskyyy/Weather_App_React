/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        dayIcon: 'url("/images/dayIcon.svg")',
        dayIconActive: 'url("/images/dayIconActive.svg")',
        nightIcon: 'url("/images/nightIcon.svg")',
        nightIconActive: 'url("/images/nightIconActive.svg")',
      },
    },
  },
  plugins: [daisyui],
};
