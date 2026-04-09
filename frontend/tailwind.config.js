/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0F4FE8",
        accent: "#0F4FE8",
        background: "#FFFFFF",
        surface: "#F8F9FB",
        "text-primary": "#0A0A0A",
        "text-secondary": "#6B7280",
        border: "#E6E8EE",
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
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

