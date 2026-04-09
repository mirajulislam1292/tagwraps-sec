/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0F4FE8",
        "primary-dark": "#0A38B0",
        accent: "#00D4AA",
        background: "#F7F8FC",
        surface: "#FFFFFF",
        "text-primary": "#0D0F1A",
        "text-secondary": "#5A607A",
        border: "#E2E5F0",
        success: "#16A34A",
        warning: "#D97706",
        danger: "#DC2626",
      },
      borderRadius: {
        xl: "20px",
        lg: "12px",
        md: "8px",
      },
      boxShadow: {
        card: "0 1px 4px rgba(0,0,0,0.06)",
        elevated: "0 4px 24px rgba(15,79,232,0.12)",
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        heading: ["Syne", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

