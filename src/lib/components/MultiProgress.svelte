<script lang="ts">
	export let progress1: number;
	export let progress2: number;
</script>

<div class="h-2 w-full rounded bg-base-content/30 relative">
	<div
		class="absolute h-2 rounded bg-primary transition-all duration-300"
		style="width: {progress1}%"
	></div>
	<div
		class="absolute h-2 rounded bg-secondary transition-all duration-300"
		style="width: {progress2}%"
	></div>
</div>
