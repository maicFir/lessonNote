
const inquirer = require('inquirer');
const os = require('os');
const path = require('path');
const ora = require('ora');
const fs = require('fs-extra');
const { promisify } = require('util');
const gitrpo = require('download-git-repo');
const ncp = require('ncp');
let figlet = require('figlet');
const downGitPro = promisify(gitrpo);
const { spawn } = require('child_process');
const command = (...args) => {
    return new Promise((resolve) => {
        const proc = spawn(...args);
        proc.stdout.pipe(process.stdout);
        proc.stderr.pipe(process.stderr);
        proc.on('close', () => {
            resolve();
        })
    })
}
const loaderGitPro = () => {
    return promisify(downGitPro);
}
const loading = () => {
    return (fn, message) => async (...args) => {
        const spinner = ora(message);
        spinner.start();
        const result = await fn(...args);
        spinner.succeed(message);
        if (result) {
            spinner.fail();
        }
        return result;
    };
}
// 覆盖文件件
const coverFolder = (projectName) => ({
    default: false,
    type: 'confirm',
    message: `project ${projectName} has already exist，continue to overwrite it? (no)`,
    name: 'isOverwrite'
});
const download = (url, message) => {
    const presetName = url.split('/').slice(-1)[0].replace(/\.git(.*)/g, '');
    const templateDir = path.join(os.tmpdir(), 'min-cli', presetName);
    const loadFn = loading()(loaderGitPro, message);
    loadFn(repo, templateDir, presetName);
};
const templates = {
    'template-lib': {
        url: '',
        directory: '',
    },
    'template-lib-vue': {
        url: '',
        directory: ''
    }

}
module.exports = async (projectName) => {
    // 寻找目标文件
    const targetDir = path.resolve(process.cwd(), projectName || '.');
    // 文件是否存在
    const isFileExist = fs.existsSync(targetDir);
    let isFileWrite;
    if (isFileExist) {
        const result = await inquirer.prompt(coverFolder(projectName));
        isFileWrite = result.isOverwrite;
        if (isFileWrite === false) return;
    }
    // 寻找模板
    const { tempName } = inquirer.prompt({
        name: 'tempName',
        type: 'list',
        message: 'Please choose project template',
        choices: Object.keys(templates)
    })
    const choose = templates[tempName];
    if (choose) {
        // 选择模板下载
        let templateDir = await download(choose.url, `download template ${choose.directory} on ${hoose.url}`);
        // 如果文件存在，则删除目标文件
        if (isFileWrite) {
            await fs.remove(targetDir);
        }
        const directorDir = path.join(templateDir, choose.directory || '');
        // 复制对应项目到临时文件
        await ncp(directorDir, path.resolve(projectName));

        // 删除临时文件
        await fs.remove(templateDir);
        // 安装依赖
        const order = 'npm';
        console.log('start install dependices');
        await command(process.platform === 'win32' ? `${order}.cmd` : order, ['install'], {
            cwd: `./${projectName}`
        });
        const data = await figlet('success');
        console.log(data);
        console.log(`
        successfully created project ${projectName}：
        Get started with the following commands:
        =========================================
        cd ${projectName}
        =========================================
                `
        );
    } else {
        console.log('invalid template');
    }
}