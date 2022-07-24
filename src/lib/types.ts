import { v4 as uuid } from "uuid";

export interface ServerDescription {
  id: string;
  name: string;
  dir: string;
  startScript: string;
  actions: Action[];
}

export interface Action {
  name:string;
  script:string
}

export function newServerDescription(name: string = '', dir: string = '', startScript: string = "", actions: Action[] = []): ServerDescription {
  return {
    id: uuid(),
    name, dir, startScript, actions
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
