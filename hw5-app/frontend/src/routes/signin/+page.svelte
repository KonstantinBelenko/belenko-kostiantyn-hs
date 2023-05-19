<script>

    import { onMount } from 'svelte';
    import signIn from "$lib/auth/signIn";
	  import validateSignIn from '$lib/validation/validateSignIn';

    let email = '';
    let password = '';
    let error = '';

    const handleSubmit = async () => {
        error = validateSignIn(email, password);
        if (error) {
            return;
        }

        try {
            const success = await signIn(email, password);
            if (success) {
              window.location.href = '/';
            }
        } catch (/** @type {any} */ e) {
          error = e.message;
        }
    };


    onMount(() => {
        email = '';
        password = '';
    });

</script>

<div style="width:100vw; height:100vh; display:flex; justify-content:center; align-items:center; flex-direction:column; overflow:hidden;">
  <div style="border:black 1px solid; padding:20px;">
    <h1 class="text-2xl mb-4">Sign In</h1>
  
    {#if error}
      <p style="color:red;">{error}</p>
    {/if}
  
    <form on:submit|preventDefault={handleSubmit} style="display: flex; flex-direction:column; flex-gap: 10px; width:100%;">
      <label>
        Email:
        <input class="border-orange-100 border-y-2 w-full outline-none" type="email" bind:value={email} />
      </label>
  
      <br />
  
      <label>
        Password:
        <input class="border-orange-100 border-y-2 w-full outline-none" type="password" bind:value={password} />
      </label>
  
      <br />
  
      <button class="bg-orange-100 p-4 hover:animate-rainbow-color" style="width: 100%;" type="submit">Sign In</button>
    </form>
  </div>

  <br />

    <a href="/signup">Don't have an account? <span class="text-orange-300">Sign up</span></a>

  <br />

  </div>
  