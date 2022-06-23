// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const glob = require('glob');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = MiniCssExtractPlugin.loader;

const PATH = {
  src: path.resolve(__dirname, 'src')
}
const config = {
  // entry: {
  //   main: { import: ['./src/index'], dependOn: 'loadsh-vendors' },
  //   'loadsh-vendors': ['loadsh']
  // },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
    compress: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      env: process.env.NODE_ENV,
      template: "index.html",
      inject: 'body', // 插入到body中
      cdn: {
        basePath: 'https://cdn.bootcdn.net/ajax/libs',
        js: [
          '/lodash.js/4.17.21/lodash.min.js'
        ]
      }
    }),

    new MiniCssExtractPlugin(),
    new CompressionWebpackPlugin({
      exclude: /.(html|map)$/i // 排除html,map文件不做gizp压缩
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${PATH.src}/**/*`, { nodir: true }),
    }),
    new ImageMinimizerPlugin({
      minimizer: {
        // Implementation
        filename: "optimized-[name][ext]",
        implementation: ImageMinimizerPlugin.squooshMinify,
      },
    })

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.less$/i,
        use: [stylesHandler, "css-loader", "postcss-loader", "less-loader"],
      },
      {
        test: /\.css$/i,
        sideEffects: true,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 // 小于4kb将会base64输出
          }
        }
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  // externals: /^(loadsh)$/i,
  externals: isProduction ? {
    loadsh: '_'
  } : {}
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = "development";
    config.devtool = 'source-map',
      config.optimization = {
        runtimeChunk: true, // 减少入口文件打包的体积，运行时代码会独立抽离成一个runtime的文件
        splitChunks: {
          minChunks: 1,
          chunks: 'all', // 支持异步和非异步共享chunk
        },
        sideEffects: true,
        usedExports: true,
        minimize: true, // 开启terser
        minimizer: [new TerserPlugin({
          extractComments: false, // 是否将注释剥离到单独文件，默认是true
        }),
        ]
      }
  }
  return config;
};
