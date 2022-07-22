<script lang="ts">
import { goto } from "$app/navigation";

import ServiceEditor from "$lib/comp/ServiceEditor.svelte";
  import { newServerDescription, newService, type ServerDescription, type Service } from "$lib/types";

  let service = newService();

</script>
<main>
  <ServiceEditor bind:service onSave={() => {goto('/')}}/>
</main>


<style>
</style>
