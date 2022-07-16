import os from 'os';
import pty from 'node-pty'


export let shells = new Map<string, { shell: pty.IPty, output: string, buffer: string }>();

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
    }),
    output: "",
    buffer: ""
  }
  // var newPty = pty.spawn(term, [], {
  //   name: 'xterm-color',
  //   cols: 80,
  //   rows: 30,
  //   cwd: process.env.HOME,
  //   env: process.env
  // });

  shell.shell.on('data', function (data: any) {
    process.stdout.write(data);
    //shells.get(id).output += data
    shell.output += data
    shell.buffer += data
  });

  return shell;
}