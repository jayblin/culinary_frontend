<script lang="ts">
	import { page } from "$app/stores";
	import { recipes } from "../../../store";


	const item = $recipes.get($page.params["id"]);
	const title = item?.title ?? "404";
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<h1 class="text-5xl">{title}</h1>

{#if item}
	<article class="mt-4">
		Что-то про рецепт "{item.title}"
	</article>
{/if}
