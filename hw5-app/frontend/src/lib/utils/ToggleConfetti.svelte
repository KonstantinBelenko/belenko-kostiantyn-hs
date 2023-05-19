<script>
    import { tick } from 'svelte'
  
    export let toggleOnce = false
    export let relative = true
  
    let active = false
  
    async function click() {
      if (toggleOnce) {
        active = !active
        return
      }
  
      active = false
      await tick();
      active = true
    }
</script>
  