
import { watch } from 'gulp';
import browserSync from 'browser-sync';
import { resolve } from './config';

console.log(resolve('src'), 'src')
const taskDevServer = (taskBuild) => {
    return (options = {}) => {
        const defaultOption = {
            port: '8081', //设置端口
            open: true,  // 自动打开浏览器
            files: `src/*`, // 当dist文件下有改动时，会自动刷新页面
            server: {
                baseDir: 'example' // 基于当前dist目录
            },
            ...options
        }
        // 监听src所有目录下，只要文件发生改变，就重新加载
        watch(resolve('src'), taskBuild);
        const server = browserSync.create();
        server.init(defaultOption);
    }

}
export default taskDevServer;