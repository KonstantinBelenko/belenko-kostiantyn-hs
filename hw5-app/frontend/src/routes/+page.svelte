<script>
	import signOut from "$lib/auth/signOut";
    import { redirect } from "@sveltejs/kit";

    async function handleSignOut() {
        try {
            await signOut();
            window.location.href = '/login';
        } catch (error) {
            console.error('Sign-out failed:', error);
        }
    }

</script>

<main style="padding:20px;">
    <header style="display:flex;justify-content:space-between;align-items:center;" >
        <h1>Welcome to Paste-Bob</h1>
        <button style="cursor:pointer;" on:click={handleSignOut}>Sign Out</button>
    </header>
    
    <div>
        List of top 10 pastes here
    </div>

</main>