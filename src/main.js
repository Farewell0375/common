/*
 * @Author: FHP
 * @Description: aaa
 * @Date: 2022-08-25 22:51:29
 * @LastEditTime: 2022-08-29 22:30:44
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
console.log('[ router ] >', router)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
