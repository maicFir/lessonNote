import Vue from 'vue'
import Vuex from 'vuex'
import { mockFeatchData } from '../mock'
Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    data: [],
    text: 'hello'
  },
  mutations: {
    storeData (state, payload) {
      // mockFeatchData().then((res) => {
      //     console.log(res)
      //     state.data = state.data.concat(res)
      // })
      state.data = state.data.concat(payload)
    },
    storeText (state, payload) {
      state.text = payload
    }
  },
  actions: {
    setStoreData ({ commit }) {
      mockFeatchData().then((res) => {
        console.log(res, '111')
        commit('storeData', res)
      })
    },
    setStoreText ({ dispatch, commit }, {payload}) {
      dispatch('setStoreData').then(() => {
        console.log(222, payload)
        commit('storeText', payload)
      })
    }
  }
})
