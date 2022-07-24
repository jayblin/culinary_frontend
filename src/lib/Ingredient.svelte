<script lang="ts">
	import { onDestroy } from "svelte";
	import Recipe from "./Recipe.svelte";
	import { ingredients } from "../store";
	import { queue } from "./utils/ingredient_fetcher";

	export let id: IngredientObject["id"];
	export let bg = "bg-emerald-200";

	let showRecipe = false;

	let item: IngredientObject | undefined | null;

	const unsub = ingredients.subscribe(value => {
		item = value.get(id);
	});

	if (!item) {
		queue(id, "api/ingredients", ingredients);
	}

	onDestroy(unsub);
</script>

<article class="rounded {bg} flex flex-wrap">
	{#if item}
		{#if item.recipe}
			{#if !showRecipe}
				<span class="flex-1">{item.title}</span>
			{/if}
			<button
				class="bg-red-200 flex-1"
				on:click={() => showRecipe = !showRecipe}
			>
				{#if showRecipe}
					Закрыть
				{:else}
					Раскрыть
				{/if}
			</button>
			{#if showRecipe}
				<div class="basis-full">
					<Recipe id={item.recipe} bg={bg} />
				</div>
			{/if}
		{:else}
			<span>{item.title}</span>
		{/if}
	{:else}
		<span>...</span>
	{/if}
</article>
