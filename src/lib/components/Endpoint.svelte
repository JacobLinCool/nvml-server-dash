<script lang="ts">
	import type { EndpointResponse } from "$lib/types";
	import { onDestroy, onMount } from "svelte";
	import Progress from "./Progress.svelte";
	import { endpoints } from "$lib/store";
	import MultiProgress from "./MultiProgress.svelte";
	import { second2time } from "$lib/utils";

	export let endpoint: string;
	export let name = "";
	export let interval = 1000;

	let data: EndpointResponse;
	let error: string | null = null;
	let timer = 0;

	onMount(async () => {
		console.log(endpoint);
		await refresh();
	});

	onDestroy(() => {
		clearTimeout(timer);
	});

	async function refresh() {
		try {
			const url = new URL(endpoint);
			if (!name) {
				name = url.hostname;
			}

			const res = await fetch(endpoint);
			const json = await res.json();
			if ("error" in json) {
				throw new Error(json.error);
			}
			data = json;
			data.gpus.forEach((gpu) => {
				// gpu.utilization.gpu = Math.random() * 100;
				// gpu.utilization.memory = Math.random() * 100;
			});
		} catch (e) {
			if (e instanceof Error) {
				error = e.toString();
			}
		} finally {
			timer = setTimeout(refresh, interval);
		}
	}

	function toGB(bytes: number) {
		return +(bytes / 1024 / 1024 / 1024).toFixed(1);
	}

	async function remove() {
		endpoints.update((endpoints) => {
			for (const [key, value] of Object.entries(endpoints)) {
				if (value === endpoint) {
					delete endpoints[key];
					break;
				}
			}
			return endpoints;
		});
	}

	function uuid2name(uuid: string) {
		const idx = data.gpus.findIndex((g) => g.uuid === uuid);
		return idx === -1 ? "Unknown" : `${idx} - ${data.gpus[idx].name}`;
	}
</script>

<section
	class="group card card-bordered w-full p-4 shadow-xl"
	class:bg-base-100={!error}
	class:bg-error={error}
	class:text-error-content={error}
>
	<div class="card-title">
		<div>
			<h1>{name}</h1>
			<p class="line-clamp-1 text-sm opacity-50">{endpoint}</p>
		</div>
	</div>
	<div class="prose card-body w-full max-w-full">
		{#if error}
			<p class="text-error-content">{error}</p>
		{:else if data}
			<h3>Devices</h3>
			{#each data.gpus as gpu, i}
				<h4>{i} - {gpu.name}</h4>
				<div class="flex w-full items-center gap-4">
					<div class="w-48 font-mono">Computation: {gpu.utilization.gpu.toFixed(0)}%</div>
					<div class="flex-1">
						<Progress progress={gpu.utilization.gpu} />
					</div>
				</div>
				<div class="flex w-full items-center gap-4">
					<div class="w-48 font-mono">
						Memory: {toGB(gpu.memory.used)}G / {toGB(gpu.memory.total)}G
					</div>
					<div class="flex-1">
						<!-- <Progress progress={gpu.utilization.memory} /> -->
						<MultiProgress
							progress1={(gpu.memory.used / gpu.memory.total) * 100}
							progress2={gpu.utilization.memory}
						/>
					</div>
				</div>
			{/each}
			{#if data.processes.length}
				<hr />
				<h3>Processes</h3>
				{#each data.processes as process, i}
					<div class="prose w-full max-w-full">
						<h4 class="line-clamp-1 font-mono transition-all hover:line-clamp-none">
							({second2time(process.run_time)}) [{process.user}] {process.cmd.join(
								" ",
							)}
						</h4>
						<ul>
							{#each process.gpus as gpu, i}
								<li class="font-mono">
									{uuid2name(gpu.uuid)} - {toGB(gpu.memory)}G
								</li>
							{/each}
						</ul>
						<!-- <div class="w-full flex items-center gap-4">
							<div class="w-40">Computation: {process.toFixed(0)}%</div>
							<div class="flex-1">
								<Progress progress={gpu.utilization.gpu} />
							</div>
						</div>
						<div class="w-full flex items-center gap-4">
							<div class="w-40">Memory: {toGB(gpu.memory.used)}G / {toGB(gpu.memory.total)}G</div>
							<div class="flex-1">
								<Progress progress={gpu.utilization.memory} />
							</div>
						</div> -->
					</div>
				{/each}
			{/if}
		{/if}
	</div>
	<div class="card-actions justify-end">
		<button
			class="btn btn-outline btn-error btn-sm opacity-0 transition-all duration-300 group-hover:opacity-100"
			on:click={remove}>Remove</button
		>
	</div>
</section>
