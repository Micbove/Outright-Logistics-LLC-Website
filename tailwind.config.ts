import type { Config } from "tailwindcss";

export default {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#0B3A5B",
          orange: "#F26A1B",
          steel: "#0F172A"
        }
      }
    }
  },
  plugins: []
} satisfies Config;

