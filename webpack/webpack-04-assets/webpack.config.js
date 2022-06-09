const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist')
    // assetModuleFilename: 'images/[name][ext]'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env']
        }
      },
      {
        test: /\.(png|jpg)$/i,
        // type: 'asset/resource'
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 40 * 1024
          }
        },
        generator: {
          publicPath: 'https://cdn/assets/',
          filename: 'images/[name][ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};
