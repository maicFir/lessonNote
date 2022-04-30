const express = require("express");

const app = express();
const PORT = '8081';
app.get('/', (req, res) => {
  res.send('hello server123')
});

app.listen(PORT, () => {
  console.log('server is start'+PORT)
})
