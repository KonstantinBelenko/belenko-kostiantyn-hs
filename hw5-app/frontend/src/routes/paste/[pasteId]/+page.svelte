<script>

	import CopyToClipboard from "$lib/components/CopyToClipboard.svelte";
    import Header from "$lib/components/Header.svelte";
    import Confetti from "svelte-confetti";

    /** @type {import('./$types').PageData} */
    export let data;
    let paste = data.props.paste;
    /**
	 * @type {any[]}
	 */
    let confettis = [];

    let id = 0;

    function copyPaste() {
        confettis = [...confettis, id++];
        setTimeout(() => {
            confettis = confettis.filter((c) => c !== id - 1);
        }, 2000);

        // copy to clipboard
        const app = new CopyToClipboard({
			// @ts-ignore
			target: document.getElementById('clipboard'),
			props: { name: paste.content },
		});
		app.$destroy();
    }
</script>

<Header>
    <a href="/">Paste-Bob</a>
    <a href="/profile" on:click={() => window.location.href = '/profile'}>Profile</a>
</Header>
<main class="p-5">
    <header class="flex justify-between items-center">
        <div>
            <h1 class="text-2xl text-orange-500">{paste.authorName}</h1>
            <button on:click={copyPaste} class="text-md text-gray-600">Copy that</button>
            {#each confettis as confetti (confetti)}
                <Confetti x={[0.25, 1]} y={[0, 0.5]} />
            {/each}
        </div>
        <span class="text-sm font-medium text-gray-400">{new Date(paste.createdAt).toLocaleString()}</span>
    </header>
  
    <div class="mt-5">
      <p id='clipboard' class="text-gray-500">{paste.content}</p>
    </div>

</main>
