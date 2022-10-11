<template>
  <div class="detail-app">
    <div>
      <a href="javascript:void(0)" @click="handleBack">返回</a>
    </div>
    <div class="content">
      <a href="javascript:void(0)" @click="$router.push('/')">hello world</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data() {
    return {};
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped></style>
