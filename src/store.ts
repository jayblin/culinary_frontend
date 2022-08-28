const _foods = new Map<FoodObject["id"], FoodObject>();

const _get: <T>(url: URL) => Promise<{data?: T; errors?: string[]}> = async (url) => {
	return {
		data: [
			{
				id: 10,
				title: "Борщ",
				ingredients_ids: [12, 23, 44],
			},
		] as FoodObject[] as any,
	};
	/* return ( */
	/* 	await fetch(url.toString()) */
	/* ).json(); */
};


const fetchRecipes = async (
	pageNumber: number|string = 1,
): Promise<RecipeObject[] | undefined> => {
	return new Promise((res, rej) => {
		setTimeout(
			() => {
				res([
					{
						id: 9,
						title: "Bread",
						ingredients_ids: [1,2,4,5,6,7],
					},
					{
						id: 8,
						title: "Chicken Stock",
						ingredients_ids: [6,11,1],
					},
					{
						id: 10,
						title: "Borsch",
						ingredients_ids: [1,3,6,8],
					},
				]);
			},
			1000
		);
	});
	// const url = new URL("http://localhost/api/recipes");
	// url.searchParams.set("page", pageNumber.toString());

	// const response = await _get<RecipeObject[]>(url);
	
	// if (response.errors) {
	// 	console.error(response.errors);
	// }

	// return response.data;
};

const fetchFoods = async(
	ids?: (FoodObject["id"])[]
): Promise<FoodObject[] | undefined> => {
	return new Promise((res, rej) => {
		setTimeout(
			() => {
				res([
					{
						id: 1,
						title: "Salt",
						ingredients_ids: [],
					},
					{
						id: 2,
						title: "Sugar",
						ingredients_ids: [],
					},
					{
						id: 4,
						title: "Yeast",
						ingredients_ids: [],
					},
					{
						id: 6,
						title: "Water",
						ingredients_ids: [],
					},
					{
						id: 11,
						title: "Chicken",
						ingredients_ids: [],
					},
					{
						id: 3,
						title: "Tomato",
						ingredients_ids: [],
					},
					{
						id: 5,
						title: "Flower",
						ingredients_ids: [],
					},
					{
						id: 7,
						title: "Egg",
						ingredients_ids: [],
					},
				]);
			},
			1000
		);
	});

	// const url = new URL("http://localhost/api/foods");

	// if (ids && ids.length) {
	// 	url.searchParams.set("ids", ids.join(','));
	// }

	// const response = await _get<FoodObject[]>(url);
	
	// if (response.errors) {
	// 	console.error(response.errors);
	// }

	// return response.data;
}

function createFoods() {
	const recipes = new Map<
		number, // page number
		(FoodObject["id"])[] // list of recipe ids
	>();
	let _timerId: any|null = null;
	let idQueue: (FoodObject["id"])[] = [];
	let resolveQueue: {
		resolves: ((value: FoodObject | PromiseLike<FoodObject | undefined> | undefined) => void)[];
		id: FoodObject["id"];
	}[] = [];

	async function queue(
			id: Readonly<FoodObject["id"]>,
			resolve: (value: FoodObject | PromiseLike<FoodObject | undefined> | undefined) => void
		) {
			const resolveEntry = resolveQueue.find(e => id === e.id);

			if (resolveEntry) {
				resolveEntry.resolves.push(resolve);
			}
			else {
				resolveQueue.push({
					id: id,
					resolves: [resolve],
				});
			}

			if (idQueue.includes(id)) { return; }

			idQueue.push(id);

			if (_timerId !== null) {
				clearTimeout(_timerId);
				_timerId = null;
			}

			_timerId = setTimeout(
				async () => {
					if (!(idQueue.length > 0)) {
						return;
					}

					console.log('fetching', idQueue);
					const list = await fetchFoods(idQueue);

					if (!list) {
						return;
					}

					for (const food of list) {
						if (_foods.has(food.id)) { continue; }

						_foods.set(food.id, food);
					}

					for (const entry of resolveQueue) {
						const food = _foods.get(entry.id);
						
						for (const _resolve of entry.resolves) {
							_resolve(food);
						}
					}

					idQueue = [];
					resolveQueue = [];
				},
				300
			);
		};

	return {
		get: async function (id: FoodObject["id"]): Promise<FoodObject|undefined> {
			return new Promise((res, rej) => {
				const result = _foods.get(id);

				if (result) {
					res(result);
					return;
				}

				queue(id, res);
			});
		},
		getRecipesIds: async function(pageNumber: number): Promise<(FoodObject["id"])[] | undefined> {
			let ids = recipes.get(pageNumber);

			if (ids) {
				return ids;
			}

			const list = await fetchRecipes();

			if (!list) {
				return [];
			}
			
			const result: (FoodObject["id"])[] = [];

			for (const item of list) {
				if (!recipes.has(item.id)) {
					result.push(item.id);
				}
				if (!_foods.has(item.id)) {
					_foods.set(item.id, item);
				}
			}

			return result;
		},
	};
}

export const foods = createFoods();
