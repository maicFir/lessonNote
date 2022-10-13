import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import List from '@/pages/list';
import Detail from '@/pages/detail';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/hello-world',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/',
      name: 'list',
      component: List,
      meta: {
        cache: ['list'],
      },
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
      meta: {
        cache: ['detail'],
      },
    },
  ],
});
