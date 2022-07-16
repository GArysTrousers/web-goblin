<script lang="ts">
import { goto } from "$app/navigation";

  import ServerEditor from "$lib/comp/ServerEditor.svelte";
  import { newServerDescription, type ServerDescription } from "$lib/types";
import { onMount } from "svelte";

  let server: ServerDescription = newServerDescription();

</script>
<main>
  <ServerEditor bind:server onSave={() => {goto('/')}}/>
</main>


<style>
</style>
