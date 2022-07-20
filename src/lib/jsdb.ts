import { readFileSync, writeFileSync } from "fs";
import { tables } from "$lib/jsdb.config";


let dbPath:any = import.meta.env.VITE_DB_LOCATION || 'data.json';
let data: object = initDB(dbPath, tables)

let saveTimer: NodeJS.Timeout = setTimeout(() => {
  writeFileSync(dbPath, JSON.stringify(data))
  console.log("db saved");
}, 1000)

function save(messsage: string = 'no message') {
  saveTimer.refresh()
  console.log(messsage);
}

function load(path: string) {
  let rawdata = readFileSync(path);
  let loadedData = JSON.parse(rawdata.toString());
  console.log(loadedData);
  console.log('db loaded');
  return loadedData;
}

function initDB(filePath: string, tables: Array<string>): object {
  let db: object = {}
  try {
    db = load(filePath)
  }
  catch (err:any) {
    if (err.code === 'ENOENT') {
      console.log('DB file not found!');
    }
  }
  for (let t of tables) {
    if (!(t in db)) {
      db[t] = []
    }
  }
  return db;
}

export async function getAll<T>(table: string) {
  return data[table] as T[];
}

export async function get<T>(table: string, selector: Function): Promise<T> {
  return data[table].filter(selector) as T;
}

export async function getOne<T>(table: string, id: string): Promise<T|boolean> {
  let index = data[table].findIndex(x => x.id == id);
  if (index == -1) return false;
  return data[table][index] as T;
}

export async function set(table: string, value: any) {
  let index = data[table].findIndex(x => x.id == value.id)
  if (index == -1) {
    data[table].push(value);
    save(`${table}->added: ${value.id}`)
  }
  else {
    data[table][index] = value
    save(`${table}->updated: ${value.id}`)
  }
  return true;
}

export async function remove(table: string, selector: Function): Promise<boolean> {
  let rows = data[table].filter(selector)
  for (let r of rows) {
    await removeOne(table, r.id)
  }
  return true;
}

export async function removeOne(table: string, id: string): Promise<boolean> {
  let index = data[table].findIndex(x => x.id == id)
  if (index == -1) return false;
  data[table].splice(index, 1)
  save(`${table}->removed: ${id}`)
  return true;
}


