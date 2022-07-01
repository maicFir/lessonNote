import * as webpack from 'webpack';
const prdConfig = require('./webpack.prod');
const { name } = require('../package.json');

enum LIBARY_TARGET {
  umd = 'umd',
  cjs = 'cjs',
  esm = 'esm'
}

const targetUMD: webpack.Configuration = {
  ...prdConfig,
  output: {
    ...prdConfig.output,
    filename: 'umd/index.js',
    library: {
      name,
      type: 'umd'
    }
  }
};
const targetCJS: webpack.Configuration = {
  ...prdConfig,
  output: {
    ...prdConfig.output,
    filename: 'cjs/index.js',
    library: {
      name,
      type: 'commonjs'
    }
  }
};
const targetESM: webpack.Configuration = {
  ...prdConfig,
  experiments: {
    outputModule: true
  },
  output: {
    ...prdConfig.output,
    filename: 'esm/index.js',
    library: {
      type: 'module',
      export: 'default'
    }
  }
};
const libraryTargetConfig = new Map([
  [LIBARY_TARGET.umd, targetUMD],
  [LIBARY_TARGET.cjs, targetCJS],
  [LIBARY_TARGET.esm, targetESM]
]);
module.exports = libraryTargetConfig;
