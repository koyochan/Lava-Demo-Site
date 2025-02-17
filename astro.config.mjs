import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

const DEV_PORT = 2121;

// https://astro.build/config
export default defineConfig({
	site: process.env.VERCEL
		? 'https://lava-demo-site-xi.vercel.app/'
		: `http://localhost:${DEV_PORT}`,
	base: '/',
	output: 'static',

	/* Vercel や Netlify のデフォルト設定に合わせる */
	trailingSlash: 'always',

	server: {
		port: DEV_PORT, // Dev. server only
	},

	integrations: [
		sitemap(),
		tailwind(),
	],
});