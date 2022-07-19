import { error, success } from "$lib/fetch";
import * as db from "$lib/jsdb";
import { shells, newShell } from "$lib/shells";
import { Service } from "$lib/types";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request, params }) {

  let { query } = params;
  let data: any = await request.json()


  try {
    // Get services
    if (query == 'get_all') {
      return { body: success(await db.getAll('services')) }
    }

    // Get service
    else if (query == 'get_service') {
      let { id } = data;
      let service = await db.getOne<Service>('servers', id)
      return { body: success(service) }
    }

    // Get Statuses
    //TODO: This doesn't work properly
    else if (query == 'get_server_statuses') {
      let { servers } = data as {servers: string[]};
      let statuses = new Map<string, string>()
      servers.forEach(i => {
        statuses.set(i, shells.get(i) ? "Running" : "Stopped");
      })
      return { body: success(Object.fromEntries(statuses)) }
    }

    // Save
    else if (query == 'save') {
      let { service } = data;
      await db.set('services', service)
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