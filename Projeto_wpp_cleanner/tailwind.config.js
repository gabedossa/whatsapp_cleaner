/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#050914",
          900: "#0A0F1E",
          850: "#0F172A",
          800: "#111827",
        },
        mint: "#00E5A0",
        cyan: "#00B4D8",
        coral: "#FF6B6B",
        danger: "#FF4757",
        amber: "#FFE66D",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        shell: "0 48px 120px rgba(0,0,0,0.62), inset 0 1px 0 rgba(255,255,255,0.08)",
        mint: "0 18px 42px rgba(0,229,160,0.24)",
        danger: "0 18px 42px rgba(255,71,87,0.26)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        softPulse: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.06)", opacity: "0.72" },
        },
        deleteOut: {
          "0%": { opacity: "1", transform: "translateX(0)", maxHeight: "112px" },
          "50%": { opacity: "0.28", transform: "translateX(42px)" },
          "100%": {
            opacity: "0",
            transform: "translateX(72px)",
            maxHeight: "0",
            paddingTop: "0",
            paddingBottom: "0",
            margin: "0",
            borderWidth: "0",
          },
        },
      },
      animation: {
        fadeUp: "fadeUp 420ms ease both",
        softPulse: "softPulse 1.5s ease-in-out infinite",
        deleteOut: "deleteOut 420ms ease forwards",
      },
    },
  },
  plugins: [],
};
