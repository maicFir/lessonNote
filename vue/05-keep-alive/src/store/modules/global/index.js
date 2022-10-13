
// eslint-disable-next-line import/prefer-default-export
export const gloablMoudle = {
  namespaced: true,
  state: {
    cachePage: [],
  },
  mutations: {
    setGlobalState(state, payload) {
      Object.keys(payload).forEach((key) => {
        if (Reflect.has(state, key)) {
          state[key] = payload[key];
        }
      });
    },
  },
};
