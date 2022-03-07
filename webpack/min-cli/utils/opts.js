const { program } = require('commander');

program.option('-d, --debug', 'out put extra')
    .option('-s,--small', 'small prizaa')
    .option('-p, --przza<type>', 'favor of prizee');

program.parse(process.argv);
// { debug: true } true
console.log(program.opts(), program.opts().debug);