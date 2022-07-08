import { readFileSync, writeFileSync } from "fs";


let dbPath = "C:\\Users\\benml\\OneDrive\\source\\Web\\laptops\\data.json";
let tables = [
  "orders"
]
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
  catch (err) {
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

export async function getAll(table: string): Promise<any> {
  return data[table];
}

export async function get(table: string, selector: Function): Promise<any> {
  return data[table].filter(selector);
}

export async function getOne(table: string, id: string): Promise<any> {
  let index = data[table].findIndex(x => x.id == id)
  if (index == -1) return false;
  return data[table][index]
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

