import { v4 as uuid } from "uuid";

export interface ServerDescription {
  id: string;
  name: string;
  dir: string;
  startCommands: string[];
}

export function newServerDescription(name: string = '', dir: string = '', startCommands: string[] = []): ServerDescription {
  return {
    id: uuid(),
    name, dir, startCommands
  };
}

export interface Server {
  desc: ServerDescription,
  status: string
}

export function newServer(desc: ServerDescription = newServerDescription()): Server {
  return {
    desc,
    status: "Waiting..."
  };
}


export interface Service {
  id: string;
  name: string;
  status: string;
}

export function newService(): Service {
  return {
    id: "",
    name: "",
    status: "Waiting...",
  };
}
