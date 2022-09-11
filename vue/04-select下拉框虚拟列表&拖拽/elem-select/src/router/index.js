
import Vue from 'vue'
import Router from 'vue-router'
import Demo1 from '@/components/Demo1'
import Demo2 from '@/components/Demo2'
import Draw from '@/components/Draw'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Demo1',
      component: Demo1
    },
    {
      path: '/2',
      name: 'Demo2',
      component: Demo2
    },
    {
      path: '/3',
      component: Draw
    }
  ]
})
