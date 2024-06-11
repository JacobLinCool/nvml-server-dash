<script lang="ts">
	import '../app.css';
	import { endpoints } from '$lib/store';
	import { base } from '$app/paths';
	import Model from '$lib/components/Model.svelte';
	import Endpoint from '$lib/components/Endpoint.svelte';

	let new_name = '';
	let new_endpoint = '';

	async function add() {
		if (new_name && new_endpoint) {
			endpoints.update((endpoints) => {
				endpoints[new_name] = new_endpoint;
				return endpoints;
			});
			new_name = '';
			new_endpoint = '';
		}
	}
</script>

<svelte:head>
	<title>NVML Dashboard</title>
</svelte:head>

<div class="flex h-full w-full flex-col gap-4 overflow-auto p-4">
	{#each Object.entries($endpoints) as [name, endpoint]}
		<Endpoint {name} {endpoint} />
	{/each}
	<Model>
		<div slot="button" class="btn btn-outline btn-primary">Add Endpoint</div>
		<div slot="body">
			<div class="form-control">
				<label class="label" for="">
					<span class="label-text">Name</span>
				</label>
				<input type="text" bind:value={new_name} class="input input-bordered" />

				<label class="label" for="">
					<span class="label-text">Endpoint</span>
				</label>
				<input type="text" bind:value={new_endpoint} class="input input-bordered" />

				<button class="btn btn-primary mt-4" on:click={add}>Add</button>
			</div>
		</div>
	</Model>
</div>
