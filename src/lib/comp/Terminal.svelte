<script lang="ts">
import { startServer } from "$lib/client-controls";

  import { api } from "$lib/fetch";

  import { newServerDescription, type ServerDescription } from "$lib/types";
  import { onDestroy, onMount } from "svelte";

  export let label: string = "";
  export let id: string = "";

  let terminal: any;
  let inputText = "";
  let poller: any;

  let xterm;
  onMount(async () => {
    xterm = await import("xterm");
    terminal = new xterm.Terminal();
    terminal.open(document.getElementById("terminal"));
    getOutput();
    poller = setInterval(getBuffer, 1000);
  });

  onDestroy(() => {
    clearInterval(poller);
  });

  async function getOutput() {
    let res = await api("/api/shell/get_output", {
      id,
      type: "output",
    });
    if (res.ok) terminal.write(res.data);
  }

  async function getBuffer() {
    let res = await api("/api/shell/get_output", {
      id,
      type: "buffer",
    });
    if (res.ok) terminal.write(res.data);
  }

  async function keypress(e: KeyboardEvent) {
    if (e.key == "Enter") {
      await sendInput();
    }
  }

  async function sendInput() {
    let res = await api("/api/shell/send_command", {
      id,
      text: inputText + "\r",
    });
    inputText = "";
  }

  async function refresh() {
    terminal.clear();
    await getOutput();
  }
</script>

<svelte:head>
  <link rel="stylesheet" href="/node_modules/xterm/css/xterm.css" />
</svelte:head>

<div class="col max-w-4xl p-3 gap-2 card border-shadow">
  <div class="row justify-between">
    <h1>{label}</h1>
    <div class="row gap-2 mb-auto">
      <button class="btn" on:click={() => startServer(id)}>
        Start
        <div class="icon">play_arrow</div>
      </button>
      <button class="btn">
        Stop
        <div class="icon">stop</div>
      </button>
      <button class="btn icon" title="Refresh" on:click={refresh}>refresh</button>
    </div>
  </div>
  <div class="p-3 bg-black rounded-2xl" id="terminal" />
  <div class="row gap-2 ">
    <input class="" bind:value={inputText} on:keypress={keypress} />
    <button class="btn icon" on:click={sendInput}>send</button>
  </div>
</div>

<style>
</style>
