const { program } = require('commander');


program.name('str-utils').description('this is a str utils').version('0.0.1');

program.command('split').description('change string to array')
    .argument('<string>', 'string to split')
    .option('--first', 'display just this first substring')
    .option('-t,--test<type>', 'test you command', 'blue')
    .option('-s --separator <char>', 'separator character', ',')
    .action((str, options) => {

        console.log(str.split(options.separator));
    });
console.log(program.opts())
program.parse(process.argv);
