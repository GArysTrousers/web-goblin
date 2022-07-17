import os from 'os';
import pty, { type IPtyForkOptions } from 'node-pty'


export let shells = new Map<string, { shell: pty.IPty, output: string, buffer: string }>();
const cleanup = () => {
  shells.forEach((shell, id) => {
    console.log(`killing shell ${id}`);
    shell.shell.kill();
  })
  process.exit(0);
}
[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
  process.on(eventType, cleanup);
})

let serverDir = process.env.HOME ? process.env.HOME : "C:\\"
shells.set("server", newShell("server", serverDir))


export function newShell(id: string, dir: string) {

  var term = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

  let shell = {
    shell: pty.spawn(term, [], {
      name: 'xterm-color',
      cols: 80,
      rows: 30,
      cwd: dir,
      env: process.env
    } as IPtyForkOptions),
    output: "",
    buffer: ""
  }

  shell.shell.onData(function (data: any) {
    process.stdout.write(data);
    //shells.get(id).output += data
    shell.output += data
    shell.buffer += data
  });

  shell.shell.onExit(function (e) {
    console.log("shell exited ", id);
  })

  return shell;
}