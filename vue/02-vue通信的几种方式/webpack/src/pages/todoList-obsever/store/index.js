import Vue from 'vue';

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
  ],
  commit: {
    handAdd:(payload) => {
      state.dataList = state.dataList.concat(payload)
    },
    handleDelete(index) {
      state.dataList.splice(index, 1);
    }
  }
};
const mutations = {
  commit(actionName, payload) {
    if (Reflect.has(state.commit, actionName)) {
      state.commit[actionName](payload)
    }
  },
  dispatch(actionName, payload) {
    mutations.commit(actionName, payload);
  }
}
const store = {
  state,
  ...mutations,
}
export default Vue.observable(store);