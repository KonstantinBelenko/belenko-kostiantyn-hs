/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				'rainbow-red': '#FF0000',
				'rainbow-orange': '#FF7F00',
				'rainbow-yellow': '#FFFF00',
				'rainbow-green': '#00FF00',
				'rainbow-blue': '#0000FF',
				'rainbow-indigo': '#4B0082',
				'rainbow-violet': '#8B00FF'
			},
			animation: {
				'rainbow-color': 'rainbow 2s infinite'
			}
		}
	},

	plugins: []
};

module.exports = config;
