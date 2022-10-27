import browserSync from 'browser-sync';
import gulp from 'gulp';
import { rollup } from 'rollup';
import { builds, getConfig } from './config.js';

const buildTask = (keyName) => {
    gulp.task('build', () => {
        const { input, output, plugins } = getConfig(keyName);
        return rollup({
            input,
            plugins
        })
            .then(bundle => {
                return bundle.write({
                    ...output,
                    sourcemap: true
                });
            });
    });
}
const devServer = () => {
    const server = browserSync.create();
    const defaultOption = {
        port: '8081', //设置端口
        open: true,  // 自动打开浏览器
        files: `src/*`, // 当dist文件下有改动时，会自动刷新页面
        server: {
            baseDir: '.' // 基于当前dist目录
        },
        serveStatic: ['.', './example'],
    }
    gulp.task('server', () => {
        server.init(defaultOption)
    })
}
const start = async () => {
    const keyName = Object.keys(builds)[2]; // 输出umd模式
    await buildTask(keyName);
    await devServer();
}
start();





