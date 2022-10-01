import Vue from 'vue'
import Router from 'vue-router'
import Demo1 from '@/components/Demo1'
import Demo2 from '@/components/Demo2'
import Draw from '@/components/Draw'
import Draw2 from '@/components/Draw2'
Vue.use(Router)
export const routes = [
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
    name: 'Draw3',
    component: Draw
  },
  {
    path: '/4',
    name: 'Draw4',
    component: Draw2
  }
]
export default new Router({
  routes
})
