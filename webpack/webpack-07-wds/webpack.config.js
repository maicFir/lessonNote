const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')

console.log(process.env.NODE_ENV, 'node_env');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  plugins: [new htmlWebpackPlugin({
    template: './public/index.html'
  })],
  devServer: {
    port: '9000',
    client: {
      progress: true, // 启用gizp
      overlay: {
        errors: true, // 如果有错误会有蒙层
        warnings: false,
      },
      // webSocketURL: {
      //   hostname: '0.0.0.0',
      //   pathname: '/ws',
      //   port: 8080,
      //   protocol: 'ws',
      // }
    },

    historyApiFallback: true, // 使用路由模式为history时，必须设置这个，要不然前端刷新会直接404页面
    hot: true, // 模块热加载，对应模块须配合module.hot.accept('xxx/xxx.js')指定模块热加载
    open: true, // 当服务启动时默认自动直接打开浏览器，可以指定打开哪个页面
    proxy: {
      '/j': {
        target: 'https://movie.douban.com', // 代理豆瓣
        changeOrigin: true,
      },
      '/cmc': {
        target: 'https://apps.game.qq.com', // 代理王者荣耀官网
        changeOrigin: true, // 必须要加，否则代理接口直接返回html
        pathRewrite: { '^/cmc': '/cmc' },
      }
    }
  }
}