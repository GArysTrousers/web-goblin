<script lang="ts">
  import { startServer, stopServer } from "$lib/client-controls";
  import type { Server } from "$lib/types";

  export let server: Server;
</script>

<div class="card glow-blue col my-5 p-5 rounded-3xl gap-2">
  <div class="row justify-between">
    <div class="text-xl">
      {server.desc.name} - {server.status}
    </div>
    <div class="row my-auto gap-1">
      <button class="btn" on:click={() => startServer(server.desc.id)}>
        Start
        <div class="icon">play_arrow</div>
      </button>
      <button class="btn" on:click={() => stopServer(server.desc.id)}>
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

<style>
</style>
