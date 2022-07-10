
export interface ServerDescription {
  id: string;
  dir: string;
  startCommands: string[];

}

export function newServerDescription(id: string, dir: string, startCommands: string[]): ServerDescription {
  return {
    id, dir, startCommands
  };
}

export interface Server {
  desc: ServerDescription,
  status: string
}

export function newServer(desc: ServerDescription): Server {
  return {
    desc,
    status: "waiting..."
  };
}


