<template>
  <div class="app">
    <h1>
      {{ name }}
    </h1>
    <h2>
      {{ age }}
    </h2>
    <h3>
      {{ publicText }}
    </h3>
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue';

export default {
  name: 'App',
  setup() {
    const name = 'Maic';
    const info = reactive({
      name,
      age: 18,
      publicText: 'web技术学苑',
    });
    return {
      ...toRefs(info),
    };
  },
};
</script>
<style lang="less" scoped>
.app {
  h1 {
    color: red;
    & {
      font-size: 30px;
    }
  }
  h2 {
    display: flex;
    user-select: none;
  }
}
</style>
