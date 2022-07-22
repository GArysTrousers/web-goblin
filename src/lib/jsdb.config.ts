import type { ServerDescription, Service } from "./types";

export type Table = "services" | "servers";

export interface DbShape {
  services: Service[]
  servers: ServerDescription[]
}

export function newDb(): DbShape {
  return {
    services: [],
    servers: []
  }
}