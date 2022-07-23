<script lang="ts">
  import { startService, stopService } from "$lib/client-controls";
  import { api } from "$lib/fetch";
  import type { Service } from "$lib/types";

  export let service: Service;
</script>

<div class="card glow-orange col my-5 p-5 rounded-3xl gap-2">
  <div class="row justify-between">
    <div class="text-xl">
      {service.name} - {service.status}
    </div>
    <div class="row my-auto gap-1">
      <button class="btn" on:click={() => startService(service.id)}>
        Start
        <div class="icon">play_arrow</div>
      </button>
      <button class="btn" on:click={() => stopService(service.id)}>
        Stop
        <div class="icon">stop</div>
      </button>
      <a href={`/service/${service.id}`} class="btn">
        Go
        <div class="icon">arrow_forward</div>
      </a>
    </div>
  </div>
</div>

<style>
</style>
