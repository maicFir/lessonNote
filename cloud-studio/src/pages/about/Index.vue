<template>
  <div class="about">
        <h3>{{info.title}}</h3>
  </div>
</template>

<script setup>
import {reactive} from 'vue';
const info = reactive({
    title: '这是about'
})
</script>

<style>

</style>