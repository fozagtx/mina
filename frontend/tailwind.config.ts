import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f4ff",
          100: "#dbe4ff",
          200: "#bac8ff",
          300: "#91a7ff",
          400: "#748ffc",
          500: "#5c7cfa",
          600: "#4c6ef5",
          700: "#4263eb",
          800: "#3b5bdb",
          900: "#364fc7",
        },
        primary: {
          electric: "#00FF9D",
          cyber: "#00D9FF",
          base: "#0052FF",
          dark: "#0A0E27",
        },
        accent: {
          viral: "#FF00E5",
          warning: "#FFB800",
          openai: "#10A37F",
          green: "#10B981",
        },
        neutral: {
          900: "#0D1117",
          800: "#161B22",
          700: "#21262D",
          600: "#30363D",
          500: "#484F58",
          400: "#6E7681",
          300: "#8B949E",
          200: "#C9D1D9",
          100: "#F0F6FC",
        },
      },
      fontFamily: {
        display: [
          "JetBrains Mono",
          "SF Mono",
          "Fira Code",
          "Roboto Mono",
          "monospace",
        ],
        body: [
          "Untitled Sans",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "SF Mono",
          "Fira Code",
          "Roboto Mono",
          "monospace",
        ],
      },
      backgroundImage: {
        "gradient-hero":
          "linear-gradient(135deg, #0A0E27 0%, #1a1f3a 50%, #0A0E27 100%)",
        "gradient-card":
          "linear-gradient(180deg, rgba(0, 217, 255, 0.05) 0%, rgba(0, 255, 157, 0.05) 100%)",
        "gradient-cta": "linear-gradient(90deg, #00FF9D 0%, #00D9FF 100%)",
        "gradient-text":
          "linear-gradient(90deg, #00FF9D 0%, #00D9FF 50%, #10A37F 100%)",
      },
      boxShadow: {
        glow: "0 0 20px rgba(0, 255, 157, 0.5)",
        "glow-sm": "0 0 10px rgba(0, 255, 157, 0.3)",
        "glow-cyan": "0 0 20px rgba(0, 217, 255, 0.5)",
        "glow-pink": "0 0 20px rgba(255, 0, 229, 0.5)",
        "glow-openai": "0 0 20px rgba(16, 163, 127, 0.5)",
      },
      animation: {
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "blink-dot": "blinkDot 1.5s ease-in-out infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 255, 157, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 255, 157, 0.6)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blinkDot: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
      },
    },
  },
  plugins: [],
}

export default config
