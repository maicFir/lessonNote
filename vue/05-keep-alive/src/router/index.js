import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import List from '@/pages/list';
import Detail from '@/pages/detail';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/list',
      name: 'list',
      component: List,
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
    },
  ],
});
