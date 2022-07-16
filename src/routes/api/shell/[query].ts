import { error, success } from "$lib/fetch";
import * as db from "$lib/jsdb";
import { newShell, shells } from "$lib/shells";
import type { ServerDescription } from "$lib/types";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request, params }) {

  let { query } = params;
  let data: any = await request.json()


  try {
    if (query == 'get_all') {

    }

    // Send Command
    else if (query == 'send_command') {
      let { id, text } = data;
      let shell = shells.get(id)
      if (shell) {
        shell.shell.write(text);
        return { body: success() }
      }
      return { body: error(`No Server: ${id}`) }
    }

    // Get Output
    else if (query == 'get_output') {
      let { id, type } = data;
      let shell = shells.get(id)
      if (shell) {
        let output = ""
        if (type == "buffer") {
          output = shell.buffer
          shell.buffer = ""
        }
        else if (type == "output") {
          output = shell.output
        }
        return { body: success(output) }
      }
      return { body: error(`No Server: ${id}`) }
    }
    
    // Start
    //TODO: if shell already running -> stop first
    else if (query == 'start') {
      let { id } = data as {id: string};
      if (id == "server") {
        let shell = newShell("server")
        shells.set(id, shell);
        return { body: success() }
      }

      let server = await db.getOne<ServerDescription>('servers', id);
      if (server == false) return { body: error(`No Server: ${id}`) }
      server = server as ServerDescription
      let shell = newShell(id)
      shells.set(id, shell);
      for (let command of server.startCommands) {
        shell.shell.write(command + '\r');
      }
      return { body: success() }
    }

    // Stop
    else if (query == 'stop') {

    }
  }

  catch (err) {
    console.error(err);
    return {
      body: error()
    }
  }
}