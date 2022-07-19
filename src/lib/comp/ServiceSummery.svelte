<script lang="ts">
  import { api } from "$lib/fetch";
  import type { Service } from "$lib/types";

  export let service: Service;

  async function startService() {
    let res = await api("/api/service/start", { id: service.id });
  }

  async function stopService() {
    let res = await api("/api/service/stop", { id: service.id });
  }
</script>

<div class="card glow-orange col max-w-xl my-5 p-5 rounded-3xl gap-2">
  <div class="row justify-between">
    <div class="text-xl">
      {service.name} - {service.status}
    </div>
    <div class="row my-auto gap-1">
      <button class="btn" on:click={() => startService()}>
        Start
        <div class="icon">play_arrow</div>
      </button>
      <button class="btn" on:click={() => stopService()}>
        Stop
        <div class="icon">stop</div>
      </button>
      <a href={`/service/${"server.desc.id"}`} class="btn">
        Go
        <div class="icon">arrow_forward</div>
      </a>
    </div>
  </div>
</div>

<style>
</style>
