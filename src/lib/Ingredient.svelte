<script lang="ts">

import { foods } from "../store";
import Food from "./Food.svelte";
import Skeleton from "./Skeleton.svelte";

export let id: FoodObject["id"];
export let bg = "bg-emerald-200";

const food = foods.get(id);
let showRecipe = false;

</script>

<article class="rounded {bg} flex flex-wrap relative">
	{#await food}
		<Skeleton height="24px" relative />
	{:then food}
		{#if food}
			{#if food.ingredients_ids.length > 0}
				{#if !showRecipe}
					<span class="flex-1">{food.title}</span>
				{:else}
					<Food id={id} classes="flex-1" />
				{/if}
				<button
					class="bg-red-200 px-3"
					on:click={() => showRecipe = !showRecipe}
				>
					{#if showRecipe}
						Закрыть
					{:else}
						Раскрыть
					{/if}
				</button>
			{:else}
				<span>{food.title}</span>
			{/if}
		{:else}
			:(
		{/if}
	{/await}
</article>
