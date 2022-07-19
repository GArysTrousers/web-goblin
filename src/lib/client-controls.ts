import { api } from "./fetch";


export function getServerStatus(id: string) {
  return "Hey";
}

export async function startServer(id: string) {
  let res = await api("/api/shell/start", { id });
}

export async function stopServer(id: string) {
  let res = await api("/api/shell/stop", { id });
}


export async function startService(id: string) {
  let res = await api("/api/service/start", { id });
}

export async function stopService(id: string) {
  let res = await api("/api/service/stop", { id });
}