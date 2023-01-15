const fs = require('fs');
module.exports = function(){
	console.log('开始执行脚本change_after');
	let changelog = fs.readFileSync(process.cwd() + '/changelog.md', 'utf-8').split("##")[1].split("\n").slice(1).join(' ');
	console.log(changelog);

	// 这里是修改完相关敏感配置后执行的脚本，你可以在这里自定义逻辑，
	// 比如执行git提交命令
	var shell = require("shelljs");
	var exec = shell.exec;
	
	if (exec('git add .').code !== 0) {
	  shell.echo('Error: Git add failed');
	  shell.exit(1);
	}
	if (exec(`git commit -am "${changelog}"`).code !== 0) {
	  shell.echo('Error: Git commit failed');
	  shell.exit(1);
	}
	if (exec('git push').code !== 0) {
	  shell.echo('Error: Git commit failed');
	  shell.exit(1);
	}
	shell.exec(`echo git success ${changelog}`);
}