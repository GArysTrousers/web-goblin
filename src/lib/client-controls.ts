import { api } from "./fetch";


export function getServerStatus(id: string) {
  return "Hey";
}

export async function startServer(id: string) {
  let res = await api("/api/shell/start", { id });
}