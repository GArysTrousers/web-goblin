const http = require('http')

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end(`Hi Mom!\nPID:${process.pid}`);
};

let server = http.createServer(requestListener)
server.listen(4000, 'localhost', () => {
  console.log('server started on port 4000');
})
