<script lang="ts">
	export let progress: number;
</script>

<div class="h-2 w-full rounded bg-base-content/30">
	<div
		class="h-full rounded transition-all duration-300"
		class:bg-success={progress < 30}
		class:bg-warning={progress >= 30 && progress < 80}
		class:bg-error={progress >= 80}
		style="width: {progress}%"
	></div>
</div>
