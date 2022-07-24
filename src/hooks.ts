import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ resolve, event }) => {
	return resolve(event, { ssr: false });
}
