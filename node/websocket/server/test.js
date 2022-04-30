var WebSocketServer = require('websocket').server;
var http = require('http');
const fs = require('fs');
const path = require('path')
var server = http.createServer(function(request, response) {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    fs.readFile(path.resolve(__dirname, '../', 'index.html'), (err, data) => {
      if (err !== null) {
        response.end('404');
        return;
      }
      response.end(data);
    })
    
});
server.listen(8080, function(evt) {
    console.log((new Date()) + ' Server is listening on port 8080');
    console.log(evt);
});
wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: true, // 自动连接
});
// wsServer.on('request', (req) => {
  
//   console.log(req.origin, '111');
//   const connect = req.accept('echo-protocol', req.origin);
//   console.log((new Date()) + ' Connection accepted.');
//   connect.on('message', (evt) => {
//       console.log('evt=',evt);
//   });
//   connect.on('close', () => {
//     console.log('服务端关闭了');
//   })
// });


