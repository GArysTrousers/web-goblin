import { error, success } from "$lib/fetch";
import * as db from "$lib/jsdb";
import { shells } from "$lib/shells";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request, params }) {

  let { query } = params;
  let data: any = await request.json()


  try {
    if (query == 'get_all') {

    }
    else if (query == 'send_command') {
      let { id, text } = data;
      if (id in shells) {
        shells[id].shell.write(text);
        return { body: success() }
      }
      return { body: error(`No Server: ${id}`) }
    }

    else if (query == 'get_servers') {
      return { body: success(await db.getAll('servers')) }
    }

    else if (query == 'get_server_statuses') {
      let { servers } = data;
      let statuses = {}
      servers.forEach(i => {
        statuses[i] = (i in shells) ? "Running" : "Stopped"
      })
      return { body: success(statuses) }
    }

    else if (query == 'get_output') {
      let { id, type } = data;

      if (id in shells) {
        let output = ""
        if (type == "buffer") {
          output = shells[id].buffer
          shells[id].buffer = ""
        }
        else if (type == "output") {
          output = shells[id].output
        }
        return { body: success(output) }
      }
      return { body: error(`No Server: ${id}`) }
    }
  }

  catch (err) {
    console.error(err);

    return {
      body: error()
    }
  }
}