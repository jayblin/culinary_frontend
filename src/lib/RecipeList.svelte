<script lang="ts">
	import Recipe from "./Recipe.svelte";

	const ids = ["1", "2"];
</script>

<ul class="rounded border grid gap-y-2">
	{#each ids as id}
		<li class="grid">
			<Recipe id={id} />
		</li>
	{/each}
</ul>
