<script lang="ts">
  import { api } from "$lib/fetch";

  let terminalText = "";
  let inputText = "";

  async function keypress(e: KeyboardEvent) {
    if (e.key == "Enter") {
      let res = await api("/api/server/send_command", {
        id: "server",
        text: inputText + "\r",
      });
      if (res.ok) {
      }
    }
  }

  async function getOutput() {
    let res = await api("/api/server/get_output", { id: "server" });
    if (res.ok) {
      terminalText = res.data;
    }
  }
</script>

<main>
  <div class="flex-col max-w-2xl">
    <div class="h-96">
      {terminalText}
    </div>
    <div class="flex-row gap-2">
      <input bind:value={inputText} on:keypress={keypress} />
      <button class="btn" on:click={getOutput}>Refresh</button>
    </div>
  </div>
</main>

<style>
</style>
