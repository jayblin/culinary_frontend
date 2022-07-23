<script lang="ts">
	import Ingredient from "./Ingredient.svelte"
	import { recipes } from "../store";

	export let id: RecipeObject["id"];
	export let bg: string = "bg-sky-50";

	const item = $recipes.get(id);
</script>


<article class="p-1 rounded border {bg}">
	{#if item}
		<a href="/recipes/{item.id}" class="block w-fit">
			<h2 class="rounded text-2xl w-fit px-1 hover:bg-sky-200">
				{item.title}
			</h2>
		</a>
		<ul>
			{#each item.ingredients as id}
				<li class="px-1"><Ingredient id={id} /></li>
			{/each}
		</ul>
	{:else}
		Ой, нет рецепта с id "{id}".
	{/if}
</article>
