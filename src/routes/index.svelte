<script lang="ts">
  import { startServer, stopServer } from "$lib/client-controls";
  import ServiceSummery from "$lib/comp/ServiceSummery.svelte";

  import { api } from "$lib/fetch";
  import {
    newServer,
    type Server,
    type ServerDescription,
    type Service,
  } from "$lib/types";

  import { onMount } from "svelte";

  let services: Service[] = [
    {
      id: "mysql",
      name: "MySQL",
      status: "Waiting..."
    }
  ];
  let servers: Server[] = [];
  let poller: any;

  onMount(async () => {
    let res = await api<ServerDescription[]>("/api/server/get_servers");
    if (res.ok) {
      servers = res.data.map((i) => newServer(i));
      getStatuses();
      poller = setInterval(getStatuses, 5000);
    }
  });

  async function getStatuses() {
    let res = await api<any>("/api/server/get_server_statuses", {
      servers: servers.map((i) => i.desc.id),
    });
    servers = servers.map((server) => {
      return {
        ...server,
        status: res.data[server.desc.id],
      };
    });
  }
</script>

<main>
  <h1>Services</h1>
  {#each services as service}
    <ServiceSummery {service} />
  {/each}

  <h1>Servers</h1>
  {#each servers as server}
    <div class="card glow-blue col max-w-xl my-5 p-5 rounded-3xl gap-2">
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
  {/each}
</main>

<style>
</style>
