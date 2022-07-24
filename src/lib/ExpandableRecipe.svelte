<script lang="ts">
	import Recipe from "./Recipe.svelte";
	import { ingredients, recipes } from "../store";

	export let id: RecipeObject["id"];

	const recipe = $recipes.get(id);
	const ingredient = $rec$ingredients.

	let isShown = false;
</script>


<div>
	<button
		class="px-1 flex flex-row items-center"
		on:click={() => {isShown = !isShown}}
	>+</button>
	{#if isShown}
		<Recipe id={id} />
	{/if}
</div>
