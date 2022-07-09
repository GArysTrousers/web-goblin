import os from 'os';
import pty from 'node-pty'


export let shells = {
  server: {
    shell: newShell("server"),
    output: ""
  }
}

function newShell(id:string) {

  var shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

  var newPty:any = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env
  });

  newPty.on('data', function(data:any) {
    //process.stdout.write(data);
    shells[id].output += data
    console.log(shells[id].output);
    
  });

  return newPty;
}