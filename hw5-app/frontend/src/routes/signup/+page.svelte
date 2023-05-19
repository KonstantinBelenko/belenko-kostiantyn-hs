<script>

    import { onMount } from 'svelte';
    import signUp from "$lib/auth/signUp";
    import validateSignUp from '$lib/validation/validateSignUp';

    let email = '';
    let name = '';
    let password = '';
    let confirmPassword = '';
    let error = '';

    const handleSubmit = async () => {
        error = validateSignUp(email, name, password, confirmPassword);
        if (error) {
            return;
        }

        try {
            const success = await signUp(email, password, name);
            if (success) {
              window.location.href = '/';
            }
        } catch (/** @type {any} */ e) {
          error = e.message;
        }
    };


    onMount(() => {
        email = '';
        name = '';
        password = '';
        confirmPassword = '';
    });

</script>

<div class="flex justify-center items-center w-screen h-screen flex-col">
  <div style="border:black 1px solid; padding:20px;">
    
    <h1 class="text-2xl mb-4">Sign Up</h1>
  
    {#if error}
      <p style="color:red;">{error}</p>
    {/if}
  
    <form on:submit|preventDefault={handleSubmit} class="flex flex-col">
      <label>
        Email
        <input class="border-orange-100 border-y-2 w-full outline-none" type="email" bind:value={email} />
      </label>
  
      <br />
  
      <label>
        Name
        <input class="border-orange-100 border-y-2 w-full outline-none" type="text" bind:value={name} />
      </label>

      <br />

      <label>
        Password
        <input class="border-orange-100 border-y-2 w-full outline-none" type="password" bind:value={password} />
      </label>
  
      <br />

      <label>
        Confirm Password
        <input class="border-orange-100 border-y-2 w-full outline-none" type="password" bind:value={confirmPassword} />
      </label>

      <br />
  
      <button class="bg-orange-100 p-4 hover:animate-rainbow-color" type="submit">Create account</button>
    </form>

  </div>

  <br />

    <a href="/signin">Already have an account? <span class="text-orange-300">Log in</span></a>

  <br />

</div>
  