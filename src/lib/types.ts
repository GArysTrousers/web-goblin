import { v4 as uuid } from "uuid";

export interface Order {
  id: string;
  name: string;
  model: string;
  serial: string;
  progress: number;
  archived: boolean;
}

export function newOrder(name:string, model:string, serial:string): Order {
  return {
    id: String(uuid()),
    name,
    model,
    serial,
    progress: 0,
    archived: false
  };
}