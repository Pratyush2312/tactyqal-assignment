// Design tokens live here so components never hard-code a colour or font.
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        chalk: "#F4F5F7", // page background
        paper: "#FFFFFF",
        navy: "#14213D",  // text, buttons, dark section
        sun: "#FFD84D",   // the hero, and nothing else
        mist: "#D3D8E0",  // rules
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
        sans: ['"IBM Plex Sans"', "system-ui", "sans-serif"],
      },
      maxWidth: { prose: "62ch" },
    },
  },
};