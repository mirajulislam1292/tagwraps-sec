/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0047AB",
        "primary-dark": "#003380",
        background: "#F8F9FA",
        surface: "#FFFFFF",
        "dark-surface": "#0A0A0F",
        success: "#16A34A",
        danger: "#DC2626",
        warning: "#D97706",
        "text-primary": "#111827",
        "text-secondary": "#6B7280",
        border: "#E5E7EB",
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

