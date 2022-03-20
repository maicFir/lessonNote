### 交叉观察器 IntersectionObserver
> 可以观察`元素`是否可见，由于目标元素与视口产生一个交叉区，我们可以观察到目标元素的可见区域，通常称这个`API`为交叉观察器

### vite初始化一个项目
参考官网[vite](https://vitejs.cn/guide/#trying-vite-online)快速启动一个项目
```bash
$ npm init vite@latest
```
选择一个`vue`模板快速初始化一个页面后，我们添加路由页面
```js
npm i vue-router@4
```
在已有项目上添加路由
```js
// main.ts
import { createApp } from 'vue'
import route from './router/index';
import App from './App.vue'
const app = createApp(App);
app.use(route);
app.mount('#app');
```
修改`App`模板，另外我们引入`elementPlus`,引入它主要是我们在实际项目中，我们用第三方UI库非常高频，在之前一篇文章中有提到`虚拟列表优化大数据量`，具体参考[测试脚本把页面搞崩了](https://mp.weixin.qq.com/s?__biz=Mzk0ODMxODIzNw==&mid=2247486014&idx=1&sn=4fb22eb3cc18b08d5d7ec8ffeed63587&chksm=c368334cf41fba5ab89d61af3ae16d7753c3ebb61aa6a7720fb6e78a29c080a7e8841da8db02&token=964484333&lang=zh_CN#rd)。今天用`交叉观察器`也算是优化大数据量渲染的一种方案。
```html
// App.vue
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ElConfigProvider } from "element-plus";
import { ref } from "vue";
const zIndex = ref(1000);
const size = ref("small");
</script>

<template>
  <el-config-provider :size="size" :z-index="zIndex">
    <router-view></router-view>
  </el-config-provider>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```
创建`router`文件夹，新建`index.ts`,添加路由页面
```ts
// router/index.ts
import { createWebHashHistory, createRouter } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue'
import ShopListPage from '../view/shopList/Index.vue';
const routes = [
    {
        path: '/hello',
        component: HelloWorld
    },
    {
        path: '/',
        component: ShopListPage
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router;
```
我们新建一个`view/shopList`目录，在`shopList`中新建一个`Index.vue`开始今天的栗子。

本地开发环境安装`mockjs`模拟接口数据
```js
npm i mockjs --save-dev
```
新建`mock`我们使用它模拟接口随机数据,我们会在`main.ts`引入该`mock/index.js`
```js
// mock/index.ts
import Mockjs from 'mockjs';
import mockFetch from 'mockjs-fetch';
// 拦截mock
mockFetch(Mockjs);
 // 生成随机长度的数组
 const createMapRandom = (len: number) => {
    const data = new Array(len);
    return data.fill('Maic')
}
Mockjs.mock('\/shoplist\/list.json', () => {
    return {
        code: 0,
        data: Mockjs.mock({
            'list|10': [{
                'id|+1': createMapRandom(10).map(() => Mockjs.mock('@id')),
                'adress|1': createMapRandom(10).map(() => Mockjs.mock('@city')),
                "age|1": createMapRandom(10).map(() => Mockjs.mock('@integer(0,100)')),
                'name|1': createMapRandom(10).map(() => Mockjs.mock("@cname")),
               }
            ]
        })
    }
});
```
注意我们在使用`mockjs`时，我们使用了另外一个库`mockjs-fetch`，如果在项目中使用`fetch`做`ajax`请求，那么必须要使用这个库拦截`mock`请求，在默认情况下，如果你使用的是`axios`库，那么`mock`会默认拦截请求。

在`view/shopList`目录下，我们创建`Index.vue`
```html
<template>
  <div class="shopList">
    <h3>intersectionObserver交叉器实现上拉加载</h3>
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column property="id" label="id" width="180" />
      <el-table-column property="name" label="Name" width="180" />
      <el-table-column property="adress" label="Address" />
      <el-table-column property="age" label="Age" />
    </el-table>
    <div @click="handleMore" v-if="hasMore">点击加载更多</div>
    <div v-else>没有数据啦</div>
  </div>
</template>
```
对应的`js`，这段`js`逻辑非常简单，就是请求模拟的`mock`数据，然后设置`table`所需要的数据，`点击加载更多`就继续请求,如果没有数据了，就显示没有数据。
```js
<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { ElTable, ElTableColumn } from "element-plus";
import "element-plus/dist/index.css";
const hasMore = ref(false);
const tableData = ref([]);
const condation = reactive({
  pageParams: {
    page: 1,
    pageSize: 10,
  },
});
// TODO 请求数据
const featchList = async () => {
  const res = await fetch("/shoplist/list.json", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(condation.pageParams),
  });
  const json = await res.json();
  tableData.value = tableData.value.concat(json.data.list);
};
onMounted(() => {
  featchList();
});
// TODO 加载更多
const handleMore = () => {
  featchList();
};
</script>
```
我们用`vite`初始化的项目是`vue3`,在`vue3`的`script`我们使用了`setup`,那么我们在`script`中不再用返回一个对象，申明的方法和变量可以直接在模板中使用，这里与`组合式API`有点区别，但是从功能上并没有什么区别。

在传统上，我们实现上拉加载，我们会监听滚动条到底部的距离，我们计算滚动条距离顶部位置、浏览器可视区域的高度、body的高度，监听滚动事件，判断`scrollTop + clientHeight > bodyScrollHeight`，然后就判断是否需要加载下一页。

监听滚动事件，我们会加防抖处理事件，即使这样`scroll`事件也会高频触发，这样也会影响性能。

因此我们使用`IntersectionObserver`这个`API`实现上拉加载。

我们看下`IntersectionObserver`这个API
```js
// callback是一个回调函数,options是可配置的参数
var observer = new IntersectionObserver(callback, options);
// target1是一个具体的dom元素
observer.observe(target1) // 开始观察
observer.observe(target2)
observer.unobserve(target) // 停止观察
observer.disconnect(); // 停止观察
```
我们可以在页面中用`observer`可以观察多个`dom`,同时我们也需要知道`new IntersectionObserver()`这个是异步的，并不会随着页面的滚动而时时触发，它只会在线程空闲下来才会执行，因此它在事件循环中，优先级很低，只有等其他任务执行完了，浏览器有了空闲才会执行它。

当目标元素可见时，会触发`callback`,另一次是当元素完全不可见时也会触发该`callback`
```js
const options = {};
var observer = new IntersectionObserver(
  (entries, observer) => {
    console.log(entries);// entries 是一个数组，监听几个dom就会有几个
  }
, options);
```
在``IntersectionObserver`中的`entries`第一个参数里，其中有几个参数我们需要了解下
```ts
// entries
type clientRect = {
  top: number;
  bottom: number,
  left: number,
  right: number,
  width: number,
  height: number
}
const entriesRes = {
  time: 12334,
  rootBounds: {
    bottom: 920,
    height: 1024,
    left: 0,
    right: 1024,
    top: 0,
    width: 920
  } as clientRect,
  boundingClientRect: {
    ...
  } as clientRect,
  intersectionRect: {
    
  } as clientRect,
  intersectionRatio: 0,
  target: dom
};
const entries = [entriesRes]
// observer
{
  delay: 0
  root: null
  rootMargin: "0px 0px 0px 0px"
  thresholds: [0]
  trackVisibility: false
}
```
在第二个参数`options`中可配置参数
```js
var options = {
  threshold: [0, 0.5, 1],
  root: document.getElementById('box1')
}
```
`threshold`这个可以设置目标元素可见范围在0，50%，100%时触发回调`callback`,`root`就是可以目标元素所在的祖先节点

我们花了一些时间了解`IntersectionObserver`这个`API`,接下来我们用它实现一个上拉加载。

```js
// 关键代码
...
// 自定义一个上拉加载的指令
const vScrollTable = {
  created: (el, binding, vnode, prevVnod) => {
    handleScrollTable(el, binding);
  },
};
```
然后就是`handleScrollTable`这个方法
```js
...
// 自定义指令的created中调用该方法
const handleScrollTable = (el, binding) => {
  const { infiniteScrollDisable, cb } = binding.value;
  // 如果el不存在，则禁止后面IntersectionObserver的实例化
  if (!el && !cb) {
    return;
  }
  // 核心上拉加载代码
  const intersectionObserver = new IntersectionObserver((enteris, observer) => {
    // console.log(enteris, observer);
    const [curentEnteris] = enteris;
    const { intersectionRatio } = curentEnteris;
    // 不可见的时候，禁止加载
    if (intersectionRatio <= 0) return;
    // 设置一个可以加载更多的开关
    if (infiniteScrollDisable) {
      cb();
    }
  });
  // 开始监听
  intersectionObserver.observe(el);
};
```
在模板里我们只需在目标元素上绑定指令就行
```html
...
<div
      class="load-more-btn"
      @click="handleMore"
      v-if="hasMore"
      v-scroll-table="{ cb: handleMore, infiniteScrollDisable: hasMore }"
    >
      点击加载更多<el-icon :class="[loading ? 'is-loading' : '']">
        <component :is="Loading"></component> </el-icon
      >({{ tableData.length }}/{{ total }})
    </div>
    <div v-else>没有数据啦</div>
```
我们直接在元素上绑定自定义的指令`v-scroll-table="{cb: handleMore,infiniteScrollDisable: hasMore}"`就行

完整的全部示例就是
```html
<!--shopList/Index.vue-->
<template>
  <div class="shopList">
    <h3>intersectionObserver交叉器实现上拉加载</h3>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column type="index" width="50" />
      <el-table-column property="id" label="id" width="180" />
      <el-table-column property="name" label="Name" width="180" />
      <el-table-column property="adress" label="Address" />
      <el-table-column property="age" label="Age" />
    </el-table>
    <div
      class="load-more-btn"
      @click="handleMore"
      v-if="hasMore"
      v-scroll-table="{ cb: handleMore, infiniteScrollDisable: hasMore }"
    >
      点击加载更多<el-icon :class="[loading ? 'is-loading' : '']">
        <component :is="Loading"></component> </el-icon
      >({{ tableData.length }}/{{ total }})
    </div>
    <div v-else>没有数据啦</div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { ElTable, ElTableColumn, ElIcon } from "element-plus";
import { Loading } from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
const hasMore = ref(false);
const tableData = ref([]);
const loading = ref(false);
const condation = reactive({
  pageParams: {
    page: 1,
    pageSize: 10,
  },
});
const total = ref(100);
// TODO 请求数据
const featchList = async () => {
  const res = await fetch("/shoplist/list.json", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(condation.pageParams),
  });
  const json = await res.json();
  tableData.value = tableData.value.concat(json.data.list);
  hasMore.value = true;
  if (total.value === tableData.value.length) {
    hasMore.value = false; // 没有更多了
  }
  loading.value = false;
};
onMounted(() => {
  featchList();
});
// TODO 加载更多
const handleMore = () => {
  loading.value = true;
  // 加一个延时1s显示loading效果
  setTimeout(() => {
    featchList();
  }, 1000);
};
const handleScrollTable = (el, binding) => {
  const { infiniteScrollDisable, cb } = binding.value;
  // 如果el不存在，则禁止后面IntersectionObserver的实例化
  if (!el && !cb) {
    return;
  }
  const intersectionObserver = new IntersectionObserver((enteris, observer) => {
    // console.log(enteris, observer);
    const [curentEnteris] = enteris;
    const { intersectionRatio } = curentEnteris;
    // 不可见的时候，禁止加载
    if (intersectionRatio <= 0) return;
    // 设置一个可以加载更多的开关
    if (infiniteScrollDisable) {
      cb();
    }
  });
  // 开始监听
  intersectionObserver.observe(el);
};
// 自定义一个上拉加载的指令
const vScrollTable = {
  created: (el, binding, vnode, prevVnod) => {
    handleScrollTable(el, binding);
  },
};
</script>

<style>
.load-more-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
```
打开页面，我们可以看到
![](https://files.mdnice.com/user/24614/d936847b-acf9-4eac-bb54-015c4d4a954a.jpg)
点击加载操作就会加载更多，当滚动到底部时，就会加载更多。当数据加载完时，我们就设置`hasMore = false`;

核心代码非常简单，就是利用`IntersectionObserver`监测目标元素的可见，当目标元素可见时，我们加载更多，在目标元素不可见时，我们禁止加载更多，当数据加载完了，就禁止加载更多。

### 总结

1.使用`vite`与`vue3`模板搭建一个简易的`demo`模板，结合`vue-router`、`mockjs`、`elementPlus`,`fetch`实现基本路由搭建，数据请求

2.了解核心`IntersectionObserver`API，用`vue3`指令，实现加载更多，这里用指令的原因是因为可以在多个类似模块复用指令内部那段逻辑，这样可以提高我们业务功能的复用能力

3.我们看到在`vue3`中`script`中使用了`setup`,在注册组件和模板上使用的变量，当前组件可以直接使用。如果你未在`script`中使用`setup`，那么就要与`组合式API`一样使用`setup`,返回模板中使用的变量以及绑定的方法，并且注册局部组件依旧要像以前方式一样

4.更多关于`IntersectionObserver`的实践，我们可以用它做`图片懒加载`，`视频播放暂停与播放`，具体可以参考这篇文章[IntersectionObserver](https://wangdoc.com/webapi/intersectionObserver.html)



