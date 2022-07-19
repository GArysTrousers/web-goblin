<script lang="ts">
  import { goto } from "$app/navigation";

  import { api } from "$lib/fetch";

  import type { ServerDescription } from "$lib/types";
  import { newServerDescription } from "$lib/types";
  import { onMount } from "svelte";

  export let server: ServerDescription = newServerDescription();
  export let onSave: any = () => {
    location.reload();
  };

  async function save() {
    let res = await api<{}>("/api/server/save", { server });
    if (res.ok) onSave();
  }
</script>

<div class="card glow-blue col max-w-xl gap-2">
  <div class="row justify-between">
    <h1>Server</h1>
    <div class="row mb-auto">
      <button class="btn" on:click={save}>
        <div class="icon">save</div>
        Save
      </button>
    </div>
  </div>
  <div class="grid grid-cols-3 gap-2">
    <div>Name</div>
    <div class="col-span-2"><input bind:value={server.name} /></div>
    <div>Directory</div>
    <div class="col-span-2"><input bind:value={server.dir} /></div>
  </div>
  <div class="my-2 row justify-between align-middle">
    <h3>Start Commands</h3>
    <div>
      <button
        class="btn btn-icon row align-middle"
        on:click={() => {
          server.startCommands = [...server.startCommands, ""];
        }}
        ><span class="icon">add</span>
      </button>
    </div>
  </div>

  <div class="col gap-2">
    {#each server.startCommands as com}
      <div class="row gap-1">
        <input bind:value={com} />
        <button
          class="btn btn-icon icon bg-trans"
          on:click={() => {
            server.startCommands = server.startCommands.filter(
              (i) => i != com
            );
          }}>close</button
        >
      </div>
    {/each}
  </div>
  <div class="text-xs text-gray-600 text-right">{server.id}</div>
</div>

<style>
</style>
