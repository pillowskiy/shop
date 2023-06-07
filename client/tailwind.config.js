/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          foreground: "var(--warning-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      padding: {
        custom: "var(--padding)"
      },
      flex: {
        "card": "1 0 200px",
      },
      height: {
        "screen-64": "calc(100vh - 64px)",
      },
      minHeight: {
        "screen-64": "calc(100vh - 64px)",
      },
      maxWidth: {
        "1/2": "calc(50% - 8px)",
        "1/3": "calc(50% - 24px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "card-in": {
          "0%": { transform: "translateY(-1500px) skewY(30deg) scaleY(1.3);" },
          "70%": { transform: "translateY(30px) skewY(0deg) scaleY(.9);" },
          "100%": { transform:"translateY(0px) skewY(0deg) scaleY(1);" }
        },
        "randomly-x": {
          "100%": { transform: "translateX(calc(100% - 16px));" }
        },
        "randomly-y": {
          "100%": { transform: "translateY(calc(100% - 16px));" }
        },
        "180-rotate": {
          from: { transform: "rotate(180deg)" },
          to: { transform: "rotate(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "card-in": "card-in .3s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;",
        "randomly-x": "randomly-x 2.6s linear infinite alternate",
        "randomly-y": "randomly-y .8s linear infinite alternate",
        "180-rotate": "180-rotate .3s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;"
      },
      fontFamily: {
        consolas: ['Consolas', 'monospace']
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}