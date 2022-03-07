const { program } = require('commander');

const path = require('path');
// 获取版本号
const { version } = require('../package.json');

const actions = {
    create: {
        alias: '-c',
        description: 'create a project',
        example: ['min-cli create <project-name>']
    }
}
program.version(version)
    .on('--help', () => {
        console.log('example:');
        const { example } = actions['create'];
        example.forEach(item => {
            console.log(item);
        })
    });

Reflect.ownKeys(actions).forEach(key => {
    program.command(key)
        .alias(actions[key].alias) // 别名
        .description(actions[key].description) // 描述
        .action((str, options) => {
            const params = process.argv.slice(3);
            console.log(str, params, '=params');
            require(path.resolve(__dirname, str))(...params)
        })
});

program.parse(process.argv);

