var ws = require("nodejs-websocket");
var http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 8080;
var server = http.createServer(function (request, response) {
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
server.listen(PORT, function (evt) {
  console.log((new Date()) + ' Server is listening on port 8080');
});

// websocket
const tcp = ws.createServer(function (connection) {
  console.log("New connection")
  connection.on("text", function (data) {
    const { clientText, num, to } = JSON.parse(data);
    if (to === 'server') {
      connection.sendText(JSON.stringify({
        serverText: `server:${num}号，恭喜你，你太幸运了,你已经被清华录取了`,
        clientText: `${num}号`
      }));
    } else {
      if (num > 6) {
        connection.sendText(JSON.stringify({
          clientText,
          serverText: `server:${num}号，你非常优秀, ${num}号，你已经成功被录取了北京大学`,
        }))
      } else {
        connection.sendText(JSON.stringify({
          serverText: `server: ${num}号，非常遗憾,${num}号，你落榜了，再接再厉`,
          clientText,
        }));
      };
    }
  });
  connection.sendText(JSON.stringify({
    serverText: `server:hello,我们已经建立连接了`,
    clientText: `client:你好`
  }))
  connection.on("close", function (code, reason) {
    console.log("Connection closed");
    console.log(code, reason);
  });
}).listen(3000);

tcp.on('error', (err) => {
  console.log(err);
})




