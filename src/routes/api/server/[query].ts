import { error, success } from "$lib/fetch";
import type { Order } from "$lib/types";
import * as db from "$lib/jsdb";

export async function post({ request, params }) {

  let { query } = params;
  let data = await request.json()


  try {
    if (query == 'get_all') {
      let orders = await db.getAll('orders');
      return { body: success(orders) }
    }
    else if (query == 'set') {
      let res = await db.set('orders', data.order);
      return { body: success() }
    }
    else if (query == 'remove_archived') {
      let res = await db.remove('orders', (x: Order) => (x.archived == true))
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