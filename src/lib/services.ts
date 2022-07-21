
import { promisify } from "util";
import { exec } from "child_process";
const execAsync = promisify(exec);

export async function getServiceStatusMap(data: string) {
  data = data.replaceAll(/\n +/g, '\n')
  data = data.replaceAll(/ {2,}/g, ' ')
  const map = new Map();
  for (let line of data.split('\r\n')) {
    let thing = line.split(' : ')
    if (thing.length == 2) map.set(thing[0], thing[1]);
  }
  return map
}

export async function getServiceState(serviceName: string): Promise<string> {
  try {
    let { stdout, stderr } = await execAsync(`sc query ${serviceName}`)
    if (stderr) return stderr;
    let state = stdout.match(/STATE * : \d+  (\w+) */)
    if (state) return state[1];
  } catch (e: any) {
    if (e.stdout.match(/The specified service does not exist as an installed service./))
      return "NOT INSTALLED"
  }
  return 'Error';
}
