<script>
    import Header from "$lib/components/Header.svelte";
    import signOut from "$lib/auth/signOut";

    /** @type {import('./$types').PageData} */
    export let data;

    let username = data.props.userInfo.user.username;
    let email = data.props.userInfo.user.email;

    function handleLogOut() {
        const confirmation = confirm('Are you sure you want to log out?');

        if (confirmation) {
            try{
                signOut();
                window.location.href = '/';
            } catch (/** @type {any} */ e) {
                console.log(e);
            }
        }
    }
</script>

<Header>
	<a target="_self" href="/">Paste-Bob</a>
</Header>

<main class="p-5 flex flex-col gap-5">
    
    <div>
        <h1 class="text-2xl text-orange-500">✨ This is your profile page</h1>
        <br />
        Your name is: <span class="text-orange-500">{username}</span> and your emails is: <span class="text-orange-500">{email}</span>
    </div>

    <div>
        <button class="bg-red-500 px-4 py-2 text-white" on:click={handleLogOut}>Get out</button>
    </div>

</main>