import type { Config } from "tailwindcss";
// Colours sampled from the Powertech flyer and logo (leaf is darkened slightly for text contrast).
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: {
    ink: "#041C0C", forest: "#04542C", leaf: "#4F8A06", lime: "#CCFC8C", mist: "#EEFDDD", navy: "#04042C", sun: "#F08A24",
  }, fontFamily: { sans: ["ui-sans-serif","system-ui","-apple-system","Segoe UI","Roboto","sans-serif"] } } },
  plugins: [],
};
export default config;
