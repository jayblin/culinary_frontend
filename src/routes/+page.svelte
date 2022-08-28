<script lang="ts">
	import RecipeList from "../lib/RecipeList.svelte";
	import { page } from "$app/stores";
	import {
		foods
	} from "../store";
	
	const { url: { searchParams } } = $page;
</script>

<svelte:head>
	<title>Список рецептов</title>
</svelte:head>

<RecipeList page={Number(searchParams.get("page") ?? "1")} />
