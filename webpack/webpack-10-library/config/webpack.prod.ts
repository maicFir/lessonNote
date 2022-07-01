import * as path from 'path';
const { merge } = require('webpack-merge');
import * as webpack from 'webpack';

const commonConfig = require('./webpack.common');
const prodConfig: webpack.Configuration = merge(commonConfig, {
  mode: 'production',
  entry: {
    index: path.join(__dirname, '../src/index.ts')
  }
});

module.exports = prodConfig;
