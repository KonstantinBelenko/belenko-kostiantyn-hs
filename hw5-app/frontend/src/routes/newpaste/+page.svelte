<script>
    import Header from "$lib/components/Header.svelte";
	import createPaste from '$lib/paste/createPaste.js'; // Import your API method

	let paste = {
		content: ''
	};

	let error = '';

	let isSubmitting = false;

	const handleSubmit = async () => {
		isSubmitting = true;
		try {
			await createPaste(paste.content);
			isSubmitting = false;
		} catch (/** @type {any}*/ err) {
			isSubmitting = false;
			console.error(err);
			error = err.message;
		}
	};
</script>

<Header>
	<a href="/">Paste-Bob</a>
	<a href="/profile" on:click={() => window.location.href = '/profile'}>Profile</a>
</Header>

<div class="p-5">

	<div style="display:flex;justify-content:space-between;align-items:center;" >
        <h1 class="text-2xl text-orange-500">📋 Create a new paste</h1>
    </div>
    
    <div>
        Just paste it dummy
    </div>

	{#if error}
		<div class="text-red-500">{error}</div>
	{/if}

	<form on:submit|preventDefault={handleSubmit}>

		<label for="content" class="block text-sm font-medium text-gray-700 mt-4">
		Paste Content
		</label>
		<textarea 
			id="content" 
			bind:value={paste.content}
			rows="20"
			class="mt-1 border-black border-[1px] p-5 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm rounded-md"
		/>

		<button 
			type="submit"
			class={`mt-4 bg-orange-500 text-white px-4 py-2 w-40 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
			disabled={isSubmitting}
			>
			Submit
		</button>
	</form>
</div>