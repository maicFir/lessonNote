
import Vue from 'vue';
import Vuex from 'vuex';
import { gloablMoudle } from './modules';

Vue.use(Vuex);
const initState = {};
const store = new Vuex.Store({
  state: initState,
  modules: {
    global: gloablMoudle,
  },
});
export default store;

