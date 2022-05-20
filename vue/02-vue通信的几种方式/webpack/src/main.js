// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import eventBus from '@/utils/eventBus';
import { store } from '@/store/index';
import App from './App'
import router from './router'
Vue.config.productionTip = false
Vue.use(Antd);

/* eslint-disable no-new */
Vue.prototype.$my_event = new eventBus;
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});


