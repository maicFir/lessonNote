// 在vue中通信的几种方式
/**
 * 1: props 父子传递
 * // parent
 * <Child message="child"></Child>
 * 
 * // Child.vue
 * export {
 *    name: 'child',
 *    props: {
 *        type: String;
 *        message: () => ''
 *    }
 * }
 */

/**
 * 2: 自定义事件
 * 
 * // parnet.vue
 * 
 * <Child @getMessage="getMessage"></Child>
 * 
 * Child.vue
 * this.$emit('getMessage', {test: 'hello'})
 */

/**
 * 3: eventBus  事件总线
 * emit.js
 * import Vue from 'vue';
 * export default new Vue();
 * 
 * // B.vue
 * import Emit from './emit.js';
 * Emit.$emit('eventName', {});
 * 
 * // C.vue
 * import Emit from './emit.js';
 * Emit.$on('eventName', (data) => {
 *    console.log(data);
 * })
 * 
 */

/**
 * 4: ref 可以进行通信  this.$refs.child.xxx
 */

/**
 * 5: this.$parent  可以直接获取父组件的实例
 */
/**
 * 6: provide/inject
 * 
 * // A.vue
 * export {
 *    name: 'A',
 *    provide: {
 *       text: 'hello'
 *    }
 * }
 * 
 * // B.vue
 * 
 * export {
 *    name: 'B',
 *    inject:['text']
 * }
 */
/**
 * 
 * 7.vuex
 */

/**
 * 8. Vue.observable({count: 0}) 最小跨组件通信
 * 
 * // state.js
 * const state = Vue.observable({
 *    name: 'hello',
 *    count: 10
 * });
 * 
 * A.vue
 * import state from './state.js';
 * export {
 *    methods: {
 *      handleName() {
 *          state.name = '嘻嘻'
 *      }
 *    }
 * }
 * 
 * B.vue
 * import state from './state.js';
 * export {
 *    methods: {
 *      handleCount() {
 *          state.count++
 *      }
 *    }
 * }
 * 
 */
