const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = function (env, argv) {
  console.log(env);
  console.log(argv);
  return {
    // watch: true,
    entry: {
      app: './src/app.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      library: 'MyTest',
      libraryTarget: argv.libraryTarget
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [miniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.(png|svg|jpg|gif|jpeg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'assets',
                name: '[name].[ext]?[hash]'
              }
            }
          ]
        }
      ]
    },
    mode: argv.mode,
    devServer: {
      hot: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html'
      }),
      new miniCssExtractPlugin({
        filename: 'css/[name].css'
      })
    ]
  };
};
