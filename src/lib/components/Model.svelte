<script lang="ts">
	export let id = Math.random().toString(36).substring(2);

	export let checked = false;
	let loaded = false;
	$: {
		if (checked) {
			loaded = true;
		}
	}

	const dummy = `dummy-guard-${Math.random().toString(36).substring(2)}`;
</script>

<label class="contents" for="model-x-{id}" {...$$props}>
	<slot name="button" />
</label>

<input type="checkbox" id="model-x-{id}" bind:checked class="modal-toggle" />
<label for="model-x-{id}" class="modal cursor-pointer p-4">
	<label class="modal-box relative w-full max-w-5xl" for={dummy}>
		{#if checked || loaded}
			<slot name="body" />
		{/if}
	</label>
</label>
