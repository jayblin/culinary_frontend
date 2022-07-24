import { writable } from "svelte/store";


const _recipes = new Map<RecipeObject["id"], RecipeObject>()
	.set(
		"1",
		{
			id: "1",
			title: "Борщ",
			ingredients: ["10", "12"],
		}
	)
	.set(
		"2",
		{
			id: "2",
			title: "Блины",
			ingredients: ["1", "5", "7"],
		}
	)
	.set(
		"44",
		{
			id: "44",
			title: "Бульон",
			ingredients: ["1"],
		}
	)
;

const _ingredients = new Map<IngredientObject["id"], IngredientObject>();

export const recipes = writable(_recipes);
export const ingredients = writable(_ingredients);
