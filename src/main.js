/*
 * @Author: FHP
 * @Description: aaa
 * @Date: 2022-08-25 22:51:29
 * @LastEditTime: 2022-08-31 14:57:59
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.config.productionTip = false
Vue.use(Antd)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
