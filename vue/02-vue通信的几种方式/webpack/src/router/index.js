import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld';
import TodoListLayout from '@/pages/todoList/Index.vue';
import TodoListProps from '@/pages/todoList-prop/Index';
import TodoListSync from '@/pages/todoList-sync/Index';
import TodoListVuex from '@/pages/todoList-vuex/Index';
import TodoListObserver from '@/pages/todoList-obsever/Index';
import TodoListProvider from '@/pages/todoList-provider/Index';
import TodoListEventBus from '@/pages/todoList-event-bus/Index';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
        path: '/todolist',
        redirect: '/todolist/observer',
        component: TodoListLayout,
        children: [
          {
            path: '/todolist/props',
            name: 'todo-list-props',
            component: TodoListProps
          },
          {
            path: '/todolist/sync',
            name: 'todo-list-sync',
            component: TodoListSync
          },
          {
            path: '/todolist/vuex',
            name: 'todo-list-vuex',
            component: TodoListVuex
          },
          {
            path: '/todolist/observer',
            name: 'todo-list-observer',
            component: TodoListObserver
          },
          {
            path: '/todolist/provide',
            name: 'todo-list-provide',
            component: TodoListProvider
          },
          {
            path: '/todolist/eventbus',
            name: 'todo-list-eventbus',
            component: TodoListEventBus
          }
        ]
    },
  
  ]
})
