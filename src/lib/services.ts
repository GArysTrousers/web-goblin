
import {promisify} from "util";
import { exec } from "child_process";
const execAsync = promisify(exec);

export async function getServiceStatusMap(data:string) {
  data = data.replaceAll(/\n +/g, '\n')
  data = data.replaceAll(/ {2,}/g, ' ')
  const map = new Map();
  for (let line of data.split('\r\n')) {
    let thing = line.split(' : ')
    if (thing.length == 2) map.set(thing[0], thing[1]);
  }
  return map
}

export async function getServiceState(serviceName:string):Promise<string> {
  let { stdout, stderr } = await execAsync(`sc query ${serviceName}`)
  if (stderr) return stderr;
  //console.log(`stdout: ${data}`);
  let state = stdout.match(/STATE * : \d+  (\w+) */)
  //console.log(state);
  if (state) return state[1];
  return 'Error';
}
