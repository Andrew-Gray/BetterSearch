// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: false,
	devtools: { enabled: true },
	modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@nuxtjs/color-mode"],

	shadcn: {
		/**
			* Prefix for all the imported component
			*/
		prefix: '',
		/**
			* Directory that the component lives in.
			* @default "./components/ui"
			*/
		componentDir: './components/ui'
	},

	colorMode: {
		classSuffix: ''
	},

	compatibilityDate: "2024-07-14"
})