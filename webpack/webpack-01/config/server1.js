const webpackDevServer = require('webpack-dev-server');

const webpack = require('webpack');

const config = require('../webpack.config.js');
const options = { hot: true, contentBase: '../dist', host: 'localhost' };
// 这个方法报错，版本原因只能用V2
webpackDevServer.addDevServerEntrypoints(config, options);

const compiler = webpack(config);

const server = new webpackDevServer(compiler, options);
const PORT = '9000';
server.listen(PORT, 'localhost', () => {
  console.log('server is start' + PORT);
});
