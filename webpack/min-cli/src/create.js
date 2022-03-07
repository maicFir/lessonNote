
const inquirer = require('inquirer');
const os = require('os');
const path = require('path');
const ora = require('ora');
const fs = require('fs-extra');
const { promisify } = require('util');
const gitrpo = require('download-git-repo');
const downGitPro = promisify(gitrpo);
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
        url: 'direct:http://git.aqara.com/root/AIOT_aqara-npm-libs.git#dev-aqara-lib',
        directory: 'aqara-cli/template-lib',
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
        let templateDir = await download(choose.url, `download template ${choose.directory} on ${hoose.url}`)
    }
}