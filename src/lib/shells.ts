import os from 'os';
import pty from 'node-pty'


export let shells = new Map<string, { shell: pty.IPty, output: string, buffer: string }>();

shells.set("server", newShell("server"))

export function newShell(id: string) {

  var term = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

  let shell = {
    shell: pty.spawn(term, [], {
      name: 'xterm-color',
      cols: 80,
      rows: 30,
      cwd: process.env.HOME,
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