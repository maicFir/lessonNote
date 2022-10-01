<template>
  <div id="app">
    <div class="select-router">
      下拉切换路由:
      <el-select
        v-model="curentRouter"
        @change="handleChangeRouter($event)"
        placeholder="请切换路由"
      >
        <el-option
          v-for="item in routerList"
          :key="item.value"
          :label="item.name"
          :value="item.path"
        >
        </el-option>
      </el-select>
    </div>
    <router-view />
  </div>
</template>

<script>
import { routes } from './router';
export default {
  name: 'App',
  data () {
    return {
      routerList: routes,
      curentRouter: '/4'
    };
  },
  methods: {
    handleChangeRouter (path) {
      this.$router.push(path);
    }
  },
  created () {
    this.curentRouter = this.$route.fullPath;
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.select-router {
  margin-bottom: 10px;
}
</style>
