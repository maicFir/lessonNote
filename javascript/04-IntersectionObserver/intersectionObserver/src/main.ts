import { createApp } from 'vue'
import route from './router/index';
import App from './App.vue'
// 加载mock数据
import './mock/index';
const app = createApp(App);
app.use(route);
app.mount('#app');
