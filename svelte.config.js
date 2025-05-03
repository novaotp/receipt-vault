import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			fallback: 'index.html'
		}),
		alias: {
			$components: './src/lib/components',
			$states: './src/lib/states',
			$contexts: './src/lib/contexts',
			$services: './src/lib/services',
			$types: './src/lib/types',
			$utils: './src/lib/utils'
		}
	}
};

export default config;
