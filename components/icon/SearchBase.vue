<script setup>
	const props = defineProps({
		icon: {
			type: String,
			default: ""
		}
	});
</script>

<template>
	<IconGoogle v-if="props.icon.toLowerCase() === 'google'" />
	<IconBing v-else-if="props.icon.toLowerCase() === 'bing'" />
	<IconDuckduckgo v-else-if="props.icon.toLowerCase() === 'duckduckgo'" />
	<IconGenericSearch v-else />
</template>
