const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          // {
          //   loader: 'babel-loader',
          //   options: {
          //     presets: ['@babel/env']
          //   }
          // },
          {
            loader: 'test-babel-loader',
            options: {
              presets: ['@babel/preset-env'] // 预设
            }
          },
          {
            loader: 'test-loader',
            options: {
              name: 'Maic',
              age: 18
            }
          }
        ]
      },
      {
        test: /\.md$/,
        use: ['html-loader', 'markdown-loader']
      }
    ]
  },
  resolveLoader: {
    modules: ['node_modules', './loader']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}