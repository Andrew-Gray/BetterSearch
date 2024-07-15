<script setup>
	const year = new Date().getFullYear();
</script>

<template>
	<footer class="flex w-full items-center justify-between p-4 dark:bg-background">
		<div class="flex items-center">
			<div class="me-4 text-2xl">idx[0]</div>
			<p>Copyright © {{ year }} - All right reserved</p>
		</div>
		<nav>
			<a
				href="https://github.com/Andrew-Gray"
				target="_blank">
				<IconGithub
					width="24"
					height="24" />
			</a>
		</nav>
	</footer>
</template>
