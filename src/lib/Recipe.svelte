<script lang="ts">
	import Ingredient from "./Ingredient.svelte"
	import { recipes } from "../store";

	export let id: RecipeObject["id"];
	export let bg: string = "bg-sky-50";

	const item = $recipes.get(id);

	let isPreparing = false;
</script>

<article class="p-1 rounded border {bg} flex flex-row flex-wrap">
	{#if item}
		<h2 class="rounded text-2xl grow">
			{item.title}
		</h2>
		<a href="/recipes/{id}" class="mr-2 flex place-items-center hover:text-teal-600">
			<span>Ссылка</span>
		</a>
		<button
			class="bg-red-200 px-1 rounded"
			on:click={() => isPreparing = !isPreparing}
		>
			{#if !isPreparing}
				Готовить
			{:else}
				Закончить
			{/if}
		</button>
		<ul class="grow grid gap-1 mt-2 basis-full">
			{#each item.ingredients as iid}
				<li class="flex items-center">
					{#if isPreparing}
						<input type="checkbox" id="ing-{id}-{iid}" class="mr-1" />
					{/if}
					<label for="ing-{id}-{iid}" class="grow">
						<Ingredient id={iid} />
					</label>
				</li>
			{/each}
		</ul>
	{:else}
		Ой, нет информации о рецепте с id "{id}".
	{/if}
</article>
