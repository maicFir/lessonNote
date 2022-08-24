import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../pages/home/Index.vue';
import About from '../pages/about/Index.vue';
import Hello from '../components/HelloWorld.vue';

const routes = [
  {path: '/', component: Hello},
  { path: '/home', component: Home },
  { path: '/about', component: About },
];
const router = createRouter({
    history: createWebHashHistory(), // hash
    routes,
  })
export const installRouter = (app) => {
    app.use(router)
}