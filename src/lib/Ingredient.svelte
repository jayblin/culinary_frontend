<script lang="ts">
	import Recipe from "./Recipe.svelte";

	export let id: IngredientObject["id"];

	const ingredients = new Map<IngredientObject["id"], IngredientObject>();
	ingredients
		.set(
			"10",
			{
				id: "10",
				title: "Картошка",
			}
		)
		.set(
			"12",
			{
				id: "12",
				title: "Бульон",
				recipe: "44",
			}
		)
		.set(
			"1",
			{
				id: "1",
				title: "Соль",
			}
		)
		.set(
			"5",
			{
				id: "5",
				title: "Мука пшеничная",
			}
		)
		.set(
			"7",
			{
				id: "7",
				title: "Молоко коровье",
			}
		)
	;

	const item = ingredients.get(id);
	const bg = "bg-emerald-50";

	let showRecipe = false;
</script>

<article class="grid text-lg">
	{#if item}
		{#if item.recipe}
			<button
				class="rounded border {bg} hover:bg-emerald-200 w-fit"
				on:click={() => showRecipe = !showRecipe}
			>
				{item.title}
			</button>
			{#if showRecipe}
				<Recipe id={item.recipe} bg={bg} />
			{/if}
		{:else}
			<span>{item.title}</span>
		{/if}
	{:else}
		Ой, нет ингредиента с id "{id}".
	{/if}
</article>
