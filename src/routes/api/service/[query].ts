import { error, success } from "$lib/fetch";
import * as db from "$lib/jsdb";
import { getServiceState } from "$lib/services";
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
    else if (query == 'get_status') {
      let all = await db.getAll<Service>('services');
      console.log("all");
      
      let status = await Promise.all(all.map(async (i) => {
        return { id: i.id, status: await getServiceState(i.id) }
      }))
      return { body: success(status) }
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