<script context="module">
  export async function load({ params }) {
    return {
      props: {
        serviceId: params.id,
      },
    };
  }
</script>

<script lang="ts">
  import ServerEditor from "$lib/comp/ServerEditor.svelte";
import ServiceEditor from "$lib/comp/ServiceEditor.svelte";
  import Terminal from "$lib/comp/Terminal.svelte";
  import { api } from "$lib/fetch";
  import { newServer, newService, type Server, type ServerDescription } from "$lib/types";
  import { onMount } from "svelte";

  export let serviceId: string;

  let service = newService();

  onMount(async () => {
    let res = await api<Service>("/api/service/get_one", {
      id: serviceId,
    });
    if (res.ok) service = res.data;
  });
</script>

<main>
  <div class="col gap-5">
    <ServiceEditor bind:service={service} />
  </div>
</main>

<style>
</style>
