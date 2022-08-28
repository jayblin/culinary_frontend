<script lang="ts">
	import Ingredient from "./Ingredient.svelte";

	export let food: FoodObject;

	let isPreparing = false;
</script>

{#if food.ingredients_ids.length > 0}
	<ul class="grow grid gap-1 mt-2 basis-full">
		{#each food.ingredients_ids as id}
			<li class="flex items-center">
				{#if isPreparing}
					<input type="checkbox" id="ing-{food.id}-{id}" class="mr-1" />
				{/if}
				<label for="ing-{food.id}-{id}" class="grow">
					<Ingredient id={id} />
				</label>
			</li>
		{/each}
	</ul>
{/if}
