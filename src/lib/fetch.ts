export async function api<T>(url:string, body:object = {}, fetchMethod = fetch) {
  const [res, data] = await fetchMethod(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  }).then(async (t) => [t, await t.json()])
  return {
    res: res,
    ok: data.ok,
    data: data.data as T
  }
}

export function success(data = {}) {
  return { ok: true, data: data }
}

export function error(message = "Error") {
  return { ok: false, data: { error: message } }
}