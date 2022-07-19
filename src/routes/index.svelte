<script lang="ts">
  import ServerSummary from "$lib/comp/ServerSummary.svelte";
  import ServiceSummary from "$lib/comp/ServiceSummary.svelte";

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
      status: "Waiting...",
    },
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
    <ServiceSummary {service} />
  {/each}

  <h1>Servers</h1>
  {#each servers as server}
    <ServerSummary {server} />
  {/each}
</main>

<style>
</style>
