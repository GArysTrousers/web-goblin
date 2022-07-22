import { readFileSync, writeFileSync, existsSync } from "fs";
import { newDb, type DbShape, type Table } from "$lib/jsdb.config";


let dbPath:string = import.meta.env.VITE_DB_LOCATION || 'data.json';
let data: DbShape = initDB(dbPath)

let saveTimer: NodeJS.Timeout = setTimeout(() => {
  writeFileSync(dbPath, JSON.stringify(data))
  console.log("db saved");
}, 1000)

function save(messsage: string = 'no message') {
  saveTimer.refresh()
  console.log(messsage);
}

function load(path: string): DbShape {
  let rawdata = readFileSync(path);
  let loadedData = JSON.parse(rawdata.toString());
  console.log(info(loadedData));
  return loadedData;
}

function info(db:DbShape = data) {
  let output = "DB Tables\n";
  for (let i in db) {
    output += `${i}: ${db[i].length}\n`
  }
  return output;
}

function initDB(filePath: string): DbShape {
  return existsSync(filePath) ? load(filePath) : newDb()
}

export async function getAll(table: Table) {
  return data[table];
}

export async function get(table: Table, selector: Function) {
  return data[table].filter(selector);
}

export async function getOne(table: Table, id: string) {
  let index = data[table].findIndex(x => x.id == id);
  if (index == -1) return false;
  return data[table][index];
}

export async function set(table: Table, value: any) {
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

export async function remove(table: Table, selector: Function): Promise<boolean> {
  let rows = data[table].filter(selector)
  for (let r of rows) {
    await removeOne(table, r.id)
  }
  return true;
}

export async function removeOne(table: Table, id: string) {
  let index = data[table].findIndex(x => x.id == id)
  if (index == -1) return false;
  data[table].splice(index, 1)
  save(`${table}->removed: ${id}`)
  return true;
}


