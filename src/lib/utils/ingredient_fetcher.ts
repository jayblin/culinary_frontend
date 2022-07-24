import type { Writable } from "svelte/store";

let idsMap = new Map<string, (string|number)[]>();

let timeoutIdsMap = new Map<string, number|null>();
// let timeoutId: number|null = null;

const _dummymap = (new Map())
	.set("api/ingredients", (new Map())
		.set(
			"10",
			{
				id: "10",
				title: "Картошка",
			}
		)
		.set(
			"12",
			{
				id: "12",
				title: "Бульон",
				recipe: "44",
			}
		)
		.set(
			"1",
			{
				id: "1",
				title: "Соль",
			}
		)
		.set(
			"5",
			{
				id: "5",
				title: "Мука пшеничная",
			}
		)
		.set(
			"7",
			{
				id: "7",
				title: "Молоко коровье",
			}
		)
	)
;

export function queue<T extends {id: string|number}>(
	id: T["id"],
	route: string,
	store: Writable<Map<T["id"], T>>,
) {
	let tid = timeoutIdsMap.get(route);

	if (tid) {
		clearTimeout(tid);
	}

	const ids = (() => {
		if (!idsMap.has(route)) {
			idsMap.set(route, []);
		}

		return idsMap.get(route) as NonNullable<(T["id"])[]>;
	})();

	ids.push(id);

	tid = setTimeout(async () => {
		if (!(ids.length > 0)) {
			return;
		}

		const url = new URL(`http://localhost/${route}`);
		url.searchParams.set(
			"ids",
			JSON.stringify(ids.map(id => Number(id)))
		);

		idsMap.set(route, []);

		// const response: {data?: T[]} = await (await fetch(url.toString())).json();
		const response: {data?: T[]} = {data: Array.from(_dummymap.get(route).values())};

		if (response.data) {
			store.update((map) => {
				for (const item of response.data ?? []) {
					if (!map.has(item.id)) {
						map.set(item.id, item);
					}
				}

				return map;
			});
		}
	}, 300) as unknown as number;

	timeoutIdsMap.set(route, tid);
}

