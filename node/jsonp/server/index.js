const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = '8080';
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    // console.log(req.url);
    res.setHeader('Content-Type', 'text/html');
    fs.readFile(path.resolve(__dirname, '../', 'index.html'), (err, data) => {
        if (err) {
          res.end('404');
          return;
        }
        res.end(data);
    });
    const data = {
      name: 'Maic',
      age: Math.floor(Math.random() * 20)
    }
    if (req.url.includes('/api')) {
        res.end(`jsonp(${JSON.stringify(data)})`)
    }
});
server.listen(PORT, () => {
   console.log('server is start'+ PORT);
})