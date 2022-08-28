<script lang="ts">

import { foods } from "../store";
import IngredientList from "./IngredientList.svelte";
import Skeleton from "./Skeleton.svelte";

export let id: FoodObject["id"];
export let bg: string = "bg-sky-50";
export let classes: string = "";
export let showIngredients: boolean = true;

const food = foods.get(id);

</script>

<article class="p-1 rounded border {bg} flex flex-row flex-wrap {classes}">
	{#await food}
		<Skeleton height="100px" />
	{:then food}
		{#if food}
			<h2 class="rounded text-2xl grow">
				{food.title}
			</h2>
			{#if showIngredients}
				<IngredientList food={food} />
			{/if}
		{:else}
			:(
		{/if}
	{/await}
</article>
