<script setup>
	import { Button } from "@/components/ui/button";
	import { Textarea } from "@/components/ui/textarea";
	import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
	import { Switch } from "@/components/ui/switch";
	import { Label } from "@/components/ui/label";

	const searchEngines = [
		{
			id: "googleudm14",
			name: "Google (Web Only)",
			engine: "Google",
			query: ["https://www.google.com/search?q={QUERY}&udm=14"]
		},
		{
			id: "google",
			name: "Google",
			engine: "Google",
			query: ["https://www.google.com/search?q={QUERY}"]
		},
		{
			id: "bing",
			name: "Bing",
			engine: "Bing",
			query: ["https://www.bing.com/search?q={QUERY}"]
		},
		{
			id: "ddg",
			name: "DuckDuckGo",
			engine: "DuckDuckGo",
			query: ["https://duckduckgo.com/?q={QUERY}"]
		},
		{
			id: "all",
			name: "All (Multiple Tabs)",
			engine: "Search",
			query: ["https://www.google.com/search?q={QUERY}&udm=14", "https://www.google.com/search?q={QUERY}", "https://www.bing.com/search?q={QUERY}", "https://duckduckgo.com/?q={QUERY}"]
		}
	];

	const searchEngine = ref("googleudm14");
	const openInNewTab = ref(true);
	const searchText = ref("");
	const textRowCount = ref(4);
	const pageLoaded = ref(false);

	const vFocus = {
		mounted: (el) => el.focus()
	};

	const search = () => {
		let text = searchText.value;
		if (text == null || text.trim() === "") return;

		text = encodeURIComponent(text).replace(/'/g, "%27").replace(/"/g, "%22").replace(/%20/g, "+");

		const engineIdx = searchEngines.findIndex((engine) => engine.id === searchEngine.value);
		if (engineIdx < 0) {
			return;
		}

		const selectedEngine = searchEngines[engineIdx];

		selectedEngine.query.forEach((query) => {
			const url = query.replace("{QUERY}", text);

			if (selectedEngine.id === "all") {
				window.open(url, "_blank");
			} else if (openInNewTab.value) {
				window.open(url, "_blank").focus();
			} else {
				window.location.href = url;
			}
		});
	};

	const textAreaKeyDown = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			search();
		}
	};

	const openInNewTabUpdated = (e) => {
		openInNewTabUpdated.value = e;
	};

	onMounted(() => {
		if (window.innerWidth < 640) {
			textRowCount.value = 5;
		} else {
			textRowCount.value = 4;
		}

		const query = useRoute().query;

		if (query.engine != null) {
			const engineIdx = searchEngines.findIndex((engine) => engine.id === query.engine);
			if (engineIdx >= 0) {
				searchEngine.value = query.engine;
			}
		}

		if (query.newTab != null) {
			const newTabValue = query.newTab.toLowerCase().trim() === "true";
			openInNewTab.value = newTabValue;
		}

		if (query.query != null) {
			openInNewTab.value = false;
			searchText.value = query.query;
			search();
		}

		pageLoaded.value = true;
	});

	window.addEventListener("resize", () => {
		if (window.innerWidth < 640) {
			textRowCount.value = 5;
		} else {
			textRowCount.value = 4;
		}
	});
</script>

<template>
	<div class="flex w-full min-w-80 max-w-[800px] flex-col gap-6">
		<h1 class="text-center text-4xl font-bold">Better Search</h1>
		<div class="relative w-full items-center">
			<div class="search-box | relative h-fit w-full rounded-md bg-white p-1 dark:bg-background">
				<div class="absolute -inset-1 -z-10 rounded-lg bg-gradient-to-br from-blue-500 to-fuchsia-500" />

				<Textarea
					v-focus
					v-model="searchText"
					:rows="textRowCount"
					placeholder="Type your search query here"
					class="text-md h-fit max-h-40 min-h-12 resize-none border-none bg-transparent focus-visible:ring-inset focus-visible:ring-transparent"
					@keydown="textAreaKeyDown" />

				<div class="flex flex-col justify-between gap-2 py-2 sm:flex-row sm:items-center sm:py-0">
					<Select
						v-model="searchEngine"
						class="">
						<SelectTrigger class="w-auto border-none bg-transparent focus:ring-inset focus:ring-transparent">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Seach Engines</SelectLabel>
								<SelectItem
									v-for="options in searchEngines"
									:key="options.id"
									:value="options.id">
									<div class="flex items-center gap-2"><IconSearchBase :icon="options.engine" /> {{ options.name }}</div>
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<div class="flex items-center gap-3 px-3">
						<Switch
							id="new-tab"
							v-model:checked="openInNewTab"
							@update:checked="openInNewTabUpdated" />
						<Label for="new-tab">Open in new tab</Label>
					</div>
				</div>
			</div>
		</div>
		<Button
			class="font-semibold"
			@mousedown.native="search"
			>Search</Button
		>
	</div>
</template>
