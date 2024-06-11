import typography from "@tailwindcss/typography";
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,ts,css,svelte}"],
	theme: {
		extend: {},
	},
	plugins: [typography(), daisyui],
};
