<template>
  <div id="app">
    cache Page:{{ cachePage }}
    <keep-alive :include="cachePage">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import store from '@/store';

export default {
  name: 'App',
  computed: {
    cachePage() {
      return store.state.global.cachePage;
    },
  },
  methods: {
    cacheCurrentRouter() {
      const { meta } = this.$route;
      if (meta) {
        if (meta.cache) {
          store.commit('global/setGlobalState', {
            cachePage: [
              ...new Set(store.state.global.cachePage.concat(meta.cache)),
            ],
          });
        } else {
          store.commit('global/setGlobalState', {
            cachePage: [],
          });
        }
      }
    },
  },
  created() {
    this.cacheCurrentRouter();
    this.$watch('$route', () => {
      this.cacheCurrentRouter();
    });
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
