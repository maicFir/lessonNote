const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const app = express();

const config = require('../webpack_test_dev_config');
const compiler = webpack(config);
// 设置静态资源目录
app.use(express.static('dist'));
app.use(webpackDevMiddleware(compiler, {}));
const PORT = 8000;
app.listen(PORT, () => {
  console.log('server is start' + PORT);
});
