<script lang="ts">
import { foods } from "../store";
import Food from "./Food.svelte";
import Skeleton from "./Skeleton.svelte";

export let page: number;
const ids = foods.getRecipesIds(page);
</script>

<div class="relative">
	{#await ids}
		<Skeleton height="400px" />
	{:then ids}
		{#if ids}
			<ul class="rounded border grid gap-y-2">
				{#each ids as id}
					<li class="grid">
						<Food id={id} />
					</li>
				{/each}
			</ul>
		{:else}
			<span>Пусто</span>
		{/if}
	{/await}
</div>
