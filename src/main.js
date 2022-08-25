/*
 * @Author: FHP
 * @Description: 哈哈
 * @Version: 1.0
 * @Date: 2022-08-25 22:51:29
 * @LastEditors: FHP
 * @LastEditTime: 2022-08-25 22:52:13
 * @FilePath: \common\src\main.js
 * Copyright (C) 2022 FHP. All rights reserved.
 */
import Vue from 'vue'
import App from './App.vue'
// 我来提交一次
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
