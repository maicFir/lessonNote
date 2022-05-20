import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    dataList: [
      {
        title: 'vuejs',
        subTitle: 'vuejs is crazy'
      },
      {
        title: 'reactjs',
        subTitle: 'reactjs is beautify'
      }
    ]
};
const mutations = {
    handAdd(state, payload) {
      state.dataList = state.dataList.concat(payload)
    }
}
export const store = new Vuex.Store({
  state,
  mutations
})