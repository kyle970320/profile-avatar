/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        "sub-bg": "var(--color-sub-bg)",
        main: "var(--color-main)",
        
      },
    },
  },
  plugins: [],
};
