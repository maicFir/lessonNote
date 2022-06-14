const path = require('path');
const HtmlWebpackPlguins = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: '[name][hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
          },
          {
            loader: 'postcss-loader',
            // options: {
            //   postcssOptions: {
            //     plugins: [['postcss-preset-env']]
            //   }
            // }
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlguins({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new VueLoaderPlugin(),
    new ESLintPlugin(),
  ],
};
