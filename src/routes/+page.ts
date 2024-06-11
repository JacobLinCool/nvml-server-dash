import { endpoints } from "$lib/store";
import { get } from "svelte/store";
import type { PageLoad } from "./$types";

export const prerender = true;
export const ssr = false;

export const load: PageLoad = async ({ url }) => {
	let endpoint = url.searchParams.get("endpoint") || "";

	try {
		new URL(endpoint);
	} catch {
		endpoint = "";
	}

	const store = get(endpoints);
	console.log("endpoints", store);

	if (endpoint && is_new_endpoint(endpoint)) {
		endpoints.update((endpoints) => {
			const name = new URL(endpoint).hostname;
			endpoints[name] = endpoint;
			return endpoints;
		});
	}

	return { endpoint };
};

function is_new_endpoint(endpoint: string) {
	return !Object.values(get(endpoints)).includes(endpoint);
}
