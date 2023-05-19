<script>
	import signOut from "$lib/auth/signOut";
    import Header from "$lib/components/Header.svelte";
	import { dislikePaste, likePaste } from "$lib/paste/reactPaste";
    import { redirect } from "@sveltejs/kit";

    /** @type {import('./$types').PageData} */
    export let data;

    let pastes = data.props.pastes;

</script>

<Header>
	<a href="/">Paste-Bob</a>
	<a href="/profile" on:click={() => window.location.href = '/profile'}>Profile</a>
</Header>
<main class="p-5">
    <div style="display:flex;justify-content:space-between;align-items:center;" >
        <h1 class="text-2xl text-orange-500">Welcome to Paste-Bob</h1>
    </div>
    
    <div>
        List of top 10 pastes here
    </div>

    <div class="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2">

        {#each pastes as paste}

            <!-- paste card -->
            <div class="bg-white border-2 border-gray-200 rounded-lg p-4">
                
                <div class="flex justify-between items-center">
                  <a href={`/paste/${paste._id}`}>
                    <h3 class="text-xl font-medium text-gray-600">{paste.authorName}</h3>
                  </a>
                  <span class="text-sm font-medium text-gray-400">{new Date(paste.createdAt).toLocaleString()}</span>
                </div>

                <p class="text-gray-500 mt-2">
                  {paste.content.length > 100 ? `${paste.content.substring(0, 100)}...` : paste.content}
                </p>
            </div>
            
        {/each}
        
    </div>

    <a href="/newpaste" class="fixed right-4 bottom-4 bg-orange-500 text-white px-4 py-2 rounded-full">Paste something</a>
</main>