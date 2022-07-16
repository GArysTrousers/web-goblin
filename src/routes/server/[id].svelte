<script context="module">
  export async function load({ params }) {
    return {
      props: {
        serverId: params.id,
      },
    };
  }
</script>

<script lang="ts">
  import ServerEditor from "$lib/comp/ServerEditor.svelte";
  import Terminal from "$lib/comp/Terminal.svelte";
  import { api } from "$lib/fetch";
  import { newServer, type Server, type ServerDescription } from "$lib/types";
  import { onMount } from "svelte";

  export let serverId: string;

  let server: Server = newServer();

  onMount(async () => {
    let res = await api<ServerDescription>("/api/server/get_server", {
      id: serverId,
    });
    if (res.ok) server.desc = res.data;
  });
</script>

<main>
  <div class="col gap-5">
    <Terminal label={server.desc.name} id={server.desc.id} />

    <ServerEditor server={server.desc} />
  </div>
</main>

<style>
</style>
