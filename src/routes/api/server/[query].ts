import { error, success } from "$lib/fetch";
import * as db from "$lib/jsdb";
import { shells, newShell } from "$lib/shells";
import type { ServerDescription } from "$lib/types";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request, params }) {

  let { query } = params;
  let data: any = await request.json()


  try {
    // Get Servers
    if (query == 'get_all') {
      return { body: success(await db.getAll('servers')) }
    }

    // Get Server
    else if (query == 'get_one') {
      let { id } = data;
      let server = await db.getOne<ServerDescription>('servers', id)
      return { body: success(server) }
    }

    // Get Statuses
    //TODO: This doesn't work properly
    else if (query == 'get_server_statuses') {
      let { servers } = data as { servers: string[] };
      let statuses = new Map<string, string>()
      servers.forEach(i => {
        statuses.set(i, shells.get(i) ? "Running" : "Stopped");
      })
      return { body: success(Object.fromEntries(statuses)) }
    }

    // Save
    else if (query == 'save') {
      let { server } = data;
      await db.set('servers', server)
      return { body: success() }
    }
  }

  catch (err) {
    console.error(err);
    return {
      body: error()
    }
  }
}