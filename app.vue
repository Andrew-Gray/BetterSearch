<script setup>
	useHead({
		title: "Better Search",
		meta: [{ name: "Better Search", content: "Quickly and easily search using different search engines" }]
	});
</script>

<template>
	<div class="absolute right-2 top-2 z-10">
		<ColorMode />
	</div>
	<main class="relative z-0 flex min-h-dvh w-full items-center justify-center px-4 pb-4">
		<Search />
	</main>

	<Footer />
</template>

<style>
	#__nuxt {
		height: 100vh;
		height: 100dvh;
		display: grid;
		place-items: center;
	}
</style>
