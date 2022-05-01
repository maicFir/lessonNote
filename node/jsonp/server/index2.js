const http = require('http');
const PORT = '8081';
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    // // console.log(req.url);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.url.includes('/list.json')) {
      res.end(JSON.stringify({
        name: 'Maic',
        age: Math.ceil(Math.random() * 20)
      }));
    }
    
});
server.listen(PORT, () => {
   console.log('server is start'+ PORT);
})