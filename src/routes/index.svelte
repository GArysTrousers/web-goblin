<script lang="ts">
  import { api } from "$lib/fetch";
  import { newServer, type Server, type ServerDescription } from "$lib/types";

  import { onMount } from "svelte";

  let servers: Server[] = [];

  onMount(async () => {
    let res = await api("/api/server/get_servers");
    if (res.ok) {
      servers = res.data.map((i) => newServer(i));
      let statuses = await api("/api/server/get_server_statuses", {
        servers: res.data.map((i) => i.id),
      });
      servers = servers.map(server => {
        return {
          ...server,
          status: statuses.data[server.desc.id]
        }
      })
    }
  });

  function getStatus(id: string) {
    return "Hey";
  }
</script>

<main>
  {#each servers as server}
    <div class="card border-shadow col max-w-xl m-5 p-5 rounded-3xl gap-2">
      <div class="row justify-between">
        <div class="text-xl">
          {server.desc.id} - {server.status}
        </div>
        <div class="row my-auto gap-1">
          <button class="btn">
            Start
            <div class="icon">play_arrow</div>
          </button>
          <button class="btn">
            Stop
            <div class="icon">stop</div>
          </button>
          <a href={`/server/${server.desc.id}`} class="btn">
            Go
            <div class="icon">arrow_forward</div>
          </a>
        </div>
      </div>
    </div>
  {/each}
</main>

<style>
</style>
