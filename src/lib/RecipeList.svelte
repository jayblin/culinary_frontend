<script lang="ts">
	/* import { page } from "$app/stores"; */
	/* import { recipes } from "../store"; */
	import Recipe from "./Recipe.svelte";

	const idsPromise = (async () => {
		/* const { url: { searchParams } } = $page; */
		/* const pageNumber = searchParams.get("page") ?? "1"; */

		// @todo: fetch recipes and put into store.
		/* const url = new URL("http://localhost/api/recipes"); */
		/* url.searchParams.set("page", pageNumber); */
		/* const response: {data?: RecipeObject[]} = await (await fetch(url.toString())).json(); */
		/* if (response?.data) { */
		/* 	recipes.update((map) => { */
		/* 		for (const recipe of response.data ?? []) { */
		/* 			if (!map.has(recipe.id)) { */
		/* 				map.set(recipe.id, recipe); */
		/* 			} */
		/* 		} */

		/* 		return map; */
		/* 	}); */
		/* } */

		return ["1", "2"];
	})();
</script>

{#await idsPromise}
	...
{:then ids}
	<ul class="rounded border grid gap-y-2">
		{#each ids as id}
			<li class="grid">
				<Recipe id={id} />
			</li>
		{/each}
	</ul>
{:catch error}
	{error}
{/await}
