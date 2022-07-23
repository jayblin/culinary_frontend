declare type IngredientObject = {
	id: string;
	title: string;
	recipe?: RecipeObject["id"]|null;
};
