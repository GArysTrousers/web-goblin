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

  import { onDestroy, onMount } from "svelte";

  let services: Service[] = [];
  let servers: Server[] = [];
  let pollers:any[] = [];

  onMount(async () => {
    {
      let res = await api<ServerDescription[]>("/api/server/get_all");
      if (res.ok) {
        servers = res.data.map((i) => newServer(i));
        getServerStatuses();
        pollers.push(setInterval(getServerStatuses, 5000));
      }
    }
    {
      let res = await api<Service[]>("/api/service/get_all");
      if (res.ok) {
        services = res.data;
        getServiesStatuses();
        pollers.push(setInterval(getServiesStatuses, 10000));
      }
    }
  });

  onDestroy(() => {
    pollers.forEach((i) => clearInterval(i))
  })

  async function getServerStatuses() {
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

  async function getServiesStatuses() {
    let res = await api<{ id: string; status: string }[]>(
      "/api/service/get_status"
    );
    if (res.ok)
      res.data.forEach((i) => {
        let index = services.findIndex((s) => s.id == i.id);
        if (index > -1)
          services[index] = { ...services[index], status: i.status };
      });
  }
</script>

<main class="max-w-xl">
  <div class="row justify-between">
    <h1>Services</h1>
    <a class="btn icon my-auto" href="/service/new" title="New Server">add</a>
  </div>
  {#each services as service}
    <ServiceSummary {service} />
  {/each}

  <div class="row justify-between">
    <h1>Servers</h1>
    <a class="btn icon my-auto" href="/server/new" title="New Server">add</a>
  </div>
  {#each servers as server}
    <ServerSummary {server} />
  {/each}
</main>

<style>
</style>
