<template>
  <div class="about">
        <h3>{{info.title}}</h3>
        <p>测试git111ddd</p>
  </div>
</template>

<script setup>
import {reactive} from 'vue';
const info = reactive({
    title: '这是home'
})
</script>

<style>

</style>