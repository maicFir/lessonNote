const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV;
console.log(isProduction);
const entry = {
  index: {
    import: './src/index.ts',
  },
  formateUrl: { import: './src/formateUrl.ts' },
  getOrigin: { import: './src/getOrigin.ts' },
  hasOwn: { import: './src/hasOwn.ts' },
  isType: { import: './src/isType.ts' },
  lazyFunction: { import: './src/lazyFunction.ts' },
  memorize: { import: './src/memorize.ts' },
  mergeDeep: { import: './src/mergeDeep.ts' }
}
const multipeHtmlPlugin = () => {
  const entryKeys = Object.keys(entry);
  return entryKeys.map(key => new HtmlWebpackPlugin({
    inject: true,
    template: './public/index.html',
    filename: `${key}.html`, // 这里不能加文件夹例如:example/${key}.html
    chunks: [key],
    title: `${key} page`
  }))
}
module.exports = {
  context: __dirname,
  entry,
  // experiments: {
  //   outputModule: true,
  // },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    clean: true,
    library: {
      name: 'Maic_utils',
      type: 'umd'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/
      },
      {
        test: /\.ts(x)?$/,
        use: [{
          loader: 'babel-loader'
        }, {
          loader: 'ts-loader'
        }],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    ...multipeHtmlPlugin()
  ],
  devServer: {

  }
}
