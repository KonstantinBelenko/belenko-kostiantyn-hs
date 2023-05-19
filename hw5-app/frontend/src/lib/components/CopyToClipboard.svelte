<script>
	import { onMount } from 'svelte';
	
	/**
	 * @type {any}
	 */
	 export let name;

	/**
	 * @type {any}
	 */
	let textarea;
	
	onMount(() => {
		textarea.select();
		document.execCommand('copy');
	});
</script>

<textarea bind:value={name} bind:this={textarea}></textarea>
