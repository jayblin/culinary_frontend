<script lang="ts">
	import Recipe from "./Recipe.svelte";

	export let id: IngredientObject["id"];

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
