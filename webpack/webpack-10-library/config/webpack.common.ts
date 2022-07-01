import * as path from 'path';
import * as webpack from 'webpack';
// 配置devServer
import 'webpack-dev-server';

const configCommon: webpack.Configuration = {
  entry: {
    app: path.join(__dirname, '../src/index.ts')
  },
  output: {
    path: path.resolve(process.cwd(), './dist')
    // clean: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader'
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '../example') // 修改默认静态服务访问public目录
    }
  }
};
module.exports = configCommon;
