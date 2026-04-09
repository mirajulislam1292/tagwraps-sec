/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0047AB",
        "primary-dark": "#003380",
        background: "#f3f4f6",
        surface: "#FFFFFF",
        "dark-surface": "#0a0a0f",
        success: "#16A34A",
        danger: "#dc2626",
        warning: "#D97706",
        "text-primary": "#171717",
        "text-secondary": "#9ca3af",
        border: "#e5e7eb",
      },
      borderRadius: {
        xl: "12px",
        lg: "10px",
        md: "8px",
      },
      boxShadow: {
        card: "0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.04)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

