<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="(item, index) in dataList" :key="index">
        {{ item.name }}---{{ item.id }}
      </li>
    </ul>
    <div>{{ text }}</div>
    <button @click="handleData">获取数据</button>
    <button @click="handleText">产生随机数</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mockFeatchData } from '@/mock'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    ...mapState({
      dataList: state => state.data,
      text: state => state.text
    })
  },
  methods: {
    handleData () {
      mockFeatchData().then(res => {
        this.$store.commit('storeData', res)
      })
      //   console.log(this)
      //   this.$store.commit('storeData')
      //   this.$store.dispatch('setStoreData')
      //   console.log('同步执行')
    },
    handleText () {
      // this.$store.dispatch('setStoreText', `hello,${Math.random()}`)
      this.$store.dispatch({
        type: 'setStoreText',
        payload: `hello,${Math.random()}`
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
