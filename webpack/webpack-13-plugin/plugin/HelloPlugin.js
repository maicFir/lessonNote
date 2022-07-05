
const path = require('path');
class HelloPlugin {
  constructor() {
    this.options = {
      outputFile: 'readme'
    }
  }
  apply(compiler) {
    compiler.hooks.done.tap('HelloWordPlugin', (stats) => {
      console.log('hello world');
    });
    const { webpack } = compiler;
    const { Compilation } = webpack;
    const { RawSource } = webpack.sources;
    compiler.hooks.thisCompilation.tap('HelloWordPlugin', (compilation) => {
      compilation.hooks.processAssets.tap({ name: 'HelloWordPlugin', stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE }, (assets) => {
        // 遍历所有资源，
        // 生成 Markdown 文件的内容
        const content =
          '# In this build:\n\n' +
          Object.keys(assets)
            .map((filename) => `- ${filename}`)
            .join('\n');

        // 向 compilation 添加新的资源，
        // 这样 webpack 就会自动生成并输出到 output 目录
        compilation.emitAsset(
          this.options.outputFile,
          new RawSource(content)
        );
      })
    })
  }
}
module.exports = HelloPlugin;