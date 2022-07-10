<script context="module">
  /** @type {import('./__types/[slug]').Load} */
  export async function load({ params }) {
    return {
      props: {
        serverId: params.id
      }
    };
  }
</script>

<script lang="ts">
  import ServerEditor from "$lib/comp/ServerEditor.svelte";
import { api } from "$lib/fetch";
import type { ServerDescription } from "$lib/types";
  import { onMount } from "svelte";

  export let serverId: string;

  let server:Server;

  let terminal: any;
  let inputText = "";

  let xterm;
  onMount(async () => {
    xterm = await import("xterm");
    terminal = new xterm.Terminal();
    terminal.open(document.getElementById("terminal"));
    getOutput();
    setInterval(getBuffer, 1000);
    let res = await api('/api/server/get_server', {id: serverId});
    if (res.ok) server = res.data
  });

  async function keypress(e: KeyboardEvent) {
    if (e.key == "Enter") {
      let res = await api("/api/server/send_command", {
        id: serverId,
        text: inputText + "\r",
      });
    }
  }

  async function getOutput() {
    let res = await api("/api/server/get_output", { id: serverId, type: "output" });
    if (res.ok) terminal.write(res.data);
  }

  async function getBuffer() {
    let res = await api("/api/server/get_output", { id: serverId, type: "buffer" });
    if (res.ok) terminal.write(res.data);
  }
</script>

<svelte:head>
  <link rel="stylesheet" href="/node_modules/xterm/css/xterm.css" />
</svelte:head>

<main>
  <div class="col gap-5">
  <div class="col max-w-3xl p-3 gap-2 card border-shadow">
    <div class="row justify-between">
      <h1>{serverId}</h1>
      <div>
        <button class="btn icon" on:click={getOutput}>refresh</button>
      </div>
    </div>
    <div class="" id="terminal" />
    <div class="row gap-2 ">
      <input class="" bind:value={inputText} on:keypress={keypress} />
      <button class="btn icon" on:click={getOutput}>send</button>
    </div>
  </div>

  <ServerEditor serverId={serverId}/>
</div>
</main>

<style>
  
</style>
