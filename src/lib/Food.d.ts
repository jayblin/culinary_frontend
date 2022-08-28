declare type FoodObject = {
	id: number;
	title: string;
	ingredients_ids: (FoodObject["id"])[];
};
