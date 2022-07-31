<template>
  <div class="container">
    <a-button type="link" v-for="item in routerData" :key="item.path">
      <router-link :to="item.path">{{ item.path }}</router-link>
    </a-button>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      routerData: [
        {
          path: '/todolist/props'
        },
        {
          path: '/todolist/sync'
        },
        {
          path: '/todolist/vuex'
        },
        {
          path: '/todolist/observer'
        },
        {
          path: '/todolist/provide'
        },
        {
          path: '/todolist/eventbus'
        }
      ]
    }
  }
}
</script>

<style></style>
