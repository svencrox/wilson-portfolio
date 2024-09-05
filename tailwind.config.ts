import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx,md}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			colors: {
				background: "#0a192f", // Dark background color
				foreground: "#ffffff", // Light foreground for text on dark background
				card: {
					DEFAULT: "#112240", // Lighter dark for card backgrounds
					foreground: "#ffffff", // Text color on cards
				},
				popover: {
					DEFAULT: "#112240", // Popover background color
					foreground: "#ffffff", // Popover text color
				},
				primary: {
					DEFAULT: "#64ffda", // Green accent color
					foreground: "#0a192f", // Text on primary background
				},
				secondary: {
					DEFAULT: "#8892b0", // Muted light text color
					foreground: "#94a3b8", // Text on secondary background
				},
				muted: {
					DEFAULT: "#8892b0", // For muted text
					foreground: "#ffffff", // Text on muted background
				},
				accent: {
					DEFAULT: "#64ffda", // Accent color similar to primary
					foreground: "#0a192f", // Text on accent background
				},
				destructive: {
					DEFAULT: "#ff6b6b", // Destructive action color (red)
					foreground: "#ffffff", // Text on destructive background
				},
				border: "#233554", // Border color for containers and elements
				input: "#233554", // Input field background color
				ring: "#64ffda", // Focus ring color
				chart: {
					"1": "#ff6b6b", // Chart colors, adjust as needed
					"2": "#64ffda",
					"3": "#8892b0",
					"4": "#ccd6f6",
					"5": "#112240",
				},
			},
			fontFamily: {
				sans: ["Calibre", "Inter", "San Francisco", "SF Pro Text", "Segoe UI", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
				mono: ["SF Mono", "Fira Code", "Fira Mono", "Roboto Mono", "monospace"],
			},
			// custom utilities for glass pane effect
			backdropBlur: {
				glass: "20px", // Custom blur value
			},
			backgroundOpacity: {
				glass: "0.3", // Custom background opacity
			},
			boxShadow: {
				glass: "0 4px 6px rgba(255, 255, 255, 0.1)", // Custom shadow for glass effect
			},
			transitionProperty: {
				glass: "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform",
			},
			scale: {
				"105": "1.05",
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
export default config;
