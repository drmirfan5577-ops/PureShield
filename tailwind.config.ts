import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        urdu: ["Noto Nastaliq Urdu", "serif"],
        arabic: ["Noto Kufi Arabic", "sans-serif"],
      },
      colors: {
        milk: "#FAFBFF",
        "milk-deep": "#F2F4FB",
        "milk-mid": "#EEF0F8",
        ink: "#0B1020",
        "ink-soft": "#4A5278",
        "ink-mute": "#8892B0",
        "accent-blue": "#3B6EFF",
        "accent-violet": "#9B5CFF",
        "accent-mint": "#00D4BE",
        "accent-rose": "#FF4F8B",
        "accent-emerald": "#00B87A",
        "accent-crimson": "#E0152A",
        "accent-gold": "#F59E0B",
        "glow-blue": "#7C9CFF",
        "glow-violet": "#B794FF",
        "glow-mint": "#6EE7D9",
        "glow-rose": "#FFB6E1",
        "glow-emerald": "#34D399",
        "glow-crimson": "#FB7185",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "text-shimmer": "textShimmer 3s linear infinite",
        "orb-drift": "orbDrift 6s ease-in-out infinite",
        "counter-pop": "counterPop 0.3s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "scan-line": "scanLine 4s linear infinite",
        "marquee": "marquee 20s linear infinite",
        "glow-ring": "glowRing 2s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        glowPulse: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        textShimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        orbDrift: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -20px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 15px) scale(0.95)" },
        },
        counterPop: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.12)" },
          "100%": { transform: "scale(1)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        glowRing: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(124, 156, 255, 0.4), 0 0 40px rgba(183, 148, 255, 0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(124, 156, 255, 0.7), 0 0 80px rgba(183, 148, 255, 0.4)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      boxShadow: {
        "glass": "0 8px 32px rgba(124, 156, 255, 0.12), inset 0 1px 0 rgba(255,255,255,0.9)",
        "glass-hover": "0 16px 48px rgba(124, 156, 255, 0.2), inset 0 1px 0 rgba(255,255,255,0.95)",
        "glow-blue": "0 0 30px rgba(59, 110, 255, 0.35), 0 4px 20px rgba(59, 110, 255, 0.2)",
        "glow-violet": "0 0 30px rgba(155, 92, 255, 0.35), 0 4px 20px rgba(155, 92, 255, 0.2)",
        "glow-emerald": "0 0 30px rgba(0, 184, 122, 0.35), 0 4px 20px rgba(0, 184, 122, 0.2)",
        "glow-crimson": "0 0 30px rgba(224, 21, 42, 0.35), 0 4px 20px rgba(224, 21, 42, 0.2)",
        "glow-mint": "0 0 30px rgba(0, 212, 190, 0.35), 0 4px 20px rgba(0, 212, 190, 0.2)",
        "inner-glow": "inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(255,255,255,0.3)",
        "deep-glass": "0 24px 64px rgba(75, 82, 120, 0.14), 0 4px 16px rgba(75, 82, 120, 0.08)",
      },
      backdropBlur: {
        xs: "4px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
