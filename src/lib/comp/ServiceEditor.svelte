<script lang="ts">
  import { api } from "$lib/fetch";

  import type { Service } from "$lib/types";
  export let service: Service;
  export let onSave: any = () => {
    location.reload();
  };

  async function save() {
    let res = await api<{}>("/api/service/save", { service });
    if (res.ok) onSave();
  }
</script>

<div class="card glow-blue col max-w-xl gap-2">
  <div class="row justify-between">
    <h1>Service</h1>
    <div class="row mb-auto">
      <button class="btn" on:click={save}>
        <div class="icon">save</div>
        Save
      </button>
    </div>
  </div>
  <div class="grid grid-cols-3 gap-2">
    <div>Name</div>
    <div class="col-span-2"><input bind:value={service.name} /></div>
    <div>Service ID</div>
    <div class="col-span-2"><input bind:value={service.id} /></div>
  </div>
</div>

<style>
</style>
