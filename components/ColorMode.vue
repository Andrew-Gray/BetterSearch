<script setup>
	import { Icon } from "@iconify/vue";
	import { Button } from "@/components/ui/button";
	import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
	import { ref } from "vue";

	const colorMode = useColorMode();
	const colorModeSelected = ref(colorMode.preference);

	const setColorMode = (mode) => {
		colorMode.preference = mode;
	};
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button variant="ghost">
				<Icon
					icon="radix-icons:moon"
					class="h-[1.2rem] w-[1.2rem] -rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
				<Icon
					icon="radix-icons:sun"
					class="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent>
			<DropdownMenuRadioGroup v-model="colorModeSelected">
				<DropdownMenuRadioItem
					value="light"
					@click="setColorMode('light')">
					Light
				</DropdownMenuRadioItem>
				<DropdownMenuRadioItem
					value="dark"
					@click="setColorMode('dark')">
					Dark
				</DropdownMenuRadioItem>
				<DropdownMenuRadioItem
					value="system"
					@click="setColorMode('system')">
					System
				</DropdownMenuRadioItem>
			</DropdownMenuRadioGroup>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
