const path = require('path');
module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    filename: '[name].test_prd.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  mode: 'production'
};
