<script lang="ts">
  let servers = [
    {
      name: "Test",
      dir: "C:\\repos\\test",
      startCommands: ["set PORT=3001", "node index.js"],
    },
  ];
</script>

<main>
  {#each servers as server}
    <div class="card flex-col max-w-xl m-5 p-5 rounded-3xl gap-2">
      <h1>Server</h1>
      <div class="grid grid-cols-3 gap-2">
        <div>Name</div>
        <div class="col-span-2"><input bind:value={server.name} /></div>
        <div>Directory</div>
        <div class="col-span-2"><input bind:value={server.dir} /></div>
      </div>
      <div class="my-2 flex-row justify-between align-middle">
        <h3>Start Commands</h3>
        <div>
          <button
            class="btn btn-icon flex-row align-middle"
            on:click={() => {
              server.startCommands = [...server.startCommands, ""];
            }}><span class="icon">add</span>
            </button
          >
        </div>
      </div>
      
      <div class="flex-col gap-2">
        {#each server.startCommands as com}
          <div class="flex-row gap-1"><input bind:value={com} /><button class="btn btn-icon icon bg-trans">close</button></div>
        {/each}
      </div>
    </div>
  {/each}
</main>

<style>
</style>
