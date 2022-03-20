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