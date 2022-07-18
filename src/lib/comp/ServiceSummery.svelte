<script lang="ts">

  export let name:string;

  async function startService() {
    
  }
  async function stopService() {
    
  }
</script>

<div class="card glow-orange col max-w-xl my-5 p-5 rounded-3xl gap-2">
  <div class="row justify-between">
    <div class="text-xl">
      {name} - Status
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
      <a href={`/service/${'server.desc.id'}`} class="btn">
        Go
        <div class="icon">arrow_forward</div>
      </a>
    </div>
  </div>
</div>

<style>
  
</style>