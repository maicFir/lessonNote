![](https://files.mdnice.com/user/24614/7366e30a-9efe-4b81-9d31-0ba78fbc784d.jpeg)

`npm`是一个包管理工具，当我们安装`nodejs`时，这个命令会默认安装。你可能非常熟悉`npm run xxx`这个命令，每次上线前你都在执行`npm run build`，甚至你常常在`npm i`的等待中摸鱼。

当某一天你的同事在你电脑输入了一行命令...,`npm view typescript versions`,你脑壳里想着，这
![](https://img.soogif.com/Wj4jXG873HMGeq4tjWcVDmhZf9WjBDJM.gif?scope=mdnice)

于是乎，你去官方文档查了下这个命令，原来`npm view xx versions`是查询 `xx` 包所有可用版本。为了不拘泥于`npm run start`与`npm run build`这两行命令，于是笔者总结了这篇没有深度，但是很广度的`npm`命令大全，希望你能在你实际项目中能用得上。

正文开始...

#### npm init

```bash
npm init
// or npm init -y
```

该命令意思是初始化一个包项目，生成一个`package.json`文件
![](https://files.mdnice.com/user/24614/6e96e454-8e72-415b-9292-da76c85810dc.jpg)
可以一直`enter`键下去，你也可以按你心情在控制台输入一些信息，然后`enter`下去
`later`...
![](https://files.mdnice.com/user/24614/5518b79c-1377-4e31-8bee-093259ef30ae.png)

最后在你目录下生成了一个`package.json`文件

```javascript
{
  "name": "npm-know",
  "version": "1.0.0",
  "description": "My first encounter with npm",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "npm"
  ],
  "author": "Maic",
  "license": "ISC", // 以上都是默认的配置
}
```

另外如果你想在指定的目录中生成`package.json`,那么你你只需执行下面一行命令
`npm init -w 01`, `01`是你当前已存在的目录，如果`01`不存在，则会在你得根目录`.Trash`中创建一个`01/package.json`

---

##### 关于`package.json`的一些解释

```javascript
// name  包名，如果你需要发布一个npm包，那么这是必须的
// version 版本 同上，你需要发布一个包，那么版本是必须的 包名+版本构成一个包的唯一标识
// description 包名的描述，npm能根据这个描述检索你得包名
// main 程序的主要入口，默认index.js
// scripts 可以执行npm 指定运行的别名
// keywords 关键字，便于别人搜索关联找到你发布的包名
// author 发布该包的作者名
// license 许可证 通常是ISC或者MIT,便于开发者知道这是个开源可免费试用的包
```

关于`package.json`的默认的配置就是这么多，接下来，你感兴趣的来了,她来了，她就是
`bin`...

```javascript
{
  ...,
  license: 'ISC',
   "bin": {
     "maic-app-cli": "./cli.js"
   }
}
```

在官方解释这个`bin`有点绕，我的理解的就是，提供一个可执行的接口命令，让你可以运行你写的包，能关联到当前的项目，不管是全局还是局部安装，`npm`可以通过这个`bin`的别名命令，执行指定包内的脚本，从而进行一系列的初始化工作。比如大名鼎鼎的`vue-cli`和`create-react-app`脚手架,当你看到`vue-cli@2.96`版本`package.json`时，可以看到`vue`命令的操作

```js
{
  "name": "vue-cli",
  "version": "2.9.6",
  "description": "A simple CLI for scaffolding Vue.js projects.",
  "preferGlobal": true,
  "bin": {
    "vue": "bin/vue",
    "vue-init": "bin/vue-init",
    "vue-list": "bin/vue-list"
  },
  ...
}
```

前往`bin/vue`目录你可以看到

```js
#!/usr/bin/env node
const program = require('commander')
program
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('init', 'generate a new project from a template')
  .command('list', 'list available official templates')
  .command('build', 'prototype a new project')
  .command('create', '(for v3 warning only)')

program.parse(process.argv)
```

这里就是熟悉的脚手架`vue create xx`,`vue init`的一些 `xxx`项目的脚手架工作了，具体可以查看[vue-cli 源码](https://github.com/vuejs/vue-cli/blob/v2 "vue-cli源码")

关于`bin`的实际操作，后续会专门写一个自己的脚手架，再来细细了解下这些知识。

`conig`，这个配置可以在你指定包名，版本升级时，一些特殊值可以保持不变。

`dependencies`这是一个开发依赖，当你在你得`cmd`控制台输入`npm i ramda -s`时
![](https://files.mdnice.com/user/24614/3e2df9cd-a69e-4048-a7ef-576067eab276.jpg)
`package.json`中`dependencies`生成了一个依赖文件`"ramda": "^0.27.1"`。

`devDependencies`是一个在生产环境需要依赖的包，`dependencies`与`devDependencies`的区别是:`npm i xx -s`和`npm i xx --save-dev`,在实际项目开发中，你可以把`dependencies`安装的开发环境依赖包，在你打包的时候利用`webpack`的`externals`外部扩展特性分离出去，也就是将开发环境的包可以用`cdn`加载，这样减少你生产环境的`bundle.js`的体积，开发环境那部分依赖的包就可以单独`cdn`引入，进而提升你项目的打包速度。

打开`node_modules/ramda`，我们能从这个优秀的`ramda`包中发现些什么,
注意`scripts`

在`scripts`配置中有一个`"build": "npm run build:es && npm run build:cjs && npm run build:umd && npm run build:umd:min && npm run build:mjs"`,`ramda`
是用`rollup`打包的，这行命令可以将你的`ramda`打包成了不同模式,支持按需引入还是`script`标签引用的多种方式。关于`rollup`打包，可以参考官网学习[rollup.js](https://www.rollupjs.com/ "rollup.js")。

现在我们测试下自己配置的`scripts`,当前目录下新建一个文件`index.js`,并控制台运行`npm run start`

```javascript
  {
  "name": "npm-know",
  "version": "1.0.0",
  "description": "My first encounter with npm",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js"
  },
  ...
}
```

`index.js`写入测试代码

```javascript
// 由于刚项目已经安装ramda，所以直接require该包
const R = require('ramda');
const cityMap = [
    {
        city: '北京',
    },
    {
        city: '上海'
    },
    {
        city: '深圳'
    }
];
// 找到上海
const shanghaiCity = R.find(R.propEq('city', '上海'))(cityMap)
console.log(shanghaiCity)
```

测试结果如下：
![](https://files.mdnice.com/user/24614/3ad3f44e-98de-4f41-acc6-5556f1e6eb2c.jpg)

在你执行`npm run start`时，它与`npm start`也是等价的，实际上当我们执行这行命令时本质上在执行`node index.js`,前者相当于就是一个命令的别名，所以你看到`ramda`的`scripts`上配置了多行命令，`"build": "npm run build:es && npm run build:cjs && npm run build:umd && npm run build:umd:min && npm run build:mjs",`,在`ramda`中，这行命令执行了多行配置

在`npm init`生成的`package.json`内部还有其他的字段，更多可以参考官方文档[pckage.json](https://docs.npmjs.com/cli/v8/configuring-npm/package-json "pckage.json"),你已经了解`npm`最硬核的一些知识了，其他的，你就熟悉下些配置时，比如支持操作系统、node 指定环境版本等等，巴拉巴拉...
![](https://img.soogif.com/goKDU3bQAgPVcajH8bdsf21FQF4MmHCr.gif?scope=mdnice)



#### npm -h

```javascript
npm -h
```

这是一个查看`npm`cmmand 有那些指令，等价于`npm help`,如果你记不起 npm 有哪些命令，那么你可以用这个查看她的全家桶
![](https://files.mdnice.com/user/24614/424d5ac3-864b-4698-b09c-a08558db004c.jpg)

#### npm i(npm install的简写)

```javascript
npm i 
// npm i -g 全局安装
// npm i xx@latest 安装最新xx版本的包
// npm i xx@1.x.x 安装指定版本的包
// npm i xx@1.x.x -s or npm i xx@1.x.x -d 安装到开发环境，包名会在dependencies
// npm i xx@1.x.x --save-dev 安装到生产环境，包名会在devDependencies
```

如果你`package.json`的`dependencies`或者`devDependencies`有对应的包了，那么你执行该命令后，会在你当前项目中生成一个`node_modules`文件夹,该文件下会下载你需要的包，应有尽有。

#### npm cache clear

```javascript
npm cache clear
```

清除缓存包，在你运行项目，莫名其妙的报错的时候，除了删除`node_modules`，有时候你执行这个命令，可能能帮助到你

#### npm bugs xxx

```javascript
npm bugs ramda
```

这是一个很有用的命令，快速链接到你这个包的`issue`，在`issue`中会找到你遇到的一些问题，例如：`cd node_modules/ramda`，执行命令`npm bugs`,浏览器自动给你打开了该包`issue`地址。(如果只是在你自己的项目根目录里，执行这个命令，这个命令会把以当前`package.json`的 name，在 npm官网当成一个路由地址打开，那么就是 404 了，不信你可以试试)。
![](https://files.mdnice.com/user/24614/53613955-1c4c-4871-b8df-abd9e7649c7a.jpg)

#### npm view ramda versions
查看ramda所有版本包
```javascript
npm view ramda versions
// npm view ramda version  查看当前项目ramda版本
// npm view ramda@* 查看当前包的基本信息
```

![](https://files.mdnice.com/user/24614/baca798a-eb6e-461f-b0dc-4b6b1b372dca.jpg)
如果你本地想安装一个`vue`指定的版本，那么你可以先`npm view vue versions` 查到所有的版本，然后命令安装`npm i vue@3.2.25 -s`那么就会安装该版本。就是这么简单，这个命令用起来，你终于不用去官网看版本了。
![](https://img.soogif.com/7Y565laHxRBdsm7JRXO9EYgz2VoAoZno.gif?scope=mdnice)

#### npm diff --diff=ramda@0.0.1 --diff=ramda@0.1.0

```javascript
npm diff --diff=ramda@0.0.1 --diff=ramda@0.1.0
```

比较两个版本的不同，用到少。

#### npm docs ramda

```javascript
npm docs ramda
```
这个命令打开`ramda`的官方文档，就是`package.json`里面的那个`homepage`地址
#### npm update xxx
更新xxx包
```javascript
npm update ramda // 更新ramda包
```

#### npm uninstall xxx
卸载xxx包
```javascript
npm uninstall ramda
// 简写，等价于下面  npm un ramda or npm rm ramda or npm r ramda
```
#### npm pkg get xx1 xx2
```javascrpt
npm pkg get name version
```
读取包名、版本等信息
![](https://files.mdnice.com/user/24614/aecf7ada-d094-4066-a3e0-11d088d990b2.jpg)

----
接下来说几个关于`npm`发包的几个关键命令
#### npm login
```javascript
npm login 
```
![](https://files.mdnice.com/user/24614/af57b026-15c3-4538-9251-b1ccb1c94431.jpg)

这中途需要`npm`官方会给你发个邮箱的验证码，收到`npm`注册的邮箱，输入就OK了，这里以笔者n年前上传的一个包`eazyutils`包为例。
#### npm publish
```javascript
npm publish
```
![](https://files.mdnice.com/user/24614/76046df6-cacb-4b8a-8a3c-82bfd68dfa9a.png)

(注意修改下`package.json`的版本)，否则提交不上

更多`npm`命令参考[npm commands](https://docs.npmjs.com/cli/v8/commands)了，不常用的就没写了，因为那些不常用的，笔者也没用过，哈哈。更多关于`npm`的命令最好就是找官方文档查询，本来以为你看到这里，以为已经总结了所有`npm`命令，但是....,笔者文章已经覆盖了项目里所用到的绝大部分场景。![](https://img.soogif.com/iM5TsaPVs9nfoJemXrpPRgpdCktSZmPK.gif?imageMogr2/thumbnail/!64.33917507232614p&scope=mdnice)


#### 总结
1. npm常用的`command`命令，譬如高频命令`npm view xxx versions`,`npm update@lastest`、`npm un xxx`、`npm i xx -s`,常用的`增删查改`基本以及涵盖了。
2. 了解`package.json`关键的几个字断意思，但是`bin`这个你必须要知道，因为她，你可以任性创建一个自己的`xx-cli`了
3. `npm`如何发布一个全世界都能看到，全世界都能下载的`npm`包，以n年前的一个简单`eazyutils`包为例


最后，喜欢的点个赞，在看，收藏等于学会，我会以循序渐进的方式一直分享下去。

