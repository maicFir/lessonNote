const path = require('path');
const HtmlWebpackPlguins = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [miniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          esModule: true
        }
      },
      {
        test: /\.less$/,
        use: [
          miniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader'
          },
          {
            loader: 'postcss-loader'
            // options: {
            //   postcssOptions: {
            //     plugins: [['postcss-preset-env']]
            //   }
            // }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader'
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new HtmlWebpackPlguins({
      template: './public/index.html'
    }),
    new miniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new VueLoaderPlugin(),
    new BundleAnalyzerPlugin()
  ]
};
